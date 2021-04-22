import React, { useEffect, useContext } from "react";
import {
  TableData,
  TableBody,
  TableHead,
  TableRow,
} from "../../../components/Table";
import { Botao } from "../../../components/Button";
import { Context as userContext } from "../../../context/userContext";
import { Context as purchaseContext } from "../../../context/purchaseContext";
import { useRouter } from "next/router";
const TabelaUsuarios = () => {
  const { state, getUsersPag, getUser, getUserReferenciados } = useContext(
    userContext
  );
  const { getUserOperacoes } = useContext(purchaseContext);
  const router = useRouter();
  useEffect(() => {
    getUsersPag({ page: 1, limit: 10 });
  }, []);
  console.log(state.resultadoLista);
  return (
    <div>
      <Botao onClick={() => router.back()} black={true}>
        Voltar
      </Botao>
      {state.resultadoLista ? (
        <>
          <TableBody>
            <TableRow isOdd={Boolean(1 % 2)}>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>RG</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Autoridade</TableHead>
              <TableHead></TableHead>
            </TableRow>

            {state.resultadoLista
              ? state.resultadoLista.results.map((elemento) => {
                  if (elemento.authLevel === 1) {
                    elemento.authLevel = "Usuario";
                  } else {
                    elemento.authLevel = "Admin";
                  }
                  return (
                    <TableRow>
                      <TableData>{elemento.nome}</TableData>
                      <TableData>{elemento.email}</TableData>
                      <TableData>{elemento.rg}</TableData>
                      <TableData>{elemento.cpf}</TableData>
                      <TableData>{elemento.hash}</TableData>
                      <TableData>{elemento.authLevel}</TableData>
                      <TableData>
                        <Botao
                          onClick={() => {
                            getUser(elemento._id);
                            getUserReferenciados(elemento.hash);

                            router.push("TabelaUsuarios/detalhes");
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
          {state.resultadoLista.previous ? (
            <Botao
              black={true}
              style={{ borderColor: "black" }}
              onClick={() => {
                getUsersPag({
                  page: state.resultadoLista.previous.page,
                  limit: state.resultadoLista.previous.limit,
                });
              }}
            >
              Anterior
            </Botao>
          ) : null}
          {state.resultadoLista.next ? (
            <Botao
              black={true}
              style={{ borderColor: "black" }}
              onClick={() => {
                getUsersPag({
                  page: state.resultadoLista.next.page,
                  limit: state.resultadoLista.next.limit,
                });
              }}
            >
              Proximo
            </Botao>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default TabelaUsuarios;
