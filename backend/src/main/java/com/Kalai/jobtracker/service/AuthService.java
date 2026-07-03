package com.Kalai.jobtracker.service;
import com.Kalai.jobtracker.dto.AuthResponse;
import com.Kalai.jobtracker.dto.LoginRequest;
import com.Kalai.jobtracker.dto.RegisterRequest;
import com.Kalai.jobtracker.model.User;
import com.Kalai.jobtracker.repository.UserRepository;
import com.Kalai.jobtracker.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

    @Service
    public class AuthService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private AuthenticationManager authManager;

        // Register new user
        public String register(RegisterRequest request) {

            // Check if email already exists
            if (userRepository.existsByEmail(
                    request.getEmail())) {
                return "Email already registered!";
            }

            // Create new user
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(
                    request.getPassword()));
            user.setRole("USER");

            userRepository.save(user);
            return "User registered successfully!";
        }

        // Login user
        public AuthResponse login(LoginRequest request) {

            // Authenticate user
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));

            // Get user from database
            User user = userRepository
                    .findByEmail(request.getEmail())
                    .orElseThrow();

            // Generate JWT token
            String token = jwtService
                    .generateToken(user.getEmail());

            return new AuthResponse(
                    token,
                    user.getName(),
                    user.getEmail());
        }
    }

