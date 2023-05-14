package com.pmn.qcmprojet.repository;

import com.pmn.qcmprojet.model.Question;
import com.pmn.qcmprojet.model.Reponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReponseRepository extends JpaRepository<Reponse,Long> {

    List<Reponse> findReponsesByQuestion_Id(Long questionId);

    Reponse findReponseByReponse(String reponse);


}
