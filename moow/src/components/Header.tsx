import React from 'react'

const Header: React.FC = () => {
    return (
        <header>
            <div className="header-wrapper">
                <div className="logo-header">
                    <img src="/assets/logo.svg" alt="logo" />
                </div>
                <div className="category">
                    <span className="category-button button-static">
                        Категорії
                    </span>
                </div>
                <div className="search">
                    <input type="text" className="search-input" />
                    <img src="/assets/search-button.svg" alt="search-button" />
                </div>
                <div className="post">
                    <button className="post-button button-static">
                        Створити оголошення
                    </button>
                </div>
                <div className="icons-header">
                    <div className="icons-group">
                        <img src="/assets/message-icon.svg" alt="message" />
                        <img src="/assets/company-icon.svg" alt="company" />
                        <img src="/assets/user-icon.svg" alt="user" />
                        <img src="/assets/notification-icon.svg" alt="notification" />
                        <img src="/assets/more-icon.svg" alt="more" />
                    </div>
                    <div className="language-selector">
                        <span>УКР</span>
                        <img src="/assets/arrow-down-icon.svg" alt="arrow" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header