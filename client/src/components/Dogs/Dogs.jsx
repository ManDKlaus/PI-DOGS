import './Dogs.css';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import NavSet from '../NavSet/NavSet.jsx';
import Card from '../Card/Card.jsx';

export default function Dogs() {
  const { dogsShow, favShow } = useSelector(s => s);
  const [pageDogs, setPageDogs] = useState(1);
  const [pageFavs, setPageFavs] = useState(1);
  const [numDogs, setNumDogs] = useState(8);

  const handleNumDogs = (e) => {
    setNumDogs(e.target.value);
  }
  
  const dogsToShow = dogsShow?.slice((pageDogs - 1) * 8, pageDogs * 8);
  const favsToShow = favShow?.slice((pageFavs - 1) * numDogs, pageFavs * numDogs);

  const dogsView = dogsToShow?.map((dog) => (
    <li key={ dog.id } >
      <Card dog={ dog } />
    </li>
  ));

  const favsView = favsToShow?.map((fav) => (
    <li key={ fav.id + "b" } >
      <Card dog={ fav } />
    </li>
  ));

  const paginationDogs = [];
  for (let i = 1; i <= Math.ceil(dogsShow?.length / 8); i++) {
    paginationDogs.push(
      <button key={i + "a"} onClick={() => setPageDogs(i)} className={ pageDogs === i ? 'selected' : '' } >{i}</button>
    );
  };

  const paginationFavs = [];
  for (let i = 1; i <= Math.ceil(favShow?.length / numDogs); i++) {
    paginationFavs.push(
      <button key={i + "b"} onClick={() => setPageFavs(i)} className={ pageFavs === i ? 'selected' : '' } >{i}</button>
    );
  };

  return (
    <div className='Dogs'>
      <NavSet />
      <div className='container'>
        <h2>Choose your favorites</h2>
        <ul>
          { dogsView }
        </ul>
        <div className='paginate' >
          { paginationDogs }
        </div>
        <div id="titleFav">
          <h3>Favorites </h3>
          <label htmlFor="numShow">Show:</label>
          <select onChange={ handleNumDogs } name="numShow" id="numShow" defaultValue={"8"}>
            <option value="8" >8</option>
            <option value="16">16</option>
            <option value="24">24</option>
          </select>
        </div>
        <ul>
          { favsView }
        </ul>
        <div className='paginate' >
          { paginationFavs }
        </div>
      </div>
    </div>
  )
}
