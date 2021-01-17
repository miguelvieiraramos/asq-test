package br.asq.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Autorizacao {
	
	@Id	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private Procedimento procedimento;
	@Column(nullable = false)
	private int idade;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Sexo sexo;
	@Column(nullable = false)
	private boolean permitido;
	
	Autorizacao() {}
	
	public Autorizacao(Procedimento procedimento, int idade, Sexo sexo, boolean permitido) {
		this.procedimento = procedimento;
		this.idade = idade;
		this.sexo = sexo;
		this.permitido = permitido;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Procedimento getProcedimento() {
		return procedimento;
	}

	public void setProcedimento(Procedimento procedimento) {
		this.procedimento = procedimento;
	}

	public int getIdade() {
		return idade;
	}

	public void setIdade(int idade) {
		this.idade = idade;
	}

	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public boolean isPermitido() {
		return permitido;
	}

	public void setPermitido(boolean permitido) {
		this.permitido = permitido;
	}
	
}
