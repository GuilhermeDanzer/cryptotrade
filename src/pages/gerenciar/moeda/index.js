import React, { useContext, useEffect } from "react";
import { Botao } from "../../../components/Button";
import {
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "../../../components/Table";
import { Context as coinsContext } from "../../../context/coinsContext";
import { useRouter } from "next/router";

const Moeda = () => {
  const router = useRouter();
  const { state, getAllCoins, getOneCoin } = useContext(coinsContext);
  useEffect(() => {
    getAllCoins();
  }, []);
  console.log(state);
  return (
    <div>
      <Botao onClick={() => router.back()} black={true}>
        Voltar
      </Botao>

      <Botao onClick={() => router.push("moeda/geral")} black={true}>
        Geral
      </Botao>
      {state.moedas ? (
        <TableBody>
          <TableRow isOdd={Boolean(1 % 2)}>
            <TableHead>Nome</TableHead>
            <TableHead>Sigla</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Rendimento por dia</TableHead>
            <TableHead>Render até </TableHead>
            <TableHead></TableHead>
          </TableRow>

          {state.moedas
            ? state.moedas.map((elemento) => {
                return (
                  <TableRow>
                    <TableData>{elemento.nome}</TableData>
                    <TableData>{elemento.sigla}</TableData>
                    <TableData>R$ {elemento.valor}</TableData>
                    <TableData>{elemento.rendimento * 100}%</TableData>
                    <TableData>{elemento.limite}%</TableData>
                    <TableData>
                      <Botao
                        onClick={() => {
                          getOneCoin(elemento.nome);
                          router.push("moeda/detalhes");
                        }}
                      >
                        Ver detalhes
                      </Botao>
                    </TableData>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      ) : null}
    </div>
  );
};

export default Moeda;
