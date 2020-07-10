import React from "react";
import { Input } from "antd";
import { Log } from "../../library/Log";

function SearchBar(props) {
  const { onChange } = props;
  return (
    <Input
      placeholder={`search with Name...`}
      style={{ width: 220 }}
      onChange={(value) => onChange(value.target.value)}
    />
  );
}

export default SearchBar;
