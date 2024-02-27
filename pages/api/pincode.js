export default function handler(req, res) {
  res
    .status(200)
    .json({
      "570011": ["Mysore", "Karnataka"],
      "102321": ["Coimbatore", "TamilNadu"],
      "110111": ["Madras", "Chennai"],
    });
}
