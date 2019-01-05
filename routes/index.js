//we are moving the routes to this file
const express = require('express');

//use router constructor to create a new router
const router = express.Router();

/*to create a route, we will use the get method on the app object,
the get method is used to handle the get requests to a certain URL.
For this example we are going to create a route for the root route 
for our app*/

router.get('/', (req, res) => { //the callback will run when the client requests this route
    const name =  req.cookies.username;
    if (name) { //if name is present render index template with name
        res.render('index', { name: name}); //use res.render to display html created from pug file, since we set the view to pug we don't need to specify pug extension    
    } else { //otherwise if no name is present then redirect to hello page
        res.redirect('/hello');
    }
    
});

//Add another route for practice
router.get('/sandbox', (req, res) => { //the callback will run when the client requests this route
    res.render('sandbox', { prompt:  "This is me practicing here!"}); //pass variables to template
});

//Add hello route to serve the form itself
router.get('/hello', (req, res) => { //the callback will run when the client requests this route
    const name = req.cookies.username;
    if (name) { //if the name is present, redirect to index route
        res.redirect('/');
    } else { //if no name is present, then redirect to hello page
        res.render('hello', ); //pass in the cookie that contains the name
    }
   
}); 

//handle the form submission using post
router.post('/hello', (req, res) => { //the callback will run when the client requests this route
    res.cookie('username', req.body.username); //this make it so we store the cookie as it was sent along with the request  with the name to server
    res.redirect('/'); //redirect to welcome page after user submits form with name
    console.log('the post was successful')
});


//add new post route for goodbye button
router.post('/goodbye', (req, res) => { //the callback will run when the client requests this route
    res.clearCookie('username');
    res.redirect('/hello');
});

//export the router in order to reference it in the app.js file
module.exports = router;

