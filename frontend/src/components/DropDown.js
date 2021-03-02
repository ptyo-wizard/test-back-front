import React from "react";

function DropDown({ data, setOption }) {
  //const [option, setOption] = useState('');
  const handleChange = (event) => {
    //console.log("valor de option",event.target.value)
    setOption(event.target.value);
  };
  return (
    <div className="form-group">
      <label className='text-secondary'>Metodo de envio</label>
      <select className="form-control" onChange={handleChange}>
        {data.map((item) => {
          return (
            <option key={`csv${item.id}`} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropDown;
