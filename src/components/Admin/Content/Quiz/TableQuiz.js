import { useEffect } from "react";
import { useState } from "react";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation, Trans } from 'react-i18next';

const TableQuiz = (props) => {

    // const [listQuiz, setListQuiz] = useState([])
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)

    const [dataDelete, setDataDelete] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})

    const { listQuiz, fetAllQuiz } = props
    const { t } = useTranslation();

    useEffect(() => {
        fetAllQuiz();
    }, [])

    // const fetAllQuiz = async () => {
    //     setDataDelete({})
    //     let res = await getAllQuizForAdmin();
    //     if (res && res.EC === 0) {
    //         setListQuiz(res.DT)
    //     }
    // }

    const handleDeleteQuiz = (quiz) => {
        setDataDelete(quiz)
        setIsShowModalDelete(true)
    }

    const handleUpdateQuiz = (user) => {
        setDataUpdate(user)
        setIsShowModalUpdate(true)
    }

    return (
        <>
            <div style={{ fontSize: '20px' }}>{t('manage-quiz.list-quiz')}</div>
            <table className="table table-hover table-bordered my-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('manage-quiz.name')}</th>
                        <th scope="col">{t('manage-quiz.description')}</th>
                        <th scope="col">{t('manage-quiz.quiz-type')}</th>
                        <th scope="col">{t('manage-user.handle')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-warning mx-3" onClick={() => handleUpdateQuiz(item)}>{t('setting.update')}</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteQuiz(item)}>{t('setting.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <ModalDeleteQuiz
                show={isShowModalDelete}
                setShow={setIsShowModalDelete}
                dataDelete={dataDelete}
                fetAllQuiz={fetAllQuiz}
            />

            <ModalUpdateQuiz
                isShowModalUpdate={isShowModalUpdate}
                setIsShowModalUpdate={setIsShowModalUpdate}
                dataUpdate={dataUpdate}
                fetAllQuiz={fetAllQuiz}
            />
        </>
    );
}

export default TableQuiz;