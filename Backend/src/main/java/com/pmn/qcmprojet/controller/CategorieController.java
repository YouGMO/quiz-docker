//package com.pmn.qcmprojet.controller;
//
//import com.pmn.qcmprojet.model.Categorie;
//import com.pmn.qcmprojet.model.QCM;
//import com.pmn.qcmprojet.repository.CategorieRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/categorie")
//@CrossOrigin(origins = "2")
//public class CategorieController {
//    @Autowired
//    private CategorieRepository categorieRepository;
//
//    @PostMapping("/create")
//    public ResponseEntity<String> create(@RequestBody Categorie categorie) {
//
//        categorieRepository.save(categorie);
//
//        return new ResponseEntity<>(" Catégorie créée avec succès! ", HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Categorie> getById(@PathVariable("id") Long id) {
//        Categorie categorie = categorieRepository.findById(id).get();
//        if (categorie != null) {
//            return new ResponseEntity<>(categorie, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
//
//        Categorie existingCategorie = categorieRepository.getById(id);
//        if (existingCategorie != null) {
//            categorieRepository.delete(existingCategorie);
//            return new ResponseEntity<>(" Catégorie supprimée avec succès! ", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(" Catégorie non trouvée ! ", HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Categorie>> getAll() {
//        List<Categorie> categories = categorieRepository.findAll();
//        if (!categories.isEmpty()) {
//            return new ResponseEntity<>(categories, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Categorie> updateCategorie(@PathVariable("id") Long id, @RequestBody Categorie updatedCategorie) {
//        Optional<Categorie> optionalCategorie = categorieRepository.findById(id);
//
//        if (optionalCategorie.isPresent()) {
//            Categorie categorie = optionalCategorie.get();
//            categorie.setTitle(updatedCategorie.getTitle());
//            categorie.setDescription(updatedCategorie.getDescription());
//            categorieRepository.save(categorie);
//
//            return ResponseEntity.ok(categorie);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}