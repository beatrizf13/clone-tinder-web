import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import notlike from '../../assets/notlike.svg';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params._id,
        },
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params._id]);

  async function handleLike(_id) {
    await api.post(`/devs/${_id}/likes`, null, {
      headers: {
        user: match.params._id,
      },
    });
  }

  async function handleNotLike(_id) {
    await api.post(`/devs/${_id}/notlikes`, null, {
      headers: {
        user: match.params._id,
      },
    });

    setUsers(users.filter(user => user._id !== _id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      { users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleNotLike(user._id)}>
                  <img src={notlike} alt="notlike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty"><p>It's over!</p></div>
      ) }
    </div>
  );
}
