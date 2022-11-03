

function ProjectProposalForm() {
    
    const [data, setData] = React.useState({
        title: "",
        summary: "",
        specs: "",
        project_github: "", 
        req_exp_level: [], 
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

    const reqExpHandler = (event) => {    
        const copiedData = JSON.parse(JSON.stringify(data));
        const reqExpLevel = copiedData.req_exp_level

        if(event.currentTarget.checked) {
            reqExpLevel.push(event.target.value)
        } else {
        const index = reqExpLevel.indexOf(event.target.value);
        reqExpLevel[index] = null;
        }
        // console.log(copiedData)
        setData(copiedData);
        };

    const submitHandler = (event) => {
      event.preventDefault();
      console.log(data);

    //POST request: data/body should be your data object

    
    //fetch('/submissionurl); 
    //separate route @app.route('/submissionurl') for receiving info
    fetch('/ppformsubmission', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }) 
        .then((response) => response.json())
        .then((responseJson) => {
            alert("Your Project Post has been Submitted");
            setData({title: "",
            summary: "",
            specs: "",
            project_github: "", 
            req_exp_level: [], 
            req_roles: []});
    });
    };
    

    return (

    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor="title">Project Title:</label>
            <input type="text" name="title" id="title" value={data.title} onChange={changeHandler} required />
        </div>
        <div>
            <label htmlFor="summary">Project Summary:</label>
        </div>
        <div>
            <textarea name="summary" id="summary" rows="4" cols="50" value={data.summary} onChange={changeHandler} required>
            </textarea>
        </div>
        <div>
            <label htmlFor="specs">What languages, libraries, API's, etc will you be 
                            using in your project?</label>
        </div>
        <div>
            <textarea name="specs" id="specs" rows="4" cols="50" value={data.specs} onChange={changeHandler} required>
            </textarea>
        </div>
        <div>
            <label htmlFor="project_github">Your Project's GitHub URL:</label>
            <input type="url" name="project_github" id="project_github" value={data.project_github} onChange={changeHandler}/>
        </div>
        <div> 
            <fieldset>
                <legend>Required Experience Level for Your Project:</legend>
                <div>
                <input type="checkbox" name="req_exp_level" id="pp-trainee" 
                value="Trainee Software Engineer" onChange={reqExpHandler} />
                <label htmlFor="trainee">Trainee Software Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_exp_level" id="pp-junior" 
                value="Junior Software Engineer" onChange={reqExpHandler}/>
                <label htmlFor="junior">Junior Software Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_exp_level" id="pp-mid_level" 
                value="Mid-level Software Engineer" onChange={reqExpHandler}/>
                <label htmlFor="mid_level">Mid-level Software Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_exp_level" id="pp-senior" 
                value="Senior Software Engineer" onChange={reqExpHandler}/>
                <label htmlFor="senior">Senior Software Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_exp_level" id="pp-lead" 
                value="Lead Software Engineer" onChange={reqExpHandler}/>
                <label htmlFor="lead">Lead Software Engineer</label>
                </div>
            </fieldset>
        </div>
        <div>
            <fieldset>
                <legend>Desired Current or Previous Role of Prospective Partners:
                </legend>
                <div>
                <input type="checkbox" name="req_roles" id="pp-back_end" 
                value="Back-End Engineer" onChange={reqRoleHandler}/>
                <label htmlFor="back_end">Back-End Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_roles" id="pp-front_end" 
                value="Front-End Engineer" onChange={reqRoleHandler}/>
                <label htmlFor="front_end">Front-End Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_roles" id="pp-mobile" 
                value="Mobile Developer" onChange={reqRoleHandler}/>
                <label htmlFor="mobile">Mobile Developer</label>
                </div>
                <div>
                <input type="checkbox" name="req_roles" id="pp-game" 
                value="Game Developer" onChange={reqRoleHandler}/>
                <label htmlFor="game">Game Developer</label>
                </div>
                <div>
                <input type="checkbox" name="req_roles" id="pp-devops" 
                value="DevOps Engineer" onChange={reqRoleHandler}/>
                <label htmlFor="devops">DevOps Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_roles" id="pp-security" 
                value="Security Engineer" onChange={reqRoleHandler}/>
                <label htmlFor="security">Security Engineer</label>
                </div>
                <div>
                <input type="checkbox" name="req_roles" id="pp-qa" 
                value="QA Engineer" onChange={reqRoleHandler}/>
                <label htmlFor="qa">QA Engineer</label>
                </div>
            </fieldset>
            </div>
            <div>
            <input type="submit" />
            </div>
        </form>
      );
    }

    ReactDOM.render(<ProjectProposalForm />, 
    document.querySelector('#ppform-cont'));