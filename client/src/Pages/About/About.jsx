import React from "react";

export default function About() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-12 text-center">
      <h2 className="font-poppins text-2xl text-test-dark dark:text-dark-test-dark">
        What is Lexily?
      </h2>
      <p className="max-w-xl font-sans text-lg text-test-lgt dark:text-dark-test-lgt">
        Lexily is a web app which aims to make literary tests more enjoyable for
        both the student and the teacher. No student wants to take a test on a
        topic they don't care about, so Lexily gives the power of deciding the
        theme to the user without sacrificing quality or difficulty. The app
        offers a few generic topics by default, but the real magic comes from
        the ability to enter a custom theme. Using the power of GPT-3, Lexily
        will automatically generate passages on any provided topic, along with
        relating questions.
      </p>
      <h2 className="font-poppins text-2xl text-test-dark dark:text-dark-test-dark">
        Why did we make Lexily?
      </h2>
      <p className="max-w-xl font-sans text-lg text-test-lgt dark:text-dark-test-lgt">
        We developers of Lexily share a passion for reading, yet feel as though
        schools, especially in earlier years, are hurting the reading skills
        development process through the classical "reading check" approach. In
        our schools, students are taken one by one to a separate room to be
        tested, where they then must read out loud and then answer questions on
        the spot. We believe that this is not a correct assessment of reading
        skill, and the speed at which a student reads should not be a deciding
        factor in their assigned reading level. Furthermore, one-on-one tests
        are a source of stress for many students, leading to potential mistakes.
        Not only that, but the situation is just as inconvenient for the
        teacher. Teachers are forced to take time out of class to meet with each
        student individually, which can take weeks. Lexily aims to fix all of
        these problems by removing speed from being a factor, freeing up the
        hands of the teacher, and best of all, providing an experience that a
        student is sure to enjoy at least a little more.
      </p>
      <h2 className="font-poppins text-2xl text-test-dark dark:text-dark-test-dark">
        How might Lexily expand in the future?
      </h2>
      <p className="max-w-xl font-sans text-lg text-test-lgt dark:text-dark-test-lgt">
        Lexily is by no means the first dive into adaptive testing thats been
        taken, and it certainly won't be the last. The incredible surge of
        recent machine learning advancement has enabled us to make these types
        of tools more widespread, and in the future, potentially generate
        content besides just text. Standardized testing suffers from similar
        issues to literary tests, and both their effectiveness and the speed at
        which they can be taken would be improved drastically by the
        implementation of generative questions. Due to its flexibility, Lexily
        could also relatively easily be adapted into a classroom-based setup for
        teachers, where teachers could push out generative tests with themes of
        their choosing to students. This would also practically eliminate the
        risk of cheating, as no two tests would be exactly the same.
      </p>
    </div>
  );
}
