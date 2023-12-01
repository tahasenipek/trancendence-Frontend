     
function renderLoginPage() {
    document.getElementById('navbar-container').innerHTML = ``;
    document.getElementById('app').innerHTML = `
            <div class="index-body">
            <div class="left-side">
            <div class="content-left">
            <img src="img/trancendence_logo_back.jpg" alt="">
            </div>
            </div>
            <div class="right-side">
            <div class="content">
            <div class="input-container">
            <h1 style="color: #FDB827;">hello friend,</h1>
            <p style="color: #000">login to your account</p>
            <form id="loginUser" class="input-form-container"></form>
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password"> 
            <button type="button" href="" onclick="event.preventDefault(); renderPage('games')">Login</button>
            </form>
            <p style="color: #FDB827;"> or </p>
            <a href="img/42-account-logo.jpg" target="_blank">
            <img src="img/42-account-logo.jpg" alt="42-logo">
            </a>
            <p style="margin-bottom: 10%; color: rgba(0, 0, 0, 0.50);"> Create a new user?
                <a style="color: #FDB827;" href="" onclick="event.preventDefault(); renderPage('register')"> SIGN IN</a>
            </p>
        </div>
        </div>
        </div>
        </div>
        `;

}

function renderRegistrationPage() {
    document.getElementById('navbar-container').innerHTML = ``;
    document.getElementById('app').innerHTML = `
    <div class="index-body">
    <div class="left-side">
    <div class="content-left">
    <img src="img/trancendence_logo_stranger.jpg" alt="">
    </div>
    </div>
    <div class="right-side">
    <div class="content">
    <div class="input-container">
    <h1 style="color: #FDB827;">hello,</h1>
    <p style="color: #000">create a new account</p>
    <form id="registrationForm" class="input-form-container">
    <input type="text" id="username" placeholder="Username" required>
    <input type="email" id="email" placeholder="Email Address" required>
    <input type="password" id="password" placeholder="Password" required>
    <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
    <button type="button" href="" onclick="event.preventDefault(); renderPage('home')">sign in</button>
    </form>
    <p style="margin-bottom: 10%; color: rgba(0, 0, 0, 0.50);">Hesabınız var mı? <a style="color: #FDB827;"  href="" onclick="event.preventDefault(); renderPage('/')">LOG IN</a></p>
    </div>
    </div>
    </div>
    </div>
    `;
}

function renderGamesPage() {
    document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
    document.getElementById('app').innerHTML = `
    <div class="games-page">
    <div class="game-template">
    <div class="board-template">
    <h2 style="color: #5D1D88; font-size: 40px;"> choose game !</h2>
    <div class="board">
    <a href="" onclick="event.preventDefault(); renderPage('pong-time')"><img src="img/pong-img.jpg" alt="Pong Logo" ></a>
    <a href="" class="question-mark"><img src="img/question-mark-new.png" alt="question-mark"></a>
    <a href="" class="pong-logo-link"><img src="img/yazi-tura.jpg" alt="Pong Logo"></a>
    </div>
    </div>
    </div>
    <div class="users-board">
    <h3> Add Friend </h3>
    <input style="border-radius: 20px; padding: 5%;" type="text" placeholder="@  Search..." class="search">
    <div class="scrollbox">
    <div class="scrollbox-inner">
    <ul id="user-list"><span class="online-dot-online"></span>aoner</ul>
    <ul id="user-list"><span class="online-dot-online"></span>buozdemi</ul>
    <ul id="user-list"><span class="online-dot-online"></span>msenipek</ul>
    <ul id="user-list"><span class="online-dot-online"></span>nkahrima</ul>
    <ul id="user-list"><span class="online-dot-online"></span>ialgac</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>jennifer</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>michael</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>george</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>brad</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>leonardo</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>fred</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>denwill</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>mason</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>liam</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>sophie</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>emma</ul>
    <ul id="user-list"><span class="online-dot-offline"></span>clooney</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>xavier</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>abraham</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>ilasic</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>paul</ul>
                    </div>
                    </div>
                    </div>
                    </div>
                    `;
                }
                
                function renderProfilePage() {
                    document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
                    document.getElementById('app').innerHTML = `<div class="profile-page">
                    <div class="users-board">
                    <h3> Profile </h3>
                    <div class="users-board-info">
                    <p> Username: </p>
                    <p> Email: </p>
                    <p> Password: </p>
                    </div>
                    <div class="users-board-buttons">
                    <button class="users-board-button" href="" onclick="event.preventDefault(); renderPage('settings')"> Edit Profile </button>
                    <button class="users-board-button" > Delete Profile </button>
                    </div>
                    </div>
                    <div class="match-board-settings">
                    <div class="match-history-pong-info">
                    <img src="img/pong-img.jpg
                    " alt="Pong" class="pong">
                    <h2> Match History </h2>
                    <p> Match 1 </p>
                    <p> Match 2 </p>
                    <p> Match 3 </p>
                    <p> Match 4 </p>
                    <p> Match 5 </p>
                    </div>
                    <div class="match-history-headortails-info">
                    <img src="img/yazi-tura.jpg" alt="Coin" class="coin">
                    <h2> Head or Tails </h2>
                    <p> Match 1 </p>
                    <p> Match 2 </p>
                    <p> Match 3 </p>
                    <p> Match 4 </p>
                    <p> Match 5 </p>
                    </div>
    </div>
    </div>
    `;
}

