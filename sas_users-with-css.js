// This is the base url to the portrait images. It needs to end with a slash "/" (e.g. "http://pabrasey.webfactional.com/sas/users/photos/")
let BASE_IMG_URL = "https://cdn.jsdelivr.net/gh/pec0ra/sas-website/photos/"

// This is the id of the google spreadsheet. This id can be extracted from any spreadsheet URL
let SHEET_ID = "1k4pfhABQ44m5v8_T_4k4F-dQ6gt3MFYjcBAMe2BOubA"


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
        functionIndex = 4;
    } else if (language === "de") {
        functionIndex = 3;
    } else {
        functionIndex = 2; // English
    }
    $(document).ready(function () {
        fetch(SHEET_JSON_ADDRESS)
            .then(res => res.text())
            .then(rawData => {
                const data = JSON.parse(rawData.substr(47).slice(0, -2));
                const allRows = getRows(data.table.rows);
                const sectionRows = filterRows(allRows, section);
                $.each(sectionRows, function (i, item) {

                    let imgURL
                    if (item[12]){
                        imgURL = BASE_IMG_URL + item[12] + ".jpg";
                    } else {
                        imgURL = BASE_IMG_URL + "default.jpg";
                    }

                    $(containerId).append('<div class="user" style="width: 25%;margin-bottom: 40px;text-align: center;"><img alt="' + item[5] + ' ' + item[6] + '" src="' + imgURL + '" width="160" height="160" style="object-fit: cover;width: 160px;height: 160px;border-radius: 50%;"><div class="user__content" style="padding: 20px 10px;"><span style="position: absolute;bottom: -10px;left: 50%;transform: translateX(-50%);width: 40px;height: 3px;background: rgb(1, 58, 129);"></span><h4 style="position: relative;display: inline-block;font-weight: 600;">' + item[functionIndex] + '</h4><p style="line-height: 30px">' + item[5] + ' ' + item[6] + '</p><a href="mailto:' + item[7] + '">' + item[7] + '</a></div></div>');
                });
            });
    });
};


window.addAthlete = function (containerId, section, language) {
    var functionIndex;
    if (language === "fr") {
        functionIndex = 4;
    } else if (language === "de") {
        functionIndex = 3;
    } else {
        functionIndex = 2; // English
    }
    $(document).ready(function () {
        fetch(SHEET_JSON_ADDRESS)
            .then(res => res.text())
            .then(rawData => {
                const data = JSON.parse(rawData.substr(47).slice(0, -2));
                const allRows = getRows(data.table.rows);
                const sectionRows = filterRows(allRows, section);
                $.each(sectionRows, function (i, item) {

                    let imgURL
                    if (item[12]){
                        imgURL = BASE_IMG_URL + item[12] + ".jpg";
                    } else {
                        imgURL = BASE_IMG_URL + "default.jpg";
                    }

                    $(containerId).append('<div class="user"><img alt="' + item[5] + ' ' + item[6] + '" src="' + imgURL + '" width="160" height="160" style="object-fit: cover;width: 160px;height: 160px;"><div class="user__content"><h4>' + item[functionIndex] + '</h4><p>' + item[5] + ' ' + item[6] +  '</p></div></div>');
                });
            });
    });
};
