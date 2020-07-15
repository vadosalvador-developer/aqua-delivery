import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import '../Page/Page.scss';

const Page: React.FC = () => {
  const [message, setMessage] = useState([]);

  const getAnswer = localStorage.getItem('user') || '';
  const jsonAnswer = JSON.parse(getAnswer);
  const getMassage = () => {
    let token = jsonAnswer.auth_key;
    axios
      .get('https://api.aqua-delivery.ru/v1/chat/get-messages?id=12233', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(({ data }) => {
        const message = data.data;
        const messageList = message.map((result: any) => {
          return (
            <li className="content__list-item">
              Сообщение {result.id}. {result.message}
            </li>
          );
        });
        setMessage(messageList);
      });
  };
  let userName = jsonAnswer.username;

  let history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  const logout = () => {
    localStorage.clear();
    handleClick();
  };
  return (
    <>
      <div className="title">
        <h1 className="title-hello">Здравствуй, {userName}</h1>
        <div className="title__button">
          <button className="title__button-message" onClick={getMassage}>
            Получить сообщения
          </button>
          <button className="title__button-logout" onClick={logout}>
            Выход
          </button>
        </div>
      </div>
      <div className="content">
        <ul className="content__list">{message}</ul>
      </div>
    </>
  );
};

export default Page;
