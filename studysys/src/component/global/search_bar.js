import React from "react";
import { Input } from "antd";
import { Log } from "../../library/log";
import { DisplayDataContext } from "../../component/global/context_config";

function SearchBar() {
  const { originData, setDisplayData } = React.useContext(DisplayDataContext);

  const onChange = (target) => {
    const result = originData.filter((item) =>
      item.student_name.includes(target.value)
    );
    Log.print(result);
    setDisplayData(result);
  };

  return (
    <Input
      placeholder="search with student name..."
      style={{ width: 220 }}
      onChange={(value) => onChange(value.target)}
    />
  );
}

export default SearchBar;
