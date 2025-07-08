package com.device.DeviceManagement.controller.openAIService;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class QdrantService {

    private final RestTemplate restTemplate;
    private final String flaskAddUrl = "http://localhost:5000/add";  // You can make this configurable via properties

    public QdrantService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Send website text data and collection name to Qdrant via Flask API.
     *
     * @param text       The website text content to add
     * @param collection The Qdrant collection name
     * @return Response body from Flask API
     */
    public Map<String, Object> addData(String text, String collection) {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", text);
        requestBody.put("collection", collection);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                flaskAddUrl,
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        return response.getBody();
    }
}
