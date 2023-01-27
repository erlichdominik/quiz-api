package com.pjatk.quizapi.admin.application;

import com.pjatk.quizapi.security.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class AdminFacade {
    private final UserRepository userRepository;

    public AdminFacade(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void deleteAll() {
        userRepository.removeAllUsersExceptAdmin();
    }
}
