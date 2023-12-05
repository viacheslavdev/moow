import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-wrapper">
                <img src="/assets/logo.svg" alt="logo" className="footer-logo" />
                <ul className="footer-sections">
                    <ul className="footer-column">
                        <img src="/assets/star.svg" alt="star" className="star" />
                        <ul className="footer-block">
                            <li className="footer-header footer-pointer">Сторінки</li>
                            <li className="footer-element footer-pointer" >Про нас</li>
                            <li className="footer-element footer-pointer">Про сервіс</li>
                            <li className="footer-element footer-pointer">FAQ</li>
                            <li className="footer-element footer-pointer">Команда</li>
                        </ul>
                    </ul>
                    <ul className="footer-column">
                        <img src="/assets/star.svg" alt="star" className="star" />
                        <ul className="footer-block">
                            <li className="footer-header footer-pointer">Контакти</li>
                            <li className="footer-element">
                                <img src="/assets/map.svg" alt="map" />
                                <span className="footer-pointer">Київ-03188</span>
                            </li>
                            <li className="footer-element">
                                <img src="/assets/mail.svg" alt="map" />
                                <span className="footer-pointer">moow.ltd@gmail.com</span>
                            </li>
                            <li className="footer-element">
                                <img src="/assets/telegram.svg" alt="map" />
                            </li>
                            <li className="footer-element">
                                <img src="/assets/viber.svg" alt="map" />
                            </li>
                        </ul>
                    </ul>
                    <ul className="footer-column">
                        <img src="/assets/star.svg" alt="star" className="star" />
                        <ul className="footer-block">
                            <li className="footer-header footer-pointer">Соціальні мережі</li>
                            <li className="footer-element">
                                <img src="/assets/facebook.svg" alt="facebook" />
                                <img src="/assets/instagram.svg" alt="instagram" />
                                <img src="/assets/youtube.svg" alt="youtube" />
                            </li>
                        </ul>
                    </ul>
                    <ul className="footer-column">
                        <img src="/assets/star.svg" alt="star" className="star" />
                        <ul className="footer-block">
                            <li className="footer-header footer-pointer">Документи</li>
                        </ul>
                    </ul>
                    <ul className="footer-column">
                        <ul className="footer-block">
                            <li className="footer-header app-header">Встанови безкоштовний додаток на смартфон</li>
                            <li className="footer-apps">
                                <img src="/assets/google-play.svg" alt="google-play" />
                                <img src="/assets/app-store.svg" alt="app-store" />
                            </li>
                            <li className="footer-payments">
                                <img src="/assets/visa.svg" alt="visa" />
                                <img src="/assets/master-card.svg" alt="master-card" />
                                <img src="/assets/liqpay.svg" alt="liqpay" />
                            </li>
                        </ul>
                    </ul>
                </ul>
                <div className="digital-info">©ТОВ «Діджітал інвест адвайзор», 2021-2023</div>
            </div>
        </footer>
    )
}

export default Footer