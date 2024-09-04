package com.teste.teste;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*") // Configure conforme necessário
@RestController
public class ProcessoController {

    private final ProcessoService processoService;

    public ProcessoController(ProcessoService processoService) {
        this.processoService = processoService;
    }
    /*
     * Buscar o numero de projeto na API
     */
    @PostMapping("/processos")
    public Map<String, Object> buscarProcessos(@RequestParam String numeroProcesso) {
        return processoService.buscarProcessosPorNumero(numeroProcesso);
    }
    /*
     * Pega o numero de Processo e retorna informações pro Front
     */
    @GetMapping("/processos")
    public Map<String, Object> exibirProcessos(@RequestParam String numeroProcesso) {
        Map<String, Object> resultado = processoService.buscarProcessosPorNumero(numeroProcesso.replace(".", "").replace("-", ""));
        return resultado;
    }
}


