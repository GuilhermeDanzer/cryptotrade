import React, { useContext, useEffect } from "react";
import { PagesTitle } from "../../components/PagesTitle";
import { Input, Option } from "../../components/Input";
import { Botao } from "../../components/Button";
import { Context as userContext } from "../../context/userContext";
import { Context as coinsContext } from "../../context/coinsContext";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const Div = styled.div`
  padding-left: 20px;
`;
const DivLinks = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Column = styled.div`
  flex: 1;
`;
const Perfil = () => {
  const router = useRouter();
  const usuarios = useContext(userContext);
  const moedas = useContext(coinsContext);
  useEffect(() => {}, []);

  return (
    <Div>
      <PagesTitle>Gerenciar</PagesTitle>
      <DivLinks>
        <Link href="/gerenciar/TabelaUsuarios">Usuarios</Link>
        <Link href="/gerenciar/moeda">Moeda</Link>
      </DivLinks>
    </Div>
  );
};

export default Perfil;
