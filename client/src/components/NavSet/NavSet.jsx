import "./NavSet.css"
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { orderCards, filterCards, reset, actDogs } from '../../redux/actions/actions.js';
import { filter } from "../../utils/funcFilters.js";

export default function NavSet() {
  const [lifeSpan, setLifeSpan] = useState([false, false, false, false]);
  const [size, setSize] = useState([false, false, false, false]);
  const dispatch = useDispatch();
  const state = useSelector((s) => s);

  function handleOrder(e) {
    e.preventDefault();
    const { value } = e.target;
    dispatch(orderCards(value));
  };

  async function handleFilter(e) {/* 
    dispatch(filterCards(e.target)); */
    const { allDogs, allFavs/* , lifeSpan, size */ } = state;
    
    const { id, checked } = e.target;
    const newLS = [...lifeSpan];
    const newS = [...size];
    const indexMap = {
      switch1: 0,
      switch2: 1,
      switch3: 2,
      switch4: 3,
      switch5: 4,
      switch6: 5,
      switch7: 6,
      switch8: 7,
    };
    const index = indexMap[id];
    if (index !== undefined) {
        if (checked) {
        newLS[index] = true;
        newS[index - 4] = true;
        } else {
        newLS[index] = false;
        newS[index - 4] = false;
        }
    }
    setLifeSpan(newLS);
    setSize(newS);
  
    const newsToShow = await filter(allDogs, allFavs, newLS, newS);
    console.log("newsToShow", newsToShow)
    
    dispatch(actDogs(newsToShow));
  };
  

  function resetBttn() {
      dispatch(reset());
  };

  return (
    <div className="NavSet">
      <h3>Alphabetical Order</h3>
      <select onChange={ handleOrder } name="order" defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled={ true } >DEFAULT</option>
        <option value="Ascendente">A-Z</option>
        <option value="Descendente">Z-A</option>
      </select>
      <h2>Origin</h2>
        <div className='origin'>
          <div>
            <p>Api</p>
            <input
              onChange={ handleFilter } 
              type="checkbox" 
              value="Alive" 
              id="irigin1" />
            <label htmlFor="irigin1" />
          </div>
          <div>
            <p>Created</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="Dead" 
              id="origin2" />
            <label htmlFor="origin2" />
          </div>
        </div>
      <h2>Properties</h2>
        <div className='properties'>
          <div>
            <h3>Name or Id</h3>
            <input
              type="text" 
              value=""
              placeholder="Write here..."
              id="search" />
            <button>Search</button>
          </div>
          <h3>Life Span</h3>
          <div>
            <p>Less than 12</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="1" 
              id="switch1" />
            <label htmlFor="switch1" />
          </div>
          <div>
            <p>Between 13 and 15</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="2" 
              id="switch2" />
            <label htmlFor="switch2" />
          </div>
          <div>
            <p>Between 16 and 18</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="3" 
              id="switch3" />
            <label htmlFor="switch3" />
          </div>
          <div>
            <p>More than 19</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="4" 
              id="switch4" />
            <label htmlFor="switch4" />
          </div>
          <h3>Size</h3>
          <div>
            <p>Toy</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="5" 
              id="switch5" />
            <label htmlFor="switch5" />
          </div>
          <div>
            <p>Small</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="6" 
              id="switch6" />
            <label htmlFor="switch6" />
          </div>
          <div>
            <p>Medium</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="7" 
              id="switch7" />
            <label htmlFor="switch7" />
          </div>
          <div>
            <p>Large</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="8" 
              id="switch8" />
            <label htmlFor="switch8" />
          </div>
        </div>
      <button onClick={ resetBttn } >
          Reset
      </button>
    </div>
  )
}
