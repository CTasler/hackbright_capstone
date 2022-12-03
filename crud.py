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

def update_username(user_id, new_username): 
    User.query.filter(User.user_id == user_id).update({'username': new_username})
    db.session.commit()
    return 

def update_password(user_id, new_password): 
    User.query.filter(User.user_id == user_id).update({'password': new_password})
    db.session.commit()
    return 

def update_fname(user_id, new_fname): 
    User.query.filter(User.user_id == user_id).update({'fname': new_fname})
    db.session.commit()
    return 

def update_lname(user_id, new_lname): 
    User.query.filter(User.user_id == user_id).update({'lname': new_lname})
    db.session.commit()
    return 

def update_bio(user_id, new_bio): 
    User.query.filter(User.user_id == user_id).update({'bio': new_bio})
    db.session.commit()
    return 

def update_contact_pref(user_id, new_contact_pref): 
    User.query.filter(User.user_id == user_id).update({'contact_pref': new_contact_pref})
    db.session.commit()
    return 

def update_github(user_id, new_github_link): 
    User.query.filter(User.user_id == user_id).update({'github_link': new_github_link})
    db.session.commit()
    return 

def update_linkedin(user_id, new_linkedin_link): 
    User.query.filter(User.user_id == user_id).update({'linkedin_link': new_linkedin_link})
    db.session.commit()
    return 

def update_exp_level(user_id, new_exp_level): 
    User.query.filter(User.user_id == user_id).update({'exp_level': new_exp_level})
    db.session.commit()
    return 

def create_user_roles(user_id, back_end, front_end, mobile, game, devops, security, qa):
    user_roles = UserRole(user_id=user_id, back_end=back_end, front_end=front_end, mobile=mobile, game=game, devops=devops, security=security, qa=qa)
    
    db.session.add(user_roles)
    db.session.commit()
    
    return user_roles

def get_user_roles(user_id): 
    user_roles = UserRole.query.filter(UserRole.user_id == user_id).first()
    
    return user_roles

def delete_user_roles(user_id):
    user_roles = UserRole.query.filter(UserRole.user_id == user_id).delete()
    db.session.commit()
    return 

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

def update_title(project_id, new_title):
    Project.query.filter(Project.project_id == project_id).update({'title': new_title})
    db.session.commit()
    return

def update_summary(project_id, new_summary):
    Project.query.filter(Project.project_id == project_id).update({'summary': new_summary})
    db.session.commit()
    return 


def update_specs(project_id, new_specs):
    Project.query.filter(Project.project_id == project_id).update({'specs': new_specs})
    db.session.commit()
    return 

def update_project_github(project_id, new_github_url):
    Project.query.filter(Project.project_id == project_id).update({'github_url': new_github_url})
    db.session.commit()
    return

def update_req_exp_level(project_id, new_req_exp_level):
    Project.query.filter(Project.project_id == project_id).update({'req_exp_level': new_req_exp_level})
    db.session.commit()
    return

def create_teammember(user_id, project_id):
    
    team_entry = Team(user_id=user_id, project_id=project_id)
    db.session.add(team_entry)
    db.session.commit()
    
    return 

def leave_team(user_id, project_id):
    Team.query.filter((Team.user_id == user_id) & (Team.project_id == project_id)).delete()
    db.session.commit()

    return 

def get_project_ids_for_user_teams(user_id):
    
    team_ids = Team.query.filter(Team.user_id == user_id).all()
    project_ids = []
    for id in team_ids: 
        project_ids.append(id.project_id)
    return project_ids


def get_all_teammembers(project_id): 
    teammember_ids = Team.query.filter(Team.project_id == project_id).all()
    teammembers = []
    for id in teammember_ids: 
        user = get_user_by_id(id.user_id)
        teammembers.append(user.username)
    
    return teammembers


def create_project_roles(project_id, back_end, front_end, mobile, game, devops,
                         security, qa): 
    
    project_roles = ProjectRole(project_id=project_id, back_end=back_end, 
                               front_end=front_end, mobile=mobile, game=game, 
                               devops=devops, security=security, qa=qa)
    
    db.session.add(project_roles)
    db.session.commit()
    
    return project_roles

def get_project_roles(project_id): 
    project_roles = ProjectRole.query.filter(ProjectRole.project_id == 
                                             project_id).first()
    return project_roles

