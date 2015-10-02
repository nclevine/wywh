var UserForm = React.createClass({
	render: function() {
		return (
			<form className='userForm'>
				<input type='text' name='name' ref='name' placeholder='name' />
				<input type='text' name='age' ref='age' placeholder='age' />
				<input type='email' name='email' ref='email' placeholder='email' />
			</form>
		);
	}
});

var FreeResponseForm = React.createClass({
	render: function() {
		return (
			<form className='freeResponseForm'>
				<textarea name='response' ref='response' />
			</form>
		);
	}
});

var ChoiceResponseForm = React.createClass({
	render: function() {
		var choiceType = this.props.choiceType;
		var choices = [];
		this.props.choices.forEach(function(choice, i){
			choices.push(<label key={i}>{choice}<input type={choiceType} name='choice' /></label>);
		});
		return (
			<form className='checkResponseForm'>
				{choices}
			</form>
		);
	}
});

var LocaleForm = React.createClass({
	render: function() {
		return (
			<form className='localeForm'>
				<input type='text' name='name' ref='name' placeholder='name' />
				<input type='text' name='location' ref='location' placeholder='location' />
				<input type='text' name='vibe' ref='vibe' placeholder='vibe (one word)' />
				<input type='text' name='category' ref='category' placeholder='category' />
				<input type='text' name='occasion' ref='occasion' placeholder='occasion' />
				<input type='text' name='bestTime' ref='bestTime' placeholder='best time to visit' />
				<input type='text' name='price' ref='price' placeholder='price' />
				<input type='text' name='classiness' ref='classiness' placeholder='classiness' />
				<input textarea='text' name='similar' ref='similar' placeholder='similar places' />
			</form>
		);
	}
});

var NeighborhoodRecommendationForm = React.createClass({
	render: function() {
		var hoods = [];
		return (
			<div className='hoodRecForm'>
				<ChoiceResponseForm choiceType='checkbox' choices={NEIGHBORHOODS} />
				{hoods}
			</div>
		);
	}
});

var Question = React.createClass({
	render: function() {
		var className = 'question ' + this.props.placement;
		var responseForm = null;
		if (this.props.type === 'user') {
			responseForm = <UserForm />
		} else if (this.props.type === 'free') {
			responseForm = <FreeResponseForm />
		} else if (this.props.type === 'check') {
			responseForm = <ChoiceResponseForm choiceType='checkbox' choices={this.props.choices} />
		} else if (this.props.type === 'select') {
			responseForm = <ChoiceResponseForm choiceType='radio' choices={this.props.choices} />
		} else if (this.props.type === 'locale') {
			responseForm = <LocaleForm />
		} else if (this.props.type === 'neighborhood') {
			responseForm = <NeighborhoodRecommendationForm />
		};
		return (
			<div className={className} id={this.props.id}>
				<h3>{this.props.body}</h3>
				{responseForm}
			</div>
		);
	}
});

var ProgressButton = React.createClass({
	progress: function(){
		this.props.changeQuestion(this.props.direction);
	},
	render: function() {
		return (
			<button className={this.props.direction} disabled={this.props.noMoreQuestions} onClick={this.progress}>
				{this.props.direction}
			</button>
		)
	}
});

var QuestionContainer = React.createClass({
	changeQuestion: function(direction){
		var questionNumber = this.props.currentQuestion;
		direction === 'prev' ? questionNumber-- : questionNumber++;
		this.props.changeQuestion(questionNumber);
	},
	render: function() {
		var currentQuestion = this.props.currentQuestion;
		var placement = '';
		var questions = [];
		this.props.questions.forEach(function(question){
			placement = question.id === currentQuestion ? 'current' : (question.id < currentQuestion ? 'prev' : 'next');
			questions.push(<Question key={question.id} id={question.id} type={question.type} body={question.body} choices={question.choices ? question.choices : null} placement={placement} />)
		});
		var morePrevQuestions = this.props.currentQuestion > 0;
		var moreNextQuestions = this.props.currentQuestion < questions.length - 1;
		return (
			<div className='questionContainer'>
				{questions}
				<div className='progressButtons'>
					<ProgressButton direction='prev' changeQuestion={this.changeQuestion} noMoreQuestions={!morePrevQuestions} />
					<ProgressButton direction='next' changeQuestion={this.changeQuestion} noMoreQuestions={!moreNextQuestions} />
				</div>
			</div>
		);
	}
});

