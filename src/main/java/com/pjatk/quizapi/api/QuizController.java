package com.pjatk.quizapi.api;

import com.pjatk.quizapi.cqrs.command.Gate;
import com.pjatk.quizapi.quiz.application.commands.DeleteCurrentWalkthroughCommand;
import com.pjatk.quizapi.quiz.application.commands.DeleteQuizCommand;
import com.pjatk.quizapi.quiz.application.commands.InitQuizCommand;
import com.pjatk.quizapi.quiz.application.commands.UpdateWalkthroughCommand;
import com.pjatk.quizapi.quiz.domain.quiz.QuizMode;
import com.pjatk.quizapi.quiz.domain.quiz.QuizUploader;
import com.pjatk.quizapi.quiz.readmodel.*;
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
    private final QuizNameFinder quizNameFinder;
    private final QuestionFinder questionFinder;
    private final QuizStateFinder quizStateFinder;
    private final UserHistoryFinder userHistoryFinder;
    private final QuizUploader quizUploader;
    private final Gate gate;

    QuizController(QuizNameFinder quizNameFinder, QuestionFinder questionFinder, QuizStateFinder quizStateFinder, UserHistoryFinder userHistoryFinder, QuizUploader quizUploader, Gate gate) {
        this.quizNameFinder = quizNameFinder;
        this.questionFinder = questionFinder;
        this.quizStateFinder = quizStateFinder;
        this.userHistoryFinder = userHistoryFinder;
        this.quizUploader = quizUploader;
        this.gate = gate;
    }

    @ApiResponse(description = "get all quiz names")
    @GetMapping("/names")
    public ResponseEntity<List<QuizName>> getQuizNames() {
        return ResponseEntity.ok(quizNameFinder.find());
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

    @GetMapping("/init")
    public ResponseEntity<QuestionDataResponse> initQuiz(@RequestParam QuizMode quizMode, @RequestParam  long quizId) {
        var command = new InitQuizCommand(quizMode, quizId);
        Long walkthroughId = (Long) gate.dispatch(command);

        return ResponseEntity.ok(questionFinder.find(new QuestionDataRequest(walkthroughId)));
    }

    @GetMapping("/next")
    ResponseEntity<QuestionDataResponse> goNext(@RequestParam long walkthroughId) {
        return ResponseEntity.ok(questionFinder.find(new QuestionDataRequest(walkthroughId)));
    }

    @PostMapping("/submit")
    ResponseEntity<QuizState> submitAnswer(@RequestParam long walkthroughId, @RequestParam long answerId) {
        var command = new UpdateWalkthroughCommand(walkthroughId, answerId);

        gate.dispatch(command);

        return ResponseEntity.ok(quizStateFinder.find(new QuizStateRequest(walkthroughId)));
    }

    @DeleteMapping("/walkthrough/{id}")
    ResponseEntity<Void> deleteWalkthrough(@PathVariable long id) {
        var command = new DeleteCurrentWalkthroughCommand(id);

        gate.dispatch(command);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/history")
    ResponseEntity<List<UserHistoryDto>> fetchUserHistory() {
        return ResponseEntity.ok(userHistoryFinder.find());
    }

    @DeleteMapping("")
    public ResponseEntity<List<QuizName>> deleteQuizName(@RequestBody DeleteQuizCommand command) {
        gate.dispatch(command);

        return ResponseEntity.ok(quizNameFinder.find());
    }
}
