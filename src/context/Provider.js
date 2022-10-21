import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [stats, setStats] = useState({
    column: 'population',
    comparison: 'maior que',
    filterValue: 0,
  });

  const options = useMemo(() => (
    [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]
  ), []);

  const [optionsColumn, setOptionsColumn] = useState(options);

  const [activeOptions, setActiveOptions] = useState([]);

  const handleChangeFilters = useCallback(({ target }) => {
    const { value, name } = target;
    if (name !== '') {
      setStats({ ...stats, [name]: value });
    } else {
      const filter = planets.filter((planet) => planet.name.includes(value));
      setFilteredPlanets(filter);
    }
  }, [planets, stats]);

  const handleFilterOptions = useCallback((column, comparison, filterValue) => {
    const updateOptionsColumn = optionsColumn.filter((element) => element !== column);
    setOptionsColumn(updateOptionsColumn);
    setActiveOptions([...activeOptions, { column, comparison, filterValue }]);
    setStats({ ...stats, column: updateOptionsColumn[0] });
  }, [optionsColumn, activeOptions, stats, setStats]);

  const setRenderPlanets = useCallback((column, comparison, filterValue, planetsArr) => {
    let filter;
    if (comparison === 'maior que') {
      filter = planetsArr.filter((planet) => planet[column] > Number(filterValue));
    }
    if (comparison === 'menor que') {
      filter = planetsArr.filter((planet) => planet[column] < Number(filterValue));
    }
    if (comparison === 'igual a') {
      filter = planetsArr.filter((planet) => planet[column] === filterValue);
    }
    return filter;
  }, []);

  const handleClickFilterStats = useCallback(() => {
    const { column, comparison, filterValue } = stats;
    const filter = setRenderPlanets(column, comparison, filterValue, filteredPlanets);
    handleFilterOptions(column, comparison, filterValue);
    setFilteredPlanets(filter);
  }, [stats, filteredPlanets, setRenderPlanets, handleFilterOptions]);

  const removeFilter = useCallback((option) => {
    let updateActiveOptions;
    setFilteredPlanets(planets);

    if (option === 'all') {
      updateActiveOptions = [];
      setOptionsColumn([...options]);
      setActiveOptions(updateActiveOptions);
    } else {
      updateActiveOptions = activeOptions.filter((element) => (
        element.column !== option
      ));
      setActiveOptions(updateActiveOptions);
      setOptionsColumn([...optionsColumn, option]);
      if (activeOptions.length > 0) {
        updateActiveOptions.forEach((element) => {
          const { column, comparison, filterValue } = element;
          const filter = setRenderPlanets(column, comparison, filterValue, planets);
          setFilteredPlanets(filter);
        });
      }
    }
  }, [activeOptions, optionsColumn, options, planets, setRenderPlanets]);

  useEffect(() => {
    const getStarWarsPlanetsApi = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endpoint);
      const { results } = await response.json();
      const filteredResults = results.map((element) => {
        delete element.residents;
        return element;
      });
      setPlanets(filteredResults);
      setFilteredPlanets(filteredResults);
    };
    getStarWarsPlanetsApi();
  }, []);
  useEffect(() => {
  }, [setFilteredPlanets]);
  const contextValue = useMemo(() => ({
    planets,
    filteredPlanets,
    stats,
    optionsColumn,
    activeOptions,
    handleChangeFilters,
    handleClickFilterStats,
    removeFilter,
  }), [
    planets,
    filteredPlanets,
    stats,
    optionsColumn,
    activeOptions,
    handleChangeFilters,
    handleClickFilterStats,
    removeFilter,
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
