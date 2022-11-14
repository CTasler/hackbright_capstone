// hidden readONly


function ProjectPost(props) {
  console.log(props.favorited)

  
  const joinButtonHandler = (event => {
    const data = {
          post_creator: props.username,
          project_id: props.id
        }
      console.log(data)

      fetch('/apply', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
      }) 
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson.loggedIn === "false") {
            alert("You need to be logged in to apply to join a team");
          } else if (responseJson.already_applied === "true") {
            alert("You already applied for this team.")
          } else if (responseJson.on_team === "true") {
            alert("You are already on this team.")
          } else {
          alert(`Your application was registered. If your application is accepted, the project will show up in the "Your Teams" section of your profile.`);
          }
      })
  })  

  const favButtonHandler = (event => {
    event.persist();
 
    const data = {
      project_id: props.id, 

    }

    fetch('/favorite', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
      }
    }) 
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.loggedIn === "false") {
          alert("You need to be logged in to add a project to your favorites.");
        } else if (responseJson.post_creator === "true") {
          alert("As amazing as it is, you cannot favorite your own project.")
        } else {
          if (event.target.classList.contains('fa-regular')) {
            event.target.classList.toggle('fa-solid');
          }
        }
    })
    // when homepage loads...all liked posts need to have heart already red
})  
  if (props.favorited === true) {
    return (
      <div className="boxes" id="ppost">
        <div>
          <i id="favbutton" className="fa-solid fa-heart fa-2x" style={{ color: 'red'}} onClick={favButtonHandler}></i>
        </div>
        <div>
          <h4> Title: {props.title} </h4>
        </div>
        <div>
          <p> Posted by: {props.username}</p>
        </div>
        <div>
          <p> Summary: {props.summary} </p>
          <p> Libraries: {props.specs} </p>
          <p> GitHub URL: <a href={`${props.project_github}`}>{props.project_github}</a></p>
          <p> Required Experience Level: {props.req_exp_level}</p>
          <p> Required Current or Previous Roles: {props.roles}</p>
          <p> Project ID: {props.id}</p>
        </div>
        <div id="joinbuttondiv">
            <button onClick={joinButtonHandler} id="joinbutton">Join Team</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="boxes" id="ppost">
        <div>
          <i id="favbutton" className="fa-regular fa-heart fa-2x" style={{ color: 'red'}} onClick={favButtonHandler}></i>
        </div>
        <div>
          <h4> Title: {props.title} </h4>
        </div>
        <div>
          <p> Posted by: {props.username}</p>
        </div>
        <div>
          <p> Summary: {props.summary} </p>
          <p> Libraries: {props.specs} </p>
          <p> GitHub URL: <a href={`${props.project_github}`}>{props.project_github}</a></p>
          <p> Required Experience Level: {props.req_exp_level}</p>
          <p> Required Current or Previous Roles: {props.roles}</p>
          <p> Project ID: {props.id}</p>
        </div>
        <div id="joinbuttondiv">
            <button onClick={joinButtonHandler} id="joinbutton">Join Team</button>
        </div>
      </div>
  );
  }
}

function ProjectPostContainer() {
    const [projects, setProjects] = React.useState([]);
    // const [loggedIn, setLoggedIn] = React.useState('');

    React.useEffect(() => {
      fetch("/projects.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.project);
          setProjects(data.project);
          // setLoggedIn(data.logged_in);
          // console.log(data.logged_in);
        }
          )
    }, []);

    const projectPosts = [];
    for (const currentProject of projects) {
      projectPosts.push(
      <ProjectPost 
        key={currentProject.project_id}
        id={currentProject.project_id}
        username={currentProject.username}
        title={currentProject.title} 
        summary={currentProject.summary}
        specs={currentProject.specs}
        project_github={currentProject.project_github}
        req_exp_level={currentProject.req_exp_level}
        roles={currentProject.req_roles.join(", ")}
        favorited={currentProject.favorited}
      />
      );
    }

    return (
      <div>
        {projectPosts}
      </div>
    );
  }

ReactDOM.render(<ProjectPostContainer/>, document.querySelector('#posts-cont'));

