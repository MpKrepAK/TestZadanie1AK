package com.example.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 255, min = 2)
    @NotNull
    private String name;

    private boolean available;

    @Size(max = 512, min = 2)
    private String info;

    private Long authorId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "authorId", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Author author;

    @OneToMany(targetEntity = Order.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER, mappedBy = "book")
    private List<Order> orders = new ArrayList<>();


}
