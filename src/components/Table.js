import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { planets, filteredPlanets } = useContext(MyContext);
  return (
    <table>
      <thead>
        <tr>
          {
            planets.length > 0 && (
              Object.keys(planets[0]).map((element) => <th key={ element }>{element}</th>)
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets.length > 0 && (
            filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.map((film) => <p key={ film }>{film}</p>)}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  );
}

export default Table;
