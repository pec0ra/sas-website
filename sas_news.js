// This is the id of the google spreadsheet. This id can be extracted from any spreadsheet URL
let SAS_NEWS_SHEET_ID = "1rH9hfFCJqHfFE_1mgHSzBlB9NsJDv6IYordffz2c-KI"


// No need to edit unless the google api changes
let SHEET_JSON_ADDRESS = "https://docs.google.com/spreadsheets/d/" + SAS_NEWS_SHEET_ID + "/gviz/tq?tqx=out:json"

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

window.addSasNews = function (containerId) {
    $(document).ready(function () {
        fetch(SHEET_JSON_ADDRESS)
            .then(res => res.text())
            .then(rawData => {
		console.log(rawData)
                const data = JSON.parse(rawData.substr(47).slice(0, -2));
		console.log(data)
                const allRows = getRows(data.table.rows);
                $.each(allRows, function (i, item) {
		    if (i != 0) {
		    console.log(i);
		    console.log(item);
			    if (item[1] === 'header') {
				console.log('header');
			        $(containerId).append('<h3 style="width:100%; text-align: center; font-family: Muli; font-size: 32px; line-height: 39px; padding: 30px; margin-top: 20px; color: rgb(1, 58, 129);">' + item[2] + '</h3>');
			    } else {
			        $(containerId).append('<a href="' + item[2] + '" target="_blank" style="position: relative; width: 320px; height: 450px; margin-bottom: 72px; text-decoration: none;"><div class="publication" style="width: 100%; height: 100%; background-color: rgb(1, 58, 129); background-image: url(\'' + item[3] + '\'), url(\'https://cdn.jsdelivr.net/gh/pec0ra/sas-website@latest/sas-news-placeholder.png\');background-position: center center; background-repeat: no-repeat; background-size: cover"></div><div style="position: relative; width:100%; padding-top: 15px; padding-bottom: 15px; "><h4 style="margin: 0; padding-left: 15px; padding-right: 15px; text-align: center; font-weight: 600; color: #2f363b">SAS News ' + item[1] + '</h4><div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 40px; height: 3px; background: rgb(1, 58, 129);"></div></div></a>');
			    }
		    }
                });
            });
    });
};


  
