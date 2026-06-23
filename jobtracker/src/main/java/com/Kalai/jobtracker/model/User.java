package com.Kalai.jobtracker.model;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

    @Data
    @Entity
    @Table(name = "users")
    public class  User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @Column(unique = true)
        private String email;

        @JsonIgnore
        private String password;

        private String role;
    }

