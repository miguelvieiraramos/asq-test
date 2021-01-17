package br.asq.controllers;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import br.asq.models.Solicitacao;
import br.asq.repositories.SolicitacaoRepository;

@RestController
@RequestMapping("/solicitacoes")
@CrossOrigin(origins = "*")
public class SolicitacaoController {
	
	@Autowired
	private SolicitacaoRepository solicitacaoRepository;
	
	@PostMapping
	public ResponseEntity<?> adicionarSolicitacao(@RequestBody @Validated Solicitacao solicitacao, UriComponentsBuilder uriComponentsBuilder) {
		this.solicitacaoRepository.save(solicitacao);
		UriComponents uriComponents = uriComponentsBuilder.path("/solicitacoes/{id}").buildAndExpand(solicitacao.getId());
		return ResponseEntity.created(uriComponents.toUri()).build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Solicitacao> getSolicitacao(@PathVariable("id") int id) {
		Optional<Solicitacao> solicitacao = this.solicitacaoRepository.findById(id);		
		if (solicitacao.isPresent()) {
			return ResponseEntity.ok().body(solicitacao.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public Iterable<Solicitacao> getSolicitacoes() {
		return this.solicitacaoRepository.findAll();
	}
	}
