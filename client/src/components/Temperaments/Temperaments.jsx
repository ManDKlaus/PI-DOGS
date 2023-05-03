import './Temperaments.css';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { filterTemps } from '../../redux/actions/actions';

export default function Temperaments() {
  const { temperaments } = useSelector(s => s);
  const [page, setPage] = useState(1);
  const [temps, setTemps] = useState([]);
  const dispatch = useDispatch();

  const handleTemperament = (temperament) => {
    const tempsExist = temps.find(t => t === temperament.name);
    let newTemp;
    if (tempsExist) {
      newTemp = temps.filter(t => t !== temperament.name);
    } else {
      newTemp = [...temps, temperament.name];
    }
    setTemps([...newTemp]);
  };  

  const handleSearch = () => {
    dispatch(filterTemps(temps));
  };

  const temperamentsToShow = temperaments.slice((page - 1) * 31, page * 31);

  const temperamentElements = temperamentsToShow.map((temperament) => (
    <li key={temperament.id} onClick={() => handleTemperament(temperament)} className={temps.includes(temperament.name) ? 'selected' : ''}>
      { temperament.name }
    </li>
  ));  

  const paginationElements = [];
  for (let i = 1; i <= Math.ceil(temperaments.length / 31); i++) {
    paginationElements.push(
      <button key={i} onClick={() => setPage(i)} className={ page === i ? 'selected' : '' } >{i}</button>
    );
  }

  return (
    <div className='Temperaments' >
      <div>
        <h2>Choose the temperaments you want</h2>
        <p>Keep in mind that you will be shown dogs below according to the temperaments you select here.</p>
      </div>
      <ul>
        { temperamentElements }
      </ul>
      <div className='Pagination'>
        { paginationElements }
      </div>
      <a href="#dogs" >
        <button id="searchT" onClick={ handleSearch } >Search</button>
      </a>
    </div>
  )
}
