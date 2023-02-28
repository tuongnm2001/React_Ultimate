import './History.scss'
import { getHistory } from '../../service/apiService';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment'
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'

const History = (props) => {

    const [dataHistory, setDataHistory] = useState({})
    const { t } = useTranslation();

    useEffect(() => {
        fetchDataHistory()
    }, [])

    const fetchDataHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res.DT.data.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item.quizHistory.name,
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if (newData.length > 8) {
                newData = newData.slice(newData.length - 8, newData.length);
            }
            setDataHistory(newData)
        }
    }

    let sortDataHistory = _.orderBy(dataHistory, ['id'], ['desc'])


    return (
        <div className="history-container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t('profile.quiz-name')}</th>
                        <th>{t('profile.ttquestion')}</th>
                        <th>{t('profile.ttcorrect')}</th>
                        <th>{t('profile.date')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortDataHistory && sortDataHistory.length > 0 ?
                            sortDataHistory.map((item, index) => {
                                return (
                                    <tr key={`key-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.total_questions}</td>
                                        <td>{item.total_correct}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                )
                            }) :
                            <td className='noExam' colSpan='5'>{t('profile.noExam')}</td>
                    }
                </tbody>
            </Table>
            <button className='btn btn-danger' onClick={() => props.handleClose()}>{t('setting.close')}</button>
        </div>
    )
}

export default History;