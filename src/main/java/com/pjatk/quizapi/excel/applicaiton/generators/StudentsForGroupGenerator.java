package com.pjatk.quizapi.excel.applicaiton.generators;

import com.pjatk.quizapi.excel.applicaiton.ExcelGenerator;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelFinder;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.Group;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;


@Component
class StudentsForGroupGenerator implements ExcelGenerator<StudentsForGroupExcelGeneratorInitParams> {
    private final StudentsForGroupExcelFinder finder;

    StudentsForGroupGenerator(StudentsForGroupExcelFinder finder) {
        this.finder = finder;
    }


    @Override
    public XSSFWorkbook generate(StudentsForGroupExcelGeneratorInitParams initParams) {
        StudentsForGroupExcelView view = finder.findView(initParams.groupId());

        var workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet();

        Group group = view.group();




        return null;

    }
}
