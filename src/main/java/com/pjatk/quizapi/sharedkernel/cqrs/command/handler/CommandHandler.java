package com.pjatk.quizapi.sharedkernel.cqrs.command.handler;

/**
 * @param <C> command
 * @param <R> result type for async {@link com.pjatk.quizapi.sharedkernel.cqrs.annotations.Command} commands should be Void
 */
public interface CommandHandler<C,R> {
    public R handle(C command);
}
