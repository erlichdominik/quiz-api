package com.pjatk.quizapi.quiz.application.engine.impl;

import com.pjatk.quizapi.ddd.annotations.application.ApplicationPolicy;
import com.pjatk.quizapi.quiz.application.HistoryManager;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUserRepository;
import com.pjatk.quizapi.quiz.domain.appuser.Statistic;
import com.pjatk.quizapi.quiz.domain.appuser.UserHistory;
import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.quiz.domain.pathway.PathwayRepository;
import com.pjatk.quizapi.quiz.domain.pathway.SubPathway;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.quiz.domain.quiz.QuizId;
import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;
import com.pjatk.quizapi.quiz.domain.walkthrough.Stat;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;

import java.time.Clock;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;

@ApplicationPolicy
class ExamHistoryManager implements HistoryManager {
    private final QuizRepository quizRepository;
    private final PathwayRepository pathwayRepository;
    private final ApplicationUserRepository applicationUserRepository;
    private final Clock clock;

    ExamHistoryManager(QuizRepository quizRepository, PathwayRepository pathwayRepository, ApplicationUserRepository applicationUserRepository, Clock clock) {
        this.quizRepository = quizRepository;
        this.pathwayRepository = pathwayRepository;
        this.applicationUserRepository = applicationUserRepository;
        this.clock = clock;
    }

    @Override
    public void storeHistory(Walkthrough walkthrough) {
        QuizId quizId = walkthrough.getQuizId();
        Quiz quiz = quizRepository.findById(quizId.getValue())
                .orElseThrow(() -> new QuizNotFoundException(quizId.getValue()));

        List<Stat> stats = walkthrough.getStats().stream().toList();

        Map<Long, List<Stat>> statsPerPathwayId = stats.stream()
                .collect(groupingBy(Stat::getPathwayId));

        var userHistory = new UserHistory(quiz);

        List<Statistic> statistics = getStatisticsForPathways(statsPerPathwayId);

        statistics.forEach(userHistory::addStatistic);

        ApplicationUser appUser = walkthrough.getAppUser();

        appUser.addUserHistory(userHistory);

        applicationUserRepository.save(appUser);
    }

    private List<Statistic> getStatisticsForPathways(Map<Long, List<Stat>> statsPerPathwayId) {
        return statsPerPathwayId
                .keySet()
                .stream()
                .map(pathwayRepository::findById)
                .flatMap(it -> it.stream()
                        .map(pathway -> mapPathwayDataToStatistic(statsPerPathwayId, pathway)))
                .toList();
    }

    private static Statistic mapPathwayDataToStatistic(Map<Long, List<Stat>> statsPerPathwayId, Pathway pathway) {
        List<Stat> statsForPathway = statsPerPathwayId.get(pathway.getId());
        String pathwayName = pathway.getPathwayName();

        long pathwaySize = pathway.getQuestions().size() +
                countNumberOfQuestionsInAllSubPathways(pathway);

        long correctAnswersNumber = statsForPathway.stream()
                .filter(Stat::isCorrect)
                .count();

        return new Statistic(pathwayName, (correctAnswersNumber*1.0 / pathwaySize));
    }

    private static long countNumberOfQuestionsInAllSubPathways(Pathway pathway) {
        return pathway.getSubPathways()
                .stream()
                .map(SubPathway::getQuestions)
                .mapToLong(Collection::size)
                .sum();
    }

}
