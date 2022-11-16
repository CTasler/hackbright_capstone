function ProfilePreview(props) {
    let contactString = ''
    const contacts = props.contact_pref
    for (const contact of contacts) {
      if (contact != null) {
      contactString += `${contact}, `
      }
    }
  
    let rolesString = ''
    const roles = props.roles
    for (const role of roles) {
      if (role != null) {
      rolesString += `${role}, `
      }
    }
  
    return (
        <div>
            <h1> Profile Preview </h1>
            <p> First Name: {props.fname} </p>
            <p> Last Name: {props.lname} </p>
            <p> Username: {props.username} </p>
            <p> Bio: {props.bio} </p>
            <p> Contact Preferences: {contactString}</p>
            <p> GitHub URL: {props.github_link} </p>
            <p> Linkedin URL: {props.linkedin_link} </p>
            <p> Experience Level: {props.exp_level} </p>
            <p> Current or Previous Roles: {rolesString}</p>
        </div>
    )
  }
  
  
  
  
  function EditProfile() {
    const [data, setData] = React.useState({fname: '',
    lname: '',
    username: '',
    pwd: '', 
    bio: '',
    contact_pref: [], 
    github_link: '', 
    linkedin_link: '', 
    exp_level: '', 
    roles: [],})

    React.useEffect(() => {
      fetch("/user-info.json")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.user_data.bio)
        setData({
            fname: responseJson.user_data.fname,
            lname: responseJson.user_data.lname,
            username: responseJson.user_data.username,
            pwd: "", 
            bio: responseJson.user_data.bio,
            contact_pref: [], 
            github_link: responseJson.user_data.github_url, 
            linkedin_link: responseJson.user_data.linkedin_url, 
            exp_level: responseJson.user_data.exp_level, 
            roles: [],
          })
      })
      }, []);
  
  
    const changeHandler = (event) => {
      setData({...data, [event.target.name]: event.target.value});
      if (event.target.name === "username") {
        fetch(`/available-usernames?username=${event.target.value}`)
        .then((response) => response.text())
        .then((status) => {
          if (status === "unavailable") {
            document.querySelector("#username-available").innerHTML = "*username NOT available"
          } else if (status === "available") {
            document.querySelector("#username-available").innerHTML = "*username is available"
          }
        })
      }
    }
  
  
    const contactHandler = (event) => {    
      const copiedData = JSON.parse(JSON.stringify(data));
      const contactPref = copiedData.contact_pref
  
      if(event.currentTarget.checked) {
        contactPref.push(event.target.value)
      } else {
      const index = contactPref.indexOf(event.target.value);
      contactPref[index] = null;
     }
      console.log(copiedData)
      setData(copiedData);
    };
  
    const rolesHandler = (event) => {    
      const copiedData = JSON.parse(JSON.stringify(data));
      const roles = copiedData.roles
  
      if(event.currentTarget.checked) {
        roles.push(event.target.value)
      }
  
     else {
      const index = roles.indexOf(event.target.value);
      roles[index] = null;
     }
     setData(copiedData);
   };
  
    const submitHandler = (event) => {
      event.preventDefault();
      console.log(data);
  
      console.log(document.querySelector("#username-available").innerHTML)
      if (document.querySelector("#username-available").innerHTML === 
      "*username NOT available") {
        alert("Username already exists. Please provide a unique username.")
      } else {
        fetch('/profile-edit-submission.json', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        }) 
        .then((response) => window.location.replace(response.url))
      }
    };
  
    return (
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="fname">First Name:</label>
            <input type="text" name="fname" id="fname" value={data.fname} 
            onChange={changeHandler} required />
          </div>
          <div>
            <label htmlFor="lname">Last Name:</label>
            <input type="text" name="lname" id="lname" value={data.lname} 
            onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" 
            value={data.username} 
            onChange={changeHandler} required />
            <p id="username-available">*username is available</p>
          </div>
          <div>
            <label htmlFor="pwd">Password:</label>
            <input type="password" name="pwd" id="pwd" value={data.pwd} 
            onChange={changeHandler} required></input>
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
          </div>
          <div>
            <textarea name="bio" id="bio" rows="4" cols="50" value={data.bio} 
            onChange={changeHandler} required></textarea>
          </div>
          <div> 
            <fieldset>
                <legend>Contact Preferences:</legend>
                <div>
                  <input type="checkbox" name="contact_pref" id="phone" 
                  value="Phone" onChange={contactHandler} />
                  <label htmlFor="trainee">Phone</label>
                </div>
                <div>
                  <input type="checkbox" name="contact_pref" id="email" 
                  value="Email" onChange={contactHandler}/>
                  <label htmlFor="junior">Email</label>
                </div>
                <div>
                  <input type="checkbox" name="contact_pref" id="slack" 
                  value="Slack" onChange={contactHandler} />
                  <label htmlFor="slack">Slack</label>
                </div>
                <div>
                  <input type="checkbox" name="contact_pref" id="discord" 
                  value="Discord" onChange={contactHandler} />
                  <label htmlFor="discord">Discord</label>
                </div>
            </fieldset>
          </div>
          <div>
            <label htmlFor="github_link">GitHub URL:</label>
            <input type="url" name="github_link" id="github_link" 
            value={data.github_link} onChange={changeHandler}/>
          </div>
          <div>
            <label htmlFor="linkedin_link">Linkedin URL:</label>
            <input type="url" name="linkedin_link" id="linkedin_link" 
            value={data.linkedin_link} onChange={changeHandler}/>
          </div>
          <div> 
            <fieldset>
                <legend>Experience Level:</legend>
                <div>
                  <input type="radio" name="exp_level" id="trainee" 
                  value="Trainee Software Engineer" onChange={changeHandler} />
                  <label htmlFor="trainee">Trainee Software Engineer</label>
                </div>
                <div>
                  <input type="radio" name="exp_level" id="junior" 
                  value="Junior Software Engineer" onChange={changeHandler} />
                  <label htmlFor="junior">Junior Software Engineer</label>
                </div>
                <div>
                  <input type="radio" name="exp_level" id="mid_level" 
                  value="Mid-level Software Engineer" onChange={changeHandler}/>
                  <label htmlFor="mid_level">Mid-level Software Engineer</label>
                </div>
                <div>
                  <input type="radio" name="exp_level" id="senior" 
                  value="Senior Software Engineer" onChange={changeHandler} />
                  <label htmlFor="senior">Senior Software Engineer</label>
                </div>
                <div>
                  <input type="radio" name="exp_level" id="lead" 
                  value="Lead Software Engineer" onChange={changeHandler} />
                  <label htmlFor="lead">Lead Software Engineer</label>
                </div>
            </fieldset>  
          </div>
          <div>
            <fieldset>
                <legend>Current or Previous Roles:</legend>
                <div>
                  <input type="checkbox" name="roles" id="back_end" 
                  value="Back-end Engineer" onChange={rolesHandler} />
                  <label htmlFor="back_end">Back-end Engineer</label>
                </div>
                <div>
                  <input type="checkbox" name="roles" id="front_end" 
                  value="Front-end Engineer" onChange={rolesHandler} />
                  <label htmlFor="front_end">Front-end Engineer</label>
                </div>
                <div>
                  <input type="checkbox" name="roles" id="mobile" 
                  value="Mobile Developer" onChange={rolesHandler} />
                  <label htmlFor="mobile">Mobile Developer</label>
                </div>
                <div>
                  <input type="checkbox" name="roles" id="game" 
                  value="Game Developer" onChange={rolesHandler} />
                  <label htmlFor="game">Game Developer</label>
                </div>
                <div>
                  <input type="checkbox" name="roles" id="devops" 
                  value="DevOps Engineer" onChange={rolesHandler} />
                  <label htmlFor="devops">DevOps Engineer</label>
                </div>
                <div>
                  <input type="checkbox" name="roles" id="security" 
                  value="Security Engineer" onChange={rolesHandler} />
                  <label htmlFor="security">Security Engineer</label>
                </div>
                <div>
                  <input type="checkbox" name="roles" id="qa" 
                  value="QA Engineer" onChange={rolesHandler} />
                  <label htmlFor="qa">QA Engineer</label>
                </div>
            </fieldset>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
        <div>
          <ProfilePreview fname={data.fname} lname={data.lname} 
          username={data.username} bio={data.bio} 
          contact_pref={data.contact_pref} github_link={data.github_link} 
          linkedin_link={data.linkedin_link} exp_level={data.exp_level} 
          roles={data.roles}/>
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<EditProfile />, 
  document.querySelector('#edit-profile-form-cont'));
  
  