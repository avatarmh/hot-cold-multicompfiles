import React from 'react';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

const initialState = {
  guess: '',
  target: Math.floor(Math.random() * 101),
  feedback: 'Make a Guess!',
  history: [],
  showModal: false
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onInputChange = event => this.setState({ guess: parseInt(event.target.value) });

  submitForm = event => {
    event.preventDefault();
    const { guess, target, history } = this.state;
    if (history.includes(guess)) {
      alert('Guessed number already. Try a new number!')
    } else {
      const newState = { history: [...history, guess], guess: '' };
      if (guess === target) {
        newState.feedback = 'You Won. Click new game to play again';
      } else if (Math.abs(guess - target) <= 10) {
        newState.feedback = 'Hot!';
      } else {
        newState.feedback = 'Cold!';
      }
      this.setState(newState);
    }
  }

  onResetGame = () => this.setState(initialState);

  toggleModal = () => this.setState(currentState => ({ showModal: !currentState.showModal }));

  render() {
    const { feedback, history, guess, showModal } = this.state;
    return (
      <div className="App">
        <InfoModal
          isOpen={showModal}
          onRequestClose={this.toggleModal}
          style={customStyles}
        />
        <MenuBar handleResetGame={this.onResetGame} handleInfoDisplay={this.toggleModal} />
        <header className="App-header">
          <h1>HOT OR COLD</h1>
          <div>
            <div id="feedback">{feedback}</div>
            <InputForm handleSubmitForm={this.submitForm} handleInputChange={this.onInputChange} guess={guess} />
            <div id="guess-count">
              Guess #{history.length}!
          </div>
            <div id="guess-history">{history.join(', ')}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

// MenuBar Component
const MenuBar = ({ handleResetGame, handleInfoDisplay }) => (
  <div>
     <button id='what' onClick={handleInfoDisplay}>What?</button>
     <button id='new-game' onClick={handleResetGame}>New Game?</button>
 </div>
);

// InputForm Component
const InputForm = ({ handleSubmitForm, handleInputChange, guess }) => (
  <div id="input-form">
    <form onSubmit={handleSubmitForm}>
      <div>
        <input
          type='number'
          min={0}
          max={100}
          required
          onChange={handleInputChange} //to access input field value
          value={guess} //to control input field value
        />
      </div>
      <button>Guess</button>
    </form>
  </div>
)

// InfoModal Component
const InfoModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles} >
    <h1>What do I do?</h1>
    <div>
      <p>This is a Hot or Cold Number Guessing Game. The game goes like this:
        <ul>
          <li>1. I pick a random secret number between 1 to 100 and keep it hidden.
          </li>
          <li>2. You need to guess until you can find the hidden secret number.
          </li>
          <li>3. You will get feedback on how close ("hot") or far ("cold") your guess is.
       </li>
        </ul>
        <p>So, Are you ready?</p>
        <button onClick={ onRequestClose }>Close</button>
      </p>
    </div>
  </Modal>
)