/**
 * TODO:
 * loadInitialQuestions()
 * loadNextQuestion(answerId)
 * disbandQuiz()
 * clearQuizStorage()
 */

import localKeys from '../utils/local-storage-keys/localStorageKeys';
import useCookieState from './useCookieState';
import useAxiosPrivate from './useAxiosPrivate';

const useQuiz = (quizOptions) => {
  const [quizState, setQuizState] = useCookieState(null, localKeys.QUIZ_KEY);
  const [isQuizOver, setIsQuizOver] = useCookieState(
    true,
    localKeys.IS_QUIZ_OVER_KEY
  );
  const [isQuizStarted, setIsQuizStarted] = useCookieState(
    true,
    localKeys.IS_QUIZ_STARTED_KEY
  );

  const axiosPrivate = useAxiosPrivate();

  const setQuizStarted = (value) => {
    setIsQuizStarted(value);
  };

  const setQuizOver = (value) => {
    setIsQuizOver(value);
  };

  const loadInitialQuestions = async () => {
    try {
      const response = await axiosPrivate.get(
        `${quizOptions.QUIZ_INIT_URL}?quizMode=${quizOptions.QUIZ_MODE}&quizId=${quizOptions.QUIZ_ID}`
      );
      setQuizState(() => ({
        ...getQuizStateFromResponseData(response.data),
      }));
    } catch (err) {
      console.err(err);
    }
  };

  const submitQuestion = async (selectedAnswer) => {
    try {
      const response = await axiosPrivate.post(
        `${quizOptions.QUIZ_SUBMIT_URL}?walkthroughId=${quizState.walkthroughId}&answerId=${selectedAnswer}`
      );
      if (response.data.isQuizOver === true) {
        setIsQuizOver(true);
        setIsQuizStarted(false);
      }
    } catch (err) {
      console.err(err);
    }
  };

  const loadNextQuestion = async (selectedAnswer) => {
    try {
      await submitQuestion(selectedAnswer);
      await axiosPrivate.get(
        `${quizOptions.QUIZ_NEXT_QUESTION_URL}?walkthroughId=${quizState.walkthroughId}`
      );
    } catch (err) {
      console.err(err);
    }
  };

  const disbandQuiz = () => {
    // clears current quiz state
    setQuizState(() => null);
  };

  return [
    quizState,
    isQuizStarted,
    setQuizStarted,
    isQuizOver,
    setQuizOver,
    loadInitialQuestions,
    loadNextQuestion,
    disbandQuiz,
  ];
};

const getQuizStateFromResponseData = (responseData) => {
  return {
    walkthroughId: responseData.walkthroughId,
    currentQuestion: {
      questionId: responseData.questionDto.questionId,
      questionName: responseData.questionDto.question,
    },
    answers: responseData.questionDto.answerDtos,
  };
};

export default useQuiz;
