import { createContext, useState } from "react";

export const Rander = createContext(false);

export function RanderProvider({ children }) {
  const [rander, rerander] = useState(false);
  return (
    <Rander.Provider value={{ rander, rerander }}>{children}</Rander.Provider>
  );
}
