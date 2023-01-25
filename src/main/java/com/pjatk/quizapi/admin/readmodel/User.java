package com.pjatk.quizapi.admin.readmodel;

import com.pjatk.quizapi.security.Role;
import lombok.Getter;

import java.util.Objects;
import java.util.Set;

@Getter
public class User {
    private final long id;
    private final String role;
    private final String email;

    public User(long id, Role role, String email) {
        this.id = id;
        this.role = role.getName();
        this.email = email;
    }

    public User(long id, Set<Role> roles, String email) {
        this.id = id;
        role = roles.stream()
                .map(Role::getName)
                .findFirst()
                .orElse("NO ROLE");
        this.email = email;
    }

    public long id() {
        return id;
    }

    public String email() {
        return email;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (User) obj;
        return this.id == that.id &&
               Objects.equals(this.role, that.role) &&
               Objects.equals(this.email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, role, email);
    }

    @Override
    public String toString() {
        return "User[" +
               "id=" + id + ", " +
               "role=" + role + ", " +
               "email=" + email + ']';
    }
}
