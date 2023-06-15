import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const list = localStorage.getItem("Todo");
  if (list) {
    return JSON.parse(list);
  }
  
  else {
    return [];
  }
};

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add data to the items
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the input box");
    } 
    else if(inputData && toggleButton)
  {
    setItems(items.map((curEle)=>{
      if(curEle.id === isEditItem)
      {
        return {...curEle, name: inputData};
      }
      return curEle;
    }));
    setInputData("");
    setIsEditItem(null);
    setToggleButton(false);
    
  }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  //delete items
  const deleteItem = (index) => {
    const updateItem = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updateItem);
  };
  //remove all the elements
  const removeAll = () => {
    setItems([]);
  };
  //edit items
  const editItem = (index) => {
    const item_todo_edited = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //adding local storage
  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="app-section">
          <div className="top">
            <div className="heading">My Todo App</div>
            <div className="input-section">
              <input
                type="text"
                placeholder="Add Items"
                value={inputData}
                onChange={(event) => setInputData(event.target.value)}
              />
              {toggleButton ? (
                <i className="fa-solid fa-pen-to-square"  onClick={addItem}></i>
                
              ) : (
                <button className="button" onClick={addItem}>
                  add
                </button>
              )}
            </div>
          </div>
          <div className="bottom">
            <div className="todo-section">
              {items.map((curEle, index) => {
                return (
                  <div className="todo" key={curEle.id}>
                    <p>{curEle.name}</p>
                    <div className="button-section">
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => editItem(curEle.id)}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteItem(curEle.id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="button clear" onClick={removeAll}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
