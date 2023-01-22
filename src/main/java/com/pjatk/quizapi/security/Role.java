package com.pjatk.quizapi.security;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.Entity;

@Entity
public class Role extends AbstractEntity {
    private String name;

    public Role(String name) {
        this.name = name;
    }

    protected Role() {}

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name;
    }
}
