import React, { useState, useEffect } from "react";
import { Card, Form, Button, Select } from "antd";
import * as api from "services/api";
import "./style.scss";

const { Option } = Select;

const Filters = ({ onFilter, filterLoading }) => {
  const [loading, setLoading] = useState(false);
  const [anomalias, setAnomalias] = useState([]);
  const [years, setYears] = useState([]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    onFilter(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function fetchData() {
      const anomalias = await api.getListAnomalias();
      const years = await api.getListYears();
      await setAnomalias(anomalias);
      await setYears(years);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Card className="filters" loading={loading}>
      <Form
        name="filter"
        form={form}
        initialValues={{
          year: 2019,
          cid10: null,
        }}
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
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {years.map((a) => (
              <Option key={a.id} value={a.id}>
                {a.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Anomalia" name="cid10">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key={null} value={null}>
              Todas
            </Option>
            {anomalias.map((a) => (
              <Option key={a.CID10} value={a.CID10}>
                {a.DESCR}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={filterLoading}>
            Filtrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default React.memo(Filters);
