package com.pjatk.quizapi.api;

import com.pjatk.quizapi.flashcards.readmodel.Topic;
import com.pjatk.quizapi.flashcards.readmodel.TopicFinder;
import com.pjatk.quizapi.security.ApplicationSecurity;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flashcards")
@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
class FlashcardsController {
    private final TopicFinder topicFinder;

    FlashcardsController(TopicFinder topicFinder) {
        this.topicFinder = topicFinder;
    }

    @GetMapping
    List<Topic> fetchTopics() {
        return topicFinder.findAll();
    }
}
