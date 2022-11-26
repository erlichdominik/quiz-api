package com.pjatk.quizapi.cqrs.command.impl;

import com.pjatk.quizapi.cqrs.command.handler.CommandHandler;
import org.springframework.stereotype.Component;

@Component
public class RunEnvironment {
    public RunEnvironment(HandlersProvider handlersProvider) {
        this.handlersProvider = handlersProvider;
    }

    public interface HandlersProvider {
        CommandHandler<Object, Object> getHandler(Object command);
    }

    private final HandlersProvider handlersProvider;

    public Object run(Object command) {
        CommandHandler<Object, Object> handler = handlersProvider.getHandler(command);

        return handler.handle(command);
    }
}
