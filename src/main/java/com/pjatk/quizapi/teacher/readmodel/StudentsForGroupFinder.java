package com.pjatk.quizapi.teacher.readmodel;

import java.util.List;

public interface StudentsForGroupFinder {
    List<StudentsForGroup> findAll(long groupId, long teacherId);
}
