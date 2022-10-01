import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { video } = req.query;

  const targetUrl = `https://transcriber-qhhx4hi3kq-ue.a.run.app/download?video=${video}`

  console.log({ targetUrl })

  const fetchUrl = `https://api.serverlessq.com?id=${process.env.SERVERLESSQ_QUEUE_ID}&target=${targetUrl}`;

  console.log({ fetchUrl })

  const result = await fetch(fetchUrl, {
    headers: {
      Accept: "application/json",
      "x-api-key": process.env.SERVERLESSQ_API_TOKEN!,
    },
  });

  console.log("Result: ", result);

  res.status(200).json({ name: "Message sent to queue" });
}
