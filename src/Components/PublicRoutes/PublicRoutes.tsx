import { useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalProvider";
import { PublicRoutesPropsTypes } from "../../utils/interfaces";

const PublicRoutes: React.FC<PublicRoutesPropsTypes> = ({redirectTo, children}) => {
  const {user: auth} = useContext(GlobalContext);
  const Element = useMemo(() => !auth ? children! : <Navigate to={redirectTo}/>,[auth,redirectTo,children]);
  return Element;
}

export default PublicRoutes;