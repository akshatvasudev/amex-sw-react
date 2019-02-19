import React, { Component } from 'react';
import logo from './logo.svg';  




sfsdfsf
import './App.css';
import Characters from './characters';
import CharacterDetails from './CharacterDetails';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.getCharacterDetails = this.getCharacterDetails.bind(this);
  }
  state = {
    characters:[],movies:[{}]
  };
  componentDidMount() {
    axios.get('http://localhost:9000/getCharacters').then((data) => {
      let _characterMap = data.data.characters.map((c) => {
        c.id = Math.floor(Math.random() * 100) + 1;
        return c;
      })
      this.setState({characters:_characterMap});
    }).catch((err) => {
      this.setState({characters:[]});
    });
  };

  getCharacterDetails(id) {
    let character = this.state.characters.filter((c) => {
      return c.id === id;
    });
    axios.get(character?character[0].url:'').then((data) => {
      axios.all(data.data.films.map(filmURL =>  axios.get(filmURL))).then(axios.spread((...res) => {
        this.setState({movies:res.map((movie) => movie.data)});
      }))
    }).catch((data) => {

    })
  }
  render() {
    return (
      <div>
      <Characters characters={this.state.characters} onClick={this.getCharacterDetails}/>
      <CharacterDetails details={this.state.movies} />
      </div>
    );
  }
}

export default App;
