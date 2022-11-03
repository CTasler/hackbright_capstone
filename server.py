from flask import Flask, render_template, request, jsonify
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/ppformsubmission', methods=["POST"])
def add_proj_proposal():
    title = request.json.get("title")
    summary = request.json.get("summary")
    specs = request.json.get("specs")
    project_github = request.json.get("project_github")
    req_exp_level = request.json.get("req_exp_level")
    req_role = request.json.get("req_role")
    
    
    
    
    return {"title": title, "summary": summary, "specs": specs, 
            "project_github": project_github, "req_exp_level": req_exp_level, 
            "req_role": req_role}


@app.route('/sign-up')
def show_create_profile_page():
    return render_template('create_profile.html')


@app.route('/project-proposal-form')
def show_project_proposal_form():
    return render_template('project_proposal_form.html')


if __name__=="__main__": 
    app.run(debug=True)
    