function Chat() {
    const [message, setMessage] = React.useState("")

    const changeHandler = (event) => {
        setMessage(event.target.value)

    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(message)

    }
    return (

    <div>
        <div style={{backgroundColor: 'black'}}>
            <p>Messages</p>
        </div>
        <div>
            <form className="flex-container" onSubmit={submitHandler}>
                <input type="text" placeholder="Message Team Members" className="rounded" onChange={changeHandler}/>
                <input type="submit" className="submit btn btn-outline-dark btn-md"/>
            </form>
        </div>
    </div>

    )
    
}

ReactDOM.render(<Chat/>, document.querySelector('#chat-cont'));