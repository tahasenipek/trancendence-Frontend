function registerUser() {
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmPassword').value;

	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
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
		console.log('Kayıt başarılı:', data);
		navigateTo('/games');
	})
	.catch(error => {
		console.error('Kayıt sırasında bir hata oluştu:', error);
	});
}


function loginUser() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Giriş başarılı:', data);
        navigateTo('/games');
    })
    .catch(error => {
        console.error('Giriş sırasında bir hata oluştu:', error);
    });
}


