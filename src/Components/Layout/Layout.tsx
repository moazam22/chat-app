import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: "flex",
        flexDirection: 'column'
      }}
    >
      <Navbar/>
      <div
        style={{
          width: '100%',
          height: '90vh'
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout