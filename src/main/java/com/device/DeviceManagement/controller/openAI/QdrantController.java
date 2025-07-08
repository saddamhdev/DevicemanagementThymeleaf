package com.device.DeviceManagement.controller.openAI;

import com.device.DeviceManagement.controller.openAIService.QdrantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/qdrant")
public class QdrantController {

    private final QdrantService qdrantService;

    @Autowired
    public QdrantController(QdrantService qdrantService) {
        this.qdrantService = qdrantService;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addTextToQdrant(
            @RequestParam String text,
            @RequestParam String collection
    ) {
        Map<String, Object> response = qdrantService.addData(text, collection);
        return ResponseEntity.ok(response);
    }
}
