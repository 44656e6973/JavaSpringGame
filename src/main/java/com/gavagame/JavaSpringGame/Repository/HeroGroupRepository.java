package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.HeroGroup;
import com.gavagame.JavaSpringGame.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface HeroGroupRepository extends JpaRepository<HeroGroup, Long> {
    List<HeroGroup> findByOwner(User owner);

    List<HeroGroup> findByOwnerId(Long ownerId);

    @Query("SELECT hg FROM HeroGroup hg WHERE hg.owner = :owner AND (hg.end_date IS NULL OR hg.end_date > :currentDate)")
    List<HeroGroup> findActiveGroupsByOwner(@Param("owner") User owner,
                                            @Param("currentDate") LocalDateTime currentDate);
}
