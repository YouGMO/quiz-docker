package com.pmn.qcmprojet.repository;

import com.pmn.qcmprojet.model.QCM;
import com.pmn.qcmprojet.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {

  List<Question> findQuestionsByQcm_Id(Long qcmId);

  Question findQuestionByQuestion(String question);

}
