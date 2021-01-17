package br.asq.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.asq.models.Autorizacao;
import br.asq.models.Procedimento;
import br.asq.models.Sexo;

public interface AutorizacaoRepository extends CrudRepository<Autorizacao, Integer> {
	Optional<Autorizacao> findByProcedimentoAndIdadeAndSexo(Procedimento procedimento, int idade, Sexo sexo);
}
