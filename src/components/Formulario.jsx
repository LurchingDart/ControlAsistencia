import React, { useState, useEffect } from 'react';
import  axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Formulario = () => {

    const [matricula, setMatricula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [grado, setGrado] = useState();
    const [grupo, setGrupo] = useState('');
    const [materia, setMateria] = useState('');
    const [profesor, setProfesor] = useState('');

    const [grupos, setGrupos] = useState([]);
    const [materiasData, setMateriasData] = useState([]);
    const [profesores, setProfesores] = useState([]);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2NTllZjdmYjIyMWZjNmE5MDY3OWQiLCJlbWFpbCI6ImFkbWluQGVzY3VlbGEuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyMjc0MTYyLCJleHAiOjE3MDI4Nzg5NjJ9.3cmywwH850nkC6qT9-5oZ4Mt9C6rw3kdDmY0DQc6y3g'

    useEffect(() => {
        axios.get('https://api-control-asistencia.vercel.app/api/grupo', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setGrupos(res.data);
            });

        axios.get('https://api-control-asistencia.vercel.app/api/materia', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setMateriasData(res.data);
            });

        axios.get('https://api-control-asistencia.vercel.app/api/profesor', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setProfesores(res.data);
            });
    }, []);

    const handleSubmit = (e) => { e.preventDefault();

        if (!matricula || !nombre || !apellido || !correo || !contrasena || !grado || !grupo || !materia || !profesor) {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }

        const data = {
            studentId: matricula,
            name: nombre,
            lastName: apellido,
            email: correo,
            password: contrasena,
            grade: grado,
            group: grupo,
            subjects: materia,
            teacher: profesor
        };

        axios.get(`https://api-control-asistencia.vercel.app/api/estudiante/check/${matricula}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.data) {
                    console.log("Estudiante ya registrado");
                    console.log("Obteniendo id...");
                    axios.get(`https://api-control-asistencia.vercel.app/api/estudiante/studentId/${matricula}`, { headers: { Authorization: `Bearer ${token}` } })
                        .then(res => {
                            console.log("Id obtenido: " + res.data._id);
                            console.log("Registrando asistencia...");
                            const _id = res.data._id;
                            const data = {
                                student: _id,
                                group: grupo,
                                subject: materia,
                                status: 'attended'
                            };
                            console.log('Data para enviar:', data);
                            axios.post('https://api-control-asistencia.vercel.app/api/asistencia', data, { headers: { Authorization: `Bearer ${token}` } })
                                .then(res => {
                                    console.log("Asistencia registrada");
                                    toast.success(`Asistencia registrada`);
                                    console.log(res.data);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                } else {
                    console.log("Estudiante no registrado");
                    console.log("Registrando estudiante...");
                    axios.post('https://api-control-asistencia.vercel.app/api/estudiante', data, { headers: { Authorization: `Bearer ${token}` } })
                        .then(res => {
                            console.log("Estudiante registrado");
                            console.log("Obteniendo id...");
                            axios.get(`https://api-control-asistencia.vercel.app/api/estudiante/studentId/${matricula}`, { headers: { Authorization: `Bearer ${token}` } })
                                .then(res => {
                                    console.log("Id obtenido: " + res.data._id);
                                    console.log("Registrando asistencia...");
                                    const _id = res.data._id;
                                    const data = {
                                        student: _id,
                                        group: grupo,
                                        subject: materia,
                                        status: 'attended'
                                    };
                                    console.log('Data para enviar:', data);
                                    axios.post('https://api-control-asistencia.vercel.app/api/asistencia', data, { headers: { Authorization: `Bearer ${token}` } })
                                        .then(res => {
                                            console.log("Asistencia registrada");
                                            toast.success(`Asistencia registrada`);
                                            console.log(res.data);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
    }

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-900 to-violet-300">
            <ToastContainer />
            <h1 className="text-4xl font-bold mb-10 m-5">Formulario de Estudiante</h1>
            <form onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center m-auto w-1/2 p-5 bg-gray-100 rounded-lg shadow-md">
                <label className="my-2 p-2 w-4/5">
                    Matricula:
                    <input type="text" value={matricula} onChange={e => setMatricula(e.target.value)}
                           className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md"/>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Nombre:
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                           className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md"/>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Apellido:
                    <input type="text" value={apellido} onChange={e => setApellido(e.target.value)}
                           className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md"/>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Correo:
                    <input type="email" value={correo} onChange={e => setCorreo(e.target.value)}
                           className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md"/>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Contraseña:
                    <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)}
                           className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md"/>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Grado:
                    <select value={grado} onChange={e => setGrado(Number(e.target.value))}
                            className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md">
                        <option value="">Seleccione...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Grupo:
                    <select value={grupo} onChange={e => setGrupo(e.target.value)}
                            className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md">
                        <option value="">Seleccione...</option>
                        {grupos.map(g => <option key={g._id} value={g._id}>{g.number}</option>)}
                    </select>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Materias:
                    <select value={materia} onChange={e => setMateria(e.target.value)}
                            className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md">
                        <option value="">Seleccione...</option>
                        {materiasData.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                    </select>
                </label>
                <label className="my-2 p-2 w-4/5">
                    Profesor:
                    <select value={profesor} onChange={e => setProfesor(e.target.value)}
                            className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md">
                        <option value="">Seleccione...</option>
                        {profesores.map(p => <option key={p._id} value={p._id}>{p.name} {p.lastName}</option>)}
                    </select>
                </label>
                <input type="submit" value="Registrar Asistencia"
                       className="my-5 px-10 py-2 bg-green-500 text-white rounded-md cursor-pointer"/>
            </form>
        </div>

    );
}

export default Formulario;