package com.pjatk.quizapi.teacher.infrastrcture;

import com.pjatk.quizapi.teacher.domain.group.AcademicGroup;
import com.pjatk.quizapi.teacher.domain.group.GroupRepository;
import org.springframework.data.jpa.repository.JpaRepository;

interface JpaGroupRepository extends JpaRepository<AcademicGroup, Long>, GroupRepository {
}
