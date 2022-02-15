import React from "react";
import MultiCascader from "./components/index";
import "./components/semantic-multi-cascader.min.css";

const options = [
  { text: "CSS", value: "css" },
  { text: "Graphic Design", value: "design" },
  { text: "HTML", value: "html" },
  {
    text: "Javascript Frameworks",
    value: "javascript frameworks",
    children: [
      {
        text: "Angular ",
        value: "angular ",
        children: [
          { text: "Angular v1 ", value: "angular v1 " },
          { text: "Angular v2 ", value: "angular v2 " },
        ],
      },
      { text: "React js ", value: "React js" },
      { text: "Vue js ", value: "Vue js" },
      { text: "Ember js ", value: "Ember js" },
    ],
  },
];

function App() {
  const [value, setValue] = React.useState([]);
  const onChange = (value) => {
    console.log("onChange", value);
    setValue(value);
  };
  return (
    <MultiCascader
      value={value}
      onChange={onChange}
      cancelBtnClass="cancel-btn"
      confirmBtnClass="confirm-btn"
      options={options}
      cancelText={"no"}
      okText="ok"
      selectAll={true} // default false
      placeholder="Select Skills"
    />
  );
}

export default App;
