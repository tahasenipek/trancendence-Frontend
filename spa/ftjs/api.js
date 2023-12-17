

function loginUser() {
	
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http:/localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
			username: username,
            password: password
        })
    })
    .then(data => {
        if (data.success) {
            // Kullanıcı başarıyla kaydedildiyse, token'ı sakla
            const accessToken = data.access_token;
            localStorage.setItem('accessToken', accessToken);

            // Oturumu başlatmak veya diğer işlemleri gerçekleştirmek için gerekli kodları ekleyin
            alert('Kullanıcı başarıyla kaydedildi.');

            // Örneğin, başka bir sayfaya yönlendirme:
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

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}




function registerUser() {
    // Formdan verileri al
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verileri kontrol et
    if (!username || !email || !password || password !== confirmPassword) {
        alert('Lütfen tüm alanları doldurun ve şifreleri doğrulayın.');
        return;
    }

    // API'ye istek gönder
    fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Kayıt sırasında bir hata oluştu.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Kullanıcı başarıyla kaydedildiyse, token'ı sakla
            const accessToken = data.access_token;
            localStorage.setItem('accessToken', accessToken);
            const user = data.user;

            // Kullanıcı bilgilerini kullanarak istediğiniz işlemleri gerçekleştirin
            console.log('Kullanıcı bilgileri:', user);

            // Oturumu başlatmak veya diğer işlemleri gerçekleştirmek için gerekli kodları ekleyin
            alert('Kullanıcı başarıyla kaydedildi.');

            // Örneğin, başka bir sayfaya yönlendirme:
            window.location.href = `/games?userId=${user.id}&username=${user.username}&isOnline=${user.is_online}`;
        } else {
            alert('Kayıt sırasında bir hata oluştu.');
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Kayıt sırasında bir hata oluştu.');
    });
}




/* function registerUser() {
        fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),  // csrf token'ınızı alın
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('API yanıtı:', data);

    })
    .catch(error => {
        console.error('Hata:', error);
    });
} */
