package com.pjatk.quizapi.api;

import com.pjatk.quizapi.excel.applicaiton.ExcelFormatter;
import com.pjatk.quizapi.excel.applicaiton.ExcelGenerator;
import com.pjatk.quizapi.excel.applicaiton.formatters.ByteArrayOutputStreamExcelFormatter;
import com.pjatk.quizapi.excel.applicaiton.generators.StudentsForGroupExcelGeneratorInitParams;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelFinder;
import com.pjatk.quizapi.security.ApplicationSecurity;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.teacher.application.GroupCode;
import com.pjatk.quizapi.teacher.application.GroupManagementApplicationService;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsFinder;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsView;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroup;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroupFinder;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
@RestController
@RequestMapping("/teacher")
class TeacherController {
    private final FindAllGroupsFinder allGroupsFinder;
    private final StudentsForGroupFinder finder;
    private final GroupManagementApplicationService facade;
    private final StudentsForGroupExcelFinder studentsForGroupExcelFinder;
    private final ExcelGenerator<StudentsForGroupExcelGeneratorInitParams> excelGeneratorInitParamsExcelGenerator;
    private final ExcelFormatter excelFormatter = new ByteArrayOutputStreamExcelFormatter();

    TeacherController(FindAllGroupsFinder allGroupsFinder, StudentsForGroupFinder finder, GroupManagementApplicationService facade, StudentsForGroupExcelFinder studentsForGroupExcelFinder, ExcelGenerator<StudentsForGroupExcelGeneratorInitParams> excelGeneratorInitParamsExcelGenerator) {
        this.allGroupsFinder = allGroupsFinder;
        this.finder = finder;
        this.facade = facade;
        this.studentsForGroupExcelFinder = studentsForGroupExcelFinder;
        this.excelGeneratorInitParamsExcelGenerator = excelGeneratorInitParamsExcelGenerator;
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @DeleteMapping("/group/{groupId}/students")
    void removeAllStudentsFromGroup(@PathVariable long groupId) {
        facade.removeAllStudentFromGroup(groupId);
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @GetMapping("/groups/{groupId}/excel")
    ResponseEntity<byte[]> excelEndpoint(@PathVariable long groupId) {
        byte[] response = excelFormatter.formatToByteArray(excelGeneratorInitParamsExcelGenerator.generate(new StudentsForGroupExcelGeneratorInitParams(groupId, getUser().getId())));

        ResponseEntityFactory factory = new ResponseEntityFactory();

        return factory.ofByteArray(response, "SCORES-%s.xlsx".formatted(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))));
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @GetMapping("/manual")
    ResponseEntity<Resource> manualEndpoint() throws IOException {
        Resource resource = new FileSystemResource("src/main/resources/UserManual.pdf");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + resource.getFilename() + "\"")
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @DeleteMapping("/groups/{groupId}")
    void deleteGroup(@PathVariable long groupId) {
        facade.deleteGroup(groupId);
    }


    @RolesAllowed({"TEACHER", "ADMIN"})
    @GetMapping("/groups")
    FindAllGroupsView findAll() {
        User user = getUser();

        return allGroupsFinder.findAll(user.getId());
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @GetMapping("/groups/{groupId}")
    StudentsForGroup fetchStudentsForGroupView(@PathVariable long groupId) {
        return finder.findAll(groupId);
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @PostMapping("/remove/group/{groupId}/student/{studentId}")
    void removeStudentFromGroup(@PathVariable long groupId,
                                @PathVariable long studentId) {
        facade.removeStudentFromGroup(studentId, groupId);
    }


    @RolesAllowed({"TEACHER", "ADMIN"})
    @PostMapping("/create/group")
    GroupCode createNewGroup(@RequestParam String groupName,
                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate deadline) {
        return facade.addNewGroup(groupName, getUser(), deadline);
    }

    private User getUser() {
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }
}
