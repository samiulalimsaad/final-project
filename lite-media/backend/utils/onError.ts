import { NextApiRequest, NextApiResponse } from "next";

export function onError(
    err: Error,
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
}
