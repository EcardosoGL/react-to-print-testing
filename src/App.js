import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./App.css";

const TableRow = ({ index }) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{`Name ${index + 1}`}</td>
    <td>{`Email${index + 1}@example.com`}</td>
  </tr>
);

const PrintButton = ({ triggerPrint }) => (
  <button onClick={triggerPrint}>Print Table</button>
);

const App = () => {
  const componentRef = useRef(null);
  const [stylePage,setStylePage] = React.useState("");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,    
    onBeforeGetContent: () => {
      console.log("Before print");
      const textareas = document.querySelectorAll('textarea');
      console.log(textareas);
      textareas.forEach((textarea) => {
        textarea.style.height = textarea.scrollHeight + 100 + 'px';
      });
    },
    onAfterPrint: () => {
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach((textarea) => {
        textarea.style.height = 'auto';
      });
    },
    //pageStyle: stylePage,     
  });

  useEffect(() => {
    setStylePage(`@page { size: 297mm ${document.body.scrollHeight}px; }`);    
  }, [document.body.scrollHeight]);

  return (
    <div className="App print-agreement" ref={componentRef}>
      <PrintButton triggerPrint={handlePrint} />
      <h1>React-to-Print Demo</h1>
      <button style={{ margin: "10px" }}>Test 1</button>
      <button style={{ margin: "10px" }}>Test 2</button>
      <button style={{ margin: "10px" }}>Test 3</button>
      <br />
      <div>
        <textarea style={{ width: "100%"  }} />
      </div>
      
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(300)].map((_, index) => (
            <TableRow key={index} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
