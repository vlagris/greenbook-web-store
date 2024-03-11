import {useAppSelector} from "@/hooks/useTypedReduxHooks";
import {userDataSelectors} from "../store/auth";


function useAuth() {
  const user = useAppSelector(userDataSelectors.user);

  return {isAuth: !!user.id};
}

export default useAuth;