package com.pjatk.quizapi.teacher.application;

import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.security.UserRepository;
import com.pjatk.quizapi.teacher.domain.group.AcademicGroup;
import com.pjatk.quizapi.teacher.domain.group.GroupRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Component
@Transactional
public class GroupManagementApplicationService {
    private final GroupRepository repository;
    private final UserRepository userRepository;

    public GroupManagementApplicationService(GroupRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository= userRepository;
    }

    public GroupCode addNewGroup(String groupName, User teacher, LocalDate deadline) {
        var group = new AcademicGroup(teacher.getId(), groupName, deadline);

        return new GroupCode(repository.save(group).getCode());
    }

    public void addStudentToGroup(User student, String groupCode) {
        AcademicGroup group = repository.findByCode(groupCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Code: %s was not found".formatted(groupCode)));

        group.addStudentToGroup(student.getId());

        User user = userRepository.findById(student.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "user not found"));

        user.startExam();

        userRepository.save(user);
        repository.save(group);
    }

    public void removeStudentFromGroup(long studentId, long groupId) {
        AcademicGroup group = repository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Group with id: %d was not found".formatted(groupId)));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "user not found"));

        group.removeStudentFromGroup(studentId);
        student.stopExam();

        repository.save(group);
    }

    public GroupCode showCode(long groupId, User teacher) {
        AcademicGroup group = repository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "this group does not exist"));

        if (group.getTeacherId() != teacher.getId()) throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                "this teacher is not assigned to this group");

        return new GroupCode(group.getCode());
    }

    public void deleteGroup(long groupId) {
        repository.removeById(groupId);
    }

    public void removeAllStudentFromGroup(long groupId) {
        AcademicGroup academicGroup = repository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "group with id: %d was not found".formatted(groupId)));

        academicGroup.removeAllStudentsFromTheGroup();

        repository.save(academicGroup);
    }

}
