import React, { Component } from 'react';
import './App.css';
import Characters from './characters';
import CharacterDetails from './characterDetails';
import axios from 'axios';
import * as characterList from './character.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.getCharacterDetails = this.getCharacterDetails.bind(this);
    this.getFilmDetails = this.getFilmDetails.bind(this);
  }
  state = {
    characters:[],
    movies:[],
    selectedCharacterId: -1,
    hasError: false
  };
  componentDidMount() {
    let _characterMap = characterList.characters.map((char) => {
        char.id = Math.random().toString(36).substr(2, 9);
        return char;
      });
      this.setState({characters:_characterMap});
  };

  getFilmDetails(films) {
    axios.all(films.map(filmURL =>  axios.get(filmURL))).then(axios.spread((...res) => {
      let filmData = res.map((movie) => movie.data);
        this.setState({hasError:false});
        this.setState({movies:filmData});
      })).catch(() => {
        this.setState({hasError:true});
      });
  }

  getCharacterDetails(id) {
    let selectedCharacter = this.state.characters.filter((char) => {
      if(char.id === id){
        this.setState({selectedCharacterId:char.id});
        return true;
      }
      return false;
    });
    axios.get(selectedCharacter?selectedCharacter[0].url:'').then((data) => {
      this.setState({hasError:false});
      this.getFilmDetails(data.data.films);
    }).catch((data) => {
      this.setState({hasError:true});
    });
  }
  render() {
    return (
      <div>
      <Characters characters={this.state.characters} onClick={this.getCharacterDetails} selectedCharacterId={this.state.selectedCharacterId}/>
      <CharacterDetails details={this.state.movies} hasError={this.state.hasError} />
      </div>
    );
  }
}

export default App;
