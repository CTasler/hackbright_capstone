function Profile() {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
      fetch("/user-info.json")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.user_data)
      })
      }, []);


    return (
        <div className="boarder">
          <div className="floatbuttonr">
            <a href="/edit-profile">
              <button>Edit Profile</button>
            </a>
          </div>
          <div>
            <h1> Profile: </h1>
            <p> First Name: {data.fname} </p>
            <p> Last Name: {data.lname} </p>
            <p> Username: {data.username} </p>
            <p> Bio: {data.bio}</p>
            <p> Contact Preferences: {data.contact_pref}</p>
            <p> GitHub URL: <a href={`${data.github_url}`}>{data.github_url}</a> </p>
            <p> Linkedin URL: <a href={`${data.linkedin_url}`}>{data.linkedin_url}</a> </p>
            <p> Experience Level: {data.exp_level}</p>
            <p> Current or Previous Roles: {data.roles} </p>
          </div>
      </div>
    );
}


ReactDOM.render(<Profile />, document.querySelector('#profile-cont'));

// {data.roles.join(", ")}