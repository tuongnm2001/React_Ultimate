
import './DashBoard.scss'
import { getOverview } from '../../../service/apiService';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from 'recharts';
import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const DashBoard = (props) => {

    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT)
            //process chart data
            let Qz = 0, Qs = 0, As = 0, User = 0
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            User = res?.DT?.users?.total ?? 0;

            const data = [
                {
                    "name": "Users",
                    "User": User,
                },
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                }

            ]
            setDataChart(data)
        }
    }



    console.log(dataOverview);

    return (
        <div className="dashboard-container">
            <div className='title'>
                {t('dashboard.title')}
            </div>

            <div className='content'>
                <div className='content-left'>
                    <div className='child'>
                        <span className='text-1'>{t('dashboard.tuser')}</span>
                        <span className='text-2'>
                            {
                                dataOverview && dataOverview.users && dataOverview.users.total ?
                                    <>{dataOverview.users.total}</>
                                    :
                                    <>0</>
                            }
                        </span>
                    </div>

                    <div className='child'>
                        <span className='text-1'>{t('dashboard.tquiz')}</span>
                        <span className='text-2'>
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                    <>{dataOverview.others.countQuiz}</>
                                    :
                                    <>0</>
                            }
                        </span>
                    </div>

                    <div className='child'>
                        <span className='text-1'>{t('dashboard.tquestion')}</span>
                        <span className='text-2'>
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                    <>{dataOverview.others.countQuestions}</>
                                    :
                                    <>0</>
                            }
                        </span>
                    </div>

                    <div className='child'>
                        <span className='text-1'>{t('dashboard.tanswers')}</span>
                        <span className='text-2'>
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                    <>{dataOverview.others.countAnswers}</>
                                    :
                                    <>0</>
                            }
                        </span>
                    </div>
                </div>

                <div className='content-right'>
                    <ResponsiveContainer width='95%' height='100%'>
                        <BarChart data={dataChart}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="User" fill="#9b3031" />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard