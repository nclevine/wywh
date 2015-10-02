'use strict';

var UserForm = React.createClass({
	displayName: 'UserForm',

	render: function render() {
		return React.createElement(
			'form',
			{ className: 'userForm' },
			React.createElement('input', { type: 'text', name: 'name', ref: 'name', placeholder: 'name' }),
			React.createElement('input', { type: 'text', name: 'age', ref: 'age', placeholder: 'age' }),
			React.createElement('input', { type: 'email', name: 'email', ref: 'email', placeholder: 'email' })
		);
	}
});

var FreeResponseForm = React.createClass({
	displayName: 'FreeResponseForm',

	render: function render() {
		return React.createElement(
			'form',
			{ className: 'freeResponseForm' },
			React.createElement('textarea', { name: 'response', ref: 'response' })
		);
	}
});

var ChoiceResponseForm = React.createClass({
	displayName: 'ChoiceResponseForm',

	render: function render() {
		var choiceType = this.props.choiceType;
		var choices = [];
		this.props.choices.forEach(function (choice, i) {
			choices.push(React.createElement(
				'label',
				{ key: i },
				choice,
				React.createElement('input', { type: choiceType, name: 'choice' })
			));
		});
		return React.createElement(
			'form',
			{ className: 'checkResponseForm' },
			choices
		);
	}
});

var LocaleForm = React.createClass({
	displayName: 'LocaleForm',

	render: function render() {
		return React.createElement(
			'form',
			{ className: 'localeForm' },
			React.createElement('input', { type: 'text', name: 'name', ref: 'name', placeholder: 'name' }),
			React.createElement('input', { type: 'text', name: 'location', ref: 'location', placeholder: 'location' }),
			React.createElement('input', { type: 'text', name: 'vibe', ref: 'vibe', placeholder: 'vibe (one word)' }),
			React.createElement('input', { type: 'text', name: 'category', ref: 'category', placeholder: 'category' }),
			React.createElement('input', { type: 'text', name: 'occasion', ref: 'occasion', placeholder: 'occasion' }),
			React.createElement('input', { type: 'text', name: 'bestTime', ref: 'bestTime', placeholder: 'best time to visit' }),
			React.createElement('input', { type: 'text', name: 'price', ref: 'price', placeholder: 'price' }),
			React.createElement('input', { type: 'text', name: 'classiness', ref: 'classiness', placeholder: 'classiness' }),
			React.createElement('input', { textarea: 'text', name: 'similar', ref: 'similar', placeholder: 'similar places' })
		);
	}
});

var NeighborhoodRecommendationForm = React.createClass({
	displayName: 'NeighborhoodRecommendationForm',

	render: function render() {
		var hoods = [];
		return React.createElement(
			'div',
			{ className: 'hoodRecForm' },
			React.createElement(ChoiceResponseForm, { choiceType: 'checkbox', choices: NEIGHBORHOODS }),
			hoods
		);
	}
});

var Question = React.createClass({
	displayName: 'Question',

	render: function render() {
		var className = 'question ' + this.props.placement;
		var responseForm = null;
		if (this.props.type === 'user') {
			responseForm = React.createElement(UserForm, null);
		} else if (this.props.type === 'free') {
			responseForm = React.createElement(FreeResponseForm, null);
		} else if (this.props.type === 'check') {
			responseForm = React.createElement(ChoiceResponseForm, { choiceType: 'checkbox', choices: this.props.choices });
		} else if (this.props.type === 'select') {
			responseForm = React.createElement(ChoiceResponseForm, { choiceType: 'radio', choices: this.props.choices });
		} else if (this.props.type === 'locale') {
			responseForm = React.createElement(LocaleForm, null);
		} else if (this.props.type === 'neighborhood') {
			responseForm = React.createElement(NeighborhoodRecommendationForm, null);
		};
		return React.createElement(
			'div',
			{ className: className, id: this.props.id },
			React.createElement(
				'h3',
				null,
				this.props.body
			),
			responseForm
		);
	}
});

var ProgressButton = React.createClass({
	displayName: 'ProgressButton',

	progress: function progress() {
		this.props.changeQuestion(this.props.direction);
	},
	render: function render() {
		return React.createElement(
			'button',
			{ className: this.props.direction, disabled: this.props.noMoreQuestions, onClick: this.progress },
			this.props.direction
		);
	}
});

