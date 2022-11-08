package com.pjatk.quizapi.api;

import com.pjatk.quizapi.api.command.DeleteQuizCommand;
import com.pjatk.quizapi.api.dto.QuizName;
import com.pjatk.quizapi.domain.QuizFacade;
import com.pjatk.quizapi.domain.QuizFinder;
import com.pjatk.quizapi.domain.QuizUploader;
import com.pjatk.quizapi.security.ApplicationSecurity;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("quiz")
@Log4j2
@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
class QuizController {
    private final QuizFacade quizFacade;
    private final QuizFinder quizFinder;
    private final QuizUploader quizUploader;

    public QuizController(QuizFacade quizFacade, QuizFinder quizFinder, QuizUploader quizUploader) {
        this.quizFacade = quizFacade;
        this.quizFinder = quizFinder;
        this.quizUploader = quizUploader;
    }

    @ApiResponse(description = "get all quiz names")
    @GetMapping("/names")
    public ResponseEntity<List<QuizName>> getQuizNames() {
        return ResponseEntity.ok(quizFinder.fetchQuizNames());
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadSampleExcel() {
        Resource resource = new FileSystemResource("src/main/resources/QUIZ_UPLOAD_SAMPLE.xlsx");

        MediaType mediaType = MediaTypeFactory
                .getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(mediaType);

        ContentDisposition disposition = ContentDisposition
                .attachment()
                .filename(Objects.requireNonNull(resource.getFilename()))
                .build();

        httpHeaders.setContentDisposition(disposition);
        return new ResponseEntity<>(resource, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<Void> uploadExcelFile(@RequestParam("file")MultipartFile excel) {
        log.info(excel.getOriginalFilename());
        quizUploader.processFile(excel);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("")
    public ResponseEntity<List<QuizName>> deleteQuizName(@RequestBody DeleteQuizCommand command) {
        quizFacade.deleteQuiz(command);

        return ResponseEntity.ok(quizFinder.fetchQuizNames());
    }
}
