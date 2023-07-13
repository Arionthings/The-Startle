const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/', function (req, res) {
    var num1 = Number(req.body.wgt);
    var num2 = Number(req.body.hgt);
    var ans = Math.round(num1 / num2);
   res.send('Your BMI is ' + ans);
})

app.listen(3000, function () {
  console.log('Example app listening on port');
});