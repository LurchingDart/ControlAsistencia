import { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';

const AttendanceManager = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2NTllZjdmYjIyMWZjNmE5MDY3OWQiLCJlbWFpbCI6ImFkbWluQGVzY3VlbGEuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyMjc0MTYyLCJleHAiOjE3MDI4Nzg5NjJ9.3cmywwH850nkC6qT9-5oZ4Mt9C6rw3kdDmY0DQc6y3g'

    const [profesorData, setProfesorData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [emailProfesor, setEmailProfesor] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);

    useEffect(() => {
        if (profesorData.length !== 0) {
            toast.success(`Bienvenido, ${profesorData.name}. ${profesorData.lastName}.`);
        }
    }, [profesorData]);

    function flattenAndFormatObject(obj) {
        let flatObject = {};

        // Formatear y agregar la fecha y la hora
        const date = new Date(obj.dateData.year, obj.dateData.month - 1, obj.dateData.day, obj.dateData.hour, obj.dateData.minute, obj.dateData.second);
        flatObject['Fecha'] = date.toLocaleDateString();
        flatObject['Hora'] = date.toLocaleTimeString();

        // Agregar información del estudiante
        flatObject['Nombre'] = obj.student.name;
        flatObject['Apellido'] = obj.student.lastName;

        // Agregar información del grupo
        flatObject['Grado'] = obj.student.grade;
        flatObject['Grupo'] = obj.group.number;

        // Agregar información de la materia
        flatObject['Materia'] = obj.subject.name;

        // Agregar el estatus
        flatObject['Estatus'] = obj.status;

        return flatObject;
    }

    const getStudents = async (e) => {
        e.preventDefault();
        if(!emailProfesor) {
            toast.error('Por favor, ingrese un correo electrónico.');
        } else if (!emailProfesor.includes('@')) {
            toast.error('Por favor, ingrese un correo electrónico válido.');
        } else {
            try {
                const responseCheckTeacher = await axios.get(`http://localhost:9000/api/profesor/check/${emailProfesor}`, { headers: { Authorization: `Bearer ${token}` } });
                if (!responseCheckTeacher.data) {
                    toast.error('No se encontró ningún profesor con ese correo electrónico.');
                } else if (responseCheckTeacher.data === true) {
                    const responseGetTeacher = await axios.get(`http://localhost:9000/api/profesor/email/${emailProfesor}`, { headers: { Authorization: `Bearer ${token}` } });
                    setProfesorData(responseGetTeacher.data);
                    const responseGetStudents = await axios.get(`http://localhost:9000/api/estudiante/teacher/${responseGetTeacher.data._id}`, { headers: { Authorization: `Bearer ${token}` } });
                    setStudentsData(responseGetStudents.data);
                    setModalIsOpen(false);
                } else {
                    toast.error('Ocurrió un error al buscar el profesor.');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDownload = async (studentId) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/asistencia/student/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
            const data = response.data.map(item => flattenAndFormatObject(item));

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Asistencia");

            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});

            const url = window.URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'asistencia.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Ingresar correo"
                className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
            >
                <div className="bg-white rounded-lg w-1/2">
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="flex items-center w-full">
                            <div className="text-gray-900 font-medium text-lg">Correo</div>
                        </div>
                        <form onSubmit={getStudents} className="w-full mt-6">
                            <input type="string" placeholder="Correo del profesor" value={emailProfesor} onChange={(e) => setEmailProfesor(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                            <button type="submit" className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white">Enviar correo</button>
                        </form>
                    </div>
                </div>
            </Modal>
            {/*<form onSubmit={handleSearch} className="flex flex-wrap justify-between items-center bg-gray-200 p-4">*/}
            {/*    <div className="w-full sm:w-auto mb-4 sm:mb-0">*/}
            {/*        <label className="block mb-2">*/}
            {/*            Estudiante:*/}
            {/*        </label>*/}
            {/*        <Select*/}
            {/*            options={studentsData.map(student => ({value: student._id, label: `${student.name} ${student.lastName}`}))}*/}
            {/*            isSearchable*/}
            {/*            className="w-full"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="w-full sm:w-auto mb-4 sm:mb-0">*/}
            {/*        <label className="block mb-2">*/}
            {/*            Grupo:*/}
            {/*        </label>*/}
            {/*        <Select*/}
            {/*            options={studentsData.map(student => ({value: student.group, label: `${student.grade} ${student.group.number}` }))}*/}
            {/*            isSearchable*/}
            {/*            className="w-full"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="w-full sm:w-auto mb-4 sm:mb-0">*/}
            {/*        <label className="block mb-2">*/}
            {/*            Materia:*/}
            {/*        </label>*/}
            {/*        <Select*/}
            {/*            options={profesorData.subjects ? profesorData.subjects.map(subject => ({*/}
            {/*                value: subject._id,*/}
            {/*                label: subject.name*/}
            {/*            })) : []}*/}
            {/*            isSearchable*/}
            {/*            className="w-full"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    /!*<div className="w-full sm:w-auto mb-4 sm:mb-0">*!/*/}
            {/*    /!*    <label className="block mb-2">*!/*/}
            {/*    /!*        Fecha:*!/*/}
            {/*    /!*    </label>*!/*/}
            {/*    /!*    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full"/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <div className="w-full sm:w-auto">*/}
            {/*        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Buscar</button>*/}
            {/*    </div>*/}
            {/*</form>*/}
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricula</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asistencias</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {studentsData.map((student, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{student.studentId}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.group.number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button type="button" className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg"
                                        onClick={() => handleDownload(student._id)}>
                                    Excel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceManager;