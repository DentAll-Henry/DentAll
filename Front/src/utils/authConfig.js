// Front/src/utils/authConfig.js
import { google } from "googleapis"

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export const getAuthUrl = () => {
  const scopes = ["https://www.googleapis.com/auth/calendar.readonly"]

  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  })
}

export const getToken = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(tokens)
  return tokens
}

export const listEvents = async () => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client })
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  })
  return res.data.items
}
