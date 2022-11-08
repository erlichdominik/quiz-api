package com.pjatk.quizapi.security;

import com.pjatk.quizapi.api.dto.AuthRequest;
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

    public void createNewUser(AuthRequest request) {
        var user = new User(request.email(), encoder.encode(request.password()));
        repository.save(user);
    }

}
