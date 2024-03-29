import React from 'react';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import AirplayOutlinedIcon from '@material-ui/icons/AirplayOutlined';


class Projects extends React.Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		window.scrollTo(0, 0);
	}

	render (){

		return <div>

		<div className="projectsDiv">

			<div className="projectHeader">
				<h2>Projects</h2>
			</div>

			<div className="projectItem">

				<h5 className="projectTitle">Blue Dolphin Restoration</h5>

					<p>Two of my good friends started a water and fire restoration company in southern California and hired me as their web developer. This web application is built with Ruby on Rails for the back end and uses embedded Ruby templates for the front end.</p>

					<Button variant="contained" color="primary" href="https://www.bluedolphinflood.com/">www.bluedolphinflood.com</Button>

			</div>

			<div className="projectItem">
			
				<h5 className="projectTitle">Lake Zurich Quiz</h5>

				<p>A 10-question quiz application about my hometown of Lake Zurich, IL. The program is written in Ruby. The back end uses Rails with a simple sqlite3 database hosting the questions and answers.</p>

				<Button variant="contained" color="primary" startIcon={<AirplayOutlinedIcon />} href="https://vast-anchorage-74211.herokuapp.com/">Live Project</Button>

				<Button variant="contained" color="secondary" startIcon={<GitHubIcon />} href="https://github.com/jonglass82/quiz_app">GitHub Repository</Button>

			</div>

			<div className="projectItem">
				
				<h5 className="projectTitle">Movie Ticket App</h5>

				<p>A movie theater application to list movies and allow customers to purchase theater tickets online. The application is built with Ruby on Rails. In the admin dashboard an admin user can access sales reports, add movie listings and edit theater capacities.</p>

				<Button variant="contained" color="primary" startIcon={<AirplayOutlinedIcon />} href="https://safe-chamber-94135.herokuapp.com/">Live Project</Button>

				<Button variant="contained" color="secondary" startIcon={<GitHubIcon />} href="https://github.com/jonglass82/movie_ticket_challenge">GitHub Repository</Button>

			</div>

		</div>

		</div>
	}

}

export default Projects;