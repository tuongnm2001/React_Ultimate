import './AssignQuiz.scss'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from '../../../../service/apiService'
import { toast } from 'react-toastify'
import { useTranslation, Trans } from 'react-i18next';

const AssignQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const { t } = useTranslation();

    useEffect(() => {
        fetchAllQuiz();
        fetchUser();
    }, [])

    const fetchAllQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser)
        }
    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="assign-quiz-container row mx-3">
            <div className="col-6 form-group">
                <label className="mb-2">{t('manage-quiz.select-quiz')}</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className="col-6 form-group">
                <label className="mb-2">{t('manage-quiz.select-user')}</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>

            <div>
                <button onClick={() => handleAssign()} className='btn btn-warning mt-3'>
                    {t('setting.save')}
                </button>
            </div>
        </div>
    )
}

export default AssignQuiz;