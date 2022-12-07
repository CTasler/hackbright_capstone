function Title() {
    return (        
        <div id="projtitle" className="title" >
            <h1>Coders Assemble</h1>
            <h3>Where inspiration meets action.</h3>
            <hr></hr>
        </div>
    );
}

ReactDOM.render(<Title />, document.querySelector('#title-cont'));
