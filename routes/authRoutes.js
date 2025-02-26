const express = require("express");
const router = express.Router();
const path = require("path");
const admin = require("firebase-admin");
const chechAuth=require("../middlewares/authMiddleware")

const auth = admin.auth(); 

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views", "register.html"));
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        await auth.createUser({
            email,
            password
        });
        res.redirect("/login");
    } catch (error) {
        console.error("Error interno de registro:", error.message);
        res.status(500).send("Error interno de registro");
    }
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views", "login.html"));
});

router.post("/login", async (req, res) => {
    const { idToken } = req.body;
    try {
        await auth.verifyIdToken(idToken);
        res.cookie("token", idToken, { httpOnly: true, secure: false });
        res.json({ success: true });
        // console.log(idToken)
    } catch (error) {
        console.error(`Ha habido un error: ${error}`);
        res.status(401).json({ success: false, error: "Token inválido" });
    }
});
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views", "principal.html"));
});

router.get("/dashboard", chechAuth,(req, res) => {
    res.sendFile(path.join(__dirname, "../public/views", "dashboard.html"));
});

router.post("/logout",(req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
    
});

module.exports = router;
