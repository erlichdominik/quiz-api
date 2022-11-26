package com.pjatk.quizapi.api;

import com.pjatk.quizapi.api.dto.AuthRequest;
import com.pjatk.quizapi.api.dto.AuthResponse;
import com.pjatk.quizapi.api.dto.RefreshTokenCommand;
import com.pjatk.quizapi.api.dto.RefreshTokenResponse;
import com.pjatk.quizapi.security.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
class SecurityController {
    private final AuthenticationManager manager;
    private final JwtTokenCreator tokenCreator;
    private final RefreshTokenManager refreshTokenManager;
    private final UserService userService;

    SecurityController(AuthenticationManager manager, JwtTokenCreator tokenCreator, RefreshTokenManager refreshTokenManager, UserService userService) {
        this.manager = manager;
        this.tokenCreator = tokenCreator;
        this.refreshTokenManager = refreshTokenManager;
        this.userService = userService;
    }


    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(), request.password())
            );

            User user = (User) authentication.getPrincipal();
            String accessToken = tokenCreator.generateAccessToken(user);
            RefreshToken refreshToken = refreshTokenManager.createRefreshToken(user.getId());

            AuthResponse response = new AuthResponse(user.getEmail(), accessToken, refreshToken.getToken());

            return ResponseEntity.ok().body(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/auth/register")
    public ResponseEntity<Boolean> register(@RequestBody @Valid AuthRequest request) {
        userService.createNewUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/refreshtoken")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenCommand command) {
        RefreshTokenResponse refreshTokenResponse = refreshTokenManager.refreshToken(command.refreshToken());

        return ResponseEntity.ok(refreshTokenResponse);
    }
}
