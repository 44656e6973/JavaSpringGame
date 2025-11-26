package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.Hero;
import com.gavagame.JavaSpringGame.Models.HeroGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeroRepository extends JpaRepository<Hero, Long> {
    List<Hero> findByHeroGroup(HeroGroup heroGroup);

    List<Hero> findByNameIgnoreCase(String name);

    List<Hero> findByPosition(int position);
}
