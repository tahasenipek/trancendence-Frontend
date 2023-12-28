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
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:2700/api/search', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        searchQuery: searchQuery
    }));
    xhr.onreadystatechange = function () {
       
        if (xhr.readyState == 4 && xhr.status == 200) 
        {
            const responseData = JSON.parse(xhr.responseText);
            if (responseData.success) {
                const userContainer = document.getElementById('user-list-container');
                userContainer.innerHTML = '';
                const match_users = responseData.users;
                match_users.forEach(function(user) {
                    userContainer.innerHTML += '<ul>';
                    userContainer.innerHTML += '<span class="online-dot-online"></span>';
                    userContainer.innerHTML += user.username;
                    userContainer.innerHTML += '</ul>';
                });
                            
            } else {
                alert('Kullanıcı aranırken bir hata oluştu.');
            }
        }
        else if (xhr.readyState == 4 && xhr.status == 201) {
            const userContainer = document.getElementById('user-list-container');
            userContainer.innerHTML = '';
        }
    };
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