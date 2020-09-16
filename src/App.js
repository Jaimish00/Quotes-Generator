import React from 'react';
//import logo from './logo.svg';
import './App.css';
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';
//import Generate from './components/Generated Quotes/Generate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      quote: null,
      toggle: true,
    };
  }
  generate() {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en/')
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quote: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }

  translate(quote) {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/id/' + quote.id)
      .then((response) => response.json())
      .then(
        (result) => {
          if (this.state.toggle === true)
            this.setState({
              isLoaded: true,
              toggle: false,
              quote: result,
            });
          else
            this.setState({
              isLoaded: true,
              toggle: true,
              quote: result,
            });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }

  download(){
    var node = document.getElementById('Image');
    
    node.innerHTML = "I'm an image now."
      domtoimage.toBlob(document.getElementById('Image'))
        .then(function(blob) {
          window.saveAs(blob, 'image.png');
        });
  }

  render() {
    const { error, isLoaded, quote, toggle } = this.state;

    if (error) {
      return <div>Error</div>;
    } else if (!isLoaded) {
      return <div>Loading</div>;
    } else if (quote !== null && toggle === true) {
      return (
        <div id="Image">
          <div>
            <p>"{quote.en}"</p>
            <blockquote>-{quote.author}</blockquote>
          </div>
          <button className='btn' onClick={() => this.generate()}>
            Generate
          </button>
          <button className='btn' onClick={() => this.translate(quote)}>
            Toggle
          </button>
          <button id='dw-btn' onClick={() => this.download()}>
            Download
          </button>
        </div>
      );
    } else if (quote !== null && toggle === false) {
      return (
        <div>
          <div id="Image">
            <p>"{quote.sr}"</p>
            <blockquote>-{quote.author}</blockquote>
          </div>
          <button className='btn' onClick={() => this.generate()}>
            Generate
          </button>
          <button className='btn' onClick={() => this.translate(quote)}>
            Toggle
          </button>
          <button className='btn' onClick={() => this.download()}>
            Download
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div></div>
          <button className='btn' onClick={() => this.generate()}>
            Generate
          </button>
          <button className='btn'>Toggle</button>
          <button className='dw-btn'>
            Download
          </button>
        </div>
      );
    }
  }
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/
