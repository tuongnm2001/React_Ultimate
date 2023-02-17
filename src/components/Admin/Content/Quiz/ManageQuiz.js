import './ManageQuiz.scss'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useState } from 'react'
import { postCreactNewQuiz } from '../../../../service/apiService'

const ManageQuiz = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
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

        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quiz
            </div>

            <hr />

            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label htmlFor="floatingInput">Name</label>
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
                        <label htmlFor="floatingPassword">Description</label>
                    </div>

                    <div className='my-3'>
                        <Select
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder={'Quiz type...'}
                        />
                    </div>

                    <div className='more-action form-control'>
                        <label className='mb-1'>Upload Image</label>
                        <input
                            type='file'
                            className='form-control'
                            onChange={(event) => handleChangFile(event)}
                        />
                    </div>

                    <div className='mt-3'>
                        <button onClick={() => handleSubmitQuiz()} className='btn btn-success'>Save</button>
                    </div>
                </fieldset>

            </div>

            <div className="lits-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz 