import unittest
import os 

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

from time import sleep

from server import app
from model import (db, User, Project, Favorite, Applicant, UserRole, 
                   ProjectRole, Team, Message, connect_to_db) 
import crud 
from seed_tests import (example_user, example_project, example_proj_roles)


chrome_options = Options()  
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")   

# browser = webdriver.Chrome(executable_path="/Users/clairetasler/Downloads/chromedriver", options=chrome_options)

browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
  
browser.get("http://localhost:5000")

assert browser.title == "Coders Assemble"

# filter_input = browser.find_element(By.ID, 'filter')
# filter_input.send_keys("Trainee")

browser.get("http://localhost:5000/login-page")

username_input = browser.find_element(By.ID, "username_login")
username_input.send_keys("tasl0368")

password_input = browser.find_element(By.ID, "password_login")
password_input.send_keys("notpassword")

login_button = browser.find_element(By.ID, "login-btn-submit")
login_button.click()

sleep(5)

assert browser.title == "Login Page"
result = browser.find_element(By.ID, "wrong-entry")
text = result.get_attribute('innerText')
assert "Incorrect" in text

print("Frontend Tests Passed")

browser.quit()
    

class TestDatabase(unittest.TestCase):
    """Tests for database"""

    def setUp(self):

        with app.app_context():
            if not hasattr(db, "app"):
                connect_to_db(app, "postgresql:///testdb")
            self.client= app.test_client()
            app.config['TESTING'] = True
            db.create_all()
            example_user()
            example_project()
            example_proj_roles()
    
        return 
    
    def tearDown(self): 
        with app.app_context():
            db.session.close()
            db.drop_all()
        return 
    
    def test_project_created(self): 
        """Test if example project was created correctly"""
        with app.app_context():
            user = crud.get_user_by_username("test")
            project = crud.get_user_project_by_title(user.user_id, "Coders Assemble Test")
        self.assertEqual(project.specs, "Python")
        
    
    def test_project_post(self):
        """Test if example project data appears on the homepage"""
        with app.app_context():
            result = self.client.get('/projects.json')
        self.assertIn(b"Coders Assemble Test", result.data)

    
    def test_user_created(self): 
        with app.app_context():
            user = crud.get_user_by_username("test")
        self.assertEqual(user.fname, "Claire")
        
    
if __name__=="__main__": 
        
    unittest.main()
    
