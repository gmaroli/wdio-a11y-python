const axeSource = require('axe-core').source;
import FileSystem from 'fs';

function runA11yTest(fileName, elem = null) {
    const fileDelimiter = ',';
    browser.execute(axeSource);
    let results;

    if (elem !== null) {
        const elemToTest = elem.selector;
        results = browser.executeAsync(function (elemToTest, done) {
            axe.run(
                {
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2aa', 'best-practice'],
                    },
                    include: [[elemToTest]],
                },
                (err, results) => {
                    if (err) done(err);
                    done(results);
                }
            );
        }, elemToTest);
    } else {
        results = browser.executeAsync(function (done) {
            axe.run(
                {
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2aa', 'best-practice'],
                    },
                },
                (err, results) => {
                    if (err) done(err);
                    done(results);
                }
            );
        });
    }

    var violationsToWrite = [];

    if (results.violations.length > 0) {
        var indexOfViolation = 0;
        for (var i in results.violations) {
            var description = '"' + results.violations[i].description.replace(/\n/g, ':') + '"';
            var help = results.violations[i].help;
            var helpUrl = results.violations[i].helpUrl;
            var id = results.violations[i].id;

            if (results.violations[i].nodes.length > 0) {
                for (var j in results.violations[i].nodes) {
                    var failureSummary = '"' + results.violations[i].nodes[j].failureSummary.replace(/\n/g, ':') + '"';
                    var html = '"' + results.violations[i].nodes[j].html.replace(/"/g, "'") + '"';
                    var impact = results.violations[i].nodes[j].impact;

                    var violationToInsert =
                        description +
                        fileDelimiter +
                        impact +
                        fileDelimiter +
                        html +
                        fileDelimiter +
                        failureSummary +
                        fileDelimiter +
                        id +
                        fileDelimiter +
                        help +
                        fileDelimiter +
                        helpUrl;
                    if (violationsToWrite.indexOf(violationToInsert) === -1) {
                        violationsToWrite[indexOfViolation] = violationToInsert;
                    }

                    indexOfViolation = indexOfViolation + 1;
                }
            }
        }
    }

    WriteViolations(violationsToWrite, fileName, fileDelimiter);
    return results;
}

/**
 *
 * @param {array} violationsData
 * @param {string} fileName
 * @param {string} fileDelimiter
 */
function WriteViolations(violationsData, fileName, fileDelimiter) {
    var dir = './results/a11y-results/';

    if (!FileSystem.existsSync(dir)) {
        FileSystem.mkdirSync(dir, { recursive: true });
    }

    if (FileSystem.existsSync(dir + fileName)) {
        FileSystem.unlinkSync(dir + fileName);
    }

    var headerLine =
        'description' +
        fileDelimiter +
        'impact' +
        fileDelimiter +
        'html' +
        fileDelimiter +
        'failureSummary' +
        fileDelimiter +
        'id' +
        fileDelimiter +
        'help' +
        fileDelimiter +
        'helpUrl';
    violationsData.unshift(headerLine);
    violationsData.forEach((element) => {
        FileSystem.appendFileSync(dir + fileName, element);
        FileSystem.appendFileSync(dir + fileName, '\n');
        FileSystem.mkdirSync;
    });
}

module.exports = {
    runA11yTest,
};
