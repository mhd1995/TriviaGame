$(document).ready(function() {
	
	var question1 = {
		text: "What is your Name?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Arthur, King of the Britons.</div>", 
			"<div class='text-center btn btn-info btn-block'>Sir Galahad of Camelot.</div>", 
			"<div class='text-center btn btn-info btn-block'>Sir Lancelot of Camelot.</div>", 
			"<div class='text-center btn btn-info btn-block'>Sir Robin of Camelot.</div>"],
		correct: false,
	}

	var question2 = {
		text: "What is your Quest?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>To seek the Holy Grail.</div>",
			"<div class='text-center btn btn-info btn-block'>To seek the Holey Grail.</div>",
			"<div class='text-center btn btn-info btn-block'>To seek the Whole Grail.</div>",
			"<div class='text-center btn btn-info btn-block'>To eat cheese and be merry.</div>"],
		correct: false,
	}

	var question3 = {
		text: "What is your favorite color?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Blue</div>",
			"<div class='text-center btn btn-info btn-block'>Red</div>", 
			"<div class='text-center btn btn-info btn-block'>Green</div>", 
			"<div class='text-center btn btn-info btn-block'>Yellow</div>"],
		correct: false,
	}

	var question4 = {
		text: "What is the average air speed velocity of an unladen swallow?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Is that an African or European Swallow?</div>",
			"<div class='text-center btn btn-info btn-block'>46 mph</div>", 
			"<div class='text-center btn btn-info btn-block'>10 mph</div>", 
			"<div class='text-center btn btn-info btn-block'>Lightspeed</div>"],
		correct: false,
	}

	var questionBank = [question1, question2, question3, question4];
	var bankLength = questionBank.length;
	var count = 0;
	var intervalID; 
	var time = 5;


$("#start").click(function() {


	createQuestions(questionBank[count]);
	$("#splashScreen").css('display', 'none');
	$("#questions").css('display', 'inherit');

});



function createQuestions(array) {

	randomizeAnswers();
	intervalID = setInterval(timer, 1000);
	$("#snarf").css('background', '#FFF');
	$("#text").html("<div><h4>" + array.text);

	for (var i = 0; i < array.answer.length; i++) {
		$("#answers").append(array.answer[i]);
	};

	correct();
}


function nextQuestion() {
	createQuestions(questionBank[count]);
}


function correct() {
	$("#answers div").click(function() {

		var questCorrect = $(this).data("correct");

		if (questCorrect === true) {
			$(this).css('background', '#5CB85C');
			questionBank[count].correct = "Right. Off you go. [crosses the Bridge]";
			count++;
			clearInterval(intervalID);
			time = 5;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);

		} else {
			$(this).css('background', '#D9534F');
			questionBank[count].correct = "[is cast into the gorge by an invisible force]";
			count++;
			clearInterval(intervalID);
			time = 5;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);	
		}

	});
}


function checkGameEnd() {
	if (count === questionBank.length) {
	$("#questions").css('display', 'none');	
	createResults();
	$("#gameOver").css('display', 'inherit');

	} else {
		$("#answers").empty();
		nextQuestion();
	}
}


function createResults() {

	for (var i = 0; i < bankLength; i++) {

		$("#results").append("<div>Question #"+[i+1]+': ' + questionBank[i].correct + "</div>");
	}
}


$("#restart").click(function() {

	count = 0;
	$("#results").empty();	

	for (var i = 0; i < bankLength; i++) {
		questionBank[i].correct = false;
	}

	$("#answers").empty();
	$("#gameOver").css('display', 'none');
	$("#splashScreen").css('display', 'inherit');

});


function timer() {
	$("#timer h1").html("00:0"+time);
	$("#timer").css('visibility', 'inherit');

	if (time === 0) {

		$("#snarf").css('background', '#D9534F');
		clearInterval(intervalID);
		time = 5;
		questionBank[count].correct = "[is cast into the gorge by an invisible force]";
		count++;
		setTimeout(function() {
			checkGameEnd();		
		}, 600);
	}
	time--;
};

function randomizeAnswers() {
	for (var i = 0; i < questionBank.length; i++) {
		questionBank[i].answer.sort(function(a, b){return 0.5 - Math.random()});
	}
}

$("#img1").click(function() {

	if ($("#keeperThoughts").css("display") === "block"); {
		$("#keeperThoughts").css("display", "none");
		$("#arthurThoughts").toggle();
	}

});

$("#img2").click(function() {

	if ($("#arthurThoughts").css("display") === "block"); {
		$("#arthurThoughts").css("display", "none");
		$("#keeperThoughts").toggle();
	}
});




});