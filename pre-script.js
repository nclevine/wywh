var UserForm = React.createClass({
	render: function(){
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
	render: function(){
		return (
			<form className='freeResponseForm'>
				<textarea name='response' ref='response' />
			</form>
		);
	}
});

var CheckResponseForm = React.createClass({
	render: function(){
		var choices = [];
		this.props.choices.forEach(function(choice){
			choices.push(<label>{choice.label}<input type='checkbox' name={choice.name} /></label>);
		});
		return (
			<form className='checkResponseForm'>
				{choices}
			</form>
		);
	}
});

var LocaleForm = React.createClass({
	render: function(){
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

var Question = React.createClass({
	render: function(){
		var responseForm = null;
		if (this.props.type === 'free') {
			responseForm = <FreeResponseForm />
		} else if (this.props.type === 'check') {
			responseForm = <CheckResponseForm />
		} else if (this.props.type === 'locale') {
			responseForm = <LocaleForm />
		};
		return (
			<div className='question' id={this.props.id}>
				<h3>{this.props.body}</h3>
				{responseForm}
			</div>
		);
	}
});

var QuestionContainer = React.createClass({
	render: function(){
		return (
			<div className='questionContainer'>
				<Question />
				<ResponseForm />
			</div>
		);
	}
});

var Survey = React.createClass({
	render: function(){
		return (
			<div className='survey'>
				<h1>Survey</h1>
				<QuestionContainer />
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
	<Survey />,
	document.body
);
