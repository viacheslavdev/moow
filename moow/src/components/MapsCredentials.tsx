import React, { useEffect, useState } from 'react'
import { PointType, RootState } from '../App';

declare global {
    interface Window {
        google: {
            maps: {
                Map: any;
                Marker: any;
                DirectionsService: any;
                DirectionsRenderer: any;
            };
        };
    }
}

interface MapsCredentialsProps {
    points: PointType[]
    appState: RootState
}

const MapsCredentials: React.FC<MapsCredentialsProps> = ({ points, appState }) => {


    const [totalDistance, setTotalDistance] = useState(0);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (window.google && window.google.maps) {
            initMap()
        }
    }, [appState.points]);



    useEffect(() => {
        const distancePrice = totalDistance * 10;

        const totalWorkTime = appState.points.reduce((acc, point) => acc += point.workTime, 0);
        setTotalWorkTime(totalWorkTime);
        const workTimePrice = totalWorkTime * 200;
        setTotalPrice(distancePrice +  workTimePrice + 2000);
    }, [appState, totalDistance]);



    function calculateTotalDistance(coords: google.maps.LatLngLiteral[]): number {
        let totalDistance = 0;

        for (let i = 0; i < coords.length - 1; i++) {
            const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
                new window.google.maps.LatLng(coords[i]),
                new window.google.maps.LatLng(coords[i + 1])
            );
            totalDistance += distanceInMeters;
        }

        return Math.round(totalDistance / 1000); // Переводим расстояние в километры
    };

    function initMap() {
        const mapOptions = {
            center: { lat: 50.4504, lng: 30.5245 },
            zoom: 11,
        };

        const customMarker = {
            url: '/assets/map-marker.svg',
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40),
        }

        const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

        // Массив с координатами для маркеров
        const markerCoordinates: any[] = points
            .filter(point => typeof point.coordinates.lat === 'number' && typeof point.coordinates.lng === 'number')
            .map(point => point.coordinates);



        // Создаем маркеры для каждой координаты
        if (markerCoordinates.length > 0) {
            markerCoordinates.forEach((coord: any, index: any) => {
                const marker = new window.google.maps.Marker({
                    position: coord,
                    map: map,
                    title: `Маркер ${index + 1}`,
                    icon: customMarker,
                    zIndex: 1000
                });
            });
        }

        if (markerCoordinates.length === 1) {
            map.panTo(markerCoordinates[0]);
        }

        // DirectionsService и DirectionsRenderer
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: '#9b96e1',
                zIndex: 1000
            }
        });
        directionsRenderer.setMap(map);

        // Указываем начальную и конечную точки для маршрута
        if (markerCoordinates.length >= 2) {


            const start = markerCoordinates[0];
            const end = markerCoordinates[markerCoordinates.length - 1];

            // Промежуточные точки (исключая начальную и конечную)
            const waypoints = markerCoordinates.slice(1, -1).map((coord: any) => ({
                location: new window.google.maps.LatLng(coord.lat, coord.lng),
                stopover: true,
            }));

            // Запрос на построение маршрута
            const request = {
                origin: new window.google.maps.LatLng(start.lat, start.lng),
                destination: new window.google.maps.LatLng(end.lat, end.lng),
                waypoints: waypoints,
                travelMode: window.google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (response: any, status: any) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                    const distance = calculateTotalDistance(markerCoordinates);
                    setTotalDistance(distance);
                } else {
                    console.error(`Directions request failed: ${status}`);
                }
            });
        }

    };

    return (
        <div className="maps">
            <div className="maps-wrapper">
                <img src="/assets/product-card.svg" alt="product-card" />
                <div className="google-map" id="map"></div>
                <ul className="maps-info">
                    <ul className="maps-info-values">
                        <li className="value-name">Подача транспотру </li>
                        <li className="value-price">2000 грн</li>
                    </ul>
                    <ul className="maps-info-values">
                        <li className="value-name">Маршрут загрузка - вигрузка</li>
                        <li className="value-price">{totalDistance * 10} грн</li>
                    </ul>
                    <ul className="maps-info-values">
                        <li className="value-name">Послуги експедитора</li>
                        <li className="value-price">{appState.cargo.forwarder ? 200 : 0} грн</li>
                    </ul>
                    <ul className="maps-info-values">
                        <li className="value-name">Послуги грузчиків</li>
                        <li className="value-price">{totalWorkTime * 200} грн</li>
                    </ul>
                    <ul className="maps-info-values">
                        <li className="value-name">2 грузчиків</li>
                        <li className="value-price">200 грн/год</li>
                    </ul>
                    <ul className="maps-info-values">
                        <li className="value-name">Зайнятість</li>
                        <li className="value-price">{totalWorkTime} години</li>
                    </ul>
                </ul>
                <div className="full-price">
                    <h3>Повна ціна</h3>
                    <span className="price-uah">{totalPrice + (appState.cargo.forwarder ? 200 : 0)} грн</span>
                </div>
                <div className="post">
                    <button className="post-button button-static">
                        Оформити
                    </button>
                </div>
            </div>
        </div>
    )
};

export default MapsCredentials;