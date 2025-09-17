
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

function filterRows(rows, section) {
    const ret = [];
    $.each(rows, function (i, row) {
        if (row[1] === section) {
            ret.push(row)
        }
    })
    return ret;
}

window.addCommittee = function (containerId, section, language) {
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
			        $(containerId).append('<h3 style="width:100%">' + item[2] + '</h3>');
			    } else {
			        $(containerId).append('<div class="publication" style="width: 25%;margin-bottom: 40px;text-align: center;"><a href="' + item[4] + '"><img alt="' + item[functionIndex] + '" src="' + item[5] + '" height="160" style="object-fit: cover;height: 160px; width: 240px"><h4>' + item[functionIndex] + '</h4></a></div>');
			    }
		    }
                });
            });
    });
};
