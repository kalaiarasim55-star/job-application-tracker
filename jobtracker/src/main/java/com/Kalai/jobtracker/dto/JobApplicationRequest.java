package com.Kalai.jobtracker.dto;
import lombok.Data;
import java.time.LocalDate;

    @Data
    public class JobApplicationRequest {

        private String companyName;
        private String role;
        private LocalDate dateApplied;
        private String status;
        private String jobDescription;
        private String notes;
    }

