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
 * Translate strings in a DOM tree.
 */
function translateTree( dom, cl ) {
    for ( tr of dom.getElementsByClassName( cl ) ) {
        var m = tr.textContent.match( /^__MSG_(.*)__$/ );
        if ( m )
            tr.textContent = browserObj().i18n.getMessage( m[ 1 ] );
    }
}

/*
 * Portable browser object.
 */
function browserObj() {
    switch ( browserType() ) {
        case "gecko":
            return browser;
        case "chrome":
            return chrome;
        default:
            return;
    }
}

/*
 * Detect browser type
 */
function browserType() {
    if ( typeof browser != "undefined" ) {
        return "gecko";
    } else if ( chrome != "undefined" ) {
        return "chrome";
    } else {
        return "unknown";
    }
}

/*
 * Load options from local storage.
 */
function loadOptions( applicator ) {
    switch ( browserType() ) {
        case "chrome":
            chrome.storage.local.get( ["globalOverview",
                                       "rewriteDownload",
                                       "gameNightRegistration",
                                       "appeaseDownloadButton",
                                       "shortenDelays",
                                       "delayShow",
                                       "delayHide"],
                                      applicator );
            break;
        case "gecko":
            browser.storage.local.get( {
                globalOverview: false,
                gameNightRegistration: false,
                rewriteDownload: false,
                appeaseDownloadButton: false,
                shortenDelays: false,
                delayShow: 100,
                delayHide: 200
            } ).then( applicator, function( e ) { log( `Failed to load options: ${e}` ); } );
            break;
        default:
            log( "How do options work here?" );
            return false;
    }

    return true;
}

function saveOptions( opt ) {
    browserObj().storage.local.set( opt );
}
