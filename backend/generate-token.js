//In order to connect to a room, users need a jwt access token
const env = require("dotenv").config();
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;

const VideoGrant = AccessToken.VideoGrant;

const getVideoToken = (identity, room) => {
  //Create token to be returned to client
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );
  token.identity = identity;

  //Grant access only to Twilio Video
  const videoGrant = new VideoGrant();
  videoGrant.room = room;
  token.addGrant(videoGrant);

  return token.toJwt();
};

module.exports = getVideoToken;
