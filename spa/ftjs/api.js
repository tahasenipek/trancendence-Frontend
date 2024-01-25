
var headClickCount = 0;
var tailClickCount = 0;
var temp = 0;
function selectOption(option) {
    if (option === 1) {
        headClickCount++;
        document.getElementById('headCount').innerText = headClickCount;
    } else if (option === 2) {
        tailClickCount++;
        document.getElementById('tailCount').innerText = tailClickCount;
    }
}

/* 
django endpoints
1- http://ftpong.duckdns.org:8100/login/
2- http://ftpong.duckdns.org:8100/register/
3- http://ftpong.duckdns.org:8100/userlist/
4- http://ftpong.duckdns.org:8100/addfriend/
5- http://ftpong.duckdns.org:8100/getprofile/
6- http://ftpong.duckdns.org:8100/friendslist/
7- http://ftpong.duckdns.org:8100/createTournament/
8- http://ftpong.duckdns.org:8100/inviteTournament/
9- http://ftpong.duckdns.org:8100/updateavatar/
10- http://ftpong.duckdns.org:8100/update-photo

*/

/*

flusk endpoints

1- http://localhost:2700/api/login
2- http://localhost:2700/api/register
3- http://localhost:2700/api/search
4- http://localhost:2700/api/addfriend
5- http://localhost:2700/api/get-profile
6- http://localhost:2700/api/friendlist
7- http://localhost:2700/api/createTournament
8- http://localhost:2700/api/inviteTournament
9- http://localhost:2700/api/updateavatar
10- http://localhost:2700/api/update-photo
*/

function tokenMaker()
{
    const tokenData = localStorage.getItem('token');
    // Assuming this is the string you have


    let startIndex = tokenData.indexOf(' ') + 1; // Find the index after the first space
    let endIndex = tokenData.lastIndexOf(','); // Find the index before the last comma
    let tokenValue = tokenData.substring(startIndex, endIndex - 1);


    return tokenValue;
}


function authTest()
{
    let tokenValue = tokenMaker();

    
    fetch('http://localhost:8000/authtest/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenValue,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Kayıt sırasında bir hata oluştu.');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            alert("okeyy");
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Kayıt sırasında bir hata oluştu.');
    });
}

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }
    fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
			username: username,
            password: password,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Kayıt sırasında bir hata oluştu.');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            console.log('Success:', data);

			alert('Giriş başarılı.');
            const token = data.token;
            localStorage.setItem('token', token);
            if (data.language)
                localStorage.setItem('language', 'en');
            window.location.href = '/games';
        } else {    
            alert('Giriş sırasında bir hata oluştu.');
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Kayıt sırasında bir hata oluştu.');
    });
}

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!username || !password || password !== confirmPassword) {
        alert('Lütfen tüm alanları doldurun ve şifreleri doğrulayın.');
        return;
    }
    
    const data = {
        username: username,
        password: password,
    };
    fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log('response', response);
        if (!response.ok) {
            throw new Error('Kayıt sırasında bir hata oluştu.'); // 404 hata sayfası yapalım ona gitsin
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data)
        if (data.success) {
            console.log('Success:', data);
            alert('Kullanıcı başarıyla kaydedildi.');
            window.location.href = '/login';
        } else {    
            alert('Kayıt sırasında bir hata oluştu.');
        }
    })
    .catch(error => {
        alert('Kayıt sırasında bir hata oluştu.');
    });
}

function searchUsers() {
    let tokenValue = tokenMaker();
    var searchQuery = document.querySelector('.search').value;

    console.log(searchQuery);
    fetch('http://localhost:8000/search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenValue,
        },
        body: JSON.stringify({
            searchQuery: searchQuery
        })
    })
    .then(response => response.json())
    .then(data => {
        const userContainer = document.getElementById('user-list-container');
        userContainer.innerHTML = '';

        if (data.success) {
            const match_users = data.users;
            match_users.forEach(function(user) {
                const userHtml = '<ul>' +
                '<span class="online-dot-' + (user.is_online ? 'online' : 'offline') + '"></span>' + 
                '<a href= "/their-profile" style="color: #FDB827; text-decoration: none;" onclick="getProfile(\'' + user.username + '\');">' +
                user.username + '</a>';
                + '</ul>';
                userContainer.innerHTML += userHtml;
            });
        } else {
            return ;
        }
    })
    .catch(error => {
        console.error('Error searching users:', error);
    });
}


