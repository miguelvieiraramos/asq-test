package br.asq.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Procedimento {
	
	@Id
	private int id;
	@Column(unique = true, nullable = false)
	private String nome;
	@OneToMany(mappedBy = "procedimento", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Autorizacao> autorizacoes;
	
	Procedimento () {}

	public Procedimento(int id, String nome) {
		this.id = id;
		this.nome = nome;
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
	
	public List<Autorizacao> getAutorizacoes() {
		return autorizacoes;
	}
	
}
