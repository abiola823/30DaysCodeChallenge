//Creating an http server using the node.js built-in module
import http from 'http';



const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-Type": "application/json"});
    res.write('Welcome to Kodecamp 30 Days Code Challenge');
    res.end();
});

//listen to client request 
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