function logoutUser() {

    let token = tokenMaker();
    fetch('http://localhost:8000/logout/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (language === 'en')
                alert('You have successfully logged out.');
            else if (language === 'fr')
                alert('Vous vous êtes déconnecté avec succès.');
            else
                alert('Başarıyla çıkış yaptınız.');
            window.location.href = '/login';
        }
    }
    )
    .catch(error => {
        console.error('Error logging out:', error);
    }
    );
}

function myProfile() {

    console.log("window.location.origin", window.location.origin)
    let token = tokenMaker();
    console.log('myProfile');
    fetch('http://localhost:8000/getmyprofile/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
		body: JSON.stringify({
			token: localStorage.getItem('token'),
		}),
	})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('my profile data', data);
		if (data.success) {

            const profileImageContainer = document.getElementById('profileImageContainer');
			const usernameContainer = document.getElementById('usernameContainer');
			const matchesCount = document.getElementById('matchesCount');
			const friendsCount = document.getElementById('friendsCount');
            const tournamentCount = document.getElementById('tournamentCount');
			const profileButtonsContainer = document.querySelector('.profile-buttons');
			
            profileImageContainer.innerHTML = '<img class="" src="' + data.avatar +  '" alt="Card image cap" width="203" height="240">';

            usernameContainer.innerHTML = data.username;
			profileButtonsContainer.innerHTML = `
                    <button onclick="logoutUser();" type="button" class="btn btn-danger">Log Out</button>
                    <button onclick="window.location.href='/settings'" type="button" class="btn btn-success">Settings</button>
                    `;
                    matchesCount.innerHTML = '<div style="color: #00a500; display: inline;"> ' + '&nbsp;' + data.matches_win + '</div>' +
                    '<div style="color: #333333; display: inline;"> ' + ' / ' + data.match_count + '</div>';
            tournamentCount.innerHTML = '&nbsp;' + data.match_count;
			friendsCount.innerHTML = '&nbsp;' + data.friends_count;
			
            

            const scrollTable = document.getElementById('my_scroll_table');

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Create header row
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Date</th><th>Username</th><th>Score</th><th>W/L</th>';
            thead.appendChild(headerRow);

            // Create rows for match data
            for (let i = 0; i < data.match_length; i++) {
                const match = data.matches[i];
                
                const row = document.createElement('tr');
                row.innerHTML = '<td>' + match.date + '</td><td>' + match.oponent + '</td><td>' + match.score1 + '</td><td>' + match.winlose + '</td>';
                
                tbody.appendChild(row);
            }

            table.appendChild(thead);
            table.appendChild(tbody);
            scrollTable.appendChild(table);

			const scrollTable_other = document.getElementById('my_scroll_table_other'); // BURAK
			

			const table_other = document.createElement('table');
			const thead_other = document.createElement('thead');
			const tbody_other = document.createElement('tbody');
			
			
			const headerRow_other = document.createElement('tr');
			headerRow_other.innerHTML = '<th>Date</th><th>Username</th><th>W/L</th>';
			
			thead_other.appendChild(headerRow_other);

			for (let i = 0; i < data.other_game_len; i++) {
				const match_other = data.other_game_matches[i];
				
				const row_other = document.createElement('tr');
				row_other.innerHTML = '<td>' + match_other.date + '</td><td>' + match_other.oponent + '</td><td>' + match_other.winlose+ '</td>';
				
				tbody_other.appendChild(row_other);
			}

			table_other.appendChild(thead_other);
			table_other.appendChild(tbody_other);
			scrollTable_other.appendChild(table_other);
        
		}

	})
    .catch(error => {
        console.error('Error gettin my profile:', error);
    });
}

function removefriend(username) {

    let tokenValue = tokenMaker();
    fetch('http://localhost:8000/removefriend/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenValue,
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            username: username,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {

            if (language === 'en')
                alert('You have removed ' + username + ' from your friends list.');
            else if (language === 'fr')
                alert('Vous avez supprimé ' + username + ' de votre liste d\'amis.');
            else
                alert(username + ' arkadaş listenden çıkarıldı.');
        }
    }
    )
    .catch(error => {
        console.error('Error getting profile:', error);
    });
}


