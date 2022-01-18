import React from 'react';


class MusicPage extends React.Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		window.scrollTo(0, 0);
	}

	render (){
		return <div className="projectsDiv">

			<div className="projectHeader">
				<h2>Music</h2>
			</div>

			<p style={{color: 'black', textAlign:'center', fontSize:'24px'}}>Coming soon..</p>

		</div>
	}

}

export default MusicPage;