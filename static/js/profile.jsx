function Profile() {
    
    return (
        <div>
          <h1> Profile Preview </h1>
          <p> First Name:  </p>
          <p> Last Name: </p>
          <p> Username:  </p>
          <p> Password: </p>
          <p> Bio: </p>
          <p> Contact Preferences: </p>
          <p> GitHub URL: </p>
          <p> Linkedin URL:  </p>
          <p> Experience Level:</p>
          <p> Current or Previous Roles: </p>
          <ul>
              <li></li>
          </ul>
      </div>
    );
}


ReactDOM.render(<Profile />, document.querySelector('#profile-cont'));