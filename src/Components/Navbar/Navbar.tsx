import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "../../Context/AppReducer";
import { GlobalContext } from "../../Context/GlobalProvider";
import UserAvatar from "../UserAvatar/UserAvatar";
import styles from "./Navbar.module.css";

const navArr = ["Logout"];

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatch, socket, user } = useContext(GlobalContext);

  const handleNavigate = (element: string) => {
    if (element === "Logout") {
      socket?.close();
      localStorage.removeItem("user");
      dispatch({ type: ActionTypes.SET_USER, user: null });
      dispatch({ type: ActionTypes.SET_SOCKET, socket: null });

      navigate(`/login`);
    }
  };
  return (
    <div className={styles.navbar}>
      {!!user?.id && (
        <Flex pl="10px" alignItems="center">
          <UserAvatar userName={user?.name!} />
          <Text pl="10px" fontWeight="600" fontSize="1xl">
            {user?.name}
          </Text>
        </Flex>
      )}

      <div className={styles.navbarBtnContainer}>
        {!!navArr?.length &&
          navArr.map((element, key) => (
            <div
              className={styles.navbarBtn}
              key={key}
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate(element)}
            >
              <Text p="10px" fontWeight="600" fontSize="1xl">
                {element}
              </Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
