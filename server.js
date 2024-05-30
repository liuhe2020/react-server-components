import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      const dynamicContent = 'Welcome to my website!';
      const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dynamic HTML Example</title>
                </head>
                <body>
                    <h1>Hello, World!</h1>
                    <p>${dynamicContent}</p>
                </body>
                </html>
            `;

      res.end(htmlContent);
      break;

    case '/api/jokes':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      const jokes = [
        { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything!" },
        { id: 2, joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!' },
        { id: 3, joke: "Why don't programmers like nature? It has too many bugs." },
      ];

      res.end(JSON.stringify(jokes));
      break;

    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
