package com.pjatk.quizapi.cqrs.command.impl;

import com.pjatk.quizapi.cqrs.annotations.Command;
import com.pjatk.quizapi.cqrs.command.Gate;
import org.springframework.stereotype.Component;

@Component
public class StandardGate implements Gate {
    private final RunEnvironment runEnvironment;
    private final GateHistory gateHistory = new GateHistory();

    public StandardGate(RunEnvironment runEnvironment) {
        this.runEnvironment = runEnvironment;
    }


    @Override
    public Object dispatch(Object command){
//        if (! gateHistory.register(command)){
//            return null;//skip duplicate
//        }
//
//        if (isAsynchronous(command)){
//            return null;
//        }
//

        return runEnvironment.run(command);
    }

    private boolean isAsynchronous(Object command) {
        if (! command.getClass().isAnnotationPresent(Command.class))
            return false;

        Command commandAnnotation = command.getClass().getAnnotation(Command.class);
        return commandAnnotation.asynchronous();
    }
}
