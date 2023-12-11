
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
	'/games' : {
		template: '/pages/games.html',
		view: null
	},
	'/profile' : {
		template: '/pages/profile.html',
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

	if (page) {
		if (page.view){
			render(page.view);
		}
		else{
			const htmls = await fetch(page.template).then(response => response.text());
			const div = document.createElement('div');
			div.innerHTML = htmls;
			render(div
				);
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





