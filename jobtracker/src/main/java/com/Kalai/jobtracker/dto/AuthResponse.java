package com.Kalai.jobtracker.dto;
import lombok.Data;

    @Data
    public class AuthResponse {

        private String token;
        private String name;
        private String email;

        public AuthResponse(String token,
                            String name,
                            String email) {
            this.token = token;
            this.name = name;
            this.email = email;
        }
    }

