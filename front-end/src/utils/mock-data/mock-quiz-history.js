const dates = [
  new Date("November 15, 2022, 14:25:07"),
  new Date("November 16, 2022, 7:28:05"),
  new Date("November 17, 2022, 19:27:21"),
];

export const mockQuizHistoryItems = [
  {
    quizName: "quiz",
    completionDate: dates[0],
    statisticsDtos: [
      {
        pathName: "pathname1",
        completedPercentage: 0.53,
      },
      {
        pathName: "pathname2",
        completedPercentage: 0.76,
      },
      {
        pathName: "pathname3",
        completedPercentage: 0.47,
      },
      {
        pathName: "pathname4",
        completedPercentage: 0.38,
      },
      {
        pathName: "pathname5",
        completedPercentage: 0.82,
      },
    ],
  },
  {
    quizName: "quiz",
    completionDate: dates[1],
    statisticsDtos: [
      {
        pathName: "pathname1",
        completedPercentage: 0.75,
      },
      {
        pathName: "pathname2",
        completedPercentage: 0.76,
      },
      {
        pathName: "pathname3",
        completedPercentage: 0.47,
      },
      {
        pathName: "pathname4",
        completedPercentage: 0.38,
      },
      {
        pathName: "pathname5",
        completedPercentage: 0.82,
      },
    ],
  },
  {
    quizName: "quiz",
    completionDate: dates[2],
    statisticsDtos: [
      {
        pathName: "pathname1",
        completedPercentage: 0.75,
      },
      {
        pathName: "pathname2",
        completedPercentage: 0.76,
      },
      {
        pathName: "pathname3",
        completedPercentage: 0.47,
      },
      {
        pathName: "pathname4",
        completedPercentage: 0.38,
      },
      {
        pathName: "pathname5",
        completedPercentage: 0.82,
      },
    ],
  },
];
