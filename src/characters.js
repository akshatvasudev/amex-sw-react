import React from 'react';

const characters = (props) => {
    let characterList = props.characters.map((c) => (
        <li onClick={(e) => {e.preventDefault();props.onClick(c.id);}} 
			key={c.id} 
			className={props.selectedCharacterId === c.id?'selectedCharacter':''}
			>
			{c.name}
		</li>
    ));

    return (
        <ul className='characterList'>
			{characterList}
		</ul>
    );
}

export default characters;