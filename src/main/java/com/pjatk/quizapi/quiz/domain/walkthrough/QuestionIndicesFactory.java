package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.quiz.domain.pathway.SubPathway;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

class QuestionIndicesFactory {
    public List<QuestionsIndex> fromPathways(Set<Pathway> pathways) {
        List<QuestionsIndex> questionsIndices = new ArrayList<>();

        for (Pathway pathway :
                pathways) {
            QuestionsIndex indicesFromPathway = new QuestionsIndex(
                    pathway.getQuestions()
                            .stream()
                            .map(AbstractEntity::getId)
                            .toList(), pathway.getId()
            );

            questionsIndices.add(indicesFromPathway);

            List<QuestionsIndex> indicesFromSubPathways = new ArrayList<>(pathway.getSubPathways()
                    .stream()
                    .map(SubPathway::getQuestions)
                    .map(it -> it
                            .stream()
                            .map(AbstractEntity::getId)
                    )
                    .map(it -> new QuestionsIndex(it.toList(), pathway.getId()))
                    .toList());

            Collections.shuffle(indicesFromSubPathways);

            questionsIndices.addAll(indicesFromSubPathways);

        }
        return questionsIndices;
    }
}
