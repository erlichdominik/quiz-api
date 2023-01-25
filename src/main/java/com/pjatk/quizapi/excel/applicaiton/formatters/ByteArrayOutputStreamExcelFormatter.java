package com.pjatk.quizapi.excel.applicaiton.formatters;

import com.pjatk.quizapi.excel.applicaiton.ExcelFormatter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ByteArrayOutputStreamExcelFormatter implements ExcelFormatter {
    @Override
    public byte[] formatToByteArray(XSSFWorkbook workbook) {
        try(var outputStream = new ByteArrayOutputStream()) {
            workbook.write(outputStream);
            workbook.close();

            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new FormatException(e);
        }
    }
}
