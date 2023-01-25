package com.pjatk.quizapi.excel.applicaiton;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public interface ExcelGenerator<T> {
    XSSFWorkbook generate(T initParams);
}