def delete_project_roles(project_id):
    ProjectRole.query.filter(ProjectRole.project_id == project_id).delete()
    db.session.commit()
    return 
    

def get_all_projects():
    # all_projects = Project.query.order_by(Project.project_id.desc).all()
    all_projects = Project.query.order_by(Project.project_id.desc()).all()
    return all_projects

def get_user_project_by_title(user_id, proj_title):
    project = Project.query.filter((Project.user_id == user_id) & (Project.title == proj_title)).first()
    
    return project

def get_project_by_id(project_id):
    
    return Project.query.get(project_id)

def get_all_projects_by_user(user_id):
    all_projects = Project.query.filter(User.user_id == user_id).join(User).all()
    
    return all_projects


def get_applicants_for_project(project_id):
    applicants = Applicant.query.filter(Applicant.project_id == project_id).all()
    user_ids_of_applicants = []
    for applicant in applicants: 
        user_ids_of_applicants.append(applicant.user_id)
        
    applicant_usernames = []
    for id in user_ids_of_applicants: 
        user = get_user_by_id(id)
        applicant_usernames.append(user.username)
    return applicant_usernames
        
    
def create_favorite(project_id, user_id):
    
    favorite = Favorite(project_id=project_id, user_id=user_id)
    
    db.session.add(favorite)
    db.session.commit()

    return favorite

def check_already_favorited(user_id, project_id): 
    if Favorite.query.filter((Favorite.user_id == user_id) & (Favorite.project_id == project_id)).all():
        return True
    return False

def delete_favorite(project_id, user_id): 
    Favorite.query.filter((Favorite.project_id == project_id) & (Favorite.user_id == user_id)).delete()
    db.session.commit()
    return 


def get_all_user_favorites(user_id):
    
    favorites = Favorite.query.filter(User.user_id == user_id).join(User).all()
    favorited_projects = []
    
    for favorite in favorites: 
        project = get_project_by_id(favorite.project_id)
        favorited_projects.append(project)
        
    return favorited_projects


def create_applicant(user_id, project_id):
    applicant = Applicant(user_id=user_id, project_id=project_id)
    
    db.session.add(applicant)
    db.session.commit()
    
    return applicant


def get_all_project_applicants(project_id): 
    
    applicants = Applicant.query.filter(Applicant.project_id == project_id).all()
    project_applicants = []
    for applicant in applicants: 
        user = get_user_by_id(applicant.user_id)
        project_applicants.append(user.username)
        
    return project_applicants

def delete_applicant(user_id, project_id): 
    Applicant.query.filter((Applicant.user_id == user_id) & (Applicant.project_id == project_id)).delete()
    db.session.commit()
    return
    
def adv_search_username(username):
    users = User.query.filter(User.username.contains(username)).all()
    user_ids = []
    for user in users: 
        user_ids.append(user.user_id)
    project_ids = set()
    for id in user_ids:
        projects = get_all_projects_by_user(id)
        for project in projects: 
            project_ids.add(project.project_id)
    return project_ids

def adv_search_title(title):
    projects = Project.query.filter(Project.title.contains(title)).all()
    project_ids = set()
    for project in projects: 
        project_ids.add(project.project_id)
    return project_ids

def adv_search_specs(specs):
    projects = Project.query.filter(Project.specs.contains(specs)).all()
    project_ids = set()
    for project in projects: 
        project_ids.add(project.project_id)
    return project_ids

def adv_search_exp_level(exp_level):
    projects = Project.query.filter(Project.req_exp_level == exp_level).all()
    project_ids = set()
    for project in projects: 
        project_ids.add(project.project_id)
    return project_ids

def adv_search_roles(qa, security, devops, game, mobile, front_end, back_end):
    projects = ProjectRole.query.filter((ProjectRole.qa == qa) & (ProjectRole.security == security) & (ProjectRole.devops == devops) & (ProjectRole.game == game) & (ProjectRole.mobile == mobile) & (ProjectRole.front_end == front_end) & (ProjectRole.back_end == back_end)).all()
    project_ids = set()
    for project in projects: 
        project_ids.add(project.project_id)
    return project_ids

def get_all_messages(project_id):
    
    messages = Message.query.filter(Message.project_id == project_id).all()
    return messages

if __name__ == "__main__": 
    from server import app 
    
    connect_to_db(app)
    