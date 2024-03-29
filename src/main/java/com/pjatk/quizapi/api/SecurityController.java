package com.pjatk.quizapi.api;

import com.pjatk.quizapi.api.dto.*;
import com.pjatk.quizapi.security.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
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
@Slf4j
class SecurityController {
    private final AuthenticationManager manager;
    private final JwtUtils tokenCreator;
    private final RefreshTokenManager refreshTokenManager;
    private final UserService userService;

    SecurityController(AuthenticationManager manager, JwtUtils tokenCreator, RefreshTokenManager refreshTokenManager, UserService userService) {
        this.manager = manager;
        this.tokenCreator = tokenCreator;
        this.refreshTokenManager = refreshTokenManager;
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request, HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) {
        try {
            Authentication authentication = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(), request.password())
            );

            User user = (User) authentication.getPrincipal();
            String accessToken = tokenCreator.generateAccessToken(user);
            RefreshToken refreshToken = refreshTokenManager.createRefreshToken(user.getId());

            AuthResponse response = new AuthResponse(user.getEmail(), accessToken, refreshToken.getToken(),
                    user.getRoles().stream()
                            .map(Role::getName)
                            .toList());

            Cookie cookie = new Cookie("test", "test");
            cookie.setSecure(true);
            cookie.setPath("/");
            httpServletResponse.addCookie(cookie);

            return ResponseEntity.ok().body(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/password/recover")
    void recoverPassword(@RequestBody @Valid RecoverPasswordRequest request) {
        userService.recoverPassword(request);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Boolean> register(@RequestBody @Valid RegisterNewUserRequest request) {
        userService.createNewStudent(request);
        return ResponseEntity.ok().build();
    }

    @SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
    @GetMapping("/auth/logout")
    void logout() {
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();


        refreshTokenManager.deleteByUserId(user.getId());
    }

    @GetMapping("/auth/refreshtoken")
    @SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
    public ResponseEntity<RefreshTokenResponse> refreshToken(HttpServletRequest request) {

        Cookie refreshToken = Arrays.stream(request.getCookies())
                .filter(it -> it.getName().equals("refreshToken"))
                .findAny().orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

        RefreshTokenResponse refreshTokenResponse = refreshTokenManager.refreshToken(refreshToken.getValue());

        return ResponseEntity.ok(refreshTokenResponse);
    }
}
