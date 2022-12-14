// function Hello() {
//     return (
//       <form>
//       <div>
//         <label for="fname">First Name:</label>
//         <input type="text" name="fname" id="fname" required />
//       </div>
//       <div>
//         <label for="lname">Last Name:</label>
//         <input type="text" name="lname" id="lname" />
//       </div>
//       <div>
//         <label for="username">Username:</label>
//         <input type="text" name="lname" id="lname" required />
//       </div>
//       <div>
//         <label for="pwd">Password:</label>
//         <input type="password" name="pwd" id="pwd" required />
//       </div>
//       <div>
//         <label for="bio">Bio:</label>
//       </div>
//       <div>
//         <textarea name="bio" id="bio" rows="4" cols="50" required></textarea>
//       </div>
//       <div> 
//         <fieldset>
//             <legend>Contact Preferences:</legend>
//             <div>
//               <input type="checkbox" name="contact_pref" id="phone" 
//               value="Phone" />
//               <label for="trainee">Phone</label>
//             </div>
//             <div>
//               <input type="checkbox" name="contact_pref" id="email" 
//               value="email" />
//               <label for="junior">Email</label>
//             </div>
//             <div>
//               <input type="checkbox" name="contact_pref" id="slack" 
//               value="Slack" />
//               <label for="slack">Slack</label>
//             </div>
//             <div>
//               <input type="checkbox" name="contact_pref" id="discord" 
//               value="Discord" />
//               <label for="discord">Discord</label>
//             </div>
//         </fieldset>
//       </div>
//       <div>
//         <label for="github_link">GitHub URL:</label>
//         <input type="url" name="github_link" id="github_link" />
//       </div>
//       <div>
//         <label for="linkedin_link">Linkedin URL:</label>
//         <input type="url" name="github_link" id="github_link" />
//       </div>
//       <div> 
//         <fieldset>
//             <legend>Experience Level:</legend>
//             <div>
//               <input type="radio" name="exp_level" id="trainee" 
//               value="Trainee Software Engineer" />
//               <label for="trainee">Trainee Software Engineer</label>
//             </div>
//             <div>
//               <input type="radio" name="exp_level" id="junior" 
//               value="Junior Software Engineer" />
//               <label for="junior">Junior Software Engineer</label>
//             </div>
//             <div>
//               <input type="radio" name="exp_level" id="mid_level" 
//               value="Mid-level Software Engineer" />
//               <label for="mid_level">Mid-level Software Engineer</label>
//             </div>
//             <div>
//               <input type="radio" name="exp_level" id="senior" 
//               value="Senior Software Engineer" />
//               <label for="senior">Senior Software Engineer</label>
//             </div>
//             <div>
//               <input type="radio" name="exp_level" id="lead" 
//               value="Lead Software Engineer" />
//               <label for="lead">Lead Software Engineer</label>
//             </div>
//         </fieldset>  
//       </div>
//       <div>
//         <fieldset>
//             <legend>Current or Previous Roles:</legend>
//             <div>
//               <input type="checkbox" name="roles" id="back_end" 
//               value="Back-End Engineer" />
//               <label for="back_end">Back-End Engineer</label>
//             </div>
//             <div>
//               <input type="checkbox" name="roles" id="front_end" 
//               value="Front-End Engineer" />
//               <label for="front_end">Front-End Engineer</label>
//             </div>
//             <div>
//               <input type="checkbox" name="roles" id="mobile" 
//               value="Mobile Developer" />
//               <label for="mobile">Mobile Developer</label>
//             </div>
//             <div>
//               <input type="checkbox" name="roles" id="game" 
//               value="Game Developer" />
//               <label for="game">Game Developer</label>
//             </div>
//             <div>
//               <input type="checkbox" name="roles" id="devops" 
//               value="DevOps Engineer" />
//               <label for="devops">DevOps Engineer</label>
//             </div>
//             <div>
//               <input type="checkbox" name="roles" id="security" 
//               value="Security Engineer" />
//               <label for="security">Security Engineer</label>
//             </div>
//             <div>
//               <input type="checkbox" name="roles" id="qa" 
//               value="QA Engineer" />
//               <label for="qa">QA Engineer</label>
//             </div>
//         </fieldset>
//       </div>
//       <div>
//         <input type="submit" />
//       </div>
//       </form>
//     );
// }


// ReactDOM.render(<Hello />, document.querySelector('#root'));





<nav class="navbar navbar-expand-md navbar-light bg-light">
    <a href="/" class="navbar-brand mb-0 h1"> Coders Assemble</a>
    <div id="login-b-cont"></div>
    <button type="button" data-bs-toggle="collapse" 
    data-bs-target="#collapsibleNavbar" 
    class="navbar-toggler" aria-controls="navbarNav" aria-expanded="false" 
    aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a href="/create-project-proposal" class="nav-link">
                    Post a Project
                </a>
            </li>
            <li class="nav-item disabled">
                <a href="#" class="nav-link">
                    View Profile
                </a>
            </li>
            <li class="nav-item disabled">
                <a href="/create-profile" class="nav-link">
                    Create a Profile
                </a>
            </li>
        </ul>
    </div>
</nav>