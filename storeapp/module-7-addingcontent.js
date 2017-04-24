$(document).ready(function(){

	var content = "<p style='color: red'>You can add me anywhere in the DOM using different jQuery methods!</p>;"
	var content2 = "You can add me anywhere in the DOM using different jQuery methods!";

	// append
	$("#append-example").append(content);

	//prepend

$("#prepend-example").prepend(content);

//chaining 
	$("chain-example-1").css("color", "red")

	//html
	$("#html-example").html(content);

	//text
	$("text-example").text(content2);

});