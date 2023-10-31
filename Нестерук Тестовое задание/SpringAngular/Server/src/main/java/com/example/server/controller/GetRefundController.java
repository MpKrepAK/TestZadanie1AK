package com.example.server.controller;

import com.example.server.entity.Book;
import com.example.server.entity.Order;
import com.example.server.repository.BookRepository;
import com.example.server.repository.OrderRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/refund")
public class GetRefundController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/{userId}/{bookId}")
    public ResponseEntity<Book> get(@PathVariable Long userId, @PathVariable Long bookId){
        var userOptional = userRepository.findById(userId);
        var bookOptional = bookRepository.findById(bookId);

        if (!bookOptional.isPresent()){
            return ResponseEntity.badRequest().body(new Book());
        }
        if (!userOptional.isPresent()){
            return ResponseEntity.badRequest().body(new Book());
        }
        var book = bookOptional.get();
        var user = userOptional.get();

        if (!book.isAvailable()){
            return ResponseEntity.badRequest().body(new Book());
        }

        book.setAvailable(false);
        var savedBook = bookRepository.save(book);

        Order order = new Order();

        order.setIssueDate(LocalDateTime.now());
        order.setUserId(userId);
        order.setBookId(bookId);
        order.setRefunded(false);

        orderRepository.save(order);

        return ResponseEntity.ok(savedBook);
    }

    @GetMapping("/{userId}/{bookId}/{orderId}")
    public ResponseEntity<Book> refund(@PathVariable Long userId, @PathVariable Long bookId, @PathVariable Long orderId){
        var userOptional = userRepository.findById(userId);
        var bookOptional = bookRepository.findById(bookId);
        var orderOptional = orderRepository.findById(orderId);

        if (!bookOptional.isPresent()){
            return ResponseEntity.badRequest().body(new Book());
        }

        if (!userOptional.isPresent()){
            return ResponseEntity.badRequest().body(new Book());
        }

        if (!orderOptional.isPresent()){
            return ResponseEntity.badRequest().body(new Book());
        }

        var order = orderOptional.get();
        var book = bookOptional.get();
        var user = userOptional.get();

        if (book.isAvailable()){
            return ResponseEntity.badRequest().body(new Book());
        }


        book.setAvailable(true);
        var savedBook = bookRepository.save(book);


        order.setReturnDate(LocalDateTime.now());
        order.setRefunded(true);

        orderRepository.save(order);

        return ResponseEntity.ok(savedBook);
    }
}
