import React, { useState, createContext, useContext } from "react";

type authContextProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  account_type: "Driver" | "Consumer";
  setAccount: React.Dispatch<React.SetStateAction<"Driver" | "Consumer">>;
};

const AuthContext = createContext<authContextProps>({
  email: "",
  setEmail: () => null,
  account_type: "Consumer",
  setAccount: () => null,
  phone: "",
  setPhone: () => null,
});

export const AuthContextProvider = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [account_type, setAccount] = useState<"Driver" | "Consumer">(
    "Consumer"
  );
  const value = { email, setEmail, account_type, setAccount, phone, setPhone };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
