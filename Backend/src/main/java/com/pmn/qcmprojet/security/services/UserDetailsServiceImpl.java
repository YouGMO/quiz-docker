package com.pmn.qcmprojet.security.services;


import com.pmn.qcmprojet.model.Administrateur;
import com.pmn.qcmprojet.model.Stagiaire;
import com.pmn.qcmprojet.repository.AdministrateurRepository;
import com.pmn.qcmprojet.repository.StagiaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


  @Autowired
  AdministrateurRepository administrateurRepository;

  @Autowired
  StagiaireRepository stagiaireRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
    Optional<Stagiaire> optionalStagiaire = stagiaireRepository.findByEmail(emailOrUsername);
    if (optionalStagiaire.isPresent()) {
      Stagiaire stagiaire = optionalStagiaire.get();
      return UserDetailsImpl.buildStagiaire(stagiaire);
    }

    Optional<Administrateur> optionalAdministrateur = administrateurRepository.findByEmail(emailOrUsername);
    if (optionalAdministrateur.isPresent()) {
      Administrateur administrateur = optionalAdministrateur.get();
      return UserDetailsImpl.buildAdministrateur(administrateur);
    }
    throw new UsernameNotFoundException("User Not Found with username or email: " + emailOrUsername);

  }




}
