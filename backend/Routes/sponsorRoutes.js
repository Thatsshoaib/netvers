const express = require("express");
const db = require("../config/db"); // Ensure database connection is correct
const router = express.Router();

router.get("/sponsors", async (req, res) => {
    const userId = req.query.userId;

    console.log("🔹 Received userId from frontend:", userId);

    if (!userId) {
        console.warn("⚠️ No userId provided in request.");
        return res.status(400).json({ error: "Missing userId parameter." });
    }

    try {
        const query = `CALL GetSponsors(?);`;

        console.log("📢 Executing Stored Procedure:", query, "with userId:", userId);

        // ✅ Use `await db.execute()` instead of `db.query()`
        const [results] = await db.execute(query, [userId]);

        console.log("✅ Stored Procedure Response:", results);

        if (!results || results.length === 0 || results[0].length === 0) {
            console.warn("⚠️ No sponsors found for userId:", userId);
            return res.json([]);
        }

        res.json(results[0]); // Stored procedures return an array inside an array
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/directs", async (req, res) => {
    const userId = req.query.userId;

    console.log("🔹 Fetching directs for userId:", userId);

    if (!userId) {
        console.warn("⚠️ No userId provided.");
        return res.status(400).json({ error: "Missing userId parameter." });
    }

    try {
        // Direct SQL query to count the number of users with the given sponsor ID
        const query = `SELECT COUNT(*) AS total_directs FROM userplans WHERE sponsor_id = ?;`;

        console.log("📢 Executing Query:", query, "with userId:", userId);

        const [results] = await db.execute(query, [userId]);

        console.log("✅ Query Result:", results);

        // If no directs found, return 0
        const totalDirects = results[0]?.total_directs || 0;
        res.json({ total_directs: totalDirects });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/total-income", async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const [income] = await db.execute(
            "SELECT SUM(amount) AS total_income FROM commission WHERE user_id = ?",
            [userId]
        );

        return res.json({ total_income: income[0]?.total_income || 0 });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
// Get all users
router.get("/users", async (req, res) => {
    try {
        const [users] = await db.query("SELECT user_id, name, email FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
