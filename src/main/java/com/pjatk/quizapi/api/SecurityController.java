package com.pjatk.quizapi.api;

import com.pjatk.quizapi.api.dto.AuthRequest;
import com.pjatk.quizapi.api.dto.AuthResponse;
import com.pjatk.quizapi.api.dto.RefreshTokenResponse;
import com.pjatk.quizapi.security.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Arrays;

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
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request, HttpServletResponse httpServletResponse) {
        try {
            Authentication authentication = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(), request.password())
            );

            User user = (User) authentication.getPrincipal();
            String accessToken = tokenCreator.generateAccessToken(user);
            RefreshToken refreshToken = refreshTokenManager.createRefreshToken(user.getId());

            AuthResponse response = new AuthResponse(user.getEmail(), accessToken, refreshToken.getToken());

            httpServletResponse.addCookie(new Cookie("refreshToken", refreshToken.getToken()));

            return ResponseEntity.ok().body(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Boolean> register(@RequestBody @Valid AuthRequest request) {
        userService.createNewUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/refreshtoken")
    public ResponseEntity<RefreshTokenResponse> refreshToken(HttpServletRequest request) {

        Cookie refreshToken = Arrays.stream(request.getCookies())
                .filter(it -> it.getName().equals("refreshToken"))
                .findAny().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        RefreshTokenResponse refreshTokenResponse = refreshTokenManager.refreshToken(refreshToken.getValue());

        return ResponseEntity.ok(refreshTokenResponse);
    }
}
