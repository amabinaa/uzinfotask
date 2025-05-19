import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
             <nav className="nav-links">
                <a href="#reja">Reja</a>
                <a href="#qabul">Qabul qilish talablari</a>
                <a href="#korsatmalar">Korsatmalar</a>
                <a href="#saralash">Saralash</a>
            </nav>

            <div className="right-section">
                <span className="lang">O'zbek Tili ▼</span>
                <button className="test-btn">Sinovdan o'ting</button>
            </div>
        </header>
    );
};

export default Header;
