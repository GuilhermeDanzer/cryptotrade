import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { Context as SideBarContext } from "../context/sideBarContext";
import { Context as UserContext } from "../context/userContext";
const WrapperHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex: 1 1 100%;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const Column = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  justify-content: ${(props) => props.justify};
`;
export const HeaderNav = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-evenly;
  padding: 10px;
  flex: 1;
  flex-wrap: wrap;
  position: relative;
  //JHONATHAN DO CSS
  background-image: -moz-linear-gradient(
    to right bottom,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  background-image: -webkit-linear-gradient(
    to right bottom,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  background-image: -webkit-gradient(
    linear,
    100% 100%,
    0 0,
    from(#252a40),
    color-stop(0.09, #253159),
    color-stop(0.18, #223774),
    color-stop(0.27, #1c3e8f),
    color-stop(0.36, #1244aa),
    color-stop(0.45, #1256c1),
    color-stop(0.55, #0d68d8),
    color-stop(0.64, #007bef),
    color-stop(0.73, #009cff),
    color-stop(0.82, #00b9ff),
    color-stop(0.91, #00d3fb),
    to(#00eaf1)
  ) !important;
  background-image: -o-linear-gradient(
    to right bottom,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  background-image: linear-gradient(
    to right bottom,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  -webkit-box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
  box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
  border: none !important;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Itens = styled.div`
  font-size: 1.2rem;
  box-sizing: border-box;
  transition: ease-out 0.9s;
  margin: 10px;

  a {
    position: relative;
    transition: all 0.45s ease;
  }
  a:hover {
  }
  a:before {
    position: absolute;
    content: "";
    height: 1.5px;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 0;
    background: ${(props) => props.theme.colors.background};
    transition: all 0.35s ease;
  }
  a:hover:before {
    width: 100%;
  }
`;
const navItens = [
  { nome: "Dashboard", route: "/dashboard", level: 1 },
  { nome: "Trade", route: "/trade", level: 1 },
  { nome: "Gerenciar", route: "/gerenciar", level: 3 },
  { nome: "Perfil", route: "/perfil", level: 1 },
  { nome: "Logout", route: "/", level: 1 },
];

export const Header = () => {
  const { state, getActualUser } = useContext(UserContext);

  useEffect(() => {
    getActualUser();
  }, []);

  return (
    <HeaderNav>
      {navItens.map((itens, i) => {
        return (
          <>
            {state.usuario !== undefined &&
            state.usuario.authLevel >= itens.level ? (
              <Itens key={itens.route}>
                <Link href={itens.route}>{itens.nome}</Link>
              </Itens>
            ) : null}
          </>
        );
      })}
    </HeaderNav>
  );
};
