"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const get_token_from_llm_1 = require("./get-token-from-llm");
const get_tweets_1 = require("./get-tweets");
const web3_js_1 = require("@solana/web3.js");
const swap_1 = require("./swap");
const SOL_AMOUNT = 0.001 * web3_js_1.LAMPORTS_PER_SOL;
function main(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTweets = yield (0, get_tweets_1.getTweets)(userName);
        console.log(newTweets);
        for (let tweet of newTweets) {
            const tokenAddress = yield (0, get_token_from_llm_1.getTokenFromLLM)(tweet.contents);
            if (tokenAddress !== "null") {
                console.log(`trying to execute tweet => ${tweet.contents}`);
                yield (0, swap_1.swap)(tokenAddress, SOL_AMOUNT);
            }
        }
    });
}
main("Ashutosh0w0");
