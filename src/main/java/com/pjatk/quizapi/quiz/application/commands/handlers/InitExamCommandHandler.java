package com.pjatk.quizapi.quiz.application.commands.handlers;

import com.pjatk.quizapi.cqrs.annotations.CommandHandlerAnnotation;
import com.pjatk.quizapi.cqrs.command.handler.CommandHandler;
import com.pjatk.quizapi.quiz.application.commands.InitQuizCommand;
import com.pjatk.quizapi.quiz.application.engine.QuizCreationPolicy;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUserRepository;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import com.pjatk.quizapi.security.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;

@CommandHandlerAnnotation
@Slf4j
class InitExamCommandHandler implements CommandHandler<InitQuizCommand, Long> {
    private final QuizCreationPolicy quizCreationPolicy;
    private final WalkthroughRepository walkthroughRepository;
    private final ApplicationUserRepository applicationUserRepository;

    InitExamCommandHandler(QuizCreationPolicy quizCreationPolicy, WalkthroughRepository walkthroughRepository, ApplicationUserRepository applicationUserRepository) {
        this.quizCreationPolicy = quizCreationPolicy;
        this.walkthroughRepository = walkthroughRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public Long handle(InitQuizCommand command) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ApplicationUser applicationUser = getOrInitApplicationUser(user);

        Walkthrough walkthrough = quizCreationPolicy.createWalkthrough(applicationUser, command.quizId());

        walkthrough.setAppUser(applicationUser);

        return walkthroughRepository.save(walkthrough).getId();
    }

    private ApplicationUser getOrInitApplicationUser(User user) {
        return applicationUserRepository.findByUserId(user.getId())
                .orElseGet(() -> applicationUserRepository.save(new ApplicationUser(user)));
    }
}
