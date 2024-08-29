const zoomService = require("./../services/zoomService");

exports.createZoomSession = async (req, res, next) => {
  try {
    let startTime = req.body.startTime;
    let participants = req.body.participants;
    if (!startTime || !participants) {
      return res.status(400).json({
        status: "fail",
        message: "Bad request, please provide valid inputs.",
      });
    }
    let data = await zoomService.creatZoomMeeting(startTime, participants);
    res.status(200).json({ status: "success", data });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal server error, please try again later!",
    });
  }
};
