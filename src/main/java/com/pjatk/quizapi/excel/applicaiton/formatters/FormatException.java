package com.pjatk.quizapi.excel.applicaiton.formatters;

import java.io.IOException;

public class FormatException extends RuntimeException{
    public FormatException(IOException e) {
        super(e);
    }
}
