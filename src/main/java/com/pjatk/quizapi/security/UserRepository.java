package com.pjatk.quizapi.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(long id);
    User save(User user);
    @Modifying
    void removeByEmail(String email);
    List<User> findByIdIn(List<Long> ids);

    @Modifying
    @Query(value = "truncate table app_user", nativeQuery = true)
    void removeAll();

    @Modifying
    void removeById(long id);
}
