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
    return console.log(`[STSext] ${t}`);
}

/*
 * Get the download button in the top right corner.
 */
function getDownloadButton() {
    var dc = document.getElementsByClassName("download navlink");
    if (dc.length > 0)
        return dc[0];

    log("Download button not found.");
    return false;
}

/*
 * Rewrite the "Download" button to directly download the .jnlp file.
 */
function rewriteDownload() {
    // Find the right button.
    var d = getDownloadButton();
    if ( !d )
        return false;

    // Redirect download.
    d.href = "/download-jnlp.php";
    d.title = browser.i18n.getMessage("general/downloadLinkTitle");
    
    log( "Download link redirected." );
    return true;
}

/*
 * Adjust delays in navigation bar.
 */
function adjustDelays( delayShow, delayHide ) {
    for ( elem of document.getElementsByClassName( "toplink" ) ) {
        // Inject code to access jQuery data from page context.
        elem.setAttribute( "onmouseover", `\
var data = $( this ).data( "options" );\
data.delay = ${delayShow};\
data.minLifetime = ${delayHide};\
$( this ).data( "options", data );\
this.removeAttribute( "onmouseover" );\
        ` );

        // Trigger injected code.
        elem.dispatchEvent( new MouseEvent( "mouseover" ) );
        elem.dispatchEvent( new MouseEvent( "mouseout" ) );
    }

    log( `Navigation bar delays adjusted to ${delayShow}ms and ${delayHide}ms.` );
    return true;
}

/*
 * Remove download link animation.
 */
function appeaseDownloadButton() {
    var d = getDownloadButton();
    if ( !d )
        return false;
    
    // Set some non-existant name.
    d.style.animationName = "noAnimation";

    log( "Download button appeased." );
}

/*
 * Enable extension functions depending on selected options.
 */
function useOptions( options ) {
    log( "Using options." );
    if ( options.rewriteDownload )
        rewriteDownload();
    if ( options.shortenDelays )
        adjustDelays( options.delayShow, options.delayHide );
    if ( options.appeaseDownloadButton )
        appeaseDownloadButton();
}
browser.storage.local.get().then( useOptions, log );
