function ProjectPost(props) {

  const joinButtonHandler = (event => {
    const data = {
          post_creator: props.username,
          project_id: props.id
        }

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

    props.favFunction(props.listIndex)


    // fetch('/favorite', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //       'Content-Type': 'application/json',
    //   }
    // }) 
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     if (responseJson.loggedIn === "false") {
    //       alert("You need to be logged in to add a project to your favorites.");
    //     } else if (responseJson.post_creator === "true") {
    //       alert("As amazing as it is, you cannot favorite your own project.")
    //     } else {
    //       if (event.target.classList.contains('fa-regular')) {
    //         event.target.classList.toggle('fa-solid');
    //       } else if (event.target.classList.contains('fa-solid')) {
    //         event.target.classList.toggle('fa-regular');
    //       }
    //     }
    // })
  })  

  // const accessibleFavButtonHandler = (event => {
  //   console.log("coolio")
  //   if (event.key === 'T') {
  //     console.log("working")
  //     favButtonHandler();
  //   }
  // })
// .focus


  if (props.favorited === true) {
    return (
      <div>
      <div className="rounded boxes" id="ppost" 
      style={{backgroundColor: "#8E8D8A"}}>
        <div>
          <button id="favbuttonbackground" className="floatbuttonr" 
          style={{backgroundColor: 'transparent', border: 'none'}}  
          onClick={favButtonHandler}>
            <i id="favbutton" className="fa-solid fa-heart fa-2x" 
            style={{ color: '#E98074'}} 
            role="button" tabIndex="-1">
            <span className="sr-only">Favorite this Post</span>
          </i>
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
          <p> GitHub URL: 
            <a href={`${props.project_github}`}>{props.project_github}</a>
          </p>
          <p> Required Experience Level: {props.req_exp_level}</p>
          <p> Required Current or Previous Roles: {props.roles}</p>
          <p aria-hidden hidden> Project ID: {props.id}</p>
        </div>
        <div className="center-button-div">
            <button onClick={joinButtonHandler} id="joinbutton" 
            className="btn btn-md btn-outline-dark" 
            style={{backgroundColor: "#E85A4F"}}>Join Team</button>
        </div>
      </div>
      </div>
    );
  } else {
    return (
      <div className="rounded boxes" id="ppost" 
      style={{backgroundColor: "#8E8D8A"}}>
        <div>
          <button id="favbuttonbackground" 
          className="floatbuttonr" 
          style={{backgroundColor: 'transparent', border: 'none'}} 
          onClick={favButtonHandler}>
            <i id="favbutton" className="fa-regular fa-heart fa-2x" 
              style={{ color: '#E98074'}} role="button" tabIndex="-1">
              <span className="sr-only">Favorite this Post</span>
              </i>
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
          <p> GitHub URL: 
            <a href={`${props.project_github}`}>{props.project_github}</a>
          </p>
          <p> Required Experience Level: {props.req_exp_level}</p>
          <p> Required Current or Previous Roles: {props.roles}</p>
          <p aria-hidden hidden> Project ID: {props.id}</p>
        </div>
        <div className="center-button-div">
            <button onClick={joinButtonHandler} id="joinbutton" 
            className="btn btn-md btn-outline-dark" 
            style={{backgroundColor: "#E85A4F"}}>Join Team</button>
        </div>
      </div>
  );
  }
}

function ProjectPostContainer() {
    const [projects, setProjects] = React.useState([]);
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
      fetch("/projects.json")
        .then((response) => response.json())
        .then((data) => {
            setProjects(data.project);
        }
          )
    }, []);

    const projectPosts = [];
    let index = 0;
    for (const currentProject of projects) {
      function onFavoriteClicked(listIndex) {

        const data = {
          project_id: currentProject.project_id, 
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
              // Make a copy of the list
              const projectsCopy = JSON.parse(JSON.stringify(projects));
              // Edit the copy
              console.log(projectsCopy);
              console.log(listIndex);

              //Find the project with the matching key (project_id), then change that

              projectsCopy[listIndex].favorited = !projectsCopy[listIndex].favorited;
              // Set the state to the edited list
              setProjects(projectsCopy)
            }
        })
      }
      if (query) {
        console.log(query)

        if (currentProject.req_exp_level.toLowerCase().includes(query.toLowerCase()) || currentProject.req_roles.join(", ").toLowerCase().includes(query.toLowerCase())) {
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
              favFunction={onFavoriteClicked}
              listIndex={index}
            />
          );
        }
      } else {
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
            favFunction={onFavoriteClicked}
            listIndex={index}
          />
        );
      }
      index += 1
    }

    return (
      <div>
        <div>
          <div>
            <label className="hide-element" type="search" 
            htmlFor="filter projects">Filter Projects: </label>
            <input type="text" id="filter projects" 
            style={{width: 300, backgroundColor: "#EAE7DC"}} 
            placeholder="Filter by Experience Level or Role" 
            className="rounded Search" 
            onChange={(e) => setQuery(e.target.value)}/>
          </div>
          <div>
            <a href="/advanced-search" tabIndex="-1">
              <button className="btn btn-md btn-outline-dark" 
              style={{backgroundColor: "#E85A4F"}}>Advanced Search</button>
            </a>
          </div>
        </div>
        {projectPosts}
          <div>
            <a id="back-to-top" href="#" 
            className="btn btn-outline-light btn-lg back-to-top" 
            style={{borderColor: "#EAE7DC"}}
            roll="button"><i className="fas fa-chevron-up" 
            style={{color: '#E85A4F'}} aria-hidden="true"></i>
            <span className="sr-only">Return to Top of Page</span>
            </a>
          </div>
      </div>
    );
}

ReactDOM.render(<ProjectPostContainer/>, document.querySelector('#posts-cont'));

