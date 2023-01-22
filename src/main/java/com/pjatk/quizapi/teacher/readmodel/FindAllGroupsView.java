package com.pjatk.quizapi.teacher.readmodel;

import java.util.List;

public record FindAllGroupsView(List<Group> groups) {
    public record Group(long id, String groupCode, String groupName) {
    }
}
