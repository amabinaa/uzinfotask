import React from 'react';
import './LeaderboardTable.css';

const LeaderboardTable = ({ users, categories, counts }) => {
    const getCount = (userId, categoryId) => {
        const match = counts.find(
            (c) => Number(c.user_id) === Number(userId) && Number(c.category_id) === Number(categoryId)
        );
        return match ? match.count : 0;
    };

    const getUserTotal = (userId) => {
        return categories.reduce((sum, cat) => sum + getCount(userId, cat.id), 0);
    };

    const sortedUsers = [...users].sort(
        (a, b) => getUserTotal(b.id) - getUserTotal(a.id)
    );

    const categoryTotals = categories.map(cat =>
        users.reduce((sum, user) => sum + getCount(user.id, cat.id), 0)
    );

    const grandTotal = categoryTotals.reduce((sum, val) => sum + val, 0);

    return (
        <div className="table-wrapper">
            <h2>Рейтинг участников</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ФИО</th>
                        {categories.map((cat) => (
                            <th key={cat.id}>{cat.name}</th>
                        ))}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {user.avatar && (
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            width={24}
                                            height={24}
                                            style={{ borderRadius: '50%', marginRight: 8 }}
                                        />
                                    )}
                                    {user.first_name} {user.last_name}
                                </div>
                            </td>
                            {categories.map((cat) => (
                                <td key={cat.id}>{getCount(user.id, cat.id)}</td>
                            ))}
                            <td>{getUserTotal(user.id)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="2"><strong>Общее</strong></td>
                        {categoryTotals.map((val, i) => (
                            <td key={i}><strong>{val}</strong></td>
                        ))}
                        <td><strong>{grandTotal}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardTable;



