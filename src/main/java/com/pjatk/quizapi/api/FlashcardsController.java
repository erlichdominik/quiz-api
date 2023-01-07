package com.pjatk.quizapi.api;

import com.pjatk.quizapi.flashcards.readmodel.Topic;
import com.pjatk.quizapi.flashcards.readmodel.TopicFinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
class TopicController {
    private final TopicFinder topicFinder;

    TopicController(TopicFinder topicFinder) {
        this.topicFinder = topicFinder;
    }

    @GetMapping
    List<Topic> fetchTopics() {
        return topicFinder.findAll();
    }
}
