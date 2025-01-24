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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromLLM = getTokenFromLLM;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function getTokenFromLLM(contents) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const prompt = `
You are an AI designed to analyze the content of financial posts to extract specific information. Evaluate the following text based on two conditions:

1. **Buy/Bull Post**: Determine if the post indicates a "buy" sentiment or is a bullish statement.
2. **Token Address**: Extract the token address if it is present.

Input Text:
"${contents}"

Instructions:
- If the post satisfies **both conditions**, return **only the token address** as a string (e.g., "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump").
- If **either condition is not met**, return "null".

Examples:
- Input: "This is a bull post! 6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump"
  Output: "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump"

- Input: "This token is useless! Avoid it!"
  Output: "null"
    `;
        const completion = yield openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an assistant that evaluates financial posts for buy signals and token addresses." },
                { role: "user", content: prompt },
            ],
        });
        const response = (_b = (_a = completion.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "null";
        const sanitizedResponse = response.replace(/^"(.*)"$/, '$1');
        return sanitizedResponse;
    });
}
