# MERN_Auth

## Security Features

### Rate-Limiter

[Rate-limiter](https://www.npmjs.com/package/express-rate-limit) controls the number of requests a user can make to a server within a specific time frame. It helps prevent abuse and ensures fair usage of resources.

### Helmet

[Helmet](https://www.npmjs.com/package/helmet) is a Node.js middleware that helps secure your application by setting various HTTP headers to protect against common web vulnerabilities.

- **X-Powered-By** is an HTTP header that reveals the technology stack used by a web server (e.g., "Express" for Node.js). Helmet can disable this header to enhance security.

### Morgan

[Morgan](https://www.npmjs.com/package/morgan) is a Node.js middleware that logs HTTP request details to the console for monitoring and debugging purposes.
