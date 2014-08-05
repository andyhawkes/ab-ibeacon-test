var TiBeacons = require('com.liferay.beacons');

function entered(reg) {
        alert("entered region: " + reg.identifier);
};

function exited(reg) {
        alert("exited region: " + reg.identifier);
};

function startmon(e) {

    TiBeacons.addEventListener("enteredRegion", entered);
    TiBeacons.addEventListener("exitedRegion", exited);

    TiBeacons.startMonitoringForRegion({
      identifier: 'FOO',
      uuid: '5AFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    });  
}
function stopmon(e) {
    TiBeacons.stopMonitoringAllRegions();
    TiBeacons.removeEventListener("enteredRegion", entered);
    TiBeacons.removeEventListener("exitedRegion", exited);

}

$.index.open();