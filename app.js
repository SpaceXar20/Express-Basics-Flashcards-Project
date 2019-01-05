const express = require('express'); //use require method to require the express module

//require body parser, Both body parser and cookie parser are middleware
const bodyParser = require('body-parser');

//require cookie-Parser
const cookieParser = require('cookie-parser');


/*to create an express application,
 we can just call express method, 
 the express function returns an express application,  we assign the the express
 app to a new var called app*/
const app = express();

app.use(bodyParser.urlencoded({extended: false})); //use bodyParser in app

app.use(cookieParser()); //use cookie parser in app


//add express.static to serve static assets
app.use('/static', express.static('public'));

/*we tell express to use pug by using the set() method to set view engine
to parameter pug*/
app.set('view engine', 'pug');

//import routes
const mainRoutes = require ('./routes/index');//create reference to main routes
const cardRoutes = require('./routes/cards');
//use routes variable in a middleware function to pass in the routes
app.use(mainRoutes); 
app.use('/cards', cardRoutes); 


//lets write a middleware function, we'll often pass middleware as an anonymous function into app.use method
app.use((req, res, next) => {
    req.message = 'This message made it!';
   next(); //we are able to pass [req.message] from first function to second one
});

//another middleware function to create an error
// app.use((req, res, next) => {
//     console.log(req.message);
//     const err = new Error('Oh no!'); //create an error
//     err.status = 500;
//     next(err);
// });


app.use((req, res, next) => { //we want to access the request at the end of our app 
    const err = new Error ('Not Found');
    err.status = 404;
    next(err);    
});



//lets add an error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});



/*setup the development server using the listen method
and give parameter of 3000 which is the port number*/

app.listen(3000, () => { //the listen method can take a callback function as a parameter
    console.log('The application is running on localhost:3000!');
});