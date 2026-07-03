package com.Kalai.jobtracker.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Allow OPTIONS requests through
        if (request.getMethod()
                .equals("OPTIONS")) {
            response.setHeader(
                    "Access-Control-Allow-Origin",
                    "http://localhost:3000");
            response.setHeader(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader(
                    "Access-Control-Allow-Headers",
                    "*");
            response.setHeader(
                    "Access-Control-Allow-Credentials",
                    "true");
            response.setStatus(200);
            return;
        }

        String authHeader = request
                .getHeader("Authorization");
        String token = null;
        String email = null;

        try {
            System.out.println("=== JWT FILTER ===");
            System.out.println("URL: "
                    + request.getRequestURI());
            System.out.println("Method: "
                    + request.getMethod());
            System.out.println("Auth: "
                    + authHeader);

            if (authHeader != null
                    && authHeader
                    .startsWith("Bearer ")) {
                token = authHeader.substring(7);
                email = jwtService
                        .extractEmail(token);
            }

            if (email != null
                    && SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);

                if (jwtService.isTokenValid(
                        token,
                        userDetails.getUsername())) {

                    UsernamePasswordAuthenticationToken
                            authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails
                                            .getAuthorities());

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);

                    System.out.println(
                            "Auth set successfully!");
                }
            }

        } catch (ExpiredJwtException e) {
            System.out.println("Expired: "
                    + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error: "
                    + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}