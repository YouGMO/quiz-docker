package com.pmn.qcmprojet.controller;

import com.pmn.qcmprojet.model.Question;
import com.pmn.qcmprojet.model.Reponse;
import com.pmn.qcmprojet.repository.ReponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reponse")
@CrossOrigin(origins = "*")
public class ReponseController {

    @Autowired
    private ReponseRepository reponseRepository;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Reponse reponse) {

            reponseRepository.save(reponse);
            return ResponseEntity.ok().body("{\"message\": \"Réponse créée avec succès!\"}");


    }

    @GetMapping("/{id}")
    public ResponseEntity<Reponse> getById(@PathVariable("id") Long id) {
        Reponse reponse = reponseRepository.findById(id).get();
        if (reponse != null) {
            return new ResponseEntity<>(reponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        Reponse existingReponse = reponseRepository.getById(id);
        if (existingReponse != null) {
            reponseRepository.delete(existingReponse);
            return ResponseEntity.ok().body("{\"message\": \"Réponse supprimée avec succès!\"}");
        } else {
            return new ResponseEntity<>("Reponse non trouvé.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reponse>> getAll() {
        List<Reponse> reponses = reponseRepository.findAll();
        if (!reponses.isEmpty()) {
            return new ResponseEntity<>(reponses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reponse> updateReponse(@PathVariable("id") Long id, @RequestBody Reponse updatedReponse) {
        Optional<Reponse> optionalReponse = reponseRepository.findById(id);
        if (optionalReponse.isPresent()) {

            Reponse reponse = optionalReponse.get();
            reponse.setIsCorrect(updatedReponse.getIsCorrect());
            reponse.setReponse(updatedReponse.getReponse());
            reponse.setQuestion(updatedReponse.getQuestion());
            reponseRepository.save(reponse);

            return ResponseEntity.ok(reponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Reponse>> getReponsessByQuestion_Id(@PathVariable("questionId") Long questionId) {
        List<Reponse> reponseList = reponseRepository.findReponsesByQuestion_Id(questionId);
        if (!reponseList.isEmpty()) {
            return new ResponseEntity<>(reponseList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
