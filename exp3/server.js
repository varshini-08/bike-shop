const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // ======= Login Page =======
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const loginHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card {
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }
                .form-link {
                    margin-top: 15px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="card col-md-4">
                <h2 class="text-center mb-4">Login</h2>
                <form action="/login" method="POST">
                    <div class="mb-3">
                        <label>Email:</label>
                        <input type="email" name="email" class="form-control" required placeholder="you@example.com"/>
                    </div>
                    <div class="mb-3">
                        <label>Password:</label>
                        <input type="password" name="password" class="form-control" required placeholder="********"/>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
                <div class="form-link">
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
            </div>
        </body>
        </html>`;
        res.end(loginHTML);
    }

    // ======= Handle Login POST =======
    else if (url === '/login' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const email = params.get('email');
            const password = params.get('password');

            if (email === 'var@gmail.com' && password === '12345') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<h2 style="text-align:center;margin-top:50px;">Welcome back, ${email}!</h2>`);
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.end(`<h2 style="text-align:center;color:red;margin-top:50px;">Invalid credentials</h2>`);
            }
        });
    }

    // ======= Sign-Up Page =======
    else if (url === '/signup' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const signupHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Sign Up</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card {
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }
                .form-link {
                    margin-top: 15px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="card col-md-4">
                <h2 class="text-center mb-4">Sign Up</h2>
                <form action="/signup" method="POST">
                    <div class="mb-3">
                        <label>Email:</label>
                        <input type="email" name="email" class="form-control" required placeholder="you@example.com"/>
                    </div>
                    <div class="mb-3">
                        <label>Password:</label>
                        <input type="password" name="password" class="form-control" required placeholder="Create a password"/>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Sign Up</button>
                </form>
                <div class="form-link">
                    <p>Already have an account? <a href="/">Login</a></p>
                </div>
            </div>
        </body>
        </html>`;
        res.end(signupHTML);
    }

    // ======= Handle Sign-Up POST =======
    else if (url === '/signup' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const email = params.get('email');
            const password = params.get('password');

            // Simulate saving user (real apps store in DB)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h2 style="text-align:center;margin-top:50px;">Thanks for signing up, ${email}!</h2><p style="text-align:center;"><a href="/">Go to Login</a></p>`);
        });
    }

    // ======= 404 Not Found =======
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
