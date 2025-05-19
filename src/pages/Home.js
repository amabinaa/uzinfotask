import React, { useEffect, useState } from 'react';
import { getUsers, getCategories, getCounts } from '../services/api';
import Header from '../components/Header';
import Form from '../components/Form';
import LeaderboardTable from '../components/LeaderboardTable';
import './Home.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [counts, setCounts] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [userData, categoryData, countData] = await Promise.all([
                    getUsers(),
                    getCategories(),
                    getCounts(),
                ]);
                setUsers(userData);
                setCategories(categoryData);
                setCounts(countData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchAllData();
    }, []);


    const handleSetCount = (userId, categoryId, newCount) => {
        const updatedCounts = [...counts];
        const existing = updatedCounts.find(
            (item) => item.user_id === userId && item.category_id === categoryId
        );


        if (existing) {
            existing.count = newCount;
        } else {
            updatedCounts.push({ user_id: userId, category_id: categoryId, count: newCount });

        }

        setCounts(updatedCounts);
        setUpdateTrigger(!updateTrigger);
    };


    return (
        <div className="homepage">
            <Header />

            <header className="hero-section">
                <img src="/assets/html5.png" alt="HTML5" className="hero-icon html-icon" />
                <img src="/assets/figma.png" alt="Figma" className="hero-icon figma-icon" />
                <img src="/assets/python.png" alt="Python" className="hero-icon python-icon" />
                <img src="/assets/flutter.png" alt="Flutter" className="hero-icon flutter-icon" />
                <img src="/assets/dart.png" alt="Dart" className="hero-icon dart-icon" />

                <h1 className="hero-title">
                    Ваша работа мечты уже ждет вас,<br />начните сегодня!
                </h1>

                <div className="people-section">
                    <div className="avatar-group">
                        <img src="/assets/avatar1.png" alt="User 1" className="avatar" />
                        <img src="/assets/avatar2.png" alt="User 2" className="avatar" />
                        <img src="/assets/avatar3.png" alt="User 3" className="avatar" />
                        <div className="avatar badge">+120</div>
                    </div>
                    <span className="join-text">
                        человек уже стали участниками группы по своим направлениям
                    </span>
                </div>

                <button className="apply-btn">Оставить заявку</button>
            </header>

            <section className="info-section">
                <div className="info-row">
                    <div className="info-text">
                        <h2>Сайт рыбатекст поможет дизайнеру, верстальщику</h2>
                        <p>
                            Siz IT o‘quv kursini tugatdingiz yoki Internet tarmog‘i orqali mustaqil o‘rgandingiz,
                            ammo ishga joylashishda qiyinchiliklarga uchrayapsizmi? Biz sizga yordam beramiz.
                            Ushbu loyiha qobiliyatli yoshlarni topib, yetuk kadrlari bo‘lib yetishishiga yordam
                            berish uchun tashkil qilindi.
                        </p>
                    </div>
                    <div className="info-images">
                        <img src="/assets/info1.png" alt="Info 1" />
                        <img src="/assets/info2.png" alt="Info 2" />
                    </div>
                </div>

                <div className="info-row reverse">
                    <div className="info-images single">
                        <img src="/assets/info3.png" alt="Info 3" />
                    </div>
                    <div className="info-text">
                        <h2>
                            Aksariyat kompaniyalar ishga joylashishda sizdan ish staji va portfolio so‘raydi
                        </h2>
                        <p>
                            Tabiiyki endigina bu soha kirib kelayotgan internetlarda bo‘lar mavjud emas.
                            Ma’lum bir ish stajiga ega bo‘lish va turli xil ajoyib loyihalardan iborat portfolio
                            hosil qilish uchun ushbu loyihada amaliyot o‘tashni taklif qilamiz. <br />
                            Amaliyotchilar soni chegaralangan va konkurs asosida saralab olinadi. Eng yuqori
                            ball to‘plagan 10 kishi bepul amaliyot o‘tash imkoniyatiga ega bo‘ladi.
                        </p>
                    </div>
                </div>
            </section>

            <section className="form-section">
                <Form
                    users={users}
                    categories={categories}
                    counts={counts}
                    onSetCount={handleSetCount}
                />
            </section>

            <section className="table-section">
                <LeaderboardTable
                    users={users}
                    categories={categories}
                    counts={counts}
                    updated={updateTrigger}
                />
            </section>

            <footer className="footer">
                <p>Copyright ©2025. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

