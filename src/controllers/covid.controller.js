const { covidServiceTime } = require("../services/covid.service");

exports.getAllDates = async (req, res) => {
  try {
    const { status, success, response } = await covidServiceTime();

    return res.status(status).json({ success, response });
  } catch (e) {
    res.status(500).json({ message: "Internal Error" });
  }
};
