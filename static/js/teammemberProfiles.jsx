function TeammemberProfiles(props) {
    
    return(
        <div className="card">
            <div>
                <p> First Name: {props.firstName} </p>
                <p> Last Name: {props.lastName} </p>
                <p> Username: {props.username} </p>
                <p> Bio: {props.bio}</p>
                <p> Contact Preferences: {props.contactPrefs}</p>
                <p> GitHub URL: {props.github} </p>
                <p> Linkedin URL: {props.linkedin} </p>
                <p> Experience Level: {props.expLvl}</p>
                <p> Current or Previous Roles: {props.roles} </p>
            </div>
        </div>
    );
}

function ProfilesContainer() {
    const [profiles, setProfiles] = useState([]);

    React.useEffect(() => {
        fetch("/teammember-profiles.json")
        .then((response) => response.json())
        .then((responseJson) => {
            setProfiles(responseJson.teammember_profiles)
            console.log(responseJson.teammember_profiles)
        })
    });

    const teamProfiles = []
    for (const currentProfile of profiles) {
        teamProfiles.push(
            <TeammemberProfiles
            firstName={currentProfile.fname}
            lastName={currentProfile.lname}
            username={currentProfile.username}
            bio={currentProfile.bio}
            contactPrefs={currentProfile.contact_prefs}
            github={currentProfile.github_link}
            linkedin={currentProfile.linkedin_link}
            expLvl={currentProfile.exp_level}
            roles={currentProfile.roles}
            />
        );
    }

    return (
        <div>
            <div>
                <h2> Teammembers </h2>
            </div>
            <div className="grid">
                { teamProfiles }
            </div>
        </div>
    );
}

ReactDOM.render(<TeammemberProfiles/>, document.querySelector("#teammember-profiles-cont"));