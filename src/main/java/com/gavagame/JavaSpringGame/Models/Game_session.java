package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game_session")
public class Game_session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long session_ID;

    @ManyToOne
    @JoinColumn(name = "User_ID", nullable = false, foreignKey = @ForeignKey(name = "fk_session_creator"))
    private User creator;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session_participants> participants = new ArrayList<>();

    @CreatedDate
    private LocalDateTime creation_date;
    @DateTimeFormat
    private LocalDateTime end_date;
    private String server_IP;
    private int spectator_limit;
    private String status;

    


}
