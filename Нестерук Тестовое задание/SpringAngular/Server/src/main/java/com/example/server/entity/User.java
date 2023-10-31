package com.example.server.entity;


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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 9, min = 9)
    @NotNull
    @Pattern(regexp = "[A-Z]{2}\\d{7}")
    @Column(unique = true)
    private String pasportNumber;

    @Size(max = 255, min = 2)
    @NotNull
    @Pattern(regexp = "^[A-Za-zА-Я-а-я]+$", message = "Строка должна содержать только русские и английские буквы")
    private String firstName;

    @Size(max = 255, min = 2)
    @NotNull
    @Pattern(regexp = "^[A-Za-zА-Я-а-я]+$", message = "Строка должна содержать только русские и английские буквы")
    private String middleName;

    @Size(max = 255, min = 2)
    @NotNull
    @Pattern(regexp = "^[A-Za-zА-Я-а-я]+$", message = "Строка должна содержать только русские и английские буквы")
    private String lastName;

    @OneToMany(targetEntity = Order.class,cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "bookHolder")
    private List<Order> orders = new ArrayList<>();

}
