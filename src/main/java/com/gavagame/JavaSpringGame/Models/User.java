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
    @Column(name = "User_ID")
    private Long id;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameSession> createdSessions = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HeroGroup> ownedGroups = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SessionParticipants> participatedSessions = new ArrayList<>();

    @Column(name = "login", unique = true)
    private String login;
    @Column(name = "password_hash")
    private String password_hash;
    @Column(name = "name")
    private String name;
    @CreatedDate
    @Column(name = "creation_date")
    private LocalDateTime creation_date;


    public User(Long id, String login, String password_hash, String name, LocalDateTime creation_date) {
        this.id = id;
        this.login = login;
        this.password_hash = password_hash;
        this.name = name;
        this.creation_date = creation_date;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean hasActiveHostSession() {
        return createdSessions.stream()
                .anyMatch(session -> "ACTIVE".equals(session.getStatus()));
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(LocalDateTime creation_date) {
        this.creation_date = creation_date;
    }
    public List<GameSession> getCreatedSessions() {
        return createdSessions;
    }

    public void setCreatedSessions(List<GameSession> createdSessions) {
        this.createdSessions = createdSessions;
    }

    public List<HeroGroup> getOwnedGroups() {
        return ownedGroups;
    }

    public void setOwnedGroups(List<HeroGroup> ownedGroups) {
        this.ownedGroups = ownedGroups;
    }

    public List<SessionParticipants> getParticipatedSessions() {
        return participatedSessions;
    }

    public void setParticipatedSessions(List<SessionParticipants> participatedSessions) {
        this.participatedSessions = participatedSessions;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", createdSessions=" + createdSessions +
                ", ownedGroups=" + ownedGroups +
                ", participatedSessions=" + participatedSessions +
                ", login='" + login + '\'' +
                ", password_hash='" + password_hash + '\'' +
                ", name='" + name + '\'' +
                ", creation_date=" + creation_date +
                '}';
    }


}
