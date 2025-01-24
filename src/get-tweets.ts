import axios from "axios";
import { Tweet } from "./types/types";

const TWEET_MAX_TIME_MS = 1 * 60 * 1000;

export async function getTweets(userName: string): Promise<Tweet[]> {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://twttrapi.p.rapidapi.com/user-tweets?username=${userName}`,
        headers: { 
        'x-rapidapi-host': 'twttrapi.p.rapidapi.com', 
        'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    };
  
    const response = await axios.request(config)
    const timelineResponse = response.data.data.user_result.result.timeline_response.timeline.instructions.filter((x: any) => x.__typename === "TimelineAddEntries");

    const tweets: Tweet[] = [];
    timelineResponse[0].entries.map((x: any) => {
        try {
            tweets.push({
                contents: x.content.content.tweetResult.result.legacy.full_text ?? x.content.content.tweetResult.result.core.user_result.result.legacy.description,
                id: x.content.content.tweetResult.result.core.user_result.result.legacy.id_str,
                createdAt: x.content.content.tweetResult.result.legacy.created_at
            })
        } catch(e) {

        }
    });
    return tweets.filter(x => new Date(x.createdAt).getTime() > Date.now() - TWEET_MAX_TIME_MS);
}