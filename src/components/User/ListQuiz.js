import { useEffect, useState } from "react";
import { getQuizByUser } from "../../service/apiService";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
import _ from 'lodash'
import { useTranslation, Trans } from 'react-i18next';

const ListQuiz = (props) => {

    const [arrQuiz, setArrQuiz] = useState([])
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }

    let sortArrQuiz = _.orderBy(arrQuiz, ['id'], ['asc'])

    console.log('check sortArrQuiz : ', sortArrQuiz);

    return (
        <div className="list-quiz-container container">
            {
                sortArrQuiz && sortArrQuiz.length > 0 &&
                sortArrQuiz.map((item, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{t('list-quiz.quiz')} {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button className="btn btn-primary" onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })}>{t('list-quiz.button')}</button>
                            </div>
                        </div>
                    )
                })
            }

            {
                arrQuiz && arrQuiz.length === 0 &&
                <div>You don't have any quiz now...</div>
            }
        </div>
    )
}

export default ListQuiz;