import { authWithAccessToken } from "lib/api/user";
import useSWR from "swr";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", authWithAccessToken);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
