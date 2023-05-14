package com.pmn.qcmprojet.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Donnee {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String dateQCMDebut;

    private int score;

    private long dureeQCM;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stagiaire_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Stagiaire stagiaire;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qcm_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "listDonnees"})
    @JsonIdentityReference(alwaysAsId = true)
    private QCM qcm;
}
