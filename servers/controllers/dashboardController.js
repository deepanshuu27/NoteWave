const Note = require("../models/Notes");
const mongoose = require("mongoose");

 exports.homepage = async (req, res, next) => {
  let perPage = 8;
  let page = req.query.page || 1;


  try {
    if (!req.user || !req.user.id) {
      throw new Error("User ID is missing");
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const notes = await Note.aggregate([
      {
        $sort: {updatedAt: -1, },
      },
      { $match: { user: userId } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Note.countDocuments({ user: userId }).exec();

    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error(error);
    next(error); // pass the error to the next middleware
  }
  
  // async function deleteAllDocuments() {
  //   try {
  //     await Note.deleteMany({});
  //     console.log("All documents deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting documents:", error);
  //   }
  // }
  
  // // Call the function to delete all documents
  // deleteAllDocuments();
  

async function insertDummy(){
try {
  await Note.insertMany([
    {
      user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "In this tutorial, we are going to create a simple, accessible and responsive navigation menu bar and side menu using TailwindCSS v3.0 and Alpine.js. For those of you who would prefer a Video Tutorial you can watch it here.",
        body: "Let's look into JS animations",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "Create Responsive Side Navigation using TailwindCSS and AlpineJs",
        body: "Let's look into JS animations",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "JavaScript Animations",
        body: "JavaScript Animations are pretty cool.",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "JavaScript Async Await",
        body: "In this short tutorial, I will re-use some of the code I wrote for a YouTube tutorial creating an Apex Legend-inspired menu. I will make a simple function that fetches data from a dummy API and display some of it on the page.",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "How To Use DOTENV",
        body: "Node.js runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "MongoDB Tutorial",
        body: "Node.js is an open-source server environment. Node.js is cross-platform and runs on Windows Linux Unix and macOS. Node.js is a back-end JavaScript runtime environment. Node.js runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "Learn Morgan",
        body: "Morgan is a Node.js middleware to log HTTP requests. Monitoring and reading logs can help you better understand how your application behaves.",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
      {
        user: new mongoose.Types.ObjectId("66b3bcd0ad99d0bbee21743d"), // Correct usage with 'new'
        title: "Build a React Portfolio with TailwindCSS",
        body: "Learn how to add TailwindCSS to your React project and build a portfolio with Tailwind's grid layouts, typography, and responsive design.",
        createdAt: new Date(1671634422539),
        updatedAt: new Date(1671634422539)
      },
    ]);

    console.log("Documents inserted successfully");
  } catch (error) {
    console.log("Error:", error);
  }

};


// insertDummy();            for inserting dummy data

}; 



// GET/  VIEW SPECIFIC NOTE
exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-notes", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Something went wrong.");
  }
};



/**
 * PUT /
 * Update Specific Note
 */


exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};



/**
 * DELETE /
 * Delete Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};



/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};


/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};



/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};



/**
 * POST /
 * Search For Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

