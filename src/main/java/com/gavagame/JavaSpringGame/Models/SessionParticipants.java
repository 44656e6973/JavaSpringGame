package com.gavagame.JavaSpringGame.Models;


import jakarta.persistence.*;

@Entity
@Table(name = "session_participants")
public class SessionParticipants {
    public SessionParticipants(SessionParticipantId id, GameSession session, User user, String role) {
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
    private GameSession session;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "User_ID",
            foreignKey = @ForeignKey(name = "fk_participant_user"),
            nullable = false)
    private User user;

    @Column
    private String role;


    public SessionParticipants() {

    }

    public SessionParticipantId getId() {
        return id;
    }

    public void setId(SessionParticipantId id) {
        this.id = id;
    }

    public GameSession getSession() {
        return session;
    }

    public void setSession(GameSession session) {
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