function checkracescore() {

    let token = tokenMaker();
    let game_id = localStorage.getItem('game_id');

    fetch('http://localhost:8000/check-head-tail/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify({
            game_id: game_id,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    )
    .then(data => {
        if (data.success)
        {
            if (data.again)
            {
                checkracescore()
            }
            else if (data.winner)
            {
                localStorage.removeItem('game_id');
                window.location.pathname = '/1v1match-winner-page';
            }
            else if (data.lose)
            {
                localStorage.removeItem('game_id');
                window.location.pathname = '/1v1match-lose-page';
            }
        }
    }
    )
    .catch(error => {
        console.error('Error:', error);
    }
    );
}





function race(headClickCount, tailClickCount, temp) {

    
    if (temp == 5)
	{   
        console.log('headClickCount', headClickCount);
        let tokenValue = tokenMaker();
        console.log('tailClickCount', tailClickCount);
        let game_id = localStorage.getItem('game_id');

		fetch ('http://localhost:8000/head-and-tail-race/', {
		method: 'POST',	 
		headers: {
				'Content-Type': 'application/json',
                'Authorization': 'Token ' + tokenValue,
			},
			body: JSON.stringify({
				headClickCount: headClickCount,
				tailClickCount: tailClickCount,
                game_id: game_id,
			}),
		}).then(response => {
			if (response.ok)
				return response.json();
			else
				return Promise.reject(response);
		}
		).then(data => {
			if (data.success)
			{
				if (data.win)
				{
                    window.location.pathname = '/1v1match-win-page';
					
				}
                else if (data.notset == 2)
                {
                    checkracescore();
                }
				else if (data.lose)
				{
					window.location.pathname = '/1v1match-lose-page';
				}
			}
			else
			{
				console.log('error');
			}
		}
		)
	}
}


function	headTailTime() {

    let token = tokenMaker();
	fetch('http://localhost:8000/head-tail/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
	}).then(response => {
		if (!response.ok)
			return Promise.reject(response);
		else
			return response.json();
	})
	.then(data => {
        if (data.success)
        {
            localStorage.setItem('game_id', data.game_id);
            window.location.href = '/head-and-tail';
        }
        else
        {	
            setInterval(function() {
                headTailTime();
            }, 8000);
        }
	})
}

function addfriend(username) {
    var tokenValue = tokenMaker();
    fetch('http://localhost:8000/addfriend/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenValue,
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            username: username,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (language === 'en')
                alert('You have added ' + username + ' to your friends list.');
            else if (language === 'fr')
                alert('Vous avez ajouté ' + username + ' à votre liste d\'amis.');
            else
                alert(username + ' arkadaş listene eklendi.');
            window.location.pathname = '/games';
        }
    }
    )
}

