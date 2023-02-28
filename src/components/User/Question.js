import _, { isEmpty } from 'lodash'
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { useTranslation, Trans } from 'react-i18next';

const Question = (props) => {

    const { data, index } = props;
    const { t } = useTranslation();
    const [image, setImage] = useState(false)

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBox = (event, aId, qId) => {
        props.handleCheckbox(aId, qId)
    }

    return (
        <>
            {
                data.image ?
                    <div className='q-image'>
                        <img
                            style={{ cursor: 'pointer' }}
                            src={`data:image/jpeg;base64,${data.image}`}
                            onClick={() => setImage(true)}
                        />
                        {
                            image === true &&
                            <Lightbox
                                image={`data:image/jpeg;base64,${data.image}`}
                                title={'Question Image'}
                                onClose={() => setImage(false)}

                            />
                        }

                    </div>
                    :
                    <div className='q-image'>

                    </div>
            }


            <div className="question">{t('detail-quiz.question')} {index + 1}: {data.questionDescription}</div>
            <div className="answers">
                {
                    data.answers && data.answers.length &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`answers-${index}`} className='a-child'>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        checked={item.isSelected}
                                        onChange={(event) => handleCheckBox(event, item.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    );
}

export default Question;