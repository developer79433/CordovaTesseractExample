function debug(message) {
	var messageDiv;
	console.log(message);
	messageDiv = $('#message');
	messageDiv.text(message);
}

var app = {
		initialize : function() {
			app.receivedEvent('deviceready');
			$('#getImage').on("click", function() {
				debug('button clicked');
				navigator.camera.getPicture(function(imageURL) {
					var text;
					// Camera success callback
					debug('Got picture: ' + imageURL);
					TesseractPlugin.recognizeText(
						imageURL, 'eng',
						function(text) {
							// Tesseract success callback
							debug('Recognised text: ' + text);
						}, function(errorMessage) {
							// Tesseract failure callback
							debug('Tesseract failed: ' + errorMessage);
						}
					);
					navigator.camera.cleanup(function() {}, function() {});
				},
				function(message) {
					// Failure callback
					debug('Failed to get picture: ' + message);
				}, {
					"correctOrientation": true,
					"saveToPhotoAlbum": false,
					"destinationType": navigator.camera.DestinationType.DATA_URL
				});
			});
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
