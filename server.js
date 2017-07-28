var app = require("./app"),
    port = process.env.PORT||1111,
    url = process.env.IP||"localhost";

app.listen(port, function(err){
    console.log("Starting up NodeJS Website service...");
    if (err) {
        console.error(err);
    } else {
        console.log("Service started successfully.");
        console.log("Serving at: http://" + url + ":" + port);
    }
});