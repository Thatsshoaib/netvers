
const express = require("express");
const db = require("../config/db"); // Ensure DB connection is correct
const router = express.Router();

router.get("/history", async (req, res) => {
  try {
    const [epins] = await db.execute("SELECT * FROM epins"); // Adjust query if needed
    res.json(epins); // ✅ Ensure it returns JSON
  } catch (error) {
    console.error("Error fetching E-PIN history:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Fetch assigned E-PINs using stored procedure
router.get("/user-epins/:userID", async (req, res) => {
    const { userID } = req.params;

    // Debugging - Check if userID is valid
    console.log("Fetching E-PINs for userID:", userID);

    if (!userID) {
        return res.status(400).json({ error: "Invalid User ID" });
    }

    try {
        const query = `CALL GetUserEpins(?)`;
        const [results] = await db.query(query, [userID]);

        // Debugging - Check if results are returned
        console.log("E-PIN Query Results:", results);

        if (!results || results.length === 0 || !results[0] || results[0].length === 0) {
            return res.status(404).json({ message: "No assigned E-PINs found" });
        } 

        res.json(results[0]); // The first result set contains the data
    } catch (error) {
        console.error("Error fetching E-PINs:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});





module.exports = router; // ✅ Ensure you're exporting the router
