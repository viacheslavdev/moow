import './styles/css/main.css'
import Header from './components/Header';
import Routes from './components/Routes';
import MapsCredentials from './components/MapsCredentials';
import { useState } from 'react';
import Footer from './components/Footer';



export interface PointType {
    pointName: string;
    pointDate?: string | number;
    workTime: number;
    address: string;
    comingTime?: string;
    coordinates: {
        lat: number | undefined;
        lng: number | undefined;
    };
}

export interface CargoType {
    weight: string;
    length: string;
    height: string;
    width: string;
    comment: string;
    forwarder: boolean;
}

export interface ContactsType {
    firstName: string;
    secondName: string;
    phoneNumber: string;
    paymentType: string;
}


export interface RootState {
    points: PointType[];
    cargo: CargoType;
    contacts: ContactsType;
}


function App() {

    const [appState, setAppState] = useState<RootState>({
        points: [],
        cargo: {
            weight: "",
            length: "",
            height: "",
            width: "",
            comment: "",
            forwarder: false,
        },
        contacts: {
            firstName: '',
            secondName: '',
            phoneNumber: '',
            paymentType: ''
        },
    });

    const addPoint = (newPoint: PointType) => {
        setAppState((prevState) => {
            const existingPointIndex = prevState.points.findIndex(point => point.pointName === newPoint.pointName);

            if (existingPointIndex !== -1) {

                const updatedPoints = [...prevState.points];
                updatedPoints[existingPointIndex] = newPoint;

                return {
                    ...prevState,
                    points: updatedPoints,
                };
            } else {
                return {
                    ...prevState,
                    points: [...prevState.points, newPoint],
                };
            }

        })
    };

    const addCargo = (newCargo: CargoType) => {
        setAppState((prevState) => ({
            ...prevState,
            cargo: newCargo
        }))
    };

    const addContacts = (newContacts: ContactsType) => {
        setAppState((prevState) => ({
            ...prevState,
            contacts: newContacts
        }));
    };

    

    return (
        <>
            <Header />
            <h2 className='header-order'>Замовити</h2>
            <div style={{ display: 'flex',flexWrap: 'wrap', justifyContent: 'space-between', margin: '0 3.906vw', gap: '50px' }}>
                <Routes addPoint={addPoint} addCargo={addCargo} addContacts={addContacts}/>
                <MapsCredentials points={appState.points} appState={appState}/>
            </div>
            <Footer/>
        </>
    );
}

export default App;
