export const rateLimitHandler = (_, res) => {
  // HTML template as a string with embedded CSS
  const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Rate Limit Error</title>
            <style>
                body {
                    background: linear-gradient(to bottom right, #2d3748, #1a8f56, #34d399);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    font-family: 'Arial', sans-serif;
                }
                .container {
                    background-color: rgba(31, 41, 55, 0.5);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    max-width: 400px;
                    padding: 32px;
                    text-align: center;
                }
                h2 {
                    font-size: 24px;
                    font-weight: bold;
                    background: linear-gradient(to right, #fbbf24, #f59e0b);
                    color: transparent;
                    background-clip: text;
                    margin-bottom: 24px;
                }
                .icon {
                    width: 64px;
                    height: 64px;
                    background-color: #fbbf24;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                }
                .icon span {
                    color: white;
                    font-size: 32px;
                }
                p {
                    color: #fbbf24;
                    margin-top: 16px;
                }
                .footer {
                    background-color: rgba(17, 24, 39, 0.5);
                    color: #fbbf24;
                    padding: 16px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 0 0 16px 16px;
                }
                .footer a {
                    color: #fbbf24;
                    text-decoration: none;
                }
                .footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Rate Limited</h2>
                <div class="icon">
                    <span>⏳</span>
                </div>
                <p>You've made too many requests in a short period. Please try again 1 minute later.</p>

                <div class="footer">
                    <p>This protects your account and our infrastructure from overuse <a href="#">ℹ️</a></p>
                </div>
            </div>
        </body>
        </html>
    `;

  // Send the HTML response with a 429 status code
  res.status(429).send(htmlResponse);
};
