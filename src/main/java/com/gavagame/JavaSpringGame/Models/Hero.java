package com.gavagame.JavaSpringGame.Models;

import java.util.concurrent.ThreadLocalRandom;

public abstract class Hero {
    String name;
    String image;
    int hp;
    int mana;
    int max_attack;
    int max_defense;
    int max_hp;
    boolean is_alive;

    public Hero(String name, String image, int hp, int mana, int max_attack, int max_defense, int max_hp, boolean is_alive) {
        this.name = name;
        this.image = image;
        this.hp = hp;
        this.mana = mana;
        this.max_attack = max_attack;
        this.max_defense = max_defense;
        this.max_hp = max_hp;
        this.is_alive = is_alive;
    }

    public abstract String getType();

    public abstract void attack(Hero hero, int poz);

    private void get_damage(int damage) {
        if (damage < 0) {
            return;
        } else if ((this.hp - damage) <= 0) {
            System.out.println("Герой " + this.name + " Мертв!");
            this.hp = 0;
            this.is_alive = false;
            return;
        }
        this.hp -= damage;
    }

    private int calc_defense(int damage) {
        if (this.max_defense == 0){
            return damage;
        }
        int damage_after_drop = ThreadLocalRandom.current().nextInt(this.max_defense);
        if (damage_after_drop > damage || damage_after_drop < 0) {
            System.out.println("Броня не пробита!");
            return 0;
        }
        return damage - damage_after_drop;
    }

    public void defense(int damage) {
        int damage_drop = calc_defense(damage);
        get_damage(damage_drop);
        System.out.println("Герой " + this.name + " Атакован!");
    }

    private void get_heal(int heal) {
        if (heal <= 0) {
            return;
        }
        this.hp += heal;
    }

    public void heal(int heal_points) {
        get_heal(heal_points);
    }

}
