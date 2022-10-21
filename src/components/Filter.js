import React, { useContext } from 'react';
import Input from './Input';
import Select from './Select';
import Context from '../context/Context';

const OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const OPERATOR_OPTIONS = ['maior que', 'menor que', 'igual a'];

function Filter() {
  const {
    nameFilter,
    valueFilter,
    columnFilter,
    operatorFilter,
    handleNameFilter,
    handleValueFilter,
    handleColumnFilter,
    handleOperatorFilter,
    submitFilter,
  } = useContext(Context);

  return (
    <div>
      <div>
        <Input
          name="name"
          placeholder="Filtre pelo nome"
          type="text"
          value={ nameFilter }
          onChange={ handleNameFilter }
          dataTestid="name-filter"
        />
      </div>
      <div>
        <Select
          label="Coluna"
          name="coluna"
          onChange={ handleColumnFilter }
          value={ columnFilter }
          options={ OPTIONS }
          dataTestid="column-filter"
        />
      </div>
      <div>
        <Select
          label="Operador"
          name="operador"
          onChange={ handleOperatorFilter }
          value={ operatorFilter }
          options={ OPERATOR_OPTIONS }
          dataTestid="comparison-filter"
        />
      </div>
      <div>
        <Input
          name="valueFilter"
          type="number"
          value={ valueFilter }
          onChange={ handleValueFilter }
          placeholder="Nº"
          dataTestid="value-filter"
        />
      </div>
      <div>
        <button
          type="button"
          onClick={ (e) => submitFilter(e) }
          data-testid="button-filter"
        >
          FILTRAR
        </button>
      </div>
    </div>
  );
}

export default Filter;
