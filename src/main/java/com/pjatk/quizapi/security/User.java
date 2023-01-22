package com.pjatk.quizapi.security;

import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "app_user")
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private long id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    @OneToOne(mappedBy = "user",fetch = FetchType.EAGER)
    private ApplicationUser applicationUser;

    @Column(nullable = false)
    private String firstRecoveryAnswer;

    @Column(nullable = false)
    private String secondRecoveryAnswer;

    @ManyToMany
    @JoinTable(name = "users_roles")
    private Set<Role> roles = new HashSet<>();

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public User(String email, String password, String firstRecoveryAnswer, String secondRecoveryAnswer, Role defaultRole) {
        this.email = email;
        this.password = password;
        this.firstRecoveryAnswer = firstRecoveryAnswer;
        this.secondRecoveryAnswer = secondRecoveryAnswer;
        roles.add(defaultRole);
    }

    public boolean areRecoveryAnswersCorrect(String firstAnswer,
                                             String secondAnswer) {
        return firstRecoveryAnswer.equals(firstAnswer)
               && secondRecoveryAnswer.equals(secondAnswer);
    }

    public void changePassword(String password) {
        if (password.isEmpty() || password.isBlank()) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                    "Not acceptable newPassword");
        }
        this.password = password;
    }

    protected User() {}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        roles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName())));
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public Optional<ApplicationUser> getApplicationUser() {
        return Optional.ofNullable(applicationUser);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", newPassword='" + password + '\'' +
                ", applicationUser=" + applicationUser +
                '}';
    }
}
