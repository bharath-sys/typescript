// product 
class HttpRequest {
    public readonly url: string;
    public readonly method: string;
    public readonly headers: Record<string, string>;
    public readonly body?: unknown;
    public readonly timeout?: number;

    constructor(builder: any) {
        this.url = builder.getUrl();
        this.method = builder.getMethod();
        this.headers = builder.getHeaders();
        this.timeout = builder.getTimeout();
        this.body = builder.getBody();
    }
}

// builder (interface)

interface HttpRequestBuilder {
    // setters for product 
    setMethod(method: string): this;
    setHeader(key: string, value: string): this;
    setBody(body: unknown): this;
    setTimeout(timeout: number): this;

    build(): HttpRequest;

    // getters for Product
    getUrl(): string;
    getMethod(): string;
    getHeaders(): Record<string, string>;
    getBody(): unknown;
    getTimeout(): number | undefined;
}

// concrete builder (implements builder interface)

class RestHttpRequestBuilder implements HttpRequestBuilder {
    private method: string = "GET";
    private headers?: Record<string, string> = {};
    private body?: unknown;
    private timeout?: number = 1500;

    constructor(private readonly url: string) {
        if (!url) {
            throw new Error("URL is required");
        }
    }

    public setMethod(method: string): this {
        this.method = method;
        return this;
    }
    public setHeader(key: string, value: string): this {
        this.headers[key] = value;
        return this;
    }
    public setBody(body: unknown): this {
        this.body = body;
        return this;
    }
    public setTimeout(timeout: number): this {
        if (timeout <= 0) {
            throw new Error("Timeout must be positive");
        }
        this.timeout = timeout;
        return this;
    }

    public build(): HttpRequest {
        if (this.method !== "GET" && !this.body) {
            throw new Error("Non-GET requests must have a body");
        }

        return new HttpRequest(this);
    }
    public getUrl(): string {
        return this.url;
    }

    public getMethod(): string {
        return this.method;
    }

    public getHeaders(): Record<string, string> {
        return { ...this.headers };
    }

    public getBody(): unknown {
        return this.body;
    }

    public getTimeout(): number | undefined {
        return this.timeout;
    }
}


// director 

class HttpRequestDirector {
    public buildJsonPost(
        builder: HttpRequestBuilder,
        body: unknown
    ): HttpRequest {
        return builder
            .setMethod("POST")
            .setHeader("Content-Type", "application/json")
            .setBody(body)
            .build();
    }
}

// director (takes concrete builder and returns product)

const director = new HttpRequestDirector();
const builder = new RestHttpRequestBuilder(
    "https://api.example.com/users"
);

const request = director.buildJsonPost(builder, {
    name: "Bharath",
});

console.log(request, "request")