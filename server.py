from flask import (Flask, render_template, request, 
                   jsonify, current_app, session, flash, redirect, url_for)
from model import Project, db
import crud
import json
import werkzeug.security


app = Flask(__name__)
app.secret_key = "unicorn"


@app.route('/')
def show_homepage():
    session["incorrect_login"] = False
    session["post_created"] = False
    return render_template('homepage.html')


@app.route('/projects.json')
def show_project_posts():
    if session.get("username", None) != None:
        username = session["username"]
        user = crud.get_user_by_username(username)
        favorited_projects = crud.get_all_user_favorites(user.user_id)
        favorited_ids = []
        for project in favorited_projects: 
            favorited_ids.append(project.project_id)

    all_projects = crud.get_all_projects()
    project_data = []
    for project in all_projects: 
        if session.get("username", None) != None:
            if project.project_id in favorited_ids: 
                favorited = True
            else: 
                favorited = False
        else: 
            favorited = False
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
                "req_roles": req_roles,
                "favorited": favorited
        }
        project_data.append(data)
    return jsonify({"project": project_data})
    

# @app.route('/check-favorites.json')
# def check_all_favorites():
#     if session.get("username", None) != None: 
#         username = session["username"]
#         user = crud.get_user_by_username(username)
#         favorited_projects = crud.get_all_user_favorites(user.user_id)
#         favorited_project_ids = []
#         for project in favorited_projects: 
#             favorited_project_ids.append(project.project_id)
        
#     return jsonify({"project_ids": favorited_project_ids})


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
    print(project_id)
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


@app.route('/advanced-search')
def show_search_page():
    return render_template('search_page.html')

@app.route('/advanced-search-submission.json', methods=["POST", "GET"])
def collect_search_results():
    if request.method == "POST": 
        username = request.json.get("user").lower()
        title = request.json.get("title").lower()
        specs = request.json.get("specs").lower()
        req_exp_level = request.json.get("req_exp_level")
        req_roles = request.json.get("req_roles")
        print(f"***{username}{title}{specs}{req_exp_level}{req_roles}***")
        all_sets = []
        if username: 
            projs_with_username = crud.adv_search_username(username)
            all_sets.append(projs_with_username)
        else: 
            projs_with_username = set()
        if title: 
            projs_with_title = crud.adv_search_title(title)
            all_sets.append(projs_with_title)
        else: 
            projs_with_title = set()
        if specs: 
            projs_with_specs = crud.adv_search_specs(specs)
            all_sets.append(projs_with_specs)
        else: 
            projs_with_specs = set()
        if req_exp_level: 
            projs_with_exp_level = crud.adv_search_exp_level(req_exp_level)
            all_sets.append(projs_with_exp_level)
        else: 
            projs_with_exp_level = set()
        if req_roles: 
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
            projs_with_roles = crud.adv_search_roles(qa, security, devops, game, mobile, front_end, back_end)
            all_sets.append(projs_with_roles)
        else: 
            projs_with_roles = set()
        
        all_sets = [set for set in all_sets if set] 
        final_ids = set.intersection(*all_sets)

        # final_ids = projs_with_username & projs_with_title & projs_with_specs & projs_with_exp_level & projs_with_roles
        print("****************************")
        print(final_ids)
        
        if final_ids: 
            project_data = []
            for id in final_ids: 
                project = crud.get_project_by_id(id)
                if session.get("username", None) != None:
                    logged_in_user = crud.get_user_by_username(session["username"])
                    favorited_ids = crud.get_all_user_favorites(logged_in_user.user_id)
                    if project.project_id in favorited_ids: 
                        favorited = True
                    else: 
                        favorited = False
                else: 
                    favorited = False
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
                    "req_roles": req_roles,
                    "favorited": favorited
                }
                project_data.append(data)
            return jsonify({"matches": project_data})
        return jsonify({"matches": None})
    else: 
        return jsonify({"matches": None})


@app.route('/results')
def show_search_results(): 
    return render_template('search_results.html')


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

@app.route('/check-logged-in')
def check_if_already_logged_in():
    if session.get("username", None) != None: 
        return jsonify({"logged_in": True})
    return jsonify({"logged_in": False})
        

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

@app.route('/process-logout', methods=["POST"])
def logout_user():
    
    session.pop("username", None)
    return redirect('/')
        

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
        print("working")
        profile_roles = ("").join(roles)
    
    
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


@app.route('/edit-profile')
def show_profile_editing_page():
    return render_template('edit_profile.html')


@app.route('/profile-edit-submission.json', methods=['POST'])
def process_profile_edit():
    username = session["username"]
    user = crud.get_user_by_username(username)
    
    new_username = request.json.get("username")
    new_pwd = request.json.get("pwd")
    new_fname = request.json.get("fname")
    new_lname = request.json.get("lname")
    new_bio = request.json.get("bio")
    new_contact_pref = request.json.get("contact_pref")
    new_github_link = request.json.get("github_link")
    new_linkedin_link = request.json.get("linkedin_link")
    new_exp_level = request.json.get("exp_level")
    new_roles = request.json.get("roles")
    
    if user.username != new_username: 
        crud.update_username(user.user_id, new_username)
        session["username"] = new_username
    if not werkzeug.security.check_password_hash(user.password, new_pwd):
        hash = werkzeug.security.generate_password_hash(new_pwd)
        crud.update_password(user.user_id, hash)
    if user.fname != new_fname: 
        crud.update_fname(user.user_id, new_fname)
    if user.lname != new_lname: 
        crud.update_lname(user.user_id, new_lname)
    if user.bio != new_bio: 
        crud.update_bio(user.user_id, new_bio)
    if user.contact_pref != new_contact_pref: 
        crud.update_contact_pref(user.user_id, new_contact_pref)
    if user.github_link != new_github_link: 
        crud.update_github(user.user_id, new_github_link)
    if user.linkedin_link != new_linkedin_link: 
        crud.update_linkedin(user.user_id, new_linkedin_link)
    if user.exp_level != new_exp_level: 
        crud.update_exp_level(user.user_id, new_exp_level)
    
    if "QA Engineer" in new_roles: 
        qa = True
    else: 
        qa = False
    if "Security Engineer" in new_roles: 
        security = True
    else: 
        security = False
    if "DevOps Engineer" in new_roles: 
        devops = True
    else: 
        devops = False
    if "Game Developer" in new_roles: 
        game = True
    else: 
       game = False
    if "Mobile Developer" in new_roles: 
        mobile = True
    else: 
        mobile = False
    if "Front-end Engineer" in new_roles: 
        front_end = True
    else: 
        front_end = False
    if "Back-end Engineer" in new_roles: 
        back_end = True
    else: 
        back_end = False
        
    crud.delete_user_roles(user.user_id)
    crud.create_user_roles(user.user_id, back_end, front_end, mobile, game, 
                           devops, security, qa)
    
    return redirect('/profile')


@app.route('/user-projects.json')
def show_user_projects():
    
    username = session.get("username")
    user = crud.get_user_by_username(username)
    project_posts = crud.get_all_projects_by_user(user.user_id)
    
    # if project_posts: 
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
                "project_id": project.project_id,
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


@app.route('/all-applicants/<project_id>')
def show_all_applicants(project_id):
    
    return render_template("applicants_page.html")


@app.route('/project-applicant-profiles.json')
def show_applicant_profiles():
    
    # project_id = session["project_id"]
    project_id = request.args.get("project_id")
    print(project_id)
    print("working")
    # project_id = request.json.get("project_id")
    project = crud.get_project_by_id(project_id)
    
    applicant_usernames = crud.get_all_project_applicants(project_id)
    applicant_profiles = []
    for applicant in applicant_usernames: 
        user = crud.get_user_by_username(applicant)
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
            profile_roles = ("").join(roles)
        
        data = {
                "fname": user.fname, 
                "lname": user.lname, 
                "username": user.username, 
                "bio": user.bio, 
                "contact_prefs": user.contact_pref, 
                "github_url": user.github_link, 
                "linkedin_url": user.linkedin_link, 
                "exp_level": user.exp_level,
                "roles": roles,
        }
        applicant_profiles.append(data)
        
    return jsonify({"profiles_data": applicant_profiles, "project_title": project.title})

@app.route('/add-or-remove-applicant.json', methods=["POST"])
def handle_applicant():
    applicant_username = request.json.get("username")
    project_id = request.json.get("project_id")
    project_title = request.json.get("project_title")
    add_or_reject = request.json.get("add_or_reject")
    user = crud.get_user_by_username(applicant_username)
    crud.delete_applicant(user.user_id, project_id)
    print(applicant_username, project_id, add_or_reject)
    
    if add_or_reject == "add": 
        crud.create_teammember(user.user_id, project_id)
    
    return jsonify({"result": add_or_reject, "projectTitle": project_title})


@app.route('/user-favorites.json')
def show_user_favorites():
    
    username = session["username"]
    user = crud.get_user_by_username(username)
    
    favorited_projects = crud.get_all_user_favorites(user.user_id)
    # if all_projects: 
    favorites_data = []
    for project in favorited_projects: 
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
        favorites_data.append(data)
    return jsonify({"user_favorites": favorites_data})


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

@app.route('/leave-team.json', methods=["POST"])
def leave_team():
    username = session["username"]
    project_id = request.json.get('project_id')
    
    user = crud.get_user_by_username(username)
    project = crud.get_project_by_id(project_id)
    
    if user.user_id == project.user_id: 
        return jsonify({"team_captain": True})
    
    crud.leave_team(user.user_id, project_id)

    return {"leave_team": "successful"}


@app.route('/team-page/<projectID>')
def show_team_page(projectID):
    return render_template('team_page.html')


