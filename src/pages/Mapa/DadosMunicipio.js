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
        <div>
          <p>ID: {dados?.id}</p>
          <p>Nome: {dados?.nome}</p>
          <p>Quantidade Anomalias: {dados?.anomalias.length}</p>
        </div>
      </Card>
    )
  );
};

export default DadosMunicipio;
