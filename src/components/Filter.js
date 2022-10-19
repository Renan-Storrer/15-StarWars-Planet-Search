import React, { useContext } from 'react';
import Input from './Input';
import Context from '../context/Context';

function Filter() {
  const { filterName, handleFilterName } = useContext(Context);
  return (
    <div>
      <Input
        name="name"
        value={ filterName }
        onChange={ handleFilterName }
        type="text"
        placeholder="Pesquise pelo nome"
        dataTestid="name-filter"
      />
    </div>
  );
}

export default Filter;