@app.route('/teammember-profiles.json')
def show_teammembers_profiles():
    
    
    project_id = request.args.get("project_id")
    print(project_id)
    teammember_usernames = crud.get_all_teammembers(project_id)
    
    teammember_profiles = []
    for teammember in teammember_usernames: 
        user = crud.get_user_by_username(teammember)
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
            profile_roles = ("").join(roles)
        
        data = {
                "fname": user.fname, 
                "lname": user.lname, 
                "username": user.username, 
                "bio": user.bio, 
                "contact_prefs": contact_prefs, 
                "github_url": user.github_link, 
                "linkedin_url": user.linkedin_link, 
                "exp_level": user.exp_level,
                "roles": profile_roles
        }
        teammember_profiles.append(data)
  
    
    return jsonify({"profiles_data": teammember_profiles})

@app.route('/team-project-info.json')
def show_team_project_inf():
    
    project_id = request.args.get("project_id")
    project = crud.get_project_by_id(project_id)
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
    project_data = {
            "username": user.username,
            "project_id": project.project_id,
            "title": project.title, 
            "summary": project.summary, 
            "specs": project.specs, 
            "project_github": project.github_url, 
            "req_exp_level": project.req_exp_level,
            "req_roles": req_roles
            }
    
    return jsonify({"team_project_info": project_data})

@app.route('/chat-submission', methods=["POST"])
def submit_chat_message():
    project_id = request.json.get("project_id")
    chat_message = request.json.get("message")
    date = request.json.get("date")
    time = request.json.get("time")
    username = session["username"]
    user = crud.get_user_by_username(username)
    print("*********")
    print(f"{project_id} {chat_message} {date} {time}")
    crud.create_message(user_id=user.user_id, project_id=project_id, message=chat_message, date=date, time=time)
    return jsonify({"username": username})


@app.route('/get-chat-messages')
def show_all_chat_messages():
    project_id = request.args.get("project_id")
    print(f"*****")
    print(project_id)
    
    messages_data = []
    messages = crud.get_all_messages(project_id)
    for message in messages: 
        user = crud.get_user_by_id(message.user_id)
        data = {
            "username": user.username, 
            "message": message.message, 
            "date": message.date,
            "time": message.time
        }
        messages_data.append(data)
    return jsonify({"chat_messages": messages_data})


@app.route('/get-all-user-project-titles')
def show_all_user_project_titles():
    project_title = request.args.get("title")
    username = session["username"]
    
    user = crud.get_user_by_username(username)
    all_projects = crud.get_all_projects_by_user(user.user_id)
    
    all_project_titles = []
    for project in all_projects: 
        all_project_titles.append(project.title)

    
    if project_title in all_project_titles: 
        return jsonify({"title_repeat": True})
    
    return jsonify({"title_repeat": False })
    
    

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

@app.route('/get-username')
def get_username_from_session():
    username = session['username']
    return (username)
    

@app.route('/ppform-submission', methods=["POST"])
def add_project():
    
    username = session["username"]
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


@app.route('/edit-post/<id>')
def show_post_editing_form(id):
    return render_template('edit_post.html')


@app.route('/edit-post-submission.json', methods=['POST'])
def process_post_edit():
    
    project_id = request.json.get("id")
    new_title = request.json.get("title")
    new_summary = request.json.get("summary")
    new_specs = request.json.get("specs")
    new_github_url = request.json.get("project_github")
    new_req_exp_level = request.json.get("req_exp_level")
    new_req_roles = request.json.get("req_roles")
    
    project = crud.get_project_by_id(project_id)
    
    if project.title != new_title: 
        crud.update_title(project_id, new_title)
    if project.summary != new_summary: 
        crud.update_summary(project_id, new_summary)
    if project.specs != new_specs: 
        crud.update_specs(project_id, new_specs)
    if project.github_url != new_github_url: 
        crud.update_project_github(project_id, new_github_url)
    if project.req_exp_level != new_req_exp_level: 
        crud.update_req_exp_level(project_id, new_req_exp_level)

    if "QA Engineer" in new_req_roles: 
        qa = True
    else: 
        qa = False
    if "Security Engineer" in new_req_roles: 
        security = True
    else: 
        security = False
    if "DevOps Engineer" in new_req_roles: 
        devops = True
    else: 
        devops = False
    if "Game Developer" in new_req_roles: 
        game = True
    else: 
       game = False
    if "Mobile Developer" in new_req_roles: 
        mobile = True
    else: 
        mobile = False
    if "Front-end Engineer" in new_req_roles: 
        front_end = True
    else: 
        front_end = False
    if "Back-end Engineer" in new_req_roles: 
        back_end = True
    else: 
        back_end = False
        
    crud.delete_project_roles(project_id)
    crud.create_project_roles(project_id, back_end, front_end, mobile, game, 
                           devops, security, qa)
    
    return redirect('/profile')


if __name__ == "__main__": 
    from model import connect_to_db
    
    connect_to_db(app)
    
    app.run(debug=True)
    