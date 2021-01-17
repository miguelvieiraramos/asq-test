package br.asq.controllers;

import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import br.asq.models.Autorizacao;
import br.asq.repositories.AutorizacaoRepository;

@RestController
@RequestMapping("/autorizacoes")
@CrossOrigin(origins = "*")
public class AutorizacaoController {

	@Autowired
	private AutorizacaoRepository autorizacaoRepository;
	
	@PostMapping
	public ResponseEntity<?> adicionarAutorizacao(@RequestBody @Validated Autorizacao autorizacao, UriComponentsBuilder uriComponentsBuilder) {
		Optional<Autorizacao> autorizacaoOptional = 
				this.autorizacaoRepository.findByProcedimentoAndIdadeAndSexo(autorizacao.getProcedimento(), autorizacao.getIdade(), autorizacao.getSexo());
		if(autorizacaoOptional.isEmpty()) {
			this.autorizacaoRepository.save(autorizacao);
			UriComponents uriComponents = uriComponentsBuilder.path("/autorizacoes/{id}").buildAndExpand(autorizacao.getId());
			return ResponseEntity.created(uriComponents.toUri()).build();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@GetMapping
	public Iterable<Autorizacao> getAutorizacoes() {
		return this.autorizacaoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Autorizacao> getAutorizacao(@PathVariable("id") int id) {
		Optional<Autorizacao> autorizacao = this.autorizacaoRepository.findById(id);
		if (autorizacao.isPresent()) {
			return ResponseEntity.ok().body(autorizacao.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletarAutorizacao(@PathVariable("id") int id) {
		Optional<Autorizacao> autorizacaOptional = this.autorizacaoRepository.findById(id);
		if(autorizacaOptional.isPresent()) {
			this.autorizacaoRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping
	public ResponseEntity<?> atualizarAutorizacao(@RequestBody @Validated Autorizacao autorizacao, HttpServletResponse response, UriComponentsBuilder uriComponentsBuilder) {
		Optional<Autorizacao> autorizacaOptional = this.autorizacaoRepository.findById(autorizacao.getId());
		this.autorizacaoRepository.save(autorizacao);
		UriComponents uriComponents = uriComponentsBuilder.path("/autorizacoes/{id}").buildAndExpand(autorizacao.getId());
		if(autorizacaOptional.isPresent()) {
			response.addHeader("Location", uriComponents.toString());
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.created(uriComponents.toUri()).build();
	}
	
}