function getProfile(username) {

    let token = tokenMaker();
    localStorage.removeItem('friend');
    fetch('http://localhost:8000/getprofile/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify({
            username: username,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('profile data', data);
        if (data.success == false) {
            return ;
        }
        if (data.success) {

            localStorage.setItem('friend', data.username);
            const profileImageContainer = document.getElementById('profileImageContainer');
            const onlineStatusContainer = document.getElementById('onlineStatusContainer');
            const usernameContainer = document.getElementById('usernameContainer');
            const matchesCount = document.getElementById('matchesCount');
            const tournamentCount = document.getElementById('tournamentCount');
            const friendsCount = document.getElementById('friendsCount');
            const profileButtonsContainer = document.querySelector('.profile-buttons');
            

            if (data.is_friend == true)
            {
                console.log('if');
                profileImageContainer.innerHTML = '<img class="" src="' + data.avatar + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.is_online ? 'online' : 'offline') + '"></span>' + (data.is_online ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="removefriend('${data.username}')" type="button" class="btn btn-danger" id="removefriend">remove friend</button>
                    <button onclick="matchRequestFromProfile()" id="matchRequestFromProfile" type="button" class="btn btn-light">1v1 match <img src="img/1v1-profile.png" width="16" height="13"></button>
                    `;
                matchesCount.innerHTML = '<div style="color: #00a500; display: inline;"> ' + '&nbsp;' + data.matches_count + '</div>' +
                    '<div style="color: #333333; display: inline;"> ' + ' / ' + data.tournament + '</div>';
                tournamentCount.innerHTML = '&nbsp;' + data.tournament;
                friendsCount.innerHTML = '&nbsp;' + data.friends_count;
            }
            else if (data.is_friend == false)
            {
                console.log('else if');
                profileImageContainer.innerHTML = '<img class="" src="' + data.avatar + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.is_online ? 'online' : 'offline') + '"></span>' + (data.is_online ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="addfriend('${data.username}')" type="button" class="btn btn-success" id="addFriendsLink">+add friend</button>
                    <button onclick="matchRequestFromProfile()" id="matchRequestFromProfile" type="button" class="btn btn-light">1v1 match <img src="img/1v1-profile.png" width="16" height="13"></button>`;
                }

                matchesCount.innerHTML = '<div style="display: inline;"> ' + '<span style="color: #00a500;">&nbsp;' + data.matches_win + '</span> / ' + '<span style="color: black;">' + data.match_count + '</span></div>';

                tournamentCount.innerHTML = '&nbsp;' + data.match_count;
                friendsCount.innerHTML = '&nbsp;' + data.friends_count;

            }

            const scrollTable = document.getElementById('scroll_table');

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Create header row
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Date</th><th>Username</th><th>Score</th><th>W/L</th>';
            thead.appendChild(headerRow);

            // Create rows for match data
            for (let i = 0; i < data.match_length; i++) {
                const match = data.matches[i];
                
                const row = document.createElement('tr');
                row.innerHTML = '<td>' + match.date + '</td><td>' + match.oponent + '</td><td>' + match.score1 + '</td><td>' + match.winlose + '</td>';
                
                tbody.appendChild(row);
            }

            table.appendChild(thead);
            table.appendChild(tbody);
            scrollTable.appendChild(table);
            
            
            const scrollTable_other = document.getElementById('scroll_table_other'); // BURAK
            

            const table_other = document.createElement('table');
            const thead_other = document.createElement('thead');
            const tbody_other = document.createElement('tbody');
            
            
            const headerRow_other = document.createElement('tr');
            headerRow_other.innerHTML = '<th>Date</th><th>Username</th><th>W/L</th>';
            
            thead_other.appendChild(headerRow_other);

            for (let i = 0; i < data.other_game_len; i++) {
                const match_other = data.other_game_matches[i];
                
                const row_other = document.createElement('tr');
                row_other.innerHTML = '<td>' + match_other.date + '</td><td>' + match_other.oponent + '</td><td>' + match_other.winlose+ '</td>';
                
                tbody_other.appendChild(row_other);
            }

            table_other.appendChild(thead_other);
            table_other.appendChild(tbody_other);
            scrollTable_other.appendChild(table_other); 
        }
    )
    .catch(error => {
        console.error('Error getting profile:', error);
    });
}


function fetchFriendsList(){
	var tokenValue   = tokenMaker();

    fetch('http://localhost:8000/friendslist/', {
        method: 'GET',
		headers: {
            'Content-Type': 'application/json',
			'Authorization': 'Token ' + tokenValue,
		},
    })
	.then(response => response.json())
	.then(data => {
        if (data.success) {
            const userContainer = document.getElementById('user-list-container');
            userContainer.innerHTML = '';
            const friends = data.friends;
            if(friends != null && friends.length != 0){
                friends.forEach(function (friend) {
                    const userHtml = '<ul>' +
                                        '<span class="online-dot-' + (friend.is_online ? 'online' : 'offline') + '"></span>' +
                                        '<a href="their-profile" style="color: #FDB827; text-decoration: none;" onclick="getProfile(\'' + friend.username + '\');">' + friend.username + '</a>' +
                                        '</ul>';
                    userContainer.innerHTML += userHtml;
                });
            }
        }
        else if (data.success == false) {
            const userContainer = document.getElementById('user-list-container');
        
            var language = localStorage.getItem('language');
           

            if (language === 'en') {
                userContainer.innerHTML = '<ul>' + 'You have no friends.' + '</ul>';
            } else if (language === 'fr') {
                userContainer.innerHTML = '<ul>' + 'Vous n\'avez pas d\'amis.' + '</ul>';
            } else {
                // Varsayılan durum veya hata durumu
                userContainer.innerHTML = '<ul>' + 'Arkadaşın yok.' + '</ul>';
            }
        }
	})
	.catch(error => {
		console.error('Error fetching friends list:', error);
	});
}

