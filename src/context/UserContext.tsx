import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAddress, loadProvider } from "../utils/script";

// Define the shape of the context state
interface AccountContextState {
  provider: any | null;
  address: string | null;
}

// Define the props for the provider component
interface AccountProviderProps {
  children: ReactNode;
}

// set default state of the context state
const AccountContext = createContext<AccountContextState | undefined>(
  undefined
);

// The UserProvider component that wraps its children components in a UserContext Provider,
// allowing descendant components to subscribe to updates from the user object
export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  let account = { provider, address };

  const fetchData = async () => {
    const provider = await loadProvider();
    const address = await getAddress();

    setProvider(provider);
    setAddress(address);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};

// this hook provides an easy way for descendant components to access the user data stored in the UserContext
export const useAccount = (): AccountContextState | undefined =>
  useContext(AccountContext);
