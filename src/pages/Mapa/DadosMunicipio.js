import React, { useState, useMemo, useEffect } from "react";
import { Card, Button, Table } from "antd";
import { Charts } from "components";
import "./style.scss";
import anomalies from "data/anomalies.json";
import * as api from "services/api";

const DadosMunicipio = ({ onClear, loading, dados, filter }) => {
  const [chartData, setChartData] = useState([]);
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

  const showYear = year !== -1 ? `(${year})` : "(2010 à 2019)";

  const details = useMemo(
    () =>
      anomalies.find((a) =>
        a.related.find((e) => e.replace(".", "").includes(cid10))
      ),
    [cid10]
  );

  const anomaliaTitulo = dados?.anomalias[0]?.descricao[0];

  useEffect(() => {
    if (dados) {
      const card = document.querySelector(".data-card");
      card.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
      });
    }
  });
  useEffect(() => {
    const fetchChart = async () => {
      const body = { cidade: dados?.id.slice(0, -1), cid10: cid10 };
      const res = await api.getAnomalieDecade(body);

      setChartData(res);
    };
    if (dados && cid10) {
      fetchChart();
    } else {
      setChartData([]);
    }
    // eslint-disable-next-line
  }, [dados]);

  return (
    dados && (
      <Card
        className="data-card"
        loading={loading}
        title="Município"
        extra={
          <Button type="link" onClick={onClear}>
            Fechar
          </Button>
        }
      >
        <p>
          <b>
            {dados?.nome} - {showYear}
          </b>
        </p>
        {dados?.nasc_vivos_ano && (
          <p>
            <b>Total de nascidos vivos: {dados?.nasc_vivos_ano}</b>
          </p>
        )}
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
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
            />
          </>
        )}
        {cid10 && (
          <>
            <p>
              <b>
                Anomalia: {anomaliaTitulo} - Ocorrências:
                {dados?.total_anomalias}
              </b>
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
            <div className="map-charts">
              <h3>Distribuição da {anomaliaTitulo} ao longo dos anos</h3>
              <Charts name={anomaliaTitulo} data={chartData} />
            </div>
          </>
        )}
      </Card>
    )
  );
};

export default DadosMunicipio;
