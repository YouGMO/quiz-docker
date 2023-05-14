package com.pmn.qcmprojet.model;


import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @NotBlank
	private String question;
    @OneToMany(
            mappedBy = "question",
            cascade = CascadeType.ALL, // Quand une Question sera supprimée, toutes les réponses associées seront supprimées
            orphanRemoval = true, // Pour ne pas trouver de réponse dans la bdd avec l'id d'une question qui n'existe plus
            fetch = FetchType.EAGER) // Quand on récupére une question, toutes les réponses associées seront récupérees
    @JsonManagedReference
    private List<Reponse> listReponses;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qcm_id") //On défini le nom de la clé étrangère
    @JsonBackReference
    private QCM qcm;

}
