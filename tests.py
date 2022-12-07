import unittest

from server import app
from model import (db, User, Project, Favorite, Applicant, UserRole, 
                   ProjectRole, Team, Message, connect_to_db) 
import crud 

# class TestCrud(unittest.TestCase): 
#     """Tests for crud file"""
    
#     pass

class TestServer(unittest.TestCase):
    """Tests for server"""
    
    def setUp(self): 
        self.client = app.test_client()
        app.config["TESTING"] = True
        
    
    def test_homepage(self): 
        result = self.client.get("/")
        self.assertIn(b"Welcome", result.data)
    

# class TestDatabase(unittest.TestCase):
#     """Tests for database"""

#     def setUp(self):
        
#         self.client= app.test_client()
        
#         app.config['TESTING'] = True
        
#         connect_to_db(app, "postgresql:///testdb")
    
#         return 
    
#     def tearDown(self): 
        
#         return 
    
    # def test_project(self):
    #     """Test if example project data appears on the homepage"""
        
    #     result = self.client.get('/projects.json')
    #     self.assertIn(b"Coders Assemble", result.data)
    #     return 
    
    # def test_user(self): 
    #     user = crud.get_user_by_username("test2")
    #     self.assertEqual(user.fname, "Claire")
    
if __name__=="__main__": 
    
    # from server import app

    # with app.app_context():
    #     connect_to_db(app)
    #     db.create_all()
    #     example_user()
    #     example_project()
    #     db.session.close()
    #     db.drop_all()
        
    unittest.main()