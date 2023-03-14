import React, { createContext, Reducer, useMemo, useReducer} from "react"
import { GlobalContextPropsTypes } from "../utils/interfaces"
import appReducer, { Action, initialState } from "./AppReducer"
import { InitState } from "./Interfaces"

export const GlobalContext = createContext<InitState>({...initialState});

const GlobalProvider: React.FC<GlobalContextPropsTypes> = ({children}) => {
  const [state, dispatch] = useReducer<Reducer<InitState, Action>>(appReducer, initialState);
  const store = useMemo(()=>(
    {
      user: state.user,
      socket: state.socket,
      dispatch,
    }
  ),[state]);
  return (
    <GlobalContext.Provider value={{...store}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider