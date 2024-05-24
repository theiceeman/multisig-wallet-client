import { useEffect, useState } from "react";
import MultiSigWallet from "../utils/MultiSigWallet.js";
import { truncateAddress } from "../utils/helpers.js";
import { useAccount } from "../context/UserContext";
import { useFormik } from "formik";

const SideBar = () => {
  const account = useAccount();
  const [approvers, setApprovers] = useState([]);

  const fetchApprovers = async () => {
    if (account?.provider == null && account?.address == null) {
      return;
    }
    const approvers = await new MultiSigWallet(
      account?.provider,
      account?.address
    ).getApprovers();
    console.log({ approvers });

    setApprovers(approvers);
  };

  const formik = useFormik({
    initialValues: {
      to: "",
      amount: "",
    },
    onSubmit: async (values) => {
      console.log({ ...values });

      const transfer = await new MultiSigWallet(
        account?.provider,
        account?.address
      ).createTransfer(String(values.amount), values.to);
      // console.log({ transfer });
      // mutateCreateCurrency({ ...values });
      // formik.resetForm()
    },
  });

  useEffect(() => {
    fetchApprovers();
  }, [account?.provider, account?.address]);

  return (
    <div className="flex flex-col gap-7 w-1/6 h-screen bg-blue-100 px-3 py-4">
      <div className="flex flex-col w-full text-center">
        <h2 className="font-black">MultiSig Wallet</h2>
        <p className="text-xs italic">...for Asset Chain</p>
      </div>
      <div className="flex flex-col w-full bg-blue-50 px-3 py-4 pb-10">
        <h4 className="text-sm font-bold">Transfer Funds {">>"}</h4>

        <div className="flex flex-col w-full mt-6">
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            placeholder="Amount"
            className="h-full w-full mt-3 rounded-sm bg-white bg-opacity-30 px-3 py-1 text-sm text-black outline outline-1 outline-offset-2 focus:border-none focus:outline-none"
          />
          <input
            type="text"
            name="to"
            value={formik.values.to}
            onChange={formik.handleChange}
            placeholder="To"
            className="h-full w-full mt-3 rounded-sm bg-white bg-opacity-30 px-3 py-1 text-sm text-black outline outline-1 outline-offset-2 focus:border-none focus:outline-none"
          />
          <button
            onClick={() => formik.handleSubmit()}
            // isLoading={isLoadingCreateCurrency}
            // disabled={isLoadingCreateCurrency}
            className="text-nowrap rounded-lg mt-6 w-full py-3 text-[16px]/[20px] text-white capitalize bg-blue-400"
          >
            Send
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full bg-blue-50 px-3 py-4 pb-10">
        <h4 className="text-sm font-bold">Approvers {">>"}</h4>

        <div className="flex flex-col w-full mt-6 ">
          {approvers.length > 0 &&
            approvers.map((e, i) => (
              <div
                key={i}
                className="flex flex-col w-full overflow-auto mt-3 rounded-sm px-3 py-1 text-xs text-black border-b break-words break-all"
              >
                {/* {truncateAddress(e, 12)} */}
                {e}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
