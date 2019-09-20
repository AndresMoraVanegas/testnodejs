
var express = require('express');
var app = express();
var fs = require('fs');
//var obj = JSON.parse(fs.readFileSync('test.json', 'utf8'));
var config = require('./test.json');
var axios = require('axios');
// var axios = require('axios');

app.get('/', function (req, res) {
    const response = [];
    try {
        const data = config.hits.hits;
        let auto = 0;
        const url = 'http://localhost:9200/bocc-test/doc';
        data.forEach((element) => {
            try {
                const body = JSON.stringify(element._source);

                axios(
                    {
                        method: "POST",
                        url,
                        headers: { "Content-Type": "application/json" },
                        data: body
                    })
                    .then(function (response) {
                        //console.log(response);
                        console.log(response.data);
                        console.log("inserción");
                    })
                    .catch(function (error) {
                        console.log("error en la inserción");
                        console.log(error);
                        //console.log(error);
                    });

            } catch (error) {
                //console.log(error);
                console.log("ocurrió un error");
            }

            //response.push(element._source);
            auto++;
        });
        res.json(response);
    } catch (error) {
        console.log(error);
        console.log("Ocurrió un error inicio");
        res.json(response);
        //console.log(error);
    }

});

app.listen(3001, function () {
    console.log('Example app listening on port 3000!');
});
