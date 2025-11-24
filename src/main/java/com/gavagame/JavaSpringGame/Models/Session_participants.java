package com.gavagame.JavaSpringGame.Models;


import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "session_participants")
public class Session_participants {
    public Session_participants(SessionParticipantId id, Game_session session, User user, String role) {
        this.id = id;
        this.session = session;
        this.user = user;
        this.role = role;
    }

    @EmbeddedId
    private SessionParticipantId id;

    @ManyToOne
    @MapsId("sessionId")
    @JoinColumn(name = "Session_ID",
            foreignKey = @ForeignKey(name = "fk_participant_session"),
            nullable = false)
    private Game_session session;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "User_ID",
            foreignKey = @ForeignKey(name = "fk_participant_user"),
            nullable = false)
    private User user;

    @Column
    private String role;


    public Session_participants() {

    }

    public SessionParticipantId getId() {
        return id;
    }

    public void setId(SessionParticipantId id) {
        this.id = id;
    }

    public Game_session getSession() {
        return session;
    }

    public void setSession(Game_session session) {
        this.session = session;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}
}
