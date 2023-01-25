package com.pjatk.quizapi.excel.applicaiton.generators;

import com.pjatk.quizapi.excel.applicaiton.ExcelGenerator;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroup;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroupFinder;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;


@Component
class StudentsForGroupGenerator implements ExcelGenerator<StudentsForGroupExcelGeneratorInitParams> {
    private final StudentsForGroupFinder finder;

    StudentsForGroupGenerator(StudentsForGroupFinder finder) {
        this.finder = finder;
    }

    @Override
    public XSSFWorkbook generate(StudentsForGroupExcelGeneratorInitParams initParams) {
        StudentsForGroup studentsForGroup = finder.findAll(initParams.groupId(), initParams.teacherId());

        return null;

    }
}
