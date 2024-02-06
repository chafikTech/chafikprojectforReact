import { useState } from "react";
import data from "./accordian/data";
import "./styles.css";

export default function Accourdian() {
  const [selectd, setSelectd] = useState(null);
  const [enableMultiSelection, setEnableMultiSelectio] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelectd(getCurrentId === selectd ? null : getCurrentId);
  }

  function handleMultiSelector(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelectio(!enableMultiSelection)}>
        Enable Multi Selection{" "}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelector(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelection ? 
                multiple.indexOf(dataItem.id) !== -1 &&(
                <div className="content">{dataItem.answer}</div>
                ) 
                : selectd === dataItem.id && (
                <div className="content">{dataItem.answer}</div>
                )
              }
              {/* {selectd === dataItem.id || */}
              {/* multiple.indexOf(dataItem.id) !== -1 ? ( */}
              {/*   <div className="content">{dataItem.answer}</div> */}
              {/* ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found ! </div>
        )}
        ;
      </div>
    </div>
  );
}
