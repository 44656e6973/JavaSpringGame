package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;

import java.util.concurrent.ThreadLocalRandom;

@Entity
@Table(name = "hero")
public class Hero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hero_ID;


    private String name;
    private int hp;
    private int mana;
    private int position;
    private int max_atack;
    private int max_hp;
    private int max_mana;
    private String image;
}
