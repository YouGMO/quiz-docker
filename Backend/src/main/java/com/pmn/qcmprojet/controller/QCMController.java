package com.pmn.qcmprojet.controller;

import java.util.List;
import java.util.Optional;

import com.pmn.qcmprojet.model.Question;
import com.pmn.qcmprojet.repository.QCMRepository;
import com.pmn.qcmprojet.repository.QuestionRepository;
import com.pmn.qcmprojet.repository.ReponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pmn.qcmprojet.model.QCM;

@RestController
@RequestMapping("/qcm")
@CrossOrigin(origins = "*")
public class QCMController {

    @Autowired
    private QCMRepository qcmRepository;


    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody QCM qcm) {
        QCM existingQCM = qcmRepository.findQCMByTitle(qcm.getTitle());
        if(existingQCM != null){
            return new ResponseEntity<>("QCM avec ce title existe déjà", HttpStatus.OK);

        } else {
            qcmRepository.save(qcm);
            return new ResponseEntity<>("QCM créé avec succès.", HttpStatus.OK);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<QCM> getById(@PathVariable("id") Long id) {
        QCM qcm = qcmRepository.findById(id).get();
        if (qcm != null) {
            return new ResponseEntity<>(qcm, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/admin/{administrateurId}")
    public ResponseEntity<List<QCM>> getQuestionsByQcm_Id(@PathVariable("administrateurId") Long administrateurId) {
        List<QCM> qcmList = qcmRepository.findQCMByAdministrateur_Id(administrateurId);
        if (!qcmList.isEmpty()) {
            return new ResponseEntity<>(qcmList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {

        QCM existingQCM = qcmRepository.getById(id);
        if (existingQCM != null) {
            qcmRepository.delete(existingQCM);
            return new ResponseEntity<>("QCM supprimé avec succès.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("QCM non trouvé.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<QCM>> getAll() {
        List<QCM> qcms = qcmRepository.findAll();
        if (!qcms.isEmpty()) {
            return new ResponseEntity<>(qcms, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<QCM> updateQCM(@PathVariable("id") Long id, @RequestBody QCM updatedQCM) {
        Optional<QCM> optionalQCM = qcmRepository.findById(id);

        if (optionalQCM.isPresent()) {
            QCM qcm = optionalQCM.get();
            qcm.setTitle(updatedQCM.getTitle());
            qcm.setDescription(updatedQCM.getDescription());
            qcm.setAdministrateur(updatedQCM.getAdministrateur());
            qcmRepository.save(qcm);

            return ResponseEntity.ok(qcm);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
