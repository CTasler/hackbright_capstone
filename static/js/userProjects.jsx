function UserProjects(props) {
  
  return (
    <div className="boxes">
      <div>
        <h4> Title: {props.title} </h4>
      </div>
      <div>
        <p> Summary: {props.summary} </p>
        <p> Libraries: {props.specs} </p>
        <p> GitHub URL: {props.project_github}</p>
        <p> Required Experience Level: {props.req_exp_level}</p>
        <p> Required Current or Previous Roles: {props.roles}</p>
      </div>
      <div> Applicants: { props.applicants }</div>
      <div>
          <button>View Applicant Profiles</button>
      </div>
    </div>
  );
}



function ProjectsContainer() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch("/user-projects.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user_projects);
        setProjects(data.user_projects);
      }
        )
  }, []);
  const projectPosts = [];
  for (const currentProject of projects) {
    projectPosts.push(
    <UserProjects
      key={currentProject.projectId}
      title={currentProject.title} 
      summary={currentProject.summary}
      specs={currentProject.specs}
      project_github={currentProject.project_github}
      req_exp_level={currentProject.req_exp_level}
      roles={currentProject.req_roles.join(", ")}
      applicants={currentProject.applicants.join(", ")}
    />
      );
    }

    return (
      <div>
         <h1> Your Projects </h1>
        { projectPosts }
      </div>
    );
  }


ReactDOM.render(<ProjectsContainer />, document.querySelector('#user-projects-cont'));