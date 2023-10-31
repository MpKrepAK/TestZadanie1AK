package com.example.server.controller;

import com.example.server.entity.Order;
import com.example.server.entity.User;
import com.example.server.repository.OrderRepository;
import com.example.server.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
//@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<List<Order>> getAll(){
        return new ResponseEntity<>(orderRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id){

        var optionalEntity = orderRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new Order(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();
        System.out.println(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Order> add(@Valid @RequestBody Order order){
        try{
            var added = orderRepository.save(order);

            return new ResponseEntity<>(added, HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(order, HttpStatus.BAD_REQUEST);

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Order> delete(@PathVariable Long id){

        var optionalEntity = orderRepository.findById(id);

        if (!optionalEntity.isPresent()){
            return new ResponseEntity<>(new Order(), HttpStatus.BAD_REQUEST);
        }

        var entity = optionalEntity.get();
        orderRepository.deleteById(id);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable Long id, @Valid @RequestBody Order order){

        try{

            var entity = orderRepository.save(order);
            return new ResponseEntity<>(entity, HttpStatus.OK);

        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(order, HttpStatus.BAD_REQUEST);
        }

    }
}
