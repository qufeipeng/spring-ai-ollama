# Spring AI集成Ollama

## Chat Model

ChatModel API 让应用开发者可以非常方便的与 AI 模型进行文本交互，它抽象了应用与模型交互的过程，包括使用 `Prompt` 作为输入，使用 `ChatResponse` 作为输出等。ChatModel 的工作原理是接收 Prompt 或部分对话作为输入，将输入发送给后端大模型，模型根据其训练数据和对自然语言的理解生成对话响应，应用程序可以将响应呈现给用户或用于进一步处理。

![chat-model](https://img.alicdn.com/imgextra/i2/O1CN01wyTDFO1kR2BJOn3fe_!!6000000004679-0-tps-2555-1565.jpg)

## Native LLM部署

本项目采用Ollama部署本地大模型，大模型采用开源的通义千问大模型，具体为qwen2.5:7b

### Ollama安装

https://ollama.com/download/OllamaSetup.exe

### Ollama环境变量设置

```bash
变量名：OLLAMA_MODELS
变量值：D:\ollama_models
```

### 启动qwen2模型

```bash
ollama run qwen2.5:7b
```

## Spring AI工程构建

### 工程结构

```bash
spring-ai-allama/
|-- pom.xml            Maven项目的核心配置文件
+-- frontend/          存放前端源文件
    +-- public/        存放前端公共文件
    |   +-- index.html 首页html文件
    +-- src/           存放前端react源代码
    |   +-- components/  存放前端react组件源代码
    |       +-- ChatComponent.js             Chat聊天组件
    |   +-- App.js               负责渲染根组件
    |   +-- index.js             首页源文件
    |-- package.json             前端打包配置文件
+-- src/
    +-- main/
        +-- java/      存放项目的.java源代码
        |   +-- org/
        |       +-- example/
        |           +-- ChatController.java             Chat聊天控制器类
        |           +-- SpringAiOllamaApplication.java  web应用启动类
        +-- resources/  存放项目资源文件，如配置文件
        |   +-- META-INF/
        |   +-- properties/
        |       +-- templates/  存放前端打包后脚本
        |   +-- application.properties  工程配置文件 
    +-- test/
        +-- java/       存放测试代码
        |   +-- org/
        |       +-- example/
        |           +-- SpringAiOllamaApplicationTests.java
```

### 前端构建（非必须）

#### 安装依赖

```bash
cd frontend
npm install
```

#### 打包

```bash
npm run build
```

### 后端构建

#### 确认开发环境

- 确保你的JDK版本在JDK17（含）以上。

#### 配置接入（默认无需修改）

```yml
application.propertios:
spring.application.name=spring-ai-ollama
server.port=8080
server.servlet.context-path=/spring-ai-ollama
spring.web.resources.static-locations=classpath:/templates/
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.embedding.model=qwen2.5:7b
spring.ai.ollama.chat.model=qwen2.5:7b 
```

#### 打包

```bash
./mvn clean package
```

#### 运行

```bash
# IDE运行
启动org.example.SpringAiOllamaApplication
# 独立运行
java -jar ./target/spring-ai-ollama-0.0.1-SNAPSHOT.jar
```

### 访问地址

http://localhost:8080/spring-ai-ollama
