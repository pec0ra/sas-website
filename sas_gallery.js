
// This is the id of the google spreadsheet. This id can be extracted from any spreadsheet URL
let SHEET_ID = "1iSgCcPCqCIH9uoeioCWQ8tKw36AIhfSmhm8yzEBK6vw"


// No need to edit unless the google api changes
let SHEET_JSON_ADDRESS = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?tqx=out:json"

function getRows(data) {
    var ret = {};
    var rowIndex = 0;
    data.forEach(function (entry) {
        if (!ret[rowIndex]) {
            ret[rowIndex] = {}
        }
        var colIndex = 1;
        entry.c.forEach(function (col) {
            if (col) {
                ret[rowIndex][colIndex] = col.v
            }
            colIndex++;
        })
        rowIndex++;
    })
    return ret;
}

window.addGallery = function (containerId, language) {
    var functionIndex;
    if (language === "fr") {
        functionIndex = 1;
    } else if (language === "de") {
        functionIndex = 2;
    } else {
        functionIndex = 3; // English
    }
    $(document).ready(function () {
        fetch(SHEET_JSON_ADDRESS)
            .then(res => res.text())
            .then(rawData => {
		console.log(rawData)
                const data = JSON.parse(rawData.substr(47).slice(0, -2));
		console.log(data)
                const allRows = getRows(data.table.rows);
                $.each(allRows, function (i, item) {
		    if (i != -1) {
		    console.log(i);
		    console.log(item);
			    if (item[1] === 'header') {
				console.log('header');
			        $(containerId).append('<h3 style="width:100%; text-align: center; font-family: Muli; font-size: 32px; line-height: 39px; padding: 30px; margin-top: 20px;">' + item[2] + '</h3>');
			    } else {
			        $(containerId).append('<a href="' + item[4] + '" style="position: relative; width: 320px; height: 220px; margin-bottom: 20px; margin-right: 20px;"><div class="publication" style="width: 100%; height: 100%; background-image: url(\'' + item[5] + '\');background-position: center center; background-repeat: no-repeat; background-size: cover; border-radius: 10px"><h4 style="position: absolute; bottom: 0px; margin: 0px; padding: 15px; width: 100%; color: #fff; border-radius: 10px; background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);">' + item[functionIndex] + '</h4></div></a>');
			    }
		    }
                });
            });
    });
};
