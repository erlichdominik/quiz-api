package com.pjatk.quizapi.api.dto;

import java.util.List;

public record AuthResponse(String email, String accessToken, String refreshToken, List<String> roles) {
    
}
