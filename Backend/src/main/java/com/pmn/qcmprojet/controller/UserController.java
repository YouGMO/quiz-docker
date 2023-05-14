package com.pmn.qcmprojet.controller;

import com.pmn.qcmprojet.model.Administrateur;
import com.pmn.qcmprojet.model.Stagiaire;
import com.pmn.qcmprojet.repository.AdministrateurRepository;
import com.pmn.qcmprojet.repository.StagiaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

        @Autowired
        private AdministrateurRepository administrateurRepository;

    @Autowired
    private StagiaireRepository stagiaireRepository;


    @GetMapping("/admin/{id}")
    public ResponseEntity<Administrateur> getAdminById(@PathVariable("id") Long id) {
            Administrateur administrateur = administrateurRepository.findById(id).get();
            if (administrateur != null) {
                return new ResponseEntity<>(administrateur, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

    @GetMapping("/stagiaire/{id}")
    public ResponseEntity<Stagiaire> getStagiaireById(@PathVariable("id") Long id) {
        Stagiaire stagiaire = stagiaireRepository.findById(id).get();
        if (stagiaire != null) {
            return new ResponseEntity<>(stagiaire, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
