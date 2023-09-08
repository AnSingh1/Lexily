# [Lexily](https://lexily.pythonanywhere.com/) ![](/client/public/logo-small.svg)

Lexily is a web app that aims to make literary tests more enjoyable for both the student and the teacher. No student wants to take a test on a topic they don't care about, so Lexily gives the power of deciding the theme to the user without sacrificing quality or difficulty. The app offers a few generic topics by default, but the real magic comes from the ability to enter a custom theme. Using the power of GPT-3, Lexily will automatically generate passages on any provided topic, along with related questions.

<br>

## Why did we make Lexily?

We, developers of Lexily, share a passion for reading, yet feel as though schools, especially in earlier years, are hurting the reading skills development process through the classical "reading check" approach. In our schools, students are taken one by one to a separate room to be tested, where they then must read out loud and then answer questions on the spot. We believe that this is not a correct assessment of reading skill, and the speed at which a student reads should not be a deciding factor in their assigned reading level. Furthermore, one-on-one tests are a source of stress for many students, leading to potential mistakes. Not only that, but the situation is just as inconvenient for the teacher. Teachers are forced to take time out of class to meet with each student individually, which can take weeks. Lexily aims to fix all of these problems by removing speed from being a factor, freeing up the hands of the teacher, and best of all, providing an experience that a student is sure to enjoy at least a little more.

<br>

## Technologies

- [Vite](https://vitejs.dev/) - Bundler
- [React.js](https://react.dev) - JS Framework
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework
- [Flask](https://flask.palletsprojects.com/en/2.3.x/) - Backend
- [OpenAI GPT-3](https://openai.com/blog/openai-api) - AI

<br>

## Lexily local setup
1. Clone the repository using `git clone https://github.com/AnSingh1/Lexily.git`
2. CD to the directory
3. Have python installed
4. Run `pip install -r requirements.txt` to install all of the necessary packages
5. Put your OpenAI Api in the .env file
6. Run app.py

Lexily was developed in 5 days for [DualHacks 2023](https://www.codology.org/post/dualhacks-empowering-young-minds-to-transform-education).
Result: 5th place Advanced
<br>
View our submission on [Devpost](https://devpost.com/software/lexily).

