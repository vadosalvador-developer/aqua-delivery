import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import '../Auth/Auth.scss';

const Auth: React.FC = () => {
  //редирект на личный кабинет
  let history = useHistory();
  const handleClick = () => {
    history.push('/cabinet');
  };

  const onSubmit = useCallback((values: String) => {
    const bodyRequest = JSON.stringify(values);
    //post запрос для авторизации
    axios
      .post('https://api.aqua-delivery.ru/v1/auth/login', bodyRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        if (data.success === false) {
          alert(data.message);
        } else if (data.success === true) {
          let answer = JSON.stringify(data.data);
          localStorage.setItem('user', answer);
          handleClick();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="form">
          <h3 className="form__title">Авторизация</h3>
          <div className="form__wrapper">
            <Field
              name="login"
              component="input"
              type="text"
              placeholder="Введите логин"
              className="form__input"
            />
            <Field
              name="password"
              component="input"
              type="text"
              placeholder="Введите пароль"
              className="form__input"
            />
            <div className="form__remember">
              <Field name="remember" component="input" type="checkbox" id="remember" />
              <label htmlFor="remember">Запомнить меня</label>
            </div>
            <button type="submit" className="form__button">
              Войти
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default Auth;
