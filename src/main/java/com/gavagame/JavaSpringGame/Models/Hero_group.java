package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "hero_group")
public class Hero_group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long group_ID;

    @ManyToOne
    @JoinColumn(name = "User_ID", nullable = false,
            foreignKey = @ForeignKey(name = "fk_group_owner"))
    private User owner;

    @OneToMany(mappedBy = "group_ID", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hero> heroes = new ArrayList<>();

    private LocalDateTime creation_date;
    private LocalDateTime end_date;

    public Hero_group(Long group_ID, User owner, LocalDateTime creation_date, LocalDateTime end_date) {
        this.group_ID = group_ID;
        this.owner = owner;
        this.creation_date = creation_date;
        this.end_date = end_date;
    }

    public Hero_group() {

    }

    public Long getGroup_ID() {
        return group_ID;
    }

    public void setGroup_ID(Long group_ID) {
        this.group_ID = group_ID;
    }

    public User getUser_ID() {
        return owner;
    }

    public void setUser_ID(User owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatrion_date() {
        return creation_date;
    }

    public void setCreatrion_date(LocalDateTime creation_date) {
        this.creation_date = creation_date;
    }

    public LocalDateTime getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDateTime end_date) {
        this.end_date = end_date;
    }
}
