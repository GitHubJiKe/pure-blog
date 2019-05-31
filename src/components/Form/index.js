
import React from "react";

import "./Form.css";

const handleFieldValue = {
  name1: value => value.trim(),
  name2: value => `AA ${value} BB`,
  name3: value => value,
  name4: value => value,
  name5: value => value,
  name6: value => value,
  name7: value => value //具体看需求实现具体的效果
};
/**
 * @description 初始化state
 * @author peter.yuan
 * @returns
 */
function initState() {
  return {
    name1: "",
    name2: "",
    name3: "",
    name4: "",
    name5: "",
    name6: "",
    name7: ""
  };
}
/**
 * @description 根据state 获取渲染视图需要的map
 * @author peter.yuan
 * @returns
 */
function generateFormFields() {
  return Object.keys(initState()).map(key => {
    //这里可能根据需要会有一些其他操作，比如对应的标签类型的更换
    return { field: key, elementType: "input" };
  });
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState();
  }

  onInputChange = e => {
    let field = e.target.dataset["field"];
    let value = e.target.value;
    console.log(field);
    let finalVal = handleFieldValue[field](value);
    let newState = { [field]: finalVal };
    console.log(newState);
    this.setState(newState);
  };

  renderContent = () => {
    return generateFormFields().map(v => {
      const { field, elementType } = v;
      const isInput = elementType === "input";
      return isInput ? (
        <input
          key={field}
          data-field={field}
          value={this.state[field]}
          onChange={this.onInputChange}
        />
      ) : (
        <label key={field}>{this.state[field]}</label>
      );
    });
  };

  render() {
    return <div className="form_wrapper">{this.renderContent()}</div>;
  }
}

export default Form;
