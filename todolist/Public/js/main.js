/*

General Thoughts for this app build.
1.  The first time building something like this is super tough
	-trust me when I say that in march this will make much better sense
	-I know that is easier said than done.

2.  There is a lot of stuff that we have learned and we are putting together to build
	this app.  So - do your best to walk through it and understand what is occurring.
	In time, more will make sense.

3.  This is a great introduction to design patterns you'll see in week 4 at a bigger
	scale.

4.  This is when app development becomes difficult / frustrating but SOOOOOOO rewarding.
	There are few things in this world than struggling with data from an endpoint and 
	eventually being able to wrangle it into a view(html)

5.  I have annotated this code to provide some clarity and review.  It is not exhuastive
	but I believe it will help.  Some of this will have to be delved into by googling and
	reading other documents.

6.  Encournotesment - go find more open APIs and try to build an app around them.
	a weather app could be cool.....google open weather apis	

7.  CODE BLOCKS - make sure you pay attention to code blocks - these destoryed some of
	your work flow today.

8.  Lastly and please notice this - this main.js I'm sending only handles name / notes
	If you want to add more to it then you have to adjust your html and then the template
	below.

*/

//This section renames the jQuery object to save typing
//It also saves a reference of where the html elements are on the dom
//this helps so we don't have to traverse each time we call one of them.
var $friends = $('#friends');
var $name = $('#name');
var $notes = $('#notes');

//this is the mustache template 
//this is a great teaching moment for the button id={{id}}
//this teaches how to identify the entry and eventually call
//it to delete it
//Remember that id is given to the post that we send to the api
//we can attach that to the button and then use it to delete
//a friend
var friendTemplate = "" + 
	"<li>" +
	"<h2><strong>Task:</strong> {{name}}</h2>" + 
	"<h2><strong>Notes:</strong> {{notes}}</h2>" +
	"<button id='{{id}}' class='remove'>Delete Task</button>" +
	"</li>";

//this is a helper function to take a friend object
//and then grab each property and insert it into the template.
function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
};

$(document).ready(function(){

	//This ajax will run as soon as the document is ready.
	//then loop through and create the DOM element to display it
	//This is how a friend list is created as soon as we open the
	//localhost:3000
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/turnerve/todolist',

		//remember that ajax is asynchronous - if we don't use the promises
		//then the DOM will try to load without any data.
		//the promise says - hey application wait till we have data then 
		//load.
		success: function(friends) {
		// console.log("I have friends!", data); //returns all of johnbob's friends
		//the .each is a better way to iterate.  This is like saying
		//for (friend in friends) {
			//addFriend(friends[friend])
		//}
			$.each(friends, function(i, friend){
				addFriend(friend);	
			});

		},

		error: function(){
			alert('error loading task(s)');
		}	
	});

	//Remember that the anonymous function of the 'click'
	//is where we build our friend object and then make our
	//ajax post on the api.
	//if we did not put the ajax post inside of this it would
	//run automatically and there wouldn't be time to put info
	//inside our html inputs.
	$('#add-friend').on('click', function(){

		var friend = {
			name: $name.val(),
			notes: $notes.val()
		};

		$("#name").val("");
        $("#occupation").val("");
        $("#notes").val("");

		//AJAX POST Function - click the button w/ id add-friend and then pass it to the API
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/turnerve/todolist',
			data: friend,
			//Like the GET request this promise has data in it.
			//when we post data to the api it sends back data to use.
			//try it in post man and at the bottom you'll see 
			//a name / notes / and then an id returned.
			//in our success we add it to the DOM with our helper function.
			success: function(newFriend){
				addFriend(newFriend);	
			},

			error: function(){
				alert('error saving order');
			}
		});

	});

	//.delegate allows you to remove items that were loaded by other students
	//look into the friendTemplate from above the button has the class="remove"
	//in it.
	$friends.delegate('.remove', 'click', function(){

		//this should look a little familiar.  It is saying whatever was clicked with the
		//class of .remove then $li is the closest li to that particular button.
		var $li = $(this).closest('li');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			//$(this).attr('id') is that button's id we set up the template.
			//it is the same thing as copying an id like we did in postman
			//and running the delete request at the API.
			url: 'http://rest.learncode.academy/api/turnerve/todolist/' + $(this).attr('id'),
			success: function(){
				//once that happens we fade out the li and then we remove
				//it from the DOM.
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});
});
