package com.pjatk.quizapi.domain;

import com.pjatk.quizapi.api.dto.WrongUploadFormatException;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
public class QuizUploader {
    private final QuizRepository repository;

    public QuizUploader(QuizRepository repository) {
        this.repository = repository;
    }

    public void processFile(MultipartFile file) {
        try (XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream())) {
            XSSFSheet sheet = workbook.getSheetAt(0);

            for (int i = 0; i < sheet.getPhysicalNumberOfRows(); i++) {
                XSSFRow row = sheet.getRow(i);
                for (int j = 0; j < row.getPhysicalNumberOfCells(); j++) {
                    log.info(row.getCell(j) + "");
                }
            }
        } catch (IOException e) {
            throw new WrongUploadFormatException("Could not parse file");
        }
    }
}
