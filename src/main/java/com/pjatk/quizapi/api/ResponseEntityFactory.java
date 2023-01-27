package com.pjatk.quizapi.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ResponseEntityFactory {
    public ResponseEntity<byte[]> ofByteArray(byte[] byteArray, String fileName) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+ fileName)
                .body(byteArray);
    }
}
