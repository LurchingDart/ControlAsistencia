import React from 'react';

const ExportButton = () => {
    const handleExport = () => {
        // Aquí irá la lógica para exportar los datos a Excel
        console.log('Exportando datos...');
    };

    return (
        <button onClick={handleExport}>Exportar a Excel</button>
    );
};

export default ExportButton;