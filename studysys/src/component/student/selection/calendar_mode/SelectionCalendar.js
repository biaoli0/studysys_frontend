import React, { useEffect, useState } from "react";
import { Calendar, Select, Col, Row, Badge } from "antd";
import styled from "styled-components";
import Kit from "../../../../library/Kit";
import { CalendarOnclickModalDialog } from "./CalendarOnclickModalDialog";
import { api } from "../../../../library/axios/Api";
import { Colors } from "../../../../config/student/StudentSelectionConfig";
import CourseListDropdown from "./CourseListDropdown";
import { Log } from "../../../../library/Log";

const Styled_ul = styled.ul`
  &&& {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    list-style: none;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }
`;

const Styled_Badge = styled(Badge)`
  &&& {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    list-style: none;
    font-size: 12px;
  }
`;

export default function SelectionCalendar(props) {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2020-07-01");
  const [selectedMonth, setSelectedMonth] = useState("2020-07");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectionList, setSelectionList] = useState([
    { key: 0, color: "pink", course_name: "null" },
  ]);

  const fetchData = async (date, courseId) => {
      Log.print("date");
      Log.print(date);
      Log.print(courseId);
    api.getSelection(date, courseId).then((res) => {
      let newData = null;
      if (res) {
        newData = res.map((item, key) => ({
          ...item,
          key: key,
          color: Colors[parseInt(item.course_id)%14],
          month: parseInt(Kit.dateConvert(item["course_date"], "MM")),
          day: parseInt(Kit.dateConvert(item["course_date"], "DD")),
        }));
      }
      Log.print("newData");
      Log.print(newData);
      setSelectionList(newData);
    });
  };

  useEffect(() => {
    fetchData(selectedMonth, selectedCourse);
  }, [selectedMonth,selectedCourse]);

  /**
   * Action when a date is selected
   */
  function onSelect(value) {
    if (Kit.dateConvert(value) === Kit.dateConvert(selectedDate)) {
      setVisible(true);
    } else setSelectedDate(value);
  }

  /**
   * Render a course selection list in a date cell
   */
  function dateCellRender(value) {
    const month = value.month();
    const day = value.date();
    const listData = selectionList.filter(
      (item) => item["month"] === month+1 && item["day"] === day
    );
    return (
      <Styled_ul>
        {listData.map((item) => (
          <li key={item.key}>
            <Styled_Badge color={item.color} text={item["course_name"]} />
          </li>
        ))}
      </Styled_ul>
    );
  }

  /**
   * Action when changing month or year
   */
  function onPanelChange(value) {
      const newDate = Kit.dateConvert(value, "YYYY-MM");
      Log.print("onPanelChange");
      Log.print(newDate);
      setSelectedMonth(newDate);
  }

  /**
   * Action when changing a course
   */
  function onCourseChange(newCourseId) {}

  return (
    <Calendar
      fullscreen={true}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];

        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
          current.month(i);
          months.push(localeData.monthsShort(current));
        }

        for (let index = start; index < end; index++) {
          monthOptions.push(
            <Select.Option className="month-item" key={`${index}`}>
              {months[index]}
            </Select.Option>
          );
        }
        const month = value.month();
        const year = value.year();
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
          options.push(
            <Select.Option key={i} value={i} className="year-item">
              {i}
            </Select.Option>
          );
        }

        return (
          <div style={{ padding: 8 }}>
            <Row gutter={8}>
              <Col>
                <Select
                  size="middle"
                  dropdownMatchSelectWidth={false}
                  className="my-year-select"
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                  value={String(year)}
                >
                  {options}
                </Select>
              </Col>
              <Col>
                <Select
                  size="middle"
                  dropdownMatchSelectWidth={false}
                  value={String(month)}
                  onChange={(selectedMonth) => {
                    const newValue = value.clone();
                    newValue.month(parseInt(selectedMonth, 10));
                    onChange(newValue);
                  }}
                >
                  {monthOptions}
                </Select>
              </Col>

              <Col>
                <CourseListDropdown setSelectedCourse={setSelectedCourse} />
              </Col>
            </Row>

            <CalendarOnclickModalDialog
              visible={visible}
              setVisible={setVisible}
              selectedDate={selectedDate}
              selectedCourse={selectedCourse}
            />
          </div>
        );
      }}
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
    />
  );
}
