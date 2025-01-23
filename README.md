# Control de Asistencia Web App

[![Project Status](https://img.shields.io/badge/Status-Temporarily_Abandoned-red)](https://asistencia-one.vercel.app/)


The Attendance Control web application provides an efficient solution for teachers to record attendance for their groups quickly and accurately. Additionally, it offers administrators the ability to monitor and download attendance reports.

## Key Features

- **Attendance Registration:**
  - Form for students with automatic timestamp to prevent incorrect attendances.

- **Dashboard for Teachers:**
  - JWT authentication system for teachers.
  - Attendance query filtered by subject, day, or student.
  - Downloadable attendance reports in Excel format.

- **API Connected to MongoDB:**
  - Implementation of a secure API with authentication on endpoints.
  - A variety of endpoints to manage necessary information.

## Technologies Used

- Front-end: React.js, Vite.js, Tailwind CSS, Material UI.
- Back-end: Node.js, Express.js, MongoDB, Mongoose, JSON Web Token (JWT).
- Others: Axios, XLSX.

## Local Setup and Usage

1. Clone the repository: `git clone https://github.com/LurchingDart/ControlAsistencia.git`
2. Install dependencies: `npm install`
3. Run the application: `npm run dev`

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Online Demo

The application is available online [here](https://asistencia-one.vercel.app/).

## Routes

- [Student Registration](https://asistencia-one.vercel.app/student-form)
- [Teacher Dashboard](https://asistencia-one.vercel.app/teacher-panel)

## Contributions

We welcome external contributions! If you wish to contribute, follow these steps:

1. Fork the repository.
2. Create a branch for your contribution: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature/new-feature`
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
