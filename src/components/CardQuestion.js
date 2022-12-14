import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Game.css';
import Timer from './Timer';

class CardQuestion extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      isClicked: false,
      next: false,
    };
  }

  componentDidMount() {
    this.updateAnswer();
  }

  updateAnswer = () => {
    const { question } = this.props;
    const wrongAnswers = question.incorrect_answers
      .map((answer, index) => ({ answer, index, test: `wrong-answer-${index}` }));

    const answers = [...wrongAnswers,
      { answer: question.correct_answer, index: 4, test: 'correct-answer' }];

    const numRandom = 0.5;
    const shuffledAnswers = answers.sort(() => Math.random() - numRandom);

    this.setState({ answers: shuffledAnswers, isClicked: false, next: false });
  }

  clickedButton = () => {
    this.setState({
      isClicked: true,
      next: true,
    });
  }

  render() {
    const { question, changeQuestion } = this.props;
    const { answers, isClicked, next } = this.state;

    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <h3 data-testid="question-text">{question.question}</h3>
        <div data-testid="answer-options">
          { answers.map((elem) => (
            <button
              key={ elem.index }
              className={ isClicked ? elem.test : '' }
              type="button"
              data-testid={ elem.test }
              onClick={ this.clickedButton }
              disabled={ isClicked }
            >
              { elem.answer }
            </button>
          )) }
        </div>
        {
          next && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => {
                changeQuestion();
                this.updateAnswer();
              } }
            >
              Next Question
            </button>
          )
        }
        <div>
          {
            !isClicked && <Timer clicked={ this.clickedButton } />
          }
        </div>
      </div>
    );
  }
}

CardQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  changeQuestion: PropTypes.func.isRequired,
};

export default CardQuestion;
