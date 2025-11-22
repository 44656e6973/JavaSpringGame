package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;

@Embeddable
public class SessionParticipantId implements Serializable {
    @Column(name = "Session_ID", nullable = false)
    private Long sessionId;

    @Column(name = "User_ID", nullable = false)
    private Long userId;


    public SessionParticipantId(Long sessionId, Long userId) {
        this.sessionId = sessionId;
        this.userId = userId;
    }

    public SessionParticipantId() {

    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
