from model import (db, User, Project, Favorite, Applicant, UserRole, 
                   ProjectRole, Team, Message, connect_to_db) 
import crud 

def example_user():
    user = User(username="test", password="password", fname="Claire", 
                lname="Tasler", bio="Hackbright Academy Graduate", 
                contact_pref="Email", github_link="www.github.com", 
                linkedin_link="www.linkedin/CTasler.com", 
                exp_level="Junior Software Engineer")
    db.session.add(user)
    db.session.commit()
    return 

def example_project():
    user = crud.get_user_by_username("test")
    project = Project(user_id=user.user_id, title="Coders Assemble Test", 
                      summary="""website where users can come to collaborate 
                      on project ideas""", specs="Python", 
                      github_url="www.github.com", 
                      req_exp_level="Junior Software Engineer")          
    db.session.add(project)
    db.session.commit()
    return      


def example_proj_roles():
        user = crud.get_user_by_username("test")
        project = crud.get_user_project_by_title(user.user_id, "Coders Assemble Test")
        roles = ProjectRole(project_id=project.project_id, back_end=True, front_end=True, 
                            mobile=False, game=True, devops=False, 
                            security=False, qa=False)
        db.session.add(roles)
        db.session.commit()
        return 