import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../service/apiService"
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question"
import { useState } from "react"

const DetailQuiz = (props) => {

    const params = useParams()
    const quizId = params.id
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetchQuestion();
    }, [quizId])

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        answers.push(item.answers)
                    })

                    return {
                        questionId: key,
                        answers, questionDescription, image
                    }
                })
                .value()
            setDataQuiz(data);
        }
    }
    console.log('check data quiz : ', dataQuiz);

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz :{quizId} {location?.state.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>

                <div className="q-content">
                    <Question
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>

                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                </div>
            </div>

            <div className="right-content">
                Count down
            </div>
        </div>
    )
}

export default DetailQuiz