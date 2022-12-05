// {/* <a href="/login-page"><LoginButton/></a> */}

function LoginButton() {
    const handleClick = (event => { 
        console.log("wokring");
        console.log(document.querySelector('#login_button'))
        if (document.querySelector('#login_button').innerHTML === "Login") {
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
            <button onClick={handleClick} type="button" id="login_button" className="btn btn-md btn-outline-dark">
                Login
            </button>
        </div>  
    );
}

function Navbar() {
    fetch('/check-logged-in')
    .then(response => response.json())
    .then(responseJson => {
        // console.log(responseJson.logged_in);
        // console.log(document.querySelector('#login_button').innerHTML);
        if (responseJson.logged_in) {
            document.querySelector('#login_button').innerHTML = "Logout";
        }})
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-md navbar-light" style={{backgroundColor: "#E85A4F"}}>
                <a href="/" className="navbar-brand mb-0 h1"> Coders Assemble</a>
                <div id="login-b-cont"></div>
                <LoginButton/>
                <button type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                    className="navbar-toggler" aria-controls="navbarNav" 
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/create-profile" className="nav-link">
                                Create a Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/profile" className="nav-link">
                                View Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/create-project-proposal" 
                            className="nav-link">
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