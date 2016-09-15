function debug(message) {
	var messageDiv;
	console.log(message);
	messageDiv = $('#message');
	messageDiv.text(message);
}

var app = {
	initialize : function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		var parentElement = $('#' + id);
		var listeningElement = parentElement.find('.listening');
		var receivedElement = parentElement.find('.received');

		listeningElement.css('display', 'none');
		receivedElement.css('display', 'block');

		debug('Received Event: ' + id);
	}
};

$(function() {
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	$(document).on("deviceready", function() {
		debug('deviceready event received');
		app.initialize();
	});
});
