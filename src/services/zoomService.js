const axios = require("axios");
const { Buffer } = require("buffer");
const mailService = require("./../utils/email");

const accountId = process.env.ACCOUNT_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

exports.creatZoomMeeting = async function (startTime, participants) {
  try {
    const accessToken = await getAccessToken();
    const meeting = await createMeeting(accessToken, startTime);
    const meetingLink = meeting.join_url;
    await mailService.sendMeetingMail(meetingLink, participants);
    return { meetingLink, date: startTime };
  } catch (error) {
    console.error("Error in main function:", error);
    throw new Error(error.message);
  }
};

const getAccessToken = async () => {
  try {
    const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;

    const authHeader = `Basic ${Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64")}`;

    const response = await axios.post(url, null, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error("Unable to get access token, please try again later.");
  }
};

const createMeeting = async (accessToken, startTime) => {
  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: "Zoom meeting integration",
        type: 2,
        start_time: startTime,
        duration: 30,
        timezone: "UTC",
        settings: {
          host_video: true,
          participant_video: true,
          mute_upon_entry: true,
          join_before_host: true,
          waiting_room: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const meetingInfo = response.data;
    return meetingInfo;
  } catch (error) {
    throw new Error("Unable to create session, please try again later.");
  }
};
