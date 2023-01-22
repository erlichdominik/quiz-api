package com.pjatk.quizapi.security;

import org.springframework.data.repository.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

public interface RoleRepository extends Repository<Role, Long> {
    Optional<Role> findByName(String name);

    default Role findByNameOrThrow(String name) {
        return findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role with name: %s not found"
                        .formatted(name)));
    }
}
