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

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://lexily-9bc6b-default-rtdb.firebaseio.com/'})

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
    difficulty = data[0]
    numTests = data[1]
    theme = data[2]


    #start generating it
    sections = []
    questions = {}
    options = {}

    instruction = """You are a reading guide that generates reading sections and answers. Based on the user's difficulty and number of tests, you are to generate
    the appropriate reading passage. The entire format should be on the same topic and related to the theme. Each passage should be divided into 4 sections with each section being 2 paragraphs. This means that you will generate 8 paragraphs in total.
    Mark each section with the <section> tag and close it with the </section> tag. ONLY include the text of the section. No headers. Do not include any p tags. O
    nly include the section inside of the section tags. 
    The section tag should only include the raw text. DO NOT INCLUDE ANY OTHER TAGS.
    
    You also need to provide one multiple choice question and answer from each section.
    Mark the question with <question> tag and close the question with the </question> tag. Only the question should be marked with the question tag, nothing else.
    You need to generate four options. Mark the options with the <option> tag and end with the </option> tag.
    The answer should be either 0, 1, 2, or 3. Mark the answer with the <answer> tag and close the answer with the <answer tag>
    You also need to generate a sub title for each individual section. Mark the sub title with the <sub> tag and close it with the </sub> tag. 
    Be sure to close the section tag before using the sub tag.
    This tag should be placed right below the section and right above the question.

    You need to generate a title for the entire passage.
    Mark the title with the <title> tag and close the title with the </title> tag. Only the title should be marked with this tag.
    """

    initial = f"""The user has done {data[1]} tests and wants a passage with difficulty of {data[0]}/10. The theme preferred is {data[2]}"""

    messages = [{"role": "system", "content": instruction}, {"role": "user", "content": initial}]

    try:
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = messages
        )
        result = response["choices"][0]["message"]["content"]
        print(result)

        #extracting the content
        section_pattern = re.compile(r"<section>(.*?)<\/section>", re.DOTALL)
        question_pattern = re.compile(r"<question>(.*?)<\/question>", re.DOTALL)
        option_pattern = re.compile(r"<option>(.*?)<\/option>", re.DOTALL)
        answer_pattern = re.compile(r"<answer>(.*?)<\/answer>", re.DOTALL)
        title_pattern = re.compile(r"<title>(.*?)<\/title>", re.DOTALL)
        sub_pattern = re.compile(r"<sub>(.*?)<\/sub>", re.DOTALL)

        sections = section_pattern.findall(result)
        questions = question_pattern.findall(result)
        options = option_pattern.findall(result)
        answers = answer_pattern.findall(result)
        title = title_pattern.findall(result)[0]
        subTitles = sub_pattern.findall(result)

        questions_data = [
            {"title": title}
        ]

        for count, section in enumerate(sections):
            data = {
                "subTitle": subTitles[count],
                'section': section,
                'question': questions[count],
                'options': [
                    options[count*4],
                    options[count*4 + 1],
                    options[count*4 + 2],
                    options[count*4 + 3],
                ],
                'correct': answers[count]
            }
            questions_data.append(data)

        print(questions_data)






    except Exception as e:
        print(e)
        return jsonify({"message": e})



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
