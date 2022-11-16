/* <div className="hover-button">
<button className='floatbuttonr'>
  X
</button>
<span className= "tooltip-text">Leave this team</span>
</div> */


function UserTeams(props) {

  const leaveTeamHandler = (() => {
    if (confirm('Are you sure you want to leave this team? All info will be lost.')) {
      const data = {project_id: props.projectID};
  
      fetch('/leave-team.json' , {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.team_captain === true) {
          alert("You are the creater of this team. As the team captain, you cannot leave this team.");
        } else if (responseJson.leave_team === "successful") {
          window.location.reload();
        }
      })
    }
  });
    

    return(
    <div className="team">
        <div>
          <button data-toggle="tooltip" data-placement="top" title="Leave this team" onClick={leaveTeamHandler}>
            X
          </button>
        </div>
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
                GitHub URL: <a href={`${props.github}`}>{ props.github }</a>
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
          <a href={`/team-page/${props.projectID}`}>
            <button>Team Page</button>
          </a>
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