package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

public class Hero_group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long group_ID;

    @JoinColumn(name = "User_ID", nullable = false, foreignKey = @ForeignKey(name = "fk_group_owner"))
    private Long user_ID;

    private LocalDateTime creatrion_date;
    private LocalDateTime end_date;
}
