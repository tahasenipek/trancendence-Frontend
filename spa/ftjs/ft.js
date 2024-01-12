
const app = document.querySelector('body');
var language = localStorage.getItem('language') || 'en';


const routes = {
	'/': {
		template: getTemplateByLang(language, 'login.html'),
		view: null
	},
	'/being-match': {
		template: getTemplateByLang(language, 'being-match.html'),
		view: null
	},
	'/create-tournament': {
		template: getTemplateByLang(language, 'create-tournament.html'),
		view: null
	},
	'/register': {
		template: getTemplateByLang(language, 'register.html'),
		view: null
	},
	'/join-random-tournament': {
		template: getTemplateByLang(language, 'join-random-tournament.html'),
		view: null
	},
	'/pong-time': {
		template: getTemplateByLang(language, 'pong-time.html'),
		view: null
	},
	'/games' : {
		template: getTemplateByLang(language, 'games.html'),
		view: null
	},
	'/my-profile' : {
		template: getTemplateByLang(language, 'my-profile.html'),
		view: null
	},
	'/settings' : {
		template: getTemplateByLang(language, 'settings.html'),
		view: null
	},
	'/login': {
		template: getTemplateByLang(language, 'login.html'),
		view: null
	},
	'/1v1match-lose-page': {
		template: getTemplateByLang(language, '1v1match-lose-page.html'),
		view: null
	},
	'/1v1match-winner-page': {
		template: getTemplateByLang(language, '1v1match-winner-page.html'),
		view: null
	},
	'/alone-tournament': {
		template: getTemplateByLang(language, 'alone-tournament.html'),
		view: null
	},
	'/tournament-tables': {
		template: getTemplateByLang(language, 'tournament-tables.html'),
		view: null
	},
	'/tournament': {
		template: getTemplateByLang(language, 'tournament.html'),
		view: null
	},
	'/tournament-winner-page': {
		template: getTemplateByLang(language, 'tournament-winner-page.html'),
		view: null
	},
	'/tournament-waiting-page': {
		template: getTemplateByLang(language, 'tournament-waiting-page.html'),
		view: null
	},
	'/tournament-lost-page': {
		template: getTemplateByLang(language, 'tournament-lost-page.html'),
		view: null
	},
	'/head-and-tail': {
		template: getTemplateByLang(language, 'head-and-tail.html'),
		view: null
	},
	'/pong-time': {
		template: getTemplateByLang(language, 'pong-time.html'),
		view: null
	},
	'/tournament': {
		template: getTemplateByLang(language, 'tournament.html'),
		view: null
	},
	'/create-tournament': {
		template: getTemplateByLang(language, 'create-tournament.html'),
		view: null
	},
	'/tournament-friends-waiting': {
		template: getTemplateByLang(language, 'tournament-friends-waiting.html'),
		view: null
	},
	'/alone-tournament': {
		template: getTemplateByLang(language, 'alone-tournament.html'),
		view: null
	},
	'/your-profile': {
		template: getTemplateByLang(language, 'your-profile.html'),
		view: null
	},
	'/their-profile': {
		template: getTemplateByLang(language, 'their-profile.html'),
		view: null
	},
	'/request-1v1-match': {
		template: getTemplateByLang(language, 'request-1v1-match.html'),
		view: null
	},
	'/request-tournament': {
		template: getTemplateByLang(language, 'request-tournament.html'),
		view: null
	},
}


function getTemplateByLang(language, page) {
    const folderName = (language === 'fr') ? 'pages-fr' : (language === 'tr') ? 'pages-tr' : 'pages';
    return `/${folderName}/${page}`;
}


function checktoken() {
	const accessToken = localStorage.getItem('token');
	if (!accessToken) {
		navigateTo('/login');
		router();
	}
}

function pageControl(page) {

	console.log('new', page.template);
	
}

