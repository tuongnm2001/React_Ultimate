import './ManageQuiz.scss'
import Select from 'react-select'
import { useState } from 'react'

const ManageQuiz = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImage] = useState(null)

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ]

    const handleChangFile = (event) => {

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
                        <label for="floatingInput">Name</label>
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
                        <label for="floatingPassword">Description</label>
                    </div>

                    <div className='my-3'>
                        <Select
                            value={type}
                            //onChange={this.handleChange}
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
                </fieldset>

            </div>

            <div className="lits-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz 