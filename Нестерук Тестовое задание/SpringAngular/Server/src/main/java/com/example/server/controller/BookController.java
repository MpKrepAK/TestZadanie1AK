package com.example.server.controller;

import com.example.server.entity.Author;
import com.example.server.entity.Book;
import com.example.server.repository.AuthorRepository;
import com.example.server.repository.BookRepository;
import com.example.server.repository.OrderRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/books")
//@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;


    @GetMapping
    public ResponseEntity<List<Book>> getAll(){
        return new ResponseEntity<>(bookRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getById(@PathVariable Long id){

        var optionalEntity = bookRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new Book(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();

        return new ResponseEntity<>(entity, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Book> add(@Valid @RequestBody Book book){
        try{
            var added = bookRepository.save(book);
            return new ResponseEntity<>(added, HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(book, HttpStatus.BAD_REQUEST);

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Book> delete(@PathVariable Long id){

        var optionalEntity = bookRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new Book(), HttpStatus.BAD_REQUEST);
        }
        System.out.println(id);
        var entity = optionalEntity.get();
        System.out.println(entity.getName());

        bookRepository.deleteById(id);

        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<Book> update(@Valid @RequestBody Book book){

        try{

            var optional = bookRepository.findById(book.getId());

            if (!optional.isPresent()){
                return new ResponseEntity<>(new Book(), HttpStatus.BAD_REQUEST);
            }
            var entity = optional.get();

            entity.setAuthorId(book.getAuthorId());
            entity.setName(book.getName());
            entity.setInfo(book.getInfo());
            entity.setAvailable(book.isAvailable());
            System.out.println(book.isAvailable());
            bookRepository.save(entity);

            return new ResponseEntity<>(entity, HttpStatus.OK);

        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(book, HttpStatus.BAD_REQUEST);
        }

    }


}
