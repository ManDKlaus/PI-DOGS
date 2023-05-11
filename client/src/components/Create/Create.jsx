import "./Create.css";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrEditDog, editDog } from '../../redux/actions/actions';

export default function Create() {
  let [name, setName] = useState(undefined);
  let [image, setImage] = useState(undefined);
  let [minWeight, setMinWeight] = useState(undefined);
  let [maxWeight, setMaxWeight] = useState(undefined);
  let [minHeight, setMinHeight] = useState(undefined);
  let [maxHeight, setMaxHeight] = useState(undefined);
  let [minLifeSpan, setMinLifeSpan] = useState(undefined);
  let [maxLifeSpan, setMaxLifeSpan] = useState(undefined);
  let [temperaments, setTemperaments] = useState(undefined);

  const allTemperaments = useSelector((s) => s.temperaments);
  const { editable } = useSelector(s => s)
  const dispatch = useDispatch();

  if (editable.id && !Array.isArray(editable.weight)) {
    editable.weight = editable.weight.split(" - ");
    editable.height = editable.height.split(" - ");
    editable.lifeSpan = editable.lifeSpan.split(" - ").map(num => parseInt(num));
    let temp = [...editable.temperaments];
    temp.map((temperament) => {
      const option = document.querySelector(`#temperaments option[value="${temperament}"]`);
      option.selected = true;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDog = {
      name: name === undefined ? editable.name : name,
      image: image === undefined ? editable.image : image,
      weight: `${ minWeight === undefined ? editable.weight[0] : minWeight } - ${ maxWeight === undefined ? editable.weight[1] : maxWeight }`,
      height: `${ minHeight === undefined ? editable.height[0] : minHeight } - ${ maxHeight === undefined ? editable.height[1] : maxHeight}`,
      lifeSpan: `${ minLifeSpan === undefined ? editable.lifeSpan[0] : minLifeSpan } - ${ maxLifeSpan === undefined ? editable.lifeSpan[1] : maxLifeSpan} years`,
      temperaments: temperaments === undefined ? editable.temperaments : temperaments,
    };
    if (editable.id) newDog.id = editable.id;
    dispatch(createOrEditDog(newDog));
    dispatch(editDog({}));
    const form = document.querySelector('form');
    form.reset();
    setName(undefined)
    setImage(undefined);
    setMinWeight(undefined);
    setMaxWeight(undefined);
    setMinHeight(undefined);
    setMaxHeight(undefined);
    setMinLifeSpan(undefined);
    setMaxLifeSpan(undefined);
    setTemperaments(undefined)
  };

  /* const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  }; */

  return (
    <div className='Create'>
      <h2>{ editable.id ? "Edit Form" : "Creation Form" }</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={ name === undefined && editable?.name ? editable.name : undefined } onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="image">Image URL:</label>
        <input type="text" id="image" value={ image === undefined && editable?.image ? editable.image : undefined } /* accept="image/*" */ onChange={(e)=>setImage(e.target.value)} required />

        <div className="container" >
          <div>
            <label htmlFor="minWeight">Minimum Weight:</label>
            <input
              type="number"
              id="minWeight"
              min={0}
              max={999}
              step="0.10"
              value={ minWeight === undefined && editable?.weight ? editable.weight[0] : undefined } 
              onInput={(e) => setMinWeight(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="maxWeight">Maximum Weight:</label>
            <input
              type="number"
              min={0}
              max={999}
              step="0.01"
              id="maxWeight"
              value={ maxWeight === undefined && editable?.weight ? editable.weight[1] : undefined }
              onInput={(e) => setMaxWeight(e.target.value)} required />
          </div>
        </div>

        <div className="container" >
          <div>
            <label htmlFor="minHeight">Minimum Height:</label>
            <input
              type="number"
              min={0}
              max={999}
              step="0.01"
              id="minHeight"
              value={ minHeight === undefined && editable?.height ? editable.height[0] : undefined }
              onInput={(e) => setMinHeight(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="maxHeight">Maximum Height:</label>
            <input
              type="number"
              min={0}
              max={999}
              step="0.01"
              id="maxHeight"
              value={ maxHeight === undefined && editable?.height ? editable.height[1] : undefined }
              onInput={(e) => setMaxHeight(e.target.value)} required />
          </div>
        </div>

        <div className="container" >
          <div>
            <label htmlFor="minLifeSpan">Minimum Life Span:</label>
            <input
              type="number"
              id="minLifeSpan"
              min={0}
              max={99}
              value={ minLifeSpan === undefined && editable?.lifeSpan ? editable.lifeSpan[0] : undefined }
              onInput={(e) => setMinLifeSpan(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="maxLifeSpan">Maximum Life Span:</label>
            <input
              type="number"
              min={0}
              max={99}
              id="maxLifeSpan"
              value={ maxLifeSpan === undefined && editable?.lifeSpan ? editable.lifeSpan[1] : undefined }
              onInput={(e) => setMaxLifeSpan(e.target.value)} required />
          </div>
        </div>

        <label htmlFor="temperaments">Temperaments:</label>
        <select
          multiple
          id="temperaments"
          size={4}
          onChange={(e) => setTemperaments(Array.from(e.target.selectedOptions, option => option.value))}>
          {allTemperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
          ))}
        </select>

        <button type="submit">{ editable.id ? "Edit" : "Create" }</button>
    </form>
    </div>
  );
};
