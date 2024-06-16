
import {
  useState,
  createContext,
  useContext,
 
} from "react";

import { Toaster, toast, Toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";


import './App.css'
import Main from "./pages/Main";
import Header from './Components/Header/Header';

export const DEFAULT_IMG =
  "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a";

  

type AppContextType = {
  hideNavbar(val: boolean): void;
  handleToast(message: string): void;
};

const Context = createContext<AppContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(Context) as AppContextType;
}

function App() {
  
  const [showNav, setShowNav] = useState(true);

  function hideNavbar(val: boolean) {
    setShowNav(!val);
  }

  function handleToast(message: string) {
    toast((t) => <ToastComponent message={message} t={t} />, {
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
        padding: "15px 18px",
      },
    });
  }

  const contextValue: AppContextType = {
    hideNavbar,
    handleToast,
  };
  navigator.geolocation.getCurrentPosition(()=>{

  })

  return (
    
    <Context.Provider value={contextValue}>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="App" style={{ height: "100vh"}}>
        {showNav && (
          <Header />
        )}
        
        <Main />


      </div>
      
      
    </Context.Provider>
    
  )
}


function ToastComponent({ message, t }: { message: string; t: Toast }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "white",
          fontFamily: "Roboto Slab",
          fontSize: "14px",
          marginRight: "30px",
        }}
      >
        {message}
      </span>
      <button
        style={{
          color: "white",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          marginLeft: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => toast.dismiss(t.id)}
      >
        {<CloseIcon sx={{ fontSize: "17px" }} />}
      </button>
    </div>
  );
}

export default App;


