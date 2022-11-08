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
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Login</h1>
                </div>
                <div className="body">
                    <form onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div>
                            <input type="text" name="username" 
                            id="username_login" value={loginData.username} 
                            onChange={changeHandler}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div>
                            <input type="password" name="password" 
                            id="password_login" value={loginData.password} 
                            onChange={changeHandler}></input>
                        </div>
                        <input type="submit" value="Login"/>
                        <p>Don't have an account?</p>
                        <a href="/create-profile" >Create a profile</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<Login/>, document.querySelector('#login-cont'));