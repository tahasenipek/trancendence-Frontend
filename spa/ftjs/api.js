

function loginUser() {
	
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }
    fetch('http://localhost:2700/api/login', {
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
            
            const token = data.access_token;
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

    fetch('http://localhost:2700/api/search', {
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


function getProfile(username) {

    console.log(username);
    fetch('http://localhost:2700/api/get-profile', {
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

            const profileImageContainer = document.getElementById('profileImageContainer');
            const onlineStatusContainer = document.getElementById('onlineStatusContainer');
            const usernameContainer = document.getElementById('usernameContainer');
            const matchesCount = document.getElementById('matchesCount');
            const tournamentCount = document.getElementById('tournamentCount');
            const friendsCount = document.getElementById('friendsCount');
            const profileButtonsContainer = document.querySelector('.profile-buttons'); 

            console.log(data.friends);
            if (profileImageContainer && data.friends)
            {
                // Verileri yerleştirme
                console.log(data.friends);
                profileImageContainer.innerHTML = '<img class="" src="' + data.photo + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.online_status ? 'online' : 'offline') + '"></span>' + (data.online_status ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="removefriend()" type="button" class="btn btn-danger" id="removefriend">remove friend</button>
                    <button onclick="matchRequestFromProfile()" id="matchRequestFromProfile" type="button" class="btn btn-light">1v1 match <img src="img/1v1-profile.png" width="16" height="13"></button>`;
                matchesCount.innerHTML = 'matches: ' + data.matches_count + ' / Win ' + data.tournament;
                tournamentCount.innerHTML = 'tournaments: Win ' + data.tournament;
                friendsCount.innerHTML = 'friends: ' + data.friends_count;
            }
            else if (profileImageContainer && !data.friends)
            {
                // Verileri yerleştirme
                profileImageContainer.innerHTML = '<img class="" src="' + data.photo + '" alt="Card image cap" width="203" height="240">';
                onlineStatusContainer.innerHTML = '<span class="online-dot-' + (data.online_status ? 'online' : 'offline') + '"></span>' + (data.online_status ? 'online' : 'offline');
                usernameContainer.innerHTML = data.username;
                profileButtonsContainer.innerHTML = `
                    <button onclick="addfriend()" type="button" class="btn btn-success" id="addFriendsLink">+add friend</button>
                    <button onclick="matchRequestFromProfile()" id="matchRequestFromProfile" type="button" class="btn btn-light">1v1 match <img src="img/1v1-profile.png" width="16" height="13"></button>`;
                matchesCount.innerHTML = 'matches: ' + data.matches_count + ' / Win ' + data.tournament;
                tournamentCount.innerHTML = 'tournaments: Win ' + data.tournament;
                friendsCount.innerHTML = 'friends: ' + data.friends_count;
            }
            else
            {
                window.location.pathname = '/their-profile';
            }
        }
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
    });
}

function fetchFriendsList(){
    fetch('http://localhost:2700/api/friendlist', {
        method: 'GET',
        headers: {
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


//"
function putTheNick(event) {

    event.preventDefault();

    var token = localStorage.getItem('token');
    var nickname = document.getElementById('nicknameInput').value;

    fetch('http://localhost:2700/api/putTheNick', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            nickname: nickname,
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
            console.log('int', data.int);
            if (data.int != 4)
                window.location.pathname = '/tournament-friends-waiting';
            else if (data.int == 4)
                window.location.pathname = '/tournament';
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
                console.log(data);
                if(data.matched){
                    window.location.href = '/game';
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
	console.log('startTournament, token: ', token);
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
                console.log(data);
                console.log('hey', data.token);
                if(data.token == token && data.int == 4)
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

setInterval(beingMatch, 5000);
setInterval(refreshUserList, 3000);
setInterval(startTournament, 5000);



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

    fetch('http://localhost:2700/api/update-profile', {
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

    fetch('http://localhost:2700/api/update-photo', {
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
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    });
	/* .then(response => {
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
}
