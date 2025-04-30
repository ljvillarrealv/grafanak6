const { generateReport } = require('k6-html-reporter');

const options = {
    jsonFile 'summary.json',
    output 'summary.html',
};

generateReport(options);
