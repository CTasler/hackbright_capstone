function TeammemberProfiles(props) {
    
    return(
        <div className="rounded card">
            <div>
                <p> First Name: {props.firstName} </p>
                <p> Last Name: {props.lastName} </p>
                <p> Username: {props.username} </p>
                <p> Bio: {props.bio}</p>
                <p> Contact Preferences: {props.contactPrefs}</p>
                <p> 
                    GitHub URL: <a href={`${props.github}`}>{props.github}</a> 
                </p>
                <p> 
                    Linkedin URL: <a href={`${props.linkedin}`}>{props.linkedin}</a> 
                </p>
                <p> Experience Level: {props.expLvl}</p>
                <p> Current or Previous Roles: {props.roles} </p>
            </div>
        </div>
    );
}

function ProfilesContainer() {
    const [profiles, setProfiles] = React.useState([]);

    const hyperlinkList = window.location.pathname.split("/");
    const project_id = hyperlinkList[hyperlinkList.length - 1];
    console.log(project_id)

    React.useEffect(() => {
        fetch(`/teammember-profiles.json?project_id=${project_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setProfiles(responseJson.profiles_data)
            console.log(responseJson.profiles_data)
        })
    }, []);

    const teamProfiles = []
    for (const currentProfile of profiles) {
        teamProfiles.push(
            <TeammemberProfiles
            firstName={currentProfile.fname}
            lastName={currentProfile.lname}
            username={currentProfile.username}
            bio={currentProfile.bio}
            contactPrefs={currentProfile.contact_prefs}
            github={currentProfile.github_url}
            linkedin={currentProfile.linkedin_url}
            expLvl={currentProfile.exp_level}
            roles={currentProfile.roles}
            />
        );
    }

    return (
        <div>
            <div>
                <h2 className="title" style={{textAlign: "left"}}> Team Members </h2>
            </div>
            <div className="flex-container-horizontal horizontal-scroll">
                { teamProfiles }
            </div>
        </div>
    );
}

ReactDOM.render(<ProfilesContainer/>, document.querySelector("#teammember-profiles-cont"));