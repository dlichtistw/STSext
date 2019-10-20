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
            tr.textContent = browser.i18n.getMessage( m[ 1 ] );
    }
}

translateTree( document, "translate" );
