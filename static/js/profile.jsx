function Profile() {
    
    return (
        <div className="boarder">
          <h1> Profile </h1>
          <p> First Name:  </p>
          <p> Last Name: </p>
          <p> Username:  </p>
          <p> Bio: </p>
          <p> Contact Preferences: </p>
          <p> GitHub URL: </p>
          <p> Linkedin URL:  </p>
          <p> Experience Level:</p>
          <p> Current or Previous Roles: </p>
      </div>
    );
}


ReactDOM.render(<Profile />, document.querySelector('#profile-cont'));