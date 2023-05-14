//package com.pmn.qcmprojet.model;
//
//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.List;
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//public class Categorie {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//
//    private String description;
//    @OneToMany(
//            mappedBy = "categorie",
//            orphanRemoval = true,
//            fetch = FetchType.EAGER
//    )
//
//    private List<QCM> qcms;
//
//}