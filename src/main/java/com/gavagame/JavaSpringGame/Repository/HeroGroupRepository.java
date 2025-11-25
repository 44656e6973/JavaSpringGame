package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.HeroGroup;
import com.gavagame.JavaSpringGame.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeroGroupRepository extends JpaRepository<HeroGroup, Long> {
    List<HeroGroup> findByOwner(User owner);
    List<HeroGroup> findByOwnerId(Long ownerId);
}
