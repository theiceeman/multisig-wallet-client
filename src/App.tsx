import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useAccount } from "./context/UserContext";
import MultiSigWallet from "./utils/MultiSigWallet";
// import { truncateAddress } from "./utils/helpers";

function App() {
  const account = useAccount();
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    if (account?.provider == null && account?.address == null) {
      return;
    }
    console.log({account})
    const transfers = await new MultiSigWallet(
      account?.provider,
      account?.address
    ).getTransfers();
    console.log('dam')
    console.log({ transfers });

    // setTransfers(approvers);
  };

  useEffect(() => {
    fetchTransfers();
  }, [account?.address]);
  return (
    <>
      <div className="font-muli">
        <div className="flex w-full">
          <SideBar />
          <div className="flex flex-col w-5/6 ">
            <Header />
            <div className="flex w-full h-full bg-white">
              <div className="flex flex-col w-full overflow-y-auto px-5 py-5">
                <table className="w-full text-left text-sm text-slate-500  rtl:text-right">
                  <thead className="bg-blue-50 text-xs uppercase ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Txn ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        amount&nbsp;($)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white-50 hover:bg-blue-50 cursor-pointer">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium"
                      >
                        0xxx
                      </th>
                      <td className="px-6 py-4">0xxx</td>
                      <td className="px-6 py-4">0xxx</td>
                      <td className="px-6 py-4">0xxx</td>
                      <td className="text-nowrap px-6 py-4">0xxx</td>
                    </tr>
                    <tr className="border-b bg-white-50 hover:bg-blue-50 cursor-pointer">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium"
                      >
                        0xxx
                      </th>
                      <td className="px-6 py-4">0xxx</td>
                      <td className="px-6 py-4">0xxx</td>
                      <td className="px-6 py-4">0xxx</td>
                      <td className="text-nowrap px-6 py-4">0xxx</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
