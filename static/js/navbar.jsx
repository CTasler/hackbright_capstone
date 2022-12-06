// {/* <a href="/login-page"><LoginButton/></a> */}

function LoginButton() {
    const handleClick = (event => { 
        console.log(document.querySelector('#login-button'))
        if (document.querySelector('#login-button').innerHTML === "Login") {
            window.location = '/login-page'
        } else {
            fetch('/process-logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
              }) 
              .then((response) => window.location.replace(response.url))
        }
    
    
    });


    return (
        <div>    
            <button onClick={handleClick} type="button" id="login-button" 
            className="btn btn-md btn-dark" style={{fontFamily: "Orbitron", color: "#EAE7DC"}}>
                Login
            </button>
        </div>  
    );
}

function Navbar() {
    fetch('/check-logged-in')
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson.logged_in) {
            document.querySelector('#login-button').innerHTML = "Logout";
        }})
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-md navbar-light" style={{backgroundColor: "#E85A4F"}}>
                <a href="/" className="navbar-brand mb-0 home-link"> Coders Assemble</a>
                <LoginButton/>
                <button type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                    className="navbar-toggler" aria-controls="navbarNav" 
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/create-profile" className="nav-link big-text">
                                Create a Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/profile" className="nav-link big-text">
                                View Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/create-project-proposal" 
                            className="nav-link big-text">
                                Post a Project
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

ReactDOM.render(<Navbar />, document.querySelector('#navbar-cont'));