function addfriend() {
	var cardyElement = document.querySelector('.cardy');

	var bottomTextElement = document.createElement('div');
    bottomTextElement.textContent = '++ Friend request sent ++';
	bottomTextElement.style.fontSize = '14px'; // Yazıyı küçültmek için
    bottomTextElement.style.fontFamily = 'Arial, sans-serif'; // Fontu değiştirmek için
    bottomTextElement.style.color = "#31ff8a"; // Rengi yeşil yapmak için

    cardyElement.appendChild(bottomTextElement);
	cardyElement.classList.toggle('settings-clicked');
	console.log('settings clicked');
	console.log(cardyElement);
	setTimeout(function() {
		// Eklenen sınıfı kaldırın
		cardyElement.classList.remove('settings-clicked');
	}, 200);
	setTimeout(function() {
		// Eklenen sınıfı kaldırın
		cardyElement.removeChild(bottomTextElement);
	}, 3000);

	addFriendRequest();
}

function removefriend() {
	var cardyElement = document.querySelector('.cardy');

	var bottomTextElement = document.createElement('div');
    bottomTextElement.textContent = '-- Removed from your friends list --';
	bottomTextElement.style.fontSize = '14px'; // Yazıyı küçültmek için
    bottomTextElement.style.fontFamily = 'Arial, sans-serif'; // Fontu değiştirmek için
    bottomTextElement.style.color = "#e20000"; // Rengi yeşil yapmak için

    cardyElement.appendChild(bottomTextElement);
	cardyElement.classList.toggle('remove-friend-clicked');
	console.log('remove friend clicked');
	console.log(cardyElement);
	setTimeout(function() {
		// Eklenen sınıfı kaldırın
		cardyElement.classList.remove('remove-friend-clicked');
	}, 200);
	setTimeout(function() {
		// Eklenen sınıfı kaldırın
		cardyElement.removeChild(bottomTextElement);
	}, 3000);
}

function matchRequestFromProfile() {
	var cardyElement = document.querySelector('.cardy');

	var bottomTextElement = document.createElement('div');
    bottomTextElement.textContent = '🔮 1v1 match request sent 🔮';
	bottomTextElement.style.fontSize = '14px'; // Yazıyı küçültmek için
    bottomTextElement.style.fontFamily = 'Arial, sans-serif'; // Fontu değiştirmek için
    bottomTextElement.style.color = "#5D1D88"; // Rengi yeşil yapmak için

    cardyElement.appendChild(bottomTextElement);
	cardyElement.classList.toggle('match-request-from-profile');
	console.log('match request from profile clicked');
	console.log(cardyElement);
	setTimeout(function() {
		// Eklenen sınıfı kaldırın
		cardyElement.classList.remove('match-request-from-profile');
	}, 200);
	setTimeout(function() {
		// Eklenen sınıfı kaldırın
		cardyElement.removeChild(bottomTextElement);
	}, 3000);
}

function frienduser() {

	console.log('window.location.pathname', window.location.pathname);

	if (window.location.pathname != '/' && window.location.pathname != '/register' && window.location.pathname != '/login');
	{	
		var searchInput = document.querySelector('.search').value.toLowerCase();

		if (searchInput && searchInput === "") {
			const userContainer = document.getElementById('user-list-container');
			userContainer.innerHTML = '<ul><span class="online-dot-online"></span>Online</ul>';
			userContainer.innerHTML += '<ul><span class="online-dot-offline"></span>Offline</ul>';
			return;
		}
		else
			return;
	}
}

/* function tournamentstatus() {

	fetch ('http://localhost:2700/api/tournamentstatus', {

	body: JSON.stringify({
		token: localStorage.getItem('token'),
		tournament_id : localStorage.getItem('tournament_id'),
	}),
	}).then(response => {
		if (response.ok)
			return response.json();
		else
			return Promise.reject(response);
	})
	.then(data => {
		console.log(data);
		if (data.status)
		{
			
		}
		else
		{
			console.log('error');
		}
	})
} */

