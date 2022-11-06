"""Models for Capstone Project."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """User info."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)
    fname = db.Column(db.String(150), nullable=False)
    lname = db.Column(db.String(150), nullable= True)
    bio = db.Column(db.String(150), nullable=False)
    contact_pref = db.Column(db.String(), nullable=False)
    github_link = db.Column(db.String(150), nullable=True)
    linkedin_link = db.Column(db.String(150), nullable=True)
    exp_level = db.Column(db.String(), nullable=False)
    roles = db.Column(db.String(), nullable=False)
                         

    project = db.relationship("Project", back_populates="user")
    favorite = db.relationship("Favorite", back_populates="user")
    applicant = db.relationship("Applicant", back_populates="user")

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
    req_roles = db.Column(db.String(),nullable=True)
    num_teamembers = db.Column(db.Integer, nullable=True)

    user = db.relationship("User", back_populates="project")
    favorite = db.relationship("Favorite", back_populates="project")
    applicant = db.relationship("Applicant", back_populates="project")

    def __repr__(self):
        return f"""<Project project_id={self.project_id} user_id={self.user_id} 
                title={self.title}>"""
                

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
                
                
# class Team(db.Model):
#     """Project info."""

#     __tablename__ = "teams"

    
                
                
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

    connect_to_db(app)
