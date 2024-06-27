// Front/src/pages/api/calendar.ts
import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query

  if (!code) {
    return res.status(400).json({ error: "Authorization code missing" })
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code as string)
    oAuth2Client.setCredentials(tokens)

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client })
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })

    res.status(200).json(events.data.items)
  } catch (error) {
    console.error("Error fetching events:", error)
    res.status(500).json({ error: "Error fetching events" })
  }
}
