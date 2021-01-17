package br.asq.repositories;

import org.springframework.data.repository.CrudRepository;

import br.asq.models.Procedimento;

public interface ProcedimentoRepository extends CrudRepository<Procedimento, Integer> {
	
}
