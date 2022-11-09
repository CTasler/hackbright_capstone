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
          <h1> Profile: </h1>
          <p> First Name: {data.fname} </p>
          <p> Last Name: {data.lname} </p>
          <p> Username: {data.username} </p>
          <p> Bio: {data.bio}</p>
          <p> Contact Preferences: {data.contact_pref}</p>
          <p> GitHub URL: {data.github_url} </p>
          <p> Linkedin URL: {data.linkedin_url} </p>
          <p> Experience Level: {data.exp_level}</p>
          <p> Current or Previous Roles: {data.roles} </p>
      </div>
    );
}


ReactDOM.render(<Profile />, document.querySelector('#profile-cont'));

// {data.roles.join(", ")}