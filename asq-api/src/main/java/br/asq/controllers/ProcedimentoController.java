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


import br.asq.models.Procedimento;
import br.asq.repositories.ProcedimentoRepository;

@RestController
@RequestMapping("/procedimentos")
@CrossOrigin(origins = "*")
public class ProcedimentoController {
	
	@Autowired
	private ProcedimentoRepository procedimentoRepository;
	
	@PostMapping
	public ResponseEntity<?> adicionarProcedimento(@RequestBody @Validated Procedimento procedimento, UriComponentsBuilder uriComponentsBuilder) {
		this.procedimentoRepository.save(procedimento);
		UriComponents uriComponents = uriComponentsBuilder.path("/procedimentos/{id}").buildAndExpand(procedimento.getId());
		return ResponseEntity.created(uriComponents.toUri()).build();
	}
	
	@GetMapping
	public Iterable<Procedimento> getProcedimentos() {
		return this.procedimentoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Procedimento> getProcedimento(@PathVariable("id") int id) {
		Optional<Procedimento> procedimento = this.procedimentoRepository.findById(id);
		if (procedimento.isPresent()) {
			return ResponseEntity.ok().body(procedimento.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletarProcedimento(@PathVariable("id") int id) {
		this.procedimentoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping
	public ResponseEntity<?> atualizarProcedimento(@RequestBody @Validated Procedimento procedimento, HttpServletResponse response, UriComponentsBuilder uriComponentsBuilder) {
		Optional<Procedimento> procedimentoOptional = this.procedimentoRepository.findById(procedimento.getId());
		this.procedimentoRepository.save(procedimento);
		UriComponents uriComponents = uriComponentsBuilder.path("/procedimentos/{id}").buildAndExpand(procedimento.getId());
		if(procedimentoOptional.isPresent()) {
			response.addHeader("Location", uriComponents.toString());
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.created(uriComponents.toUri()).build();
	}
	
}
