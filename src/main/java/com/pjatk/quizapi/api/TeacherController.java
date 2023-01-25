package com.pjatk.quizapi.api;

import com.pjatk.quizapi.security.ApplicationSecurity;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.teacher.application.GroupCode;
import com.pjatk.quizapi.teacher.application.GroupManagementApplicationService;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsFinder;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsView;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroup;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroupFinder;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.time.LocalDate;

@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
@RestController
@RequestMapping("/teacher")
class TeacherController {
    private final FindAllGroupsFinder allGroupsFinder;
    private final StudentsForGroupFinder finder;
    private final GroupManagementApplicationService facade;

    TeacherController(FindAllGroupsFinder allGroupsFinder, StudentsForGroupFinder finder, GroupManagementApplicationService facade) {
        this.allGroupsFinder = allGroupsFinder;
        this.finder = finder;
        this.facade = facade;
    }

    @RolesAllowed({"TEACHER", "ADMIN" })
    @PostMapping("/group/{groupId}/remove/students")
    void removeAllStudentsFromGroup(@PathVariable long groupId) {
        facade.removeAllStudentFromGroup(groupId);
    }

    @RolesAllowed({"TEACHER", "ADMIN"})
    @DeleteMapping("/groups/{groupId}")
    void deleteGroup(@PathVariable long groupId) {
        facade.deleteGroup(groupId);
    }

    @RolesAllowed({ "TEACHER", "ADMIN" })
    @GetMapping("/groups")
    FindAllGroupsView findAll() {
        User user = getUser();

        return allGroupsFinder.findAll(user.getId());
    }

    @RolesAllowed({ "TEACHER", "ADMIN" })
    @GetMapping("/groups/{groupId}")
    StudentsForGroup fetchStudentsForGroupView(@PathVariable long groupId) {
        return finder.findAll(groupId, getUser().getId());
    }

    @RolesAllowed({ "TEACHER", "ADMIN" })
    @PostMapping("/remove/group/{groupId}/student/{studentId}")
    void removeStudentFromGroup(@PathVariable long groupId,
                                @PathVariable long studentId) {
       facade.removeStudentFromGroup(studentId, groupId);
    }


    @RolesAllowed({ "TEACHER", "ADMIN" })
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
