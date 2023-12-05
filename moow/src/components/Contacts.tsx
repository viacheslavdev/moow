import React, { useEffect, useState } from 'react'
import { ContactsType } from '../App'

const Contacts: React.FC<{ addContacts: (newContacts: ContactsType) => void }> = ({ addContacts }) => {

    const [firstName, setFirstName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [paymentType, setPaymentType] = useState<string>('');


    useEffect(() => {
        addContacts({
            firstName,
            secondName,
            phoneNumber,
            paymentType
        })
    }, [firstName, secondName, phoneNumber, paymentType])

    const namesValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Zа-яА-Я']*$/;
        return regex.test(e.target.value);
    }

    const phoneNumberValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9+() ]*$/;
        return regex.test(e.target.value);
    };

    return (
        <div className='contacts'>
            <h3>Контактні дані</h3>
            <div className="contacts-info">
                <div className="contacts-wrapper">
                    <span className="contacts-wrapper-header ">Прізвище</span>
                    <input className="second-name-value route-desc" type="text" value={secondName} onChange={(e) => {
                        if (namesValidator(e)) {
                            setSecondName(e.target.value)
                        }
                    }} />
                </div>
                <div className="contacts-wrapper">
                    <span className="contacts-wrapper-header">Номер телефона</span>
                    <input className="phone-number-value route-desc" type="text" value={phoneNumber} onChange={(e) => {
                        if (phoneNumberValidator(e)) {
                            setPhoneNumber(e.target.value)
                        }
                    }} />
                </div>
                <div className="contacts-wrapper">
                    <span className="contacts-wrapper-header">Ім’я</span>
                    <input className="first-name-value route-desc" type="text" value={firstName} onChange={(e) => {
                        if (namesValidator(e)) {
                            setFirstName(e.target.value)
                        }
                    }} />
                </div>
            </div>
            <div className="payment">
                <h3>Оплата</h3>
                <div className="payment-wrapper">
                    <div className="cash-before" onClick={() => paymentType === 'cash-before' ? setPaymentType('') : setPaymentType('cash-before')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <g clipPath="url(#clip0_0_2101)">
                                <rect x="1.58331" y="1.58334" width="21.8333" height="21.8333" rx="10.9167" stroke="#7E7E7E" strokeWidth="1.5" />
                                <rect x="3.33331" y="3.33334" width="18.3333" height="18.3333" rx="9.16667" fill={paymentType === 'cash-before' ? '#665CD1' : 'none'} />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_2101">
                                    <rect width="25" height="25" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="payment-method">Готівка перед завантаженням</span>
                    </div>
                    <div className="cash-after" onClick={() => paymentType === 'cash-after' ? setPaymentType('') : setPaymentType('cash-after')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <g clipPath="url(#clip0_0_2101)">
                                <rect x="1.58331" y="1.58334" width="21.8333" height="21.8333" rx="10.9167" stroke="#7E7E7E" strokeWidth="1.5" />
                                <rect x="3.33331" y="3.33334" width="18.3333" height="18.3333" rx="9.16667" fill={paymentType === 'cash-after' ? '#665CD1' : 'none'} />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_2101">
                                    <rect width="25" height="25" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="payment-method">Готівка перед розвантаженням</span>
                    </div>

                    <div className="safe-moow" onClick={() => paymentType === 'safe-moow' ? setPaymentType('') : setPaymentType('safe-moow')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="25" viewBox="0 0 25 25" fill="none">
                            <g clipPath="url(#clip0_0_2101)">
                                <rect x="1.58331" y="1.58334" width="21.8333" height="21.8333" rx="10.9167" stroke="#7E7E7E" strokeWidth="1.5" />
                                <rect x="3.33331" y="3.33334" width="18.3333" height="18.3333" rx="9.16667" fill={paymentType === 'safe-moow' ? '#665CD1' : 'none'} />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_2101">
                                    <rect width="25" height="25" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="payment-method">Безпечна угода через MOOW</span>
                        <span className="cards">Visa / MasterCard</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts

