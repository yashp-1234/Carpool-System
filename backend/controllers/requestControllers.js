const expressAsyncHandler = require("express-async-handler");
const RequestModel = require("../Models/formModel");
const User = require("../Models/userModel");

// Make a request
const makeRequest = expressAsyncHandler(async (req, res) => {
  const { frequency, mode, area, arrtime, deptime, service } = req.body;
  const userEmail = req.headers["user-email"];

  if (!frequency || !mode || !area || !arrtime || !deptime || !service) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const reqExists = await RequestModel.findOne({ userEmail });

  if (reqExists) {
    res.status(400);
    throw new Error("Request already exists");
  }

  const request = await RequestModel.create({
    frequency,
    mode,
    area,
    arrtime,
    deptime,
    service,
    userEmail,
  });

  if (request) {
    res.status(201).json({
      _id: request.id,
      frequency: request.frequency,
      mode: request.mode,
      area: request.area,
      arrtime: request.arrtime,
      deptime: request.deptime,
      service: request.service,
      userEmail: userEmail,
    });

  } else {
    res.status(401);
    throw new Error("Failed to create the user");
  }
});

const checkRequest = expressAsyncHandler(async (req, res) => {
  const email = req.headers["user-email"];
  if (!email) {
    res.status(400);
    throw new Error("Email not provided");
  }

  const reqExists = await RequestModel.findOne({ userEmail: email });
  if (reqExists) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

// Get my request
const getMyRequest = expressAsyncHandler(async (req, res) => {
  const email = req.headers["user-email"];
  if (!email) {
    res.status(400);
    throw new Error("Email not provided");
  }

  try {
    const reqInfo = await RequestModel.findOne({ userEmail: email });

    if (!reqInfo) {
      res.status(404);
      throw new Error("Request not found");
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const combinedInfo = {
      ...reqInfo._doc,
      user: userInfo,
    };

    res.status(200).json(combinedInfo);
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

// // Create a new request
// const createRequest = expressAsyncHandler(async (req, res) => {
//     const { frequency, mode, area, arrtime, deptime, service } = req.body;
//     const email = req.headers["user-email"];

//     if (!email) {
//       res.status(400);
//       throw new Error("Email not provided");
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       res.status(404);
//       throw new Error("User not found");
//     }

//     const newRequest = new RequestModel({
//       userEmail: email,
//       frequency,
//       mode,
//       area,
//       arrtime,
//       deptime,
//       service,
//     });

//     const createdRequest = await newRequest.save();

//     res.status(201).json({
//       _id: createdRequest._id,
//       userEmail: createdRequest.userEmail,
//       frequency: createdRequest.frequency,
//       mode: createdRequest.mode,
//       area: createdRequest.area,
//       arrtime: createdRequest.arrtime,
//       deptime: createdRequest.deptime,
//       service: createdRequest.service,
//     });
//   });

// Update an existing request
const updateRequest = expressAsyncHandler(async (req, res) => {
  const { frequency, mode, area, arrtime, deptime, service } = req.body;
  const email = req.headers["user-email"];

  if (!email) {
    res.status(400);
    throw new Error("Email not provided");
  }

  const request = await RequestModel.findOne({ userEmail: email });

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  request.frequency = frequency || request.frequency;
  request.mode = mode || request.mode;
  request.area = area || request.area;
  request.arrtime = arrtime || request.arrtime;
  request.deptime = deptime || request.deptime;
  request.service = service || request.service;

  const updatedRequest = await request.save();

  res.status(200).json({
    _id: updatedRequest._id,
    userEmail: updatedRequest.userEmail,
    frequency: updatedRequest.frequency,
    mode: updatedRequest.mode,
    area: updatedRequest.area,
    arrtime: updatedRequest.arrtime,
    deptime: updatedRequest.deptime,
    service: updatedRequest.service,
  });
});

// Delete an existing request
const deleteRequest = expressAsyncHandler(async (req, res) => {
  const email = req.headers["user-email"];

  if (!email) {
    res.status(400);
    throw new Error("Email not provided");
  }

  try {
    const deletedRequest = await RequestModel.findOneAndDelete({
      userEmail: email,
    });

    if (!deletedRequest) {
      res.status(404);
      throw new Error("Request not found");
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

//Get all the entries
const entriesRequest = expressAsyncHandler(async (req, res) => {
    const email = req.headers["user-email"];
    if (!email) {
      res.status(400).json({ message: "Email not provided" });
      return;
    }
  
    try {
      const reqInfo = await RequestModel.findOne({ userEmail: email });
  
      if (!reqInfo) {
        res.status(404).json({ message: "Request not found" });
        return;
      }

      let acceptService = "";

      if(reqInfo.service === "need"){
        acceptService = "offer"
      }
      else{
        acceptService = "need"
      }
  
      const requestsInfo = await RequestModel.find({ area: reqInfo.area, service: acceptService});

    const entries = await Promise.all(requestsInfo.map(async (request) => {

        if (request.userEmail === email) {
            return null; 
          }

        const userInfo = await User.findOne({ email: request.userEmail });
  
        if (!userInfo) {
          return {
            ...request._doc,
            user: 'User not found',
          };
        }
  
        return {
          ...request._doc,
          user: userInfo,
        };
      }));

      const filteredEntries = entries.filter(entry => entry !== null);

      res.status(200).json(filteredEntries);


    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = {
  makeRequest,
  checkRequest,
  getMyRequest,
  updateRequest,
  deleteRequest,
  entriesRequest,
};
