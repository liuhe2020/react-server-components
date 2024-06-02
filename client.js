import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      const serverFunc = async () => {
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <script src="https://cdn.tailwindcss.com"></script>
              <title>Client Example</title>
            </head>
            <body class="w-full h-screen flex flex-col justify-center items-center">
              <pre></pre>
              <button id="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch</button>
              <script>
                const button = document.querySelector('#button');
                button.addEventListener('click', async () => {
                  console.log('hello from client');
                  const response = await fetch('http://localhost:3000/api/joke');
                  const joke = await response.json();
                  document.querySelector('pre').innerText = JSON.stringify(joke, null, 2);
                });
              </script>
            </body>
          </html>
        `;

        res.end(htmlContent);
      };

      serverFunc();
      break;

    case '/api/joke':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      const callAPI = async () => {
        const response = await fetch('https://www.daddysgotjokes.com/joke');
        const jokes = await response.json();
        res.end(JSON.stringify(jokes));
      };

      callAPI();
      break;

    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at [http://$]http://${hostname}:${port}/`);
});
