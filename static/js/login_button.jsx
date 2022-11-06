// function LoginButton() {
//     const handleClick = ('click', () => {
//         $('#myModal').modal(options);
//     })

//     return (
//         <div>    
//             <button onClick={handleClick} type="button" id="login_button">Login</button>
//         </div>  
//     );
// }

// ReactDOM.render(<LoginButton />, document.querySelector('#login-b-cont'));


export function LoginButton() {

    const handleClick = ('click', () => {
        console.log("you clicked me")
    });

    return (
        <div>    
            <button onClick={handleClick} type="button" id="login_button">
                Login
            </button>
        </div>  
    );
}


