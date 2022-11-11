function TeamProject() {
    const [projectData, setProjectData] = React.useState([]);

    React.useEffect(() => {
        fetch("/team-project_info.json")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.team_project_info);
            setProjectData(responseJson.team_project_info);
        }) 
    }, []);

    return (
        <div className="card">
            <div>
                <h4> Title: {projectData.title} </h4>
            </div>
            <div>
                <p> Summary: {projectData.summary} </p>
                <p> Libraries: {projectData.specs} </p>
                <p> GitHub URL: {projectData.project_github}</p>
                <p> Required Experience Level: {projectData.req_exp_level}</p>
                <p> Required Current or Previous Roles: {projectData.roles}</p>
            </div>
            <div> Project ID: {projectData.id}</div>
            <div> Applicants: { projectData.applicants }</div>
            <div>
                <a href={`/all-applicants/${projectData.id}`}>
                <button>View Applicant Profiles</button>
                </a>
            </div>
        </div>
    );
}

ReactDOM.render(<TeamProject/>, document.querySelector("#team-project-info-cont"));