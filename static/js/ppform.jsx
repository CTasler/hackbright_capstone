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
            <h1> Project Post Preview </h1>
            <div className="boxes">
                <div>
                    <button id="favbutton">
                    <i className="fa fa-heart"></i>
                    </button>
                </div>
                <h4> Title: {props.title} </h4>
                <p> Username: {props.user} </p>
                <p> Summary: {props.summary} </p>
                <p> Languages, Libraries, APIs: {props.specs} </p>
                <p> GitHub URL: {props.projectGithub} </p>
                <p> Required Experience Level: {props.reqExpLevel} </p>
                <p>Current or Previous Roles: {reqRolesString}</p>
                <div id="joinbuttondiv">
                    <button id="joinbutton">Join Team</button>
                </div>
            </div>
        </div>
    );
  }


function ProjectProposalForm() {
    
    const [data, setData] = React.useState({
        user: "",
        title: "",
        summary: "",
        specs: "",
        project_github: "", 
        req_exp_level: "", 
        req_roles: [],
      });
    
    const changeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    }

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
    };
    

    return (
    <div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="user">Username:</label>
                <input type="text" name="user" id="user"
                 value={data.user} onChange={changeHandler} required />
            </div>
            <div>
                <label htmlFor="title">Project Title:</label>
                <input type="text" name="title" id="title" value={data.title} 
                onChange={changeHandler} required />
            </div>
            <div>
                <label htmlFor="summary">Project Summary:</label>
            </div>
            <div>
                <textarea name="summary" id="summary" rows="4" cols="50" 
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
                <textarea name="specs" id="specs" rows="4" cols="50" 
                value={data.specs} onChange={changeHandler} required>
                </textarea>
            </div>
            <div>
                <label htmlFor="project_github">
                    Your Project's GitHub URL:
                </label>
                <input type="url" name="project_github" id="project_github" 
                value={data.project_github} onChange={changeHandler}/>
            </div>
            <div> 
                <fieldset>
                    <legend>
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
                <fieldset>
                    <legend>
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
                <div>
                <input type="submit" />
                </div>
            </form>
            <div>
                <PPPreview user={data.user} title={data.title} summary={data.summary} 
                specs={data.specs} projectGithub={data.project_github} 
                reqExpLevel={data.req_exp_level} reqRoles={data.req_roles}/>
            </div>
        </div>
      );
    }

    ReactDOM.render(<ProjectProposalForm />, 
    document.querySelector('#ppform-cont'));

