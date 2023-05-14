package com.pmn.qcmprojet.controller;

import com.pmn.qcmprojet.model.Donnee;
import com.pmn.qcmprojet.model.Question;
import com.pmn.qcmprojet.repository.DonneeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donnee")
@CrossOrigin(origins = "*")
public class DonneeController {

    @Autowired
    DonneeRepository donneeRepository;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Donnee donnee) {

        donneeRepository.save(donnee);

        return new ResponseEntity<>("donnée créé avec succès.", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donnee> getById(@PathVariable("id") Long id) {
        Donnee donnee = donneeRepository.findById(id).get();
        if (donnee != null) {
            return new ResponseEntity<>(donnee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {

        Donnee existingDonnee = donneeRepository.getById(id);
        if (existingDonnee != null) {
            donneeRepository.delete(existingDonnee);
            return new ResponseEntity<>("Donnée supprimé avec succès.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Donnée non trouvé.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Donnee>> getAll() {
        List<Donnee> donnees = donneeRepository.findAll();
        if (!donnees.isEmpty()) {
            return new ResponseEntity<>(donnees, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/stagiaire/{stagiaireId}")
    public ResponseEntity<List<Donnee>> getDonneeByStagiaire_Id(@PathVariable("stagiaireId") Long stagiaireId) {
        List<Donnee> existingListDonnee = donneeRepository.getDonneeByStagiaireId(stagiaireId);
        if (existingListDonnee != null) {
            return new ResponseEntity<>(existingListDonnee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
