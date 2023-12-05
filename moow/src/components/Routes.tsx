import React, {useState} from 'react'
import EnterRoot from './EnterRoot'
import Route from './Route'
import Cargo from './Cargo'
import Contacts from './Contacts'
import { CargoType, ContactsType, PointType } from '../App'

export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y' , 'Z']




const Routes: React.FC<{ addPoint: (newPoint: PointType) => void; addCargo: (newCargo: CargoType) => void; addContacts: (newContacts: ContactsType) => void}> = ({ addPoint, addCargo, addContacts }) => {


    const [routes, setRoutes] = useState<JSX.Element[]>([<Route key={1} pointName={alphabet[1]} addPoint={addPoint} />]);

    const addRoute = () => {
        const newRouteKey = routes.length + 1;
        setRoutes([...routes, <Route key={newRouteKey} pointName={alphabet[newRouteKey]} addPoint={addPoint} />]);
    };

    return (
        <div style={{width: 'auto'}}>
            <EnterRoot addPoint={addPoint}/>
            {routes}
            <div className="category" onClick={addRoute}>
                <span className="category-button button-static add-point">
                    Додати ще одну точку
                </span>
            </div>
            <Cargo addCargo={addCargo}/>
            <Contacts addContacts={addContacts}/>
        </div>
    )
};

export default Routes;