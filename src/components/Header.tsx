import { useEffect, useState } from "react";
import { connectToBrowserProvider } from "../utils/script";

const Header = () => {
  const [userAddress, setuserAddress] = useState("");

  const connectWallet = async () => {
    let userAddress = await connectToBrowserProvider();
    if (userAddress) setuserAddress(userAddress);
  };

  // useEffect(() => {
  //   let userAddress = connectToBrowserProvider();
  //   if (userAddress) setuserAddress(userAddress);
  // }, []);
  return (
    <div className="flex py-3 justify-end px-5 bg-blue-50">
      {userAddress && (
        <p className="text-sm font-bold capitalize">connected address: {userAddress}</p>
      )}

      {userAddress === "" && (
        <button
          onClick={connectWallet}
          // disabled={disabled}
          className="text-nowrap rounded-lg px-5 py-2 text-[14px]/[20px] text-white capitalize bg-blue-400"
        >
          connect wallet
        </button>
      )}
    </div>
  );
};

export default Header;
