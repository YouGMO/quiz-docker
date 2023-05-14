package com.pmn.qcmprojet.repository;

import com.pmn.qcmprojet.model.Stagiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface StagiaireRepository extends JpaRepository<Stagiaire,Long> {
    Optional<Stagiaire> findByEmail(String email);

    Boolean existsByEmail(String email);
}
