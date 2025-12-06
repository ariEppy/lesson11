const express = require("express")
const fs = require("fs");
const app = express()
const path = require("path")
const PORT = 4000

const logger = (req , res, next) =>{
    const now = new Date()
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    console.log(`Date: ${date} ${time}\nRequest: ${req.method}\nEndpoint: ${req.path}`)
    next()
}
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "signin.html"));
});

app.use(logger)
app.use(express.static("client"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Get requests
app.get("/homepage",(req,res)=>{
    res.sendFile(path.join(__dirname,"client", "homepage.html"))
})
app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname,"client", "signin.html"))
})


app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"client", "signup.html"))
})


app.get("/homePageUser", (req, res) => {
    fs.readFile("client/users.txt", "utf8", (err, data) => {
        if (err) 
            return res.status(500).send("Error reading file");
        const lines = data.trim().split("\n");
        const lastLine = lines[lines.length - 1];
        const parts = lastLine.split(",");
        const usernamePart = parts[0]; 
        const username = usernamePart.split(":")[1].trim();


        res.send(username);
    });
});


app.post("/signin/fetch",(req,res)=>{
    const {username} = req.body
    if(username.length < 2){
        return res.send("your name must be at least a length of 2")
    }
    return res.send("OK");

})
app.post("/signup/fetch",(req,res)=>{
    const {username, email, password, confirmPassword} = req.body
    if(username.length < 4 || username.length > 8){
        return res.send("your username must be between 4-8 characters")
    }
    if(!email.includes("@"))
        return res.send("your email must have an @")
    if((password.length < 5 || password.length > 10) && !password.includes("$"))
        return res.send("your password must be between 5-10 characters and have a $ sign");
    if(password !== confirmPassword)
        return res.send("passwords are not identical");
    
    
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

    fs.appendFile("client/users.txt", userData, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving user");
        }
        res.send("OK");
    });
});



app.listen(PORT , () =>{
    console.log(`Server is live on http://localhost:${PORT}`)
})