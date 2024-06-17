// import  { useState } from "react";
import "./Header.css";
// import { useAuth } from "../../context/Auth";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../../App";

function Header() {

  // const [showSearch, setShowSearch] = useState(false);
  // const [query, setQuery] = useState("");

  // const navigate = useNavigate();

  // const handleSearch = () => {
  //   navigate(`/search/${query}`);
  //   setQuery("");
  // }

  // const { isAuthenticated }  = useAuth();
  // const { handleToast } = useAppContext();

  return (
    <div>
      <header className="header">
        <div className="logo-name">
            <a href="/home" className="logo">RGUKT <i className="fa-solid fa-cart-shopping"></i> Emart</a>
        </div>

        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <ul className="menu">
          {/* {showSearch ? (
            <li className="search-input">
                <input 
                 type="text" 
                 placeholder="Search..."
                 onChange={(event) => setQuery(event.target.value)}
                 onKeyDown={(event) => {
                  if (event.key === 'Enter') {

                      if(query.length > 0)
                        handleSearch();

                      else 
                        handleToast("Please Enter something in Search Field");
                  }
                 }}
                 value={query} 
                />
                <button onClick={() => setShowSearch(!showSearch)}><i className="fa-regular fa-circle-xmark"></i></button>                
            </li>
          ):(
            <li className="nav-link">
                <a href="#" onClick={() => setShowSearch(!showSearch)}>
                  <i className="fa-solid fa-magnifying-glass"></i> Search
                </a>
            </li>
          )} */}


          <li className="nav-link">
            <a href="/admin/dashboard">Dashboard</a>
          </li>

          {/* <li className="nav-link">
            <a href="/products">Products</a>
          </li>


          <li className="nav-link">
            <a href="/activeOrders">Active Order</a>
          </li> 

          <li className="nav-link">
            <a href="/activeCarts">Active Carts</a>
          </li>     */}
         
        </ul>
      </header>
      
    </div>
  );
}

export default Header;

