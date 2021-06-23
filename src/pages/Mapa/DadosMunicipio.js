import React, { useMemo } from "react";
import { Card, Button, Table } from "antd";
import "./style.scss";
import anomalies from "data/anomalies.json";

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

  const { year, cid10 } = filter;

  const showYear = year !== -1 ? `(${year})` : "(Todos)";

  const details = useMemo(
    () =>
      anomalies.find((a) =>
        a.related.find((e) => e.replace(".", "").includes(cid10))
      ),
    [cid10]
  );

  const anomaliaTitulo = dados?.anomalias[0]?.descricao[0];

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
        {!cid10 && (
          <>
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
          </>
        )}
        {cid10 && (
          <>
            <p>
              <b>Anomalias: {anomaliaTitulo}</b>
            </p>
            {details && (
              <article>
                <h3>{details?.title}</h3>
                <p>{details?.desc}</p>
                <h4>Relacionadas:</h4>
                <ul>
                  {details?.related.map((el) => (
                    <li>{el}</li>
                  ))}
                </ul>
              </article>
            )}
          </>
        )}
      </Card>
    )
  );
};

export default DadosMunicipio;
