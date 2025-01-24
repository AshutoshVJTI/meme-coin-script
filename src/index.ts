require("dotenv").config();
import { getTokenFromLLM } from "./get-token-from-llm";
import { getTweets } from "./get-tweets";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { swap } from "./swap";

const SOL_AMOUNT = 0.001 * LAMPORTS_PER_SOL;

async function main(userName: string) {
    const newTweets = await getTweets(userName);
    console.log(newTweets)
    for (let tweet of newTweets) {
        const tokenAddress = await getTokenFromLLM(tweet.contents)
        if (tokenAddress !== "null") {
            console.log(`trying to execute tweet => ${tweet.contents}`)
            await swap(tokenAddress, SOL_AMOUNT);
        }
    }
}

main("Ashutosh0w0");