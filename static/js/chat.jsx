function ChatMessage(props) {
    if (props.date == props.previous) {
        return (
            <div>
            <div className="flex-container" style={{justifyContent: "start"}}>
                <div className="chat-name rounded">
                    {props.username}
                </div>
                <div className="chat-message rounded">
                    {props.message}
                </div>
                <div className="chat-time rounded">
                    {props.time}
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div>
                <div className="chat-date" style={{textAlign: "center"}}>
                    {props.date}
                </div>
                <div className="flex-container" style={{justifyContent: "start"}}>
                    <div className="chat-name rounded">
                        {props.username}
                    </div>
                    <div className="chat-message rounded">
                        {props.message}
                    </div>
                    <div className="chat-time rounded">
                        {props.time}
                    </div>
                </div>
            </div>
        )
    }
}



function Chat() {
    let pathname_array = window.location.pathname.split("/");
    const project_id = pathname_array[pathname_array.length - 1];
    
    const [messages, setMessages] = React.useState([]);
    
    React.useEffect(() => {
        fetch(`/get-chat-messages?project_id=${project_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.chat_messages)
            setMessages(responseJson.chat_messages)
            console.log("working")
        })
    }, []);

    const chatMessages = [];
    let index = 0
    for (const currentMessage of messages) {
        if (index == 0) {
            chatMessages.push(
                <ChatMessage
                username={currentMessage.username}
                message={currentMessage.message}
                date={currentMessage.date}
                time={currentMessage.time}
                />
            )
        } else {
            chatMessages.push(
                <ChatMessage
                username={currentMessage.username}
                message={currentMessage.message}
                date={currentMessage.date}
                time={currentMessage.time}
                previous={messages[index - 1].date}
                />)
        }
        index += 1
    }

    const [newMessage, setNewMessage] = React.useState("");

    const changeHandler = (event) => {
        setNewMessage(event.target.value)
    };

    const submitHandler = (event) => {
        event.preventDefault();
        let date = new Date().toDateString();
        let time = new Date().toLocaleTimeString();
        const formatTime = time.slice(0,5) + " " + time.slice(-2, );

        const data = {
            project_id: project_id, 
            message: newMessage,
            date: date, 
            time: formatTime, 
        };

        fetch('/chat-submission', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(window.location.reload())
        
    };


    return (

    <div>
        <div>
            <h2 className="title" style={{textAlign: "left"}}>Messages</h2>
            <div className="chatbox rounded">
                {chatMessages}  
            </div>
        </div>
        <div style={{marginTop: "10px"}}>
            <form className="flex-container" onSubmit={submitHandler}>
                <input type="text" placeholder="Message Your Team" style={{width: "90%"}} className="rounded" onChange={changeHandler}/>
                <input type="submit" value="SEND" className="submit btn btn-outline-light btn-md" style={{color: "#E85A4F"}}/>
            </form>
        </div>
    </div>

    ) 
    
}

ReactDOM.render(<Chat/>, document.querySelector('#chat-cont'));