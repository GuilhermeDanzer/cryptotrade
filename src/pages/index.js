import React, { useState, useContext, useEffect } from "react";
import { FormCard } from "../components/FormCard";
import styled from "styled-components";
import { Input, Label } from "../components/Input";
import { QrAuth } from "../components/QrAuth";
import { Botao } from "../components/Button";
import { Context as AuthContext } from "../context/authContext";
import { Context as MenuContext } from "../context/sideBarContext";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
`;

const SpanMudaForm = styled.span`
  margin: 20px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 200;
  cursor: pointer;
  text-align: center;
`;

export const MensagemErro = styled.span`
  margin: 5px;
  font-size: 14px;
  color: #ff3000;
`;

export const PasswordInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  flex-direction: column;
`;

export const IconDiv = styled.div`
  position: absolute;
  right: 40px;
  top: 0px;
`;
const Login = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState(true);
  const [passwordView, setPasswordView] = useState(true);
  const [funcaoDeVerficacao, setFuncaoDeVerfificao] = useState(true);
  const [values, setValues] = useState({});
  const [token2FA, setToken2FA] = useState("");
  const [qrCodeComponent, setQrCodeComponent] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [secret, setSecret] = useState("");
  const { state, login, register, verify, validate, logout } = useContext(
    AuthContext
  );
  const menu = useContext(MenuContext);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    menu.openSideBar(false);
    router.push("/");
    Cookies.remove("token");
    Cookies.remove("email");
  }, []);

  useEffect(() => {
    if ((state.validated || state.verified) && Cookies.get("token")) {
      router.push("/dashboard");
    }
    return () => {};
  }, [state.verified, state.validated]);
  const registrar = async (valores) => {
    await register(valores);

    if (Cookies.get("email")) {
      setQrCodeComponent(true);
      setFuncaoDeVerfificao(false);
    }
  };
  const logar = async (valores) => {
    const entrar = await login(valores);
    if (Cookies.get("email")) {
      setQrCodeComponent(true);
      setFuncaoDeVerfificao(true);
    }
  };

  //Verificar o token no cadastro
  const verificar = async (valores) => {
    const verificacao = await verify(valores);
  };
  //validar o token no login
  const validar = async (valores) => {
    await validate(valores);
  };

  return (
    <Container>
      <FormCard>
        {!qrCodeComponent ? (
          <>
            {loginForm ? (
              <>
                <Label>Email</Label>
                <Input width="80%" onChange={handleChange("email")}></Input>
                <Label>Senha</Label>
                <PasswordInput>
                  <Input
                    width="80%"
                    type={passwordView ? "password" : "text"}
                    onChange={handleChange("password")}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        logar({
                          email: values.email,
                          password: values.password,
                        });
                      }
                    }}
                  ></Input>
                  <IconContext.Provider
                    value={{
                      size: 35,
                    }}
                  >
                    <IconDiv onClick={() => setPasswordView(!passwordView)}>
                      {passwordView ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </IconDiv>
                  </IconContext.Provider>
                </PasswordInput>
                <SpanMudaForm onClick={() => setLoginForm(!loginForm)}>
                  Não é cadastrado? Crie sua conta
                </SpanMudaForm>
                {state.err ? <MensagemErro>{state.err}</MensagemErro> : null}
                <Botao
                  onClick={() =>
                    logar({ email: values.email, password: values.password })
                  }
                  style={{ marginBottom: 10 }}
                >
                  Login
                </Botao>
              </>
            ) : (
              <>
                <Label>Nome</Label>
                <Input width="80%" onChange={handleChange("nome")}></Input>
                <Label>Email</Label>
                <Input width="80%" onChange={handleChange("email")}></Input>
                <Label>Senha</Label>
                <PasswordInput>
                  <Input
                    width="80%"
                    type={passwordView ? "password" : "text"}
                    onChange={handleChange("password")}
                  ></Input>
                  <IconContext.Provider
                    value={{
                      size: 35,
                    }}
                  >
                    <IconDiv onClick={() => setPasswordView(!passwordView)}>
                      {passwordView ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </IconDiv>
                  </IconContext.Provider>
                </PasswordInput>
                <Label>RG</Label>
                <Input width="80%" onChange={handleChange("rg")}></Input>
                <Label>CPF</Label>
                <Input width="80%" onChange={handleChange("cpf")}></Input>

                <SpanMudaForm onClick={() => setLoginForm(!loginForm)}>
                  Já tem uma conta? Clique aqui para fazer o login
                </SpanMudaForm>
                {state.err ? <MensagemErro>{state.err}</MensagemErro> : null}
                <Botao
                  onClick={() => {
                    registrar(values);
                  }}
                  style={{ marginBottom: 10 }}
                >
                  Finalizar cadastro
                </Botao>
              </>
            )}
          </>
        ) : (
          <>
            <QrAuth qrCode={state.authQRCode} onChange={setToken2FA} />
            <MensagemErro>
              {state.verified === false ? "Código Invalido" : null}
              {state.validated === false ? "Código Invalido" : null}
            </MensagemErro>
            <Botao
              onClick={
                funcaoDeVerficacao
                  ? () => {
                      validar({ email: values.email, token2FA });
                    }
                  : () => {
                      verificar({ email: values.email, token2FA });
                    }
              }
            >
              Autenticar
            </Botao>
          </>
        )}
      </FormCard>
    </Container>
  );
};

export default Login;
