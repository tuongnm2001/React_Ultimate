import './ManageQuiz.scss'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react'
import { postCreactNewQuiz, getAllQuizForAdmin } from '../../../../service/apiService'
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ManageQuiz = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const { t } = useTranslation();

    const [listQuiz, setListQuiz] = useState([])
    const [key, setKey] = useState('home');

    const fetAllQuiz = async () => {
        // setDataDelete({})
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const options = [
        { value: 'EASY', label: t('manage-quiz.easy') },
        { value: 'MEDIUM', label: t('manage-quiz.medium') },
        { value: 'HARD', label: t('manage-quiz.hard') },
    ]

    const handleChangFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is requires ')
            return;
        }
        let res = await postCreactNewQuiz(description, name, type?.value, image)
        console.log('check res 90 : ', res);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
            fetAllQuiz();
        } else {
            toast.error(res.EM)
        }
    }

    return (
        // <div className="quiz-container">
        //     <Accordion defaultActiveKey="0" >
        //         <Accordion.Item eventKey="0">
        //             <Accordion.Header>{t('manage-quiz.manage-quiz')}</Accordion.Header>
        //             <Accordion.Body>
        //                 <div className="add-new">
        //                     <fieldset className="border rounded-3 p-3">
        //                         <legend className="float-none w-auto px-3">{t('manage-quiz.add-new-quiz')}</legend>
        //                         <div className="form-floating mb-3">
        //                             <input
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="floatingInput"
        //                                 placeholder="name@example.com"
        //                                 value={name}
        //                                 onChange={(event) => setName(event.target.value)}
        //                             />
        //                             <label htmlFor="floatingInput">{t('manage-quiz.name')}</label>
        //                         </div>
        //                         <div className="form-floating">
        //                             <input
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="floatingPassword"
        //                                 placeholder="Password"
        //                                 value={description}
        //                                 onChange={(event) => setDescription(event.target.value)}

        //                             />
        //                             <label htmlFor="floatingPassword">{t('manage-quiz.description')}</label>
        //                         </div>

        //                         <div className='my-3'>
        //                             <Select
        //                                 defaultValue={type}
        //                                 onChange={setType}
        //                                 options={options}
        //                                 placeholder={t('manage-quiz.quiz-type')}
        //                             />
        //                         </div>

        //                         <div className='more-action form-control'>
        //                             <label className='mb-1'>{t('manage-user.upload-image')}</label>
        //                             <input
        //                                 type='file'
        //                                 className='form-control'
        //                                 onChange={(event) => handleChangFile(event)}
        //                             />
        //                         </div>

        //                         <div className='mt-3'>
        //                             <button onClick={() => handleSubmitQuiz()} className='btn btn-success'>{t('setting.save')}</button>
        //                         </div>
        //                     </fieldset>

        //                 </div>

        //                 <div className="lits-detail">
        //                     <TableQuiz
        //                         listQuiz={listQuiz}
        //                         fetAllQuiz={fetAllQuiz}
        //                     />
        //                 </div>
        //             </Accordion.Body>
        //         </Accordion.Item>

        //         <Accordion.Item eventKey="1">
        //             <Accordion.Header>{t('manage-quiz.update-question')}</Accordion.Header>
        //             <Accordion.Body>
        //                 <QuizQA />
        //             </Accordion.Body>
        //         </Accordion.Item>

        //         <Accordion.Item eventKey="2">
        //             <Accordion.Header>{t('manage-quiz.assign-user')}</Accordion.Header>
        //             <Accordion.Body>
        //                 <AssignQuiz />
        //             </Accordion.Body>
        //         </Accordion.Item>
        //     </Accordion>


        // </div>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            fill
            justify
        >
            <Tab eventKey="home" title={t('manage-quiz.manage-quiz')}>
                <div className="add-new">
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-3">{t('manage-quiz.add-new-quiz')}</legend>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label htmlFor="floatingInput">{t('manage-quiz.name')}</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}

                            />
                            <label htmlFor="floatingPassword">{t('manage-quiz.description')}</label>
                        </div>

                        <div className='my-3'>
                            <Select
                                defaultValue={type}
                                onChange={setType}
                                options={options}
                                placeholder={t('manage-quiz.quiz-type')}
                            />
                        </div>

                        <div className='more-action form-control'>
                            <label className='mb-1'>{t('manage-user.upload-image')}</label>
                            <input
                                type='file'
                                className='form-control'
                                onChange={(event) => handleChangFile(event)}
                            />
                        </div>

                        <div className='mt-3'>
                            <button onClick={() => handleSubmitQuiz()} className='btn btn-success'>{t('setting.save')}</button>
                        </div>
                    </fieldset>
                </div>

                <div className="lits-detail m-3">
                    <TableQuiz
                        listQuiz={listQuiz}
                        fetAllQuiz={fetAllQuiz}
                    />
                </div>
            </Tab>

            <Tab eventKey="profile" title={t('manage-quiz.update-question')}>
                <QuizQA />
            </Tab>

            <Tab eventKey="contact" title={t('manage-quiz.assign-user')}>
                <AssignQuiz />
            </Tab>
        </Tabs>
    )
}

export default ManageQuiz 