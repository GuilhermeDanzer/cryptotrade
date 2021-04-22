import React, { useContext, useState, useEffect } from "react";
import { PagesTitle } from "../../components/PagesTitle";
import { Botao } from "../../components/Button";
import { Input, Label, Texto } from "../../components/Input";
import {
  FormCard,
  FormContainer,
  FormWrapper,
  Titulo,
} from "../../components/FormCard";
import { Context as userContext } from "../../context/userContext";
import { Context as saqueContext } from "../../context/saqueContext";
import { useRouter } from "next/router";
import styled from "styled-components";
const Link = styled.a`
  color: ${(props) => props.theme.colors.text};
`;

const Perfil = () => {
  const { state, getActualUser } = useContext(userContext);
  const router = useRouter();
  const [url, setUrl] = useState("");
  useEffect(() => {
    getActualUser();
    //hardcode até eu aprender usar as variaveis de ambiente do nextjs
    setUrl(
      `https://trademarket-vercel.vercel.app/referencia/cadastro?hash=${state.usuario.hash}`
    );
  }, []);
  return (
    <div>
      <PagesTitle>Perfil</PagesTitle>
      <Titulo style={{ marginLeft: 30, color: "#25c9df " }}>
        Informações Pessoais
      </Titulo>
      {state.usuario ? (
        <>
          <Texto>Nome: {state.usuario.nome}</Texto>
          <Texto>Email: {state.usuario.email}</Texto>
          <Texto>CPF: {state.usuario.cpf}</Texto>
          <Texto>RG: {state.usuario.rg}</Texto>
        </>
      ) : null}

      <Titulo style={{ marginLeft: 30, color: "#25c9df " }}>
        Link de referencia
      </Titulo>
      <Link style={{ marginLeft: 30, color: "#000" }}>{url}</Link>
    </div>
  );
};

export default Perfil;
