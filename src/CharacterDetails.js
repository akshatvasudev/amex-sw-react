import React from 'react';

const CharacterDetails = (props) => {
	let formatDate = date => {
		let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return date ? new Date(date).toLocaleDateString("en-US", options) : '--';
	},
	defaultDash = '--';
	let filmDetails = () => props.details.map(m =>  (
		<article>
			<div className='filmDetails__filmTitle'>
				{m.title || defaultDash}
				<span class='filmDetails__filmReleaseDate'> (Released: {formatDate(m.release_date) || defaultDash})</span>
			</div>
			<div className='filmDetails__filmDirector'>Directed By: {m.director || defaultDash}</div>
			<div className='filmDetails__filmCrawl'>{m.opening_crawl || defaultDash}</div>
		</article>
		));
	let getCharacterDetailsEl = () => {
		if(props.hasError){
			return (<article className='filmDetails__errorMessage'>
						We're experiencing technical difficulties.
						Please try again.
					</article>);
		}else{
			return props.details.length > 0?(<section className="filmDetails">
						<h4>Movies ({props.details.length} entires)</h4>
						{filmDetails()}
					</section>):(<section className="filmDetails--selectCharacter">Start by selecting a character</section>);
		}
	}
	return(
		getCharacterDetailsEl()
	);
}

export default CharacterDetails;