function Login() {
    const [loginData, setLoginData] = React.useState({ 
        username: "",
        password: ""
    });
    
    const changeHandler = (event) => {
        setLoginData({...loginData, [event.target.name]: event.target.value});
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(loginData)

        fetch('/process-login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        .then((response) => window.location.replace(response.url))
    }


    return (
        <div>
            <div>
                <div className="title">
                    <h1>Login</h1>
                    <hr></hr>
                </div>
                <div id="login-form">
                    <form onSubmit={submitHandler}>
                        <div className="inner-flex-container">
                            <div className="col-5">
                                <div>
                                    <label htmlFor="username_login">
                                        Username</label>
                                </div>
                                <div>
                                    <input type="text" name="username" 
                                    id="username_login"
                                    className="form-control-sm"
                                    value={loginData.username} 
                                    style={{width: '100%'}}
                                    onChange={changeHandler}></input>
                                </div>
                            </div>
                            <div className="col-5">
                                <div>
                                    <label htmlFor="password_login">
                                        Password</label>
                                </div>
                                <div>
                                    <input type="password" name="password" 
                                    id="password_login"
                                    className="form-control-sm"
                                    value={loginData.password} 
                                    style={{width: '100%'}}
                                    onChange={changeHandler}></input>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            <input type="submit" id="login-btn-submit" 
                            className="submit btn btn-outline-dark btn-md" 
                            value="Login"/>
                            <p>Don't have an account?</p>
                            <a href="/create-profile" >Create a profile</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<Login/>, document.querySelector('#login-cont'));