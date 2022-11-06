"""CRUD operations"""

from model import db, User, Project, Favorite, Applicant, connect_to_db

def create_user(username, password, fname, lname, bio, contact_pref, 
                github_link, linkedin_link, exp_level, roles):
    
    user = User(username=username, password=password, fname=fname, lname=lname, 
                bio=bio, contact_pref=contact_pref, github_link=github_link, 
                linkedin_link=linkedin_link, exp_level=exp_level, roles=roles)
    
    db.session.commit(user)
    db.session.add()
    
    return user


def get_user_by_username(username):
    
    return User.query.get(username)


def get_user_by_id(user_id):
    
    return User.query.get(user_id)

def get_all_usernames(): 
    
    users = User.query.all()
    usernames = []
    for user in users: 
        usernames.append(user.username)
        
    return usernames

def create_project(user_id, title, summary, specs, github_url, req_exp_level, 
                   req_roles):
    
    project = Project(user_id=user_id, title=title, summary=summary, 
                      specs=specs, github_url=github_url, 
                      req_exp_level=req_exp_level, req_roles=req_roles)
    
    db.session.commit(project)
    db.session.add()
    
    return project

def get_project_by_id(project_id):
    
    return Project.query.get(project_id)

def get_all_projects_by_user(user_id):
    return Project.query.filter(User.user_id == user_id).join(User).all()
    


def create_favorite(project_id, user_id):
    
    favorite = Favorite(project_id=project_id, user_id=user_id)
    
    db.session.commit(favorite)
    db.session.add()

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
    
    db.session.commit(applicant)
    db.session.add()
    
    return applicant


def get_all_project_applicants(project_id): 
    
    applicants = Applicant.query.filter(Project.project_id == 
                                        project_id).join(Project).all()
    project_applicants = []
    
    for applicant in applicants: 
        user = get_user_by_id(applicant.user_id)
        project_applicants.append(user)
        
    return project_applicants


if __name__ == "__main__": 
    from server import app 
    
    connect_to_db(app)
    