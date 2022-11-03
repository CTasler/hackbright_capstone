function LoginButton() {
    const handleClick = ('click', () => {
        $('#myModal').modal(options);
    })

    return (
        <div>    
            <button onClick={handleClick} type="button" id="login_button">Login</button>
        </div>  
    );
}

ReactDOM.render(<LoginButton />, document.querySelector('#login-b-cont'));

