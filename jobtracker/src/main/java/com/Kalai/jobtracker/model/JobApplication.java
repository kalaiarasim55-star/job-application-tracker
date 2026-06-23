package com.Kalai.jobtracker.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

    @Data
    @Entity
    @Table(name = "job_applications")
    public class JobApplication {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        private String companyName;

        private String role;

        private LocalDate dateApplied;

        private String status;

        private String jobDescription;

        private String notes;
    }

