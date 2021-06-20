import React from "react";
import { Card, Button, Table } from "antd";
import "./style.scss";

const DadosMunicipio = ({ onClear, loading, dados, filter }) => {
  const columns = [
    {
      title: "Anomalia",
      dataIndex: "descricao",
      render: (d) => <span>{d[0]}</span>,
    },
    {
      title: "Ocorrências",
      dataIndex: "quantidade",
      sorter: (a, b) => a.quantidade - b.quantidade,
    },
  ];

  const { year } = filter;

  const showYear = year !== -1 ? `(${year})` : "(Todos)";
  return (
    dados && (
      <Card
        className="data-card"
        loading={loading}
        title={`Município: ${dados?.nome} ${showYear}`}
        extra={
          <Button type="link" onClick={onClear}>
            Fechar
          </Button>
        }
      >
        <p>
          <b>ID (IBGE): {dados?.id}</b>
        </p>
        <p>
          <b>Quantidade total de Anomalias: {dados?.total_anomalias}</b>
        </p>
        <Table
          className="tabela-anomalias"
          dataSource={dados?.anomalias}
          columns={columns}
          rowKey="cod"
          locale={{
            sortTitle: "Ordenar",
            triggerDesc: "Clique para ordenação descendente",
            triggerAsc: "Clique para ordenação ascendente",
            cancelSort: "Clique para cancelar a ordenação",
          }}
          pagination={{ showSizeChanger: false, hideOnSinglePage: true }}
        />
      </Card>
    )
  );
};

export default DadosMunicipio;
