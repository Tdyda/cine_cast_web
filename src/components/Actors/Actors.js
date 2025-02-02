import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import api from '../axiosConfig';


const Actors = ({ onSelect, className }) => {
  const [options, setOptions] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "80%",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 2px #fff" : "none",
      textAlign: "center",
      backgroundColor: "#2E2B2B",
      border: state.isFocused ? "1px solid #fff" : "1px solid #fff",
      transform: "translateX(12.5%)",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#fff",
      backgroundColor: state.isSelected ? "#555" : state.isFocused ? "#333" : "#2E2B2B",
      textAlign: "center",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2E2B2B",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "80%",
      transform: "translateX(12.5%)"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await api.get('/actors/get-actors');
        const fetchedActors = response.data.$values;

        const formattedOptions = fetchedActors.map((actor) => ({
          value: actor.name,
          label: actor.name,
        }));
        setOptions(formattedOptions);
      } catch (err) {
        console.error('Error fetching actors', err);
      }
    };

    fetchActors();
  }, []);

  return (
    <Select
      options={options}
      onChange={(selectedOption) => onSelect(selectedOption.value)}
      isSearchable
      placeholder="Wybierz aktora..."
      noOptionsMessage={() => "Brak wyników"}
      styles={customStyles}
    />
  );
};

export default Actors;
