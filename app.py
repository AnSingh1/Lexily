import re
from flask import Flask, render_template, request, jsonify, send_from_directory
import firebase_admin
from firebase_admin import db, credentials
import json

import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.environ.get('API_KEY')

# cred = credentials.Certificate("key.json")
# firebase_admin.initialize_app(cred, {'databaseURL': 'https://lexily-9bc6b-default-rtdb.firebaseio.com/'})

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serveReactApp(path):
    print(path)
    if path.startswith('api/') or path.startswith('static/'):
        return app.send_static_file(path)
    
    # Use the correct MIME types for JavaScript and CSS files
    if path.endswith('.js'):
        return send_from_directory('templates', path, mimetype='application/javascript')
    elif path.endswith('.css'):
        return send_from_directory('templates', path, mimetype='text/css')
    elif path.endswith('.svg'):
        return send_from_directory('templates', path, mimetype='image/svg+xml')
    
    else:
        print("Queued website")
        return send_from_directory('templates/', 'index.html')

@app.route('/generate', methods = ["POST"])
def generate():
    data = request.form

    #HOW it should be sorted
    #difficulty should be out of 10
    difficulty = data["difficulty"]
    numTests = data["numTests"]
    theme = data["theme"]


    #start generating it
    sections = []
    questions = {}
    options = {}

    instruction = """You are a reading guide that generates reading sections and answers. Based on the user's difficulty and number of tests, you are to generate
    the appropriate reading passage. All content should be on the same topic and related to the theme. Everything should be generated within the same JSON object using key-value pairs.
    
    Provide a passage relating to the provided prompt within the JSON object. It should be created with the following format: "passage": <passage>, where <passage> is to be replaced with the generated passage. Be sure to include a comma after the passage to follow the json format.
    Provide a title for the passage. It should be created with the following format: "title": <title>, where <title> is to be replaced with the generated title.
    Provide a subtitle for the passage. It should be a more specific overview of the passage than the title. It should be created with the following format: "subtitle": <subtitle>, where <subtitle> is to be replaced with the generated subtitle.
    Provide four multiple choice question for the passage. The question should reference the content of the passage. The question should be of the same difficulty as the passage. It should be created with the following format: "question": <question>, where <question> is to be replaced with the generated question.
    Provide an array of four options for each question, 16 options total. Only one should be the correct answer. It should be created with the following format: "options": [<option0>, <option1>, <option2>, <option3>], where each item in the array is to be replaced with one of the generated options.
    Provide the index of the correct answer in the questions array. It should be either 0, 1, 2, or 3. It should be created with the following format: "answer": <answer>, where <answer> is to be replaced with the index of the correct answer.
    
    Here is an example of a proper response:
    
    {
        "title": "Some Title",
        "subtitle": "A subtitle",
        "passage": "Paragraph 1. \n\nParagraph 2",
        "question0": "question",
        "options0": [
            "Option 0",
            "Option 1",
            "Option 2",
            "Option 3",
        ],
        answer0: 1,

        "question1": "question",
        "options1": [
            "Option 0",
            "Option 1",
            "Option 2",
            "Option 3",
        ],
        answer1: 0,

        "question2": "question",
        "options2": [
            "Option 0",
            "Option 1",
            "Option 2",
            "Option 3",
        ],
        answer2: 1,

        "question3": "question",
        "options3": [
            "Option 0",
            "Option 1",
            "Option 2",
            "Option 3",
        ],
        answer3: 1,
    }
    """

    initial = f"""The user has done {data['numTests']} tests and wants a passage with difficulty of {data['difficulty']}/10. The theme preferred is {data['theme']}"""

    messages = [{"role": "system", "content": instruction}, {"role": "user", "content": initial}]

    try:
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = messages
        )
        result = response["choices"][0]["message"]["content"]
        print("Result")
        print(result)

        questions_data = json.loads(result, strict=False)
        questions_data["difficulty"] = int(data["difficulty"])






    except Exception as e:
        print(e)
        return jsonify({"message": e})


    print(questions_data)
    return jsonify(questions_data)




@app.route('/signup', methods = ["POST"])
def signup():
    data = json.loads(request.form['data'])

    #HOW it should be sorted
    name = data[0]
    email = data[1]
    password = data[2]
    difficulty = data[3]
    numTests = data[4]

    if getUserData(data[1]):
        return jsonify({"message": "Account already exists"})
    else:
        addUser(data[0], data[1], data[2], data[3], data[4])

        return jsonify({"message": "success", "email": data[1]})

@app.route('/login', methods = ["POST"])
def login():
    data = json.loads(request.form['data'])

    #HOW it should be sorted

    email = data[0]
    password = data[1]

    user_data = getUserData(data[0])
    if user_data:
        if user_data['password'] == data[1]:
            return jsonify({"message": "success", "email": data[0], "difficulty": user_data['difficulty'], "numTests": user_data['numTests']})
        else:
            return jsonify({"message": "incorrect password"})
    else:
        return jsonify({"message": "Account does not exist"})

@app.route('/update')
def updateUser():
    email = request.form.get('email')
    difficulty = request.form.get('difficulty')
    numTests = request.form.get('numTests')

    ref = db.reference('users')
    users_ref = ref.child(email.replace('.', ','))

    users_ref.update({
        "difficulty": difficulty,
        "numTests": numTests,
    })

def addUser(name, email, password, difficulty, numTests):
    ref = db.reference('users')
    users_ref = ref.child(email.replace('.', ','))
    users_ref.set({
        "name": name,
        "email": email,
        "password": password,
        "difficulty": difficulty,
        "numTests": numTests,
    })

def getUserData(email):
    ref = db.reference('users')
    users_ref = ref.child(email.replace('.', ','))  # Replace '.' with ','
    user_data = users_ref.get()
    if user_data:
        return user_data
    else:
        return False
    
app.run(debug=True)
