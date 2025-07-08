package com.device.DeviceManagement.controller.openAI;

import com.device.DeviceManagement.exception.ResourceNotFoundException;
import com.device.DeviceManagement.exception.RootFoundException;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt, @RequestParam String collection) {
        // 1. Call Flask to get relevant context from Qdrant
        RestTemplate restTemplate = new RestTemplate();
        String flaskUrl = "http://localhost:5000/search";
        Map<String, String> request = new HashMap<>();
        request.put("query", prompt);
        request.put("collection", collection);  // pass collection name here

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.exchange(flaskUrl, HttpMethod.POST, entity, Map.class);
        List<String> contextList = (List<String>) response.getBody().get("results");

        String context = String.join("\n", contextList);

        // 2. Construct RAG prompt
        String ragPrompt = "Answer based on context:\n" + context + "\n\nUser Question: " + prompt;

        // 3. Call OpenAI
        return chatClient.prompt(ragPrompt).call().content();
    }

    @PostMapping("/message")
    public ResponseEntity<Map<String, String>> handleMessage(@RequestBody Map<String, String> payload) throws Exception {

        String prompt = payload.get("message");
        String collection = payload.get("collectionName");

        // 1. Call Flask service
        RestTemplate restTemplate = new RestTemplate();
        String flaskUrl = "http://localhost:5000/search";
        Map<String, String> request = new HashMap<>();
        request.put("query", prompt);
        request.put("collection", collection);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.exchange(flaskUrl, HttpMethod.POST, entity, Map.class);
        List<String> contextList = (List<String>) response.getBody().get("results");

        String context = String.join("\n", contextList);

        // 2. Construct RAG prompt
        String ragPrompt = "Answer based on context:\n" + context + "\n\nUser Question: " + prompt;
        String reply = chatClient.prompt(ragPrompt).call().content();

        // 3. Return as JSON
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("reply", reply);

       // return ResponseEntity.ok(responseBody);
       // throw new IllegalArgumentException("This is a test exception");
       // {status: 400, message: 'This is a test exception', timestamp: '2025-07-01T19:48:28.378055800'}
       // throw new Exception("Check");
        //{status: 500, message: 'Check', timestamp: '2025-07-01T20:02:19.966918400'}
        //throw new ResourceNotFoundException("Resource Not Found");
        // {status: 404, message: 'Resource Not Found', timestamp: '2025-07-01T20:06:37.498408500'}

        // custom class
        //throw new RootFoundException("Bro product found") ;
        //{status: 302, message: 'Bro product found', timestamp: '2025-07-01T20:16:41.050344'}
         return ResponseEntity.ok(responseBody);
    }


}
