import localKeys from '../utils/local-storage-keys/localStorageKeys';
import useCookieState from './useCookieState';
import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';

const useQuiz = (quizOptions) => {
  const [quizState, setQuizState] = useCookieState(null, localKeys.QUIZ_KEY);
  const [selectedAnswer, setSelectedAnswer] = useCookieState(
    null,
    localKeys.SELECTED_ANSWER_KEY
  );

  const [isQuizOver, setIsQuizOver] = useCookieState(
    false,
    localKeys.IS_QUIZ_OVER_KEY
  );

  const [isQuizStarted, setIsQuizStarted] = useCookieState(
    false,
    localKeys.IS_QUIZ_STARTED_KEY
  );

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const loadInitialQuestions = async () => {
    try {
      const response = await axiosPrivate.get(
        `${quizOptions.QUIZ_INIT_URL}?quizMode=${quizOptions.QUIZ_MODE}&quizId=${quizOptions.QUIZ_ID}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setQuizState(() => ({
        ...getQuizStateFromResponseData(response.data),
      }));
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
  };

  const loadNextQuestion = async (selectedAnswer) => {
    try {
      await submitQuestion(selectedAnswer);

      const response = await axiosPrivate.get(
        `${quizOptions.QUIZ_NEXT_QUESTION_URL}?walkthroughId=${quizState.walkthroughId}`
      );

      setQuizState(() => ({
        ...getQuizStateFromResponseData(response.data),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const disbandQuiz = () => {
    setQuizState(null);
    setSelectedAnswer(null);
  };

  return [quizState, loadInitialQuestions, loadNextQuestion, disbandQuiz];
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

export const useQuizStartedState = () => {
  const [isQuizStarted, setIsQuizStarted] = useCookieState(
    false,
    localKeys.IS_QUIZ_STARTED_KEY
  );

  return [isQuizStarted, setIsQuizStarted];
};

export const useQuizOverState = () => {
  const [isQuizOver, setIsQuizOver] = useCookieState(
    false,
    localKeys.IS_QUIZ_OVER_KEY
  );

  return [isQuizOver, setIsQuizOver];
};

export const useSelectedAnswerState = () => {
  const [selectedAnswer, setSelectedAnswer] = useCookieState(
    null,
    localKeys.SELECTED_ANSWER_KEY
  );

  return [selectedAnswer, setSelectedAnswer];
};

export default useQuiz;
