package org.example;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Map;

@RestController
public class ChatController {

    private final ChatClient chatClient;
    @Value("classpath:your-prompt-template.st")
    Resource promptTemplateResource;
    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/ai/generateStream")
    public Flux<String> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        //Prompt prompt = new Prompt(new UserMessage(message));
        //return chatClient.stream(prompt);
        System.out.println("message: " + message);
        PromptTemplate promptTemplate = new PromptTemplate(promptTemplateResource);
        Prompt prompt = promptTemplate.create(Map.of("message", message));
        return chatClient.prompt(prompt).stream().content();
    }
}