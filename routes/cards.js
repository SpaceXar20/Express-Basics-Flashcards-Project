const express = require('express');

//use router constructor to create a a router instance
const router = express.Router();

//require json  data file and store in a variable
const data = require('../data/flashcardData.json').data;

//store card data separately
const cards  =  data.cards;

//router to randomize cards
router.get('/', (req, res ) =>{
    const numberOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashCardId}`)    
});

router.get('/:id', (req, res) => { //declare a route parameter, the colon tells express to treat that part of the url as a variable
    const { side } = req.query;
    const { id } = req.params;

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }    
    const name = req.cookies.username; //get cookies from client's request
    const text = cards[id][side];
    const { hint } = cards[id]; //store reference for hint

    const templateData = { id, text, name };

    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer' ) {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});
router.post('/goodbye', (req,res) => { //this fixes the issue of getting error 404 when trying to push the goodbye button
    res.clearCookie('user_name')
    res.redirect('/hello')
  })

//export the router in order to reference it in the app.js file
module.exports = router;