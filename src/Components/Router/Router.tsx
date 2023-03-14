import { useRoutes } from "react-router-dom";
import Chat from "../Chat/Chat";
import Layout from "../Layout/Layout";
import LoginContainer from "../Login/LoginContainer";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import PublicRoutes from "../PublicRoutes/PublicRoutes";
import SignUpContainer from "../SignUp/SignUpContainer";

const Router = () => {
  return useRoutes([
    {
      path: '/login',
      element: <PublicRoutes redirectTo={'/'}><LoginContainer/></PublicRoutes>
    },{
      path: '/sign-up',
      element: <PublicRoutes redirectTo={'/'}><SignUpContainer/></PublicRoutes>
    },{
      path: '/',
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoutes redirectTo='/login'/>,
          children: [
            {
              path: '/',
              element: <Chat/>
            },
          ]
        }
      ],
    },
    {
      path: '*',
      element: <div>Page not found.</div>
    }
  ]);
}

export default Router;