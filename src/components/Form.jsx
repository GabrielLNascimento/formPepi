import React, { useState } from 'react';
import questions from '../data/questions.json';

import '../styles/Form.css';

const Form = () => {
    const [answers, setAnswers] = useState({});

    const handleChange = (questionId, value, type) => {
        setAnswers((prev) => {
            if (type === 'checkbox') {
                const prevValues = prev[questionId] || [];
                if (prevValues.includes(value)) {
                    return {
                        ...prev,
                        [questionId]: prevValues.filter((v) => v !== value),
                    };
                } else {
                    return {
                        ...prev,
                        [questionId]: [...prevValues, value],
                    };
                }
            } else if (type === 'multi-select') {
                return {
                    ...prev,
                    [questionId]: value,
                };
            } else {
                // text, radio, select
                return {
                    ...prev,
                    [questionId]: value,
                };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // const allAnswered = questions.every((q) => {
        //     const answer = answers[q.id];
        //     if (q.type === 'checkbox') {
        //         return Array.isArray(answer) && answer.length > 0;
        //     } else {
        //         return answer && answer.toString().trim() !== '';
        //     }
        // });

        const allAnswered = true;

        if (!allAnswered) {
            alert('Por favor, responda todas as perguntas antes de enviar.');
            return;
        }

        const result = questions.map((q) => ({
            question: q.question,
            answer: Array.isArray(answers[q.id])
                ? answers[q.id].length > 0
                    ? answers[q.id].join(', ')
                    : 'Sem resposta'
                : answers[q.id] && answers[q.id].toString().trim() !== ''
                ? answers[q.id]
                : 'Sem resposta',
        }));

        let message = 'Respostas do formulário:\n';

        result.forEach((item, index) => {
            message += `${index + 1}. ${item.question}: ${item.answer}\n`;
        });

        const phoneNumber = '47991015245';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message
        )}`;

        window.open(url, '_blank');
    };

    return (
        <>
            <h1>Formulário do Pepi</h1>
            <form onSubmit={handleSubmit} className="form-container">
                {questions.map((q) => (
                    <div key={q.id} className="question">
                        <p className="title-question">
                            <strong>{q.question}</strong>
                        </p>

                        {q.type === 'radio' &&
                            q.options &&
                            q.options.map((option, index) => (
                                <label key={index} className="awnser-question">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={option}
                                        checked={answers[q.id] === option}
                                        onChange={() =>
                                            handleChange(q.id, option, 'radio')
                                        }
                                    />
                                    {option}
                                </label>
                            ))}

                        {q.type === 'checkbox' &&
                            q.options &&
                            q.options.map((option, index) => (
                                <label key={index} className="awnser-question">
                                    <input
                                        type="checkbox"
                                        name={`question-${q.id}`}
                                        value={option}
                                        checked={
                                            answers[q.id]
                                                ? answers[q.id].includes(option)
                                                : false
                                        }
                                        onChange={() =>
                                            handleChange(
                                                q.id,
                                                option,
                                                'checkbox'
                                            )
                                        }
                                    />
                                    {option}
                                </label>
                            ))}

                        {q.type === 'text' && (
                            <input
                                type="text"
                                value={answers[q.id] || ''}
                                onChange={(e) =>
                                    handleChange(q.id, e.target.value, 'text')
                                }
                                placeholder="Digite sua resposta aqui"
                            />
                        )}

                        {q.type === 'select' && q.options && (
                            <select
                                value={answers[q.id] || ''}
                                onChange={(e) =>
                                    handleChange(q.id, e.target.value, 'select')
                                }
                            >
                                <option value="" disabled>
                                    Selecione uma opção
                                </option>
                                {q.options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <button type="submit" className="btn-submit">
                    Enviar
                </button>
            </form>
        </>
    );
};

export default Form;
