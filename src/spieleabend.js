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
 * Add direct links to the site's description pages in game night registration lists.
 */
function addSiteLinks() {
    var re = /.*\/spieleabend.php(?=\?).*(?:\?|&)aid=([^?&]+)/i;
    var fmt = "/fahre-anlage.php?aid=";
    var count = 0;
    
    // This is far from optimal...
    var spans = Array.from(document.getElementsByTagName("span"));
    for (var i in spans) {
        var s = spans[i];

        var l = s.getElementsByTagName("a")[0];
        if (l == null) {
            continue;
        }
        
        // If there is a link to register for this site, then we are at the right place.
        var m = l.href.match(re);
        if (m == null) {
            continue;
        }
        
        var aid = m[1];
        var al = document.createElement("a");
        var siteName = s.firstChild.textContent;
        al.href = fmt + aid;
        al.title = browserObj().i18n.getMessage("gameNights_siteLinkTitle", siteName);
        al.appendChild(document.createTextNode(siteName));
        s.firstChild.replaceWith(al);
        
        count++;
    }
    
    log(count + " site links added.");
}

/*
 * Enable extension functions depending on selected options.
 */
function useOptions( options ) {
    log( "Using options." );
    if ( options.gameNightRegistration ) {
        addSiteLinks();
    }
}
loadOptions( useOptions );
