import "./Card.css";
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeDog, addFav, removeFav, seeDetails, editDog } from '../../redux/actions/actions';

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

  function editCreation () {
    dispatch(editDog(dog));
  };

  function removeCreation () {
    dispatch(removeDog(dog.id));
  };

  function showDetails () {
    dispatch(seeDetails(dog));
  };

  return (
    <div className='Card' >
      <a 
        href='#Details'
        onClick={ showDetails }
        className={ dog.isFav === true ? 'selected' : ''}
      >
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
            className="favA"
            onClick={ handleFavorite }>
              ❤️<span>remove</span>
          </button>
        ) : (
          <button
            cursor="pointer"
            className="favR"
            onClick={ handleFavorite }>
              🤍<span>add</span>
          </button>
        )
      }
      {
        !dog.created ? null : <button
        cursor="pointer"
        className="edit"
        onClick={ editCreation }>
          <span className="material-symbols-rounded">
            edit
          </span>
          <span>edit</span>
        </button>
      }
      {
        !dog.created ? null : <button
        cursor="pointer"
        className="delete"
        onClick={ removeCreation }>
          <span className="material-symbols-rounded">
            delete
          </span>
          <span> delete</span>
        </button>
      }
    </div>
  )
}
