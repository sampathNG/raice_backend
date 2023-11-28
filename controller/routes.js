const router = require("express").Router();
const api = require("./apiRoutes");
const jwt = require("jsonwebtoken");
function authenticateAndAuthorize(roles = []) {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(token, "secretKey");
      const userRole = decodedToken.role;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized" });
    }
  };
}
router.get("/api", api.start);
router.post("/api/cu", api.createUser);
router.get("/api/login", api.userLogin);
router.get("/api/gau", authenticateAndAuthorize(["admin"]), api.getAllUsers);
router.delete(
  "/api/dau",
  authenticateAndAuthorize(["admin"]),
  api.deleteAllUsers
);
router.post("/api/cb", authenticateAndAuthorize(["admin"]), api.createtask);
router.get(
  "/api/gab",
  authenticateAndAuthorize(["user", "admin"]),
  api.getAlltasks
);
router.get(
  "/api/gob/:id",
  authenticateAndAuthorize(["user", "admin"]),
  api.getOnetask
);
router.delete(
  "/api/dob/:id",
  authenticateAndAuthorize(["admin"]),
  api.deleteOnetask
);
router.put(
  "/api/uob/:id",
  authenticateAndAuthorize(["admin"]),
  api.updateOnetask
);
module.exports = router;
