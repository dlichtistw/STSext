/*
Copyright (C) 2019  David Lichti <dlichtistw@gmx.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/*
 * Write some text to the console log.
 */
function log(t) {
    return console.log("[STSext] " + t);
}

/*
 * Save current configuration to storage.
 */
function saveOptions( e ) {
    e.preventDefault();
    browser.storage.local.set( {
        globalOverview: document.querySelector("#globalOverview").checked,
        gameNightRegistration: document.querySelector("#gameNightRegistration").checked,
        rewriteDownload: document.querySelector("#rewriteDownload").checked,
        shortenDelays: document.querySelector("#shortenDelays").checked,
        delayShow: document.querySelector("#delayShow").value,
        delayHide: document.querySelector("#delayHide").value
    } );
}

/*
 * Load and show current config from storage.
 */
function restoreOptions() {
    function setConfig( result ) {
        document.querySelector("#globalOverview").checked = result.globalOverview;
        document.querySelector("#gameNightRegistration").checked = result.gameNightRegistration;
        document.querySelector("#rewriteDownload").checked = result.rewriteDownload;
        document.querySelector("#shortenDelays").checked = result.shortenDelays;
        document.querySelector("#delayShow").value = result.delayShow;
        document.querySelector("#delayHide").value = result.delayHide;
    }
    
    function onError( e ) {
        log( `Failed to load current options: ${e}` );
    }
    
    var getting = browser.storage.local.get( {
        globalOverview: false,
        gameNightRegistration: false,
        rewriteDownload: false,
        shortenDelays: false,
        delayShow: 100,
        delayHide: 200
    } );
    getting.then( setConfig, onError );
}

document.addEventListener( "DOMContentLoaded", restoreOptions );
document.querySelector( "form" ).addEventListener( "submit", saveOptions );
