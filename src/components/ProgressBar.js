import React from "react";
import styled from "styled-components";

const ContainerStyles = styled.div`
  height: 20px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 50px;
  margin: 50px;
`;

const FillerStyles = styled.div`
  height: 100%;
  width: ${(props) => props.completed}%;
  background-color: ${(props) => props.theme.colors.detail};
  border-radius: inherit;
  text-align: right";
`;

const LabelStyles = styled.span`
  padding: 5px;
  color: white;
  font-weight: bold;
`;

export const ProgressBar = () => {
  return (
    <>
      <ContainerStyles>
        <FillerStyles completed={20}>
          <LabelStyles>20% </LabelStyles>
        </FillerStyles>
      </ContainerStyles>
    </>
  );
};
