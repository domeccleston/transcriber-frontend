import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { success } = req.query;

  const targetUrl = `https://${process.env.VERCEL_URL}api/consumer/${
    success ? "success" : "failure"
  }`;

  const fetchUrl = `https://api.serverlessq.com?id=${process.env.SERVERLESSQ_QUEUE_ID}&target=${targetUrl}`;

  const result = await fetch(fetchUrl, {
    headers: {
      Accept: "application/json",
      "x-api-key": process.env.SERVERLESSQ_API_TOKEN!,
    },
  });

  console.log("Result: ", result);

  res.status(200).json({ name: "Message sent to queue" });
}
