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
 * Checks if the region tables are present.
 */
function checkTablePresent() {
    return document.getElementById("anlagen") != null;
}

/*
 * Return an array containing all region tables.
 */
function getRegionTables() {
    var tables = [];
    
    var container = document.getElementById("anlagen");
    var re = /r(\d+|g)/i;
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
        log("No region tables found.");
        return false;
    }
    
    var table = tables[0].cloneNode(true);
    table.id = "rg_table";

    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");

    if (rows.length == 0) {
        log("No region entries found.");
        return false;
    }
    
    var thead = document.createElement("thead");

    var th1 = rows[0].cloneNode(true);
    th1.firstChild.textContent = browserObj().i18n.getMessage("sites_globalOverview");
    thead.appendChild(th1);

    var th2 = rows[1].cloneNode(true);
    th2.firstChild.textContent = browserObj().i18n.getMessage("sites_credits");
    thead.appendChild(th2);
    
    table.insertBefore(thead, tbody);
    
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
    
    var div = tables[0].parentNode;
    var ndiv = div.cloneNode(false);
    ndiv.id = "rg";
    ndiv.appendChild(table);
    div.insertAdjacentElement("beforebegin", ndiv);
    
    return true;
}

/*
 * Copy entries from region tables and add them to the global region table.
 */
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
        for (i in tables) {
            tables[i].parentNode.style.display = "block";
        }
        rg.style.display = "none";
    } else {
        for (i in tables) {
            tables[i].parentNode.style.display = "none";
        }
        rg.style.display = "block";
    }
}

/*
 * Adds a navigation item to open global overview.
 */
function addAllAll() {
    var navbar = document.getElementById("URegionNavigation");
    if (navbar == null) {
        log("Navigation bar not found.");
        return false;
    }
    
    var template = navbar.getElementsByTagName("td")[0];
    if (template == null) {
        log("Navigation template not found.");
        return false;
    }
    
    
    var navbox = template.cloneNode(false);

    var navlink = document.createElement("a");
    navlink.textContent = browserObj().i18n.getMessage("sites_overview");
    navlink.addEventListener("click", toggleGlobalRegion);
    navbox.appendChild(navlink);

    template.insertAdjacentElement("beforebegin", navbox);
    
    return true;
}

/*
 * Add a global overview.
 */
function addOverview() {
    if (!checkTablePresent()) {
        log("Region overview not found. Are you using the classical view?");
        return false;
    }
    
    if (!addAllAll()) {
        log("Failed to insert navigation item.");
        return false;
    }
    
    if (!insertGlobalRegion()) {
        log("Failed to insert global region.");
        return false;
    }
    
    if (!fillGlobalRegion()) {
        log("Failed to fill global region table.");
        return false;
    }
    
    log("Installed global overview.");
    return true;
}

/*
 * Creates an <a> node with some text.
 */
function createActionLink(text) {
    l = document.createElement("a");
    l.appendChild(document.createTextNode(text));
    return l;
}

/*
 * Prepare a table for sorting.
 */
function makeSortable(table) {
    var ns = document.createElement("th");
    var nsl = createActionLink(browserObj().i18n.getMessage("sites_sortCmd"));
    nsl.addEventListener("click", function(e) {
        tg = e.target;
        if (tg.classList.contains("sort_asc")) {
            sortTable(table, function(a, b) { return compareName(a, b, true) });
            tg.classList.remove("sort_asc");
            tg.classList.add("sort_desc");
        } else {
            sortTable(table, function(a, b) { return compareName(a, b, false) });
            tg.classList.remove("sort_desc");
            tg.classList.add("sort_asc");
        }
    });
    ns.appendChild(nsl);
    
    var ds = document.createElement("th");
    var dsl = createActionLink(browserObj().i18n.getMessage("sites_sortCmd"));
    dsl.addEventListener("click", function(e) {
        tg = e.target;
        if (tg.classList.contains("sort_asc")) {
            sortTable(table, function(a, b) { return compareGrade(a, b, true) });
            tg.classList.remove("sort_asc");
            tg.classList.add("sort_desc");
        } else {
            sortTable(table, function(a, b) { return compareGrade(a, b, false) });
            tg.classList.remove("sort_desc");
            tg.classList.add("sort_asc");
        }
    });
    ds.appendChild(dsl);
    
    var shead = document.createElement("tr");
    shead.appendChild(ns);
    shead.appendChild(document.createElement("th"));
    shead.appendChild(document.createElement("th"));
    shead.appendChild(ds);
    
    table.getElementsByTagName("thead")[0].appendChild(shead);
    
    return true;
}

/*
 * Compare two region list rows by their site's name.
 */
function compareName(row1, row2, reverse=false) {
    if (reverse) {
        return compareName(row2, row1, !reverse);
    }

    return row1.firstChild.textContent > row2.firstChild.textContent;
}

/*
 * Compare two region list rows by their site's grading.
 */
function compareGrade(row1, row2, reverse=false) {
    g1 = Number.parseFloat(row1.lastChild.textContent);
    if (Number.isNaN(g1)) {
        return true;
    }
    
    g2 = Number.parseFloat(row2.lastChild.textContent);
    if (Number.isNaN(g2)) {
        return false;
    }
    
    if (reverse) {
        return compareGrade(row2, row1, !reverse);
    }
    
    return g1 > g2;
}

/*
 * Sort the rows in a table's tbody using a custom comparison method.
 */
function sortTable(table, comp) {
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = Array.from(tbody.getElementsByTagName("tr"));
    
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
    
    rows.sort(comp);
    
    for (i in rows) {
        tbody.appendChild(rows[i]);
    }
}

/*
 * Make the global site list sortable.
 */
function makeGlobalSortable() {
    var table = document.getElementById("rg_table");
    if (table == null) {
        log("Global region table not found.");
        return false;
    }
    
    if (!makeSortable(table)) {
        log("Failed to make global sortable.");
        return false;
    }
    
    log("Global is now sortable.");
    return true;
}

/*
 * Enable extension functions depending on selected options.
 */
function useOptions( options ) {
    log( "Using options." );
    if ( options.globalOverview ) {
        addOverview();
        if( browserType() != "chrome" )
            makeGlobalSortable();
    }
}
loadOptions( useOptions );
