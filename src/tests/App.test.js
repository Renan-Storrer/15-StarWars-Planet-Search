import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import renderWithContext from './renderWithContext';
import { act } from 'react-dom/test-utils';
import Filters from '../components/Filters';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());

describe('Testes de requisição da API', () => {
  test('Realiza uma requisição para a API, testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();

    const inputPlanet = screen.getByTestId('name-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });

    expect(inputPlanet).toBeInTheDocument;
    expect(selectColumn).toBeInTheDocument;
    expect(btnFilter).toBeInTheDocument;

    userEvent.type(inputPlanet, 'Ta');
    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();

    userEvent.selectOptions(selectColumn, ['population']);
    userEvent.selectOptions(comparisonFilter, ['maior que']);
    userEvent.type(inputValueFilter, "1000");

    userEvent.click(btnFilter);

    expect(await screen.findByText('Tatooine')).toBeInTheDocument();

    userEvent.selectOptions(selectColumn, ['orbital_period']);
    userEvent.selectOptions(comparisonFilter, ['menor que']);
    userEvent.type(inputValueFilter, "402");

    userEvent.click(btnFilter);

    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
  });
});

describe('Faz mais testes', () => {
  test('Testa filtros', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    await act(async () => {
      renderWithContext(<App />);
    });

    expect(global.fetch).toHaveBeenCalled();

    const selectColumn = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(selectColumn, ['orbital_period']);
    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(inputValueFilter, "304");

    userEvent.click(btnFilter);

    const btnDelete = await screen.findByRole('button', { name: /excluir/i });

    expect(btnDelete).toBeInTheDocument();

    userEvent.click(btnDelete);

  });
});
