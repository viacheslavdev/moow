import React, {useState, useEffect, useRef} from 'react'
import { PointType } from '../App'

interface RouteProps {
    pointName: string
}

export interface Coordinates {
    lat: number | undefined
    lng: number | undefined
}


const Route: React.FC<RouteProps & {addPoint: (newPoint: PointType) => void}> = ({pointName, addPoint}) => {

    const [workTime, setWorkTime] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: undefined,
        lng: undefined
    });

    useEffect(() => {
        addPoint({
            pointName,
            workTime: Number(workTime),
            address,
            coordinates
        })
    }, [workTime, address, coordinates]);

    const timeValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setWorkTime(value);
          }
    };

    const googleAuto = useRef(null);

    useEffect(() => {
        if (window.google && window.google.maps && googleAuto.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                googleAuto.current,
                { types: ['address'],  },
            );

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                const lat = place.geometry?.location?.lat();
                const lng = place.geometry?.location?.lng();
                setCoordinates({ lat, lng });
                const formatted_address = place.formatted_address;
                setAddress(formatted_address as string);
            });
        }
    }, []);

  return (
    <div className="enter-root">
            <h3>Точка {pointName}</h3>
            <div className="added-block">
                <div className="route-address">
                    <span>Адреса</span>
                    <div className="route-address-choose">
                        <input className="route-desc" defaultValue={address} placeholder="Введіть адресу" ref={googleAuto}/>
                        <div className="address">
                            <img src="/assets/map-icon.svg" alt="adress" />
                        </div>
                    </div>
                </div>
                <div className="time-info">
                    <span >Час роботи (год)</span>
                    <input type="text" value={workTime} onChange={(e) => timeValidator(e)} className="route-desc work-time"/>
                </div>
                
            </div>
        </div>
  )
}

export default Route;