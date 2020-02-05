import React, { Component } from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Sky color',
                rigthAnswerId: 2,
                id: 1,
                answers: [
                    { text: 'Gray', id: 1 },
                    { text: 'Blue', id: 2 },
                    { text: 'Red', id: 3 },
                    { text: 'Green', id: 4 }
                ]
            },
            {
                question: 'When Lviv was founded?',
                rigthAnswerId: 1,
                id: 2,
                answers: [
                    { text: '1256', id: 1 },
                    { text: '1300', id: 2 },
                    { text: '988', id: 3 },
                    { text: '1116', id: 4 }
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        console.log('Answer Id: ', answerId);

        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rigthAnswerId === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    console.log('Finished');

                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })

        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    

    render () {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Answer your questions</h1>
                    <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz