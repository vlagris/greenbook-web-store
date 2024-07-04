import { useAppSelector } from "@/hooks/useTypedReduxHooks";
import { authSelectors } from "@/store/auth";


function useAuth() {
  const id = useAppSelector(authSelectors.userId);

  return {
    isAuth: !!id,

  };
}

export default useAuth;