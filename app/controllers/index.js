var TiBeacons = require('com.liferay.beacons');
TiBeacons.setAutoRange(true);
TiBeacons.setScanPeriods({
  foregroundScanPeriod: 1000,
  foregroundBetweenScanPeriod: 2000,
  backgroundScanPeriod: 5000,
  backgroundBetweenScanPeriod: 60000
});

var projects = [
	{
		title: 'Bike thing',
		description: 'A bike that you can ride... and stuff happens on a screen',
		tags: ['bike', 'activity', 'nokia'],
		active: true,
		beacon: {
	        identifier: 'bike',
	        uuid: 'B9407F30-F5F8-466e-AFF9-25556B57FE6D',
      		major: '17151',
      		minor: '40703'
	    }
	},
	{
		title: 'Kinect thing',
		description: "A display that shows different stuff depending on the colour of the clothes you're wearing",
		tags: ['kinekt', 'colour'],
		active: true,
		beacon: {
			identifier: 'kinect',
      		uuid: 'B9407F30-F5F8-466e-AFF9-25556B57FE6D',
      		major: '45620',
      		minor: '24863'
    	}
	},
	{
		title: 'Photo booth',
		description: "A booth that takes photos, duh!",
		tags: ['beats', 'photo'],
		active: true,
		beacon: {
			identifier: 'booth',
			uuid: 'B9407F30-F5F8-466e-AFF9-25556B57FE6D',
			major: '44003',
			minor: '21782'
		}
	},
];

var androidPlatformTools = require('bencoding.android.tools').createPlatform();
var isForeground = false;
checkBackgroundMode();

var backgroundModeCheck = setInterval(checkBackgroundMode,5000);

function checkBackgroundMode() {
	isForeground = androidPlatformTools.isInForeground();
	// console.log("Am I currently in the foreground? " + isForeground);
	(isForeground == true) ? TiBeacons.setBackgroundMode(false) : TiBeacons.setBackgroundMode(true);
};

function handleEnteredRegion(reg) {
        console.log("entered region: " + reg.identifier);
};

function handleExitedRegion(reg) {
        console.log("exited region: " + reg.identifier);
};

function handleDeterminedRegionState(reg) {
    console.log(reg.regionState + " identifer: " + reg.identifier);
    // it's either 'inside' or 'outside'
}

function handleBeaconProximity(reg) {
	console.log(reg);
    console.log("identifer: " + reg.identifier);
    console.log("uuid: " + reg.uuid);
    console.log("major: " + reg.major);
    console.log("minor: " + reg.minor);
    console.log("proximity: " + reg.proximity);
    console.log("accuracy: " + reg.accuracy);
    console.log("rssi: " + reg.rssi);
    console.log("power: " + reg.power);
	updateInformation(reg);
}

function startMonitoring(e) {

    TiBeacons.addEventListener("enteredRegion", handleEnteredRegion);
    TiBeacons.addEventListener("exitedRegion", handleExitedRegion);
    TiBeacons.addEventListener("determinedRegionState", handleDeterminedRegionState);
    TiBeacons.addEventListener("beaconProximity", handleBeaconProximity);

    // TiBeacons.startMonitoringForRegion({
      // identifier: 'Estimote',
      // uuid: 'B9407F30-F5F8-466e-AFF9-25556B57FE6D'
    // });

	for (var i = 0; i < projects.length; i++) {
	    TiBeacons.startMonitoringForRegion(projects[i].beacon);
	}
}

function stopMonitoring(e) {
    TiBeacons.stopMonitoringAllRegions();
    TiBeacons.removeEventListener("enteredRegion", handleEnteredRegion);
    TiBeacons.removeEventListener("exitedRegion", handleExitedRegion);
    TiBeacons.removeEventListener("determinedRegionState", handleDeterminedRegionState);
    TiBeacons.removeEventListener("beaconProximity", handleBeaconProximity);
}

function toggleRanging() {
    if ($.rangingSwitch.value) {
        startMonitoring();
    } else {
        stopMonitoring();
    }
}

function reportClick(e) {
	Ti.API.info(e.type);
}

function updateInformation(event){
    if (event.identifier === "bike"){
        $.mintProximity.text = event.proximity;
        $.mintRSSI.text = event.rssi;
        if (event.proximity === 'near'){
            $.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/430459/105011834/stock-photo-mojito-lime-drink-cocktail-105011834.jpg';
        }

    } else if (event.identifier === "kinekt"){
        $.blueberryProximity.text = event.proximity;
        $.blueberryRSSI.text = event.rssi;
        if (event.proximity === 'near'){
            $.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/965987/108450557/stock-photo-freshly-picked-blueberries-108450557.jpg';
        }

    } else if (event.identifier === "booth"){
        $.marshmellowProximity.text = event.proximity;
        $.marshmellowRSSI.text = event.rssi;
        if (event.proximity === 'near'){
            $.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/963767/142706050/stock-photo-marshmallows-142706050.jpg';
        }
    }
}

$.win.open();