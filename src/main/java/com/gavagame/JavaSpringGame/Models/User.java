package com.gavagame.JavaSpringGame.Models;


import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameSession> hostedSessions = new ArrayList<>();

    @OneToMany(mappedBy = "guest")
    private List<GameSession> guestSessions = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HeroGroup> heroGroups = new ArrayList<>(); // Было ownedGroups

    @Column(name = "login", nullable = false, unique = true)
    private String login;

    public boolean hasActiveHostSession() {
        return hostedSessions.stream()
                .anyMatch(session -> "ACTIVE".equals(session.getStatus()));
    }
}
