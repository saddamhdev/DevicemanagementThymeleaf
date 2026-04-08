/*
package com.device.DeviceManagement.consumer;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "login.insert", groupId = "login")
    public void listen(String message) {
        System.out.println("🔔 Received: " + message);

        // Example error condition: message contains "error" (case-insensitive)
        if (message != null && message.toLowerCase().contains("error")) {
            throw new RuntimeException("Something went wrong because message contains 'error'!");
        }

        // Process message normally if no error condition met
        System.out.println("✅ Message processed successfully!");
    }


}
*/
