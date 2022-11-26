package com.pjatk.quizapi.security;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.Instant;

@Entity
@Getter
public class RefreshToken extends AbstractEntity {
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String token;
    private Instant expiryDate;

    public RefreshToken(User user, String token, Instant expiryDate) {
        this.user = user;
        this.token = token;
        this.expiryDate = expiryDate;
    }

    protected RefreshToken() {}

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
