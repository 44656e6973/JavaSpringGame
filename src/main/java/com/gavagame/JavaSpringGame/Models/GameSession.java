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
public class GameSession {
    public GameSession(Long sessionId, User host, User guest, LocalDateTime creationDate, LocalDateTime endDate, String serverIp, int spectatorLimit, String status) {
        this.sessionId = sessionId;
        this.host = host;
        this.guest = guest;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.serverIp = serverIp;
        this.spectatorLimit = spectatorLimit;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long sessionId;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "host_id", foreignKey = @ForeignKey(name = "fk_session_host"))
    private User host;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id", foreignKey = @ForeignKey(name = "fk_session_guest"))
    private User guest;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private LocalDateTime creationDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "server_ip")
    private String serverIp;

    @Column(name = "spectator_limit")
    private int spectatorLimit = 0;

    @Column(name = "status", nullable = false)
    private String status = "WAITING";

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public User getGuest() {
        return guest;
    }

    public void setGuest(User guest) {
        this.guest = guest;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

    public int getSpectatorLimit() {
        return spectatorLimit;
    }

    public void setSpectatorLimit(int spectatorLimit) {
        this.spectatorLimit = spectatorLimit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public GameSession() {

    }


    public boolean canAddGuest() {
        return "WAITING".equals(status) && guest == null;
    }

    public boolean isHost(User user) {
        return host != null && host.equals(user);
    }

    public boolean isGuest(User user) {
        return guest != null && guest.equals(user);
    }


    @PrePersist
    @PreUpdate
    private void validate() {
        if (host != null && host.equals(guest)) {
            throw new IllegalArgumentException("Host cannot be guest in the same session");
        }
        if (spectatorLimit < 0) {
            throw new IllegalArgumentException("Spectator limit cannot be negative");
        }
        if (endDate != null && endDate.isBefore(creationDate)) {
            throw new IllegalArgumentException("End date must be after creation date");
        }
    }
}
