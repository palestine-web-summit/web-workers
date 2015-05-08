function init(){ 

	$('.jumbotron').hide();
	$('.marketing').show();

	if (!!window.Worker) { 

		// call the robot 
		var robotWorker = new Worker("scripts/robot.js");
		console.info("Robot worker initialized ...");

		// contact the worker!
		robotWorker.postMessage({call : "chat:start" , args : { name: "Peter"} });

		// handle workers messages to UI
		robotWorker.onmessage = function( e ) {
			if( e.data.call == "chat:log") {
				console.log( e.data.data[0], e.data.data[1]);
				return;
			}

			if(e.data.call == "chat:message") {
				$('[name="command"]').before("<div> > " + e.data.data + " </div>");
				$('#response-area').scrollTop($('#response-area')[0].scrollHeight);
			}

			console.info("UI Thread called by worker with the following data ", e.data);
		}


		$('[name="command"]').keyup(function (e) {
		    if (e.keyCode == 13) { 

		    	if($(this).val().toLowerCase() == "goodbye") {
		    		$(this).before("<div> > Good bye, going to sleep now ZZZZZzzzzz...</div>");
		    		robotWorker.postMessage({ call: "chat:close"});
		    		$(this).remove();
		    	}

		        $(this).before("<div> > looking for: " + $(this).val() + " wait while i am processing your request ...</div>");
		        $('#response-area').scrollTop($('#response-area')[0].scrollHeight);
		        robotWorker.postMessage({call : "chat:message" , args : { query: $(this).val() } });
		        $(this).val("");
		    }
		});

	}
}