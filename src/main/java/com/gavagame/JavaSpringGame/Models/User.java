package com.gavagame.JavaSpringGame.Models;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;
    private String password_hash;
    private String name;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password_hash='" + password_hash + '\'' +
                ", name='" + name + '\'' +
                ", creation_date=" + creation_date +
                '}';
    }
}
