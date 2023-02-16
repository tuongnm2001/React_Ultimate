import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../service/apiService"
import _ from 'lodash'

const DetailQuiz = (props) => {

    const params = useParams()
    const quizId = params.id

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
            <div>THis is QUizDetail</div>
        </div>
    )
}

export default DetailQuiz