package com.pjatk.quizapi.security;

import com.pjatk.quizapi.api.dto.RecoverPasswordRequest;
import com.pjatk.quizapi.api.dto.RegisterNewUserRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService extends MailValidator {
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final RoleRepository roleRepository;
    private final MailValidator mailValidator = new MailValidator();
    private final RefreshTokenManager refreshTokenManager;

    public UserService(UserRepository repository, PasswordEncoder encoder, RoleRepository roleRepository, RefreshTokenManager refreshTokenManager) {
        this.repository = repository;
        this.encoder = encoder;
        this.roleRepository = roleRepository;
        this.refreshTokenManager = refreshTokenManager;
    }

    public void createNewTeacher(RegisterNewUserRequest request) {
        mailValidator.requireCorrectMail(request.login(), "@wum.edu.pl");
        Role role = roleRepository.findByNameOrThrow(Roles.TEACHER.getRoleName());
        var user = new User(request.login(), encoder.encode(request.password()), request.firstAnswerRecovery(), request.secondAnswerRecovery(), role);
        try {
            repository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new LoginTakenException();
        }
    }

    public void createNewStudent(RegisterNewUserRequest request) {
        mailValidator.requireCorrectMail(request.login(), "@student.wum.edu.pl");
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

    public void requireCorrectMail(String username, String suffix) {
        mailValidator.requireCorrectMail(username, suffix);
    }

    @Transactional
    public void deleteUser(long userId) {
        refreshTokenManager.deleteByUserId(userId);
        Optional<Role> admin = repository.findById(userId)
                .flatMap(it -> it.getRoles().stream()
                        .filter(role -> role.getName().equals("ADMIN"))
                        .findFirst());

        if (admin.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE);
        }

        repository.removeById(userId);
    }

}
