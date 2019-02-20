import React from 'react';

const characters = (props) => {
	let characterList = props.characters.map((c) => (
		<li>
			<a onClick={() => {props.onClick(c.id);}}>{c.name}</a>
		</li>
		)
	);

	return(
		<ul className='characterList'>
			{characterList}
		</ul>
	);
}

export default characters;