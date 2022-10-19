import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const ENDPOINT = 'https://swapi.dev/api/planets';
      const { results } = await fetch(ENDPOINT).then((response) => response.json());
      results.filter((planet) => delete (planet.residents));
      setPlanets(results);
    };
    getPlanets();
  }, []);

  const handleFilterName = ({ target }) => {
    setFilterName(target.value);
  };

  const contextValue = useMemo(() => ({
    planets,
    filterName,
    handleFilterName,
  }), [planets, filterName]);

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
