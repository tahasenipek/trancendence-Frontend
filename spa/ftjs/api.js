

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
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Kayıt sırasında bir hata oluştu.');
        }
        return response.json(); // 404 hata sayfası yapalım ona gitsin
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
    fetch('http://localhost:2700/api/register', {
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
        return response.json(); // 404 hata sayfası yapalım ona gitsin
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
