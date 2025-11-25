package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.GameSession;
import com.gavagame.JavaSpringGame.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionParticipantRepository extends JpaRepository<SessionParticipants, Long> {
    List<SessionParticipants> findBySession(GameSession session);
    List<SessionParticipants> findByUser(User user);
    List<SessionParticipants> findByRole(String role);
}
