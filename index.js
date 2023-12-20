import http from "http";
const PORT = 3000;


const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-Type": "application/json"});
    res.write('Welcome to Kodecamp 30 Days Code Challenge');
    res.end();
});






server.listen(PORT, () => console.log(`server running on port ${PORT}`));