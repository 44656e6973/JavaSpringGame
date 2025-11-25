package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.Hero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeroRepository extends JpaRepository<Hero, Long> {

}
