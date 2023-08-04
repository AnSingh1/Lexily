from flask import Flask, render_template, request, jsonify, send_from_directory
import firebase_admin
from firebase_admin import db, credentials
import json

import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.environ.get('API_KEY')

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://lexily-9bc6b-default-rtdb.firebaseio.com/'})

app = Flask(__name__)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serveReactApp(path):
    if path.startswith('api/') or path.startswith('static/'):
        return app.send_static_file(path)
    else:
        return send_from_directory('./build', 'index.html')

@app.route('/generate')
def generate():
    #call firebase
    try:
        #getting difficulty
        pass
    except:
        difficulty = 50
    
    try:
        #getting number of times attempted
        pass
    except:
        number = 0



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

@app.route('/login')
def login():
    data = json.loads(request.form['data'])

    #HOW it should be sorted

    email = data[0]
    password = data[1]

    user_data = getUserData(data[0])
    if user_data:
        if user_data['password'] == data[1]:
            return jsonify({"message": "success", "email": data[0]})
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
