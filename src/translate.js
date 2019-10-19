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
