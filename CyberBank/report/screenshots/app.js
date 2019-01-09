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
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00cc00d4-001b-0068-004d-0005001d000e.png",
        "timestamp": 1546979042004,
        "duration": 4653
    },
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005c00fb-0045-0084-0063-00f300c000ae.png",
        "timestamp": 1546979044001,
        "duration": 4469
    },
    {
        "description": "should verify Home Button is Displayed|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d1009f-009e-0099-0058-00be001c000e.png",
        "timestamp": 1546979047306,
        "duration": 1569
    },
    {
        "description": "should verify Home Button is Displayed|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009a003f-004d-0015-0075-0014001600b1.png",
        "timestamp": 1546979048813,
        "duration": 2318
    },
    {
        "description": "Should verify Page Header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00470028-00f8-0013-00fe-00f7000f005c.png",
        "timestamp": 1546979049457,
        "duration": 1344
    },
    {
        "description": "should check Bank Manager button text|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0078004c-00f3-0048-0063-007d00230011.png",
        "timestamp": 1546979051366,
        "duration": 1677
    },
    {
        "description": "Should verify Page Header|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ef00f1-00bf-007c-0010-00da00ab00b3.png",
        "timestamp": 1546979051340,
        "duration": 3122
    },
    {
        "description": "should check Bank Manager Login button displayed|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008f00aa-0089-002b-004c-008f006d00fa.png",
        "timestamp": 1546979053524,
        "duration": 1880
    },
    {
        "description": "should check Bank Manager button text|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001a002c-0039-0009-00cb-00dc002a00a4.png",
        "timestamp": 1546979054677,
        "duration": 2625
    },
    {
        "description": "should check Bank Manager Login button displayed and check text by ngClick|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00760035-003a-0007-0072-00db00520004.png",
        "timestamp": 1546979055896,
        "duration": 1570
    },
    {
        "description": "should check Bank Manager Login button displayed|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002b007f-006a-000f-00c8-00aa0040001e.png",
        "timestamp": 1546979057463,
        "duration": 2323
    },
    {
        "description": "should stay when click home page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a600d5-00ad-0042-0018-00aa001900b8.png",
        "timestamp": 1546979058202,
        "duration": 2049
    },
    {
        "description": "should check Bank Manager Login button displayed and check text by ngClick|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009b0012-0092-0066-0051-008100c800ba.png",
        "timestamp": 1546979059926,
        "duration": 2082
    },
    {
        "description": "should stay when click home page|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00350068-0088-008a-009e-00e7001100e9.png",
        "timestamp": 1546979062164,
        "duration": 1986
    },
    {
        "description": "should display options for manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002c0041-00a4-000b-0022-00bb00cb0009.png",
        "timestamp": 1546979060722,
        "duration": 4595
    },
    {
        "description": "should display form for Adding Customer|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c5000b-0081-00ee-00cb-000d00cb0047.png",
        "timestamp": 1546979065908,
        "duration": 1947
    },
    {
        "description": "should display options for manager|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004b00f7-0008-00e8-00e1-0048009100da.png",
        "timestamp": 1546979064253,
        "duration": 4857
    },
    {
        "description": "Should list first name in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006f0052-00cf-0044-0002-002f00d50040.png",
        "timestamp": 1546979068207,
        "duration": 1583
    },
    {
        "description": "should display form for Adding Customer|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00bf003a-00e6-00f3-0092-003700f900dd.png",
        "timestamp": 1546979069428,
        "duration": 2766
    },
    {
        "description": "Should list First Name label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f7005c-00b6-005b-006d-0037009b0002.png",
        "timestamp": 1546979070314,
        "duration": 1616
    },
    {
        "description": "Should list first name in the form|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0097003f-004f-00e6-0038-003100740039.png",
        "timestamp": 1546979072379,
        "duration": 2617
    },
    {
        "description": "Should list Last Name label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006200c6-00ae-00f8-0061-004100e900d0.png",
        "timestamp": 1546979072462,
        "duration": 2302
    },
    {
        "description": "Should list ZipCode label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f90019-0064-00d5-0070-00ed00360033.png",
        "timestamp": 1546979075266,
        "duration": 2114
    },
    {
        "description": "Should list First Name label in the form|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003b00b4-00c3-004b-0020-007700fc0072.png",
        "timestamp": 1546979075134,
        "duration": 3045
    },
    {
        "description": "Should list Last Name label in the form|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00cf00ab-0008-008b-006a-00d6004f006d.png",
        "timestamp": 1546979078434,
        "duration": 2622
    },
    {
        "description": "Should require First Name|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000000e1-0086-0014-00f4-006d002300d8.png",
        "timestamp": 1546979077952,
        "duration": 2862
    },
    {
        "description": "Should list ZipCode label in the form|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00eb00cd-00c3-004d-004c-00370040007b.png",
        "timestamp": 1546979081191,
        "duration": 2203
    },
    {
        "description": "Should require Last Name|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0063005d-002d-00be-00ce-00b400700033.png",
        "timestamp": 1546979082424,
        "duration": 2764
    },
    {
        "description": "Should require First Name|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a7003a-0090-004d-00ff-00c600700092.png",
        "timestamp": 1546979083534,
        "duration": 3125
    },
    {
        "description": "Should require Zip Code|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0029004c-0079-00be-008a-006f003b009a.png",
        "timestamp": 1546979086058,
        "duration": 3699
    },
    {
        "description": "Should require Last Name|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e400e1-00b9-003e-001b-00f100d900ea.png",
        "timestamp": 1546979086947,
        "duration": 3333
    },
    {
        "description": "Should require Zip Code|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0043003a-00e9-00d3-00ca-006700d900cd.png",
        "timestamp": 1546979090535,
        "duration": 3134
    },
    {
        "description": "Should Add Customer|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11220,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00bf001f-00b3-00ca-0005-00cc00f600d7.png",
        "timestamp": 1546979090417,
        "duration": 3257
    },
    {
        "description": "Should Add Customer|Login",
        "passed": true,
        "pending": false,
        "instanceId": 9108,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005200cc-00d2-0082-0075-00d500e4000f.png",
        "timestamp": 1546979093868,
        "duration": 2429
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