var QuestionContainer = React.createClass({
	displayName: 'QuestionContainer',

	changeQuestion: function changeQuestion(direction) {
		var questionNumber = this.props.currentQuestion;
		direction === 'prev' ? questionNumber-- : questionNumber++;
		this.props.changeQuestion(questionNumber);
	},
	render: function render() {
		var currentQuestion = this.props.currentQuestion;
		var placement = '';
		var questions = [];
		this.props.questions.forEach(function (question) {
			placement = question.id === currentQuestion ? 'current' : question.id < currentQuestion ? 'prev' : 'next';
			questions.push(React.createElement(Question, { key: question.id, id: question.id, type: question.type, body: question.body, choices: question.choices ? question.choices : null, placement: placement }));
		});
		var morePrevQuestions = this.props.currentQuestion > 0;
		var moreNextQuestions = this.props.currentQuestion < questions.length - 1;
		return React.createElement(
			'div',
			{ className: 'questionContainer' },
			questions,
			React.createElement(
				'div',
				{ className: 'progressButtons' },
				React.createElement(ProgressButton, { direction: 'prev', changeQuestion: this.changeQuestion, noMoreQuestions: !morePrevQuestions }),
				React.createElement(ProgressButton, { direction: 'next', changeQuestion: this.changeQuestion, noMoreQuestions: !moreNextQuestions })
			)
		);
	}
});

var Survey = React.createClass({
	displayName: 'Survey',

	getInitialState: function getInitialState() {
		return { currentQuestion: 0 };
	},
	updateCurrentQuestion: function updateCurrentQuestion(questionNumber) {
		this.setState({ currentQuestion: questionNumber });
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'survey' },
			React.createElement(
				'h1',
				null,
				'Survey'
			),
			React.createElement(QuestionContainer, { questions: this.props.questions, currentQuestion: this.state.currentQuestion, changeQuestion: this.updateCurrentQuestion })
		);
	}
});

var NEIGHBORHOODS = ['Atwater Village', 'Beverly Hills', 'Brentwood', 'Burbank', 'Century City', 'Chinatown', 'Culver City', 'Downtown', 'Echo Park', 'Glendale', 'Griffith Park', 'Hermosa Beach', 'Hollywood', 'Koreatown', 'Larchmont', 'Little Tokyo', 'Los Feliz', 'Malibu', 'Manhattan Beach', 'Marina Del Rey', 'Melrose/Fairfax', 'Mid Wilshire', 'Miracle Mile', 'North Hollywood', 'Pasadena', 'Santa Monica', 'Silver Lake', 'Sunset', 'Thai Town', 'The Valley', 'Venice', 'West Hollywood', 'Westwood', 'Woodland Hills'];

var SURVEY_QUESTIONS = [{
	id: 0,
	type: 'user',
	body: 'Who are you?'
}, {
	id: 1,
	type: 'free',
	body: 'What are some common obstacles you encounter when trying to go out?'
}, {
	id: 2,
	type: 'free',
	body: 'Where do you search / who do you ask currently to find out new places / what is cool?'
}, {
	id: 3,
	type: 'free',
	body: 'What is/are the most fun place(s) you\'ve gone recently? What did you do there?'
}, {
	id: 4,
	type: 'free',
	body: 'What local organized events (concerts, screenings, exhibits, gatherings) have you attended recently in LA? Any events you attend regularly?'
}, {
	id: 5,
	type: 'check',
	body: 'What are some of your common going-out goals/scenarios?',
	choices: ['fun with friends', 'getting inebriated', 'being seen', 'getting laid', 'dating', 'networking', 'meeting strangers', 'people watching', 'trying something new', 'seeing music', 'viewing art/film', 'attending a special event', 'exploring', 'exercising', 'other']
}, {
	id: 6,
	type: 'select',
	body: 'Are you more likely to initiate or join existing plans?',
	choices: ['initiate', 'join', 'equally likely']
}, {
	id: 7,
	type: 'select',
	body: 'How often do you go out at night?',
	choices: ['only once in a while', 'a few times a month', 'once per week', '2-3 times per week', '4-5 times per week', 'almost every night']
}, {
	id: 8,
	type: 'locale',
	body: 'What is your go-to night spot?'
}, {
	id: 9,
	type: 'neighborhood',
	body: 'What neighborhoods do you prefer for nighttime activities?',
	choices: NEIGHBORHOODS
}, {
	id: 10,
	type: 'select',
	body: 'How often do you attend daytime events?',
	choices: ['only once in a while', 'a few times a month', 'once per week', '2-3 times per week', '4-5 times per week', 'almost every day']
}, {
	id: 11,
	type: 'free',
	body: 'How do you find out about day events?'
}, {
	id: 12,
	type: 'neighborhood',
	body: 'What neighborhoods do you prefer for daytime activities?',
	choices: NEIGHBORHOODS
}, {
	id: 13,
	type: 'select',
	body: 'How often do you go on outdoor excursions?',
	choices: ['only once in a while', 'a few times a month', 'once per week', '2-3 times per week', '4-5 times per week', 'almost every day']
}, {
	id: 14,
	type: 'neighborhood',
	body: 'What neighborhoods do you prefer for outdoor activities?',
	choices: NEIGHBORHOODS
}, {
	id: 15,
	type: 'free',
	body: 'Do you leave LA for outdoor excursions, or stay in the city? Where do you go?'
}, {
	id: 16,
	type: 'free',
	body: 'What do you wish you went out and did more?'
}];

React.render(React.createElement(Survey, { questions: SURVEY_QUESTIONS }), document.body);
