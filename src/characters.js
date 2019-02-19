import React from 'react';

const characters = (props) => {
	let characterList = props.characters.map((c) => (<li>{c.name} -- <a onClick={() => {props.onClick(c.id);}}>Link</a></li>));

	return(
		<ul>
			{characterList}
		</ul>
	);
}

export default characters;