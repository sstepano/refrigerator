package com.hylastix.refrigerator.error;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FieldErrorMessage {
    private String field;
    private String message;

    public FieldErrorMessage(String field, String message) {
        this.field = field;
        this.message = message;
    }
}