function checkGetMyProfile(path) {

	var windowPath = window.location.pathname;
	console.log('windowPath: ' + windowPath);

	if (path == '/settings')
		getmyprofile();   // ayarlar sayfasındaki profil fotoğrafını alır ve gösterir
	else if (path == '/my-profile')
		myProfile();  //kişinin kendi profilini alır ve gösterir
	else if (path == '/their-profile')
		getProfile();  // arkadaşı olan veya olmayan kişilerin profilini gösterir
	else if (path == '/tournament-friends-waiting')
	{
		//tournamentstatus();  // arkadaşlarının turnuva durumunu gösterir
	}
}


async function router() {
	const route = window.location.pathname;
	const page = routes[route];
	if (page) {
		if (page.view){
			render(page.view);
		}
		if (page.template == 'pages/their-profile.html')
		{
			addfriend();
			removefriend();
			matchRequestFromProfile();
		}
		else{
			const htmls = await fetch(page.template).then(response => response.text());
			const div = document.createElement('div');
			div.innerHTML = htmls;
			render(div);
		}
	}
	else{
		renderError('404 Page not found');
	}
}


function tournamentTables() {
    var tournament_id = localStorage.getItem('tournament_id');
    var token = localStorage.getItem('token');

    fetch('http://localhost:2700/api/tournamentTables', {
        body: JSON.stringify({
            token: token,
            tournament_id: tournament_id,
        }),
    }).then(response => {
        if (response.ok)
            return response.json();
        else
            return Promise.reject(response);
    })
    .then(data => {
        console.log(data);
        if (data.success) {
            // Verileri HTML tabloya eklemek için DOM manipülasyonu yapalım
			if (document.querySelector('.table__body')){

            var tableBody = document.querySelector('.table__body');

            // Tabloyu temizle
            tableBody.innerHTML = '';

            // Yeni bir tablo oluştur
            var newTable = document.createElement('table');

            // Başlık satırı
            var headerRow = document.createElement('thead');
            headerRow.innerHTML = '<tr><th>match order</th><th>1. Player</th><th><img src="img/vs-sign.png" alt="vs-sign" width="48" height="48"></th><th>2. Player</th><th>Score</th><th>Winner</th></tr>';
            newTable.appendChild(headerRow);

            // Veri satırları
            var tbody = document.createElement('tbody');
            data.users.forEach((user, index) => {
                var newRow = document.createElement('tr');

                // Sıra numarası
                var orderCell = document.createElement('th');
                orderCell.textContent = (index + 1) + '.';
                newRow.appendChild(orderCell);

                // 1. Oyuncu
                var player1Cell = document.createElement('th');
                player1Cell.textContent = user.username; // Örneğin, kullanıcı adını alabilirsiniz
                newRow.appendChild(player1Cell);

                // vs işareti
                var vsCell = document.createElement('th');
                var vsImage = document.createElement('img');
                vsImage.src = 'img/vs-sign.png';
                vsImage.alt = 'vs-sign';
                vsImage.width = 48;
                vsImage.height = 48;
                vsCell.appendChild(vsImage);
                newRow.appendChild(vsCell);

                // 2. Oyuncu
                var player2Cell = document.createElement('th');
                player2Cell.textContent = user.username; // Örneğin, kullanıcı adını alabilirsiniz
                newRow.appendChild(player2Cell);

                // Skor ve Kazanan hücreleri, bu verileri burada nasıl alacağınıza bağlı olarak güncelleyebilirsiniz.
                var scoreCell = document.createElement('th');
                scoreCell.textContent = '??';
                newRow.appendChild(scoreCell);

                var winnerCell = document.createElement('th');
                winnerCell.textContent = '??';
                newRow.appendChild(winnerCell);

                // Yeni satırı tabloya ekle
                tbody.appendChild(newRow);
            });

            newTable.appendChild(tbody);

            // Yeni tabloyu ekleyin
            tableBody.appendChild(newTable);
		}
		else 
		 console.log('error');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

	

	


function render(view) {
	app.innerHTML = view.innerHTML;
	friendscontrol();
	if (window.location.pathname != '/login' && window.location.pathname != '/register')
		checktoken();
	if (window.location.pathname == '/tournament-tables')
		tournamentTables();
	if (window.location.pathname == '/settings' || window.location.pathname == '/my-profile' || window.location.pathname == '/their-profile')
		checkGetMyProfile(window.location.pathname);
}




function renderError(error) {
  render(`<div class="error">${error}</div>`);
}

function navigateTo(path) {
	window.history.pushState(null, null, path);
  	router();
}





document.addEventListener('click', function(event) {
	if (event.target.matches('[data-link]') || event.target.tagName === 'A')
	{
		event.preventDefault();
		navigateTo(event.target.href);
	}
});



window.addEventListener('load', function(event) {
	init();
	event.preventDefault();
	router();
});

window.addEventListener('popstate', function(event) {
	event.preventDefault();
	router();
});

window.addEventListener('hashchange', function(event) {

	event.preventDefault();
	router();
});


function friendscontrol() {

    const userContainer = document.getElementById('user-list-container');


    if (userContainer) {
        // userContainer bulundu, gerekli işlemleri yapabilirsiniz
        if (userContainer.children.length === 0) {
            fetchFriendsList();
        } else {
            return;
        }
    } else {
        return;
    }
}

function init() {

	const links = document.querySelectorAll('[data-link]');
	for (let link of links) {
		link.addEventListener('click', function(event) {
			event.preventDefault();
			navigateTo(link.href);
		});
	}
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function selectOption(optionNumber) {

    const option = document.getElementById('head-and-tail-board');

	option.innerHTML = '';
	var brk = 0;
	while (brk < 30)
	{
		await sleep(100);
		option.innerHTML = '<a href="" ><img style="width: 314px; height="278"; justify-content: center;" src="img/ataturk.png" alt="Mustafa Kemal Atatürk" > </a>'
		await sleep(100);
		option.innerHTML = '<a href="" class="pong-logo-link"><img style="width: 318px; height="290"; src="img/cash-1.png" alt="cash-1"></a>'
		brk++;
	}

    // Random olarak 1 ve 2 arasından birini seç
    var randomOption = Math.floor(Math.random() * 2) + 1;

    // Eğer kullanıcının seçtiğiyle aynıysa, seçtiği yazı veya tura resmini göster
    if (randomOption === optionNumber) {
		option.innerHTML = '<a href="" class="pong-logo-link"><img src="img/1v1-win-sign.png" alt="Pong Logo"></a>'
        // Örneğin, bu kısımda başka bir animasyon veya gösterme işlemi yapabilirsiniz
    } else {
		option.innerHTML = '<div class="board-member-head" id ="head-option-atıs">' +' <a href="" class="pong-logo-link"><img src="img/sad-sign.png" alt="sad-sign"></a>'
		+ '</div>' + '<div> Kaybettin  </div>'

    }
}


function flashAnimation(element, duration) {
    var intervalId = setInterval(function () {
        element.style.visibility = (element.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 1000); // Her saniyede bir değiştir
    setTimeout(function () {
        clearInterval(intervalId);
        element.style.visibility = 'visible'; // Animasyon bittiğinde görünürlüğü geri al
    }, duration * 1000);
}

// Fade in/out animasyonu
function fadeAnimation(element, duration) {
    var opacity = 1;
    var step = 0.1;
    var intervalId = setInterval(function () {
        if (opacity <= 0) {
            step = 0.1; // Fade out tamamlandığında tekrar başa dön
        } else if (opacity >= 1) {
            step = -0.1; // Fade in tamamlandığında tekrar başa dön
        }
        element.style.opacity = opacity;
        opacity += step;
    }, 1000); // Her saniyede bir değiştir
    setTimeout(function () {
        clearInterval(intervalId);
        element.style.opacity = 1; // Animasyon bittiğinde opaklığı geri al
    }, duration * 1000);
}

