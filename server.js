const http = require("node:http");
const { readFile, writeFile } = require("node:fs/promises");

/********************************* Helpers *********************************/

function createCookie() {
    return "user-" + Math.floor(Math.random() * 1e9);
}

function getContentType(filePath) {
    const arr = filePath.split(".");
    const fileExtention = arr[arr.length - 1];
    return contentTypes[fileExtention] || null;
}

let contentTypes = {
    js: "application/javascript",
    css: "text/css",
    html: "text/html",
    ico: "image/x-icon",
};

let encodings = {
    "application/javascript": "utf8",
    "text/css": "utf8",
    "text/html": "utf8",
};

const routes = [
    "/style.css",
    "/keyboard.js",
    "/exercises.js",
    "/i18n.js",
    "/ui.js",
    "/statistics.js",
    "/canvas.js",
    "/helpers.js",
    "/main.js",
    "/test.js",
    "/favicon.ico",
];

async function sendResponse(url, res) {
    const filePath = "." + url;
    const contentType = getContentType(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    const contents = await readFile(filePath, encodings[contentType]);
    res.end(contents);
}

async function sendTemplate(req, res) {
    const contentType = getContentType("index.html");
    res.writeHead(200, { "Content-Type": contentType });
    const content = await readFile("./index.html", { encoding: "utf8" });
    const userName = authenticatedUsers[req.headers.cookie].name;
    const splitter = '<span class="greeting">';
    const arr = content.split(splitter);
    res.end(arr[0] + splitter + userName + arr[1]);
}

function handleSignUp(req, res) {
    let rawData = "";
    req.on("data", (chunk) => {
        rawData += chunk;
    });
    req.on("end", async () => {
        try {
            const user = JSON.parse(rawData);
            const contents = await readFile("users.json", "utf8");
            const arr = JSON.parse(contents);
            for (const elem of arr) {
                if (elem.email === user.email) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            success: false,
                            msg: "This user already exists",
                        })
                    );
                    return;
                }
            }
            arr.push(user);
            await writeFile("users.json", JSON.stringify(arr, null, 4));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
        } catch (e) {
            sendResponse("/404.html", res);
        }
    });
}

function handleLogIn(req, res) {
    let rawData = "";
    req.on("data", (chunk) => {
        rawData += chunk;
    });
    req.on("end", async () => {
        try {
            const user = JSON.parse(rawData);
            const contents = await readFile("users.json", "utf8");
            const arr = JSON.parse(contents);
            for (const elem of arr) {
                if (
                    elem.email === user.email &&
                    elem.password === user.password
                ) {
                    const cookie = createCookie();
                    authenticatedUsers[cookie] = elem;
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Set-Cookie": cookie,
                    });
                    res.end(
                        JSON.stringify({
                            success: true,
                        })
                    );
                    return;
                }
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: false,
                    msg: "This user does not exist",
                })
            );
        } catch (e) {
            sendResponse("/404.html", res);
        }
    });
}

function updateUserData(req, res) {
    let rawData = "";
    req.on("data", function (chunk) {
        rawData += chunk;
    });
    req.on("end", async function () {
        const userData = JSON.parse(rawData);
        const content = await readFile("users.json", "utf8");
        const users = JSON.parse(content);
        for (let i = 0; i < users.length; i++) {
            console.log(
                users[i].email,
                authenticatedUsers[req.headers.cookie].email
            );

            if (
                users[i].email === authenticatedUsers[req.headers.cookie].email
            ) {
                users[i] = { ...users[i], ...userData };
                authenticatedUsers[req.headers.cookie] = users[i];
                await writeFile("users.json", JSON.stringify(users, null, 4));
                res.writeHead(200, {
                    "Content-Type": "application/json",
                });
                res.end(JSON.stringify({ success: true }));
                return;
            }
        }
    });
}

function handleLogOut(req, res) {
    delete authenticatedUsers[req.headers.cookie];
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(
        JSON.stringify({
            success: true,
        })
    );
}

/********************************* Entry point *********************************/
const authenticatedUsers = {};

function main() {
    try {
        const server = http.createServer(async (req, res) => {
            // console.log(authenticatedUsers);
            // console.log(req.headers.cookie);
            if (authenticatedUsers[req.headers.cookie]) {
                // console.log(req.headers);
                // console.log(req.url);
                if (req.url === "/index.html" || req.url === "/") {
                    sendTemplate(req, res);
                } else if (routes.includes(req.url)) {
                    sendResponse(req.url, res);
                } else if (req.url === "/log-in.html") {
                    sendResponse("/log-in.html", res);
                } else if (req.url === "/sign-up.html") {
                    sendResponse("/sign-up.html", res);
                } else if (req.url === "/log-out") {
                    handleLogOut(req, res);
                } else if (req.url === "/update-data") {
                    updateUserData(req, res);
                } else {
                    sendResponse("/404.html", res);
                }
            } else {
                if (req.url === "/log-in.html") {
                    sendResponse("/log-in.html", res);
                } else if (req.url === "/log-in.js") {
                    sendResponse("/log-in.js", res);
                } else if (req.url === "/log-in") {
                    handleLogIn(req, res);
                } else if (req.url === "/sign-up.html") {
                    sendResponse("/sign-up.html", res);
                } else if (req.url === "/sign-up.js") {
                    sendResponse("/sign-up.js", res);
                } else if (req.url === "/sign-up") {
                    handleSignUp(req, res);
                } else if (req.url === "/favicon.ico") {
                    sendResponse("/favicon.ico", res);
                } else {
                    sendResponse("/log-in.html", res);
                }
            }
        });
        // server.maxHeadersCount = 5;
        // console.log(server.maxHeadersCount);
        server.listen(8000, () => {
            console.log("Server was started at port http://localhost:8000");
        });
    } catch (err) {
        console.error(err.message);
    }
}
main();