function createTournament() {
    let token = tokenMaker();
	console.log('createTournament');

    fetch('http://localhost:8000/createTournament/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data.success) {
            localStorage.setItem('tournament_id', data.tournament_id);
            window.location.pathname = '/tournament-friends-waiting';
        }
    }
    )
    .catch(error => {
        console.error('Error creating tournament:', error);
    }
    );
}


function putTheNick() {

    let token = tokenMaker();
	console.log('putTheNick');
    var username = document.getElementById('usernameInput').value;
    var tournament_id = localStorage.getItem('tournament_id');

	console.log(username);
	console.log(token);
	console.log(tournament_id);

    fetch('http://localhost:8000/inviteTournament/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify({
            token: token,
            tournament_id: tournament_id,
            username: username,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('hey',data);
        if (data.success) {
            console.log('data: ',data.user_count);

            if (data.user_count === 3)
            {
                console.log('3 kişi tamam');
                window.location.pathname = '/tournament-tables';
            }
            else if (localStorage.getItem('tournament_id') == null)
                localStorage.setItem('tournament_id', data.tournament_id);
            else if (data.user_count != 3)
            {
                //window.location.pathname = '/tournament-friends-waiting';
            }
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    });
}


function refreshUserList() {
    const userContainer = document.getElementById('user-list-container');
    if (userContainer) {
        if (userContainer.innerHTML != '') {
            fetchFriendsList()
        }
        else{
            
            userContainer.innerHTML = '';
            fetchFriendsList()
        }
    }
}

function beingMatch() {
    let token = tokenMaker();
    if ( window.location.pathname === '/being-match') {


        fetch('http://localhost:8000/matching/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                
                console.log(data);

                if (data.match == true)
                {
                    
                    
                    localStorage.setItem('game_id', data.game_id);//
                    localStorage.setItem('game_pass', data.game_pass);//
                    localStorage.setItem('player_pass', data.player_pass);//
                    localStorage.setItem('player', data.player);

                    console.log('game_id', localStorage.getItem('game_id'));
                    console.log('game_pass', localStorage.getItem('game_pass'));
                    console.log('player_pass', localStorage.getItem('player_pass'));
                    console.log('player', localStorage.getItem('player'));
                    window.location.pathname = '/1v1match';
                    
                    
                }
            }
        })
        .catch(error => {
            console.error('Error fetching friends list:', error);
        });
    }
}

function myframe(){

    console.log('game_id', localStorage.getItem('game_id'));
    console.log('game_pass', localStorage.getItem('game_pass'));
    console.log('player_pass', localStorage.getItem('player_pass'));
    console.log('player', localStorage.getItem('player'));
    var game_id = localStorage.getItem('game_id');
    var game_pass = localStorage.getItem('game_pass');
    var player_pass = localStorage.getItem('player_pass');
    var player = localStorage.getItem('player');

   
    var iframe = document.getElementById('myframe');
    console.log('iframe', iframe);
    iframe.src = 'http://ftpong.duckdns.org:2700/?gameid=' + game_id + '&gamepass=' + game_pass + '&player=' + player + '&playerpass=' + player_pass;

    console.log('iframe.src', iframe.src);

}

function startTournament() {
	
	var token = tokenMaker();
    fetch('http://localhost:8000/startTournament/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            if (data.tournament_id)
            {
                localStorage.setItem('tournament_id', data.tournament_id);
                window.location.pathname = '/request-tournament';
            }
        }
        else if (data.success == false) {
            return ;
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    }
    );
}

setInterval(beingMatch, 5000);  /// 5 saniyede bir kullanıcı Eğer kuallanıcı 1v1 sayfasına girerse isteği backede iletir 
setInterval(refreshUserList, 7000); // 3 saniyede bir kullanıcı listesini yeniler
//setInterval(startTournament, 5000);   /// 5 saniyede bir kullanıcı turnava isteği almışmı diye kontrol eder


