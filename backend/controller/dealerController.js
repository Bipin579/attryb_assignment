const DealerInventoryModel = require("../model/dealerInventoryModel");
const MarketplaceInventoryModel = require("../model/maketplaceInventoryModel");

const postCar = async (req, res) => {
  try {
    const user = req.user;
    const {
      oemSpecId,
      imageUrl,
      kmsOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
    } = req.body;

    await DealerInventoryModel.create({
      oemSpecId,
      imageUrl,
      kmsOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      dealerId: user,
    });
    res.status(201).json({ message: "Car added", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const getDealerInventory = async (req, res) => {
  try {
    const cars = await DealerInventoryModel.find({
      dealerId: req.user,
    }).populate("oemSpecId");

    res.status(200).json({ cars, success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const publicCar = async (req, res) => {
  try {
    const id = req.params.id;
    const { publish } = req.body;
    // updating inventory to publish in marketplace or remove based on condition
    await DealerInventoryModel.findByIdAndUpdate(id, { publish });
    // again finding the updated data by its id
    const car = await DealerInventoryModel.findById(id);
    // checking if car is already in marketplace inventory then delete it if not add it

    // destructuring data
    const {
      oemSpecId,
      imageUrl,
      kmsOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      dealerId,
    } = car;

    // updated data is public

    if (car.publish) {
      await MarketplaceInventoryModel.create({
        oemSpecId,
        imageUrl,
        kmsOnOdometer,
        majorScratches,
        originalPaint,
        accidentsReported,
        previousBuyers,
        registrationPlace,
        dealerId,
        productId: car._id,
      });
      res
        .status(201)
        .json({ message: "Data Updated Successfully", success: true });
    } else {
      // Delete the record from MarketplaceInventoryModel based on productId
      await MarketplaceInventoryModel.deleteOne({ productId: car._id });

      res
        .status(200)
        .json({ message: "Data Deleted Successfully", success: true });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const editCar = async (req, res) => {
  try {
    const id = req.params.id;
    // updating inventory to publish in marketplace or remove based on condition
    await DealerInventoryModel.findByIdAndUpdate(id, req.body);
    // again finding the updated data by its id
    const car = await DealerInventoryModel.findById(id);
    // checking if car is already in marketplace inventory then delete it if not add it

    // destructuring data
    const {
      oemSpecId,
      imageUrl,
      kmsOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      dealerId,        //dealer //market
    } = car;

    // updated data is public

    if (car.publish) {
      await MarketplaceInventoryModel.findOneAndUpdate({ productId: car._id }, {
        oemSpecId,
        imageUrl,
        kmsOnOdometer,
        majorScratches,
        originalPaint,
        accidentsReported,
        previousBuyers,
        registrationPlace,
        dealerId,
      });
      return res
        .status(201)
        .json({ message: "Data Updated Successfully", success: true });
    }
    return res
      .status(201)
      .json({ message: "Data Updated Successfully", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};


const deleteItems = async (req, res) => {
  try {
    const { ids } = req.body;
    await MarketplaceInventoryModel.deleteMany(
      {
        productId: {
          $in: ids
        }
      },
    )
    await DealerInventoryModel.deleteMany(
      {
        _id: {
          $in: ids
        }
      }
    )
    res.status(200).json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
}

module.exports = { postCar, getDealerInventory, publicCar, editCar, deleteItems };


