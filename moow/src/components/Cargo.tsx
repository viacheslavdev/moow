import React, { useEffect, useState } from 'react'
import { CargoType } from '../App'

const Cargo: React.FC<{ addCargo: (newCargo: CargoType) => void }> = ({addCargo}) => {

    const [weight, setWeight] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    
    const [comment, setComment] = useState<string>('');
    const [forwarder, setForwarder] = useState<boolean>(false);

    useEffect(() => {
        addCargo({
            weight,
            length,
            height,
            width,
            comment,
            forwarder
        })
    }, [weight, length, width, height, comment, forwarder])


    const workValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^[0-9]*$/;

        if (regex.test(inputValue)) {
            return true;
        } else {
            return false;
        }
    }

    const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const counter = e.target.value.length;

        if (counter <= 4000) {
            setComment(e.target.value);
        }
    }


    return (
        <div className='cargo'>
            <h3>Про вантаж</h3>
            <div className="cargo-wrapper">
                <div className="cargo-weight">
                    <span className="cargo-weight-desc">Вага вантажу (кг)</span>
                    <input type="text" value={weight} onChange={(e) => {
                        if (workValidator(e)) {
                            setWeight(e.target.value)
                        }
                    }} />
                </div>
                <div className="dimensions">
                    <span className="dimensions-desc">Габарит вантажу ДШВ (м)</span>
                    <div className="dimentions-size">
                        <input type="text" value={length} onChange={(e) => {
                            if (workValidator(e)) {
                                setLength(e.target.value)
                            }
                        }} />
                        <span>x</span>
                        <input type="text" value={width} onChange={(e) => {
                            if (workValidator(e)) {
                                setWidth(e.target.value)
                            }
                        }} />
                        <span>x</span>
                        <input type="text" value={height} onChange={(e) => {
                            if (workValidator(e)) {
                                setHeight(e.target.value)
                            }
                        }} />
                    </div>
                </div>
            </div>
            <div className="cargo-comments">
                <h4>Коментар до замовлення</h4>
                <textarea placeholder='Укажіть інформацію про груз, що перевозите...' value={comment} onChange={(e) => commentChangeHandler(e)} />
                <span className="length-counter">{comment.length} / 4 000</span>
            </div>
            <div className="forwarder" onClick={() => setForwarder(!forwarder)}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <g clipPath="url(#clip0_0_2089)">
                        <rect x="1.58331" y="1.58333" width="21.8333" height="21.8333" rx="2.58333" stroke="#7E7E7E" />
                        <rect x="3.33331" y="3.33333" width="18.3333" height="18.3333" rx="1.66667" fill={forwarder ? "#665CD1" : "#00000"} />
                    </g>
                    <defs>
                        <clipPath id="clip0_0_2089">
                            <rect width="25" height="25" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <h3>Послуга експедитора</h3>
            </div>
        </div>
    )
}

export default Cargo
