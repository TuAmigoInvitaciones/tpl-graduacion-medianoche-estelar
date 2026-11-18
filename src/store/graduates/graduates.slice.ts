import { createSlice } from '@reduxjs/toolkit';

export interface Graduate {
    id: string;
    name: string;
}

export interface Career {
    id: string;
    name: string;
    graduates: Graduate[];
}

interface GraduatesState {
    careers: {
        isc: Career;
    };
}

const initialState: GraduatesState = {
    careers: {
        isc: {
                    id: 'isc',
                    name: 'Ingeniería en Sistemas Computacionales',
                    graduates: [
                        { id: 'isc-1', name: 'Aguilar Mendoza Diego Alejandro' },
                        { id: 'isc-2', name: 'Alvarado Castillo Sofía Valentina' },
                        { id: 'isc-3', name: 'Bautista Morales Sebastián' },
                        { id: 'isc-4', name: 'Camacho Herrera Valeria Fernanda' },
                        { id: 'isc-5', name: 'Cárdenas Delgado Emilio Gabriel' },
                        { id: 'isc-6', name: 'Castellanos Ríos Paola Montserrat' },
                        { id: 'isc-7', name: 'Cervantes Navarro Kevin Eduardo' },
                        { id: 'isc-8', name: 'Cruz Villalobos Mariana Guadalupe' },
                        { id: 'isc-9', name: 'Domínguez Paredes Héctor Iván' },
                        { id: 'isc-10', name: 'Espinoza Sandoval Camila Renée' },
                        { id: 'isc-11', name: 'Flores Domínguez Ángel Mauricio' },
                        { id: 'isc-12', name: 'Galván Ortega Regina Isabel' },
                        { id: 'isc-13', name: 'García Contreras Luis Fernando' },
                        { id: 'isc-14', name: 'González Pacheco Andrea Lizeth' },
                        { id: 'isc-15', name: 'Gutiérrez Velasco Mateo Nicolás' },
                        { id: 'isc-16', name: 'Hernández Salgado Ximena Paulina' },
                        { id: 'isc-17', name: 'Jiménez Cordero Rodrigo Gael' },
                        { id: 'isc-18', name: 'López Santillán Natalia Sofía' },
                        { id: 'isc-19', name: 'Martínez Aguirre Carlos Daniel' },
                        { id: 'isc-20', name: 'Mendoza Figueroa Daniela Alejandra' },
                        { id: 'isc-21', name: 'Morales Quiroz Leonardo Emiliano' },
                        { id: 'isc-22', name: 'Navarro Esquivel Karla Jimena' },
                        { id: 'isc-23', name: 'Ortega Treviño Jesús Adrián' },
                        { id: 'isc-24', name: 'Pérez Domínguez Fernanda Michelle' },
                        { id: 'isc-25', name: 'Ramírez Lozano Brayan Alexis' },
                        { id: 'isc-26', name: 'Reyes Solís Valentina Nicole' },
                        { id: 'isc-27', name: 'Rodríguez Fuentes José Pablo' },
                        { id: 'isc-28', name: 'Sánchez Trejo Abril Estefanía' },
                        { id: 'isc-29', name: 'Torres Villaseñor Miguel Ángel' },
                        { id: 'isc-30', name: 'Vázquez Montoya Danna Paola' },
                    ]
                }
    }
};

const graduatesSlice = createSlice({
    name: 'graduates',
    initialState,
    reducers: {
        // Reducers for potential runtime modifications (adding, updating if needed)
    }
});

export default graduatesSlice.reducer;
