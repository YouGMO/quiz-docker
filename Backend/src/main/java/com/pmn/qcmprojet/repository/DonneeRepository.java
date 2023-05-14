package com.pmn.qcmprojet.repository;

import com.pmn.qcmprojet.model.Donnee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonneeRepository extends JpaRepository<Donnee,Long> {

    List<Donnee> getDonneeByStagiaireId(Long stagiaireId);
}
