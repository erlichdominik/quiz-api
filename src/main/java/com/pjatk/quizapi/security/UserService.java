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
    private final RoleRepository roleRepository;


    public UserService(UserRepository repository, PasswordEncoder encoder, RoleRepository roleRepository) {
        this.repository = repository;
        this.encoder = encoder;
        this.roleRepository = roleRepository;
    }

    public void createNewTeacher(RegisterNewUserRequest request) {
        Role role = roleRepository.findByNameOrThrow(Roles.TEACHER.getRoleName());
        var user = new User(request.login(), encoder.encode(request.password()), request.firstAnswerRecovery(), request.secondAnswerRecovery(), role);
        try {
            repository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new LoginTakenException();
        }
    }

    public void createNewStudent(RegisterNewUserRequest request) {
        Role role = roleRepository.findByNameOrThrow(Roles.STUDENT.getRoleName());
        var user = new User(request.login(), encoder.encode(request.password()), request.firstAnswerRecovery(), request.secondAnswerRecovery(), role);
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
