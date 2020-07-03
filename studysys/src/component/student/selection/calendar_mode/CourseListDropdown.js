import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import styled from "styled-components";
import { Select } from "antd";
import { api } from "../../../../library/axios/Api";
import { Log } from "../../../../library/Log";

const Option = Select.Option;

const Styled_Select = styled(Select)`
  &&& {
    width: 200px;
  }
`;

function CourseListDropdown(props) {
  const [list, setList] = useState();
  const { setSelectedCourse } = props;

  useEffect(() => {
    api.getCourseList().then((res) => {
      let newList = null;
      if (res) {
        newList = res.map((item, key) => ({
          ...item,
          key: key,
        }));
        newList.unshift({ name: "All", id: "" });
        setList(newList);
      }
    });
  }, []);

  return (
    <Styled_Select
      showSearch
      placeholder="Course"
      optionFilterProp="children"
      onChange={(e) => setSelectedCourse(e)}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {list
        ? list.map((item, key) => {
            return (
              <Option key={key} value={item["id"]}>
                {item["name"]}
              </Option>
            );
          })
        : false}
      )}
    </Styled_Select>
  );
}

export default CourseListDropdown;
