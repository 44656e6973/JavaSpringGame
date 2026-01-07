package com.gavagame.JavaSpringGame.Controllers;

import com.gavagame.JavaSpringGame.DTO.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;



    @PostMapping("/auth")
    public ResponseEntity<?> login (@RequestBody LoginRequest request){
        System.out.println("Login attempt: " + request.getUsername());

        if ("admin".equals(request.getUsername()) && "password123".equals(request.getPassword())) {
            return ResponseEntity.ok().body("{\"message\": \"Success\"}");
        } else {
            return ResponseEntity.status(401).body("{\"message\": \"Invalid credentials\"}");
        }

    }
}
