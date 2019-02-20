import React, { Component } from 'react';
import logo from './logo.svg';  
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
    hasError: false
  };
  componentDidMount() {
    let _characterMap = characterList.characters.map((char) => {
        char.id = Math.floor(Math.random() * 100) + 1;
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
      return char.id === id;
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
      <Characters characters={this.state.characters} onClick={this.getCharacterDetails}/>
      <CharacterDetails details={this.state.movies} hasError={this.state.hasError} />
      </div>
    );
  }
}

export default App;
