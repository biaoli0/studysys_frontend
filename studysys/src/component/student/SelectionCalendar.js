import React, { useState } from "react";
import { Calendar, Select, Col, Row, Badge, Button } from "antd";
import styled from "styled-components";
import { Log } from "../../library/Log";
import Kit from "../../library/Kit";
import { CalendarOnclickModalDialog } from "./CalendarOnclickModalDialog";

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

function onPanelChange(value, mode) {
  console.log(value, mode);
}

function dateCellRender() {
  const listData = [
    { type: "warning", content: "This is warning event" },
    {
      type: "success",
      content: "This is very long usual event。。.............",
    },
    { type: "error", content: "This is error event 1." },
  ];
  return (
    <Styled_ul>
      {listData.map((item) => (
        <li key={item.content}>
          <Styled_Badge status={item.type} text={item.content} />
        </li>
      ))}
    </Styled_ul>
  );
}

export default function SelectionCalendar(props) {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  function onSelect(value) {
    setSelectedDate(value);
    setVisible(true);
  }

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
            </Row>
            <CalendarOnclickModalDialog
              visible={visible}
              setVisible={setVisible}
              selectedDate={selectedDate}
            />
          </div>
        );
      }}
      onPanelChange={onPanelChange}
      dateCellRender={dateCellRender}
      onSelect={onSelect}
    />
  );
}
