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

// Helper function to format the date as a readable time ago string (optional)
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return new Date(date).toLocaleDateString();
};
  

const createPost = async (req, res) => {
  const { event_type, title, description,employee_name, created_by } = req.body;

  // Handle the image file (using multer's 'single' or 'fields' logic)
  const image_url = (req.files && req.files['image_url'] && req.files['image_url'][0]) 
  ? `/public/${req.files['image_url'][0].filename}` 
  : req.body.image_url || null; // Fallback to a URL in the body if needed



  try {
    const result = await pool.query(
      `INSERT INTO Engage (
        event_type, 
        title,
        description,
        employee_name, 
        image_url, 
        created_by,
         created_at   
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
      RETURNING *`,
      [event_type, title, description, employee_name, image_url, created_by || 'Bajaj Finserv Direct Ltd (P']
    );


    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: " + err.message);
  }
};

const getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM Engage ORDER BY created_at DESC"
    );

    const formattedResults = result.rows.map(event => ({
      ...event,
      time_ago_display: timeAgo(event.created_at)
  }));

    res.status(200).json(formattedResults);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { event_type, title, description, employee_name } = req.body;

  try {
    // 1. Fetch current post to get existing image if no new one is uploaded
    const currentData = await pool.query("SELECT image_url FROM Engage WHERE id = $1", [id]);
    if (currentData.rows.length === 0) return res.status(404).send("Post not found");

    // 2. Determine image source: New file > existing URL > current DB value
    let image_url = currentData.rows[0].image_url;
    if (req.files && req.files['image_url'] && req.files['image_url'][0]) {
      image_url = `/public/${req.files['image_url'][0].filename}`;
    } else if (req.body.image_url) {
      image_url = req.body.image_url;
    }

    // 3. Update the database
    const result = await pool.query(
      `UPDATE Engage 
       SET event_type = $1, title = $2, description = $3, employee_name = $4, image_url = $5 
       WHERE id = $6 RETURNING *`,
      [event_type, title, description, employee_name, image_url, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: " + err.message);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM Engage WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json({ message: "Post deleted successfully", deletedPost: result.rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { 
    createPost, 
    getPosts,
    updatePost,
    deletePost,
    uploadMiddleware: upload.fields([
        { name: "image_url", maxCount: 1 }
      ]),
     };
