function TeamProject() {
    const [projectData, setProjectData] = React.useState([]);

    const hyperlinkList = window.location.pathname.split("/");
    const project_id = hyperlinkList[hyperlinkList.length - 1];

    React.useEffect(() => {
        fetch(`/team-project-info.json?project_id=${project_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.team_project_info);
            setProjectData(responseJson.team_project_info);
        }) 
    }, []);

    return (
        <div>
            <div>
                <h2>Project Info</h2>
            </div>
            <div className="profile">
                <div>
                    <h4> Title: {projectData.title} </h4>
                </div>
                <div>
                    <p> Project Creator: {projectData.username}</p>
                    <p> Summary: {projectData.summary} </p>
                    <p> Libraries: {projectData.specs} </p>
                    <p> GitHub URL: <a href={`${projectData.project_github}`}>{projectData.project_github}</a> </p>
                    <p> Required Experience Level: {projectData.req_exp_level}</p>
                    <p> Required Current or Previous Roles: {projectData.req_roles}</p>
                    <p aria-hidden hidden> Project ID: {projectData.project_id}</p>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<TeamProject/>, document.querySelector("#team-project-info-cont"));