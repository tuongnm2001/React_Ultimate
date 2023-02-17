import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../service/apiService"
import _ from 'lodash'
import './DetailQuiz.scss'

const DetailQuiz = (props) => {

    const params = useParams()
    const quizId = params.id
    const location = useLocation();

    console.log(location);
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
                    <div className="question">Question 1: How are you doing</div>
                    <div className="answers">
                        <div className="a-child">A .faf</div>
                        <div className="b-child">B .faf</div>
                        <div className="c-child">C .faf</div>
                        <div className="d-child">D .faf</div>
                    </div>
                </div>

                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>

            <div className="right-content">
                Count down
            </div>
        </div>
    )
}

export default DetailQuiz