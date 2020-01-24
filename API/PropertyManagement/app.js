var express = require('express');
var app = express();

app.get('', (req, res) => {
    res.send(
        'Hello Express!'
    )
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
    
})