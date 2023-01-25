package com.pjatk.quizapi.teacher.domain.group;

import com.pjatk.quizapi.sharedkernel.ddd.domain.DomainRepository;

import java.util.Optional;

@DomainRepository
public interface GroupRepository {
    <S extends AcademicGroup> S save(S entity);

    Optional<AcademicGroup> findById(long id);

    Optional<AcademicGroup> findByCode(String code);
}
