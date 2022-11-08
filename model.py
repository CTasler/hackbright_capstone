"""Models for Capstone Project."""

from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()


os.system("dropdb codele")
os.system("createdb codele")

class User(db.Model):
    """User info."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(500), nullable=False)
    fname = db.Column(db.String(150), nullable=False)
    lname = db.Column(db.String(150), nullable= True)
    bio = db.Column(db.String(150), nullable=False)
    contact_pref = db.Column(db.String(), nullable=False)
    github_link = db.Column(db.String(150), nullable=True)
    linkedin_link = db.Column(db.String(150), nullable=True)
    exp_level = db.Column(db.String(), nullable=False)
    # roles = db.Column(db.String(), nullable=False)
                         

    project = db.relationship("Project", back_populates="user")
    favorite = db.relationship("Favorite", back_populates="user")
    applicant = db.relationship("Applicant", back_populates="user")
    user_roles = db.relationship("UserRole", back_populates="user")
    team = db.relationship("Team", back_populates="user")

    def __repr__(self):
        return f"<User user_id={self.user_id} username={self.username}>"
    
    
class Project(db.Model):
    """Project info."""

    __tablename__ = "projects"

    project_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    title = db.Column(db.String(150), nullable=False)
    summary= db.Column(db.String(), nullable=False)
    specs= db.Column(db.String(120), nullable=False)
    github_url = db.Column(db.String(150), nullable=True)
    req_exp_level = db.Column(db.String(), nullable=True)
    # req_roles = db.Column(db.String(),nullable=True)
    # num_teamembers = db.Column(db.Integer, nullable=True)

    user = db.relationship("User", back_populates="project")
    favorite = db.relationship("Favorite", back_populates="project")
    applicant = db.relationship("Applicant", back_populates="project")
    project_roles = db.relationship("ProjectRole", back_populates="project")
    team = db.relationship("Team", back_populates="project")

    def __repr__(self):
        return f"""<Project project_id={self.project_id} user_id={self.user_id} 
                title={self.title}>"""
                
                
class UserRole(db.Model): 
    
    __tablename__ = "user_roles"
    
    user_role_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    back_end = db.Column(db.Boolean, nullable=False)
    front_end = db.Column(db.Boolean, nullable=False)
    mobile = db.Column(db.Boolean, nullable=False)
    game = db.Column(db.Boolean, nullable=False)
    devops = db.Column(db.Boolean, nullable=False)
    security = db.Column(db.Boolean, nullable=False)
    qa = db.Column(db.Boolean, nullable=False)


    user = db.relationship("User", back_populates="user_roles")



# id | user id |back-end  | front-end | game-developer | security |
# 1 | 5| t | f | f | t 

class ProjectRole(db.Model): 
    
    __tablename__ = "project_roles"
    
    project_role_id = db.Column(db.Integer, autoincrement=True, 
                                primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.project_id"))
    back_end = db.Column(db.Boolean, nullable=False)
    front_end = db.Column(db.Boolean, nullable=False)
    mobile = db.Column(db.Boolean, nullable=False)
    game = db.Column(db.Boolean, nullable=False)
    devops = db.Column(db.Boolean, nullable=False)
    security = db.Column(db.Boolean, nullable=False)
    qa = db.Column(db.Boolean, nullable=False)

    project = db.relationship("Project", back_populates="project_roles")



class Favorite(db.Model):
    """Project info."""

    __tablename__ = "favorites"

    favorite_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.project_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    user = db.relationship("User", back_populates="favorite")
    project = db.relationship("Project", back_populates="favorite")

    def __repr__(self):
        return f"""<Favorite favorite_id={self.favorite_id} 
        project_id={self.project_id} user_id={self.user_id}>"""
                
                
class Team(db.Model):
    """Project info."""

    __tablename__ = "teams"
    
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id") )
    project_id = db.Column(db.Integer, db.ForeignKey("projects.project_id")) 

    user = db.relationship("User", back_populates="team")
    project = db.relationship("Project", back_populates="team")
                
class Applicant(db.Model):
    """Project info."""

    __tablename__ = "applicants"
    
    applicant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.project_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    
    user = db.relationship("User", back_populates="applicant")
    project = db.relationship("Project", back_populates="applicant")

    def __repr__(self):
        return f"""<Applicant applicant_id={self.applicant_id} 
        project_id={self.project_id} user_id={self.user_id}>"""



def connect_to_db(app, db_uri="postgresql:///codele"):
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    with app.app_context():
        connect_to_db(app)
        db.create_all()
        db.session.commit()
