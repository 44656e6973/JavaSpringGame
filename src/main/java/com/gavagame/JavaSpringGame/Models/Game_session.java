package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "game_session")
public class Game_session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long session_ID;

    private LocalDateTime creation_date;
    private LocalDateTime end_date;
    private String server_IP;
    private int spectator_limit;


}
