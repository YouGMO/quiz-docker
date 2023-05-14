package com.pmn.qcmprojet.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity

public class Administrateur extends Personne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "administrateur_id")
    private Long id;

    @OneToMany(
            mappedBy = "administrateur",
            //le mappedBY permet de faire référence à l'atribut la seconde entité ici QCM
            //On eleve @JoinColumn car on a une relation bidirectionnelle seulement un des deus côtés doit faire le lien avec la relation en bdd avec le @JoinColumn
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<QCM> qcms;
    public Administrateur(String lastName,String firstName, String email, String password) {
        super(lastName, firstName, email, password);

    }

}
