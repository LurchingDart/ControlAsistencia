import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const AttendanceManager = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2NTllZjdmYjIyMWZjNmE5MDY3OWQiLCJlbWFpbCI6ImFkbWluQGVzY3VlbGEuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyMjc0MTYyLCJleHAiOjE3MDI4Nzg5NjJ9.3cmywwH850nkC6qT9-5oZ4Mt9C6rw3kdDmY0DQc6y3g'
    const idProfessor = "657607e4d9f0617a18bde455"

    const [studentsData, setStudentsData] = useState([]);
    const [email, setEmail] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:9000/api/estudiante/teacher/${idProfessor}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setStudentsData(response.data);
            });
        console.log(studentsData);
    }, []);

    const students = ['Estudiante 1', 'Estudiante 2', 'Estudiante 3'];
    const groups = ['Grupo 1', 'Grupo 2', 'Grupo 3'];
    const subjects = ['Materia 1', 'Materia 2', 'Materia 3'];

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Buscando...');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Por favor, ingrese un correo electrónico.');
            return;
        } else {
            setModalIsOpen(false);
        }
    };

    const [date, setDate] = React.useState('');

    return (
        <div>
            <ToastContainer />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Iniciar sesión"
                className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
            >
                <div className="bg-white rounded-lg w-1/2">
                    <div className="flex flex-col items-start p-4">
                        <div className="flex items-center w-full">
                            <div className="text-gray-900 font-medium text-lg">Correo</div>
                            <svg onClick={closeModal} className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4l7.7 7.6 1.3-1.3L10.4 9z"></path>
                            </svg>
                        </div>
                        <form onSubmit={handleLogin} className="w-full mt-6">
                            <input type="string" placeholder="Correo del profesor" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                            <button type="submit" className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white">Iniciar sesión</button>
                        </form>
                    </div>
                </div>
            </Modal>
            <form onSubmit={handleSearch} className="flex flex-wrap justify-between items-center bg-gray-200 p-4">
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                    <label className="block mb-2">
                        Estudiante:
                    </label>
                    <Select
                        options={students.map(student => ({value: student, label: student}))}
                        isSearchable
                        className="w-full"
                    />
                </div>
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                    <label className="block mb-2">
                        Grupo:
                    </label>
                    <Select
                        options={groups.map(group => ({value: group, label: group}))}
                        isSearchable
                        className="w-full"
                    />
                </div>
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                    <label className="block mb-2">
                        Materia:
                    </label>
                    <Select
                        options={subjects.map(subject => ({value: subject, label: subject}))}
                        isSearchable
                        className="w-full"
                    />
                </div>
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                    <label className="block mb-2">
                        Fecha:
                    </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full"/>
                </div>
                <div className="w-full sm:w-auto">
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Buscar</button>
                </div>
            </form>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materias</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asistencias</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Estudiante 1</td>
                    <td className="px-6 py-4 whitespace-nowrap">Grupo 1</td>
                    <td className="px-6 py-4 whitespace-nowrap">Materia 1, Materia 2</td>
                    <td className="px-6 py-4 whitespace-nowrap">A, F, A, A, F</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Estudiante 2</td>
                    <td className="px-6 py-4 whitespace-nowrap">Grupo 2</td>
                    <td className="px-6 py-4 whitespace-nowrap">Materia 1, Materia 3</td>
                    <td className="px-6 py-4 whitespace-nowrap">A, A, A, F, A</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Estudiante 3</td>
                    <td className="px-6 py-4 whitespace-nowrap">Grupo 3</td>
                    <td className="px-6 py-4 whitespace-nowrap">Materia 2, Materia 3</td>
                    <td className="px-6 py-4 whitespace-nowrap">F, F, A, A, A</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceManager;