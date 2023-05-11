import "./NavSet.css"
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { orderCards, reset, actDogs, searchDogById, searchDogs } from '../../redux/actions/actions.js';
import { filter } from "../../utils/funcFilters.js";

export default function NavSet() {
  const [lifeSpan, setLifeSpan] = useState([false, false, false]);
  const [size, setSize] = useState([false, false, false, false]);
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((s) => s);

  function handleOrder(e) {
    e.preventDefault();
    const { value } = e.target;
    dispatch(orderCards(value));
  };

  function onSearch(data) {
    let nameOrId = data.trim().replace(/\s+/g, '');
    const idRegex = /^(\d+|[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})$/i;
    if (idRegex.test(nameOrId)) {
      const id = /^\d+$/.test(nameOrId) ? parseInt(nameOrId) : nameOrId;
      dispatch(searchDogById(id));
    } else {
      dispatch(searchDogs(nameOrId));
    };
  };

  function handleChange (event) {
     setData(event.target.value);
  };

  async function handleFilter(e) {
    const { tempsFiltD } = state;
    const { id, checked } = e.target;

    let newDShow = [...tempsFiltD];
    let inputAPI = document.getElementById("origin1");
    let inputCreate = document.getElementById("origin2");
    if (id === "origin1" && checked) {
      inputCreate.checked = false;
      newDShow = newDShow.filter((dog) => Number.isInteger(dog.id));
      dispatch(actDogs(newDShow));
    } else if (id === "origin2" && checked) {
      inputAPI.checked = false;
      newDShow = newDShow.filter((dog) => !Number.isInteger(dog.id));
      dispatch(actDogs(newDShow));
    };
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
    };
    const index = indexMap[id];
    let newsToShow;
    if (index !== undefined) {
        if (checked) {
        newLS[index] = true;
        newS[index - 3] = true;
        } else {
        newLS[index] = false;
        newS[index - 3] = false;
        };
      setLifeSpan(newLS);
      setSize(newS);
      newsToShow = await filter(newDShow, newLS, newS);
    } else {
      newsToShow = newDShow;
    };
    dispatch(actDogs(newsToShow));
  };
  
  function resetBttn() {
    dispatch(reset());
    setLifeSpan([false, false, false]);
    setSize([false, false, false, false]);
    for (let i = 1; i < 8; i++) {
      let input = document.getElementById(`switch${i}`);
      input.checked = false;
    };
    document.getElementsByClassName("");
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
              value="Api" 
              id="origin1" />
            <label htmlFor="origin1" />
          </div>
          <div>
            <p>Created</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="Created" 
              id="origin2" />
            <label htmlFor="origin2" />
          </div>
        </div>
      <h2>Properties</h2>
        <div className='properties'>
          <div>
            <h3>Name or Id</h3>
            <input
              onChange={ handleChange }
              type="text"
              name="search"
              value={ data }
              placeholder="Write here..."
              id="search" />
            <button onClick={ ()=>onSearch(data) }>Search</button>
          </div>
          <h3>Life Span</h3>
          <div>
            <p>8 or less</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="1" 
              id="switch1" />
            <label htmlFor="switch1" />
          </div>
          <div>
            <p>from 9 to 12</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="2" 
              id="switch2" />
            <label htmlFor="switch2" />
          </div>
          <div>
            <p>13 or more</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="3" 
              id="switch3" />
            <label htmlFor="switch3" />
          </div>
          <h3>Size</h3>
          <div>
            <p>Toy</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="toy" 
              id="switch4" />
            <label htmlFor="switch4" />
          </div>
          <div>
            <p>Small</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="small" 
              id="switch5" />
            <label htmlFor="switch5" />
          </div>
          <div>
            <p>Medium</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="medium" 
              id="switch6" />
            <label htmlFor="switch6" />
          </div>
          <div>
            <p>Large</p>
            <input 
              onChange={ handleFilter } 
              type="checkbox" 
              value="large" 
              id="switch7" />
            <label htmlFor="switch7" />
          </div>
        </div>
      <button onClick={ resetBttn } >
          Reset
      </button>
    </div>
  )
}
