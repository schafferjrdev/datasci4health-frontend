import React from "react";
import { Card, Button } from "antd";
import "./style.scss";

const DadosMunicipio = ({ onClear, loading, dados }) => {
  return (
    dados && (
      <Card
        className="data-card"
        loading={loading}
        title={`Município: ${dados?.nome}`}
        extra={
          <Button type="link" onClick={onClear}>
            Fechar
          </Button>
        }
      >
        <span>{JSON.stringify(dados)}</span>
      </Card>
    )
  );
};

export default DadosMunicipio;
