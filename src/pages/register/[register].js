import React from "react";
import { useRouter } from "next/router";
const TokenRegister = () => {
  const router = useRouter();
  const { register } = router.query;
  console.log(register);
  return <div></div>;
};

export default TokenRegister;
