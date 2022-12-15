function Title() {
    return (        
        <div id="projtitle" className="title" >
            <h1>Coders Assemble</h1>
            <h2>Where inspiration meets action.</h2>
            <hr></hr>
        </div>
    );
}

ReactDOM.render(<Title />, document.querySelector('#title-cont'));
