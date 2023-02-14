import { useState } from "react";
import localKeys from "../utils/local-storage-keys/localStorageKeys";
import useCookieState from "./useCookieState";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useQuiz = (quizOptions) => {
  const [quizState, setQuizState] = useCookieState(null, localKeys.QUIZ_KEY);

  const [finalScore, setFinalScore] = useCookieState(
    { quizName: "", statisticDtos: [] },
    localKeys.FINAL_SCORE
  );

  const [selectedAnswer, setSelectedAnswer] = useCookieState(
    null,
    localKeys.SELECTED_ANSWER_KEY
  );

  const [isQuizOver, setIsQuizOver] = useCookieState(
    false,
    localKeys.IS_QUIZ_OVER_KEY
  );

  const [canQuizBeCompleted, setCanQuizBeCompleted] = useState(true);

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
      setQuizState(getQuizStateFromResponseData(response.data));
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
      }
      setSelectedAnswer(null);
      return response.data.isQuizOver;
    } catch (err) {
      if (err?.response?.status === 406) {
        setCanQuizBeCompleted(false);
      }
    }
  };

  const loadNextQuestion = async (selectedAnswer) => {
    try {
      const quizFinished = await submitQuestion(selectedAnswer);

      if (quizFinished) {
        await loadQuizFinalScore();
        return;
      }

      if (!canQuizBeCompleted) {
        return;
      }

      const response = await axiosPrivate.get(
        `${quizOptions.QUIZ_NEXT_QUESTION_URL}?walkthroughId=${quizState.walkthroughId}`
      );
      setQuizState(getQuizStateFromResponseData(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const loadQuizFinalScore = async () => {
    const finalScoreData = await axiosPrivate.get(
      quizOptions.QUIZ_FINAL_SCORE_URL
    );
    setFinalScore(finalScoreData.data);

    return finalScoreData.data;
  };

  const disbandQuiz = () => {
    setQuizState(null);
    setSelectedAnswer(null);
    setIsQuizOver(false);
    setIsQuizStarted(false);
  };

  return [
    quizState,
    loadInitialQuestions,
    loadNextQuestion,
    disbandQuiz,
    isQuizOver,
    setIsQuizOver,
    isQuizStarted,
    setIsQuizStarted,
    selectedAnswer,
    setSelectedAnswer,
    finalScore,
    canQuizBeCompleted,
    setCanQuizBeCompleted,
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
