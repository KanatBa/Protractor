var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003a003d-00f1-00f9-000d-003c00010081.png",
        "timestamp": 1547007865731,
        "duration": 4693
    },
    {
        "description": "should verify Home Button is Displayed|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00560024-0012-00e4-0014-009400dd0013.png",
        "timestamp": 1547007870790,
        "duration": 828
    },
    {
        "description": "Should verify Page Header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0014004e-00f7-0042-007e-007300ae00e5.png",
        "timestamp": 1547007871983,
        "duration": 607
    },
    {
        "description": "should check Bank Manager button text|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00360063-0002-0097-002e-00a900ab0005.png",
        "timestamp": 1547007872891,
        "duration": 560
    },
    {
        "description": "should check Bank Manager Login button displayed|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00570038-00de-0052-007c-00f300da00f9.png",
        "timestamp": 1547007873811,
        "duration": 593
    },
    {
        "description": "should check Bank Manager Login button displayed and check text by ngClick|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00bc0025-00ff-004a-00ae-00f300de0095.png",
        "timestamp": 1547007874718,
        "duration": 781
    },
    {
        "description": "should stay when click home page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e20002-007c-009a-005d-005800fe007a.png",
        "timestamp": 1547007875809,
        "duration": 7494
    },
    {
        "description": "should display options for manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005900d4-00c1-000e-0017-0059002800fe.png",
        "timestamp": 1547007883759,
        "duration": 2919
    },
    {
        "description": "should display form for Adding Customer|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001c00e1-004f-0083-004f-00cb00540088.png",
        "timestamp": 1547007887042,
        "duration": 1052
    },
    {
        "description": "Should list first name in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00750029-00c4-007e-000c-0080005000da.png",
        "timestamp": 1547007888422,
        "duration": 784
    },
    {
        "description": "Should list First Name label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00350064-0070-00a8-00f3-00cd003f0055.png",
        "timestamp": 1547007889504,
        "duration": 822
    },
    {
        "description": "Should list Last Name label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0063001b-0047-0080-006b-00c700f8006e.png",
        "timestamp": 1547007890633,
        "duration": 914
    },
    {
        "description": "Should list ZipCode label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009f004d-00e9-00bd-0031-009d00d400aa.png",
        "timestamp": 1547007891872,
        "duration": 858
    },
    {
        "description": "Should require First Name|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f0000d-00a3-00a7-00c8-003900c800a4.png",
        "timestamp": 1547007893045,
        "duration": 969
    },
    {
        "description": "Should require Last Name|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009800d8-00e3-0044-00a6-0041008c008c.png",
        "timestamp": 1547007894669,
        "duration": 1199
    },
    {
        "description": "Should require Zip Code|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e30023-00b4-00e2-00f5-007200be006d.png",
        "timestamp": 1547007896320,
        "duration": 951
    },
    {
        "description": "Should Add Customer|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "34194304369ad5bc58ef519032948eb5",
        "instanceId": 15236,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ef00d5-0082-008d-0038-00db00d70026.png",
        "timestamp": 1547007897669,
        "duration": 1653
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