function renderSettingsPage() {
    document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
    document.getElementById('app').innerHTML = `
    <div class="game-template">
    <div class="user-settings-box">
    <h1 style="color: #FDB827;">edit profile,</h1>
    <form id="user-settings-form" class="user-settings-form">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Enter your username">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email">
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password">
    
    <label for="language">Language:</label>
    <select id="language" name="language">
    <option value="english">English</option>
    <option value="turkish">Turkish</option>
    </select>
    <button class ="settings-button" type="button" >Login</button>
    </form>
    </div>
    </div>
    <div class="users-board-settings">
    <h3> Profile İmage </h3>
    <img src="img/profile-img.jpg" alt="Pong Logo" class="profile-img">
    <input type="file" id="file">
    </div>
    </div>
    `;
}

function renderpongtimePage() {
    document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
    document.getElementById('app').innerHTML = `
    <div class="games-page">
    <div class="game-template">
    <div class="board-template">
    <h2 style="color: #5D1D88; font-size: 40px;"> create or join</h2>
    <div class="board">
                    <a href="" onclick="event.preventDefault(); renderPage('being-match')" ><img src="img/1v1-random.jpg" alt="Pong Logo"></a>
                    <a href="" class="question-mark"><img src="img/question-mark-new.png" alt="question-mark"></a>
                    <a href="" onclick="event.preventDefault(); renderPage('tournament')" class="pong-logo-link"><img src="img/cup-tournament.jpg" alt="Pong Logo"></a>
                    </div>
                    </div>
                    </div>
                    <div class="users-board">
                    <h3> Add Friend </h3>
                    <input style="border-radius: 20px; padding: 5%;" type="text" placeholder="@  Search..." class="search">
                    <div class="scrollbox">
                    <div class="scrollbox-inner">
					<ul id="user-list"><span class="online-dot-online"></span>aoner</ul>
					<ul id="user-list"><span class="online-dot-online"></span>buozdemi</ul>
					<ul id="user-list"><span class="online-dot-online"></span>msenipek</ul>
					<ul id="user-list"><span class="online-dot-online"></span>nkahrima</ul>
					<ul id="user-list"><span class="online-dot-online"></span>ialgac</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>jennifer</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>michael</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>george</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>brad</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>leonardo</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>fred</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>denwill</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>mason</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>liam</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>sophie</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>emma</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>clooney</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>xavier</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>abraham</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>ilasic</ul>
					<ul id="user-list"><span class="online-dot-offline"></span>paul</ul>
                    </div>
                    </div>
                    </div>
                    </div>
                    `;
                }

                
                function renderbeingmatchPage() {
                    document.getElementById('navbar-container').innerHTML = `
                    <navbar class="navbar">
                    <div class="navbar-container">
                        <a href="" onclick="event.preventDefault(); renderPage('games')">
                            <div style="display: flex; align-items: center; margin-left: 10px;">
                                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                                <div style="margin-right: 10px;"></div>
                                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                                </div>
                                </a>
                                <a href="" onclick="event.preventDefault(); renderPage('games')">
                                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                                </a>
                                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                                <div style="margin-right: 80px;">
                                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                                </div>
                                </a>
                                </div>
                                </navbar>
                                `;
                    document.getElementById('app').innerHTML = `<div class="games-page">
                    <div class="game-template">
                    <div class="board-template">
                    <h2 style="color: #5D1D88; font-size: 40px;"> 1v1 being matched... </h2>
                    <div class="board">
                    <a href=""><img src="img/1v1-profile-img.jpg" alt="Pong Logo"></a>
                    <a href="" class="question-mark"><img src="img/sand-watch.jpg" alt="question-mark"></a>
                    <a href="" class="pong-logo-link"><img src="img/waiting-box.jpg" alt="Pong Logo"></a>
                    </div>
                    </div>
                    </div>
                    <div class="users-board">
                    <h3> Add Friend </h3>
                    <input style="border-radius: 20px; padding: 5%;" type="text" placeholder="@  Search..." class="search">
        <div class="scrollbox">
            <div class="scrollbox-inner">
            <ul id="user-list"><span class="online-dot-online"></span>aoner</ul>
            <ul id="user-list"><span class="online-dot-online"></span>buozdemi</ul>
            <ul id="user-list"><span class="online-dot-online"></span>msenipek</ul>
            <ul id="user-list"><span class="online-dot-online"></span>nkahrima</ul>
            <ul id="user-list"><span class="online-dot-online"></span>ialgac</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>jennifer</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>michael</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>george</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>brad</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>leonardo</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>fred</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>denwill</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>mason</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>liam</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>sophie</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>emma</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>clooney</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>xavier</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>abraham</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>ilasic</ul>
            <ul id="user-list"><span class="online-dot-offline"></span>paul</ul>
            </div>
            </div>
            </div>
            </div>
            `;
        }
                
        function renderTournamentPage() {
            document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
    document.getElementById('app').innerHTML = `<div class="games-page">
    <div class="game-template">
        <div class="board-template">
            <h2 style="color: #5D1D88; font-size: 40px;"> create or join</h2>
            <div class="board">
                <a href="" onclick="event.preventDefault(); renderPage('create-tournament')"><img src="img/create-tour.jpg" alt="Pong Logo"></a>
                <a href="" class="question-mark"><img src="img/question-mark-new.png" alt="question-mark"></a>
                <a href="" onclick="event.preventDefault(); renderPage('join-random-tournament') class="pong-logo-link"><img src="img/join-random-tour.jpg" alt="Pong Logo"></a>
            </div>
        </div>
    </div>
    <div class="users-board">
        <h3> Add Friend </h3>
        <input style="border-radius: 20px; padding: 5%;" type="text" placeholder="@  Search..." class="search">
        <div class="scrollbox">
            <div class="scrollbox-inner">
                <ul id="user-list"><span class="online-dot-online"></span>aoner</ul>
                <ul id="user-list"><span class="online-dot-online"></span>buozdemi</ul>
                <ul id="user-list"><span class="online-dot-online"></span>msenipek</ul>
                <ul id="user-list"><span class="online-dot-online"></span>nkahrima</ul>
                <ul id="user-list"><span class="online-dot-online"></span>ialgac</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>jennifer</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>michael</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>george</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>brad</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>leonardo</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>fred</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>denwill</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>mason</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>liam</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>sophie</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>emma</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>clooney</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>xavier</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>abraham</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>ilasic</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>paul</ul>
            </div>
        </div>
        </div>
    </div>
    `;
}

