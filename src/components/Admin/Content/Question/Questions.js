import { useState } from "react";
import Select from "react-select";
import './Questions.scss'
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [selectedQuiz, setSelectedQuiz] = useState('')

    const [question, setQuestion] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false
                }
            ]
        }
    ])

    console.log('check question : ', question);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestion([...question, newQuestion])
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(question);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestion(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionsId, answerId) => {

        let questionClone = _.cloneDeep(question);

        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionClone.findIndex(item => item.id === questionsId);
            questionClone[index].answers.push(newAnswer)
            setQuestion(questionClone);
        }

        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === questionsId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
            setQuestion(questionClone);
        }
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>

            <hr />

            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className="mt-3 mb-2">Add Questions</div>

                {
                    question && question.length > 0 &&
                    question.map((item, index) => {
                        return (
                            <div key={item.id} className="q-main mb-4">
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={item.description}
                                        />
                                        <label>Question {index + 1} Description</label>
                                    </div>

                                    <div className="group-upload">
                                        <label className="label-up"><RiImageAddFill /></label>
                                        <input type='file' hidden />
                                        <span>0 file is upload</span>
                                    </div>

                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <AiOutlinePlusSquare className="icon-add" />
                                        </span>

                                        {
                                            question.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}>
                                                <AiOutlineMinusSquare className="icon-remove" />
                                            </span>
                                        }


                                    </div>
                                </div>

                                {
                                    item.answers && item.answers.length > 0 &&
                                    item.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">

                                                <input
                                                    className="form-check-input isCorrect"
                                                    type="checkbox"
                                                />

                                                <div className="form-floating answers-name">
                                                    <input
                                                        type="text"
                                                        value={answer.description}
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                    />
                                                    <label >Answers {index + 1}</label>
                                                </div>

                                                <div className="btn-group">
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', item.id)}>
                                                        <AiOutlinePlusCircle className="icon-add" />
                                                    </span>

                                                    {
                                                        item.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', item.id, answer.id)}>
                                                            <AiOutlineMinusCircle className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Questions;