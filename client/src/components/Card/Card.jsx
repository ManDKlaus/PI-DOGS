import "./Card.css";
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeDog, addFav, removeFav } from '../../redux/actions/actions';

export default function Card({ dog }) {
  const dispatch = useDispatch();

  const tempsText = dog.temperaments?.join(", ");

  function handleFavorite () {
    if(dog.isFav !== true){
      dog.isFav = true;
      dispatch(addFav(dog.id));
    } else {
      dog.isFav = false;
      dispatch(removeFav(dog.id));
    };
  };

  function handleCreate () {
    dispatch(removeDog(dog.id));
  };

  return (
    <div className='Card' >
      <a href='#Details' className={ dog.isFav === true ? 'selected' : ''} >
        <img src={ dog.image } alt={ dog.name } />
        <h3 className="name">{ dog.name }</h3>
        <div>
          <h4>Temperaments: </h4>
          <h3>{ tempsText }</h3>
        </div>
        <div>
          <h4>Weight: </h4>
          <h3>{ dog.weight }</h3>
        </div>
      </a>
      {
        dog.isFav === true ? (
          <button
            cursor="pointer"
            className="izq"
            onClick={ handleFavorite }>
              ❤️
          </button>
        ) : (
          <button
            cursor="pointer"
            className="izq"
            onClick={ handleFavorite }>
              🤍
          </button>
        )
      }
      {
        !dog.created ? null : <button
        cursor="pointer"
        className="izq"
        onClick={ handleCreate }>
          🗑
      </button>
      }
    </div>
  )
}
