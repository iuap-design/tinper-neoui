/**
 * Created by dingrf on 2015-11-18.
 */


window.u = window.u || {};
var u = window.u;

u.polyfill = true;
u._addClass = function(element,value){
    var classes, cur, clazz, i, finalValue,rclass = /[\t\r\n\f]/g,
        proceed = typeof value === "string" && value,rnotwhite = (/\S+/g);

    if ( proceed ) {
        // The disjunction here is for better compressibility (see removeClass)
        classes = ( value || "" ).match( rnotwhite ) || [];

        cur = element.nodeType === 1 && ( element.className ?
                ( " " + element.className + " " ).replace( rclass, " " ) : " ");
        if ( cur ) {
            i = 0;
            while ( (clazz = classes[i++]) ) {
                if ( cur.indexOf( " " + clazz + " " ) < 0 ) {cur += clazz + " ";}
            }
            // only assign if different to avoid unneeded rendering.
            finalValue = (cur + "").trim();
            if ( element.className !== finalValue ) {
                element.className = finalValue;
            }
        }
    }
    return this;
};

u._removeClass = function(element, value) {
    var classes, cur, clazz, j, finalValue,rnotwhite = (/\S+/g),rclass = /[\t\r\n\f]/g,
        proceed = arguments.length === 0 || typeof value === "string" && value;

    if ( proceed ) {
        classes = ( value || "" ).match( rnotwhite ) || [];

        // This expression is here for better compressibility (see addClass)
        cur = element.nodeType === 1 && ( element.className ?
                ( " " + element.className + " " ).replace( rclass, " " ) :"");
        if ( cur ) {
            j = 0;
            while ( (clazz = classes[j++]) ) {
                // Remove *all* instances
                while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                    cur = cur.replace( " " + clazz + " ", " " );
                }
            }

            // only assign if different to avoid unneeded rendering.
            finalValue = value ? (cur + "").trim() : "";
            if ( element.className !== finalValue ) {
                element.className = finalValue;
            }
        }
    }
    return this;
};

u._hasClass = function(element,value){
    var rclass = /[\t\r\n\f]/g;
    if ( element.nodeType === 1 && (" " + element.className + " ").replace(rclass, " ").indexOf( value ) >= 0 ) {
        return true;
    }
    return false;
};

u._toggleClass = function(element, value){
    if ( u._hasClass(element, value) ) {
        u._removeClass(element, value);
    } else {
        u._addClass(element, value);
    }
}