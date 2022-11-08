from flask import (Flask, render_template, request, 
                   jsonify, current_app, session, flash, redirect)
from model import Project, db
import crud
import json
import werkzeug.security


app = Flask(__name__)
app.secret_key = "unicorn"

project_data = [{"username": "lovely",
                "title": "We got this", 
                 "summary": "Keep Pushing", 
                 "specs": "libraries", 
                 "project_github": "link", 
                 "req_exp_level": "none", 
                 "req_roles": "none"}, 
                {"username": "frank",
                "title": "Melons", 
                 "summary": "I hate melons",
                 "specs": "libraries", 
                 "project_github": "link", 
                 "req_exp_level": "none", 
                 "req_roles": "none"},
                 {"username": "unicorn",
                "title": "something", 
                 "summary": "something else",
                 "specs": "libraries", 
                 "project_github": "link", 
                 "req_exp_level": "none", 
                 "req_roles": "none"},
                 {"username": "apples",
                  "title": "Awesomeness", 
                 "summary": "Epicness",
                 "specs": "libraries", 
                 "project_github": "link", 
                 "req_exp_level": "none", 
                 "req_roles": "none"}
                ]


@app.route('/')
def show_homepage():
    
    return render_template('homepage.html')

@app.route('/projects.json')
def show_project_posts():
    
    all_projects = crud.get_all_projects
    print(all_projects)

    return jsonify({})
# jsonify({"project": all_projects})


@app.route('/login-page')
def show_login_page():
    return render_template('login_page.html')

@app.route('/create-project-proposal')
def show_pp_form():
    
    username = session.get("username")
    if username is None: 
        flash("You must be logged in to post a project.")
        return redirect("/")

    return render_template('project_proposal_form.html')


@app.route('/create-profile')
def show_profile_form():
    
    return render_template('create_profile.html')


@app.route('/available-usernames')
def check_username_available():
    
    username = request.args.get("username")
    usernames = crud.get_all_usernames()
    
    if username in usernames: 
        return ("unavailable")
    
    return ("available")

@app.route('/profile-submission', methods=["POST"])
def add_user():
    
    username = request.json.get("username")
    pwd = request.json.get("pwd")
    fname = request.json.get("fname")
    lname = request.json.get("lname")
    bio = request.json.get("bio")
    contact_pref = request.json.get("contact_pref")
    github_link = request.json.get("github_link")
    linkedin_link = request.json.get("linkedin_link")
    exp_level = request.json.get("exp_level")
    
    roles = request.json.get("roles")
    print(f"***{roles}***")

   #generate a password hash
    hash = werkzeug.security.generate_password_hash(pwd)
         
    crud.create_user(username, hash, fname, lname, bio, contact_pref, 
                     github_link, linkedin_link, exp_level)
            
    if "QA Engineer" in roles: 
        qa = True
    else: 
        qa = False
    if "Security Engineer" in roles: 
        security = True
    else: 
        security = False
    if "DevOps Engineer" in roles: 
        devops = True
    else: 
        devops = False
    if "Game Developer" in roles: 
        game = True
    else: 
       game = False
    if "Mobile Developer" in roles: 
        mobile = True
    else: 
        mobile = False
    if "Front-end Engineer" in roles: 
        front_end = True
    else: 
        front_end = False
    if "Back-end Engineer" in roles: 
        back_end = True
    else: 
        back_end = False
    

    user = crud.get_user_by_username(username)
    print(user)
    
    crud.create_user_roles(user.user_id, back_end, front_end, mobile, game, 
                           devops, security, qa)
    
    flash("Your profile has been saved.")  #Not showing up on redirect#
    return redirect("/")


@app.route('/process-login', methods=["POST"])
def login_user():
    
    username = request.json.get("username")
    password = request.json.get("password")
    
    user = crud.get_user_by_username(username)
  
    if not werkzeug.security.check_password_hash(user.password, password):
        flash("The username or password you entered was incorrect.")
        return redirect("/login-page")
        
    if user == None: 
        flash("The username or password you entered was incorrect.")
        return redirect("/login-page")
    
    if werkzeug.security.check_password_hash(user.password, password):
        session["username"] = username
        print(session["username"])
    return redirect("/")
        

@app.route('/profile')
def show_user_profile():
    
    return render_template('profile.html')



@app.route('/user-projects.json')
def show_user_projects():
    
    username = request.args.get("username")
    user = crud.get_user_by_username(username)
    project_posts = crud.get_all_projects_by_user(user.user_id)
    #need to get list of all applicants for each project
    return jsonify({"project": project_posts})


@app.route('/user-favorites.json')
def show_user_favorites():
    
    username = request.args.get("username")
    user = crud.get_user_by_username(username)
    favorited_projects = crud.get_all_user_favorites(user.user_id)
    return jsonify({"project": favorited_projects})


# @app.route('/user-teams.json')
# def show_user_teams(): 
    
#     username = request.args.get("username")
    
#     user = crud.get_user_by_username(username)
    
#     user_teams = crud.get_all_user_teams(user.user_id)
    
#     return jsonify({"teams": user_teams})


    
    
@app.route('/apply', methods=["POST"])
def add_applicant():
    
    
    username = session.get("username")
    if username is None: 
        return {"loggedIn": "no"}
    username = request.json.get("username")
    proj_title = request.json.get("title")
    return {"username": username, "title": proj_title}
    
@app.route('/favorite', methods=["POST"])
def favorite():
    
    username = session.get("username")
    if username is None: 
        return {"loggedIn": "no"}
    username = request.json.get("username")
    proj_title = request.json.get("title")
    return {"username": username, "title": proj_title}


@app.route('/ppform-submission', methods=["POST"])
def add_project():
    
    username = request.json.get("user")
    title = request.json.get("title")
    summary = request.json.get("summary")
    specs = request.json.get("specs")
    project_github = request.json.get("project_github")
    req_exp_level = request.json.get("req_exp_level")
    
    req_roles = request.json.get("req_roles")
    print(f"***{req_roles}***")
    
    user = crud.get_user_by_username(username)
    
    project = crud.create_project(user.user_id, title, summary, specs, 
                                  project_github, req_exp_level) 
    
    crud.create_teammember(user.user_id, project.project_id)
    
    if "QA Engineer" in req_roles: 
        qa = True
    else: 
        qa = False
    if "Security Engineer" in req_roles: 
        security = True
    else: 
        security = False
    if "DevOps Engineer" in req_roles: 
        devops = True
    else: 
        devops = False
    if "Game Developer" in req_roles: 
        game = True
    else: 
       game = False
    if "Mobile Developer" in req_roles: 
        mobile = True
    else: 
        mobile = False
    if "Front-end Engineer" in req_roles: 
        front_end = True
    else: 
        front_end = False
    if "Back-end Engineer" in req_roles: 
        back_end = True
    else: 
        back_end = False
    
    
    print( back_end, front_end, mobile, game, devops, security, qa)
    project_roles = crud.create_project_roles(user.user_id, back_end, 
                                              front_end, mobile, game, 
                                              devops, security, qa)
    
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
    