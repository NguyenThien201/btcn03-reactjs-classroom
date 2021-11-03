import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

import "./App.css";

function App() {
  const [classes, setClasses] = useState([]);
  const [colors, setColors] = useState([]);
  const [className, setClassname] = useState(null);
  const [numberOfStudent, setNumberOfStudent] = useState(null);
  useEffect(() => {
    fetchClasses()
    setColors([
      ...[
        "#FF6900",
        "#FCB900",
        "#7BDCB5",
        "#00D084",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF",
      ],
    ]);
  }, []);

  const fetchClasses = () => { 
    axios
    .get("https://young-waters-19699.herokuapp.com/getClass")
    .then((response) => {        
      setClasses([...response.data.reverse()]);
    });
  }
  const handleClassname = (e) => {
    setClassname(e.target.value);
  };

  const handleNumberOfStudent = (e) => {
    setNumberOfStudent(e.target.value);
  };

  const postAddClass = () => {
    if (!className || !numberOfStudent) {
      return;
    }
    axios
      .post("https://young-waters-19699.herokuapp.com/addClass", {
        class: className,
        numberOfStudent: numberOfStudent,
      })
      .then((response) => {fetchClasses()});
  };
  return (
    <div>
      <div class="header">
        <di class="title" v>
          Super bad UI Classroom
        </di>
        <div class="title2">Tên lớp</div>
        <input
          class="input-field"          
          value={className}
          onChange={(e) => handleClassname(e)}
        />
        <div class="title2">Sỉ số</div>
        <input
          class="input-field"
          type="number"
          value={numberOfStudent}
          onChange={(e) => handleNumberOfStudent(e)}
        />
        <button class="button" onClick={() => postAddClass()}>
          Thêm lớp
        </button>
      </div>
      <div class="grid">
        {classes.map((d, index) => (
          <div
            class="item"
            style={{ backgroundColor: colors[index % colors.length] }}
            key={d.id}
          >
            <div class="classname">{d.class}</div>
            <br/>
            <div class="classStudents">Sỉ số: {d.numberOfStudent}</div>             
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
