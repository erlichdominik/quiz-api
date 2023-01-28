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
import java.util.List;

@Component
@Transactional
public class GroupManagementApplicationService {
    private final GroupRepository repository;
    private final UserRepository userRepository;

    public GroupManagementApplicationService(GroupRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public GroupCode addNewGroup(String groupName, User teacher, LocalDate deadline) {
        var group = new AcademicGroup(teacher.getId(), groupName, deadline);

        return new GroupCode(repository.save(group).getCode());
    }

    public void addStudentToGroup(User user, String groupCode) {
        AcademicGroup group = repository.findByCode(groupCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Group with code: %s was not found".formatted(groupCode)));

        if (group.isStudentAlreadyInGroup(user.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                    "You can't join same group again!");
        }

        User student = userRepository.findById(user.getId()).orElseThrow(RuntimeException::new);

        boolean isUserAlreadyInExam = student.getAccountState() == User.AccountState.EXAM;

        if (isUserAlreadyInExam) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                    "You can't join group if you are already in quiz!");
        }

        group.addStudentToGroup(student.getId());

        User fetchedUser = fetchUserBy(student.getId());

        fetchedUser.startExam();

        userRepository.save(fetchedUser);
        repository.save(group);
    }

    public void removeStudentFromGroup(long studentId, long groupId) {
        AcademicGroup group = fetchGroupBy(groupId);

        User student = fetchUserBy(studentId);

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
        AcademicGroup academicGroup = fetchGroupBy(groupId);

        stopExamForAllStudentsIn(academicGroup);

        repository.removeById(groupId);
    }

    public void removeAllStudentFromGroup(long groupId) {
        AcademicGroup academicGroup = fetchGroupBy(groupId);
        stopExamForAllStudentsIn(academicGroup);
        repository.save(academicGroup);
    }

    private AcademicGroup fetchGroupBy(long groupId) {
        return repository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "group with id: %d was not found".formatted(groupId)));
    }

    private void stopExamForAllStudentsIn(AcademicGroup academicGroup) {
        List<User> students = userRepository.findByIdIn(academicGroup.getStudentIds().stream().toList());

        students.forEach(User::stopExam);

        academicGroup.removeAllStudentsFromTheGroup();

        userRepository.saveAll(students);
    }

    private User fetchUserBy(long studentId) {
        return userRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "user not found"));
    }
}
