package com.pjatk.quizapi.admin.application;

import com.pjatk.quizapi.security.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class AdminFacade {
    private final UserRepository userRepository;

    public AdminFacade(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void deleteAll() {
        userRepository.removeAll();
    }
}
