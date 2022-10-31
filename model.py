"""Models for Capstone Project."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """User info."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)
    fname = db.Column(db.String(150), nullable=False)
    lname = db.Column(db.String(150), nullable= True)
    pref_contact = db.Column(db.String(), nullable=False)
    exp_level = db.Column(db.String(), nullable=False)
    knowledge_field = db.Column(db.String(), nullable=False)
                         

    projects = db.relationship("Project", back_populates="user")

    def __repr__(self):
        return f"<User user_id={self.user_id} user_name={self.user_name}>"
    
    
    class Project(db.Model):
        """Project info."""

    __tablename__ = "projectss"

    project_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    title = db.Column(db.String(150), nullable=False)
    summary= db.Column(db.String(), nullable=False)
    github_url = db.Column(db.String(150), nullable=True)
    req_exp_level = db.Column(db.String(), nullable=False)
    req_knowledge_field = db.Column(db.String(),nullable=False)

    user = db.relationship("User", back_populates="projects")

    def __repr__(self):
        return f"""<Project project_id={self.project_id} user_id={self.user_id} 
                title={self.title}>"""


def connect_to_db(flask_app, db_uri="postgresql:///ratings", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
    
    
    
#     def init_app():
#     # So that we can use Flask-SQLAlchemy, we'll make a Flask app.
#     from flask import Flask
#     app = Flask(__name__)

#     connect_to_db(app)
#     print("Connected to DB.")


# def connect_to_db(app):
#     """Connect the database to our Flask app."""

#     # Configure to use our database.
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cars'
#     app.config['SQLALCHEMY_ECHO'] = False
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#     db.app = app
#     db.init_app(app)


# if __name__ == "__main__":

#     init_app()
