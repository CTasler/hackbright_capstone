function SearchForm() {
    
    const [data, setData] = React.useState({
        user: "",
        title: "",
        specs: "",
        req_exp_level: "", 
        req_roles: [],
      });
    
    const changeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
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
        console.log(data)
            fetch('/advanced-search-submission', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }) 
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
    };
    

    return (
    <div className="flex-container">
        <div className="rounded form">
            <form onSubmit={submitHandler}>
                <div className="col-5">
                    <label htmlFor="user">Creator's Username:</label>
                    <input type="text" name="user" id="user"
                    className="rounded" value={data.user} onChange={changeHandler} required />
                </div>
                <div className="col-5">
                    <label htmlFor="title">Project Title:</label>
                    <input type="text" name="title" id="title" className="rounded" value={data.title} 
                    onChange={changeHandler} required />
                </div>
                <div>
                    <label htmlFor="specs">
                        Languages, libraries, API's:
                    </label>
                </div>
                <div>
                    <textarea name="specs" id="specs" className="rounded" rows="4" cols="50" 
                    value={data.specs} onChange={changeHandler} required>
                    </textarea>
                </div>
                <div> 
                    <fieldset className="rounded border p-3">
                        <legend className="float-none w-auto">
                            Required Experience Level:
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
                        Required Role:
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
        </div>
      );
    }

    ReactDOM.render(<SearchForm />, 
    document.querySelector('#searchform-cont'));
