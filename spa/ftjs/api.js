

function loginUser() {
	
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }
    fetch('http://ftpong.duckdns.org:8100/login/', {
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
    if (!username|| !password || password !== confirmPassword) {
        alert('Lütfen tüm alanları doldurun ve şifreleri doğrulayın.');
        return;
    }
    
    fetch('http://ftpong.duckdns.org:8100/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Kayıt sırasında bir hata oluştu.'); // 404 hata sayfası yapalım ona gitsin
        }
        return response.json(); 
    })
    .then(data => {
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
    var searchQuery = document.querySelector('.search').value;

    fetch('http://ftpong.duckdns.org:8100/userlist/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
                '<span class="online-dot-' + (user.online_status ? 'online' : 'offline') + '"></span>' + 
                '<a href="/their-profile" style="color: #FDB827; text-decoration: none;" onclick="getProfile(\'' + user.username + '\');">' +
                user.username + '</a>';
                + '</ul>';
                userContainer.innerHTML += userHtml;
            });
        } else {
            alert('Kullanıcı aranırken bir hata oluştu.');
        }
    })
    .catch(error => {
        console.error('Error searching users:', error);
    });
}



function logoutUser() {

    var token = localStorage.getItem('token');

    fetch('http://localhost:2700/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.removeItem('token');


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

    fetch('http://ftpong.duckdns.org:8100/getprofile/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    })
    .then(response => response.json())
    .then(data => {
            console.log('data', data);
            if (data.success) {
                
                const profileImageContainer = document.getElementById('profileImageContainer');
                const onlineStatusContainer = document.getElementById('onlineStatusContainer');
                const usernameContainer = document.getElementById('usernameContainer');
                const matchesCount = document.getElementById('matchesCount');
                const tournamentCount = document.getElementById('tournamentCount');
                const friendsCount = document.getElementById('friendsCount');
                const profileButtonsContainer = document.querySelector('.profile-buttons');
    
                profileImageContainer.innerHTML = '<img class="" src="' + data.photo + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.online_status ? 'online' : 'offline') + '"></span>' + (data.online_status ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="logoutUser()" type="button" class="btn btn-danger" id="logoutLink">Logout</button>
                    <a href="settings" class="btn btn-warning" id="settingsLink">Settings</a>
                    `;
                matchesCount.innerHTML = 'matches: ' + data.matches_count + ' / Win ' + data.tournament;
                tournamentCount.innerHTML = 'tournaments: Win ' + data.tournament;
                friendsCount.innerHTML = 'friends: ' + data.friends_count;


                const scroll_table = document.getElementById('scroll_table');

                //scroll_table.innerHTML = '';
                


            }
        }
    )
    .catch(error => {
        console.error('Error getting profile:', error);
    });
}


function removefriend(username) {

    fetch('http://localhost:2700/api/removefriend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
            window.location.pathname = '/games';
        }
    }
    )
    .catch(error => {
        console.error('Error getting profile:', error);
    });
}


function addfriend(username) {
    
    fetch('http://ftpong.duckdns.org:8100/addfriend/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

    fetch('http://ftpong.duckdns.org:8100/getprofile/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            username: username,
        }),
    })
    .then(response => response.json())
    .then(data => {

        console.log('data', data);

        if (data.success) {
            
            const profileImageContainer = document.getElementById('profileImageContainer');
            const onlineStatusContainer = document.getElementById('onlineStatusContainer');
            const usernameContainer = document.getElementById('usernameContainer');
            const matchesCount = document.getElementById('matchesCount');
            const tournamentCount = document.getElementById('tournamentCount');
            const friendsCount = document.getElementById('friendsCount');
            const profileButtonsContainer = document.querySelector('.profile-buttons');
            

            if (data.friends == true)
            {
                console.log('if');
                profileImageContainer.innerHTML = '<img class="" src="' + data.photo + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.online_status ? 'online' : 'offline') + '"></span>' + (data.online_status ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="removefriend('${data.username}')" type="button" class="btn btn-danger" id="removefriend">remove friend</button>
                    <button onclick="matchRequestFromProfile()" id="matchRequestFromProfile" type="button" class="btn btn-light">1v1 match <img src="img/1v1-profile.png" width="16" height="13"></button>
                    `;
                matchesCount.innerHTML = 'matches: ' + data.matches_count + ' / Win ' + data.tournament;
                tournamentCount.innerHTML = 'tournaments: Win ' + data.tournament;
                friendsCount.innerHTML = 'friends: ' + data.friends_count;
            }
            else if (data.friends == false)
            {
                console.log('else if');
                profileImageContainer.innerHTML = '<img class="" src="' + data.photo + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.online_status ? 'online' : 'offline') + '"></span>' + (data.online_status ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="addfriend('${data.username}')" type="button" class="btn btn-success" id="addFriendsLink">+add friend</button>
                    <button onclick="matchRequestFromProfile()" id="matchRequestFromProfile" type="button" class="btn btn-light">1v1 match <img src="img/1v1-profile.png" width="16" height="13"></button>`;
                }
                matchesCount.innerHTML = 'matches: ' + data.matches_count + ' / Win ' + data.tournament;
                tournamentCount.innerHTML = 'tournaments: Win ' + data.tournament;
                friendsCount.innerHTML = 'friends: ' + data.friends_count;
            }
            
        }
    )
    .catch(error => {
        console.error('Error getting profile:', error);
    });
}
        
var token = localStorage.getItem('token');


        

function fetchFriendsList(){

	var token = localStorage.getItem('token');

    fetch('http://ftpong.duckdns.org:8100/friendslist/', {
        method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
    })
	.then(response => response.json())
	.then(data => {
        if (data.success) {
            const userContainer = document.getElementById('user-list-container');
            userContainer.innerHTML = '';
            const friends = data.friends;
            if(friends.length != 0){
                friends.forEach(function (friend) {
                    const userHtml = '<ul>' +
                                        '<span class="online-dot-' + (friend.online_status ? 'online' : 'offline') + '"></span>' +
                                        '<a href="/their-profile" style="color: #FDB827; text-decoration: none;" onclick="getProfile(\'' + friend.username + '\');">' + friend.username + '</a>' +
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

	console.log('createTournament');

    fetch('http://ftpong.duckdns.org:8100/createTournament/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

	console.log('putTheNick');
    var username = document.getElementById('usernameInput').value;
    var token = localStorage.getItem('token');
    var tournament_id = localStorage.getItem('tournament_id');

	console.log(username);
	console.log(token);
	console.log(tournament_id);

    fetch('http://ftpong.duckdns.org:8100/inviteTournament/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        if (data.success) {
            console.log(data.user_count);

            if (data.user_count === 3)
            {
                console.log('3 kişi tamam');
                window.location.pathname = '/tournament-tables';
            }
            else if (localStorage.getItem('tournament_id') == null)
                localStorage.setItem('tournament_id', data.tournament_id);
            else if (data.user_count != 3)
            {
                window.location.pathname = '/tournament-friends-waiting';
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
            return;
        }
        else{
            console.log('refreshing user list');
            fetchFriendsList()
        }
    }
}

function beingMatch() {

    if (window.location.pathname == '/being-match')
    {
        var token = localStorage.getItem('token');
        fetch('http://localhost:2700/api/beingMatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                

                if(data.match == false){

                    return ;
                }
                else if (data.match == true)
                {
                    window.location.pathname = '/games-match';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching friends list:', error);
        });
    }
}

function startTournament() {
	
	var token = localStorage.getItem('token');
    fetch('http://localhost:2700/api/startTournament', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
        }),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.success) {
            if (data.tournament)
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

//setInterval(beingMatch, 5000);  /// 5 saniyede bir kullanıcı Eğer kuallanıcı 1v1 sayfasına girerse isteği backede iletir 
setInterval(refreshUserList, 3000); // 3 saniyede bir kullanıcı listesini yeniler
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

    fetch('http://ftpong.duckdns.org:8100/updateavatar/', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        token: localStorage.getItem('token'),
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
        if (data.success) {
            console.log('Success:', data);
            
            window.location.pathname = '/settings';
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

    formData.append('token', localStorage.getItem('token'));
    formData.append('photo', file);

    fetch('http://ftpong.duckdns.org:8100/update-photo', {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
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

	fetch('http://localhost:2700/api/my-photo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
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
    }
    )
    .then(data => {
        if (data.success) {

            const document = window.document;
            const photo = document.getElementById('profile-photo');
            console.log(data.photo);
            photo.src = data.photo;
        }   
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
	/* 
    backendden resim gelidğinde kullanılacak şekil
    .then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.blob();
	})
	.then(blob => {
        const data = URL.createObjectURL(blob);
		const photo = document.getElementById('profile-photo');
		photo.src = data;

		window.location.pathname == '/settings';
	}) */




function goToTournament() {

    var tournament_id = localStorage.getItem('tournament_id');
    var token = localStorage.getItem('token');

    fetch('http://localhost:2700/api/goToTournament', {
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
            window.location.pathname = '/tournament-friends-waiting';
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

    console.log('tournament_table');
    var tournament_id = localStorage.getItem('tournament_id');
    var token = localStorage.getItem('token');

    fetch('http://localhost:2700/api/tournament_table', {
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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
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