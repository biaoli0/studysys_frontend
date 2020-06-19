import { DisplayDataContext } from "../../../config/global/ContextConfig";
import SearchBar from "../SearchBar";
import React, { useState } from "react";
import { render } from "@testing-library/react";
import  renderer  from "react-test-renderer";
import { Log } from "../../../library/Log";


test("Task should render", () => {
    // const [displayData, setDisplayData] = useState(null);
    //   const [originData, setOriginData ] = useState(null);

    let originData = null;

    let displayData = null;
    const setDisplayData = (newData)=>{
        displayData = newData;
    };

    const { getByText } = render(
    <DisplayDataContext.Provider value={{ setDisplayData, originData }}>
      <SearchBar />
    </DisplayDataContext.Provider>
  );

  Log.print(getByText);
});
