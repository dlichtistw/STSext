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
 * Checks if the region tables are present.
 */
function checkTablePresent() {
    return document.getElementById("anlagen") != null;
}

function getRegionTables() {
    var tables = [];
    
    var container = document.getElementById("anlagen");
    var re = /r\d+/i;
    for (i in container.children) {
        c = container.children[i];
        if (c.id && c.id.match(re) != null) {
            tables.push(c.getElementsByTagName("table")[0]);
        }
    }

    return tables;
}

/*
 * Create an empty region table to hold all sites from all regions.
 */
function insertGlobalRegion() {
    var tables = getRegionTables();    
    if (tables.length == 0) {
        console.log("[STStools] No region tables found.");
        return false;
    }
    
    var table = tables[0].cloneNode(true);
    table.id = "rg_table";
    var rows = table.getElementsByTagName("tr");

    if (rows.length == 0) {
        console.log("[STStools] No region entries found.");
        return false;
    }
    
    while (rows.length > 2) {
        rows[2].parentNode.removeChild(rows[2]);
    }
    
    if (rows.length >= 1) {
        rows[0].firstChild.textContent = "Globale Übersicht";
    }
    if (rows.length >= 2) {
        rows[1].firstChild.textContent = "Erzeugt durch STS Tools";
    }
    
    var div = tables[0].parentNode;
    var ndiv = div.cloneNode(false);
    ndiv.id = "rg";
    ndiv.appendChild(table);
    div.insertAdjacentElement("beforebegin", ndiv);
    
    return true;
}

function fillGlobalRegion() {
    var tables = getRegionTables();
    var gt = document.getElementById("rg_table").getElementsByTagName("tbody")[0];
    
    for (var i in tables) {
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 2; j < rows.length; j++) {
            gt.appendChild(rows[j].cloneNode(true));
        }
    }
    
    return true;
}
    
/*
 * Show or hide the global region table.
 */
function toggleGlobalRegion() {
    tables = getRegionTables();
    rg = document.getElementById("rg");
    
    if (rg.style.display.match(/block/i)) {
        rg.style.display = "none";
        for (i in tables) {
            tables[i].parentNode.style.display = "block";
        }
    } else {
        rg.style.display = "block";
        for (i in tables) {
            tables[i].parentNode.style.display = "none";
        }
    }
}

/*
 * Adds a navigation item to open global overview.
 */
function addAllAll() {
    var navbar = document.getElementById("URegionNavigation");
    if (navbar == null) {
        console.log("[STStools] Navigation bar not found.");
        return false;
    }
    
    var template = navbar.getElementsByTagName("td")[0];
    if (template == null) {
        console.log("[STStools] Navigation template not found.");
        return false;
    }
    
    
    var navbox = template.cloneNode(false);

    var navlink = document.createElement("a");
    navlink.textContent = "Übersicht";
    navlink.addEventListener("click", toggleGlobalRegion);
    navbox.appendChild(navlink);

    template.insertAdjacentElement("beforebegin", navbox);
    
    return true;
}

/*
 * Install sortable global overview.
 */
function sortableOverview() {
    if (!checkTablePresent()) {
        console.log("[STStools] Region overview not found. Are you using the classical view?");
        return false;
    }
    
    if (!addAllAll()) {
        console.log("[STStools] Failed to insert navigation item.");
        return false;
    }
    
    if (!insertGlobalRegion()) {
        console.log("[STStools] Failed to insert global region.");
        return false;
    }
    
    if (!fillGlobalRegion()) {
        console.log("[STStools] Failed to fill global region table.");
        return false;
    }
    
    console.log("[STStools] Installed global overview.");
    return true;
}

sortableOverview();
