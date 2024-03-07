import {useAppSelector} from "@/hooks/useTypedReduxHooks";
import {selectUser} from "@/store/userData/userData.slice.ts";


function useAuth() {
  const user = useAppSelector(selectUser);

  return {isAuth: !!user.id};
}

export default useAuth;