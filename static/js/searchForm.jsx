function ProjectPost(props) {

    const joinButtonHandler = (event => {
      const data = {
            post_creator: props.username,
            project_id: props.id
          }
  
        fetch('/apply', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        }) 
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.loggedIn === "false") {
              alert("You need to be logged in to apply to join a team");
            } else if (responseJson.already_applied === "true") {
              alert("You already applied for this team.")
            } else if (responseJson.on_team === "true") {
              alert("You are already on this team.")
            } else {
            alert(`Your application was registered. If your application is accepted, the project will show up in the "Your Teams" section of your profile.`);
            }
        })
    })  
  
    const favButtonHandler = (event => {
      event.persist();
   
      const data = {
        project_id: props.id, 
  
      }
  
      fetch('/favorite', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
      }) 
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson.loggedIn === "false") {
            alert("You need to be logged in to add a project to your favorites.");
          } else if (responseJson.post_creator === "true") {
            alert("As amazing as it is, you cannot favorite your own project.")
          } else {
            if (event.target.classList.contains('fa-regular')) {
              event.target.classList.toggle('fa-solid');
            } else if (event.target.classList.contains('fa-solid')) {
              event.target.classList.toggle('fa-regular');
            }
          }
      })
  })  
    if (props.favorited === true) {
      return (
        <div className="rounded pppreview" id="ppost" style={{backgroundColor: "#8E8D8A"}}>
          <div>
            <i id="favbutton" className="fa-solid fa-heart fa-2x" style={{ color: '#E98074'}} onClick={favButtonHandler}></i>
          </div>
          <div>
            <h4> Title: {props.title} </h4>
          </div>
          <div>
            <p> Posted by: {props.username}</p>
          </div>
          <div>
            <p> Summary: {props.summary} </p>
            <p> Libraries: {props.specs} </p>
            <p> GitHub URL: <a href={`${props.project_github}`}>{props.project_github}</a></p>
            <p> Required Experience Level: {props.req_exp_level}</p>
            <p> Required Current or Previous Roles: {props.roles}</p>
            <p aria-hidden hidden> Project ID: {props.id}</p>
          </div>
          <div id="joinbuttondiv">
              <button onClick={joinButtonHandler} id="joinbutton" className="btn btn-md btn-outline-dark" style={{backgroundColor: "#E85A4F"}}>Join Team</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="rounded pppreview" id="ppost" style={{backgroundColor: "#8E8D8A"}}>
          <div>
            <i id="favbutton" className="fa-regular fa-heart fa-2x" style={{ color: '#E98074'}} onClick={favButtonHandler}></i>
          </div>
          <div>
            <h4> Title: {props.title} </h4>
          </div>
          <div>
            <p> Posted by: {props.username}</p>
          </div>
          <div>
            <p> Summary: {props.summary} </p>
            <p> Libraries: {props.specs} </p>
            <p> GitHub URL: <a href={`${props.project_github}`}>{props.project_github}</a></p>
            <p> Required Experience Level: {props.req_exp_level}</p>
            <p> Required Current or Previous Roles: {props.roles}</p>
            <p aria-hidden hidden> Project ID: {props.id}</p>
          </div>
          <div className="center-button-div">
              <button onClick={joinButtonHandler} id="joinbutton" className="btn btn-md btn-outline-dark" style={{backgroundColor: "#E85A4F"}}>Join Team</button>
          </div>
        </div>
    );
    }
  }

