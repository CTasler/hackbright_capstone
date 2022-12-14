// marginLeft: 170

function UserProjects(props) {
  

  return (
    <div className="rounded card" style={{backgroundColor: "#8E8D8A"}}>
      <div style={{paddingBottom: "45px"}}>
        <div className="floatbuttonr">
          <a href={`/edit-post/${props.id}`}>
            <button className="floatbuttonr btn btn-md btn-outline-dark" style={{backgroundColor: "#E98074"}}>
              Edit Project
            </button>
          </a>
        </div>
        <div>
          <h4> Title: {props.title} </h4>
        </div>
        <div>
          <p> Summary: {props.summary} </p>
          <p> Libraries: {props.specs} </p>
          <p> GitHub URL: <a href={`${props.project_github}`}>{props.project_github}</a></p>
          <p> Required Experience Level: {props.req_exp_level}</p>
          <p> Required Current or Previous Roles: {props.roles}</p>
        </div>
        <div> Applicants: { props.applicants }</div>
        <div aria-hidden hidden> Project ID: {props.id}</div>
      </div>
      <div className="col d-flex justify-content-center align-items-end">
        <a href={`/all-applicants/${props.id}`}>
          <button className="btn btn-md btn-outline-dark" style={{backgroundColor: "#E85A4F"}}>View Applicant Profiles</button>
        </a>
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
      key={currentProject.project_id}
      id={currentProject.project_id}
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
        <div>
          <h1 className="title" style={{textAlign: "left"}}> Your Projects </h1>
        </div>
        <div className="flex-container-horizontal horizontal-scroll">
          { projectPosts }
        </div>
      </div>
    );
  }


ReactDOM.render(<ProjectsContainer />, document.querySelector('#user-projects-cont'));