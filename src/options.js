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
 * Save current configuration to storage.
 */
function storeOptions( e ) {
    e.preventDefault();

    return saveOptions( {
        globalOverview: document.querySelector("#globalOverview").checked,
        gameNightRegistration: document.querySelector("#gameNightRegistration").checked,
        rewriteDownload: document.querySelector("#rewriteDownload").checked,
        appeaseDownloadButton: document.querySelector("#appeaseDownloadButton").checked,
        shortenDelays: document.querySelector("#shortenDelays").checked,
        delayShow: document.querySelector("#delayShow").value,
        delayHide: document.querySelector("#delayHide").value
    } );
    // browserObj().storage.local.set( {
    //     globalOverview: document.querySelector("#globalOverview").checked,
    //     gameNightRegistration: document.querySelector("#gameNightRegistration").checked,
    //     rewriteDownload: document.querySelector("#rewriteDownload").checked,
    //     appeaseDownloadButton: document.querySelector("#appeaseDownloadButton").checked,
    //     shortenDelays: document.querySelector("#shortenDelays").checked,
    //     delayShow: document.querySelector("#delayShow").value,
    //     delayHide: document.querySelector("#delayHide").value
    // } );
}

/*
 * Load and show current config from storage.
 */
function restoreOptions() {
    function setConfig( result ) {
        document.querySelector("#globalOverview").checked = result.globalOverview;
        document.querySelector("#gameNightRegistration").checked = result.gameNightRegistration;
        document.querySelector("#rewriteDownload").checked = result.rewriteDownload;
        document.querySelector("#appeaseDownloadButton").checked = result.appeaseDownloadButton;

        if ( browserType() == "chrome" ) {
            document.querySelector("#shortenDelays").disabled = true;
            document.querySelector("#delayShow").disabled = true;
            document.querySelector("#delayHide").disabled = true;
        } else {
            document.querySelector("#shortenDelays").checked = result.shortenDelays;
            document.querySelector("#delayShow").value = result.delayShow;
            document.querySelector("#delayHide").value = result.delayHide;
        }
    }

    return loadOptions( setConfig );
}

translateTree( document, "translate" );

document.addEventListener( "DOMContentLoaded", restoreOptions );
document.querySelector( "form" ).addEventListener( "submit", storeOptions );
