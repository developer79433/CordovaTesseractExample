/*
 * Example of using the Tesseract OCR library from within an Apache Cordova application.
 * Copyright (C) 2016 Android Developer
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
