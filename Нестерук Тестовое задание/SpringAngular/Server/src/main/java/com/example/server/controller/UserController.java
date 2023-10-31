package com.example.server.controller;

import com.example.server.entity.Book;
import com.example.server.entity.User;
import com.example.server.repository.BookRepository;
import com.example.server.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
//@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id){

        var optionalEntity = userRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new User(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();
        System.out.println(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<User> add(@Valid @RequestBody User user){
        try{
            var added = userRepository.save(user);

            return new ResponseEntity<>(added, HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable Long id){

        var optionalEntity = userRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new User(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();
        userRepository.deleteById(id);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @Valid @RequestBody User user){

        try{

            var entity = userRepository.save(user);
            return new ResponseEntity<>(entity, HttpStatus.OK);

        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
        }

    }
}
