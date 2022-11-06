
// function ShowUserName(props) {
//   return <h1> Hello {props.userName}! </h1>
// <ShowUserName userName={data.fname}/>}


function ProfilePreview(props) {
  let contactstring = ''
  const contacts = props.contact_pref
  for (const contact of contacts) {
    contactstring += `${contact}, `
  }

  return (
      <div>
          <h1> Profile Preview </h1>
          <p> First Name: {props.fname} </p>
          <p> Last Name: {props.lname} </p>
          <p> Username: {props.username} </p>
          <p> Password: {props.pwd} </p>
          <p> Bio: {props.bio} </p>
          <p> Contact Preferences: {contactstring}</p>
          <p> GitHub URL: {props.github_link} </p>
          <p> Linkedin URL: {props.linkedin_link} </p>
          <p> Experience Level: {props.exp_level} </p>
          <p> Current or Previous Roles: </p>
          <ul>
              <li>{props.roles}</li>
          </ul>
      </div>
  )
}


function CreateProfile() {

  const [data, setData] = React.useState({
    fname: "",
    lname: "",
    username: "",
    pwd: "", 
    bio: "",
    contact_pref: [], 
    github_link: "", 
    linkedin_link: "", 
    exp_level: "", 
    roles: [],
  });

  const changeHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value});
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
   console.log(copiedData)
   setData(copiedData);
 };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    const usernames= ["claire", "hayden", "jack"]

    if (usernames.includes(data.username)) {
      alert("Username already exists. Please provide a unique username.")
    } else {

      fetch('/profile-submission', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
      }) 
      .then((response) => response.json())
      .then((responseJson) => {

        setData({
          fname: "", 
          lname: "", 
          username: "", 
          pwd: "",
          bio: "",
          contactpref: [], 
          github: "", 
          linkedin: "", 
          explevel: "", 
          roles: []
        })
      });
    }
  };

  //localhost:5000/?fname=Claire&lname=Tasler&username=love&pwd=jfkdl%3Ba&bio=jfdk%3Bla&contact_pref=Phone&github_link=https%3A%2F%2Fgithub.com%2Fhackbrightassessments%2Fskills-1-CTasler&linkedin_link=https%3A%2F%2Fgithub.com%2Fhackbrightassessments%

  // http://localhost:5000/?title=my+project&summary=apegoh&specs=aewgjhu&github_url=
  // http://localhost:5000/?title=awegpuh&summary=awegiub&specs=aweg&github_url=
  //fetch 
  //@approute
  //http://localhost:5000/?title=aweg&summary=aeg&specs=aeg&github_url=

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
        </div>
        <div>
          <label htmlFor="pwd">Password:</label>
          <input type="password" name="pwd" id="pwd" value={data.pwd} 
          onChange={changeHandler} required />
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
                value="Mid-level Software Engineer" onChange={changeHandler} />
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
        username={data.username} pwd={data.pwd} bio={data.bio} 
        contact_pref={data.contact_pref} github_link={data.github_link}/>
      </div>
    </div>
  );
}

ReactDOM.render(<CreateProfile />, 
document.querySelector('#profile-form-cont'));