function submitForm()
{
    const formusername = document.getElementById('username').value;
    const formpassword = document.getElementById('password').value;
    const formconfirmPassword = document.getElementById('confirmpassword').value;
    const language = document.getElementById('language').value;

    if (formpassword !== formconfirmPassword) {
        alert('Lütfen şifreleri doğrulayın.');
        return;
    }

    fetch('http://localhost:8000/update_profile/', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + tokenMaker(),
    },
    body: JSON.stringify({ 
        username: formusername,
        password: formpassword,
        language: language,
    }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('data', data);
        if (data.success) {
            console.log('Success:', data);
            
            window.location.pathname = '/settings';
        }
        else if (data.success == false) {
            alert (data.error);
        }
    })
    .catch(error => {
        error => {
            console.error('Error:', error);
        } 
    });
}

function updatePhoto()
{
    var fileInput = document.getElementById('file');
    var file = fileInput.files[0];
    var formData = new FormData();

    formData.append('photo', file);
    
    fetch('http://localhost:8000/update_avatar/', {
        method: 'PUT',
        headers: {
            'Authorization': 'Token ' + tokenMaker(),
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('response', response);
        return response.json();
    })
    .then(data => {
        console.log('data', data);
        if (data.success) {
            console.log('Success:', data);
            getmyprofile()
            window.location.pathname = '/settings';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function gamerequest() 
{
    var token = localStorage.getItem('token');


    fetch('http://localhost:2700/api/requestgame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => { 



        // İsteğin başarıyla tamamlandığına dair işlemleri buraya ekleyebilirsiniz.
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    });

}

function getmyprofile() {
    let token = tokenMaker();
	fetch('http://localhost:8000/getavatar/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
		},
	})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    )
    .then(data => {
        if (data.success) {

            const document = window.document;
            const photo_main = document.getElementById('avatar-image-main');
            if (photo_main)
                photo_main.src = `http://localhost:8000${data.avatar_path}`;
            else
                photo.src = 'img/default_avatar.png';
        }   
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    })
}



function goToTournament() {

    var tournament_id = localStorage.getItem('tournament_id');
    let token = tokenMaker();

    fetch('http://localhost:8000/joinTournament/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify({
            tournament_id: tournament_id,
        }),
    })
    .then(response => {
        return response.json();
    }
    )
    .then(data => {
        console.log('agam', data);
        if (data.success) {
            window.location.pathname = '/tournament-tables';
        }
        else if (data.success == false) {
            return ;
        }
    }
    )
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    }
    );
}

function tournament_table() {

    var tournament_id = localStorage.getItem('tournament_id');
    let tokenValue = tokenMaker();
    fetch('http://localhost:8000/tournament_table/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenValue,
        },
        body: JSON.stringify({
            tournament_id: tournament_id,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('datamm' , data);
        if (data.success) {
        var tableContainer = window.document.getElementById('table_body_id');

        // Tabloyu oluştur
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        var headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>match order</th><th>1. Player</th><th></th><th>2. Player</th><th>Score</th><th>Winner</th>';
        thead.appendChild(headerRow);
        table.appendChild(thead);
        console.log('data.user_length', data.user_length);
        // Kullanıcı verilerini tabloya ekleyin
        for (var i = 0; i < data.users.length; i += 2) {
            var user1 = data.users[i];
            var user2 = (i + 1 < data.users.length) ? data.users[i + 1] : null;

            var row = document.createElement('tr');

            var username1 = user1 ? user1.username : 'N/A';
            var username2 = user2 ? user2.username : 'N/A';

            row.innerHTML = '<th>' + (i / 2 + 1) + '.</th><th>' + username1 + '</th><th><img src="img/vs-sign.png" alt="vs-sign" width="48" height="48"></th><th>' + username2 + '</th><th>??</th><th>??</th>';

            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        // Tabloyu container'a ekle
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);

        if (data.user_length == 4)
        {
            setTimeout(function(){ 
                
            }, 5000);
        }
        
        }
        else if (data.success == false) {
            return ;
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    }
    );
}

function joinButtonClicked() {
    
        var tournament_id = localStorage.getItem('tournament_id');
        var token = localStorage.getItem('token');
    
        fetch('http://localhost:2700/api/joinTournament', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tournament_id: tournament_id,
                token: token,
            }),
        })
        .then(response => {
            return response.json();
        }
        )
        .then(data => {
            if (data.success) {
                window.location.pathname = '/tournament_table';
                tournament_table();
            }
            else if (data.success == false) {
                return ;
            }
        }
        )
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
        }
        );
    
}

function deny(){

    localStorage.removeItem('tournament_id');
    window.location.pathname = '/games';
}