function SearchForm() {
    const [data, setData] = React.useState({
        user: "",
        title: "",
        specs: "",
        req_exp_level: "", 
        req_roles: [],
      });

    const [projects, setProjects] = React.useState([])

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


            fetch('/advanced-search-submission.json', {
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
                setProjects(responseJson.matches)
            })
    
            
        };
        
    const projectPosts = [];
    if (projects) {
        for (const currentProject of projects) {
            projectPosts.push(
                <ProjectPost 
                key={currentProject.project_id}
                id={currentProject.project_id}
                username={currentProject.username}
                title={currentProject.title} 
                summary={currentProject.summary}
                specs={currentProject.specs}
                project_github={currentProject.project_github}
                req_exp_level={currentProject.req_exp_level}
                roles={currentProject.req_roles.join(", ")}
                favorited={currentProject.favorited}
                />
            );
        }
    }

    let radios = document.getElementsByName("req_exp_level");
    

    return (
        <div>
          <div className="flex-container">
            <div className="rounded form" style={{maxHeight: "910px"}}>
                <form onSubmit={submitHandler}>
                    <div className="col-5">
                        <label htmlFor="user">Creator's Username:</label>
                        <input type="text" name="user" id="user"
                        className="rounded full-input" value={data.user} onChange={changeHandler} />
                    </div>
                    <div className="col-5">
                        <label htmlFor="title">Project Title:</label>
                        <input type="text" name="title" id="title" className="rounded full-input" value={data.title} 
                        onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="specs">
                            Languages, libraries, API's:
                        </label>
                    </div>
                    <div>
                        <textarea name="specs" id="specs" className="rounded" rows="4" cols="50" 
                        value={data.specs} onChange={changeHandler}>
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
                            Required Role:
                            </legend>
                            <div>
                            <input type="checkbox" className="checkbox" name="req_roles" id="pp-back_end" 
                            value="Back-end Engineer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-back_end">Back-end Engineer</label>
                            </div>
                            <div>
                            <input type="checkbox" className="checkbox" name="req_roles" id="pp-front_end" 
                            value="Front-end Engineer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-front_end">Front-end Engineer</label>
                            </div>
                            <div>
                            <input type="checkbox"className="checkbox" name="req_roles" id="pp-mobile" 
                            value="Mobile Developer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-mobile">Mobile Developer</label>
                            </div>
                            <div>
                            <input type="checkbox" className="checkbox" name="req_roles" id="pp-game" 
                            value="Game Developer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-game">Game Developer</label>
                            </div>
                            <div>
                            <input type="checkbox" className="checkbox" name="req_roles" id="pp-devops" 
                            value="DevOps Engineer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-devops">DevOps Engineer</label>
                            </div>
                            <div>
                            <input type="checkbox" className="checkbox" name="req_roles" id="pp-security" 
                            value="Security Engineer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-security">Security Engineer</label>
                            </div>
                            <div>
                            <input type="checkbox" className="checkbox" name="req_roles" id="pp-qa" 
                            value="QA Engineer" onChange={reqRoleHandler}/>
                            <label htmlFor="pp-qa">QA Engineer</label>
                            </div>
                        </fieldset>
                        </div>
                        <div className="d-grid gap-2">
                            <input type="submit" value="Submit" className="submit btn btn-outline-dark btn-md"/>

                        </div>
                    </form>
                </div>
                <div>
                    {projectPosts}
                </div>
          </div>
          <div>
            <a id="back-to-top" href="#" 
            className="btn btn-outline-light btn-lg back-to-top" 
            style={{borderColor: "#EAE7DC"}}
            roll="button">
                <i className="fas fa-chevron-up" 
              style={{color: '#E85A4F'}}></i>
            <span class="sr-only">Return to Top of Page</span>
            </a>
          </div>
        </div>
          );
}






// function AdvSearchContainer() {
    
//     const [data, setData] = React.useState({
//         user: "",
//         title: "",
//         specs: "",
//         req_exp_level: "", 
//         req_roles: [],
//       });

//     const [projects, setProjects] = React.useState([])


//     const projectPosts = [];
//       for (const currentProject of projects) {
//           projectPosts.push(
//             <ProjectPost 
//               key={currentProject.project_id}
//               id={currentProject.project_id}
//               username={currentProject.username}
//               title={currentProject.title} 
//               summary={currentProject.summary}
//               specs={currentProject.specs}
//               project_github={currentProject.project_github}
//               req_exp_level={currentProject.req_exp_level}
//               roles={currentProject.req_roles.join(", ")}
//               favorited={currentProject.favorited}
//             />
//           );
//         }

//     return (
//         <div>
//             <div>
//                 <SearchForm/>
//             </div>
//             <div>
//                 <h2>Results</h2>
//                 {projectPosts}
//             </div>
//         </div>
//       );
//     }



    ReactDOM.render(<SearchForm />, 
    document.querySelector('#searchform-cont'));
