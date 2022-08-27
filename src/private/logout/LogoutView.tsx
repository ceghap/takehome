import { User } from "../../hooks/useUser";

interface Props {
  setUser: (value: User | undefined) => void;
}

export const LogoutView = ({ setUser }: Props) => {
  setUser(undefined);
  return <>{null}</>;
};
