import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./SortingModify.css";
import Button from "@material-ui/core/Button";

const BAR_COLOR = "#01497c";
const COMPARISON_COLOR_RED = "red";
const SORT_COLOR_BLUE = "green";
const COMPARISON_COLOR_YELLOW = "yellow";

function SortingModify() {
  const [array, setArray] = useState([]);
  const [initaialState, setInitaialState] = useState([]);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    handleGenerateArray();
  }, []);

  const handleGenerateArray = () => {
    // const newArray = [];
    // const copyArray = [];
    const newArray = [
      280, 148, 283, 328, 166, 72, 327, 30, 18, 169, 150, 322, 262, 183, 167,
      309, 99, 258, 300, 296, 82, 121, 45, 67, 188, 187, 311, 168, 276, 201,
      313, 201, 333, 343, 81, 37, 219, 211, 189, 151, 287, 17, 324, 228, 276,
      16, 107, 181, 176, 273,
    ];
    // const newArray = [312, 247, 271, 374, 144];
    // const newArray = [25, 186, 269, 119, 440];
    // const newArray = [
    //   346, 198, 149, 263, 144, 135, 304, 207, 188, 223, 411, 216, 181, 430, 81,
    //   109, 156, 315, 390, 122, 199, 77, 127, 167, 345, 175, 27, 39, 10, 367,
    //   273, 235, 432, 269, 414, 361, 114, 161, 32, 268, 205, 77, 11, 113, 316,
    //   97, 372, 305, 172, 205,
    // ];
    // const l = 50;
    // for (let i = 0; i < l; i++) {
    //   newArray.push(Math.floor(Math.random() * (350 - 10 + 1)) + 10);
    // }
    console.log(newArray);
    const copyArray = Array.from(newArray);
    console.log("copy", copyArray);
    setArray(newArray);
    setInitaialState(copyArray);
    resetBarColor();
  };
  const resetBarColor = () => {
    const bar_style = document.getElementsByClassName("bar");
    const l = array.length;
    for (let i = 0; i < l; i++) {
      bar_style[i].style.backgroundColor = BAR_COLOR;
    }
  };
  // insertion sort modify -29/09/2021
  //   WORKING - 2/10/21
  function insertionSortOuter() {
    setDisabled(true);
    insertionSortModify();

    setDisabled(false);
  }
  function insertionSortModify() {
    console.log(array);
    const newArray = array;
    let l = newArray.length;
    const insertionAnimations = [];
    for (let i = 1; i < l; i++) {
      let j = i - 1;
      let x = newArray[i];
      while (j > -1 && newArray[j] > x) {
        newArray[j + 1] = newArray[j];
        insertionAnimations.push([j + 1, newArray[j], "*"]);
        j -= 1;
      }
      newArray[j + 1] = x;
      insertionAnimations.push([j + 1, x, "0"]);
    }
    console.log(insertionAnimations);

    // display animations
    const bar_style = document.getElementsByClassName("bar");
    for (let i = 0; i < insertionAnimations.length; i++) {
      let index1 = insertionAnimations[i][0];
      let index2 = insertionAnimations[i][1];
      let action = insertionAnimations[i][2];
      setTimeout(() => {
        // bar_style[0].style.backgroundColor = "green";
        if (action === "*") {
          bar_style[index1].style.height = `${index2}px`;
          console.log(bar_style[index1].style.height, index2);
          //   bar_style[index1].style.backgroundColor = "green";
        } else {
          bar_style[index1].style.height = `${index2}px`;
          console.log(bar_style[index1].style.height, index2);
          //   bar_style[index1].style.backgroundColor = "green";
        }
      }, i * 10);
    }
  }
  //   [25, 186, 269, 119, 440]
  //    [0,  1,   2,   3,   4]
  //    [25, 119,186,269, 440]
  //  (2,3),(1,2)

  //   WORKING - 03/10/2021
  function bubbleSort() {
    const animations = [];
    const newArray = array;
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          const temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          animations.push([j, j + 1]);
        }
      }
    }
    console.log(newArray);
    for (let i = 0; i < animations.length; i++) {
      const bar_style = document.getElementsByClassName("bar");
      // console.log(bar_style);
      const index1 = animations[i][0];
      const index2 = animations[i][1];
      // console.log(index1, index2);
      //   1 2
      setTimeout(() => {
        const height1 = bar_style[index1].style.height;
        const height2 = bar_style[index2].style.height;
        const t = height1;
        bar_style[index1].style.height = `${height2}`;
        bar_style[index2].style.height = `${height1}`;
      }, i * 10);
    }
  }
  //   trying to implemnt the sort without using extra animation array
  function insertionWithoutAnimation() {
    const bar_style = document.getElementsByClassName("bar");
    const newArray = array;
    // console.log(newArray);unsorted array , means input array
    for (let i = 0; i < newArray.length; i++) {
      setInitaialState(newArray);
      let j = i - 1;
      let x = newArray[i];
      while (j > -1 && newArray[j] > x) {
        newArray[j + 1] = newArray[j];
        // insertionAnimations.push([j + 1, newArray[j], "*"]);
        j -= 1;
      }
      newArray[j + 1] = x;
      //   insertionAnimations.push([j + 1, x, "0"]);
      setInitaialState(newArray);
    }
  }
  function selectionSort() {
    const newArray = array;
    const animations = [];
    for (let i = 0; i < newArray.length; i++) {
      let k = i;
      for (let j = i; j < newArray.length; j++) {
        if (newArray[j] < newArray[k]) {
          k = j;
        }
      }
      const temp = newArray[i];
      newArray[i] = newArray[k];
      newArray[k] = temp;
      animations.push([i, k]);
    }
    for (let i = 0; i < animations.length; i++) {
      const bar_style = document.getElementsByClassName("bar");
      // console.log(bar_style);
      const index1 = animations[i][0];
      const index2 = animations[i][1];
      // console.log(index1, index2);
      //   1 2
      setTimeout(() => {
        const height1 = bar_style[index1].style.height;
        const height2 = bar_style[index2].style.height;
        const t = height1;
        bar_style[index1].style.height = `${height2}`;
        bar_style[index2].style.height = `${height1}`;
      }, i * 10);
    }
  }
  return (
    <div>
      <div className="generate_button">
        <button onClick={handleGenerateArray}>Generate Array</button>
      </div>
      <div className="buttons">
        <button onClick={bubbleSort} disabled={disabled}>
          Bubble sort
        </button>
        <button onClick={insertionSortOuter} disabled={disabled}>
          Insertion sort
        </button>
        <button onClick={selectionSort} disabled={disabled}>
          Selection sort
        </button>
      </div>
      {/* </div> */}
      <div className="barComponent">
        {initaialState.map((ele) => (
          <div
            className="bar"
            style={{ backgroundColor: BAR_COLOR, height: `${ele}px` }}
          ></div>
          //   <div>{ele}</div>
        ))}
      </div>
    </div>
  );
}

export default SortingModify;
