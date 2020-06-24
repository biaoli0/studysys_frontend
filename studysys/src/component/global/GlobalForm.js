import React from "react";
import { Form, Space } from "antd";

function GlobalForm(props) {
  const { list, itemkey, itemname, formConfig,callBack } = props;

  return (
    <Space direction="vertical" size="large">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={callBack}
      >
        {formConfig.getFormItems(list, itemkey, itemname).map((formItem) => {
          return (
            <Form.Item
              key={formItem.key}
              name={formItem.name}
              rules={[
                {
                  required: true,
                  message: formItem.rulesMessage,
                },
              ]}
            >
              {formItem.component}
            </Form.Item>
          );
        })}
        <Form.Item>{formConfig.getSubmitButton()}</Form.Item>
      </Form>
    </Space>
  );
}

export default GlobalForm;
