package com.gavagame.JavaSpringGame.Models;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;

@Embeddable
public class Session_participants implements Serializable {
    @Column(name = "Session_ID")
    private Long session_ID;


}
