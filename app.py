from flask import Flask, render_template, request, jsonify, send_from_directory
import json

import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.environ.get('API_KEY')

difficulty_desc = {10: "give extremely tough questions. Use complex words for the question and passage. Make the passage about something extremely niche.", 9: "make the passage about something niche, use complex words for the passage but semi-complex words for the questions. The questions must require critical thinking. ", 8: "Make the passage about something very niche, use complex words for the passage but medium complexity words for the questions. Questions should require critical thinking.", 7: "make the passage about something very niche and use complex words for the passage. Questions should require critical thinking.", 6:"make the passage about something niche and require the passage to be fully understood to be able to understand the questions. Use semi-complex words for the passage.", 5:"make the passage niche and require a complex understanding of the passage to answer the questions.", 4:"make the passage unique and require understanding in order to answer the questions.", 3: "make the passage semi-unique, the user should not be able to guess the questions right.", 2: "use complex words for the questions.", 1: "use simple terms and a generic passage.", 0: "use simple terms for everything and give a very generic passage."}

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

    instruction = """You are a reading guide that generates reading sections and answers. Based on the user's difficulty and number of tests, you are to generate
    the appropriate reading passage. The passage should be made up of multiple paragraphs. All content should be on the same topic and related to the theme. Everything should be generated within the same JSON object using key-value pairs.
    
    Provide a passage relating to the provided prompt within the JSON object. It should be created with the following format: "passage": <passage>, where <passage> is to be replaced with the generated passage. Be sure to include a comma after the passage to follow the json format.
    Provide a title for the passage. It should be created with the following format: "title": <title>, where <title> is to be replaced with the generated title.
    Provide a subtitle for the passage. It should be a more specific overview of the passage than the title. It should be created with the following format: "subtitle": <subtitle>, where <subtitle> is to be replaced with the generated subtitle.
    Provide four multiple choice question for the passage. The question should reference the content of the passage. The question should be of the same difficulty as the passage. It should be created with the following format: "question": <question>, where <question> is to be replaced with the generated question.
    Provide an array of four options for each question, 16 options total. Only one should be the correct answer. It should be created with the following format: "options": [<option0>, <option1>, <option2>, <option3>], where each item in the array is to be replaced with one of the generated options.
    Provide the index of the correct answer in the questions array. It should be either 0, 1, 2, or 3. It should be created with the following format: "answer": <answer>, where <answer> is to be replaced with the index of the correct answer.
    
    Do not add extra text of any kind to any of the values. This means no bullet points, no denoting a question with "Question: ", etc.
    MAKE SURE TO PLACE A COMMA SEPARATING EACH KEY-VALUE PAIR.
    
    Here is an example of a proper response:
    
     {
        "title": "Some Title",
        "subtitle": "A subtitle",
        "passage": "Paragraph 1. \n\nParagraph 2",
        "questions": [
            {
                "question": "Question?",
                "options": [
                    "Option 0",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                ],
                "answer": 2,
            },
            {
                "question": "Question?",
                "options": [
                    "Option 0",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                ],
                "answer": 1,
            },
            {
                "question": "Question?",
                "options": [
                    "Option 0",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                ],
                "answer": 0,
            },
            {
                "question": "Question?",
                "options": [
                    "Option 0",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                ],
                "answer": 3,
            },
        ]
    }
    
    """

    initial = f"""The user has done {data['numTests']} tests and wants a passage with difficulty of {data['difficulty']}/10. The theme preferred is {data['theme']} This means that you MUST {difficulty_desc[int(data['difficulty'])]}"""

    messages = [{"role": "system", "content": instruction}, {"role": "user", "content": initial}]

    questions_data = None

    while not questions_data:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            result = response["choices"][0]["message"]["content"]

            questions_data = json.loads(result, strict=False)
            questions_data["difficulty"] = int(data["difficulty"])
        except Exception as e:
            print(e)

    print(questions_data)
    return jsonify(questions_data)




    app.run()
