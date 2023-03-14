import { useContext, useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalProvider";
import { PublicRoutesPropsTypes } from "../../utils/interfaces";

const ProtectedRoutes: React.FC<PublicRoutesPropsTypes> = ({ redirectTo }) => {
  const { user: auth } = useContext(GlobalContext);
  const Element = useMemo(
    () => (!!auth ? <Outlet /> : <Navigate to={redirectTo} />),
    [auth, redirectTo]
  );
  return Element;
};

export default ProtectedRoutes;
