package com.pmn.qcmprojet.repository;

import com.pmn.qcmprojet.model.Administrateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministrateurRepository extends JpaRepository<Administrateur ,Long> {
    Optional<Administrateur> findByEmail(String email);


    Boolean existsByEmail(String email);
}
