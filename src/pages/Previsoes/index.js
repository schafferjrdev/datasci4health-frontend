import React from "react";
import "./style.scss";

const Previsoes = () => {
  return (
    <div className="anomalias-content">
      <h2>Preditor de Sindrome de Down com dados do SINASC</h2>

      <p>
        O objetivo desta aplicação é predizer a partir das variáveis de entrada
        disponibilizadas pelo DATASUS se um recém nascido possui ou não síndrome
        de down. Dados obtidos do SINASC, plataforma de daddos de recém nascidos
        do{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="http://tabnet.datasus.gov.br/cgi/deftohtm.exe?SINASC/anomalias/anomabr.def"
        >
          DATASUS
        </a>
        :
      </p>
      <p>
        <a
          target="_blank"
          rel="noreferrer"
          href="http://datasus-app.herokuapp.com/"
        >
          Aplicação de predição de Sidrome de Down com dados do SINASC
        </a>
      </p>
      <h2>Anomalias</h2>
      <article>
        <h3>Defeitos No tubo neural</h3>
        <p>
          Os defeitos de tubo neural (DTN) são anomalias congênitas oriundas de
          defeitos no desenvolvimento do sistema nervoso central que resultam de
          falhas no fechamento do tubo neural, estrutura embrionária responsável
          por originar o cérebro e a medula espinal. Estas anomalias têm uma
          apresentação clínica variável e, em muitos casos, são extremamente
          graves, levando à morte precoce.(Ministério da Saúde,2021)
        </p>
        <ul>
          <li>Q00.0 Anencefalia</li>
          <li>Q00.1 Craniorraquisquise</li>
          <li>Q00.2 Iniencefalia</li>
          <li>Q01 Encefalocele</li>
          <li>Q05 Espinha bífida</li>
        </ul>
      </article>

      <article>
        <h3>Microcefalia</h3>
        <p>
          A microcefalia, avaliada por meio da medida da circunferência do
          perímetro cefálico, é definida quando o resultado desta medida é
          inferior a menos 2 desvios padrão (DP) da média, comparando com
          indivíduos da população de referência com a mesma idade e sexo.
          Refere-se como microcefalia grave a medida do perímetro cefálico
          inferior a menos. (Ministério da Saúde,2021)
        </p>
        <ul>
          <li>Q02 Microcefalia</li>
        </ul>
      </article>

      <article>
        <h3>Cardiopatias congênitas</h3>
        <p>
          As cardiopatias congênitas (CC) constituem um grupo de anomalias
          definidas como alterações estruturais do coração e/ou dos seus vasos
          sanguíneos que ocorrem no período intrauterino. As CC podem evoluir de
          forma assintomática ou apresentar sintomas importantes no período
          neonatal, variando desde alterações leves, que não exigem intervenções
          imediatas até quadros complexos que necessitam de diagnóstico e
          tratamento precoces, ainda nas primeiras semanas de vida, e podem
          levar à morte durante o primeiro ano. As CC figuram dentre as
          principais causas de morte na primeira infância, representando um
          importante problema global de saúde. (Ministério da Saúde,2021)
        </p>
        <ul>
          <li>
            Q20 Malformações congênitas das câmaras e das comunicações cardíacas
          </li>
          <li>Q21 Malformações congênitas dos septos cardíacos</li>
          <li>Q22 Malformações congênitas das valvas pulmonar e tricúspide</li>
          <li>Q23 Malformações congênitas das valvas aórtica e mitral</li>
          <li>Q24 Outras malformações congênitas do coração</li>
          <li>Q25 Malformações congênitas das grandes artérias</li>
          <li>Q26 Malformações congênitas das grandes veias</li>
          <li>
            Q27 Outras malformações congênitas do sistema vascular periférico
          </li>
          <li>Q28 Outras malformações congênitas do aparelho circulatório</li>
        </ul>
      </article>

      <article>
        <h3>Fendas orais</h3>
        <p>
          As fendas orais (FO) são defeitos congênitos de etiologia complexa
          (genética e ambiental), que podem ocorrer de forma isolada ou
          sindrômica.21 Geralmente, são divididas em fenda palatina isolada e
          fenda labial com ou sem fenda palatina. (Ministério da Saúde,2021)
        </p>
        <ul>
          <li>Q35 Fenda palatina</li>
          <li>Q36 Fenda labial</li>
          <li>Q37 Fenda labial com fenda palatina</li>
        </ul>
      </article>

      <article>
        <h3>Anomalias de órgãos genitais</h3>
        <p>
          Distúrbios no desenvolvimento dos órgãos genitais ocasionam anomalias
          congênitas específicas. As hipospádias, por exemplo, são clinicamente
          caracterizadas pelo desenvolvimento incompleto da uretra e
          correspondem ao principal tipo anomalia congênita do órgão genital
          masculino. (Ministério da Saúde,2021)
        </p>
        <ul>
          <li>Q54 Hipospádia</li>
          <li>Q56 Sexo indeterminado e pseudo-hermafroditismo</li>
        </ul>
      </article>

      <article>
        <h3>Defeitos de membros</h3>
        <p>
          Os defeitos de membros representam os principais tipos de anomalias
          congênitas não-cromossômicas presentes em recém-nascidos. Eles
          apresentam um amplo espectro fenotípico, incluindo a ausência completa
          do membro ou sua ausência parcial, além do acometimento apenas das
          extremidades superiores, ou inferiores, mãos ou pés. (Ministério da
          Saúde,2021)
        </p>
        <ul>
          <li>Q66 Deformidades congênitas do pé</li>
          <li>Q69 Polidactilia</li>
          <li>Q71 Defeitos, por redução, do membro superior</li>
          <li>Q72 Defeitos, por redução, do membro inferior </li>
          <li>Q73 Defeitos por redução de membro não especificado</li>
          <li>Q74.3 Artrogripose congênita múltipla</li>
        </ul>
      </article>

      <article>
        <h3>Síndrome de Down</h3>
        <p>
          A síndrome de Down (SD) é caracterizada por alterações faciais e
          musculoesqueléticas e comprometimento intelectual. A SD também aumenta
          o risco de o indivíduo apresentar outras comorbidades, como
          cardiopatias congênitas, por exemplo. A SD é causada pela presença de
          uma cópia extra do cromossomo 21. (Ministério da Saúde,2021)
        </p>
        <ul>
          <li>Q90 Síndrome de Down</li>
        </ul>
      </article>

      <article>
        <h3>Defeitos de parede abdominal</h3>
        <p>
          Os defeitos de parede abdominal constituem um grupo de anomalias
          congênitas caracterizados pela herniação dos órgãos abdominais. Os
          defeitos de parede abdominal mais comuns que podem ocorrer em um
          indivíduo são a exonfalia (Q79.2), também chamada de onfalocele, e a
          gastrosquise. (Q79.3). (Ministério da Saúde,2021).
        </p>
        <ul>
          <li>Q79.2 Exonfalia</li>
          <li>Q79.3 Gastrosquise</li>
        </ul>
      </article>
    </div>
  );
};

export default Previsoes;
