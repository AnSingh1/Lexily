import os
from flask import Flask, render_template, request, jsonify
import re
from PyPDF2 import PdfReader
from werkzeug.utils import secure_filename
from bs4 import BeautifulSoup
import openai
openai.api_key = "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"
#try not to leak my key im not tryna go broke

cur_path = "/home/user/current/path/to/project"

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/generate', methods = ["POST", "GET"])
def generate():
    flashcards = {}
    rules = request.form['rules']
    message = request.form['message']

    content = []
    if message != "":
        content = [message]

    #file should be a list since there are multiple files

    try:
        files = request.files.getlist('files')

        for file in files:
            print(file)
            name = file.filename
            file_path = f'{cur_path}/tempfiles/' + secure_filename(file.filename) 
            file.save(file_path)

            if name.lower().endswith('.pdf'):
                with open(file_path, 'rb') as pdf_file:
                    reader = PdfReader(pdf_file)
                    pdf_content = ""

                    for page in reader.pages:
                        pdf_content += page.extract_text()

                #removing all of the html tags
                soup = BeautifulSoup(pdf_content, "html.parser")
                file_content = soup.get_text()
                content.append(file_content)

                os.remove(file_path)

            
    except Exception as e:
        print(e)
        return "HI"

    

    #handle all ocr and append it to content
    


    





    #chat gpt part
    instruction = """You are a flashcard generator that generates
    flashcards from the following information I will post.
    Listen to the user's instruction carefully. 
    Before and after each question, use the <question> tag.
    Before and after each answer, use the <answer> tag. """

    initial = f"""You are the follow this instruction:
    {rules}. 
    All of the information is below."""
    for count, conten in enumerate(content):
        initial+=f""" Item {count+1}: 
        {conten}
        """
    print(initial)


    messages = [{"role": "system", "content": instruction}, 
                {"role": "user", "content": initial}]
    
    try:
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo-16k",
            messages = messages
        )

        result = response["choices"][0]["message"]["content"]
        # print(result)

        #extracting the result
        question_pattern = re.compile(r"<question>(.*?)<\/question>", re.DOTALL)
        answer_pattern = re.compile(r"<answer>(.*?)<\/answer>", re.DOTALL)

        questions = question_pattern.findall(result)
        answers = answer_pattern.findall(result)

        for i in range(len(questions)):
            flashcards[questions[i]] = answers[i]
        print(flashcards)


        return jsonify(flashcards)


    except Exception as e:
        print(e)

        if "The model's maximum context length is" in e:
            return "Remove some info"

        return "SEE"


app.run(debug=True)
