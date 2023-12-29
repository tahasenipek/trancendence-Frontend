
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
	'/join-random-tournament': {
		template: getTemplateByLang(language, 'join-random-tournament.html'),
		view: null
	},
	'/alone-tournament': {
		template: getTemplateByLang(language, 'alone-tournament.html'),
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
		//friendscontrol();
	}
}



async function router() {
	const route = window.location.pathname;
	const page = routes[route];
	if (page) {
		if (page.view){
			render(page.view);
		}
		else{
			if (window.location.pathname != '/login' && window.location.pathname != '/register')
				checktoken();
			if (window.location.pathname == '/settings' || window.location.pathname == '/my-profile')
				getmyprofile();
			const htmls = await fetch(page.template).then(response => response.text());
			const div = document.createElement('div');
			div.innerHTML = htmls;
			render(div);
			friendscontrol();
		}
	}
	else{
		renderError('404 Page not found');
	}
}

function render(view) {
  app.innerHTML = view.innerHTML;
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
	//frienduser();
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
	for (let i = 0; i < 5; i++)
	{
		if (i % 2 == 0)
		{
		 	await sleep(1000);
			option.innerHTML = '<a href="" ><img style="width: 100px; justify-content: center;" src="img/head.png" alt="Pong Logo" > </a>'
			await sleep(1000);
			option.innerHTML = '';
		}
		else
		{
			await sleep(1000);
			option.innerHTML = '<a href="" class="pong-logo-link"><img style="width: 100px;" src="img/tail.png" alt="Pong Logo"></a>'
			await sleep(1000);
			option.innerHTML = '';
			await sleep(1000);
			option.innerHTML = '<a href="" class="pong-logo-link"><img style="width: 100px;" src="img/tail.png" alt="Pong Logo"></a>'
		}
	}

    // Random olarak 1 ve 2 arasından birini seç
    var randomOption = Math.floor(Math.random() * 2) + 1;

    // Eğer kullanıcının seçtiğiyle aynıysa, seçtiği yazı veya tura resmini göster
    if (randomOption === optionNumber) {
		option.innerHTML = '<a href="" class="pong-logo-link"><img src="img/1v1-win-sign" alt="Pong Logo"></a>'
        // Örneğin, bu kısımda başka bir animasyon veya gösterme işlemi yapabilirsiniz
    } else {
		option.innerHTML = '<div class="board-member-head" id ="head-option-atıs">' +' <a href="" class="pong-logo-link"><img src="img/launch" alt="Pong Logo"></a>'
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

