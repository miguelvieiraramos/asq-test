package br.asq.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Solicitacao {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	@ManyToOne
	private Procedimento procedimento;
	private int idade;
	@Enumerated(EnumType.STRING)
	private Sexo sexo;
	
	public Solicitacao() {}
	
	public Solicitacao(String nome, Procedimento procedimento, int idade, Sexo sexo) {
		this.nome = nome;
		this.procedimento = procedimento;
		this.idade = idade;
		this.sexo = sexo;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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
	
	public boolean getPermissao() {
		for(Autorizacao autorizacao : procedimento.getAutorizacoes()) {
			if(autorizacao.getIdade() == this.getIdade() && autorizacao.getSexo() == this.getSexo() && autorizacao.isPermitido()) {
				return true;
			}
		}
		return false;
	}
}
