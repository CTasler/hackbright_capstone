// return (
//     <div>
//         <h2> Project Post Preview </h2>
//         <div className=" rounded pppreview">
//         <div>
//             <i id="favbutton" className="fa-regular fa-heart fa-2x" style={{ color: '#E98074'}}></i>
//         </div>
//             <h4> Title: {props.title} </h4>
//             <p> Posted by: {props.user} </p>
//             <p> Summary: {props.summary} </p>
//             <p> Languages, Libraries, APIs: {props.specs} </p>
//             <p> GitHub URL: {props.projectGithub} </p>
//             <p> Required Experience Level: {props.reqExpLevel} </p>
//             <p> Current or Previous Roles: {reqRolesString} </p>
//             <div id="joinbuttondiv">
//                 <button id="joinbutton" className="btn btn-md btn-outline-dark" style={{backgroundColor: "#E85A4F"}}>Join Team</button>
//             </div>
//         </div>
//     </div>
// );

function PPPreview(props) {
    let reqRolesString = '';
    const roles = props.reqRoles
    for (const role of roles) {
        if (role != null) {
        reqRolesString += `${role}, `
        }
    }

    return (
        <div>
            <h2> Project Post Preview </h2>
            <div className="rounded pppreview" style={{position: "relative"}}>
                <div>
                    <i id="favbutton" className="fa-regular fa-heart fa-2x" style={{ color: '#E98074'}}></i>
                </div>
                <div style={{wordBreak: "break-word"}}>
                    <h4> Title: {props.title} </h4>
                    <p> Posted by: {props.user} </p>
                    <p> Summary: {props.summary} </p>
                    <p> Languages, Libraries, APIs: {props.specs} </p>
                    <p> GitHub URL: {props.projectGithub} </p>
                    <p> Required Experience Level: {props.reqExpLevel} </p>
                    <p>Current or Previous Roles: {reqRolesString}</p>

                </div>
                <div style={{position: "absolute", bottom: "5px", left: "50%", transform: "translate(-50%, 0)"}}>
                    <button className="btn btn-md btn-outline-dark" style={{backgroundColor: "#E85A4F"}}>Join Team</button>
                </div>
            </div>
        </div>
    );
  }


function EditPost() {
    
    const [data, setData] = React.useState({
        user: '',
        title: '',
        summary: '',
        specs: '',
        project_github: '', 
        req_exp_level: '', 
        req_roles: [],
      });

      const hyperlinkList = window.location.pathname.split("/");
      const project_id = hyperlinkList[hyperlinkList.length - 1];

      React.useEffect(() => {
        fetch(`/team-project-info.json?project_id=${project_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.team_project_info)
          setData({
            id: project_id,
            user: responseJson.team_project_info.username,
            title: responseJson.team_project_info.title,
            summary: responseJson.team_project_info.summary,
            specs: responseJson.team_project_info.specs,
            project_github: responseJson.team_project_info.project_github, 
            req_exp_level: responseJson.team_project_info.req_exp_level, 
            req_roles: [],
            })
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


        fetch('/edit-post-submission.json', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        .then((response) => window.location.replace(response.url))
    };
    

    return (
    <div className="flex-container">
        <div className="rounded form">
        <h2>Project Info:</h2>
        <form onSubmit={submitHandler}>
            <div className="col-5">
                <label htmlFor="title">Project Title:</label>
                <input type="text" name="title" id="title" className="rounded" value={data.title} 
                onChange={changeHandler} required />
                <p id="title-available">*Title is unique</p>
            </div>
            <div>
                <label htmlFor="summary">Project Summary:</label>
            </div>
            <div>
                <textarea name="summary" id="summary" className="rounded" rows="4" cols="50" 
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
                <textarea name="specs" id="specs" className="rounded" rows="4" cols="50" 
                value={data.specs} onChange={changeHandler} required>
                </textarea>
            </div>
            <div className="col-5">
                <label htmlFor="project_github">
                    Your Project's GitHub URL:
                </label>
                <input type="url" name="project_github" id="project_github" className="rounded"
                value={data.project_github} onChange={changeHandler}/>
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
                    <label htmlFor="trainee">Trainee Software Engineer</label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-junior" 
                    value="Junior Software Engineer" onChange={changeHandler}/>
                    <label htmlFor="junior">Junior Software Engineer</label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-mid_level" 
                    value="Mid-level Software Engineer" 
                    onChange={changeHandler}/>
                    <label htmlFor="mid_level">
                        Mid-level Software Engineer
                    </label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-senior" 
                    value="Senior Software Engineer" onChange={changeHandler}/>
                    <label htmlFor="senior">Senior Software Engineer</label>
                    </div>
                    <div>
                    <input type="radio" name="req_exp_level" id="pp-lead" 
                    value="Lead Software Engineer" onChange={changeHandler}/>
                    <label htmlFor="lead">Lead Software Engineer</label>
                    </div>
                </fieldset>
            </div>
            <div>
                <fieldset className="rounded border p-3">
                    <legend className="float-none w-auto">
                    Desired Current or Previous Role of Prospective Partners:
                    </legend>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" id="pp-back_end" 
                    value="Back-end Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="back_end">Back-end Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" id="pp-front_end" 
                    value="Front-end Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="front_end">Front-end Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox"className="checkbox" name="req_roles" id="pp-mobile" 
                    value="Mobile Developer" onChange={reqRoleHandler}/>
                    <label htmlFor="mobile">Mobile Developer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" id="pp-game" 
                    value="Game Developer" onChange={reqRoleHandler}/>
                    <label htmlFor="game">Game Developer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" id="pp-devops" 
                    value="DevOps Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="devops">DevOps Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" id="pp-security" 
                    value="Security Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="security">Security Engineer</label>
                    </div>
                    <div>
                    <input type="checkbox" className="checkbox" name="req_roles" id="pp-qa" 
                    value="QA Engineer" onChange={reqRoleHandler}/>
                    <label htmlFor="qa">QA Engineer</label>
                    </div>
                </fieldset>
                </div>
                <div className="d-grid gap-2">
                 <input type="submit" className="submit btn btn-outline-dark btn-md"/>
                </div>
            </form>
            </div>
            <div className="rounded project-preview" style={{alignItems: "center", justifyContent: "center"}}>
                <PPPreview user={data.user} title={data.title} summary={data.summary} 
                specs={data.specs} projectGithub={data.project_github} 
                reqExpLevel={data.req_exp_level} reqRoles={data.req_roles}/>
            </div>
        </div>
      );
    }

    ReactDOM.render(<EditPost />, 
    document.querySelector('#edit-post-cont'));

