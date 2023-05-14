package com.pmn.qcmprojet.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pmn.qcmprojet.model.Administrateur;
import com.pmn.qcmprojet.model.Stagiaire;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Objects;


public class UserDetailsImpl implements UserDetails {
  @Serial
  private static final long serialVersionUID = 1L;

  private final Long id;


  private final String email;

  @JsonIgnore
  private String password;

  private final String lastName;

  private final String firstName;

  private String societe;


  private Collection<? extends GrantedAuthority> authorities;



  public UserDetailsImpl(Long id, String email, String password,String lastName, String firstName) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public UserDetailsImpl(Long id, String email, String password,String lastName, String firstName,String societe) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.societe = societe;
  }


  public static UserDetailsImpl buildAdministrateur(Administrateur administrateur) {

    return new UserDetailsImpl(
            administrateur.getId(),
            administrateur.getEmail(),
            administrateur.getPassword(),
            administrateur.getLastName(),
            administrateur.getFirstName());
  }

  public static UserDetailsImpl buildStagiaire(Stagiaire stagiaire) {

    return new UserDetailsImpl(
            stagiaire.getId(),
            stagiaire.getEmail(),
            stagiaire.getPassword(),
            stagiaire.getLastName(),
            stagiaire.getFirstName(),
            stagiaire.getSociete());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return null;
  }


  public String getSociete() { return societe; }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UserDetailsImpl that = (UserDetailsImpl) o;
    return Objects.equals(id, that.id) && Objects.equals(email, that.email) && Objects.equals(password, that.password) && Objects.equals(lastName, that.lastName) && Objects.equals(firstName, that.firstName) && Objects.equals(societe, that.societe) && Objects.equals(authorities, that.authorities);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, email, password, lastName, firstName, societe, authorities);
  }
}
