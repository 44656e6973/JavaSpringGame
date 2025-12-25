package com.gavagame.JavaSpringGame.Service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;

@Service
public class SecurityService {
    private PrivateKey privateKey;
    private PublicKey publicKey;

    @PostConstruct
    public void init() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);

        privateKey = keyPairGenerator.generateKeyPair().getPrivate();
        publicKey = keyPairGenerator.generateKeyPair().getPublic();
    }

}
