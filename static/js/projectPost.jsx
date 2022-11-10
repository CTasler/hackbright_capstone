// function FavoriteButton() {
//   return (
//     <div>
//       {/* send username and project id to backend 
//       turn color of button to red  */}
//     </div>
//   );



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
    const data = {
      project_id: props.id, 

    }
    let x =  document.getElementById("favbuttondiv");
    console.log(x);


    const button = event.target;
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
        } else if (responseJson.already_favorited === "true") {
          // button.style.backgroundColor = "gray";
          document.getElementById("favbuttondiv").style.color = "black"
          
        } else if (responseJson.post_creator === "true") {
          alert("As amazing as it is, you cannot favorite your own project.")
        } else {
          // button.style.backgroundColor = "red";
          document.getElementById("favbuttondiv").style.color = "red"
        }
    })
    // butoon not changing color also double click react issue
})  
 
  return (
    <div className="boxes" id="ppost">
      <div id="favbuttondiv" style={{ backgroundColor: 'black' }}>
          <button onClick={favButtonHandler} id="favbutton" >  
          <i className="fa fa-heart"></i>
          </button>
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
        <p> GitHub URL: {props.project_github}</p>
        <p> Required Experience Level: {props.req_exp_level}</p>
        <p> Required Current or Previous Roles: {props.roles}</p>
        <p>Project ID: {props.id}</p>
      </div>
      <div id="joinbuttondiv">
          <button onClick={joinButtonHandler} id="joinbutton">Join Team</button>
      </div>
    </div>
  );
}

function ProjectPostContainer() {
    const [projects, setProjects] = React.useState([])

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

