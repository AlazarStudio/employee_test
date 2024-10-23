import React, { useState, useEffect } from "react";
import EmployeeInfo from "../Blocks/EmployeeInfo/EmployeeInfo";
import Quiz from "../Blocks/Quiz/Quiz";

function Main_Page() {
    const [employeeData, setEmployeeData] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        // Проверка наличия сохраненного состояния теста в localStorage
        const savedState = JSON.parse(localStorage.getItem('quizState'));
        const savedEmployeeData = JSON.parse(localStorage.getItem('employeeData'));

        if (savedState && savedEmployeeData) {
            setEmployeeData(savedEmployeeData);
            setShowQuiz(true);
        }
    }, []);

    const handleEmployeeSubmit = (data) => {
        setEmployeeData(data);
        setShowQuiz(true);
        localStorage.setItem('employeeData', JSON.stringify(data));
    };

    return (
        <>
            {showQuiz && employeeData ? (
                <Quiz employeeData={employeeData} />
            ) : (
                <EmployeeInfo onSubmit={handleEmployeeSubmit} />
            )}
        </>
    );
}

export default Main_Page;
