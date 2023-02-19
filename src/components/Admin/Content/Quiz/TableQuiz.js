import { useEffect } from "react";
import { useState } from "react";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {

    // const [listQuiz, setListQuiz] = useState([])
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)

    const [dataDelete, setDataDelete] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})

    const { listQuiz, fetAllQuiz } = props

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
            <div>List Quiz</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
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
                                        <button className="btn btn-warning mx-3" onClick={() => handleUpdateQuiz(item)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteQuiz(item)}>Delete</button>
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