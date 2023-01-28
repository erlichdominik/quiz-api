package com.pjatk.quizapi.api;

import com.pjatk.quizapi.security.ApplicationSecurity;
import com.pjatk.quizapi.teacher.application.GroupManagementApplicationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
@RestController
@RequestMapping("/student")
class StudentController {
    private final GroupManagementApplicationService facade;
    private final UserContext userContext;

    StudentController(GroupManagementApplicationService facade, UserContext userContext) {
        this.facade = facade;
        this.userContext = userContext;
    }

    @RolesAllowed({ "STUDENT" })
    @PostMapping("/group")
    void addStudentToGroup(@RequestParam String groupCode) {
        facade.addStudentToGroup(userContext.getUser(), groupCode);
    }
}
