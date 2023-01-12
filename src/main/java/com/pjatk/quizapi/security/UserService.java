package com.pjatk.quizapi.security;

import com.pjatk.quizapi.api.dto.RecoverPasswordRequest;
import com.pjatk.quizapi.api.dto.RegisterNewUserRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public void createNewUser(RegisterNewUserRequest request) {
        var user = new User(request.login(), encoder.encode(request.password()), request.firstAnswerRecovery(), request.secondAnswerRecovery());
        try {
            repository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new LoginTakenException();
        }
    }

    public void recoverPassword(RecoverPasswordRequest request) {
        User user = repository.findByEmail(request.login())
                .orElseThrow(() -> new UsernameNotFoundException(request.login()));

        if (user.areRecoveryAnswersCorrect(request.firstAnswerRecovery(), request.secondAnswerRecovery())) {
            user.changePassword(encoder.encode(request.newPassword()));
            repository.save(user);
        }

    }

}
