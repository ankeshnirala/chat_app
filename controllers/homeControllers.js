const club = require("./../models/clubModels");

exports.homePage = async (req, res) => {
  const clubResult = await club.find({});
  const aggregateClubResult = await club.aggregate([
    {
      $group: { _id: "$country" },
    },
  ]);

  const dataChunk = [];
  const chunkSize = 3;

  for (let i = 0; i < clubResult.length; i += chunkSize) {
    dataChunk.push(clubResult.slice(i, i + chunkSize));
  }

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a._id.toUpperCase();
    const bandB = b._id.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  res.render("home", {
    title: "Chat App | Home",
    data: dataChunk,
    countries: aggregateClubResult.sort(compare),
    user: req.user,
  });
};
