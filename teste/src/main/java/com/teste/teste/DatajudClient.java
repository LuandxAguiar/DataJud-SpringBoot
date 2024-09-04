package com.teste.teste;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.MediaType;
import java.util.Map;


@FeignClient(name = "datajudClient", url = "https://api-publica.datajud.cnj.jus.br/api_publica_tjdft/_search", configuration = FeignConfig.class)
public interface DatajudClient {
	
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    Map<String, Object> buscarProcessos(@RequestBody Map<String, Object> query);
    
}
	

