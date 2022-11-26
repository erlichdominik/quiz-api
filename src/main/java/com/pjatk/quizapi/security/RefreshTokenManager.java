package com.pjatk.quizapi.security;

import com.pjatk.quizapi.api.dto.RefreshTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Component
public class RefreshTokenManager {
    @Value("${app.jwt.refreshTokenExpTime}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtTokenCreator jwtTokenCreator;

    public RefreshTokenManager(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository, JwtTokenCreator jwtTokenCreator) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.jwtTokenCreator = jwtTokenCreator;
    }


    public RefreshToken createRefreshToken(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("user was not found"));

        RefreshToken refreshToken = new RefreshToken(user, UUID.randomUUID().toString(), Instant.now().plusMillis(refreshTokenDurationMs));

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("user was not found"));

        return refreshTokenRepository.deleteByUser(user);
    }

    public RefreshTokenResponse refreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .map(this::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken = jwtTokenCreator.generateAccessToken(user);
                    return new RefreshTokenResponse(accessToken, token);
                })
                .orElseThrow(() -> new TokenRefreshException(token, "token not found"));
    }

}
