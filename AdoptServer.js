const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//sessions
const session = require("express-session");
app.use(session({
    secret: "adsdasdadasdsdads",
    cookie: {
        maxAge: 60000000,
    }
}));
//check if username is taken
function isUsernameTaken(username){
    let answer = false;
    const accountsFilePath = `${__dirname}/data/accounts.txt`;
    const accountsData = fs.readFileSync(accountsFilePath, 'utf-8');
    const accountsArray = accountsData.split('\n');
    for (let i = 0; i < accountsArray.length; i++) {
        const accountAndPswrd = accountsArray[i].split(':');//username is 0 and password is 1
        if (accountAndPswrd[0] === username) {
            answer = true;
        }
    }
    return answer;
}
//add a user to the .txt file
function addUser(username, password) {
    fs.appendFileSync(`${__dirname}/data/accounts.txt`, '\n' + username + ':' + password + '\n', 'utf-8');
}
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (isUsernameTaken(username)) {
        res.send('<script>alert("Username is already taken!"); window.history.back(); </script>'); //username not unique
    }
    else{
        addUser(username, password); //adds new user
        res.send('<script>alert("User registered successfully!\nYou can now login whenever"); window.history.back(); </script>');
    }
});

//check if login is correct
app.post('/login', (req, res) => {
    let answerAccount = false;
    let answerPassword = false;

    const username = req.body.username;
    const password = req.body.password;

    const accountsFilePath = `${__dirname}/data/accounts.txt`;
    const accountsData = fs.readFileSync(accountsFilePath, 'utf-8');
    const accountsArray = accountsData.split('\n');

    for (let i = 0; i < accountsArray.length; i++) {
        const accountAndPswrd = accountsArray[i].split(':');//username is 0 and password is 1
        if (accountAndPswrd[0] === username && accountAndPswrd[1] === password) {
            answerAccount = true;
            answerPassword = true;
        }
    }

    if (answerAccount && answerPassword) {
        req.session.isLoggedIn = true; //sets the session to logged in
        req.session.user = username;
        res.send('<script>alert("Login successful!"); window.location.href = "/Give_Away"; </script>');
    } else {
        res.send('<script>alert("Incorrect username or password!"); window.history.back(); </script>');
    }
});

var id = 0;
app.post('/addPet', (req, res) => {
    const username = req.session.user;
    const animal = req.body.Animal;
    const breed = req.body.Breed;
    const age = req.body.Age;
    const gender = req.body.gender;
    const along_with = req.body.along_with;
    const comments = req.body.comments;
    const name_of_owner = req.body.name_of_owner;
    const email = req.body.email;

    const filePath = `${__dirname}/data/availablePetInformation.txt`;


    if(req.session.isLoggedIn){
        id++;
        const pet = `${id}:${username}:${animal}:${breed}:${age}:${gender}:${along_with}:${comments}`;

        fs.appendFileSync(filePath,pet + '\n', 'utf-8');
        res.send('<script>alert("Pet added successfully!"); window.history.back();</script>');
    }
    else{
        res.send('<script>alert("You need to login to add a pet!"); window.history.back();</script>');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('<script>alert("You have been logged out successfully!"); window.location.href = "/";</script>');
});



//this puts is a function to put the header and footer in the pages
function putHeaderFooter(req, res) {
    const headerFooter = fs.readFileSync(`${__dirname}/header_footer.html`, 'utf-8'); //reads the header and footer file
    const content = fs.readFileSync(req, 'utf-8'); //reads the page that is gona get the header and footer
    const finalPage = headerFooter.replace("injectionspot", content); //puts the html of page in between the header and footer
    res.send(finalPage); //sends the final page
}

//this makes all the pages run with the header and footer
app.get('/', (req, res) => {
    putHeaderFooter(`${__dirname}/Home.html`, res);
});

app.get('/account', (req, res) => {
    putHeaderFooter(`${__dirname}/account.html`, res);
});

app.get('/Browse_Available_Pets', (req, res) => {
    putHeaderFooter(`${__dirname}/Browse_Available_Pets.html`, res);
});

app.get('/Find_Dog_Cat', (req, res) => {
    putHeaderFooter(`${__dirname}/Find_Dog_Cat.html`, res);
});

app.get('/Dog_Care', (req, res) => {
    putHeaderFooter(`${__dirname}/Dog_Care.html`, res);
});

app.get('/Cat_Care', (req, res) => {
    putHeaderFooter(`${__dirname}/Cat_Care.html`, res);
});
//login + session
app.get('/Give_Away', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.sendFile(`${__dirname}/login.html`); // Redirect to the login page if not logged in
    }
    else{
        putHeaderFooter(`${__dirname}/Give_Away.html`, res);
    }
});
//

app.get('/Contact_Us', (req, res) => {
    putHeaderFooter(`${__dirname}/Contact_Us.html`, res);
});

app.get('/Privacy_Policy', (req, res) => {
    res.sendFile(`${__dirname}/Privacy_Policy.html`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});