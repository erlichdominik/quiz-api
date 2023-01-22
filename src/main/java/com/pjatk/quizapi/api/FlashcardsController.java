package com.pjatk.quizapi.api;

import com.pjatk.quizapi.flashcards.readmodel.Hint;
import com.pjatk.quizapi.flashcards.readmodel.FlashcardFinder;
import com.pjatk.quizapi.flashcards.readmodel.Topic;
import com.pjatk.quizapi.flashcards.readmodel.TopicFinder;
import com.pjatk.quizapi.security.ApplicationSecurity;
import com.pjatk.quizapi.sharedkernel.Locale;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flashcards")
@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
class FlashcardsController {
    private final TopicFinder topicFinder;
    private final FlashcardFinder flashcardFinder;

    FlashcardsController(TopicFinder topicFinder, FlashcardFinder flashcardFinder) {
        this.topicFinder = topicFinder;
        this.flashcardFinder = flashcardFinder;
    }

    @GetMapping
    List<Topic> fetchTopics(@RequestParam Locale locale) {
        return topicFinder.findAll(locale);
    }

    @GetMapping("/{categoryId}")
    List<Hint> fetchFlashcards(@PathVariable("categoryId") long categoryId) {
        return flashcardFinder.findAll(categoryId);
    }
}
