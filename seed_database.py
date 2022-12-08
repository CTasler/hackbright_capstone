"""Script to seed database."""

import os
import json
import crud
import werkzeug.security
from model import (db, User, Project, Favorite, Applicant, UserRole, 
                   ProjectRole, Team, Message, connect_to_db) 
from server import app

os.system("dropdb codele")
os.system("createdb codele")

with app.app_context():
    connect_to_db(app)
    db.create_all()

with open("data/users.json") as file: 
    user_data = json.loads(file.read())
    
users_in_db = []
for user in user_data: 
    username, password, fname, lname, bio, contact_pref, github_link, linkedin_link, exp_level = (
        user["username"], 
        werkzeug.security.generate_password_hash(user["password"]), 
        user["fname"], 
        user["lname"], 
        user["bio"], 
        user["contact_pref"], 
        user["github_link"], 
        user["linkedin_link"], 
        user["exp_level"], 
    )
    with app.app_context():
        db_user = crud.create_user(username, password, fname, lname, bio, contact_pref, github_link, linkedin_link, exp_level)
        users_in_db.append(db_user)
with app.app_context():
    db.session.add_all(users_in_db)
    db.session.commit()

with open("data/userroles.json") as file2: 
    user_roles_data = json.loads(file2.read())
    
    user_roles_in_db = []
    for role in user_roles_data:
        user_id, back_end, front_end, mobile, game, devops, security, qa = (
            role["user_id"], 
            role["back_end"], 
            role["front_end"], 
            role["mobile"], 
            role["game"], 
            role["devops"], 
            role["security"], 
            role["qa"], 
        )
        
        with app.app_context():
            db_user_roles = crud.create_user_roles(user_id, back_end, front_end, mobile, game, devops, security, qa)
            user_roles_in_db.append(db_user_roles)

with app.app_context():    
    db.session.add_all(user_roles_in_db)
    db.session.commit()

with open("data/projects.json") as file3: 
    project_data = json.loads(file3.read())
    
projects_in_db = []
for project in project_data: 
    user_id, title, summary, specs, github_url, req_exp_level = (
        project["user_id"], 
        project["title"], 
        project["summary"], 
        project["specs"], 
        project["github_url"], 
        project["req_exp_level"], 
    )
    with app.app_context():
        db_project = crud.create_project(user_id, title, summary, specs, github_url, req_exp_level)
        projects_in_db.append(db_project)
with app.app_context():
    db.session.add_all(projects_in_db)
    db.session.commit()
    
    
with open("data/projectroles.json") as file4: 
    project_roles_data = json.loads(file4.read())
    
    project_roles_in_db = []
    for project_role in project_roles_data:
        project_id, back_end, front_end, mobile, game, devops, security, qa = (
            project_role["project_id"], 
            project_role["back_end"], 
            project_role["front_end"], 
            project_role["mobile"], 
            project_role["game"], 
            project_role["devops"], 
            project_role["security"], 
            project_role["qa"], 
        )
        
        with app.app_context():
            db_project_roles = crud.create_project_roles(project_id, back_end, front_end, mobile, game, devops, security, qa)
            project_roles_in_db.append(db_project_roles)

with app.app_context():    
    db.session.add_all(project_roles_in_db)
    db.session.commit()