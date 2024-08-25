import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./App.css";
function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post(
        "http://localhost:8080/bfhl",
        parsedData
      ); // Adjust the URL as needed
      setResponseData(response.data);
    } catch (error) {
      alert("Invalid JSON input or server error.");
    }
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div>
        {selectedOptions.some((option) => option.value === "alphabets") && (
          <div>
            <strong>Alphabets:</strong> {responseData.alphabets.join(", ")}
          </div>
        )}
        {selectedOptions.some((option) => option.value === "numbers") && (
          <div>
            <strong>Numbers:</strong> {responseData.numbers.join(", ")}
          </div>
        )}
        {selectedOptions.some(
          (option) => option.value === "highest_lowercase_alphabet"
        ) && (
          <div>
            <strong>Highest Lowercase Alphabet:</strong>{" "}
            {responseData.highest_lowercase_alphabet.join(", ")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON, e.g., { "data": ["A","C","z"] }'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {responseData && (
        <>
          <h2>Select Data to Display</h2>
          <Select isMulti options={options} onChange={handleChange} />
          <div>{renderResponse()}</div>
        </>
      )}
    </div>
  );
}

export default App;
