package com.pjatk.quizapi.admin.application;

import com.pjatk.quizapi.security.RefreshTokenManager;
import com.pjatk.quizapi.security.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class AdminFacade {
    private final UserRepository userRepository;
    private final RefreshTokenManager refreshTokenManager;

    public AdminFacade(UserRepository userRepository, RefreshTokenManager refreshTokenManager) {
        this.userRepository = userRepository;
        this.refreshTokenManager = refreshTokenManager;
    }

    public void deleteAll() {
        refreshTokenManager.deleteAllRefreshTokens();
        userRepository.removeAllUsersExceptAdmin();
    }
}