function renderCreateTournamentPage() {
    document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
    document.getElementById('app').innerHTML = ` <div class="games-page">
    <div class="game-template">
        <div class="board-template">
            <h2 style="color: #5D1D88; font-size: 35px;"> woww, that’ll be crazy TOURNAMENT!</h2>
            <div class="board">
                <a href=""> <img src="img/foursome.jpg"></a>
                <a href="" class="question-mark"><img src="img/eightsome.jpg" alt="question-mark"></a>
                <a href="" class="pong-logo-link"><img src="img/hexedecimal.jpg" alt="Pong Logo"></a>
            </div>
            <div class="nick-create">
                <input type="text" id="nickname" placeholder="Nickname">
                <button>Create</button>
            </div>
        </div>
    </div>
    <div class="users-board">
        <h3> Add Friend </h3>
        <input style="border-radius: 20px; padding: 5%;" type="text" placeholder="@  Search..." class="search">
        <div class="scrollbox">
            <div class="scrollbox-inner">
                <ul id="user-list"><span class="online-dot-online"></span>aoner</ul>
                <ul id="user-list"><span class="online-dot-online"></span>buozdemi</ul>
                <ul id="user-list"><span class="online-dot-online"></span>msenipek</ul>
                <ul id="user-list"><span class="online-dot-online"></span>nkahrima</ul>
                <ul id="user-list"><span class="online-dot-online"></span>ialgac</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>jennifer</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>michael</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>george</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>brad</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>leonardo</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>fred</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>denwill</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>mason</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>liam</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>sophie</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>emma</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>clooney</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>xavier</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>abraham</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>ilasic</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>paul</ul>
            </div>
        </div>
        </div>
    </div>`;
}

