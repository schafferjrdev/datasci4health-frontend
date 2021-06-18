import React from "react";
import { Card, Form, Button, DatePicker } from "antd";
import moment from "moment";
import "./style.scss";

const Filters = ({ onFilter }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { year } = values;

    const stringYear = year.format("YYYY");

    onFilter({ year: stringYear });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function disabledDate(current) {
    const start = moment("2009", "YYYY");
    const end = moment("2020", "YYYY");
    return current < start || end < current;
  }

  return (
    <Card className="filters">
      <Form
        name="filter"
        form={form}
        initialValues={{ year: moment("2019", "YYYY") }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Form.Item
          label="Ano"
          name="year"
          rules={[
            {
              required: true,
              message: "Escolha uma data",
            },
          ]}
        >
          <DatePicker
            picker="year"
            disabledDate={disabledDate}
            allowClear={false}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Filtrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default React.memo(Filters);
