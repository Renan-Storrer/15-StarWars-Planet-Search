import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    stats,
    optionsColumn,
    activeOptions,
    handleChangeFilters,
    handleChangeSort,
    handleClickFilterStats,
    setPlanetsSort,
    removeFilter,
  } = useContext(MyContext);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar Planeta por Nome"
        data-testid="name-filter"
        onChange={ handleChangeFilters }
      />
      <div>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChangeFilters }
          value={ stats.column }
        >
          {
            optionsColumn.map((option) => <option key={ option }>{option}</option>)
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleChangeFilters }
          value={ stats.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="filterValue"
          onChange={ handleChangeFilters }
          value={ stats.filterValue }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilterStats }
        >
          Filtrar
        </button>

        <span>Ordernar:</span>
        <select
          data-testid="column-sort"
          name="orderColumn"
          onChange={ handleChangeSort }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="orderType"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="ASC"
            onChange={ handleChangeSort }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="orderType"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="DESC"
            onChange={ handleChangeSort }
          />
          Decescente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ setPlanetsSort }
        >
          Ordernar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => removeFilter('all') }
        >
          Remover Filtros
        </button>
      </div>
      <div>
        {
          activeOptions.map((element) => (
            <div key={ element.column } data-testid="filter">
              <p>
                {`${element.column} | ${element.comparison} |  ${element.filterValue}`}
              </p>
              <button type="button" onClick={ () => removeFilter(element.column) }>
                Delete
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Filters;
