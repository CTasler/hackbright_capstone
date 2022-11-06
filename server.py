from flask import (Flask, render_template, request, 
                   jsonify, current_app, session, flash, redirect)
from model import Project, db
import crud
import json

app = Flask(__name__)
app.secret_key = "unicorn"

@app.route('/')
def show_homepage():
    return render_template('homepage.html')

@app.route('/create-project-proposal')
def show_pp_form():
    
    username = session.get("username")
    if username is None: 
        flash("You must be logged in to create a project propposal")
        return redirect("/")

    return render_template('project_proposal_form.html')


@app.route('/create-profile')
def show_profile_form():
    
    usernames = crud.get_all_usernames()
    
    return render_template('create_profile.html', usernames=usernames)

@app.route('/login', methods=["POST"])
def login_user():
    
    username = request.json.get("email")
    password = request.json.get("pwd")
    
    user = crud.get_user_by_username(username)
    
    if not user or user.password != password: 
        flash("The username or password you entered was incorrect.")
    else: 
        session["username"] = user.username
        flash(f"Welcome back, {user.fname}!")
        

@app.route('/profile')
def show_user_profile():
    
    username = "claire"
    user = crud.get_user_by_username(username)  #not sure if can get(username) or has to be int
    
    favorited_projects = crud.get_all_user_favorites(user.user_id)
    
    project_posts = crud.get_all_projects_by_user(user.user_id)
    
    proj_applicants = {}
    
    # for i, project in enumerate(project_posts): 
    #     proj_applicants[i] = proj_applicants.get(i, 0)
        
    # applicants = crud.get_all_project_applicants(project_id)
    
    return render_template('profile.html', user=user, 
                           favorited_projects=favorited_projects, 
                           project_posts=project_posts)

@app.route('/profile-submission', methods=["POST"])
def add_user():
    
    username = request.json.get("username")
    pwd = request.json.get("pwd")
    fname = request.json.get("fname")
    lname = request.json.get("lname")
    bio = request.json.get("bio")
    contact_pref = request.json.get("contact_pref")
    github_link = request.json.get("gihub_link")
    linkedin_link = request.json.get("linkedin_link")
    exp_level = request.json.get("exp_level")
    roles = request.json.get("roles")
    
    crud.create_user(username, pwd, fname, lname, bio, contact_pref, 
                     github_link, linkedin_link, exp_level, roles)
    
    return {"username": username, "pwd": pwd, "fname": fname, "lname": lname, 
            "bio": bio, "contact_pref": contact_pref, 
            "github_link": github_link, "linkedin_link":linkedin_link, 
            "exp_level":exp_level, "roles": roles}
    
    
@app.route('/apply', methods=["POST"])
def add_applicant():
    pass
    
@app.route('/favorite', methods=["POST"])
def favorite():
    pass


@app.route('/ppform-submission', methods=["POST"])
def add_project():
    
    username = request.json.get("user")
    title = request.json.get("title")
    summary = request.json.get("summary")
    specs = request.json.get("specs")
    project_github = request.json.get("project_github")
    req_exp_level = request.json.get("req_exp_level")
    req_roles = request.json.get("req_roles")
    
    user = crud.get_user_by_username(username)
    
    crud.create_project(user.user_id, title, summary, specs, project_github, 
                        req_exp_level, req_roles) 
    
    # project_data = {
    #     "title": title, 
    #     "summary": summary, 
    #     "specs": specs, 
    #     "project_github": project_github, 
    #     "req_exp_level": req_exp_level, 
    #     "req_roles": req_roles
    # }
    # print(project_data)
    
    # with open("projects.json", "r+") as file: 
    #     data = json.load(file)
    #     data.append(project_data)
    #     json.dump(data, file, indent = 6, separators=(",",": "))
    
    
    return {"title": title, "summary": summary, "specs": specs, 
            "project_github": project_github, "req_exp_level": req_exp_level, 
            "req_roles": req_roles}



if __name__ == "__main__": 
    from model import connect_to_db
    
    connect_to_db(app)
    
    app.run(debug=True)
    