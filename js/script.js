function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            // Yüklenen içeriği .content elemanına ekleyin
            document.documentElement.innerHTML = data;
        })
        .catch(error => console.error('Sayfa yüklenirken hata oluştu:', error));
}


function registerUser() {
    // Form verilerini topla
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;


    // AJAX isteği yap
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Diğer gerekirse başlıkları buraya ekleyebilirsiniz
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        // İşlem başarılıysa burada işlemleri gerçekleştir
        console.log('Kayıt başarılı:', data);
        loadPage('games.html');
    })
    .catch(error => {
        // Hata durumunda burada işlemleri gerçekleştir
        console.error('Kayıt sırasında bir hata oluştu:', error);
    });
}

function loginUser() {
    // Form verilerini topla
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Diğer gerekirse başlıkları buraya ekleyebilirsiniz
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        // İşlem başarılıysa burada işlemleri gerçekleştir
        console.log('Giriş başarılı:', data);
    })
    .catch(error => {
        // Hata durumunda burada işlemleri gerçekleştir
        console.error('Giriş sırasında bir hata oluştu:', error);
    });
}


async function fetchUsers() {
    try {
        const response = await fetch('https://example.com/api/users'); // API'nizin URL'sini buraya ekleyin
        const userData = await response.json();

        // Kullanıcı listesini oluşturan bir döngü
        var userListElement = document.getElementById("user-list");
        userData.forEach(user => {
            var listItem = document.createElement("li");
            listItem.textContent = user.name; // Kullanıcı adını buraya göre uyarlamanız gerekebilir
            userListElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Sayfa yüklendiğinde kullanıcıları çek ve liste oluştur
window.onload = fetchUsers;