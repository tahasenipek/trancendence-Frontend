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
            window.location.href = '/games';
        } else {    
            alert('Kayıt sırasında bir hata oluştu.');
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
        console.log(response);
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
            console.log(match_users);
            match_users.forEach(function(user) {
                userContainer.innerHTML += '<ul>';
                userContainer.innerHTML += '<span class="online-dot-' + (user.online_status ? 'online' : 'offline') + '"></span>';
                userContainer.innerHTML += user.username;
                userContainer.innerHTML += '</ul>';
            });
        } else {
            alert('Kullanıcı aranırken bir hata oluştu.');
        }
    })
    .catch(error => {
        console.error('Error searching users:', error);
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
                friends.forEach(function(friend) {
                    userContainer.innerHTML += '<ul>';
                    userContainer.innerHTML += '<span class="online-dot-' + (friend.online_status ? 'online' : 'offline') + '"></span>';
                    userContainer.innerHTML += friend.username;
                    userContainer.innerHTML += '</ul>';
                });
            }
        }
	})
	.catch(error => {
		console.error('Error fetching friends list:', error);
	});
}

function putTheNick() {
    var token = localStorage.getItem('token');
    var nickname = document.querySelector('.nickname').value;
    
    if (!nickname) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }
    
    console.log(token);
    console.log(nickname);

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
        console.log(data);
        window.location.href = '/join-random-tournament';
        // İsteğin başarıyla tamamlandığına dair işlemleri buraya ekleyebilirsiniz.
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Hata durumunda kullanıcıya bilgi vermek için buraya uygun işlemleri ekleyebilirsiniz.
    });
}




function refreshUserList() {

    const userContainer = document.getElementById('user-list-container');

    if (userContainer) {
        console.log('refreshing user list');
        if (userContainer.innerHTML != '') {
            return;
        }
        else
            fetchFriendsList()
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

setInterval(beingMatch, 5000);
setInterval(refreshUserList, 3000);



function submitForm()
{
    const form = document.getElementById('user-settings-form');
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
        body: {

            username: formusername,
            password: formpassword,
            language: language,
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully');
        } else {
            alert('Error updating profile: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
}
