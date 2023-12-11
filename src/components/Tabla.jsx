import React, { useState, useEffect } from 'react';

const AttendanceTable = () => {
    const [students, setStudents] = useState([]);

    // Generar datos de muestra
    useEffect(() => {
        const sampleData = [
            { name: 'Estudiante 1', group: 'Grupo 1', subjects: ['Materia 1', 'Materia 2'], attendance: [true, false, true, true, false] },
            { name: 'Estudiante 2', group: 'Grupo 2', subjects: ['Materia 1', 'Materia 3'], attendance: [true, true, true, false, true] },
            { name: 'Estudiante 3', group: 'Grupo 3', subjects: ['Materia 2', 'Materia 3'], attendance: [false, false, true, true, true] },
        ];
        setStudents(sampleData);
    }, []);

    return (
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
            {students.map((student, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.group}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.subjects.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.attendance.map((day, i) => day ? 'A' : 'F').join(', ')}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default AttendanceTable;