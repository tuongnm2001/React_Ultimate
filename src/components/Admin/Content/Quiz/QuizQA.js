import { useState } from "react";
import Select from "react-select";
import './QuizQA..scss'
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useEffect } from "react";
import {
    getAllQuizForAdmin,
    getQuizWithQA, postUpsertQA
} from "../../../../service/apiService";
import { toast } from 'react-toastify';

const QuizQA = () => {

    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
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
    ]
    const [question, setQuestion] = useState(initQuestion)

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    useEffect(() => {
        fetchAllQuiz();
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz])

    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            //convert base64 to file object
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q)
            }
            setQuestion(newQA)
            console.log('res.DT.qa', res.DT.qa);
        }
    }

    const fetchAllQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
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

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(question);
            let index = questionClone.findIndex(item => item.id === questionId);

            if (index > -1) {
                questionClone[index].description = value
                setQuestion(questionClone)
            }
        }
    }

    const handleOnChangeFileAction = (questionId, event) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0]
            questionClone[index].imageName = event.target.files[0].name;
            setQuestion(questionClone)
        }
    }

    const handleAnswersQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }

                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestion(questionClone)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a quiz')
            return;
        }

        //validate answers
        let isValidAnswers = true;
        let indexQ = 0;
        let indexA = 0;

        for (let i = 0; i < question.length; i++) {

            for (let j = 0; j < question[i].answers.length; j++) {
                if (!question[i].answers[j].description) {
                    isValidAnswers = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i
            if (isValidAnswers === false) {
                break;
            }
        }

        if (isValidAnswers === false) {
            toast.error(`Not empty answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        //validate question
        let isValidQ = true;
        let indexQ1 = 0;

        for (let i = 0; i < question.length; i++) {
            if (!question[i].description) {
                isValidQ = false
                indexQ1 = 1
                break;
            }
        }

        if (isValidQ === false) {
            toast.error(`Not empty description from Questions ${indexQ1 + 1}`)
            return;
        }

        //submit questions
        let questionClone = _.cloneDeep(question);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });

        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA();
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                            onChange={(event) => handleOnChange('QUESTION', item.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} Description</label>
                                    </div>

                                    <div className="group-upload">
                                        <label htmlFor={`${item.id}`} ><RiImageAddFill className="label-up" /></label>
                                        <input
                                            id={`${item.id}`}
                                            type='file'
                                            onChange={(event) => handleOnChangeFileAction(item.id, event)}
                                            hidden
                                        />
                                        <span>{item.imageName ? <span onClick={() => handlePreviewImage(item.id)}>{item.imageName}</span> : '0 file is upload'}</span>
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
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswersQuestion('CHECKBOX', answer.id, item.id, event.target.checked)}
                                                />

                                                <div className="form-floating answers-name">
                                                    <input
                                                        type="text"
                                                        value={answer.description}
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswersQuestion('INPUT', answer.id, item.id, event.target.value)}
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

                {
                    question && question.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()} className="btn btn-success">
                            Save Question
                        </button>
                    </div>
                }

                {
                    isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}

                    />
                }

            </div>
        </div>
    )
}

export default QuizQA;