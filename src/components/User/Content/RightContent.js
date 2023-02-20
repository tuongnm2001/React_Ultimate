import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {

    const refDiv = useRef([]);
    const { dataQuiz } = props;

    console.log('check data quiz ', dataQuiz);

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }

    const getClassQuestion = (question, index) => {
        //check answered
        if (question && question.answers.length > 0) {
            let isAnswer = question.answers.find(a => a.isSelected === true);
            if (isAnswer) {
                return 'question selected'
            }
        }
        return 'question'
    }

    const handleClickQuestion = (question, index) => {
        props.setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === 'question cliked') {
                    item.className = 'question'
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isAnswer = question.answers.find(a => a.isSelected === true);
            if (isAnswer) {
                return;
            }
        }
        refDiv.current[index].className = 'question cliked'

    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>

            <div className="main-question">
                {
                    dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`questions - ${index}`}
                                className={getClassQuestion(item, index)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent;