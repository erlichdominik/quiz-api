package com.pjatk.quizapi.security;

import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Optional;

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
    private String passwordRecoveryQuestion;

    @Column(nullable = false)
    private String passwordRecoveryAnswer;

    public User(String email, String password, String passwordRecoveryQuestion, String passwordRecoveryAnswer) {
        this.email = email;
        this.password = password;
        this.passwordRecoveryQuestion = passwordRecoveryQuestion;
        this.passwordRecoveryAnswer = passwordRecoveryAnswer;
    }

    protected User() {}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
                ", password='" + password + '\'' +
                ", applicationUser=" + applicationUser +
                '}';
    }
}
