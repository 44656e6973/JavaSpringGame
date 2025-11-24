package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SessionParticipantId that = (SessionParticipantId) o;
        return Objects.equals(sessionId, that.sessionId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sessionId, userId);
    }
}
