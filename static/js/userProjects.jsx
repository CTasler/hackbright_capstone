function UserProjects(props) {
  
  return (
    <div className="boxes">
      <div>
        <button>
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
      </div>
      <div>
          <button>Join Team</button>
      </div>
    </div>
  );
}



function ProjectsContainer() {
  const [projects, setProjects] = React.useState([])

  React.useEffect(() => {
    fetch("/user-projects.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user_projects)
        setProjects(data.user_projects)
      }
        )
  }, []);
  const projectPosts = [];
  for (const currentProject of projects) {
    projectPosts.push(
    <UserProjects
      key={currentProject.projectId}
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
         <h1> Your Projects </h1>
        {projectPosts}
      </div>
    );
  }


ReactDOM.render(<ProjectsContainer />, document.querySelector('#user-projects-cont'));