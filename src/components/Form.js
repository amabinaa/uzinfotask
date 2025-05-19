import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Form.css';

const Form = ({ users, categories, counts, onSetCount }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedUser && selectedCategory) {
      const found = counts.find(
        (c) =>
          c.user_id === selectedUser.value && c.category_id === selectedCategory.value
      );

      setInputValue(found ? found.count : '0');
    } else {
      setInputValue('');
    }
  }, [selectedUser, selectedCategory, counts]);

  const handleSet = () => {
    if (selectedUser && selectedCategory && inputValue !== '') {
      onSetCount(selectedUser.value, selectedCategory.value, parseInt(inputValue));
    }
  };

  return (
    <div className="form-card">
      <h2>Форма заявки</h2>
      <div className="form-fields">
        <Select
          placeholder="User"
          options={users.map((u) => ({
            label: `${u.first_name} ${u.last_name}`,
            value: u.id }))}
          onChange={setSelectedUser}
        />
        <Select
          placeholder="Category"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          onChange={setSelectedCategory}
        />
        <input
          type="number"
          placeholder="Count"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSet}>SET</button>
      </div>
    </div>
  );
};

export default Form;

