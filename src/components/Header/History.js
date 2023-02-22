import './History.scss'
import { getHistory } from '../../service/apiService';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment'
import Table from 'react-bootstrap/Table';


const History = (props) => {

    const [dataHistory, setDataHistory] = useState({})


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

    console.log('cek : ', dataHistory);

    return (
        <div className="history-container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quiz Name</th>
                        <th>Total Question</th>
                        <th>total_correct</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataHistory && dataHistory.length > 0 &&
                        dataHistory.map((item, index) => {
                            return (
                                <tr key={`key-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

                <button className='btn btn-warning mt-3' onClick={() => props.handleClose()}>Cancal</button>
            </Table>
        </div>
    )
}

export default History;