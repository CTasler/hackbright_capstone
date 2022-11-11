function UserTeams(props) {

    return(
    <div className="team">
        <div>
            <h4>
                Project Title: { props.title }
            </h4>
        </div>
        <div>
            <p>
                Summary: { props.summary }
            </p>
        </div>
        <div>
            <p>
                GitHub URL: { props.github }
            </p>
        </div>
        <div>
            <p>
                Teammembers: { props.members}
            </p>
        </div>
        <div>
            <p style={{ visibility: 'hidden' }}>
                Project ID: { props.projectID }
            </p>
        </div>
        <div>
            <button>Team Page</button>
        </div>
    </div>);
}

function TeamsContainer() {


    const [teams, setTeams] = React.useState([]);
  
    React.useEffect(() => {
      fetch("/user-teams.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.user_teams);
          setTeams(data.user_teams);
        }
          )
    }, []);
    const userTeams = [];
    for (const currentTeam of teams) {
      userTeams.push(
      <UserTeams
        key={ currentTeam.project_id }
        projectID={ currentTeam.project_id }
        title={ currentTeam.title }
        summary={ currentTeam.summary }
        github={ currentTeam.github }
        members={ currentTeam.members }
      />
        );
      }
  
      return (
        <div>
          <div>
            <h1> Your Teams </h1>
          </div>
          <div className="teamsgrid">
            { userTeams }
          </div>
        </div>
      );
    }


ReactDOM.render(<TeamsContainer/>, document.querySelector("#user-teams-cont"));