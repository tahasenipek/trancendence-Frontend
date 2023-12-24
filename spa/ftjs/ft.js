
const app = document.querySelector('body');

const routes = {
	'/': {
		template: '/pages/login.html',
		view: null
	},
	'/being-match': {
		template: '/pages/being-match.html',
		view: null
	},
	'/create-tournament': {
		template: '/pages/create-tournament.html',
		view: null
	},
	'/register': {
		template: '/pages/register.html',
		view: null
	},
	'/join-tournament': {
		template: '/pages/join-random-tournament.html',
		view: null
	},
	'/pong-time': {
		template: '/pages/pong-time.html',
		view: null
	},
	'/games' : {
		template: '/pages/games.html',
		view: null
	},
	'/my-profile' : {
		template: '/pages/my-profile.html',
		view: null
	},
	'/settings' : {
		template: '/pages/settings.html',
		view: null
	},
	'/login': {
		template: '/pages/login.html',
		view: null
	},
}




async function router() {
	const route = window.location.pathname;
	const page = routes[route];
	console.log('route', route);
	if (page) {
		if (page.view){
			render(page.view);
		}
		else{
			if (page.template != '/pages/login.html' && page.template != '/pages/register.html')
				checktoken();
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



function init() {

	const links = document.querySelectorAll('[data-link]');
	for (let link of links) {
		link.addEventListener('click', function(event) {
			console.log('link clicked');
			event.preventDefault();
			navigateTo(link.href);
		});
	}
}



/* 

function tag(name, ...children) {
    const result = document.createElement(name);
    for (const child of children) {
        if (typeof(child) === 'string') {
            result.appendChild(document.createTextNode(child));
        } else {
            result.appendChild(child);
        }
    }

    result.att$ = function(name, value) {
        this.setAttribute(name, value);
        return this;
    };

    result.onclick$ = function(callback) {
        this.onclick = callback;
        return this;
    };

    return result;
}


const MUNDANE_TAGS = ["canvas", "h1", "h2", "h3", "p", "a", "div", "span", "select"];
for (let tagName of MUNDANE_TAGS) {
    window[tagName] = (...children) => tag(tagName, ...children);
}

function img(src) {
    return tag("img").att$("src", src);
}

function input(type) {
    return tag("input").att$("type", type);
}
 */



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function selectOption(optionNumber) {
    console.log('Seçilen seçenek:', optionNumber);

    const option = document.getElementById('head-and-tail-board');

	console.log(option);
	option.innerHTML = '';
	for (let i = 0; i < 5; i++)
	{
		console.log(i);
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