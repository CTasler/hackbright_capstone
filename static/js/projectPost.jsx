



// * <div id="favbuttondiv" style={{ backgroundColor: 'black' }}>
//<button onClick={favButtonHandler} id="favbutton" >  
//<i className="fa fa-heart"></i>
//</button>
//</div>  


function ProjectPost(props) {
  
  const data = {
        post_creator: props.username,
        project_id: props.id
      }
      
  const joinButtonHandler = (event => {
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
    if (event.target.classList.contains('fa-regular')) {
      event.target.classList.toggle('fa-solid');
    }
 
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
        // } else if (responseJson.already_favorited === "true") {
        //   event.target.classList.contains('fa-regular')
          
        } else if (responseJson.post_creator === "true") {
          alert("As amazing as it is, you cannot favorite your own project.")
        // } else {
        //   event.target.classList.toggle('fa-solid');
        }
    })
    // when homepage loads...all liked posts need to have heart already red
})  
 
  return (
    <div className="boxes" id="ppost">
      <div>
      <i id="favbutton" className="fa-regular fa-heart" style={{ color: 'red'}} onClick={favButtonHandler}></i>
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

function ProjectPostContainer() {
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
      fetch("/projects.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.project)
          setProjects(data.project)
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

