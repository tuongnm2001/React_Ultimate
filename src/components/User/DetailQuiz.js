import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../service/apiService"

const DetailQuiz = (props) => {

    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchQuestion();
    }, [quizId])

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);
        console.log('check questions : ', res);
    }

    return (
        <div className="detail-quiz-container">
            <div>THis is QUizDetail</div>
        </div>
    )
}

export default DetailQuiz