const OEMSpecsModel = require("../model/OEMspecsModel");

const postOEMspecs = async (req, res) => {
  try {
    await OEMSpecsModel.insertMany([
      {
        model: "Honda City",
        year: 2015,
        listPrice: 1500000,
        colors: ["White", "Black", "Silver", "Red"],
        mileage: 18,
        power: 118,
        maxSpeed: 180,
      },
      {
        model: "Maruti Swift",
        year: 2020,
        listPrice: 800000,
        colors: ["White", "Silver", "Grey", "Blue"],
        mileage: 22,
        power: 82,
        maxSpeed: 165,
      },
      {
        model: "BMW 5 Series",
        year: 2019,
        listPrice: 6000000,
        colors: ["Black", "White", "Silver", "Blue"],
        mileage: 20,
        power: 248,
        maxSpeed: 155,
      },
      {
        model: "Audi A4",
        year: 2021,
        listPrice: 5000000,
        colors: ["White", "Silver", "Grey", "Red"],
        mileage: 25,
        power: 201,
        maxSpeed: 149,
      },
      {
        model: "Toyota Corolla",
        year: 2018,
        listPrice: 1800000,
        colors: ["White", "Silver", "Blue", "Grey"],
        mileage: 16,
        power: 138,
        maxSpeed: 130,
      },
    ]);

    return res.status(201).json({ message: "OEM posted", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const getAllOEMspecs = async (req, res) => {
  const { model, year } = req.query;
  let query = {};

  if (model && year) {
    query = { model: { $regex: new RegExp(model, "i") }, year };
  } else if (model) {
    query = { model: { $regex: new RegExp(model, "i") } };
  } else if (year) {
    query = { year };
  }

  try {
    const specs = await OEMSpecsModel.find(query);

    if (specs.length === 0) {
      return res
        .status(404)
        .json({ message: "Specs not found", success: true });
    }

    res.json(specs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { postOEMspecs, getAllOEMspecs };
