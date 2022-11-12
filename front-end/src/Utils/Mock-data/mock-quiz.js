const answers = [
  {
    id: 'answer1',
    answerText: 'incorrect',
  },
  {
    id: 'answer2',
    answerText: 'correct',
  },
  {
    id: 'answer3',
    answerText: 'incorrect',
  },
  {
    id: 'answer4',
    answerText: 'correct',
  },
  {
    id: 'answer5',
    answerText: 'incorrect',
  },
  {
    id: 'answer6',
    answerText: 'incorrect',
  },
  {
    id: 'answer7',
    answerText: 'correct',
  },
  {
    id: 'answer8',
    answerText: 'incorrect',
  },
  {
    id: 'answer9',
    answerText: 'incorrect',
  },
];

const questions = [
  {
    id: '1',
    questionName: 'Question 1',
    answers: [answers[0], answers[1], answers[2]],
  },

  {
    id: '2',
    questionName: 'Question 2',
    answers: [answers[3], answers[4], answers[5]],
  },
  {
    id: '3',
    questionName: 'Question 3',
    answers: [answers[6], answers[7], answers[8]],
  },
];

const getNextQuestion = (questionId) => {
  return questions[questionId];
};

const getStartingQuestion = () => questions[0];

export { getStartingQuestion, getNextQuestion };
