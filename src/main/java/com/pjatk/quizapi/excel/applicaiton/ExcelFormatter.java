package com.pjatk.quizapi.excel.applicaiton;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public interface ExcelFormatter {
   byte[] formatToByteArray(XSSFWorkbook workbook);
}
