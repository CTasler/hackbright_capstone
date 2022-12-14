function PPPreview(props) {
    let reqRolesString = '';
    const roles = props.reqRoles
    for (const role of roles) {
        if (role != null) {
        reqRolesString += `${role}, `
        }

    console.log(props.username)
    }

    return (
        <div>
            <h2> Project Post Preview </h2>
            <div className="rounded pppreview" style={{position: "relative"}}>
                <div style={{paddingBottom: "30px"}}>
                    <div>
                        <i id="favbutton" className="fa-regular fa-heart fa-2x" 
                        style={{ color: '#E98074'}}></i>
                    </div>
                    <div style={{wordBreak: "break-word"}}>
                        <h4> Title: {props.title} </h4>
                        <p> Posted by: {props.username} </p>
                        <p> Summary: {props.summary} </p>
                        <p> Languages, Libraries, APIs: {props.specs} </p>
                        <p> GitHub URL: {props.projectGithub} </p>
                        <p> Required Experience Level: {props.reqExpLevel} </p>
                        <p>Current or Previous Roles: {reqRolesString}</p>
                    </div>
                </div>
                <div style={{position: "absolute", bottom: 20, left: "50%", 
                transform: "translate(-50%, 0)"}}>
                    <button className="btn btn-md btn-outline-dark" 
                    style={{backgroundColor: "#E85A4F"}}>Join Team</button>
                </div>
            </div>
        </div>
    );
  }


function ProjectProposalForm() {
    
    const [data, setData] = React.useState({
        title: "",
        summary: "",
        specs: "",
        project_github: "", 
        req_exp_level: "", 
        req_roles: [],
      });


    const [username, setUsername] = React.useState('')

      React.useEffect(() => {
          fetch('/get-username')
          .then((response) => response.text())
          .then((username_in_session) => {
              setUsername({username_in_session})
          })
      }, []);
    
    const changeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
        if (event.target.name === "title") {
            fetch(`/get-all-user-project-titles?title=${event.target.value}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.title_repeat === false) {
                    document.querySelector('#title-available').innerHTML = "*Title is unique"
                } else if (responseJson.title_repeat === true) {
                    document.querySelector('#title-available').innerHTML = "*You have already used this title for another project"
                }
            })
        }
    };

    const reqRoleHandler = (event) => {    
        const copiedData = JSON.parse(JSON.stringify(data));
        const reqRoles = copiedData.req_roles

        if(event.currentTarget.checked) {
            reqRoles.push(event.target.value)
        } else {
        const index = reqRoles.indexOf(event.target.value);
        reqRoles[index] = null;
        }
        console.log(copiedData)
        setData(copiedData);
        };


    const submitHandler = (event) => {
        event.preventDefault();
            // if (data.user !== username_in_session) {
            //     alert("You entered your username incorrectly. Please correct your username and resubmit.")
            // } else {
    //POST request: data/body should be your data object
    //fetch('/submissionurl); 
    //separate route @app.route('/submissionurl') for receiving info
            fetch('/ppform-submission', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }) 
            .then((response) => response.json())
            .then((responseJson) => {
                window.location.replace(responseJson.url)
            })
            }
    
    return (
    <div className="flex-container">
        <div className="rounded form">
        <h2>Project Info:</h2>
        <form onSubmit={submitHandler}>
            <div className="col-5">
                <label htmlFor="title">Project Title:</label>
                <input type="text" name="title" id="title" 
                className="rounded full-input" 
                value={data.title} 
                onChange={changeHandler} required />
                <p id="title-available">*Title is unique</p>
            </div>
            <div>
                <label htmlFor="summary">Project Summary:</label>
            </div>
            <div>
                <textarea name="summary" id="summary" className="rounded" 
                rows="4" cols="50" 
                value={data.summary} onChange={changeHandler} required>
                </textarea>
            </div>
            <div>
                <label htmlFor="specs">
                    What languages, libraries, API's, etc will 
                    you be using in your project?
                </label>
            </div>
            <div>
                <textarea name="specs" id="specs" className="rounded" 
                rows="4" cols="50" 
                value={data.specs} onChange={changeHandler} required>
                </textarea>
            </div>
            <div className="col-5">
                <label htmlFor="project_github">
                    Your Project's GitHub URL:
                </label>
                <input type="url" name="project_github" id="project_github" 
                className="rounded full-input" value={data.project_github} 
                onChange={changeHandler}/>
            </div>
            <div> 
                <fieldset className="rounded border p-3">
                    <legend className="float-none w-auto">
                        Required Experience Level for Your Project:
                    </legend>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-trainee" 
                    value="Trainee Software Engineer" 
                    onChange={changeHandler}/>
                    <label htmlFor="pp-trainee">Trainee Software Engineer</label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-junior" 
                    value="Junior Software Engineer" onChange={changeHandler}/>
                    <label htmlFor="pp-junior">Junior Software Engineer</label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-mid_level" 
                    value="Mid-level Software Engineer" 
                    onChange={changeHandler}/>
                    <label htmlFor="pp-mid_level">
                        Mid-level Software Engineer
                    </label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-senior" 
                    value="Senior Software Engineer" onChange={changeHandler}/>
                    <label htmlFor="pp-senior">Senior Software Engineer</label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-lead" 
                    value="Lead Software Engineer" onChange={changeHandler}/>
                    <label htmlFor="pp-lead">Lead Software Engineer</label>
                    </div>
                </fieldset>
            </div>
            <div>
                <fieldset className="rounded border p-3">
                    <legend className="float-none w-auto">
                    Desired Current or Previous Role of Prospective Partners:
                    </legend>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" 
                    id="pp-back_end" 
                    value="Back-end Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-back_end">Back-end Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" 
                    id="pp-front_end" 
                    value="Front-end Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-front_end">Front-end Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox"className="checkbox" name="req_roles" 
                    id="pp-mobile" 
                    value="Mobile Developer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-mobile">Mobile Developer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" 
                    id="pp-game" 
                    value="Game Developer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-game">Game Developer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" 
                    id="pp-devops" 
                    value="DevOps Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-devops">DevOps Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" 
                    id="pp-security" 
                    value="Security Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-security">Security Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" 
                    id="pp-qa" 
                    value="QA Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="pp-qa">QA Engineer</label>
                    </div>
                </fieldset>
                </div>
                <div className="d-grid gap-2">
                    <input type="submit" value="Submit" 
                    className="submit btn btn-outline-dark btn-md"/>
                </div>
            </form>
        </div>
            <div className="rounded project-preview" 
            style={{alignItems: "center", justifyContent: "center"}}>
                <PPPreview username={username.username_in_session} 
                title={data.title} summary={data.summary} 
                specs={data.specs} projectGithub={data.project_github} 
                reqExpLevel={data.req_exp_level} reqRoles={data.req_roles}/>
            </div>
        </div>
      );
    }

    ReactDOM.render(<ProjectProposalForm />, 
    document.querySelector('#ppform-cont'));


    //  {/* <div className="col-5">
    //             <label htmlFor="user">Username:</label>
    //             <input type="text" name="user" id="user"
    //              className="rounded" value={data.user} onChange={changeHandler} required />
    //         </div> */}
    // <p> Username: {props.user} </p>

