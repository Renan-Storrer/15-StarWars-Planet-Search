import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [valueFilter, setValueFilter] = useState('0');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPlanet, setFilteredPlanet] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const ENDPOINT = 'https://swapi.dev/api/planets';
      const { results } = await fetch(ENDPOINT).then((response) => response.json());
      results.filter((planet) => delete (planet.residents));
      setPlanets(results);
      setFilteredPlanet(results);
      setIsLoading(false);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setFilteredPlanet(filteredPlanet.filter((el) => {
      switch (operatorFilter) {
      case 'maior que': return +el[columnFilter] > +valueFilter;
      case 'menor que': return +el[columnFilter] < +valueFilter;
      default: return +el[columnFilter] === +valueFilter;
      }
    }));
  }, [filters]);

  const handleNameFilter = ({ target }) => {
    setNameFilter(target.value);
  };

  const handleColumnFilter = ({ target }) => {
    setColumnFilter(target.value);
  };

  const handleOperatorFilter = ({ target }) => {
    setOperatorFilter(target.value);
  };

  const handleValueFilter = ({ target }) => {
    setValueFilter(target.value);
  };

  const contextValue = useMemo(() => ({
    planets,
    isLoading,
    nameFilter,
    valueFilter,
    columnFilter,
    operatorFilter,
    filteredPlanet,
    handleNameFilter,
    submitFilter: (e) => {
      e.preventDefault();
      if (!columnFilter || !valueFilter || !operatorFilter) return;
      const newFilter = {
        columnFilter,
        operatorFilter,
        valueFilter,
      };
      setFilters((prev) => [...prev, { ...newFilter }]);
    },
    handleValueFilter,
    handleColumnFilter,
    handleOperatorFilter,
    filters,
  }), [
    planets,
    isLoading,
    nameFilter,
    valueFilter,
    columnFilter,
    operatorFilter,
    filteredPlanet,
    filters,
  ]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
