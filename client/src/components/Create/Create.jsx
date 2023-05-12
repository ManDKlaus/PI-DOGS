import "./Create.css";
import { useState, useEffect } from 'react';
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
  let [temperaments, setTemperaments] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(false);

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
      temperaments: temperaments === [] ? editable.temperaments : temperaments,
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
    setTemperaments([]);
    setButtonVisible(false);
  };

  const handleInputFocus = (e) => {
    const container = e.target.closest('[data-container]');
    const paragraphs = container.querySelectorAll('p');    
    paragraphs.forEach((p) => {
      p.style.display = 'block';
    });
  };

  useEffect(() => {
    function handleInvalidCharacter(event, stateFunction) {
      const inputValue = event.target.value;
      const {id} = event.target;
      if(id === "minLifeSpan" || id === "maxLifeSpan") {
        if (inputValue !== undefined) {
          const regex = /^(\d{0,2})?$/;
          const isValidValue = regex.test(inputValue);    
          if (!isValidValue) {
            stateFunction(inputValue.slice(0, -1));
          };
        };
      } else {
        if (inputValue !== undefined) {
          const regex = /^(\d{0,3})(\.(\d{0,2}))?$/;
          const isValidValue = regex.test(inputValue);    
          if (!isValidValue) {
            stateFunction(inputValue.slice(0, -1));
          };
        };
      };
    };    
    handleInvalidCharacter({ target: { value: minWeight } }, setMinWeight);
    handleInvalidCharacter({ target: { value: maxWeight } }, setMaxWeight);
    handleInvalidCharacter({ target: { value: minHeight } }, setMinHeight);
    handleInvalidCharacter({ target: { value: maxHeight } }, setMaxHeight);
    handleInvalidCharacter({ target: { value: minLifeSpan, id: "minLifeSpan" } }, setMinLifeSpan);
    handleInvalidCharacter({ target: { value: maxLifeSpan, id: "maxLifeSpan" } }, setMaxLifeSpan);
    checkFields();
  }, [minWeight, maxWeight, minHeight, maxHeight, minLifeSpan, maxLifeSpan]);

  useEffect(() => {
    function handleMaxValue() {
      setMaxWeight((prevMaxWeight) => {
        const newMaxWeight = (minWeight !== undefined && (prevMaxWeight === undefined || parseInt(minWeight) >= prevMaxWeight)) ? parseInt(minWeight) + 1 : prevMaxWeight;
        return newMaxWeight !== undefined ? newMaxWeight.toString() : undefined;
      });
      setMaxHeight((prevMaxHeight) => {
        const newMaxHeight = (minHeight !== undefined && (prevMaxHeight === undefined || parseInt(minHeight) >= prevMaxHeight)) ? parseInt(minHeight) + 1 : prevMaxHeight;
        return newMaxHeight !== undefined ? newMaxHeight.toString() : undefined;
      });
      setMaxLifeSpan((prevMaxLifeSpan) => {
        const newMaxLifeSpan = (minLifeSpan !== undefined && (prevMaxLifeSpan === undefined || parseInt(minLifeSpan) >= prevMaxLifeSpan)) ? parseInt(minLifeSpan) + 1 : prevMaxLifeSpan;
        return newMaxLifeSpan !== undefined ? newMaxLifeSpan.toString() : undefined;
      });
    };
    handleMaxValue();
  }, [minWeight, minHeight, minLifeSpan]);

  function handleMinValue() {
    setMinWeight((prevMinWeight) => {
      const newMinWeight = (maxWeight !== undefined && (prevMinWeight === undefined || parseInt(maxWeight) <= prevMinWeight)) ? parseInt(maxWeight) - 1 : prevMinWeight;
      return newMinWeight !== undefined ? newMinWeight.toString() : undefined;
    });
    setMinHeight((prevMinHeight) => {
      const newMinHeight = (maxHeight !== undefined && (prevMinHeight === undefined || parseInt(maxHeight) <= prevMinHeight)) ? parseInt(maxHeight) - 1 : prevMinHeight;
      return newMinHeight !== undefined ? newMinHeight.toString() : undefined;
    });
    setMinLifeSpan((prevMinLifeSpan) => {
      const newMinLifeSpan = (maxLifeSpan !== undefined && (prevMinLifeSpan === undefined || parseInt(maxLifeSpan) <= prevMinLifeSpan)) ? parseInt(maxLifeSpan) - 1 : prevMinLifeSpan;
      return newMinLifeSpan !== undefined ? newMinLifeSpan.toString() : undefined;
    });
  };

  function handleInputBlur(e) {
    const container = e.target.closest('[data-container]');
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((p) => {
      p.style.display = 'none';
    });
    const { id } = e.target;
    if (id === "maxWeight") {
      handleMinValue();
    } else if (id === "maxHeight") {
      handleMinValue();
    } else if (id === "maxLifeSpan") {
      handleMinValue();
    };
    checkFields();
  };

  /* const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  }; */

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleOptionClick = (event, option) => {
    event.stopPropagation();
    const index = temperaments.indexOf(option);
    if (index === -1) {
      setTemperaments([...temperaments, option]);
    } else {
      setTemperaments([...temperaments.slice(0, index), ...temperaments.slice(index + 1)]);
    };
    checkFields();
  };

  const checkFields = () => {
    if (name !== undefined && image !== undefined && minWeight !== undefined && maxWeight !== undefined && minHeight !== undefined && maxHeight !== undefined && minLifeSpan !== undefined && maxLifeSpan !== undefined && temperaments !== null) {
      setButtonVisible(true);
    };
  };

  return (
    <div className='Create'>
      <h2>{ editable.id ? "Edit Form" : "Creation Form" }</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={ name === undefined && editable?.name ? editable.name : name } onInput={(e) => setName(e.target.value)} required />

        <label htmlFor="image">Image URL:</label>
        <input type="text" id="image" value={ image === undefined && editable?.image ? editable.image : image } /* accept="image/*" */ onInput={(e)=>setImage(e.target.value)} required />

        <div className="container" >
          <div>
            <label htmlFor="minWeight">Minimum Weight:</label>
            <div data-container >
              <p>numbers only</p>
              <input
                type="text"
                id="minWeight"
                /* min={0}
                max={999}
                step="0.10" */
                value={ minWeight === undefined && editable?.weight ? editable.weight[0] : minWeight } 
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
                onInput={(e) => setMinWeight(e.target.value)} required />
              <p>3 digits with 2 decimal places only</p>
            </div>
          </div>
          <div>
            <label htmlFor="maxWeight">Maximum Weight:</label>
            <div data-container >
              <p>numbers only</p>
              <input
                type="text"
                /* min={0}
                max={999}
                step="0.01" */
                id="maxWeight"
                value={ maxWeight === undefined && editable?.weight ? editable.weight[1] : maxWeight }
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
                onInput={(e) => setMaxWeight(e.target.value)} required />
              <p>3 digits with 2 decimal places only</p>
            </div>
          </div>
        </div>

        <div className="container" >
          <div>
            <label htmlFor="minHeight">Minimum Height:</label>
            <div data-container >
              <p>numbers only</p>
              <input
                type="text"
                /* min={0}
                max={999}
                step="0.01" */
                id="minHeight"
                value={ minHeight === undefined && editable?.height ? editable.height[0] : minHeight }
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
                onInput={(e) => setMinHeight(e.target.value)} required />
              <p>3 digits with 2 decimal places only</p>
            </div>
          </div>
          <div>
            <label htmlFor="maxHeight">Maximum Height:</label>
            <div data-container >
              <p>numbers only</p>
              <input
                type="text"
                /* min={0}
                max={999}
                step="0.01" */
                id="maxHeight"
                value={ maxHeight === undefined && editable?.height ? editable.height[1] : maxHeight }
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
                onInput={(e) => setMaxHeight(e.target.value)} required />
              <p>3 digits with 2 decimal places only</p>
            </div>
          </div>
        </div>

        <div className="container" >
          <div>
            <label htmlFor="minLifeSpan">Minimum Life Span:</label>
            <div data-container >
              <p>numbers only</p>
              <input
                type="text"
                id="minLifeSpan"
                /* min={0}
                max={99} */
                value={ minLifeSpan === undefined && editable?.lifeSpan ? editable.lifeSpan[0] : minLifeSpan }
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
                onInput={(e) => setMinLifeSpan(e.target.value)} required />
              <p>2 digits from 0 to 99</p>
            </div>
          </div>
          <div>
            <label htmlFor="maxLifeSpan">Maximum Life Span:</label>
            <div data-container >
              <p>numbers only</p>
              <input
                type="text"
                /* min={0}
                max={99} */
                id="maxLifeSpan"
                value={ maxLifeSpan === undefined && editable?.lifeSpan ? editable.lifeSpan[1] : maxLifeSpan }
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
                onInput={(e) => setMaxLifeSpan(e.target.value)} required />
              <p>2 digits from 0 to 99</p>
            </div>
          </div>
        </div>

        <label htmlFor="temperaments">Temperaments:</label>
        <select
          multiple
          id="temperaments"
          size={4}
          onMouseDown={ handleMouseDown }
          value={ temperaments }
          onChange={(e) => setTemperaments(Array.from(e.target.selectedOptions, option => option.value))}>
          {allTemperaments.map((temperament) => (
            <option
              key={temperament.id}
              value={temperament.name}
              onClick={(e) => handleOptionClick(e, temperament.name)} >
                {temperament.name}
            </option>
          ))}
        </select>
        <a href="#details">
          { buttonVisible && <button type="submit">{ editable.id ? "Edit" : "Create" }</button> }
        </a>
    </form>
    </div>
  );
};
