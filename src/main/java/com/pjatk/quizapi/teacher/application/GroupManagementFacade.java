package com.pjatk.quizapi.teacher.application;

import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.teacher.domain.group.AcademicGroup;
import com.pjatk.quizapi.teacher.domain.group.GroupRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class GroupManagementFacade {
    private final GroupRepository repository;

    public GroupManagementFacade(GroupRepository repository) {
        this.repository = repository;
    }

    public GroupCode addNewGroup(String groupName, User teacher) {
        var group = new AcademicGroup(teacher.getId(), groupName);

        return new GroupCode(repository.save(group).getCode());
    }

    public GroupCode showCode(long groupId, User teacher) {
        AcademicGroup group = repository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "this group does not exist"));

        if (group.getTeacherId() != teacher.getId()) throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                "this teacher is not assigned to this group");

        return new GroupCode(group.getCode());
    }

}
