import React from 'react';

const CharacterDetails = (props) => {
	let details = props.details[0].title;
	return(
		<div>{details}</div>
	);
}

export default CharacterDetails;