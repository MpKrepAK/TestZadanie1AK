package com.example.server.service;

import com.example.server.controller.AuthorController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class LoggingService {

    private Logger logger = LoggerFactory.getLogger(Object.class);

    public void logError(Exception exception){
        String message = Arrays.stream(exception.getStackTrace())
                .map(StackTraceElement::toString)
                .collect(Collectors.joining(System.lineSeparator()));
        logger.error(message);
    }
}
