package com.pjatk.quizapi.excel.applicaiton.generators;

import com.pjatk.quizapi.excel.applicaiton.ExcelGenerator;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelFinder;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.Group;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


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

        LocalDate deadline = group.deadline();

        XSSFRow row = sheet.createRow(0);

        XSSFCell cell = row.createCell(0);
        cell.setCellValue("Grupa");

        cell = row.createCell(1);
        cell.setCellValue(group.name());

        row = sheet.createRow(1);

        cell = row.createCell(0);
        cell.setCellValue("Deadline grupy");

        cell = row.createCell(1);
        cell.setCellValue(deadline.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        row = sheet.createRow(3);

        cell = row.createCell(0);
        cell.setCellValue("email");

        cell = row.createCell(1);
        cell.setCellValue("date");

        cell = row.createCell(2);
        cell.setCellValue("date");

        cell = row.createCell(3);
        cell.setCellValue("PASS?");

        int numberOfPathways = 3;

       for (int i = 4; i < numberOfPathways + 4; i++) {
           cell = row.createCell(i);
           cell.setCellValue("Pathway %d".formatted(i - 3));
       }


       return workbook;
    }
}
