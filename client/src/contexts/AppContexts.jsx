import React, { useContext, useEffect, useState } from "react";
import Toast from "../component/Toast";
import * as apiClient from '../api-client'
import { useQuery } from "react-query";

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);

  const {isError} = useQuery('validateToken',apiClient.validateToken,{
    retry:false
  })



  return (
    <AppContext.Provider
      value={{
        showToast: (message) => {
          setToast(message);
        },
        isLoggedIn:!isError
      }}
    >
      {toast && (
        <Toast
          onClose={() => setToast(undefined)}
          message={toast.message}
          type={toast.type}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
