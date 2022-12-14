import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test the <Login.js /> pages', () => {
  it('Verifica se existe um input name e email', ()=> {
    renderWithRouter(<App />);
    const inputName = screen.getByLabelText(/nome:/i);
    const inputEmail = screen.getByLabelText(/email:/i);
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  })
  it(`Verifica se existe um botão "Play" e se ele está desabilitado
  quando os inputs estiverem vazios`, () => {
    renderWithRouter(<App />);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    const email = 'email@email.com';
    const inputEmail = screen.getByLabelText(/email:/i);
    userEvent.type(inputEmail, email);
    const inputName = screen.getByLabelText(/nome:/i);
    userEvent.type(inputName, 'F');
    expect(buttonPlay).toBeEnabled();
  })
  it('Verifica se ao clicar em "Play" a página é redirecionada para "/games"', () => {
    const { history } = renderWithRouter(<App />);
    
    const inputName = screen.getByLabelText(/nome:/i);
    userEvent.type(inputName, 'F');
    const email = 'email@email.com';
    const inputEmail = screen.getByLabelText(/email:/i);
    userEvent.type(inputEmail, email);

    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.click(buttonPlay);

    const { pathname } = history.location;

    expect(pathname).toBe('/game');
  })
  it(`Verifica se existe um botão "Settings" e se ele redireciona 
  para a pagina "/Settings"`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonSetting = screen.getByRole('button', {  name: /settings/i})
    expect(buttonSetting).toBeInTheDocument();

    userEvent.click(buttonSetting);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings'); 
  })
})