package com.pjatk.quizapi.quiz.integration;

import com.pjatk.quizapi.cqrs.command.Gate;
import com.pjatk.quizapi.quiz.application.commands.InitQuizCommand;
import com.pjatk.quizapi.quiz.application.engine.impl.QuizNotFoundException;
import com.pjatk.quizapi.quiz.domain.quiz.QuizMode;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.security.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatExceptionOfType;

@SpringBootTest
@Transactional
class WalkthroughIntegrationTest {
    private final WalkthroughRepository walkthroughRepository;
    private final Gate gate;
    private final UserRepository userRepository;

    @Autowired
    WalkthroughIntegrationTest(WalkthroughRepository walkthroughRepository, Gate gate, UserRepository userRepository) {
        this.walkthroughRepository = walkthroughRepository;
        this.gate = gate;
        this.userRepository = userRepository;

    }

    @BeforeEach
    void beforeEach() {
        setSecurityContext();
    }

    @Test
    void state_is_set_to_init_after_initialization() {
        //given
        var initQuizCommand = new InitQuizCommand(QuizMode.EXAM, 1);
        gate.dispatch(initQuizCommand);
        //when
        Walkthrough walkthrough = findFirst();
        //then
        assertThat(walkthrough.getState()).isEqualTo(Walkthrough.State.INIT);
    }

    @Test
    void it_should_throw_exception_when_wrong_quiz_id() {
        //given
        var initQuizCommand = new InitQuizCommand(QuizMode.EXAM, 3);

        assertThatExceptionOfType(QuizNotFoundException.class)
                .isThrownBy(() -> {
                    gate.dispatch(initQuizCommand);
                });
    }

    private Walkthrough findFirst() {
        return walkthroughRepository.findAll().stream().findFirst()
                .orElseThrow();
    }

    private void setSecurityContext() {
        userRepository.findByEmail("test")
                .ifPresent(user -> userRepository.removeByEmail("test"));

        SecurityContextHolder.setContext(
                SecurityContextHolder.createEmptyContext()
        );

        User principal = new User(
                "test",
                "dsadsadsadasd"
        );

        userRepository.save(principal);

        SecurityContextHolder.getContext().setAuthentication(
                new TestingAuthenticationToken(principal, null)
        );
    }
}