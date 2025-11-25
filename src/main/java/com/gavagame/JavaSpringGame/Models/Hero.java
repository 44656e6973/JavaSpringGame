package com.gavagame.JavaSpringGame.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "hero")
public class Hero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Hero_ID")
    private Long hero_ID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Group_ID", nullable = false, foreignKey = @ForeignKey(name = "fk_hero_group"))
    private HeroGroup group_ID;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "hp", nullable = false)
    private int hp;
    @Column(name = "mana", nullable = false)
    private int mana;
    @Column(name = "position", nullable = false)
    private int position;
    @Column(name = "max_atack", nullable = false)
    private int max_atack;
    @Column(name = "max_hp", nullable = false)
    private int max_hp;
    @Column(name = "max_mana", nullable = false)
    private int max_mana;
    @Column(name = "image", nullable = true)
    private String image;

    public Hero(Long hero_ID, HeroGroup group_ID, String name, int hp, int mana, int position, int max_atack, int max_hp, int max_mana, String image) {
        this.hero_ID = hero_ID;
        this.group_ID = group_ID;
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.position = position;
        this.max_atack = max_atack;
        this.max_hp = max_hp;
        this.max_mana = max_mana;
        this.image = image;
    }

    public Hero() {

    }

    public Long getHero_ID() {
        return hero_ID;
    }

    public void setHero_ID(Long hero_ID) {
        this.hero_ID = hero_ID;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getMana() {
        return mana;
    }

    public void setMana(int mana) {
        this.mana = mana;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getMax_atack() {
        return max_atack;
    }

    public void setMax_atack(int max_atack) {
        this.max_atack = max_atack;
    }

    public int getMax_hp() {
        return max_hp;
    }

    public void setMax_hp(int max_hp) {
        this.max_hp = max_hp;
    }

    public int getMax_mana() {
        return max_mana;
    }

    public void setMax_mana(int max_mana) {
        this.max_mana = max_mana;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
