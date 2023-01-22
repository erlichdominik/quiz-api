package com.pjatk.quizapi.api;

import com.pjatk.quizapi.security.ApplicationSecurity;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.teacher.application.GroupCode;
import com.pjatk.quizapi.teacher.application.GroupManagementFacade;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsFinder;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsView;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
@RestController("/teacher")
class TeacherController {
    private final FindAllGroupsFinder allGroupsFinder;
    private final GroupManagementFacade facade;

    TeacherController(FindAllGroupsFinder allGroupsFinder, GroupManagementFacade facade) {
        this.allGroupsFinder = allGroupsFinder;
        this.facade = facade;
    }

    @RolesAllowed({ "TEACHER" })
    @GetMapping("/groups")
    FindAllGroupsView findAll() {
        User user = getUser();

        return allGroupsFinder.findAll(user.getId());
    }

    @RolesAllowed({ "TEACHER" })
    @PostMapping("/create/group")
    GroupCode createNewGroup(@RequestParam String groupName) {
        return facade.addNewGroup(groupName, getUser());
    }

    private User getUser() {
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }
}
