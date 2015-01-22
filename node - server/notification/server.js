
var http = require('http');

var app = http.createServer(function (request, response) {
    
        response.writeHead(200, {'Content-Type': 'text/plain'}); // responding to the connection request with status code 200 (success)
        response.write("connected"); // giving a response to conected client
        response.end();
    
}).listen(1555); // setting the port to which this application have to listen

var io = require('socket.io').listen(app); // creating a socket server

io.sockets.on('connection', function(socket) {
    socket.on('notification', function(data) { // setting a listener handler for broadcasts with 'notification' from client
    	try{
    		console.log("recieved");
            console.log(data["company"]);
    		io.sockets.emit("notifictaion_"+data["company"],{ Ufrom:data["Ufrom"],msg:data["msg"],type:data["type"]}); // broadcasting the json data with a handler notification_<company_name> ,
                                                                                                                       // so that the client with a brodacast listener 'notification_<company_name>' 
                                                                                                                       // can recieve this message 
    	}
    	catch(e){
    		console.log(e);
    		
    	}
        
        
        
    });
});