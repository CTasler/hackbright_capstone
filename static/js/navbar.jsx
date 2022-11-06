function LoginButton() {
    const handleClick = ('click', () => {
        $('#myModal').modal(options);
    })

    return (
        <div>    
            <button onClick={handleClick} type="button" id="login_button">
                Login
            </button>
        </div>  
    );
}

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
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
                        <li className="nav-item active">
                            <a href="/create-project-proposal" 
                            className="nav-link">
                                Post a Project
                            </a>
                        </li>
                        <li className="nav-item disabled">
                            <a href="/profile" className="nav-link">
                                View Profile
                            </a>
                        </li>
                        <li className="nav-item disabled">
                            <a href="/create-profile" className="nav-link">
                                Create a Profile
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

ReactDOM.render(<Navbar />, document.querySelector('#navbar-cont'));