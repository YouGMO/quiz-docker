package com.pmn.qcmprojet;

import com.pmn.qcmprojet.model.Administrateur;
import com.pmn.qcmprojet.model.QCM;
import com.pmn.qcmprojet.model.Question;
import com.pmn.qcmprojet.model.Reponse;
import com.pmn.qcmprojet.payload.response.MessageResponse;
import com.pmn.qcmprojet.repository.AdministrateurRepository;
import com.pmn.qcmprojet.repository.QCMRepository;
import com.pmn.qcmprojet.repository.QuestionRepository;
import com.pmn.qcmprojet.repository.ReponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class QcmProjetApplication implements CommandLineRunner {

	@Autowired
	QCMRepository qcmRepository ;

	@Autowired
	QuestionRepository questionRepository;

	@Autowired
	ReponseRepository reponseRepository;

	@Autowired
	AdministrateurRepository administrateurRepository;

	@Autowired
	PasswordEncoder encoder;



	public static void main(String[] args) {

		SpringApplication.run(QcmProjetApplication.class, args);

	}


	@Override
	public void run(String... args) throws Exception {


		Administrateur administrateur = new Administrateur();
		administrateur.setLastName("Tata");
		administrateur.setFirstName("Toto");
		administrateur.setEmail("admin@gmail.com");
		administrateur.setPassword(encoder.encode("password"));


		if (!administrateurRepository.existsByEmail(administrateur.getEmail())) {
			administrateurRepository.save(administrateur);


		QCM qcm = new QCM();
		qcm.setTitle("JAVA");
		qcm.setDescription("Test de base");
		qcm.setAdministrateur(administrateur);
		qcmRepository.save(qcm);


		Question question = new Question();
		question.setQuestion("Soit l'appel suivant : public static void main(String[]args) { afficher(1); afficher(1,2);} ");
		question.setQcm(qcm);
		questionRepository.save(question);


		Reponse reponse = new Reponse();
		reponse.setReponse("static void afficher(int... param)");
		reponse.setIsCorrect(1);
		reponse.setQuestion(question);
		reponseRepository.save(reponse);


		Reponse reponse2 = new Reponse();
		reponse2.setReponse("static void afficher(int x, int...param)");
		reponse2.setIsCorrect(1);
		reponse2.setQuestion(question);
		reponseRepository.save(reponse2);



		Reponse reponse3 = new Reponse();
		reponse3.setReponse("static void afficher(int[] param)");
		reponse3.setIsCorrect(0);
		reponse3.setQuestion(question);
		reponseRepository.save(reponse3);

	}

	}
}
