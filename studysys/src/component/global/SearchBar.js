import React from "react";
import { Input } from "antd";
import { Log } from "../../library/Log";

function SearchBar(props) {
  const { originData, setDisplayData, searchBarTarget } = props;

  const onChange = (target) => {
    const result = originData.filter(
      (item) =>
        item[searchBarTarget] !== null &&
        item[searchBarTarget].includes(target.value)
    );
    Log.print(result);
    setDisplayData(result);
  };

  return (
    <Input
      placeholder={`search with ${searchBarTarget}...`}
      style={{ width: 220 }}
      onChange={(value) => onChange(value.target)}
    />
  );
}

export default SearchBar;