function renderJoinRandomTournamentPage() {
    document.getElementById('navbar-container').innerHTML = `
    <navbar class="navbar">
    <div class="navbar-container">
        <a href="" onclick="event.preventDefault(); renderPage('games')">
            <div style="display: flex; align-items: center; margin-left: 10px;">
                <img src="img/site-logo.png" alt="Site Logo" class="logo" width="49.17" height="37">
                <div style="margin-right: 10px;"></div>
                <img src="img/trancendence-logo.png" alt="Site Name" class="logo-text" width="116" height="15">
                </div>
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('games')">
                <img src="img/game-sign.png" alt="Game Logo" class="game-logo">
                </a>
                <a href="" onclick="event.preventDefault(); renderPage('profile')">
                <div style="margin-right: 80px;">
                <img src="img/small-user-photo.png" alt="Profil" class="profile-img" width="46" height="46">
                </div>
                </a>
                </div>
                </navbar>
                `;
    document.getElementById('app').innerHTML = `<div class="games-page">
    <div class="game-template">
        <div class="board-template">
            <h2 style="color: #5D1D88; font-size: 25px; margin-top: 6%;"> woww, that’ll be crazy TOURNAMENT!</h2>
            <div class="board-column">
                <a href=""> <img src="img/sand-watch.jpg"></a>
                <a href="" class="question-mark"><img src="img/eightsome.jpg" alt="question-mark"></a>
            </div>
            <div class="nick-create">
                <input type="text" id="nickname" placeholder=" Friend Nickname">
                <button>invite</button>
            </div>
        </div>
    </div>
    <div class="users-board">
        <h3> Add Friend </h3>
        <input style="border-radius: 20px; padding: 5%;" type="text" placeholder="@  Search..." class="search">
        <div class="scrollbox">
            <div class="scrollbox-inner">
                <ul id="user-list"><span class="online-dot-online"></span>aoner</ul>
                <ul id="user-list"><span class="online-dot-online"></span>buozdemi</ul>
                <ul id="user-list"><span class="online-dot-online"></span>msenipek</ul>
                <ul id="user-list"><span class="online-dot-online"></span>nkahrima</ul>
                <ul id="user-list"><span class="online-dot-online"></span>ialgac</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>jennifer</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>michael</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>george</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>brad</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>leonardo</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>fred</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>denwill</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>mason</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>liam</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>sophie</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>emma</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>clooney</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>xavier</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>abraham</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>ilasic</ul>
                <ul id="user-list"><span class="online-dot-offline"></span>paul</ul>
            </div>
        </div>
    </div>
</div>
    `;
}

 const routes = {
    '/': renderLoginPage,
    'register': renderRegistrationPage,
    'games': renderGamesPage,
    'profile': renderProfilePage,
    'settings': renderSettingsPage,
    'pong-time': renderpongtimePage,
    'being-match': renderbeingmatchPage,
    'tournament': renderTournamentPage,
    'create-tournament': renderCreateTournamentPage,
    'join-random-tournament': renderJoinRandomTournamentPage,
 };

 function renderPage(path) {
    const routeFunction = routes[path];

    if (routeFunction === renderLoginPage)
    {
        updateHistory(path);
        renderLoginPage();
    }
    else if (routeFunction === renderRegistrationPage)
    {
        renderRegistrationPage();
    }
    else if (routeFunction === renderGamesPage)
        renderGamesPage();
    else if (routeFunction === renderProfilePage)
        renderProfilePage();
    else if (routeFunction === renderSettingsPage)
        renderSettingsPage();
    else if (routeFunction === renderpongtimePage)
        renderpongtimePage();
    else if (routeFunction === renderbeingmatchPage)
        renderbeingmatchPage();
    else if (routeFunction === renderTournamentPage)
        renderTournamentPage();
    else if (routeFunction === renderCreateTournamentPage)
        renderCreateTournamentPage();
    else if (routeFunction === renderJoinRandomTournamentPage)
        renderJoinRandomTournamentPage();
    else
        renderLoginPage();
}


function updateHistory(path) {
    const state = {
        path: path,
        title: document.title,
    };

    window.history.pushState(state, state.title, state.path);
}

window.addEventListener('popstate', function (event) {
    const state = event.state;
    if (state) {
        document.title = state.title;
        renderPage(state.path);
    }
    else
        exit();
});

window.onload = function () {
    renderPage(window.location.pathname);
}