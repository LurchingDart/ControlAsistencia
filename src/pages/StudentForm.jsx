import React from 'react';
import Formulario from '../components/Formulario';

const StudentForm = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-900 to-violet-300">
            <h1 className="text-4xl font-bold mb-10 m-5">Formulario de Estudiante</h1>
            <Formulario />
        </div>
    );
};

export default StudentForm;