import { Toast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ActionTypes } from "../../Context/AppReducer";
import { GlobalContext } from "../../Context/GlobalProvider";
import { GetUserQuery, useGetUserLazyQuery } from "../../generated/graphql";
import { makeSocketConnection } from "../../utils/ReuseableFunctions";
import Router from "../Router/Router";

const AppContainer = () => {
  const { socket, user, dispatch } = useContext(GlobalContext);
  const [getUser] = useGetUserLazyQuery({
    onCompleted: (data: GetUserQuery) => onGettingUser(data),
    onError: () => showErrorToaster(),
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!socket && !!user?.access_token)
      makeSocketConnection(user.access_token, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, user]);

  useEffect(() => {
    if (!!user?.access_token && !user?.id) {
      getUser();
    }
  }, [user, getUser]);

  const onGettingUser = (userData: GetUserQuery) => {
    const _user = { ...userData?.getUser, access_token: user?.access_token };
    dispatch({ type: ActionTypes.SET_USER, user: { ..._user } });
  };

  const showErrorToaster = () => {
    return Toast({
      title: `Couldn't get user`,
      status: "error",
      isClosable: true,
      position: "top",
    });
  };

  return <Router />;
};

export default AppContainer;
