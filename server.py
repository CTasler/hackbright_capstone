from flask import (Flask, render_template, request, 
                   jsonify, current_app, session, flash, redirect, url_for)
from model import Project, db
import crud
import json
import werkzeug.security


app = Flask(__name__)
app.secret_key = "unicorn"

test_data = [
            {"username": "lovely",
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
    session["incorrect_login"] = False
    session["post_created"] = False
    return render_template('homepage.html')

@app.route('/projects.json')
def show_project_posts():
    
    all_projects = crud.get_all_projects()
    if all_projects: 
        project_data = []
        for project in all_projects: 
            user = crud.get_user_by_id(project.user_id)
            project_roles = crud.get_project_roles(project.project_id)
            req_roles = []
            if project_roles.back_end == True: 
                req_roles.append("Back-end Engineer")
            if project_roles.front_end == True: 
                req_roles.append("Front-end Engineer")
            if project_roles.mobile == True: 
                req_roles.append("Mobile Developer")
            if project_roles.game == True: 
                req_roles.append("Game Developer")
            if project_roles.devops == True: 
                req_roles.append("DevOps Engineer")
            if project_roles.security == True: 
                req_roles.append("Security Engineer")
            if project_roles.qa == True: 
                req_roles.append("QA Engineer")
            data = {
                "username": user.username,
                "project_id": project.project_id,
                "title": project.title, 
                 "summary": project.summary, 
                 "specs": project.specs, 
                 "project_github": project.github_url, 
                 "req_exp_level": project.req_exp_level,
                 "req_roles": req_roles
            }
            project_data.append(data)
        return jsonify({"project": project_data})
    
    return jsonify({"project": test_data})


@app.route('/apply', methods=["POST"])
def add_applicant():
    
    project_id = request.json.get("project_id")
    
    username = session.get("username")
    if username is None: 
        return {"loggedIn": "false"}
    
    applicants = crud.get_all_project_applicants(project_id)
    if username in applicants: 
        return {"already_applied": "true"}
    
    teammembers = crud.get_all_teammembers(project_id)
    if username in teammembers: 
        return {"on_team": "true"}
    
    user = crud.get_user_by_username(username)
    crud.create_applicant(user.user_id, project_id)
    
    print(f"{applicants}**")
    print(f"{teammembers}****")
    
    return {"username": username}

    
@app.route('/favorite', methods=["POST"])
def favorite():
    project_id = request.json.get("project_id")
    
    username = session.get("username")
    if username is None: 
        return {"loggedIn": "false"}
    
    user = crud.get_user_by_username(username)
    project = crud.get_project_by_id(project_id)
    
    print(user.user_id)
    print(project.user_id)
    
    if project.user_id == user.user_id: 
        return {"post_creator": "true"}
    
    if crud.check_already_favorited(user.user_id, project_id): 
        print("working")
        crud.delete_favorite(project_id, user.user_id)
        return {"already_favorited": "true"}
    
    crud.create_favorite(project_id, user.user_id)
    return {"favorite_created": "true"}


@app.route('/create-profile')
def show_profile_form():
    session["post_created"] = False
    
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
    
    crud.create_user_roles(user.user_id, back_end, front_end, mobile, game, 
                           devops, security, qa)
    
    session["username"] = username
    
    return redirect("/")
    # return redirect(url_for("show_homepage"))
#url_for flask utility that searches for name of function and matches to route


@app.route('/login-page')
def show_login_page():
    session["post_created"] = False
    return render_template('login_page.html')


@app.route('/process-login', methods=["POST"])
def login_user():
    
    username = request.json.get("username")
    password = request.json.get("password")
    
    user = crud.get_user_by_username(username)
  
    if user == None: 
        session["incorrect_login"] = True
        return redirect("/login-page")
    
    if not werkzeug.security.check_password_hash(user.password, password):
        session["incorrect_login"] = True
        return redirect("/login-page")
        
    if werkzeug.security.check_password_hash(user.password, password):
        session["incorrect_login"] = False
        session["username"] = username
    return redirect("/")
        

@app.route('/profile')
def show_user_profile():
    
    username = session.get("username")
    if username is None: 
        flash("You must be logged in to view your profile.")
        return redirect("/")
    
    return render_template('profile.html')


@app.route('/user-info.json')
def show_user_info():
    
    username = session.get("username")
    user = crud.get_user_by_username(username)
    
    preferences = user.contact_pref
    profile_preferences = preferences[1:-1]
    contact_prefs = ''
    for char in profile_preferences: 
        if char == ",":
            contact_prefs += ", "
        else: 
            contact_prefs += char
            
    user_roles = crud.get_user_roles(user.user_id)
    roles = []
    if user_roles.back_end == True: 
        roles.append("Back-end Engineer")
    if user_roles.front_end == True: 
        roles.append("Front-end Engineer")
    if user_roles.mobile == True: 
        roles.append("Mobile Developer")
    if user_roles.game == True: 
        roles.append("Game Developer")
    if user_roles.devops == True: 
        roles.append("DevOps Engineer")
    if user_roles.security == True: 
        roles.append("Security Engineer")
    if user_roles.qa == True: 
        roles.append("QA Engineer")
    
    
    profile_roles = ""
    if len(roles) > 1: 
        for role in roles: 
            if role == roles[-1]:
                profile_roles += role
            else: 
                profile_roles += f"{role}, "
    else: 
        profile_roles = str(roles)
    
    
    user_info = {
                    "fname": user.fname, 
                    "lname": user.lname, 
                    "username": user.username, 
                    "bio": user.bio, 
                    "contact_pref": contact_prefs,
                    "github_url": user.github_link, 
                    "linkedin_url": user.linkedin_link, 
                    "exp_level": user.exp_level,
                    "roles": profile_roles
                }
    
    #need to get list of all applicants for each project
    return jsonify({"user_data": user_info})


@app.route('/user-projects.json')
def show_user_projects():
    
    username = session.get("username")
    user = crud.get_user_by_username(username)
    project_posts = crud.get_all_projects_by_user(user.user_id)
    
    if project_posts: 
        posts_data = []
        for project in project_posts: 
            applicants = crud.get_all_project_applicants(project.project_id)
            project_roles = crud.get_project_roles(project.project_id)
            req_roles = []
            if project_roles.back_end == True: 
                req_roles.append("Back-end Engineer")
            if project_roles.front_end == True: 
                req_roles.append("Front-end Engineer")
            if project_roles.mobile == True: 
                req_roles.append("Mobile Developer")
            if project_roles.game == True: 
                req_roles.append("Game Developer")
            if project_roles.devops == True: 
                req_roles.append("DevOps Engineer")
            if project_roles.security == True: 
                req_roles.append("Security Engineer")
            if project_roles.qa == True: 
                req_roles.append("QA Engineer")
            data = {
                "title": project.title, 
                 "summary": project.summary, 
                 "specs": project.specs, 
                 "project_github": project.github_url, 
                 "req_exp_level": project.req_exp_level,
                 "req_roles": req_roles,
                 "applicants": applicants
            }
            posts_data.append(data)
            
        return jsonify({"user_projects": posts_data})


# @app.route('/user-favorites.json')
# def show_user_favorites():
    
#     username = request.args.get("username")
#     user = crud.get_user_by_username(username)
#     favorited_projects = crud.get_all_user_favorites(user.user_id)
#     return jsonify({"project": favorited_projects})


@app.route('/user-teams.json')
def show_user_teams(): 
    
    username = session.get("username")
    user = crud.get_user_by_username(username)
    
 
   
    project_ids_for_all_teams = crud.get_project_ids_for_user_teams(user.user_id)
    
    print(project_ids_for_all_teams)
    teams_data = []
    for project_id in project_ids_for_all_teams: 
        project = crud.get_project_by_id(project_id)
        members = crud.get_all_teammembers(project_id)
        members_string = ", ".join(members)
        data = {
                "project_id": project_id,
                "title": project.title, 
                "summary": project.summary, 
                "github": project.github_url,
                "members": members_string
        }
        teams_data.append(data)
    
    
    return jsonify({"user_teams": teams_data})


@app.route('/create-project-proposal')
def show_pp_form():
    
    post_created = session.get("post_created", False)
    if post_created: 
        session.pop("post_created")
    username = session.get("username")
    if username is None: 
        flash("You must be logged in to post a project.")
        return redirect("/")

    return render_template('project_proposal_form.html', post_created=post_created)
    

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
    
    crud.create_project_roles(project.project_id, back_end, 
                                              front_end, mobile, game, 
                                              devops, security, qa)
    
    # with open("projects.json", "r+") as file: 
    #     data = json.load(file)
    #     data.append(project_data)
    #     json.dump(data, file, indent = 6, separators=(",",": "))
    
    
    session["post_created"] = True
    
    return {"url": "/create-project-proposal"}


if __name__ == "__main__": 
    from model import connect_to_db
    
    connect_to_db(app)
    
    app.run(debug=True)
    