var Survey = React.createClass({
	getInitialState: function(){
		return {currentQuestion: 0}
	},
	updateCurrentQuestion: function(questionNumber){
		this.setState({currentQuestion: questionNumber});
	},
	render: function() {
		return (
			<div className='survey'>
				<h1>Survey</h1>
				<QuestionContainer questions={this.props.questions} currentQuestion={this.state.currentQuestion} changeQuestion={this.updateCurrentQuestion} />
			</div>
		);
	}
});

var NEIGHBORHOODS = [
	'Atwater Village',
	'Beverly Hills',
	'Brentwood',
	'Burbank',
	'Century City',
	'Chinatown',
	'Culver City',
	'Downtown',
	'Echo Park',
	'Glendale',
	'Griffith Park',
	'Hermosa Beach',
	'Hollywood',
	'Koreatown',
	'Larchmont',
	'Little Tokyo',
	'Los Feliz',
	'Malibu',
	'Manhattan Beach',
	'Marina Del Rey',
	'Melrose/Fairfax',
	'Mid Wilshire',
	'Miracle Mile',
	'North Hollywood',
	'Pasadena',
	'Santa Monica',
	'Silver Lake',
	'Sunset',
	'Thai Town',
	'The Valley',
	'Venice',
	'West Hollywood',
	'Westwood',
	'Woodland Hills',
];

var SURVEY_QUESTIONS = [
	{
		id: 0,
		type: 'user',
		body: 'Who are you?'
	},
	{
		id: 1,
		type: 'free',
		body: 'What are some common obstacles you encounter when trying to go out?'
	},
	{
		id: 2,
		type: 'free',
		body: 'Where do you search / who do you ask currently to find out new places / what is cool?'
	},
	{
		id: 3,
		type: 'free',
		body: 'What is/are the most fun place(s) you\'ve gone recently? What did you do there?'
	},
	{
		id: 4,
		type: 'free',
		body: 'What local organized events (concerts, screenings, exhibits, gatherings) have you attended recently in LA? Any events you attend regularly?'
	},
	{
		id: 5,
		type: 'check',
		body: 'What are some of your common going-out goals/scenarios?',
		choices: [
			'fun with friends',
			'getting inebriated',
			'being seen',
			'getting laid',
			'dating',
			'networking',
			'meeting strangers',
			'people watching',
			'trying something new',
			'seeing music',
			'viewing art/film',
			'attending a special event',
			'exploring',
			'exercising',
			'other'
		],
	},
	{
		id: 6,
		type: 'select',
		body: 'Are you more likely to initiate or join existing plans?',
		choices: [
			'initiate',
			'join',
			'equally likely'
		]
	},
	{
		id: 7,
		type: 'select',
		body: 'How often do you go out at night?',
		choices: [
			'only once in a while',
			'a few times a month',
			'once per week',
			'2-3 times per week',
			'4-5 times per week',
			'almost every night'
		]
	},
	{
		id: 8,
		type: 'locale',
		body: 'What is your go-to night spot?'
	},
	{
		id: 9,
		type: 'neighborhood',
		body: 'What neighborhoods do you prefer for nighttime activities?',
		choices: NEIGHBORHOODS
	},
	{
		id: 10,
		type: 'select',
		body: 'How often do you attend daytime events?',
		choices: [
			'only once in a while',
			'a few times a month',
			'once per week',
			'2-3 times per week',
			'4-5 times per week',
			'almost every day'
		]
	},
	{
		id: 11,
		type: 'free',
		body: 'How do you find out about day events?'
	},
	{
		id: 12,
		type: 'neighborhood',
		body: 'What neighborhoods do you prefer for daytime activities?',
		choices: NEIGHBORHOODS
	},
	{
		id: 13,
		type: 'select',
		body: 'How often do you go on outdoor excursions?',
		choices: [
			'only once in a while',
			'a few times a month',
			'once per week',
			'2-3 times per week',
			'4-5 times per week',
			'almost every day'
		]
	},
	{
		id: 14,
		type: 'neighborhood',
		body: 'What neighborhoods do you prefer for outdoor activities?',
		choices: NEIGHBORHOODS
	},
	{
		id: 15,
		type: 'free',
		body: 'Do you leave LA for outdoor excursions, or stay in the city? Where do you go?'
	},
	{
		id: 16,
		type: 'free',
		body: 'What do you wish you went out and did more?'
	}
];

React.render(
	<Survey questions={SURVEY_QUESTIONS}/>,
	document.body
);
