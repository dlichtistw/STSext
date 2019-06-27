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
 * Add direct links to the site's description pages in game night subscription lists.
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
        
        var m = l.href.match(re);
        if (m == null) {
            continue;
        }
        
        var aid = m[1];
        var al = document.createElement("a");
        al.href = fmt + aid;
        al.appendChild(document.createTextNode(s.firstChild.textContent));
        s.firstChild.replaceWith(al);
        
        count++;
    }
    
    log(count + " site links added.");
}

addSiteLinks();
