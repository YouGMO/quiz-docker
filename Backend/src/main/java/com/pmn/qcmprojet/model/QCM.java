package com.pmn.qcmprojet.model;

import java.util.List;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class QCM {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotBlank
	private String title;

    @NotBlank
    private String description;

    @OneToMany(
            mappedBy = "qcm",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<Question> listQuestions;

    @OneToMany(
            mappedBy = "qcm",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "qcm"}) //Pour éviter les erreur de sérialisation Json,nn ignorant ces propriétés, l'objet peut être sérialisé correctement sans provoquer d'erreurs.
    private List<Donnee> listDonnees;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "administrateur_id",nullable = false)
    @JsonBackReference
    private Administrateur administrateur;

//    @ManyToOne
//    @JoinColumn(name = "categorie_id",nullable = false)
//    private Categorie categorie;

}
