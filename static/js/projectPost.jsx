// function FavoriteButton() {
//   return (
//     <div>
//       {/* send username and project id to backend 
//       turn color of button to red  */}
//     </div>
//   );
// {/* <svg xmlns="http://www.w3.org/2000/svg" 
//                 width="16" height="16" fill="currentColor" className="bi bi-heart" 
//                 viewBox="0 0 16 16">
//             <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
//             </svg>  */}
// }



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
          if (responseJson.loggedIn === "no") {
            alert("You need to be logged in to apply to join a team");
          } else if (responseJson.already_applied === "yes") {
            alert("You already applied for this team.")
          } else if (responseJson.on_team === yes) {
            alert("You are already on this team.")
          } else {
          alert("Your application was registered. If your application is accepted, the project will show up on the Team section of your profile.");
          }
      })
  })  

  const favButtonHandler = (event => {
    console.log(data)

    fetch('/favorite', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
      }
    }) 
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.loggedIn === "no") {
          alert("You need to be logged in to add a project to your favorites.");
        } else {
        alert("Project saved to your favorites.");
        console.log(responseJson);
        }
    })
})  
 
  // const submitHandler = (event) => {

  //   const data = {
  //     username: props.username,
  //     title: props.title
  //   }
  //   console.log(data)
  //   console.log(event)
  //   event.preventDefault();

  //   if (document.querySelector('#apply').value === "apply") {
  //     console.log("working")
  //     fetch('/apply', {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //       headers: {
  //           'Content-Type': 'application/json',
  //       }
  //     }) 
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //         // alert("Your Project Post has been Submitted");
  //         alert("Your application was registered. The creator of this project will reach out to you shortly.");
  //         console.log(responseJson);
  //     })
  //   }
  // }

  return (
    <div className="boxes" id="ppost">
      <div>
          <button onClick={favButtonHandler} id="favbutton">
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

