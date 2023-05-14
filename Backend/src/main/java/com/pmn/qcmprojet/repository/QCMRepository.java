package com.pmn.qcmprojet.repository;

import com.pmn.qcmprojet.model.QCM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QCMRepository extends JpaRepository<QCM,Long> {

    QCM findQCMByTitle(String title);

    List<QCM> findQCMByAdministrateur_Id(Long adminstrateurId);

}
