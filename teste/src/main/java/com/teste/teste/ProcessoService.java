package com.teste.teste;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class ProcessoService {

    private final DatajudClient datajudClient;

    public ProcessoService(DatajudClient datajudClient) {
        this.datajudClient = datajudClient;
    }

    public Map<String, Object> buscarProcessosPorNumero(String numeroProcesso) {
        Map<String, Object> query = new HashMap<>();
        Map<String, Object> match = new HashMap<>();
        Map<String, Object> matchWrapper = new HashMap<>();

        match.put("numeroProcesso", numeroProcesso);
        matchWrapper.put("match", match);
        query.put("query", matchWrapper);

        return datajudClient.buscarProcessos(query);
    }
}
