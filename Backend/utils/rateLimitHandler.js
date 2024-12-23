export const rateLimitHandler = (req, res) => {
  // Get today's date and time
  const now = new Date();

  // Format the date to 'MM/DD/YYYY, HH:MM:SS AM/PM'
  const formattedDate = now.toLocaleString("en-US", {
    hour12: true, // Use 12-hour clock format
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Send HTML response with Tailwind CSS
  return res.status(429).send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Rate Limit Exceeded</title>
          <!-- Tailwind CSS CDN -->
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex items-center justify-center min-h-screen">
          <div class="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full text-center">
            <p class="text-1xl text-slate-600 mb-6">
              Oops! You've made
              <strong class="text-red-600 text-3xl block">Too Many Requests</strong>
              in a short period of time.
            </p>
            <p class="text-lg text-gray-800 mb-4">
              Your last request at :
              <strong class="text-blue-600">${formattedDate}</strong>
            </p>
            <img
              class="mx-auto my-6 rounded-lg"
              src="https://www.redefineyourmarketing.com/wp-content/uploads/404code-800x611-1.png"
              alt="Rate Limit Exceeded"
            />
            <footer>
              <p class="text-sm text-gray-500">
                Please try again in:
                <strong class="text-green-600">1 Minute</strong>
              </p>
              <a
                href="/"
                class="mt-4 inline-block px-6 py-2 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                >Go Back Home</a
              >
            </footer>
          </div>
        </body>
      </html>
  `);
};
