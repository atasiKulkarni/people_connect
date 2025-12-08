const pool = require("../config/db");
const multer = require("multer");


// Configure storage for multer (same as above)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Get all banners
const getBanners = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Banners ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get banner by ID
const getBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM Banners WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).send("Banner not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new banner
const addBanner = async (req, res) => {
  const { title, description } = req.body;
  const image_url = req.file ? `/public/${req.file.filename}` : null;

  if (!image_url) {
    return res.status(400).send("Image upload failed or no file provided.");
  }

  try {
    const result = await pool.query(
      "INSERT INTO Banners (title, description, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, description, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Look at your Node terminal for the EXACT error message here
    console.error("DEBUG: Database query failed:", err.message); 
    res.status(500).send("Internal Server Error: " + err.message);
  }
};

// Update banner
const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image_url = req.file ? `/public/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      "UPDATE Banners SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [title, description, image_url, id]
    );
  
    if (result.rows.length === 0) return res.status(404).send("Banner not found");
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM Banners WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).send("Banner not found");
    res.send("Banner deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getBanners,
  getBannerById,
  addBanner,
  updateBanner,
  uploadMiddleware: upload.single('bannerImage'),
  deleteBanner
};