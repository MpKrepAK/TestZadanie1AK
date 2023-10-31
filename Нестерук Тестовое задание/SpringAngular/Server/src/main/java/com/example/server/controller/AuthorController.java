package com.example.server.controller;

import com.example.server.entity.Author;
import com.example.server.repository.AuthorRepository;
import com.example.server.service.LoggingService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/authors")
//@CrossOrigin(origins = "*")
public class AuthorController {

//    @Autowired
//    private LoggingService loggingService;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public ResponseEntity<List<Author>> getAll(){
        return new ResponseEntity<>(authorRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getById(@PathVariable Long id){

        var optionalEntity = authorRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new Author(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();
        System.out.println(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Author> add(@Valid @RequestBody Author author){
        try{
            var added = authorRepository.save(author);
            System.out.println(author);
            return new ResponseEntity<>(added, HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(author, HttpStatus.BAD_REQUEST);

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Author> delete(@PathVariable Long id){

        var optionalEntity = authorRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new Author(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();
        authorRepository.deleteById(id);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Author> update(@PathVariable Long id, @Valid @RequestBody Author author){

        try{

            var entity = authorRepository.save(author);
            return new ResponseEntity<>(entity, HttpStatus.OK);

        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(author, HttpStatus.BAD_REQUEST);
        }

    }


}
