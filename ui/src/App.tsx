import { useState, useEffect } from "react";
import { z as zod } from "zod";
import { createZodFetcher } from "zod-fetch";

import "./App.css";
import positive from "./assets/img/positive.svg";
import neutral from "./assets/img/neutral.svg";
import negative from "./assets/img/negative.svg";
import { useDebounce } from "./use-debounce";

const fetchWithZod = createZodFetcher();

type Sentiment = 1 | 0 | -1;

function Emoji({ sentiment }: { sentiment: Sentiment }) {
  if (sentiment === 1) {
    return <img src={positive} className="emoji" />;
  }
  if (sentiment === 0) {
    return <img src={neutral} className="emoji" />;
  }
  if (sentiment === -1) {
    return <img src={negative} className="emoji" />;
  }
  return <br />;
}

function App() {
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment>(0);
  const debouncedComment = useDebounce(comment, 500);

  useEffect(() => {
    async function fetchSentiment(comment: string) {
      const result = await fetchWithZod(
        // The schema you want to validate with
        zod.object({
          sentiment: zod.union([
            zod.literal(1),
            zod.literal(0),
            zod.literal(-1),
          ]),
        }),
        // Any parameters you would usually pass to fetch
        "http://192.168.1.17:4000/api/sentiment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: comment }),
        }
      ).then((res) => {
        return res.sentiment;
      });
      setSentiment(result);
    }
    if (debouncedComment) {
      fetchSentiment(debouncedComment);
    }
  }, [debouncedComment]);
  return (
    <div className="App">
      <form action="/api/sentiment">
        <textarea
          placeholder="What do you think"
          value={comment}
          onChange={(evt) => setComment(evt.target.value)}
        ></textarea>
        <p>{sentiment.toString()}</p>
        <button type="submit">Submit</button>
      </form>
      <Emoji sentiment={sentiment} />
    </div>
  );
}

export default App;
