function ApplicantProfiles(props) {

    const addHandler = ((event) => {
      if (event.target.value === 'add') {
        const data = {
          username: props.username,
          project_id: props.projectId,
          project_title: props.title,  
          add_or_reject: "add"
        };
        console.log(data);
        fetch('/add-or-remove-applicant.json', {
          method: 'POST', 
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          window.location.reload();
           alert(`The applicant was added to the team for ${responseJson.projectTitle}`)
        });
      } else {
        const data = {
          username: props.username,
          project_id: props.projectId,
          project_title: props.title,  
          add_or_reject: "reject"
        };
        console.log(data);
        fetch('/add-or-remove-applicant.json', {
          method: 'POST', 
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          window.location.reload();
          alert('The applicant was rejected')
        });
      }
    });


    return (
      <div className="card">
        <div>
          <p> First Name: {props.firstName} </p>
          <p> Last Name: {props.lastName} </p>
          <p> Username: {props.username} </p>
          <p> Bio: {props.bio}</p>
          <p> Contact Preferences: {props.contactPrefs}</p>
          <p> GitHub URL: <a href={`${props.github}`}>{props.github}</a> </p>
          <p> Linkedin URL: <a href={`${props.linkedin}`}>{props.linkedin}</a> </p>
          <p> Experience Level: {props.expLvl}</p>
          <p> Current or Previous Roles: {props.roles} </p>
        </div>
        <div>
          <button value="add" onClick={addHandler}>Add to Team</button>
        </div>
        <div>
          <button value="reject" onClick={addHandler}>Reject Applicant</button>
        </div>
      </div>
    );
  }
  
  
  
function ProfilesContainer() {
  
  const [profiles, setProfiles] = React.useState([]);
  const [title, setTitle] = React.useState("")

  const hyperlinkList = window.location.pathname.split("/");
  const id_of_project = hyperlinkList[hyperlinkList.length - 1];

  React.useEffect(() => {
    fetch(`/project-applicant-profiles.json?project_id=${id_of_project}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.profiles_data);
        console.log(responseJson.project_title)
        setTitle(responseJson.project_title)
        setProfiles(responseJson.profiles_data);
      }
        )
  }, []);
  const applicantProfiles = [];
  for (const currentProfile of profiles) {
    applicantProfiles.push(
    <ApplicantProfiles
      title={title}
      projectId={id_of_project}
      firstName={currentProfile.fname}
      lastName={currentProfile.lname}
      username={currentProfile.username}
      bio={currentProfile.bio}
      contactPrefs={currentProfile.contact}
      github={currentProfile.github_url}
      linkedin={currentProfile.linkedin_url}
      expLvl={currentProfile.exp_level}
      roles={currentProfile.roles}
    />
      );
  }

  return (
    <div>
      <div>
        <h1> Applicants for { title }</h1>
      </div>
      <div className="grid">
        { applicantProfiles }
      </div>
    </div>
  );
  }


ReactDOM.render(<ProfilesContainer />, document.querySelector('#applicant-profiles-cont'));