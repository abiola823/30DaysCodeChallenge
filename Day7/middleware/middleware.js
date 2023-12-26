export default function request(req, res, next) {
    const date = new Date();
    if(req) {
        console.log(`${req.url}\t${req.method}\t${date}`);
    }
    next();
}