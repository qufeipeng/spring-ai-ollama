import React, { useState } from 'react';

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return; // 避免空消息
        try {
            const response = await fetch(`/spring-ai-ollama/ai/generateStream?message=${encodeURIComponent(input)}`, { method: 'GET' });
            if (!response.ok) throw new Error('Network response was not ok');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunk = decoder.decode(value, { stream: true });
                setMessages((prevMessages) => prevMessages + chunk);
            }

            // 添加分隔符区分不同轮次的消息
            setMessages((prevMessages) => prevMessages + '\n\n=============================\n\n');
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setInput('');  // 清空输入框
        }
    };

    const handleClearMessages = () => {
        setMessages('');
    };

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange} placeholder="Enter your message" />
            <button onClick={handleSendMessage}>Send</button>

            <button onClick={handleClearMessages}>Clear</button>

            <div>
                <h3>Messages:</h3>

                <pre>{messages}</pre>
            </div>
        </div>
    );
};

export default ChatComponent;