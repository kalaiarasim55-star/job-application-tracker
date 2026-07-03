package com.Kalai.jobtracker.controller;
import com.Kalai.jobtracker.dto.AuthResponse;
import com.Kalai.jobtracker.dto.LoginRequest;
import com.Kalai.jobtracker.dto.RegisterRequest;
import com.Kalai.jobtracker.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {

        @Autowired
        private AuthService authService;

        // Register
        @PostMapping("/register")
        public String register(
                @RequestBody RegisterRequest request) {
            return authService.register(request);
        }

        // Login
        @PostMapping("/login")
        public AuthResponse login(
                @RequestBody LoginRequest request) {
            return authService.login(request);
        }
    }

