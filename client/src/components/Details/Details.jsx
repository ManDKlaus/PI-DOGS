import "./Details.css";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeDog, addFav, removeFav, seeDetails, editDog } from '../../redux/actions/actions';


export default function Details() {
  const dispatch = useDispatch();
  const { details, dogsShow } = useSelector(s => s);

  const tempsText = details.temperaments?.join(", ");  

  function handleFavorite () {
    if(details.isFav !== true){
      details.isFav = true;
      dispatch(addFav(details.id));
    } else {
      details.isFav = false;
      dispatch(removeFav(details.id));
    };
  };

  function editCreation () {
    dispatch(editDog(details));
  };

  function removeCreation () {
    dispatch(removeDog(details.id));
  };

  function prevOrNext (e) {
    const buttonid = e.target.parentNode.id;
    let position = dogsShow.indexOf(details);
    if(buttonid === "right") {
      position++;
    } else {
      position--;
    };
    if (dogsShow[position]) {
      dispatch(seeDetails(dogsShow[position]));
    };
  };

  return (
    <div className={ details.isFav === true ? 'Details selected' : 'Details' } >
      <button id="left" onClick={ prevOrNext } >
        <span className="material-symbols-rounded">
          arrow_back_ios_new
        </span>
      </button>
      <h2>{details.name} ({ details.size })</h2>
      <div className="container">
        <img src={details.image} alt={details.name} />
        <div className="data">
          <div>
            <h4>Temperaments:</h4>
            <h3>{ tempsText }</h3>
          </div>
          <div>
            <h4>Life Span:</h4>
            <h3>{ details.lifeSpan }</h3>
          </div>
          <div>
            <h4>Weight:</h4>
            <h3>{ details.weight } pounds</h3>
          </div>
          <div>
            <h4>Height:</h4>
            <h3>{ details.height } inches</h3>
          </div>
          {
            details.isFav === true ? (
              <button
                cursor="pointer"
                onClick={ handleFavorite }>
                  ❤️
              </button>
            ) : (
              <button
                cursor="pointer"
                onClick={ handleFavorite }>
                  🤍
              </button>
            )
          }
          {
            !details.created ? null : <button
            cursor="pointer"
            className="edit"
            onClick={ editCreation }>
              <span className="material-symbols-rounded">
                edit
              </span>
            </button>
          }
          {
            !details.created ? null : <button
            cursor="pointer"
            className="delete"
            onClick={ removeCreation }>
              <span className="material-symbols-rounded">
                delete
              </span>
            </button>
          }
        </div>
      </div>      
      <button id="right" onClick={ prevOrNext } >
        <span className="material-symbols-rounded">
          arrow_forward_ios
        </span>
      </button>
    </div>
  )
}
