"""CRUD operations"""

from model import (db, User, Project, Favorite, Applicant, UserRole, 
                   ProjectRole, Team, connect_to_db)

def create_user(username, password, fname, lname, bio, contact_pref, 
                github_link, linkedin_link, exp_level):
    
    user = User(username=username, password=password, fname=fname, lname=lname, 
                bio=bio, contact_pref=contact_pref, github_link=github_link, 
                linkedin_link=linkedin_link, exp_level=exp_level)
    
    db.session.add(user)
    db.session.commit()
    
    return user


def get_user_by_username(username):
    
    user =  User.query.filter(User.username == username).first()
    return user


def get_user_by_id(user_id):
    
    return User.query.get(user_id)

def get_all_usernames(): 
    
    users = User.query.all()
    usernames = []
    for user in users: 
        usernames.append(user.username)
        
    return usernames

def create_project(user_id, title, summary, specs, github_url, req_exp_level):
    
    project = Project(user_id=user_id, title=title, summary=summary, 
                      specs=specs, github_url=github_url, 
                      req_exp_level=req_exp_level)
    
    db.session.add(project)
    db.session.commit()
    
    return project

def create_teammember(user_id, project_id):
    
    team_entry = Team(user_id=user_id, project_id=project_id)
    db.session.add(team_entry)
    db.session.commit()
    
    return 

def create_project_roles(project_id, back_end, front_end, mobile, game, devops,
                         security, qa): 
    
    project_roles = ProjectRole(project_id=project_id, back_end=back_end, 
                               front_end=front_end, mobile=mobile, game=game, 
                               devops=devops, security=security, qa=qa)
    
    db.session.add(project_roles)
    db.session.commit()
    
    return project_roles

def get_all_projects():
    return Project.query.order_by(Project.id.desc).all()

def get_project_by_id(project_id):
    
    return Project.query.get(project_id)

def get_all_projects_by_user(user_id):
    return Project.query.filter(User.user_id == user_id).join(User).all()

def get_all_applicants_for_project(user_id):
    projects = get_all_projects_by_user(user_id)
    applicants_by_project = {}
    for project in projects: 
        applicants = Applicant.query.filter(
            Applicant.project_id == project.project_id).all()
        applicants_by_project[project] = applicants
    return applicants_by_project
        
    

def create_favorite(project_id, user_id):
    
    favorite = Favorite(project_id=project_id, user_id=user_id)
    
    db.session.add(favorite)
    db.session.commit()

    return favorite

def get_all_user_favorites(user_id):
    
    favorites = Favorite.query.filter(User.user_id == user_id).join(User).all()
    favorited_projects = []
    
    for favorite in favorites: 
        project = get_project_by_id(favorite.project_id)
        favorited_projects.append(project)
        
    return favorited_projects


def create_applicant(project_id, user_id):
    applicant = Applicant(project_id=project_id, user_id=user_id)
    
    db.session.add(applicant)
    db.session.commit()
    
    return applicant


def get_all_project_applicants(project_id): 
    
    applicants = Applicant.query.filter(Project.project_id == 
                                        project_id).join(Project).all()
    project_applicants = []
    
    for applicant in applicants: 
        user = get_user_by_id(applicant.user_id)
        project_applicants.append(user)
        
    return project_applicants


def create_user_roles(user_id, back_end, front_end, mobile, game, devops, security, qa):
    user_roles = UserRole(user_id=user_id, back_end=back_end, front_end=front_end, mobile=mobile, game=game, devops=devops, security=security, qa=qa)
    
    db.session.add(user_roles)
    db.session.commit()
    
    return user_roles



if __name__ == "__main__": 
    from server import app 
    
    connect_to_db(app)
    