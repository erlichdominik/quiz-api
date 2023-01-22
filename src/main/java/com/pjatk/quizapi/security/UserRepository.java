package com.pjatk.quizapi.security;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.Repository;

import java.util.Optional;

interface UserRepository extends Repository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(long id);
    User save(User user);
    @Modifying
    void removeByEmail(String email);
}
