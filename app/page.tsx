"use client";

import { useReadContract, useWriteContract } from "wagmi";
import { formatUnits } from "viem";
import { abi, chainlinkAbi } from "@/app/contracts/abi";
import { contract, BTC_USD } from "@/app/contracts/contract-address";
import { useCallback, useEffect } from "react";

export default function Home() {
  const { data, refetch } = useReadContract({
    address: contract as `0x${string}`,
    abi,
    functionName: "getCounter",
    query: {
      enabled: false,
    },
  });

  console.log(data);

  const { data: btcPrice } = useReadContract({
    address: BTC_USD as `0x${string}`,
    abi: chainlinkAbi,
    functionName: "latestRoundData",
    query: {
      select: (data) => data as bigint[],
    },
  });

  const {
    data: hash,
    isPending,
    error,
    isSuccess,
    writeContract,
  } = useWriteContract();

  const handleUpdateCounter = useCallback(() => {
    writeContract({
      address: contract as `0x${string}`,
      abi,
      functionName: "updateCounter",
      args: [Number(data) + 1],
    });
  }, [data]);

  useEffect(() => {
    refetch();
  }, [isPending, isSuccess]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="border border-gray-400 rounded-lg p-4 grid gap-4">
          {hash} - {isPending} -{isSuccess}
          <p> Counter: {Number(data)} </p>
          <button
            onClick={handleUpdateCounter}
            className="bg-slate-600 p-2 rounded-md"
          >
            update counter
          </button>
        </div>

        <div className="border border-gray-400 rounded-lg p-4 grid gap-4">
          <p> BTC: {formatUnits(btcPrice?.[1] ?? BigInt(0), 8)} </p>
        </div>
      </main>
    </div>
  );
}
