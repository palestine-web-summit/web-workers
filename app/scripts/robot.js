// Robot Worker (Peter!);
function log(message, data) {
	postMessage({ call : "chat:log" , data : [message, data] });
}

function respondToUserQuestion( message ) { 
	postMessage({ call :"chat:message" , data : message });
}

self.onmessage = function(event) { 
	if( event.data.call == "chat:start") {
		log("Chat have been started by UI ", event.data );
		respondToUserQuestion("Hey! this is " + event.data.args.name + ", give me a topic and I'll send you a google link for that very quickly!" );
		return;
	}

	if( event.data.call == "chat:message") {
		log("Worker have recieved a new message ...", event.data); 		  
		respondToUserQuestion(' Click <a target="_blank" href="https://www.google.ps/?q=' + encodeURIComponent(event.data.args.query)  + '"> here for results page about "' +event.data.args.query+ '" </a>')
		respondToUserQuestion(' What else you wanna know?'); 
		return;
	}

	if( event.data.called == "chat:close") {
		self.close();
	}

	log("Unsupported operation have been called ", event.data);
}



