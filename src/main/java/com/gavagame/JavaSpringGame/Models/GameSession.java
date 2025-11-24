package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "game_session")
@EntityListeners(AuditingEntityListener.class)
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long session_ID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_ID", nullable = false, foreignKey = @ForeignKey(name = "fk_session_creator"))
    private User creator;

    public Long getSession_ID() {
        return session_ID;
    }

    public void setSession_ID(Long session_ID) {
        this.session_ID = session_ID;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List<SessionParticipants> getParticipants() {
        return participants;
    }

    public void setParticipants(List<SessionParticipants> participants) {
        this.participants = participants;
    }

    public LocalDateTime getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(LocalDateTime creation_date) {
        this.creation_date = creation_date;
    }

    public LocalDateTime getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDateTime end_date) {
        this.end_date = end_date;
    }

    public String getServer_IP() {
        return server_IP;
    }

    public void setServer_IP(String server_IP) {
        this.server_IP = server_IP;
    }

    public int getSpectator_limit() {
        return spectator_limit;
    }

    public void setSpectator_limit(int spectator_limit) {
        this.spectator_limit = spectator_limit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SessionParticipants> participants = new ArrayList<>();

    @CreatedDate
    private LocalDateTime creation_date;
    @DateTimeFormat
    private LocalDateTime end_date;
    private String server_IP;
    private int spectator_limit;
    private String status;


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        GameSession that = (GameSession) o;
        return Objects.equals(session_ID, that.session_ID) && Objects.equals(creator, that.creator);
    }

    @Override
    public int hashCode() {
        return Objects.hash(session_ID, creator);
    }
}
