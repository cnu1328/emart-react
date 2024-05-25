import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Auth from "./context/Auth.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <QueryClientProvider client={queryClient}>
      <Auth>
        <App />
      </Auth>
    </QueryClientProvider>
  </BrowserRouter>
);