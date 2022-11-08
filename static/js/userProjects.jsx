function Projects(props) {
  
  return (
    <div className="boxes">
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
        <p> Required Current or Previous Roles: {props.req_roles}</p>
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
        console.log(data.project)
        setProjects(data.project)
      }
        )
  }, []);
  const projectPosts = [];
  for (const currentProject of projects) {
    projectPosts.push(
    <Projects
      key={currentProject.projectId}
      username={currentProject.username}
      title={currentProject.title} 
      summary={currentProject.summary}
      specs={currentProject.specs}
      project_github={currentProject.project_github}
      req_exp_level={currentProject.req_exp_level}
      req_roles={currentProject.req_roles}
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


ReactDOM.render(<ProjectsContainer />, document.querySelector('#projects-cont'));