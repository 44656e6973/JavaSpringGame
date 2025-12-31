//package com.gavagame.JavaSpringGame.Controllers;
//
//import com.gavagame.JavaSpringGame.DTO.LoginRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//
//
//    @PostMapping("/")
//    public ResponseEntity<?> login (@RequestBody LoginRequest request){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getUsername(),
//                        request.getPassword()
//                )
//        );
//        if (authentication.isAuthenticated()) {
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
//                    .body(new AuthResponse(token, "Успешный вход"));
//        }
//    }
//}
