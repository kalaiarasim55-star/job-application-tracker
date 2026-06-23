package com.Kalai.jobtracker.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

    @Component
    public class JwtService {

        @Value("${jwt.secret}")
        private String secret;

        @Value("${jwt.expiration}")
        private long expiration;

        // Generate token for user
        public String generateToken(String email) {
            Map<String, Object> claims = new HashMap<>();
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(
                            System.currentTimeMillis()
                                    + expiration))
                    .signWith(getSignKey(),
                            SignatureAlgorithm.HS256)
                    .compact();
        }

        // Get email from token
        public String extractEmail(String token) {
            return extractClaims(token)
                    .getSubject();
        }

        // Check if token is valid
        public boolean isTokenValid(String token,
                                    String email) {
            return extractEmail(token)
                    .equals(email)
                    && !isTokenExpired(token);
        }

        // Check if token expired
        private boolean isTokenExpired(String token) {
            return extractClaims(token)
                    .getExpiration()
                    .before(new Date());
        }

        // Extract all claims from token
        private Claims extractClaims(String token) {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }

        // Get signing key
        private Key getSignKey() {
            byte[] keyBytes =
                    io.jsonwebtoken.io.Decoders
                            .BASE64.decode(secret);
            return Keys.hmacShaKeyFor(keyBytes);
        }
    }

