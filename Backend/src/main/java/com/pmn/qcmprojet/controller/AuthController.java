package com.pmn.qcmprojet.controller;


import com.pmn.qcmprojet.model.Administrateur;
import com.pmn.qcmprojet.model.QCM;
import com.pmn.qcmprojet.model.Stagiaire;
import com.pmn.qcmprojet.payload.request.LoginRequest;
import com.pmn.qcmprojet.payload.request.SignupAdminRequest;
import com.pmn.qcmprojet.payload.request.SignupStagiaireRequest;
import com.pmn.qcmprojet.payload.response.MessageResponse;
import com.pmn.qcmprojet.payload.response.UserInfoResponse;
import com.pmn.qcmprojet.repository.AdministrateurRepository;
import com.pmn.qcmprojet.repository.StagiaireRepository;
import com.pmn.qcmprojet.security.jwt.JwtUtils;
import com.pmn.qcmprojet.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;


  @Autowired
  AdministrateurRepository administrateurRepository;

  @Autowired
  StagiaireRepository stagiaireRepository;


  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);


    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getEmail(),
                                   userDetails.getPassword(),
                                   userDetails.getSociete()));
  }

  @PostMapping("/signup/stagiaire")
  public ResponseEntity<?> registerStagiaire(@Valid @RequestBody SignupStagiaireRequest signupStagiaireRequest) {


    if (stagiaireRepository.existsByEmail(signupStagiaireRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    Stagiaire stagiaire = new Stagiaire(signupStagiaireRequest.getLastName(),
            signupStagiaireRequest.getFirstName(),
            signupStagiaireRequest.getEmail(),
            encoder.encode(signupStagiaireRequest.getPassword()),
            signupStagiaireRequest.getSociete());

    stagiaireRepository.save(stagiaire);

    return ResponseEntity.ok(new MessageResponse("Stagiaire registered successfully!"));
  }

  @PostMapping("/signup/admin")
  public ResponseEntity<?> registerAdministrateur(@Valid @RequestBody SignupAdminRequest signupAdminRequest) {


    if (administrateurRepository.existsByEmail(signupAdminRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    Administrateur administrateur = new Administrateur(signupAdminRequest.getLastName(),
            signupAdminRequest.getFirstName(),
            signupAdminRequest.getEmail(),
            encoder.encode(signupAdminRequest.getPassword()));


    administrateurRepository.save(administrateur);

    return ResponseEntity.ok(new MessageResponse("Administrateur registered successfully!"));
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }

  @GetMapping("stagiaire/all")
  public ResponseEntity<List<Stagiaire>> getAll() {
    List<Stagiaire> stagiaires = stagiaireRepository.findAll();
    if (!stagiaires.isEmpty()) {
      return new ResponseEntity<>(stagiaires, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("stagiaire/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") Long id) {

    Stagiaire existingStagiaire = stagiaireRepository.getById(id);
    if (existingStagiaire != null) {
      stagiaireRepository.delete(existingStagiaire);
      return new ResponseEntity<>("Stagiaire supprimé avec succès.", HttpStatus.OK);
    } else {
      return new ResponseEntity<>("Stagiaire non trouvé.", HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("stagiaire/{id}")
  public ResponseEntity<Stagiaire> updateStagiaire(@PathVariable("id") Long id, @RequestBody Stagiaire updatedStagaire) {
    Optional<Stagiaire> optionalStagiaire = stagiaireRepository.findById(id);

    if (optionalStagiaire.isPresent()) {
      Stagiaire stagiaire = optionalStagiaire.get();
      stagiaire.setLastName(updatedStagaire.getLastName());
      stagiaire.setFirstName(updatedStagaire.getFirstName());
      stagiaire.setEmail(updatedStagaire.getEmail());
      stagiaire.setSociete(updatedStagaire.getSociete());
      stagiaireRepository.save(stagiaire);

      return ResponseEntity.ok(stagiaire);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("stagiaire/password/{id}")
  public ResponseEntity<Stagiaire> updatePassword(@PathVariable("id") Long id, @RequestBody Stagiaire updatedStagaire) {
    Optional<Stagiaire> optionalStagiaire = stagiaireRepository.findById(id);

    if (optionalStagiaire.isPresent()) {
      Stagiaire stagiaire = optionalStagiaire.get();
      stagiaire.setPassword(encoder.encode(updatedStagaire.getPassword()));
      stagiaireRepository.save(stagiaire);

      return ResponseEntity.ok(stagiaire);
    } else {
      return ResponseEntity.notFound().build();
    }
  }


}
