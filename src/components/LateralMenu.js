import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { FiPieChart } from "react-icons/fi";

const LateralMenuDiv = styled.div`
  display: flex;
`;

const Lista = styled.ul`
  margin: 0px 0px 0px 2px;
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-content: space-evenly;
  padding: 10px;
  flex: 1;
  flex-wrap: wrap;
`;

const ListaItem = styled.li`
  list-style: none;
  font-size: 16px;
  height: 120px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  &:hover {
    opacity: 0.6;
  }
`;

export const LateralMenu = () => {
  return (
    <LateralMenuDiv>
      <IconContext.Provider
        value={{
          style: {
            color: "#0e6d54",
            fontSize: 50,
            marginBottom: 5,
          },
        }}
      >
        <Lista>
          <Link href="/dashboard">
            <ListaItem>
              <AiOutlineDashboard />
              Dashboard
            </ListaItem>
          </Link>
          <Link href="/trade">
            <ListaItem>
              <FiPieChart />
              Trade
            </ListaItem>
          </Link>
          <Link href="/">
            <ListaItem>
              <AiOutlineLogout />
              Logout
            </ListaItem>
          </Link>
        </Lista>
      </IconContext.Provider>
    </LateralMenuDiv>
  );
};
