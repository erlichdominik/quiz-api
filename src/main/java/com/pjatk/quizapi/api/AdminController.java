package com.pjatk.quizapi.api;

import com.pjatk.quizapi.admin.application.AdminFacade;
import com.pjatk.quizapi.admin.readmodel.AllGroupsByTeacher;
import com.pjatk.quizapi.admin.readmodel.AllGroupsByTeacherFinder;
import com.pjatk.quizapi.admin.readmodel.AllUsers;
import com.pjatk.quizapi.admin.readmodel.AllUsersFinder;
import com.pjatk.quizapi.api.dto.RegisterNewUserRequest;
import com.pjatk.quizapi.security.ApplicationSecurity;
import com.pjatk.quizapi.security.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

@SecurityRequirement(name = ApplicationSecurity.SECURITY_CONFIG_NAME)
@RestController
@RequestMapping("/admin")
class AdminController {
    private final UserService userService;
    private final AllUsersFinder allUsersFinder;
    private final AllGroupsByTeacherFinder allGroupsByTeacherFinder;
    private final AdminFacade adminFacade;

    AdminController(UserService userService, AllUsersFinder allUsersFinder, AllGroupsByTeacherFinder allGroupsByTeacherFinder, AdminFacade adminFacade) {
        this.userService = userService;
        this.allUsersFinder = allUsersFinder;
        this.allGroupsByTeacherFinder = allGroupsByTeacherFinder;
        this.adminFacade = adminFacade;
    }

    @RolesAllowed({"ADMIN"})
    @PostMapping("/create/teacher")
    void registerTeacher(@RequestBody @Valid RegisterNewUserRequest request) {
        userService.createNewTeacher(request);
    }

    @RolesAllowed({"ADMIN"})
    @GetMapping("/users")
    AllUsers fetchAllUsers() {
        return allUsersFinder.findAllUsers();
    }

    @RolesAllowed({"ADMIN"})
    @PostMapping("/delete/all")
    void deleteAll() {
        adminFacade.deleteAll();
    }

    @RolesAllowed({"ADMIN"})
    @GetMapping("/groupsbyteacher")
    AllGroupsByTeacher fetchAllGroupsOrderedByTeacher() {
        return allGroupsByTeacherFinder.findAll();
    }

    @RolesAllowed({"ADMIN"})
    @DeleteMapping("/{userId}")
    void deleteUser(@PathVariable long userId) {
        userService.deleteUser(userId);
    }
}
