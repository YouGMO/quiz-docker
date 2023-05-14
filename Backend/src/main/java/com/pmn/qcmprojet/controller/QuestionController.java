package com.pmn.qcmprojet.controller;

import com.pmn.qcmprojet.model.Question;
import com.pmn.qcmprojet.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;


    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Question question) {
        Question existingQuestion = questionRepository.findQuestionByQuestion(question.getQuestion());
        if(existingQuestion != null){
            return new ResponseEntity<>("Cette question existe déjà", HttpStatus.OK);

        } else {
            questionRepository.save(question);
            return new ResponseEntity<>("Question créé avec succès.", HttpStatus.OK);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getById(@PathVariable("id") Long id) {
        Question question = questionRepository.findById(id).get();
        if (question != null) {
            return new ResponseEntity<>(question, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/qcm/{qcmId}")
    public ResponseEntity<List<Question>> getQuestionsByQcm_Id(@PathVariable("qcmId") Long qcmId) {
        List<Question> questionList = questionRepository.findQuestionsByQcm_Id(qcmId);
        if (!questionList.isEmpty()) {
            return new ResponseEntity<>(questionList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        Question existingQuestion = questionRepository.findById(id).get();
        if (existingQuestion != null) {
            questionRepository.delete(existingQuestion);
            return new ResponseEntity<>("Question supprimé avec succès.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Question non trouvé.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAll() {
        List<Question> questions = questionRepository.findAll();
        if (!questions.isEmpty()) {
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);

        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setQuestion(updatedQuestion.getQuestion());
            question.setQcm(updatedQuestion.getQcm());
            questionRepository.save(question);

            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
