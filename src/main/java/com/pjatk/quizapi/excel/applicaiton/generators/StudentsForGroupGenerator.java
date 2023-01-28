package com.pjatk.quizapi.excel.applicaiton.generators;

import com.pjatk.quizapi.excel.applicaiton.ExcelGenerator;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelFinder;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.Group;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.Statistic;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.Student;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.UserHistory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.IntStream;


@Component
class StudentsForGroupGenerator implements ExcelGenerator<StudentsForGroupExcelGeneratorInitParams> {
    private final StudentsForGroupExcelFinder finder;

    StudentsForGroupGenerator(StudentsForGroupExcelFinder finder) {
        this.finder = finder;
    }


    @Override
    public XSSFWorkbook generate(StudentsForGroupExcelGeneratorInitParams initParams) {
        StudentsForGroupExcelView view = finder.findView(initParams.groupId());
        DecimalFormat decimalFormat = new DecimalFormat("# ###.##");

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
        cell.setCellValue("PASS?");

        int numberOfPathways = 3;

        for (int i = 3; i < numberOfPathways + 3; i++) {
            cell = row.createCell(i);
            cell.setCellValue("Pathway %d".formatted(i - 2));
        }

        int startingRowNumber = 4;

        List<Student> students = view.group().students();

        for (int i = 0; i < students.size(); i++) {
            Student student = students.get(i);

            List<UserHistory> historiesPerUser = student.history();

            row = sheet.createRow(startingRowNumber);

            cell = row.createCell(0);
            cell.setCellValue(student.username());

            int firstHistoryDataIndex = startingRowNumber;

            for(int j = 0; j < historiesPerUser.size(); j++) {
                row = sheet.getRow(firstHistoryDataIndex) == null ? sheet.createRow(firstHistoryDataIndex) : sheet.getRow(firstHistoryDataIndex);
                UserHistory userHistory = historiesPerUser.get(j);
                cell = row.createCell(1);
                cell.setCellValue(userHistory.date().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

                cell = row.createCell(2);
                cell.setCellValue(true);

                List<Statistic> statistics = userHistory.statistics();

                int statisticCounter = 3;

                for(int z = 0; z < statistics.size(); z++) {
                    Statistic statistic = statistics.get(z);
                    cell = row.createCell(statisticCounter);
                    cell.setCellValue(decimalFormat.format(statistic.completedPercentage()));

                    statisticCounter++;
                }

                firstHistoryDataIndex++;

            }

            startingRowNumber = startingRowNumber + historiesPerUser.size() + 1;
        }

        IntStream.range(0, 5).forEach(sheet::autoSizeColumn);

        return workbook;
    }
}
