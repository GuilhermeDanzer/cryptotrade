import React, { useState, useContext, useEffect } from "react";
import { Input, Label } from "../../components/Input";
import { FormCard } from "../../components/FormCard";
import { QrAuth } from "../../components/QrAuth";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { MensagemErro, PasswordInput, IconDiv, Container } from "../index";
import { Botao } from "../../components/Button";
import { Context as AuthContext } from "../../context/authContext";
import { Context as MenuContext } from "../../context/sideBarContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Cadastro = () => {
  const router = useRouter();
  const { hash } = router.query;
  const [passwordView, setPasswordView] = useState(true);
  const [values, setValues] = useState({});
  const [token2FA, setToken2FA] = useState("");
  const [qrCodeComponent, setQrCodeComponent] = useState(false);
  const { state, login, register, verify } = useContext(AuthContext);
  const menu = useContext(MenuContext);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    menu.openSideBar(false);
    Cookies.remove("email");
    Cookies.remove("token");
  }, []);
  useEffect(() => {
    if (router.asPath !== router.route) {
      setValues({ ...values, referenciadoPor: hash });
    }
  }, [router]);
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
    }
  };

  //Verificar o token no cadastro
  const verificar = async (valores) => {
    const verificacao = await verify(valores);
  };

  return (
    <Container>
      <FormCard>
        {!qrCodeComponent ? (
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
                  {passwordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </IconDiv>
              </IconContext.Provider>
            </PasswordInput>
            <Label>RG</Label>
            <Input width="80%" onChange={handleChange("rg")}></Input>
            <Label>CPF</Label>
            <Input width="80%" onChange={handleChange("cpf")}></Input>
            <Label>Hash do indicador</Label>
            <Input width="80%" disabled value={hash}></Input>
            {state.err ? <MensagemErro>{state.err}</MensagemErro> : null}
            <Botao
              onClick={() => registrar(values)}
              style={{ marginBottom: 10 }}
            >
              Finalizar cadastro
            </Botao>
          </>
        ) : (
          <>
            {" "}
            <QrAuth qrCode={state.authQRCode} onChange={setToken2FA} />
            <MensagemErro>
              {state.verified === false ? "Código Invalido" : null}
              {state.validated === false ? "Código Invalido" : null}
            </MensagemErro>
            <Botao
              onClick={() => {
                verificar({ email: values.email, token2FA });
              }}
            >
              Autenticar
            </Botao>
          </>
        )}
      </FormCard>
    </Container>
  );
};

export default Cadastro;
