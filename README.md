# Coders Assemble 

Deployed at: http://codersassemble.net/

Learn more about the developer: https://www.linkedin.com/in/claire-tasler/

Coders Assemble is a fullstack web application that allows software engineers 
to come together and post thier ideas for projects they want to build in order
to find fellow engineers to collaborate on these projects with them. This 
website was intended to create a space where engineers can go 
to find inspiriation, make connections, and begin building incredible 
projects together. 

![Home Page](/readme_pics/homepagescreenshot.png?raw=true)

![Project Post Page](/readme_pics/create%20a%20project%20post%20screenshot.png)

Users can post their own project ideas or look through the projects that others
have posted. Users can then request to join the team for projects they are 
interested in or can save that project to their favorites. 

![Advanced Search Page](/readme_pics/advanced%20search%20screenshot.png)

Users can also utilize different search features to find projects that are best
suited to their experience level or technologies they are familiar with. 

![Team Page](/readme_pics/team%20page%20screenshot.png)

On the Team Page, users can see the profile information of their fellow 
team members and chat with them. 

## Technologies Used 
Python, Flask, SQLALchemy, Javascript, AJAX/JSON, Jinja, React, HTML, Bootstrap 
and CSS.

(Dependencies are listed in requirements.txt)

## How to run Coders Assemble locally

* Set up and activate a python virtualenv and install all dependencies: 
  * `pip install -r requirements.txt`

* Change secret key

* Seed the database 
  * `python seed_database.py`

* Start up the flask server: 
  * `python server.py` 

* Go to localhost:5000 to see Coders Assemble

## Version 2.0

__Improvements__ 

Improve responsive CSS


__New Features__

Allow users to message other users one on one, with an additional notifications
 feature using Push Notifications API




