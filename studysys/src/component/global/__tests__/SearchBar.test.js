import { DisplayDataContext } from "../../../config/global/ContextConfig";
import SearchBar from "../SearchBar";
import React from "react";

<DisplayDataContext.Provider value={{ setDisplayData, originData }}>
  <SearchBar />
</DisplayDataContext.Provider>;
