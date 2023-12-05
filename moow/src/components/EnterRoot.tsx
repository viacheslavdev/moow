import React, { useState, useRef, useEffect } from 'react'
import CalendarComponent from './CalendarComponent';
import { PointType } from '../App';
import { Coordinates } from './Route';



export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const EnterRoot: React.FC<{addPoint: (newPoint: PointType) => void}> = ({addPoint}) => {

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [calendarDate, setCalendarDate] = useState<string | undefined>('');

    const [address, setAddress] = useState<string>("");
    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: undefined,
        lng: undefined
    })

    const [workTime, setWorkTime] = useState<string>('');
    const [arriveTime, setArriveTime] = useState<string>('');

    useEffect(() => {
        addPoint({
            pointName: 'A',
            pointDate: calendarDate,
            workTime: Number(workTime),
            address,
            comingTime: arriveTime,
            coordinates
        })
        
    }, [calendarDate, address, coordinates, workTime, arriveTime])

    const googleAuto = useRef(null);



    useEffect(() => {
        if (window.google && window.google.maps && googleAuto.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                googleAuto.current,
                { types: ['address'] }
            );

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                const lat = place.geometry?.location?.lat()
                const lng = place.geometry?.location?.lng()
                setCoordinates({ lat, lng })
                const formatted_address = place.formatted_address
                setAddress(formatted_address as string)
            });
        }
    },[])


    const workValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^[0-9]*$/;

        if (regex.test(inputValue)) {
            setWorkTime(inputValue);
        }
    }

    const arriveValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        const regex =  /^[0-9:]*$/;
                      


        if (inputValue.length <= 5 && regex.test(inputValue)) {
            setArriveTime(inputValue);
        } else {
            console.log('Invalid time format');
        }

    };

    const formatDateString = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const changeDate = (date: Value): void => {
        if (date instanceof Date) {
            setCalendarDate(formatDateString(date));
        } else if (Array.isArray(date) && date.length > 0 && date[0] instanceof Date) {
            const selectedDate = date[0];
            setCalendarDate(formatDateString(selectedDate));
        } else {
            setCalendarDate(undefined);
        }

    }

    const handleShowCalendar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target instanceof HTMLImageElement) {
            setShowCalendar(!showCalendar);
        }

    }



    return (
        <>
            <h3 className="routes-header">Маршрут</h3>
            <div className="enter-root">
                <h3>Точка А</h3>
                <div className="enter-block">
                    <div className="enter-date">
                        <span>Дата</span>

                        <div className="enter-date-choose">
                            <span className="route-desc">{calendarDate}</span>
                            <div className="calendar" onClick={(e) => { handleShowCalendar(e) }}>
                                <img src="/assets/calendar.svg" alt="calendar" />
                                {showCalendar && <CalendarComponent
                                    locale='uk'
                                    onChange={(value, event) => changeDate(value)}
                                />}
                            </div>
                        </div>
                    </div>
                    <div className="time-info">
                        <span >Час роботи (год)</span>
                        <input type="text" value={workTime} onChange={(e) => workValidator(e)} className="route-desc work-time" />
                    </div>

                    <div className="route-address">
                        <span>Адреса</span>
                        <div className="route-address-choose">
                            <input className="route-desc" ref={googleAuto} placeholder="Введіть адресу" />
                            <div className="address">
                                <img src="/assets/map-icon.svg" alt="adress" />
                            </div>
                        </div>
                    </div>

                    <div className="time-info">
                        <span>Час прибуття</span>
                        <input className="route-desc hour-arrive" value={arriveTime} onChange={(e) => arriveValidator(e)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnterRoot