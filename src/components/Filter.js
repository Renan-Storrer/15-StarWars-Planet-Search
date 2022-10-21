import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    stats,
    optionsColumn,
    activeOptions,
    handleChangeFilters,
    handleClickFilterStats,
    removeFilter,
  } = useContext(Context);

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
