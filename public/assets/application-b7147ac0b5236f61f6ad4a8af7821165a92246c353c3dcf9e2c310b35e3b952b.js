/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
$(document).ready(function(){
    // var map = $('#map').acts_as_map_container();
    // params:
    // container is required
    // suggestion is the element which will contain the suggested address, default to #suggested
    // delay is the delay time for requesting google map api, default to 500ms
    var address = $('#address').acts_as_address({
        // container: map,
        suggestion: '#suggestion',
        delay : 500
    });

})
;
/**
 * jQuery Geocoding and Places Autocomplete Plugin - V 1.7.0
 *
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2016
 * @author Ubilabs http://ubilabs.net, 2016
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

(function($,window,document,undefined){var defaults={bounds:true,country:null,map:false,details:false,detailsAttribute:"name",detailsScope:null,autoselect:true,location:false,mapOptions:{zoom:14,scrollwheel:false,mapTypeId:"roadmap"},markerOptions:{draggable:false},maxZoom:16,types:["geocode"],blur:false,geocodeAfterResult:false,restoreValueAfterBlur:false};var componentTypes=("street_address route intersection political "+"country administrative_area_level_1 administrative_area_level_2 "+"administrative_area_level_3 colloquial_area locality sublocality "+"neighborhood premise subpremise postal_code natural_feature airport "+"park point_of_interest post_box street_number floor room "+"lat lng viewport location "+"formatted_address location_type bounds").split(" ");var placesDetails=("id place_id url website vicinity reference name rating "+"international_phone_number icon formatted_phone_number").split(" ");function GeoComplete(input,options){this.options=$.extend(true,{},defaults,options);if(options&&options.types){this.options.types=options.types}this.input=input;this.$input=$(input);this._defaults=defaults;this._name="geocomplete";this.init()}$.extend(GeoComplete.prototype,{init:function(){this.initMap();this.initMarker();this.initGeocoder();this.initDetails();this.initLocation()},initMap:function(){if(!this.options.map){return}if(typeof this.options.map.setCenter=="function"){this.map=this.options.map;return}this.map=new google.maps.Map($(this.options.map)[0],this.options.mapOptions);google.maps.event.addListener(this.map,"click",$.proxy(this.mapClicked,this));google.maps.event.addListener(this.map,"dragend",$.proxy(this.mapDragged,this));google.maps.event.addListener(this.map,"idle",$.proxy(this.mapIdle,this));google.maps.event.addListener(this.map,"zoom_changed",$.proxy(this.mapZoomed,this))},initMarker:function(){if(!this.map){return}var options=$.extend(this.options.markerOptions,{map:this.map});if(options.disabled){return}this.marker=new google.maps.Marker(options);google.maps.event.addListener(this.marker,"dragend",$.proxy(this.markerDragged,this))},initGeocoder:function(){var selected=false;var options={types:this.options.types,bounds:this.options.bounds===true?null:this.options.bounds,componentRestrictions:this.options.componentRestrictions};if(this.options.country){options.componentRestrictions={country:this.options.country}}this.autocomplete=new google.maps.places.Autocomplete(this.input,options);this.geocoder=new google.maps.Geocoder;if(this.map&&this.options.bounds===true){this.autocomplete.bindTo("bounds",this.map)}google.maps.event.addListener(this.autocomplete,"place_changed",$.proxy(this.placeChanged,this));this.$input.on("keypress."+this._name,function(event){if(event.keyCode===13){return false}});if(this.options.geocodeAfterResult===true){this.$input.bind("keypress."+this._name,$.proxy(function(){if(event.keyCode!=9&&this.selected===true){this.selected=false}},this))}this.$input.bind("geocode."+this._name,$.proxy(function(){this.find()},this));this.$input.bind("geocode:result."+this._name,$.proxy(function(){this.lastInputVal=this.$input.val()},this));if(this.options.blur===true){this.$input.on("blur."+this._name,$.proxy(function(){if(this.options.geocodeAfterResult===true&&this.selected===true){return}if(this.options.restoreValueAfterBlur===true&&this.selected===true){setTimeout($.proxy(this.restoreLastValue,this),0)}else{this.find()}},this))}},initDetails:function(){if(!this.options.details){return}if(this.options.detailsScope){var $details=$(this.input).parents(this.options.detailsScope).find(this.options.details)}else{var $details=$(this.options.details)}var attribute=this.options.detailsAttribute,details={};function setDetail(value){details[value]=$details.find("["+attribute+"="+value+"]")}$.each(componentTypes,function(index,key){setDetail(key);setDetail(key+"_short")});$.each(placesDetails,function(index,key){setDetail(key)});this.$details=$details;this.details=details},initLocation:function(){var location=this.options.location,latLng;if(!location){return}if(typeof location=="string"){this.find(location);return}if(location instanceof Array){latLng=new google.maps.LatLng(location[0],location[1])}if(location instanceof google.maps.LatLng){latLng=location}if(latLng){if(this.map){this.map.setCenter(latLng)}if(this.marker){this.marker.setPosition(latLng)}}},destroy:function(){if(this.map){google.maps.event.clearInstanceListeners(this.map);google.maps.event.clearInstanceListeners(this.marker)}this.autocomplete.unbindAll();google.maps.event.clearInstanceListeners(this.autocomplete);google.maps.event.clearInstanceListeners(this.input);this.$input.removeData();this.$input.off(this._name);this.$input.unbind("."+this._name)},find:function(address){this.geocode({address:address||this.$input.val()})},geocode:function(request){if(!request.address){return}if(this.options.bounds&&!request.bounds){if(this.options.bounds===true){request.bounds=this.map&&this.map.getBounds()}else{request.bounds=this.options.bounds}}if(this.options.country){request.region=this.options.country}this.geocoder.geocode(request,$.proxy(this.handleGeocode,this))},selectFirstResult:function(){var selected="";if($(".pac-item-selected")[0]){selected="-selected"}var $span1=$(".pac-container:visible .pac-item"+selected+":first span:nth-child(2)").text();var $span2=$(".pac-container:visible .pac-item"+selected+":first span:nth-child(3)").text();var firstResult=$span1;if($span2){firstResult+=" - "+$span2}this.$input.val(firstResult);return firstResult},restoreLastValue:function(){if(this.lastInputVal){this.$input.val(this.lastInputVal)}},handleGeocode:function(results,status){if(status===google.maps.GeocoderStatus.OK){var result=results[0];this.$input.val(result.formatted_address);this.update(result);if(results.length>1){this.trigger("geocode:multiple",results)}}else{this.trigger("geocode:error",status)}},trigger:function(event,argument){this.$input.trigger(event,[argument])},center:function(geometry){if(geometry.viewport){this.map.fitBounds(geometry.viewport);if(this.map.getZoom()>this.options.maxZoom){this.map.setZoom(this.options.maxZoom)}}else{this.map.setZoom(this.options.maxZoom);this.map.setCenter(geometry.location)}if(this.marker){this.marker.setPosition(geometry.location);this.marker.setAnimation(this.options.markerOptions.animation)}},update:function(result){if(this.map){this.center(result.geometry)}if(this.$details){this.fillDetails(result)}this.trigger("geocode:result",result)},fillDetails:function(result){var data={},geometry=result.geometry,viewport=geometry.viewport,bounds=geometry.bounds;$.each(result.address_components,function(index,object){var name=object.types[0];$.each(object.types,function(index,name){data[name]=object.long_name;data[name+"_short"]=object.short_name})});$.each(placesDetails,function(index,key){data[key]=result[key]});$.extend(data,{formatted_address:result.formatted_address,location_type:geometry.location_type||"PLACES",viewport:viewport,bounds:bounds,location:geometry.location,lat:geometry.location.lat(),lng:geometry.location.lng()});$.each(this.details,$.proxy(function(key,$detail){var value=data[key];this.setDetail($detail,value)},this));this.data=data},setDetail:function($element,value){if(value===undefined){value=""}else if(typeof value.toUrlValue=="function"){value=value.toUrlValue()}if($element.is(":input")){$element.val(value)}else{$element.text(value)}},markerDragged:function(event){this.trigger("geocode:dragged",event.latLng)},mapClicked:function(event){this.trigger("geocode:click",event.latLng)},mapDragged:function(event){this.trigger("geocode:mapdragged",this.map.getCenter())},mapIdle:function(event){this.trigger("geocode:idle",this.map.getCenter())},mapZoomed:function(event){this.trigger("geocode:zoom",this.map.getZoom())},resetMarker:function(){this.marker.setPosition(this.data.location);this.setDetail(this.details.lat,this.data.location.lat());this.setDetail(this.details.lng,this.data.location.lng())},placeChanged:function(){var place=this.autocomplete.getPlace();this.selected=true;if(!place.geometry){if(this.options.autoselect){var autoSelection=this.selectFirstResult();this.find(autoSelection)}}else{this.update(place)}}});$.fn.geocomplete=function(options){var attribute="plugin_geocomplete";if(typeof options=="string"){var instance=$(this).data(attribute)||$(this).geocomplete().data(attribute),prop=instance[options];if(typeof prop=="function"){prop.apply(instance,Array.prototype.slice.call(arguments,1));return $(this)}else{if(arguments.length==2){prop=arguments[1]}return prop}}else{return this.each(function(){var instance=$.data(this,attribute);if(!instance){instance=new GeoComplete(this,options);$.data(this,attribute,instance)}})}}})(jQuery,window,document);
/*
 * jQuery address suggestion
 * Author: Zheng Jia
 * http://github.com/zhengjia/address-suggestion
 * Licensed under the MIT license.
 */

(function($) {
  var Address = {
    timeout_id: 0,
    componentForm: {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    },

    get_address_data: function() {
      Address.geocode(Address.options.address.val(), function(data, result) {
        if (data) {

          debugger;
          for (var i = 0; i < result.address_components.length; i++) {
            var addressType = result.address_components[i].types[0];
            if (componentForm[addressType]) {
              var val = result.address_components[i][componentForm[addressType]];
              document.getElementById(addressType).value = val;
              // Address.add_result_to_form(data);
              //$("form#"+Address.options.form[0].attributes.id.textContent+" input[type=text]")
            }
          }
          document.getElementById("formatted_address").value = result.formatted_address;
          
          Address.options.suggestion.html("");
          $.each(data, function(int_index, value) {
            append_element = "<li class='jquery-googlemaps-button' data-longitude='" + value.longitude + "' data-latitude='" + value.latitude + "'>" + value.address + "</li>";
            Address.options.suggestion.append(append_element);
            $(".jquery-googlemaps-button").on("click", function() {
              $("#georesultform").css('display', '');
              $("#searchform").css('display', 'none');
              var longitude = $(this).attr("data-longitude");
              var latitude = $(this).attr("data-latitude");
              var full_address = $(this).text();
              Address.options.suggestion.html("");
              Address.options.address.val(full_address);
              Address.add_result_to_page(longitude, latitude);
              //Address.load_new_address(longitude, latitude);
            });
          }); //end each
        } else {
          Address.options.suggestion.html("");
        }
      }); //end geocode
    }, //end of getAddressData
    
    delay_on_change: function(e) {
      window.clearTimeout(Address.timeout_id);
      Address.timeout_id = window.setTimeout(Address.get_address_data, Address.options.delay);
    },

    geocode: function(address, callback) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': address
      }, function(data, status) {
        if (status == "OK") {
          var result = [];
          $.each(data, function(int_index, value) {
            var result_element = {};
            result_element.address = value.formatted_address;
            result_element.latitude = value.geometry.location.lat();
            result_element.longitude = value.geometry.location.lng();
            result[int_index] = result_element;
          });
          // callback(result);
          callback(result, data[0]);
        } else {
          callback(null);
        }
      });
    }, //end geocode
    
    load_new_address: function(longitude, latitude, full_address) {
      var pointB = new google.maps.LatLng(latitude, longitude);
      if (Address.options.marker) {
        Address.options.marker.setMap(null);
      }
      Address.options.marker = new google.maps.Marker({
        position: pointB,
        map: Address.options.container
      });
      Address.options.container.setCenter(pointB, 10);
    },

    add_result_to_page: function(longitude, latitude) {
      var longitude_element = $('input#longitude');
      var latitude_element = $('input#latitude');
      if (longitude_element.length == 0) {
        //get the longitude and latitude with $(#longitude).val() and $(latitude).val()
        $('body').append('<input type="hidden" id="longitude" value = ' + longitude + ' />').append('<input type="hidden" id="latitude" value = ' + latitude + ' />');
      } else {
        longitude_element.val(longitude);
        latitude_element.val(latitude);
      }
    }

  }//end Address calss


  $.fn.acts_as_address = function(user_defined_options) {
    Address.options = $.extend({
      suggestion: '#suggestion',
      delay: 500,
      address: $(this),
      form: '#georesultform'
    }, user_defined_options || {});

    Address.options.suggestion = $(Address.options.suggestion);
    Address.options.form = $(Address.options.form);

    Address.options.marker = null;
    Address.options.address.keydown(Address.delay_on_change);

    // $(".jquery-googlemaps-button").on("click", function() {
    //   var longitude = $(this).attr("data-longitude");
    //   var latitude = $(this).attr("data-latitude");
    //   var full_address = $(this).parent().prev().text();
    //   Address.options.suggestion.html("");
    //   Address.options.address.val(full_address);
    //   Address.add_result_to_page(longitude, latitude);
    //   Address.load_new_address(longitude, latitude);
    // })
    return this;
  } //end acts_as_address
})(jQuery);
(function($){
    $.fn.acts_as_map_container = function(){
        var that = this;
        return (function(){
		        var m = $(that)[0];
		        if(m) {
		            var start = new google.maps.LatLng(44.98, -93.2636111);
								var myOptions = {
										zoom: 10,
								    center: start,
								    mapTypeId: google.maps.MapTypeId.ROADMAP
								};
								var map = new google.maps.Map(m, myOptions);
		            return map;
		        }
        })();
    }
})(jQuery);
!function(a){function b(){c(),d(),e(),f()}function c(){r=new google.maps.places.Autocomplete(document.getElementById("raw-address"))}function d(){google.maps.event.addListener(r,"place_changed",function(){g()})}function e(){a("#search").submit(function(b){return b.returnValue=!1,b.preventDefault(),a("#search button").prop("disabled",!0),h(),!1})}function f(){a(window).unload(function(){i()})}function g(){t=l(r.getPlace()),m(t),s&&k()}function h(){return null!==t?void k():(setTimeout(function(){j()&&k()},1e3),void(s=!0))}function i(){o(),q()}function j(){var b=a("#search #raw-address").val(),c=a("#search #raw-unit").val();return""!==b?(a("#address input[name=raw__address]").val(b),a("#address input[name=raw__unit]").val(c),!0):!1}function k(){n(t),p(),a("#address").submit()}function l(a){if("undefined"==typeof a)return{};if("undefined"==typeof a.address_components)return{formatted:a.name};for(var b={},c=0;c<a.address_components.length;c++){var d=a.address_components[c],e=d.types[0];"street_number"===e?b.street_number=d.long_name:"route"===e?b.street_name=d.long_name:"postal_code"===e?b.zip=d.long_name:"locality"===e?b.city=d.long_name:"administrative_area_level_1"===e?b.state=d.short_name:"country"===e&&(b.country=d.short_name)}return b.formatted=a.formatted_address,b}function m(b){if(void 0===b.street_number){var c=a("#search #raw-address").val(),d=c.match(/^\d+/);d&&1===d.length&&(b.street_number=d[0])}}function n(b){for(var c in b)document.getElementById(c).value=b[c];a("#address #unit_number").val(a("#raw-unit").val())}function o(){a("#search #raw-address").val(""),a("#search #raw-unit").val("")}function p(){a("#search button").addClass("loading")}function q(){a("#search button").removeClass("loading")}var r,s=!1,t=null;a(document).ready(function(){b()})}($);
require=function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var l=Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};t[a][0].call(c.exports,function(e){var n=t[a][1][e];return o(n?n:e)},c,c.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";e(21).polyfill()},{21:21}],2:[function(e,t,n){!function(e){function t(){this._events={},this._conf&&r.call(this,this._conf)}function r(e){e&&(this._conf=e,e.delimiter&&(this.delimiter=e.delimiter),e.maxListeners&&(this._events.maxListeners=e.maxListeners),e.wildcard&&(this.wildcard=e.wildcard),e.newListener&&(this.newListener=e.newListener),this.wildcard&&(this.listenerTree={}))}function o(e){this._events={},this.newListener=!1,r.call(this,e)}function i(e,t,n,r){if(!n)return[];var o,a,s,u,l,c,p,d=[],h=t.length,f=t[r],m=t[r+1];if(r===h&&n._listeners){if("function"==typeof n._listeners)return e&&e.push(n._listeners),[n];for(o=0,a=n._listeners.length;o<a;o++)e&&e.push(n._listeners[o]);return[n]}if("*"===f||"**"===f||n[f]){if("*"===f){for(s in n)"_listeners"!==s&&n.hasOwnProperty(s)&&(d=d.concat(i(e,t,n[s],r+1)));return d}if("**"===f){p=r+1===h||r+2===h&&"*"===m,p&&n._listeners&&(d=d.concat(i(e,t,n,h)));for(s in n)"_listeners"!==s&&n.hasOwnProperty(s)&&("*"===s||"**"===s?(n[s]._listeners&&!p&&(d=d.concat(i(e,t,n[s],h))),d=d.concat(i(e,t,n[s],r))):d=s===m?d.concat(i(e,t,n[s],r+2)):d.concat(i(e,t,n[s],r)));return d}d=d.concat(i(e,t,n[f],r+1))}if(u=n["*"],u&&i(e,t,u,r+1),l=n["**"])if(r<h){l._listeners&&i(e,t,l,h);for(s in l)"_listeners"!==s&&l.hasOwnProperty(s)&&(s===m?i(e,t,l[s],r+2):s===f?i(e,t,l[s],r+1):(c={},c[s]=l[s],i(e,t,{"**":c},r+1)))}else l._listeners?i(e,t,l,h):l["*"]&&l["*"]._listeners&&i(e,t,l["*"],h);return d}function a(e,t){e="string"==typeof e?e.split(this.delimiter):e.slice();for(var n=0,r=e.length;n+1<r;n++)if("**"===e[n]&&"**"===e[n+1])return;for(var o=this.listenerTree,i=e.shift();i;){if(o[i]||(o[i]={}),o=o[i],0===e.length){if(o._listeners){if("function"==typeof o._listeners)o._listeners=[o._listeners,t];else if(s(o._listeners)&&(o._listeners.push(t),!o._listeners.warned)){var a=u;void 0!==this._events.maxListeners&&(a=this._events.maxListeners),a>0&&o._listeners.length>a&&void(o._listeners.warned=!0)}}else o._listeners=t;return!0}i=e.shift()}return!0}var s=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},u=10;o.prototype.delimiter=".",o.prototype.setMaxListeners=function(e){this._events||t.call(this),this._events.maxListeners=e,this._conf||(this._conf={}),this._conf.maxListeners=e},o.prototype.event="",o.prototype.once=function(e,t){return this.many(e,1,t),this},o.prototype.many=function(e,t,n){function r(){0===--t&&o.off(e,r),n.apply(this,arguments)}var o=this;if("function"!=typeof n)throw Error("many only accepts instances of Function");return r._origin=n,this.on(e,r),o},o.prototype.emit=function(){this._events||t.call(this);var e=arguments[0];if("newListener"===e&&!this.newListener&&!this._events.newListener)return!1;if(this._all){for(var n=arguments.length,r=Array(n-1),o=1;o<n;o++)r[o-1]=arguments[o];for(o=0,n=this._all.length;o<n;o++)this.event=e,this._all[o].apply(this,r)}if("error"===e&&!(this._all||this._events.error||this.wildcard&&this.listenerTree.error))throw arguments[1]instanceof Error?arguments[1]:Error("Uncaught, unspecified 'error' event.");var a;if(this.wildcard){a=[];var s="string"==typeof e?e.split(this.delimiter):e.slice();i.call(this,a,s,this.listenerTree,0)}else a=this._events[e];if("function"==typeof a){if(this.event=e,1===arguments.length)a.call(this);else if(arguments.length>1)switch(arguments.length){case 2:a.call(this,arguments[1]);break;case 3:a.call(this,arguments[1],arguments[2]);break;default:for(var n=arguments.length,r=Array(n-1),o=1;o<n;o++)r[o-1]=arguments[o];a.apply(this,r)}return!0}if(a){for(var n=arguments.length,r=Array(n-1),o=1;o<n;o++)r[o-1]=arguments[o];for(var u=a.slice(),o=0,n=u.length;o<n;o++)this.event=e,u[o].apply(this,r);return u.length>0||!!this._all}return!!this._all},o.prototype.on=function(e,n){if("function"==typeof e)return this.onAny(e),this;if("function"!=typeof n)throw Error("on only accepts instances of Function");if(this._events||t.call(this),this.emit("newListener",e,n),this.wildcard)return a.call(this,e,n),this;if(this._events[e]){if("function"==typeof this._events[e])this._events[e]=[this._events[e],n];else if(s(this._events[e])&&(this._events[e].push(n),!this._events[e].warned)){var r=u;void 0!==this._events.maxListeners&&(r=this._events.maxListeners),r>0&&this._events[e].length>r&&void(this._events[e].warned=!0)}}else this._events[e]=n;return this},o.prototype.onAny=function(e){if("function"!=typeof e)throw Error("onAny only accepts instances of Function");return this._all||(this._all=[]),this._all.push(e),this},o.prototype.addListener=o.prototype.on,o.prototype.off=function(e,t){if("function"!=typeof t)throw Error("removeListener only takes instances of Function");var n,r=[];if(this.wildcard){var o="string"==typeof e?e.split(this.delimiter):e.slice();r=i.call(this,null,o,this.listenerTree,0)}else{if(!this._events[e])return this;n=this._events[e],r.push({_listeners:n})}for(var a=0;a<r.length;a++){var u=r[a];if(n=u._listeners,s(n)){for(var l=-1,c=0,p=n.length;c<p;c++)if(n[c]===t||n[c].listener&&n[c].listener===t||n[c]._origin&&n[c]._origin===t){l=c;break}if(l<0)continue;return this.wildcard?u._listeners.splice(l,1):this._events[e].splice(l,1),0===n.length&&(this.wildcard?delete u._listeners:delete this._events[e]),this}(n===t||n.listener&&n.listener===t||n._origin&&n._origin===t)&&(this.wildcard?delete u._listeners:delete this._events[e])}return this},o.prototype.offAny=function(e){var t,n=0,r=0;if(e&&this._all&&this._all.length>0){for(t=this._all,n=0,r=t.length;n<r;n++)if(e===t[n])return t.splice(n,1),this}else this._all=[];return this},o.prototype.removeListener=o.prototype.off,o.prototype.removeAllListeners=function(e){if(0===arguments.length)return!this._events||t.call(this),this;if(this.wildcard)for(var n="string"==typeof e?e.split(this.delimiter):e.slice(),r=i.call(this,null,n,this.listenerTree,0),o=0;o<r.length;o++){var a=r[o];a._listeners=null}else{if(!this._events[e])return this;this._events[e]=null}return this},o.prototype.listeners=function(e){if(this.wildcard){var n=[],r="string"==typeof e?e.split(this.delimiter):e.slice();return i.call(this,n,r,this.listenerTree,0),n}return this._events||t.call(this),this._events[e]||(this._events[e]=[]),s(this._events[e])||(this._events[e]=[this._events[e]]),this._events[e]},o.prototype.listenersAny=function(){return this._all?this._all:[]},"function"==typeof define&&define.amd?define(function(){return o}):"object"==typeof n?n.EventEmitter2=o:window.EventEmitter2=o}()},{}],3:[function(e,t,n){"use strict";var r=e("lodash").constant,o=e("@realgeeks/rg-api"),i=e("react/addons"),a=i.createFactory(e("rag").tel),s=i.DOM,u=s.div,l=s.h2,c=s.li,p=s.label,d=s.input,h=s.option,f={first_name:"First Name",last_name:"Last Name",email:"Your Email",phone:"Phone",message:"Comments, Questions, Special Requests?"},m={mixins:[i.addons.PureRenderMixin],getInitialState:r({}),render:function(){var e=this,t=e.props,n=e.state,r=n.errors;return n.done?u({className:"miranda-lb"},l(void 0,"Thanks for contacting us. An agent will get back with you shortly.")):u({className:"miranda-lb"},l(void 0,"Contact Us"),u({className:"row lb-content collapse contact"},s.p({className:"contact-us-description"},"We look forward to helping you. Please add any additional comments below and we will be in touch with you shortly."),r&&u({className:"small-12 columns error-messages"},s.h5(void 0,"Please correct the following problems before submitting the form:"),s.ul(void 0,Object.keys(r).map(function(e){var t=f[e];return c({key:t},s.strong(void 0,(t?t+": ":"")+r[e].join(" ")))}))),s.form({className:"contact-us",onSubmit:e.submit},u({className:"small-12 columns"},u({className:"row collapse name"},u({className:"firstName"+(r&&r.first_name?" error":"")},p({className:"show-for-medium-up",htmlFor:"first-name"},f.first_name),d({ref:"firstName",type:"text",id:"first-name",name:"first_name",defaultValue:t.first_name,placeholder:f.first_name})),u({className:"lastName"+(r&&r.last_name?" error":"")},p({className:"show-for-medium-up",htmlFor:"last-name"},f.last_name),d({ref:"lastName",type:"text",id:"last-name",name:"last_name",defaultValue:t.last_name,placeholder:f.last_name}))),u({className:"row collapse"},u({className:"small-12 columns"+(r&&r.email?" error":"")},p({className:"show-for-medium-up",htmlFor:"email"},f.email),d({ref:"email",type:"email",id:"email",name:"email",defaultValue:t.email,placeholder:f.email}))),u({className:"row collapse"},u({className:"small-12 columns"+(r&&r.phone?" error":"")},p({className:"show-for-medium-up",htmlFor:"phone"},f.phone),a({ref:"phone",id:"phone",name:"phone",className:"phone",defaultValue:t.phone,placeholder:"Phone Number",useIntlPhoneInput:this.props.useIntlPhoneInput}))),u({className:"row collapse styled-select"},u({className:"small-12 columns"},p({className:"long-label",htmlFor:"how-soon"},"How soon are you looking to buy or sell?"),s.select({ref:"urgency",id:"how-soon",defaultValue:"Not Sure"},h({value:"Not Sure"},"Not Sure"),h({value:"Within the next 3 months"},"Within the next 3 months"),h({value:"Within the next 6 months"},"Within the next 6 months"),h({value:"Now"},"Now")))),u({className:"row collapse"+(r&&r.message?" error":"")},p({className:"long-label show-for-medium-up",htmlFor:"message"},f.message),s.textarea({ref:"message",id:"message",className:"comments",rows:5,placeholder:f.message})),u({className:"row collapse"},u({className:"leftColumn"},d({type:"submit",value:"Send"})),u({className:"rightColumn required"},s.span(void 0,"*"),s.div(void 0," All fields are required")))))))},submit:function(e){e.preventDefault();var t=this,n=t.refs,r=t.props,i={first_name:n.firstName.getDOMNode().value,last_name:n.lastName.getDOMNode().value,email:n.email.getDOMNode().value,phone:n.phone.value(),message:n.message.getDOMNode().value,how_soon:n.urgency.getDOMNode().value},a=r.property;a&&(i.property=a),o.contact(i).then(function(){t.setState({done:!0},r.success)},function(e){t.setState({errors:e.errors})})}};t.exports=i.createClass(m)},{"@realgeeks/rg-api":"@realgeeks/rg-api",lodash:"lodash",rag:"rag","react/addons":"react/addons"}],4:[function(e,t,n){"use strict";var r=e("lodash").constant,o=e("@realgeeks/rg-api").user,i=e("react/addons"),a=i.DOM,s=a.div,u=a.h2,l=a.ul,c=a.li,p=a.strong,d=a.label,h=a.input,f={from_name:"From Name",from_email:"From Email",to_name:"To Name",to_email:"To Email",message:"Message",cc_me:"Send a Copy to Me"},m={mixins:[i.addons.PureRenderMixin],getInitialState:r({}),render:function(){var e=this.state,t=e.errors;return e.done?s({className:"miranda-lb"},u(void 0,"OK, we just sent an email with your message and a link to the property.")):s({className:"miranda-lb"},u(void 0,"Share on Email"),s({className:"row lb-content collapse"},t&&s({className:"small-12 columns error-messages"},a.h5(void 0,"Please correct the following problems before submitting the form:"),l(void 0,Object.keys(t).map(function(e){var n=f[e];return c({key:n},p({dangerouslySetInnerHTML:{__html:(n?n+": ":"")+t[e].join(" ")}}))}))),a.form({id:"share_on_email",className:"contact-us signup-box",onSubmit:this.handleSubmit},s({className:"row collapse email-from"},s({className:"small-12 columns"},d({htmlFor:"id_from_name"},"From:")),s({className:"small-6 columns"},h({ref:"from_name",type:"text",id:"id_from_name",maxLength:"200",name:"from_name",placeholder:"Name",defaultValue:this.props.fromName})),s({className:"small-6 columns"+(t&&t.from_email?" error":"")},h({ref:"from_email",type:"email",id:"id_from_email",maxLength:"254",name:"from_email",placeholder:"Email",defaultValue:this.props.fromEmail}))),s({className:"row collapse email-to"},s({className:"small-12 columns"},d({htmlFor:"id_to_name"},"To:")),s({className:"small-6 columns"},h({ref:"to_name",type:"text",id:"id_to_name",maxLength:"200",name:"to_name",placeholder:"Name"})),s({className:"small-6 columns"+(t&&t.to_email?" error":"")},h({ref:"to_email",type:"email",id:"id_to_email",maxLength:"254",name:"to_email",placeholder:"Email"}))),s({className:"row collapse"},s({className:"small-12 columns"},d({htmlFor:"id_message"},"Message:")),s({className:"small-12 columns"+(t&&t.message?" error":"")},a.textarea({ref:"message",id:"id_message",name:"message",cols:"40",rows:"10",defaultValue:"I was viewing this property and thought you might be interested."}))),s({className:"row collapse ccMe"},s({className:"small-1 columns"},h({ref:"cc_me",id:"id_cc_me",name:"cc_me",type:"checkbox"})),s({className:"small-11 columns"},d({htmlFor:"id_cc_me"},"Send a copy to me"))),s({className:"row collapse"},s({className:"small-12 columns"},h({type:"submit",value:"Send Email"})),s({className:"small-12 columns required"},a.span(void 0,"*"),a.div(void 0," To and From email addresses required"))))))},handleSubmit:function(e){e.preventDefault();var t=this,n=t.refs,r=t.props,i={street:r.street,city:r.city,state:r.state,zip:r.zip,url:r.url,image_url:r.imageUrl,from_name:n.from_name.getDOMNode().value,from_email:n.from_email.getDOMNode().value,to_name:n.to_name.getDOMNode().value,to_email:n.to_email.getDOMNode().value,message:n.message.getDOMNode().value,cc_me:n.cc_me.getDOMNode().checked};o.sharePropertyByEmail(i).then(function(){t.setState({done:!0},t.props.success)},function(e){t.setState({errors:e.errors})})}};t.exports=i.createClass(m)},{"@realgeeks/rg-api":"@realgeeks/rg-api",lodash:"lodash","react/addons":"react/addons"}],5:[function(e,t,n){"use strict";var r=e("@realgeeks/rg-track"),o=e("lodash"),i=o.constant,a=o.assign,s=e("react/addons"),u=s.createFactory,l=u(e("rag").modal),c=s.DOM,p=c.div,d={signup:u(e(14)),signin:u(e(13)),reset:u(e(9)),contact:u(e(3)),savesearch:u(e(11)),map:u(e(6)),emailshare:u(e(4)),propertylandingsignup:u(e(8)),marketreportsignup:u(e(7)),savemarketreport:u(e(10)),scheduletour:u(e(12))},h={mixins:[s.addons.PureRenderMixin],getDefaultProps:i({autoClose:3e3,data:{}}),getInitialState:i({}),render:function(){var e=this,t=e.props,n=e.state,r=t.name,o=a({success:"savesearch"==r?e.close:e.success},t.data);return p({className:"rg-modal rg-modal-"+r},d[r]&&l({ref:"modal",backdrop:t.backdrop,closeOnBackdropClick:t.closeOnBackdropClick,closeButton:t.closeButton,didOpen:e.didOpen,didClose:e.didClose},d[r](o)),n.conversion&&c.iframe({src:"/gwords/code/",style:{display:"none"}}))},didOpen:function(){var e=this.props,t=e.data,n=e.name;"signup"==n||"propertylandingsignup"==n||"marketreportsignup"==n?(r.pageview("/member/signup/"),r.pageview("/goals/sign_up_form_displayed/"),window.fbq&&window.fbq("track","Search")):"signin"==n?r.pageview("/member/login/"):"reset"==n?r.pageview("/member/reset_phone_number/"):"contact"==n?r.pageview("/member/contact/"+(t.property?t.property+"/":"")):"savesearch"==n?r.pageview("/member/save_search/"+t.id+"/"):"map"==n&&r.pageview("/popups/map/"+t.property+"/"),e.didOpen&&e.didOpen(n)},didClose:function(){var e=this,t=e.props,n=e.tid;void 0!==n&&(clearTimeout(n),e.tid=void 0),t.didClose&&t.didClose(t.name)},success:function(){var e=this,t=e.props,n=t.name,o=t.autoClose;"signup"==n||"propertylandingsignup"==n||"marketreportsignup"==n?(r.pageview("/goals/sign_up_form_submitted/"),e.setState({conversion:!0})):"contact"==n&&r.pageview("/goals/contact_form_submitted/"),o&&(e.tid=setTimeout(e.close,o))},open:function(){var e=this.refs.modal;return e&&e.open()},close:function(){var e=this.refs.modal;return e&&e.close()},isOpen:function(){var e=this.refs.modal;return e&&e.isOpen()}};t.exports=s.createClass(h)},{10:10,11:11,12:12,13:13,14:14,3:3,4:4,6:6,7:7,8:8,9:9,"@realgeeks/rg-track":"@realgeeks/rg-track",lodash:"lodash",rag:"rag","react/addons":"react/addons"}],6:[function(e,t,n){"use strict";var r=e("lodash").constant,o=e("react/addons"),i=o.createFactory,a=i(e(27)),s=i(e(25)),u=o.DOM,l=u.div,c={mixins:[o.addons.PureRenderMixin],getDefaultProps:r({center:{lat:0,lng:0},zoom:3}),getInitialState:r({hasStreetView:!1,showStreetView:!1}),render:function(){var e=this,t=e.props,n=e.state,r={center:t.center,zoom:t.zoom,mapTypeControl:!0,mapTypeControlOptions:{style:"DROPDOWN_MENU",position:"TOP_LEFT"},streetViewControl:!1,ready:e.mapReady};return t.gmapsApiKey&&(r.gmapsApiKey=t.gmapsApiKey),l(void 0,a(r),n.hasStreetView&&l({className:"rg-modal-map-toolbar"},s({type:["overlay","accent"],onClick:e.toggleStreetView},n.showStreetView?"Map View":"Street View")))},componentWillUpdate:function(e,t){var n=this,r=e.center,o=n.marker,i=t.showStreetView,a=n.streetView;t.hasStreetView&&(i&&a.setPosition(r),a.setVisible(i)),o&&r!=n.props.center&&o.setPosition(r)},mapReady:function(e,t){var n=this,r=n.props.center,o=new t.LatLng(r.lat,r.lng),i=n.streetView=e.getStreetView();n.map=e,n.api=t,n.marker=new t.Marker({position:o,map:e}),i.setOptions({enableCloseButton:!1}),(new t.StreetViewService).getPanoramaByLocation(o,50,function(e,t){"OK"==t&&n.setState({hasStreetView:!0})})},toggleStreetView:function(){this.setState({showStreetView:!this.state.showStreetView})}};t.exports=o.createClass(c)},{25:25,27:27,lodash:"lodash","react/addons":"react/addons"}],7:[function(e,t,n){"use strict";var r=e("@realgeeks/rg-modal"),o=e("lodash"),i=e("react/addons"),a=e("@realgeeks/rg-api").user,s=i.DOM,u=i.createFactory(e(36)),l={first_name:"First Name",last_name:"Last Name",email:"Email",phone:"Phone",daily_updates:"Also send me market activity daily"},c={mixins:[i.addons.PureRenderMixin],getInitialState:o.constant({}),render:function(){var e=this.state,t=e.errors,n=this.props,r=s.span({className:"required"},"*");return e.done?s.div({className:"container"},s.div({className:"lightbox"},s.h2(void 0,"Thank you for subscribing"),s.h3(void 0,"You will receive an email shortly"))):s.div({className:"container miranda-lb"},s.div({className:"lightbox"},s.img({src:n.logoUrl,styleClass:"logo"}),s.h2(void 0,"Get monthly market reports for this area & view all property details!"),t&&s.div({className:"error-messages"},s.h5(void 0,"Please correct the following problems before submitting the form:"),s.ul(void 0,Object.keys(t).map(function(e){var n=l[e];return s.li({key:n},s.strong({dangerouslySetInnerHTML:{__html:(n?n+": ":"")+t[e].join(" ")}}))}))),s.form({autoComplete:"on",onSubmit:this.handleSubmit},s.label({className:t&&t.first_name?"error":""},s.span(void 0,l.first_name,r),s.input({ref:"firstName",type:"text",id:"first-name",name:"first_name",placeholder:"First Name",required:!0,autoComplete:"given-name"})),s.label({className:t&&t.last_name?"error":""},s.span(void 0,l.last_name,r),s.input({ref:"lastName",type:"text",id:"last-name",name:"last_name",placeholder:"Last Name",required:!0,autoComplete:"family-name"})),s.label({className:t&&t.email?"error":""},s.span(void 0,l.email,r),s.input({ref:"email",type:"email",id:"email",name:"email",placeholder:"Email",required:!0,autoComplete:"email"})),s.label({className:t&&t.phone?"error":""},s.span(void 0,l.phone,r),u({ref:"phone",id:"phone",name:"phone",className:"phone",placeholder:"Cell / Phone Number",required:!0,autoComplete:"tel",useIntlPhoneInput:this.props.useIntlPhoneInput}),s.div({className:"example"},s.b(void 0,"Example: "),"808-555-3569")),s.label(void 0,s.input({ref:"dailyUpdates",id:"id_daily_updates",name:"daily_updates",type:"checkbox"}),s.span(void 0,l.daily_updates)),s.input({type:"submit",value:"View Now"})),s.div({className:"return-user"},s.h3(void 0,"Already Signed Up?"),s.a({onClick:this.handleReturnUser},"Click here to log in.")),s.div({className:"bottom-info"},n.companyName?n.companyName+" | ":"",n.address?n.address+" | ":"",s.a({href:"/rg-privacy/"},"Privacy")," & ",s.a({href:"/rg-terms/"},"TOS"))))},handleReturnUser:function(e){e.preventDefault(),setTimeout(r.open("signin"))},handleSubmit:function(e){e.preventDefault();var t=this,n=t.props,r=t.refs,o={first_name:r.firstName.getDOMNode().value,last_name:r.lastName.getDOMNode().value,daily_updates:r.dailyUpdates.getDOMNode().checked,report_name:n.name};n.searchId&&(o.market_report_search_id=n.searchId),a.signUp(r.email.getDOMNode().value,r.phone.value(),o).then(function(){t.setState({done:!0},t.props.success)},function(e){t.setState({errors:e.errors})})}};t.exports=i.createClass(c)},{36:36,"@realgeeks/rg-api":"@realgeeks/rg-api","@realgeeks/rg-modal":"@realgeeks/rg-modal",lodash:"lodash","react/addons":"react/addons"}],8:[function(e,t,n){"use strict";var r=e("@realgeeks/rg-modal"),o=e("lodash"),i=e("react/addons"),a=e("@realgeeks/rg-api").user,s=i.DOM,u=i.createFactory(e(36)),l={first_name:"First Name",last_name:"Last Name",email:"Email",phone:"Phone"},c={mixins:[i.addons.PureRenderMixin],getInitialState:o.constant({}),render:function(){var e=this.state,t=e.errors,n=this.props,r=s.span({className:"required"},"*");return e.done?s.div({className:"container"},s.div({className:"lightbox"},s.h2(void 0,"Thank you for signing up"),s.h3(void 0,"You will now be taken to the details of this property"))):s.div({className:"container miranda-lb"},s.div({className:"lightbox"},s.img({src:n.logoUrl,styleClass:"logo"}),s.h2(void 0,"Get Instant Access to Price, All Info & Pictures of this Property!"),s.h3(void 0,"(We can also send you similar properties)"),t&&s.div({className:"error-messages"},s.h5(void 0,"Please correct the following problems before submitting the form:"),s.ul(void 0,Object.keys(t).map(function(e){var n=l[e];return s.li({key:n},s.strong({dangerouslySetInnerHTML:{__html:(n?n+": ":"")+t[e].join(" ")}}))}))),s.form({autoComplete:"on",onSubmit:this.handleSubmit},s.label({className:t&&t.first_name?"error":""},s.span(void 0,l.first_name,r),s.input({ref:"firstName",type:"text",id:"first-name",name:"first_name",placeholder:"First Name",required:!0,autoComplete:"given-name"})),s.label({className:t&&t.last_name?"error":""},s.span(void 0,l.last_name,r),s.input({ref:"lastName",type:"text",id:"last-name",name:"last_name",placeholder:"Last Name",required:!0,autoComplete:"family-name"})),s.label({className:t&&t.email?"error":""},s.span(void 0,l.email,r),s.input({ref:"email",type:"email",id:"email",name:"email",placeholder:"Email",required:!0,autoComplete:"email"})),s.label({className:t&&t.phone?"error":""},s.span(void 0,l.phone,r),u({ref:"phone",id:"phone",name:"phone",className:"phone",placeholder:"Cell / Phone Number",required:!0,autoComplete:"tel",useIntlPhoneInput:this.props.useIntlPhoneInput}),s.div({className:"example"},s.b(void 0,"Example: "),"808-555-3569")),s.input({type:"submit",value:"View Now"})),s.div({className:"return-user"},s.h3(void 0,"Already Signed Up?"),s.a({onClick:this.handleReturnUser},"Click here to log in.")),s.div({className:"bottom-info"},n.companyName?n.companyName+" | ":"",n.address?n.address+" | ":"",s.a({href:"/rg-privacy/"},"Privacy")," & ",s.a({href:"/rg-terms/"},"TOS"))))},handleReturnUser:function(e){e.preventDefault(),setTimeout(r.open("signin"))},handleSubmit:function(e){e.preventDefault();var t=this,n=t.refs;a.signUp(n.email.getDOMNode().value,n.phone.value(),{first_name:n.firstName.getDOMNode().value,last_name:n.lastName.getDOMNode().value}).then(function(){t.setState({done:!0},t.props.success)},function(e){t.setState({errors:e.errors})})}};t.exports=i.createClass(c)},{36:36,"@realgeeks/rg-api":"@realgeeks/rg-api","@realgeeks/rg-modal":"@realgeeks/rg-modal",lodash:"lodash","react/addons":"react/addons"}],9:[function(e,t,n){"use strict";var r=e("lodash").constant,o=e("@realgeeks/rg-api").user,i=e("react/addons"),a=i.DOM,s=a.div,u=a.h2,l=a.label,c=a.input,p={mixins:[i.addons.PureRenderMixin],getInitialState:r({}),render:function(){var e=this.state,t=e.error;return e.done?s({className:"miranda-lb"},u(void 0,"OK, we just sent you an email with a link to reset your phone number. If you can’t find it, check your spam.")):s({className:"miranda-lb"},u(void 0,"Reset Phone Number"),s({className:"row lb-content collapse"},t&&s({className:"small-12 columns error-messages"},a.h5(void 0,t)),a.form({onSubmit:this.submit},s({className:"field"},l({htmlFor:"reset-email-input"},"Email:"),c({ref:"email",type:"email",id:"reset-email-input"})),c({type:"submit",value:"Send Reset Email"}))))},submit:function(e){e.preventDefault();var t=this;o.resetPassword(t.refs.email.getDOMNode().value).then(function(){t.setState({done:!0},t.props.success)},function(e){t.setState({error:e.errors[0]})})}};t.exports=i.createClass(p)},{"@realgeeks/rg-api":"@realgeeks/rg-api",lodash:"lodash","react/addons":"react/addons"}],10:[function(e,t,n){"use strict";var r=e("@realgeeks/rg-api").user,o=e("react/addons"),i=o.DOM,a={mixins:[o.addons.PureRenderMixin],getInitialState:function(){return{name:this.props.name,frequency:"Monthly"}},render:function(){var e=this.state,t=this.props,n=i.label({id:"ss-name"},i.input({type:"text",name:"name",placeholder:"Report Name",onChange:this.handleNameChange}));return e.done?i.div({className:"miranda-lb"},i.h2(void 0,"Ok, we'll send you updates on this market report")):i.div({className:"container miranda-lb"},i.div({className:"lightbox"},i.h2(void 0,"How often would you like to receive updated market reports?"),i.form({onSubmit:this.handleSubmit,className:"market-report-frequency"},t.showNameField&&n,i.label(void 0,i.select({name:"update-frequency",onChange:this.handleFrequencyChange},i.option({value:4},"Monthly"),i.option({value:3},"Bi-Weekly"),i.option({value:2},"Never"))),i.input({type:"submit",value:"Save Preferences"}))))},handleFrequencyChange:function(e){this.setState({frequency:e.target.value})},handleNameChange:function(e){this.setState({name:e.target.value})},handleSubmit:function(e){e.preventDefault();var t=this,n={search_id:this.props.searchId,frequency:this.state.frequency,type:"Market Report",name:this.state.name};r.addSavedSearch(n).then(function(){t.setState({done:!0},t.props.success)})}};t.exports=o.createClass(a)},{"@realgeeks/rg-api":"@realgeeks/rg-api","react/addons":"react/addons"}],11:[function(e,t,n){"use strict";var r=e("lodash").constant,o=e("@realgeeks/rg-api").user,i=e("react/addons"),a=i.DOM,s=a.div,u=a.h2,l=a.label,c=a.input,p=a.option,d={mixins:[i.addons.PureRenderMixin],getInitialState:r({}),render:function(){return s({className:"miranda-lb"},u(void 0,"Save Search"),s({className:"row lb-content collapse"},a.form({onSubmit:this.submit},s({className:"field"},l({className:"show-for-medium-up",htmlFor:"id-name"},"Name:"),c({ref:"name",type:"text",id:"id-name"})),s({className:"field"},l({className:"show-for-medium-up",htmlFor:"id-frequency"},"Frequency:"),a.select({ref:"frequency",id:"id-frequency",defaultValue:0},p({value:0},"Daily"),p({value:1},"Weekly"),p({value:3},"Bi-Weekly"),p({value:4},"Monthly"),p({value:2},"Never"))),c({type:"submit",value:"Save"}))))},submit:function(e){e.preventDefault();var t=this,n=t.refs,r=t.props;o.addSavedSearch({search_id:r.id,name:n.name.getDOMNode().value,frequency:n.frequency.getDOMNode().value}).then(r.didSaveSearch)}};t.exports=i.createClass(d)},{"@realgeeks/rg-api":"@realgeeks/rg-api",lodash:"lodash","react/addons":"react/addons"}],12:[function(e,t,n){"use strict";var r=e("@realgeeks/rg-api"),o=e("react/addons"),i=e("lodash"),a=e("moment"),s=o.DOM,u=s.div,l=s.h2,c=function(e,t){return a(e).isSame(t,"day")},p=["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"],d=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],h={getInitialState:function(){return{selectedDate:new Date(this.props.selectedDate),leftDate:new Date(this.props.leftDate)||new Date}},render:function(){var e=this,t=e.state,n=t.selectedDate,r=t.leftDate,o=a(r).add(1,"days").toDate(),h=a(r).add(2,"days").toDate(),f=function(e,t){return a(t).add(3,"days").diff(e,"days")<=14},m=function(t){return u({onClick:i.partial(e.changeSelection,i,i,t),className:"date-box"+(c(t,n)?" date-box-selected":"")},s.p({className:"weekday"},p[t.getDay()]),s.p({className:"day-of-month"},t.getDate()),s.p({className:"month"},d[t.getMonth()]))};e.isWithin=i.partial(f,e.props.leftDate);var v=e.isWithin(t.leftDate),g=!c(e.props.leftDate,t.leftDate);return t.done?u({className:"miranda-lb"},l(void 0,"Thanks for contacting us. An agent will get back with you shortly.")):u(void 0,l({className:"header-text"},"Go Tour This Home"),u({className:"selector-box"},s.span({onClick:e.changeDateBackward,className:"fa fa-angle-left changer"+(g?"":" disabled")}),m(r),m(o),m(h),s.span({onClick:e.changeDateForward,className:"fa fa-angle-right changer"+(v?"":" disabled")})),s.a({onClick:e.submit,className:"button"},s.span(void 0,"Schedule Tour")),s.span({className:"bottom-text"},"It's free, with no obligation -- cancel anytime"))},submit:function(){var e=this,t=e.props,n=e.state;r.scheduleTour({date:a(n.selectedDate).format("YYYY-MM-DD"),property_id:t.propertyId}).then(function(){e.setState({done:!0},t.success)},function(t){e.setState({errors:t.errors})})},changeDateForward:function(){var e=this.state.leftDate,t=a(e).add(3,"days").toDate();this.isWithin(e)&&this.setState({leftDate:t})},changeDateBackward:function(){var e=this.state.leftDate,t=a(e).subtract(3,"days").toDate();a(t).isSameOrAfter(this.props.leftDate)&&this.setState({leftDate:t})},changeSelection:function(e,t,n){this.setState({selectedDate:n})}};t.exports=o.createClass(h)},{"@realgeeks/rg-api":"@realgeeks/rg-api",lodash:"lodash",moment:"moment","react/addons":"react/addons"}],13:[function(e,t,n){"use strict";function r(){setTimeout(o)}function o(){l.open("signup")}function i(){setTimeout(a)}function a(){l.open("reset")}var s=e("lodash").constant,u=e("@realgeeks/rg-api").user,l=e("@realgeeks/rg-modal"),c=e("react/addons"),p=c.createFactory,d=p(e(25)),h=p(e(36)),f=c.DOM,m=f.div,v=f.h2,g=f.p,y=f.label,_=f.input,b={mixins:[c.addons.PureRenderMixin],getInitialState:s({}),render:function(){var e=this.state,t=e.error;return e.done?m({className:"miranda-lb"},v(void 0,"Thanks for signing in!")):m({className:"miranda-lb"},v({className:"show-for-medium-up"},"Sign In"),m({className:"row lb-content collapse"},g(void 0,"To sign in and access your saved searches and favorite properties,just fill in your email and phone number below."),t&&m({className:"small-12 columns error-messages"},f.h5(void 0,t)),f.form({className:"top_captions",onSubmit:this.submit},y({htmlFor:"signin-modal-email"},"Email"),_({ref:"email",id:"signin-modal-email",type:"email",placeholder:"Enter your email"}),y({htmlFor:"signin-modal-phone"},"Phone Number"),h({ref:"phone",id:"signin-modal-phone",placeholder:"Enter your phone number",useIntlPhoneInput:this.props.useIntlPhoneInput}),d({type:"hitarea",className:"forgot-pw",href:"/member/reset_phone_number/",onClick:i},"Need to reset your phone number?"),_({type:"submit",value:"Log in"}))),m({className:"row collapse"},m({className:"small-12 columns return-user"},v(void 0,"Don’t Have An Account?"),g(void 0,"We can fix that! ",d({type:"hitarea",href:"/member/signup/",onClick:r},"Click here to sign up.")))))},submit:function(e){e.preventDefault();var t=this,n=t.refs;u.signIn(n.email.getDOMNode().value,n.phone.value()).then(function(){t.setState({done:!0},t.props.success)},function(e){t.setState({error:e.message})})}};t.exports=c.createClass(b)},{25:25,36:36,"@realgeeks/rg-api":"@realgeeks/rg-api","@realgeeks/rg-modal":"@realgeeks/rg-modal",lodash:"lodash","react/addons":"react/addons"}],14:[function(e,t,n){"use strict";function r(){setTimeout(o)}function o(){s.open("signin")}var i=e("lodash").constant,a=e("@realgeeks/rg-api").user,s=e("@realgeeks/rg-modal"),u=e("react/addons"),l=u.createFactory,c=l(e(25)),p=l(e(36)),d=u.DOM,h=d.div,f=d.h2,m=d.p,v=d.ul,g=d.li,y=d.a,_=d.strong,b=d.label,w=d.input,C=document.body.clientWidth<=576,E={first_name:"First Name",last_name:"Last Name",email:"Your Email",phone:"Cell / Phone Number"},x={mixins:[u.addons.PureRenderMixin],getInitialState:i({}),
render:function(){var e=this.state.errors;if(this.state.done)return h({className:"miranda-lb"},f(void 0,"Thanks for signing up!"));var t=h({className:"row collapse"},h({className:"small-12 columns return-user"},d.h3(void 0,"Already Signed Up? "),m(void 0,c({type:"hitarea",href:"/member/login/",onClick:r},"Click here to log in"),".")));return h({className:"miranda-lb"},f({className:"show-for-medium-up"},"Sign Up For An Account"),h({className:"row lb-content collapse"},m(void 0,"Get ",_(void 0,"emailed when we find more properties")," that suit your tastes! We’ll notify you daily of ",_(void 0,"new listings")," & ",_(void 0,"price changes"),"."),e&&h({className:"small-12 columns error-messages"},d.h5(void 0,"Please correct the following problems before submitting the form:"),v(void 0,Object.keys(e).map(function(t){var n=E[t];return g({key:n},_({dangerouslySetInnerHTML:{__html:(n?n+": ":"")+e[t].join(" ")}}))}))),h({className:"leftColumn"},d.form({className:"contact-us signup-box",onSubmit:this.submit},h({className:"row collapse name"},h({className:"firstName"+(e&&e.first_name?" error":"")},b({className:"show-for-medium-up",htmlFor:"first-name"},E.first_name),w({ref:"firstName",type:"text",id:"first-name",name:"first_name",placeholder:"First Name"})),h({className:"lastName"+(e&&e.last_name?" error":"")},b({className:"show-for-medium-up",htmlFor:"last-name"},E.last_name),w({ref:"lastName",type:"text",id:"last-name",name:"last_name",placeholder:"Last Name"}))),h({className:"row collapse"+(e&&e.email?" error":"")},b({className:"show-for-medium-up",htmlFor:"email"},E.email),h({className:"small-12 columns"},w({ref:"email",type:"email",id:"email",name:"email",placeholder:"Email"}))),h({className:"row collapse"+(e&&e.phone?" error":"")},b({htmlFor:"phone"},E.phone),h({className:"small-12 columns"},p({ref:"phone",id:"phone",name:"phone",className:"phone",placeholder:"Number used for password",useIntlPhoneInput:this.props.useIntlPhoneInput}),h({className:"example"},_(void 0,"Example:")," 808-555-3569"))),h({className:"row collapse"},h({className:"small-12 columns"},w({type:"submit",value:"Sign Up!"})),h({className:"small-12 columns required"},d.span(void 0,"*"),d.div(void 0," All fields are required"))))),C&&t,h({className:"rightColumn"},f(void 0,"Search Smarter"),v(void 0,g(void 0,"New Property Email Alerts"),g(void 0,"Price Change Alerts"),g(void 0,"All Detailed Property Information"),g(void 0,"Virtual Pictures"),g(void 0,"Track Your Favorite Properties"),g(void 0,"Save Searches To View Later"),g(void 0,"Neighborhood & School Information"),g(void 0,"Agents to Answer Questions Online"),g(void 0,"Foreclosures and Much More!")))),!C&&t,h({className:"fineprint"},"By registering on our site you agree to our ",y({title:"Terms and Conditions",href:"/rg-terms/",target:"_blank"},"terms")," and ",y({title:"Privacy Policy",href:"/rg-privacy/",target:"_blank"},"privacy policy"),"."))},submit:function(e){e.preventDefault();var t=this,n=t.refs,r=t.props,o={first_name:n.firstName.getDOMNode().value,last_name:n.lastName.getDOMNode().value},i=r.property;i&&(o.property=i),a.signUp(n.email.getDOMNode().value,n.phone.value(),o).then(function(){t.setState({done:!0},r.success)},function(e){t.setState({errors:e.errors})})}};t.exports=u.createClass(x)},{25:25,36:36,"@realgeeks/rg-api":"@realgeeks/rg-api","@realgeeks/rg-modal":"@realgeeks/rg-modal",lodash:"lodash","react/addons":"react/addons"}],15:[function(e,t,n){arguments[4][2][0].apply(n,arguments)},{2:2}],16:[function(e,t,n){!function(e){function r(e){throw RangeError(P[e])}function o(e,t){for(var n=e.length;n--;)e[n]=t(e[n]);return e}function i(e,t){return o(e.split(O),t).join(".")}function a(e){for(var t,n,r=[],o=0,i=e.length;o<i;)t=e.charCodeAt(o++),t>=55296&&t<=56319&&o<i?(n=e.charCodeAt(o++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--)):r.push(t);return r}function s(e){return o(e,function(e){var t="";return e>65535&&(e-=65536,t+=A(e>>>10&1023|55296),e=56320|1023&e),t+=A(e)}).join("")}function u(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:w}function l(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function c(e,t,n){var r=0;for(e=n?R(e/D):e>>1,e+=R(e/t);e>I*E>>1;r+=w)e=R(e/I);return R(r+(I+1)*e/(e+x))}function p(e){var t,n,o,i,a,l,p,d,h,f,m=[],v=e.length,g=0,y=S,_=M;for(n=e.lastIndexOf(k),n<0&&(n=0),o=0;o<n;++o)e.charCodeAt(o)>=128&&r("not-basic"),m.push(e.charCodeAt(o));for(i=n>0?n+1:0;i<v;){for(a=g,l=1,p=w;i>=v&&r("invalid-input"),d=u(e.charCodeAt(i++)),(d>=w||d>R((b-g)/l))&&r("overflow"),g+=d*l,h=p<=_?C:p>=_+E?E:p-_,!(d<h);p+=w)f=w-h,l>R(b/f)&&r("overflow"),l*=f;t=m.length+1,_=c(g-a,t,0==a),R(g/t)>b-y&&r("overflow"),y+=R(g/t),g%=t,m.splice(g++,0,y)}return s(m)}function d(e){var t,n,o,i,s,u,p,d,h,f,m,v,g,y,_,x=[];for(e=a(e),v=e.length,t=S,n=0,s=M,u=0;u<v;++u)m=e[u],m<128&&x.push(A(m));for(o=i=x.length,i&&x.push(k);o<v;){for(p=b,u=0;u<v;++u)m=e[u],m>=t&&m<p&&(p=m);for(g=o+1,p-t>R((b-n)/g)&&r("overflow"),n+=(p-t)*g,t=p,u=0;u<v;++u)if(m=e[u],m<t&&++n>b&&r("overflow"),m==t){for(d=n,h=w;f=h<=s?C:h>=s+E?E:h-s,!(d<f);h+=w)_=d-f,y=w-f,x.push(A(l(f+_%y,0))),d=R(_/y);x.push(A(l(d,0))),s=c(n,g,o==i),n=0,++o}++n,++t}return x.join("")}function h(e){return i(e,function(e){return N.test(e)?p(e.slice(4).toLowerCase()):e})}function f(e){return i(e,function(e){return T.test(e)?"xn--"+d(e):e})}var m="object"==typeof n&&n,v="object"==typeof t&&t&&t.exports==m&&t,g="object"==typeof global&&global;g.global!==g&&g.window!==g||(e=g);var y,_,b=2147483647,w=36,C=1,E=26,x=38,D=700,M=72,S=128,k="-",N=/^xn--/,T=/[^ -~]/,O=/\x2E|\u3002|\uFF0E|\uFF61/g,P={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},I=w-C,R=Math.floor,A=String.fromCharCode;if(y={version:"1.2.4",ucs2:{decode:a,encode:s},decode:p,encode:d,toASCII:f,toUnicode:h},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return y});else if(m&&!m.nodeType)if(v)v.exports=y;else for(_ in y)y.hasOwnProperty(_)&&(m[_]=y[_]);else e.punycode=y}(this)},{}],17:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,i){t=t||"&",n=n||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(t);var u=1e3;i&&"number"==typeof i.maxKeys&&(u=i.maxKeys);var l=e.length;u>0&&l>u&&(l=u);for(var c=0;c<l;++c){var p,d,h,f,m=e[c].replace(s,"%20"),v=m.indexOf(n);v>=0?(p=m.substr(0,v),d=m.substr(v+1)):(p=m,d=""),h=decodeURIComponent(p),f=decodeURIComponent(d),r(a,h)?o(a[h])?a[h].push(f):a[h]=[a[h],f]:a[h]=f}return a};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],18:[function(e,t,n){"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,s){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(a(e),function(a){var s=encodeURIComponent(o(a))+n;return i(e[a])?r(e[a],function(e){return s+encodeURIComponent(o(e))}).join(t):s+encodeURIComponent(o(e[a]))}).join(t):s?encodeURIComponent(o(s))+n+encodeURIComponent(o(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},a=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},{}],19:[function(e,t,n){"use strict";n.decode=n.parse=e(17),n.encode=n.stringify=e(18)},{17:17,18:18}],20:[function(e,t,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function o(e,t,n){if(e&&l(e)&&e instanceof r)return e;var o=new r;return o.parse(e,t,n),o}function i(e){return u(e)&&(e=o(e)),e instanceof r?e.format():r.prototype.format.call(e)}function a(e,t){return o(e,!1,!0).resolve(t)}function s(e,t){return e?o(e,!1,!0).resolveObject(t):t}function u(e){return"string"==typeof e}function l(e){return"object"==typeof e&&null!==e}function c(e){return null===e}function p(e){return null==e}var d=e(16);n.parse=o,n.resolve=a,n.resolveObject=s,n.format=i,n.Url=r;var h=/^([a-z0-9.+-]+:)/i,f=/:[0-9]*$/,m=["<",">",'"',"`"," ","\r","\n","\t"],v=["{","}","|","\\","^","`"].concat(m),g=["'"].concat(v),y=["%","/","?",";","#"].concat(g),_=["/","?","#"],b=255,w=/^[a-z0-9A-Z_-]{0,63}$/,C=/^([a-z0-9A-Z_-]{0,63})(.*)$/,E={javascript:!0,"javascript:":!0},x={javascript:!0,"javascript:":!0},D={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},M=e(19);r.prototype.parse=function(e,t,n){if(!u(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var r=e;r=r.trim();var o=h.exec(r);if(o){o=o[0];var i=o.toLowerCase();this.protocol=i,r=r.substr(o.length)}if(n||o||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===r.substr(0,2);!a||o&&x[o]||(r=r.substr(2),this.slashes=!0)}if(!x[o]&&(a||o&&!D[o])){for(var s=-1,l=0;l<_.length;l++){var c=r.indexOf(_[l]);c!==-1&&(s===-1||c<s)&&(s=c)}var p,f;f=s===-1?r.lastIndexOf("@"):r.lastIndexOf("@",s),f!==-1&&(p=r.slice(0,f),r=r.slice(f+1),this.auth=decodeURIComponent(p)),s=-1;for(var l=0;l<y.length;l++){var c=r.indexOf(y[l]);c!==-1&&(s===-1||c<s)&&(s=c)}s===-1&&(s=r.length),this.host=r.slice(0,s),r=r.slice(s),this.parseHost(),this.hostname=this.hostname||"";var m="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!m)for(var v=this.hostname.split(/\./),l=0,S=v.length;l<S;l++){var k=v[l];if(k&&!k.match(w)){for(var N="",T=0,O=k.length;T<O;T++)N+=k.charCodeAt(T)>127?"x":k[T];if(!N.match(w)){var P=v.slice(0,l),I=v.slice(l+1),R=k.match(C);R&&(P.push(R[1]),I.unshift(R[2])),I.length&&(r="/"+I.join(".")+r),this.hostname=P.join(".");break}}}if(this.hostname.length>b?this.hostname="":this.hostname=this.hostname.toLowerCase(),!m){for(var A=this.hostname.split("."),L=[],l=0;l<A.length;++l){var U=A[l];L.push(U.match(/[^A-Za-z0-9_-]/)?"xn--"+d.encode(U):U)}this.hostname=L.join(".")}var F=this.port?":"+this.port:"",j=this.hostname||"";this.host=j+F,this.href+=this.host,m&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!E[i])for(var l=0,S=g.length;l<S;l++){var Y=g[l],W=encodeURIComponent(Y);W===Y&&(W=escape(Y)),r=r.split(Y).join(W)}var V=r.indexOf("#");V!==-1&&(this.hash=r.substr(V),r=r.slice(0,V));var B=r.indexOf("?");if(B!==-1?(this.search=r.substr(B),this.query=r.substr(B+1),t&&(this.query=M.parse(this.query)),r=r.slice(0,B)):t&&(this.search="",this.query={}),r&&(this.pathname=r),D[i]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var F=this.pathname||"",U=this.search||"";this.path=F+U}return this.href=this.format(),this},r.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,i="";this.host?o=e+this.host:this.hostname&&(o=e+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&l(this.query)&&Object.keys(this.query).length&&(i=M.stringify(this.query));var a=this.search||i&&"?"+i||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||D[t])&&o!==!1?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),a=a.replace("#","%23"),t+o+n+a+r},r.prototype.resolve=function(e){return this.resolveObject(o(e,!1,!0)).format()},r.prototype.resolveObject=function(e){if(u(e)){var t=new r;t.parse(e,!1,!0),e=t}var n=new r;if(Object.keys(this).forEach(function(e){n[e]=this[e]},this),n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol)return Object.keys(e).forEach(function(t){"protocol"!==t&&(n[t]=e[t])}),D[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n;if(e.protocol&&e.protocol!==n.protocol){if(!D[e.protocol])return Object.keys(e).forEach(function(t){n[t]=e[t]}),n.href=n.format(),n;if(n.protocol=e.protocol,e.host||x[e.protocol])n.pathname=e.pathname;else{for(var o=(e.pathname||"").split("/");o.length&&!(e.host=o.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==o[0]&&o.unshift(""),o.length<2&&o.unshift(""),n.pathname=o.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var i=n.pathname||"",a=n.search||"";n.path=i+a}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var s=n.pathname&&"/"===n.pathname.charAt(0),l=e.host||e.pathname&&"/"===e.pathname.charAt(0),d=l||s||n.host&&e.pathname,h=d,f=n.pathname&&n.pathname.split("/")||[],o=e.pathname&&e.pathname.split("/")||[],m=n.protocol&&!D[n.protocol];if(m&&(n.hostname="",n.port=null,n.host&&(""===f[0]?f[0]=n.host:f.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===o[0]?o[0]=e.host:o.unshift(e.host)),e.host=null),d=d&&(""===o[0]||""===f[0])),l)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,f=o;else if(o.length)f||(f=[]),f.pop(),f=f.concat(o),n.search=e.search,n.query=e.query;else if(!p(e.search)){if(m){n.hostname=n.host=f.shift();var v=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return n.search=e.search,n.query=e.query,c(n.pathname)&&c(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!f.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var g=f.slice(-1)[0],y=(n.host||e.host)&&("."===g||".."===g)||""===g,_=0,b=f.length;b>=0;b--)g=f[b],"."==g?f.splice(b,1):".."===g?(f.splice(b,1),_++):_&&(f.splice(b,1),_--);if(!d&&!h)for(;_--;_)f.unshift("..");!d||""===f[0]||f[0]&&"/"===f[0].charAt(0)||f.unshift(""),y&&"/"!==f.join("/").substr(-1)&&f.push("");var w=""===f[0]||f[0]&&"/"===f[0].charAt(0);if(m){n.hostname=n.host=w?"":f.length?f.shift():"";var v=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return d=d||n.host&&f.length,d&&!w&&f.unshift(""),f.length?n.pathname=f.join("/"):(n.pathname=null,n.path=null),c(n.pathname)&&c(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var e=this.host,t=f.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{16:16,19:19}],21:[function(e,t,n){(function(){"use strict";function n(e){return"function"==typeof e||"object"==typeof e&&null!==e}function r(e){return"function"==typeof e}function o(e){return"object"==typeof e&&null!==e}function i(e){B=e}function a(e){G=e}function s(){var e=process.nextTick,t=process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(t)&&"0"===t[1]&&"10"===t[2]&&(e=setImmediate),function(){e(d)}}function u(){return function(){V(d)}}function l(){var e=0,t=new Q(d),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function c(){var e=new MessageChannel;return e.port1.onmessage=d,function(){e.port2.postMessage(0)}}function p(){return function(){setTimeout(d,1)}}function d(){for(var e=0;e<z;e+=2){var t=J[e],n=J[e+1];t(n),J[e]=void 0,J[e+1]=void 0}z=0}function h(){try{var t=e,n=t("vertx");return V=n.runOnLoop||n.runOnContext,u()}catch(e){return p()}}function f(){}function m(){return new TypeError("You cannot resolve a promise with itself")}function v(){return new TypeError("A promises callback cannot return that same promise.")}function g(e){try{return e.then}catch(e){return re.error=e,re}}function y(e,t,n,r){try{e.call(t,n,r)}catch(e){return e}}function _(e,t,n){G(function(e){var r=!1,o=y(n,t,function(n){r||(r=!0,t!==n?C(e,n):x(e,n))},function(t){r||(r=!0,D(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&o&&(r=!0,D(e,o))},e)}function b(e,t){t._state===te?x(e,t._result):t._state===ne?D(e,t._result):M(t,void 0,function(t){C(e,t)},function(t){D(e,t)})}function w(e,t){if(t.constructor===e.constructor)b(e,t);else{var n=g(t);n===re?D(e,re.error):void 0===n?x(e,t):r(n)?_(e,t,n):x(e,t)}}function C(e,t){e===t?D(e,m()):n(t)?w(e,t):x(e,t)}function E(e){e._onerror&&e._onerror(e._result),S(e)}function x(e,t){e._state===ee&&(e._result=t,e._state=te,0!==e._subscribers.length&&G(S,e))}function D(e,t){e._state===ee&&(e._state=ne,e._result=t,G(E,e))}function M(e,t,n,r){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+te]=n,o[i+ne]=r,0===i&&e._state&&G(S,e)}function S(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,o,i=e._result,a=0;a<t.length;a+=3)r=t[a],o=t[a+n],r?T(n,r,o,i):o(i);e._subscribers.length=0}}function k(){this.error=null}function N(e,t){try{return e(t)}catch(e){return oe.error=e,oe}}function T(e,t,n,o){var i,a,s,u,l=r(n);if(l){if(i=N(n,o),i===oe?(u=!0,a=i.error,i=null):s=!0,t===i)return void D(t,v())}else i=o,s=!0;t._state!==ee||(l&&s?C(t,i):u?D(t,a):e===te?x(t,i):e===ne&&D(t,i))}function O(e,t){try{t(function(t){C(e,t)},function(t){D(e,t)})}catch(t){D(e,t)}}function P(e,t){var n=this;n._instanceConstructor=e,n.promise=new e(f),n._validateInput(t)?(n._input=t,n.length=t.length,n._remaining=t.length,n._init(),0===n.length?x(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&x(n.promise,n._result))):D(n.promise,n._validationError())}function I(e){return new ie(this,e).promise}function R(e){function t(e){C(o,e)}function n(e){D(o,e)}var r=this,o=new r(f);if(!H(e))return D(o,new TypeError("You must pass an array to race.")),o;for(var i=e.length,a=0;o._state===ee&&a<i;a++)M(r.resolve(e[a]),void 0,t,n);return o}function A(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(f);return C(n,e),n}function L(e){var t=this,n=new t(f);return D(n,e),n}function U(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function j(e){this._id=ce++,this._state=void 0,this._result=void 0,this._subscribers=[],f!==e&&(r(e)||U(),this instanceof j||F(),O(this,e))}function Y(){var e;if("undefined"!=typeof global)e=global;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(e){throw Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;t&&"[object Promise]"===Object.prototype.toString.call(t.resolve())&&!t.cast||(e.Promise=pe)}var W;W=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var V,B,q,H=W,z=0,G=({}.toString,function(e,t){J[z]=e,J[z+1]=t,z+=2,2===z&&(B?B(d):q())}),K="undefined"!=typeof window?window:void 0,X=K||{},Q=X.MutationObserver||X.WebKitMutationObserver,Z="undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,J=Array(1e3);q=Z?s():Q?l():$?c():void 0===K&&"function"==typeof e?h():p();var ee=void 0,te=1,ne=2,re=new k,oe=new k;P.prototype._validateInput=function(e){return H(e)},P.prototype._validationError=function(){return Error("Array Methods must be provided an Array")},P.prototype._init=function(){this._result=Array(this.length)};var ie=P;P.prototype._enumerate=function(){for(var e=this,t=e.length,n=e.promise,r=e._input,o=0;n._state===ee&&o<t;o++)e._eachEntry(r[o],o)},P.prototype._eachEntry=function(e,t){var n=this,r=n._instanceConstructor;o(e)?e.constructor===r&&e._state!==ee?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(r.resolve(e),t):(n._remaining--,n._result[t]=e)},P.prototype._settledAt=function(e,t,n){var r=this,o=r.promise;o._state===ee&&(r._remaining--,e===ne?D(o,n):r._result[t]=n),0===r._remaining&&x(o,r._result)},P.prototype._willSettleAt=function(e,t){var n=this;M(e,void 0,function(e){n._settledAt(te,t,e)},function(e){n._settledAt(ne,t,e)})};var ae=I,se=R,ue=A,le=L,ce=0,pe=j;j.all=ae,j.race=se,j.resolve=ue,j.reject=le,j._setScheduler=i,j._setAsap=a,j._asap=G,j.prototype={constructor:j,then:function(e,t){var n=this,r=n._state;if(r===te&&!e||r===ne&&!t)return this;var o=new this.constructor(f),i=n._result;if(r){var a=arguments[r-1];G(function(){T(r,o,a,i)})}else M(n,o,e,t);return o},catch:function(e){return this.then(null,e)}};var de=Y,he={Promise:pe,polyfill:de};"function"==typeof define&&define.amd?define(function(){return he}):void 0!==t&&t.exports?t.exports=he:void 0!==this&&(this.ES6Promise=he),de()}).call(this)},{}],22:[function(e,t,n){!function(){"use strict";var e={};e.parse=function(e){return"string"!=typeof e?{}:(e=e.trim().replace(/^(\?|#)/,""),e?e.trim().split("&").reduce(function(e,t){var n=t.replace(/\+/g," ").split("="),r=n[0],o=n[1];return r=decodeURIComponent(r),o=void 0===o?null:decodeURIComponent(o),e.hasOwnProperty(r)?Array.isArray(e[r])?e[r].push(o):e[r]=[e[r],o]:e[r]=o,e},{}):{})},e.stringify=function(e){return e?Object.keys(e).map(function(t){var n=e[t];return Array.isArray(n)?n.map(function(e){return encodeURIComponent(t)+"="+encodeURIComponent(e)}).join("&"):encodeURIComponent(t)+"="+encodeURIComponent(n)}).join("&"):""},"function"==typeof define&&define.amd?define(function(){return e}):void 0!==t&&t.exports?t.exports=e:self.queryString=e}()},{}],23:[function(e,t,n){"use strict";var r=e("lodash"),o=document,i=o.getElementsByTagName("head")[0],a="async"in o.scripts[0],s=[];t.exports=function(e,t){function n(){for(var e;c[0]&&"loaded"==c[0].readyState;)e=c.shift(),e.onreadystatechange=null,i.appendChild(e);c[0]||(t&&t(),r.pull(s,c))}if(r.isArray(e)||(e=[e]),!e.length)return t&&t();var u,l,c=[];for(a||s.push(c);u=e.shift();)l=o.createElement("script"),a?(t&&!e[0]&&(l.onload=function(){l.onload=null,t()}),l.async=!1,l.src=u,i.appendChild(l)):(c.push(l),l.onreadystatechange=n,l.src=u)}},{lodash:"lodash"}],24:[function(e,t,n){function r(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var r in n)o.call(n,r)&&(e[r]=n[r])}return e}t.exports=r;var o=Object.prototype.hasOwnProperty},{}],25:[function(e,t,n){"use strict";var r=e("react/addons"),o=e(189),i=r.DOM,a="hitarea",s="rag-button",u={mixins:[e(30),r.addons.PureRenderMixin],render:function(){var e=this.props,t=e.disabled&&"disabled"||e.active&&"active",n=e.type,r=n==a?[a]:[s],u=e.icon,l=e.iconPosition||"left",c=e.children;return n&&(Array.isArray(n)?n.forEach(function(e){r.push(s+"-"+e)}):n!=a&&r.push(s+"-"+n)),u&&(r.push("icon","icon-"+u),t&&r.push("icon-"+u+"-"+t),c&&r.push("icon-"+l)),r.push(e.className,t),i[e.href?"a":"span"]({className:o.apply(void 0,r),onClick:e.onClick},c)}};t.exports=r.createClass(u)},{189:189,30:30,"react/addons":"react/addons"}],26:[function(e,t,n){"use strict";var r=e("lodash"),o=function(e){return r.has(this,e)};n.giveFalse=r.constant(!1);var i=n.hasProps=function(e,t){return t.every(o,e)};n.hasRange=function(e,t,n){return i(e,r.range(t,n))},n.checkProp=function(e,t){return function(n){return n&&n[e]==t}}},{lodash:"lodash"}],27:[function(e,t,n){"use strict";var r=e("lodash"),o=e("inner"),i=e("react"),a=e(189),s=i.DOM,u={getInitialState:r.constant({center:{lat:0,lng:0},zoom:3}),getDefaultProps:r.constant({ready:r.noop,onChange:r.noop}),addListener:function(e,t){return this.api.event.addListener(this.map,e,t)},removeListener:function(e){return this.api.event.removeListener(e)},trigger:function(){var e=Array.prototype.concat.apply([this.map],arguments),t=this.api.event;return t.trigger.apply(t,e)},createMapOptions:function(e,t){e=r.clone(e);var n=this.state,i=e.center||n.center;return e.center=new t.LatLng(i.lat,i.lng),e.zoom=e.zoom||n.zoom,[[["mapTypeId"],"MapTypeId"],[["mapTypeControlOptions","style"],"MapTypeControlStyle"],[["mapTypeControlOptions","position"],"ControlPosition"],[["streetViewControlOptions","position"],"ControlPosition"],[["zoomControlOptions","style"],"ZoomControlStyle"],[["zoomControlOptions","position"],"ControlPosition"]].forEach(function(n){var r=n[0],i=o.get(e,r);i&&o.set(e,r,t[n[1]][i])}),e},updateBounds:function(){var e=this,t=e.props,n=e.map,r=n.getCenter(),o={center:{lat:r.lat(),lng:r.lng()},zoom:n.getZoom()};e.setState(o),t.onChange(o)},onZoom:function(){var e=this;e.map.getZoom()!=e.state.zoom&&e.updateBounds()},render:function(){var e=this.props;return s.div({className:a("rag-map",e.className),style:e.style})},componentDidMount:function(){var t=this,n=t.props,o=e("load-gmaps");n.gmapsApiKey&&(o.key=n.gmapsApiKey),o().then(function(e){var o=t.map=new e.Map(t.getDOMNode(),t.createMapOptions(n,e)),i={};t.api=e,t.addListener("dragend",t.updateBounds),t.addListener("resize",r.debounce(t.updateBounds,500)),t.addListener("zoom_changed",r.debounce(t.onZoom,500)),n.center&&(i.center=n.center),n.zoom&&(i.zoom=n.zoom),t.setState(i),n.ready(o,e)})},componentWillReceiveProps:function(e){var t=this,n=t.state,o=t.map;if(o){var i={},a=e.center;a&&!r.isEqual(a,n.center)&&(o.panTo(a),i.center=a);var s=e.zoom;s&&s!=n.zoom&&(o.setZoom(s),i.zoom=s),t.setState(i)}},shouldComponentUpdate:e(26).giveFalse};t.exports=i.createClass(u)},{189:189,26:26,inner:"inner","load-gmaps":"load-gmaps",lodash:"lodash",react:"react"}],28:[function(e,t,n){"use strict";var r=e("lodash").constant,o=e("react/addons"),i=e(189),a=o.createFactory,s=a(e(33)),u=a(e(25)),l=o.DOM.div,c="rag-modal",p={mixins:[o.addons.PureRenderMixin],getDefaultProps:r({backdrop:!0,closeOnBackdropClick:!0,closeButton:!0}),getInitialState:function(){return{open:this.props.open}},render:function(){var e=this,t=e.props;return e.state.open?l({className:i(c,t.backdrop&&c+"-backdrop"),onClick:t.closeOnBackdropClick&&(e.onClick||e.onTap)},s({className:i(c+"-window",t.className)},t.closeButton&&u({className:c+"-close",type:["hitarea"],icon:"x",onClick:e.close}),t.children)):null},onTap:function(e){e.target==this.getDOMNode()&&this.close()},isOpen:function(){return this.state.open},open:function(){this.setState({open:!0},this.props.didOpen)},close:function(){this.setState({open:!1},this.props.didClose)}};t.exports=o.createClass(p)},{189:189,25:25,33:33,lodash:"lodash","react/addons":"react/addons"}],29:[function(e,t,n){"use strict";t.exports=function(e){function t(){var t=e.scrollTop;0==t?e.scrollTop=1:t+e.offsetHeight==e.scrollHeight&&(e.scrollTop=t-1)}return e.addEventListener("touchstart",t),function(){e.removeEventListener("touchstart",t)}}},{}],30:[function(e,t,n){"use strict";var r,o=["tap"],i=function(){var t=this,n=t.mallet,i=t.handlers||(t.handlers={});o.forEach(function(o){var a=t.props["on"+o.charAt(0).toUpperCase()+o.slice(1)],s=i[o];a!=s&&(s&&(n.off(o,s),i[o]=void 0),a&&(n||(r||(r=e("mallet")),n=t.mallet=new r(t.getDOMNode(),{recognizers:[[r.Tap]]})),n.on(o,a),i[o]=a))})};t.exports={componentDidMount:i,componentDidUpdate:i,componentWillUnmount:function(){var e=this;e.mallet&&(e.mallet.destroy(),e.mallet=e.handlers=void 0)}}},{mallet:"mallet"}],31:[function(e,t,n){t.exports="undefined"!=typeof window?window:global},{}],32:[function(e,t,n){t.exports="ontouchend"in e(31)},{31:31}],33:[function(e,t,n){"use strict";var r=e("react/addons"),o=e(29),i={mixins:[r.addons.PureRenderMixin],getDefaultProps:function(){return{style:{overflow:"auto",WebkitOverflowScrolling:"touch"}}},render:function(){return r.DOM.div(this.props)}};e(32)&&(i.componentDidMount=function(){this.detachListeners=o(this.getDOMNode())},i.componentWillUnmount=function(){this.detachListeners()}),t.exports=r.createClass(i)},{29:29,32:32,"react/addons":"react/addons"}],34:[function(e,t,n){"use strict";var r=e("react/addons"),o={mixins:[e(30),r.addons.PureRenderMixin],render:function(){return r.DOM.div(this.props)}};t.exports=r.createClass(o)},{30:30,"react/addons":"react/addons"}],35:[function(e,t,n){"use strict";for(var r=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61","+.. ... ... ..."],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1246"],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32","+.. ... .. .. .."],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1","+. (...) ...-....",1,["204","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599","",1],["Cayman Islands","ky","1345"],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86","+.. ..-........"],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506","+... ....-...."],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599","",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45","+.. .. .. .. .."],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (República Dominicana)","do","1","",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503","+... ....-...."],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358","+... .. ... .. .."],["France","fr","33","+.. . .. .. .. .."],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49","+.. ... ......."],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590","",0],["Guam","gu","1671"],["Guatemala","gt","502","+... ....-...."],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509","+... ....-...."],["Honduras","hn","504"],["Hong Kong (香港)","hk","852","+... .... ...."],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354","+... ... ...."],["India (भारत)","in","91","+.. .....-....."],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353","+... .. ......."],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39","+.. ... ......",0],["Jamaica","jm","1876"],["Japan (日本)","jp","81","+.. ... .. ...."],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7","+. ... ...-..-..",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60","+.. ..-....-...."],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (‫المغرب‬‎)","ma","212"],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31","+.. .. ........"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64","+.. ...-...-...."],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47","+.. ... .. ..."],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92","+.. ...-......."],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63","+.. ... ...."],["Poland (Polska)","pl","48","+.. ...-...-..."],["Portugal","pt","351"],["Puerto Rico","pr","1","",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262"],["Romania (România)","ro","40"],["Russia (Россия)","ru","7","+. ... ...-..-..",0],["Rwanda","rw","250"],["Saint Barthélemy (Saint-Barthélemy)","bl","590","",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie française))","mf","590","",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65","+.. ....-...."],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34","+.. ... ... ..."],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Swaziland","sz","268"],["Sweden (Sverige)","se","46","+.. .. ... .. .."],["Switzerland (Schweiz)","ch","41","+.. .. ... .. .."],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90","+.. ... ... .. .."],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44","+.. .... ......"],["United States","us","1","+. (...) ...-....",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39","+.. .. .... ....",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"]],o={},i=(function(e,t,n){
t in o||(o[t]=[]);var r=n||0;o[t][r]=e}),a=0;a<r.length;a++){var s=r[a];if(r[a]={name:s[0],iso2:s[1],dialCode:s[2],priority:s[4]||0},s[3]&&(r[a].format=s[3]),s[5]){r[a].hasAreaCodes=!0;for(var u=0;u<s[5].length;u++){var l=s[2]+s[5][u];i(s[1],l)}}i(s[1],s[2],s[4])}t.exports={allCountries:r,allCountryCodes:o}},{}],36:[function(e,t,n){"use strict";var r=e("lodash"),o=r.defaults,i=r.omit,a=e("react"),s=e(37),u=s.keepDigits,l=s.countDigits,c=s.adjustCursor,p=s.formatPhone,d=s.backspace,h=a.DOM.input,f=navigator.userAgent,m="documentMode"in document&&document.documentMode<10,v=~f.indexOf("Mozilla/5.0")&&~f.indexOf("Android")&&~f.indexOf("AppleWebKit")&&~f.indexOf("Version"),g=function(e){var t,n,r,o,i,a=0,s=0;return"number"==typeof e.selectionStart?(a=e.selectionStart,s=e.selectionEnd):(n=document.selection.createRange(),n&&n.parentElement()==e&&(o=e.value.length,t=e.value.replace(/\r\n/g,"\n"),r=e.createTextRange(),r.moveToBookmark(n.getBookmark()),i=e.createTextRange(),i.collapse(!1),r.compareEndPoints("StartToEnd",i)>-1?a=s=o:(a=-r.moveStart("character",-o),a+=t.slice(0,a).split("\n").length-1,r.compareEndPoints("EndToEnd",i)>-1?s=o:(s=-r.moveEnd("character",-o),s+=t.slice(0,s).split("\n").length-1)))),{start:a,end:s}},y=function(e,t,n){if(e.setSelectionRange)e.setSelectionRange(t,t);else if(e.createTextRange){var r=e.createTextRange();r.collapse(!0),r.moveEnd("character",n),r.moveStart("character",t),r.select()}},_=["className","value","cursor","onChange"],b=function(e,t){var n=this;n.props=e,n.context=t,null==e.value&&(n.val=u(e.defaultValue)),n.update=function(){n.scheduled=0;var e,t,r=n.node,o=n.props,i=g(r).start,a=o.value,s=null==a?n.val:a,h=p(s),f=r.value;f!=h&&(e=f.length,f=d(h,f,i),i-=e-f.length,i=l(f,i),f=u(f),null==a?h=r.value=p(f):r.value=h,setTimeout(function(){t=c(i,h),y(r,t,t)},10),f!=s&&(null==a&&(n.val=f),o.onChange&&o.onChange({value:f,cursor:i})))},n.scheduleUpdate=function(){n.scheduled||(n.scheduled=setTimeout(n.update))}},w=o(b.prototype,a.Component.prototype,e(78));b.defaultProps={defaultValue:""},w.render=function(){var t=this,n=t.props,o=n.className,s=a.DOM,u=e(35).allCountries,l=r.map(u,function(e){return s.option({value:e.iso2,key:e.iso2},e.name+" (+"+e.dialCode+")")});if(n=i(n,_),n.type="tel",n.className="rag-tel"+(o?" "+o:""),v){var c=n.style||(n.style={});c.WebkitUserModify="read-write"}return n.useIntlPhoneInput?(n.ref="phoneInput",s.div(void 0,s.select({ref:"dialCode",className:"dial-code",defaultValue:"us"},l),h(n))):h(n)},w.componentDidMount=function(){var e=this,t=e.props.value,n=e.node=a.findDOMNode(e),r=e.scheduleUpdate;n.value=p(null!=t?t:e.val),e.props.useIntlPhoneInput?n.addEventListener("input",function(){var t=e.refs.dialCode.getDOMNode().value,n=e.refs.phoneInput.getDOMNode().value;e.refs.phoneInput.value=n,e.refs.dialCode.value=t}):m||v?(n.addEventListener("keydown",r),n.addEventListener("keypress",r),n.addEventListener("paste",r)):n.addEventListener("input",e.update)},w.componentDidUpdate=function(){var e=this,t=e.props,n=t.value;if(null!=n){var r=e.node,o=t.cursor;r.value=p(n),null!=o&&y(r,o,o)}},w.componentWillUnmount=function(){this.scheduled&&clearTimeout(this.scheduled)},w.value=function(){if(this.props.useIntlPhoneInput){var t=this.refs.dialCode.getDOMNode().value,n=this.refs.phoneInput.getDOMNode().value,o=e(35).allCountries,i=r.find(o,function(e){return e.iso2===t});return"+"+i.dialCode+n}var a=this.props.value;return null==a?this.val:a},t.exports=b},{35:35,37:37,78:78,lodash:"lodash",react:"react"}],37:[function(e,t,n){"use strict";var r=n.isDigit=function(e){return e>="0"&&e<="9"};n.keepDigits=function(e){var t,n="",o=0,i=10;for("+"==e[0]&&(n="+",o=1,i=16);o<e.length&&(t=e[o],!r(t)||(n+=t,i!=n.length));)o++;return n},n.countDigits=function(e,t){if(0===t)return 0;var n=0,o=0;for("+"==e[0]&&(n=o=1);o<e.length&&!t||o<t;)r(e[o])&&n++,o++;return n},n.adjustCursor=function(e,t){var n,o=0;for("+"==t[0]&&(o=1);o<=e;)n=t[o],n&&!r(n)&&e++,o++;return e},n.formatPhone=function(e){var t,n=e.length;return n<1||n>11||"+"==e[0]?e:11==n?1==e[0]?"+1 ("+e.substr(1,3)+") "+e.substr(4,3)+"-"+e.substr(7):e:(t="("+e.substr(0,3),n>2&&(t+=") "+e.substr(3,3),n>5&&(t+="-"+e.substr(6))),t)},n.backspace=function(e,t,n){if(t.length<e.length&&t[n]!=e[n]&&!r(e[n]))for(var o=n-1;o>0;){if(r(t[o]))return t.slice(0,o)+t.slice(n);o--}return t}},{}],38:[function(e,t,n){"use strict";var r=e(168),o={componentDidMount:function(){this.props.autoFocus&&r(this.getDOMNode())}};t.exports=o},{168:168}],39:[function(e,t,n){"use strict";function r(){var e=window.opera;return"object"==typeof e&&"function"==typeof e.version&&parseInt(e.version(),10)<=12}function o(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function i(e){switch(e){case k.topCompositionStart:return N.compositionStart;case k.topCompositionEnd:return N.compositionEnd;case k.topCompositionUpdate:return N.compositionUpdate}}function a(e,t){return e===k.topKeyDown&&t.keyCode===w}function s(e,t){switch(e){case k.topKeyUp:return b.indexOf(t.keyCode)!==-1;case k.topKeyDown:return t.keyCode!==w;case k.topKeyPress:case k.topMouseDown:case k.topBlur:return!0;default:return!1}}function u(e){var t=e.detail;return"object"==typeof t&&"data"in t?t.data:null}function l(e,t,n,r){var o,l;if(C?o=i(e):O?s(e,r)&&(o=N.compositionEnd):a(e,r)&&(o=N.compositionStart),!o)return null;D&&(O||o!==N.compositionStart?o===N.compositionEnd&&O&&(l=O.getData()):O=v.getPooled(t));var c=g.getPooled(o,n,r);if(l)c.data=l;else{var p=u(r);null!==p&&(c.data=p)}return f.accumulateTwoPhaseDispatches(c),c}function c(e,t){switch(e){case k.topCompositionEnd:return u(t);case k.topKeyPress:var n=t.which;return n!==M?null:(T=!0,S);case k.topTextInput:var r=t.data;return r===S&&T?null:r;default:return null}}function p(e,t){if(O){if(e===k.topCompositionEnd||s(e,t)){var n=O.getData();return v.release(O),O=null,n}return null}switch(e){case k.topPaste:return null;case k.topKeyPress:return t.which&&!o(t)?String.fromCharCode(t.which):null;case k.topCompositionEnd:return D?null:t.data;default:return null}}function d(e,t,n,r){var o;if(o=x?c(e,r):p(e,r),!o)return null;var i=y.getPooled(N.beforeInput,n,r);return i.data=o,f.accumulateTwoPhaseDispatches(i),i}var h=e(52),f=e(57),m=e(58),v=e(59),g=e(140),y=e(144),_=e(191),b=[9,13,27,32],w=229,C=m.canUseDOM&&"CompositionEvent"in window,E=null;m.canUseDOM&&"documentMode"in document&&(E=document.documentMode);var x=m.canUseDOM&&"TextEvent"in window&&!E&&!r(),D=m.canUseDOM&&(!C||E&&E>8&&E<=11),M=32,S=String.fromCharCode(M),k=h.topLevelTypes,N={beforeInput:{phasedRegistrationNames:{bubbled:_({onBeforeInput:null}),captured:_({onBeforeInputCapture:null})},dependencies:[k.topCompositionEnd,k.topKeyPress,k.topTextInput,k.topPaste]},compositionEnd:{phasedRegistrationNames:{bubbled:_({onCompositionEnd:null}),captured:_({onCompositionEndCapture:null})},dependencies:[k.topBlur,k.topCompositionEnd,k.topKeyDown,k.topKeyPress,k.topKeyUp,k.topMouseDown]},compositionStart:{phasedRegistrationNames:{bubbled:_({onCompositionStart:null}),captured:_({onCompositionStartCapture:null})},dependencies:[k.topBlur,k.topCompositionStart,k.topKeyDown,k.topKeyPress,k.topKeyUp,k.topMouseDown]},compositionUpdate:{phasedRegistrationNames:{bubbled:_({onCompositionUpdate:null}),captured:_({onCompositionUpdateCapture:null})},dependencies:[k.topBlur,k.topCompositionUpdate,k.topKeyDown,k.topKeyPress,k.topKeyUp,k.topMouseDown]}},T=!1,O=null,P={eventTypes:N,extractEvents:function(e,t,n,r){return[l(e,t,n,r),d(e,t,n,r)]}};t.exports=P},{140:140,144:144,191:191,52:52,57:57,58:58,59:59}],40:[function(e,t,n){var r=e(184),o={addClass:function(e,t){return r(!/\s/.test(t)),t&&(e.classList?e.classList.add(t):o.hasClass(e,t)||(e.className=e.className+" "+t)),e},removeClass:function(e,t){return r(!/\s/.test(t)),t&&(e.classList?e.classList.remove(t):o.hasClass(e,t)&&(e.className=e.className.replace(RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,""))),e},conditionClass:function(e,t,n){return(n?o.addClass:o.removeClass)(e,t)},hasClass:function(e,t){return r(!/\s/.test(t)),e.classList?!!t&&e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}};t.exports=o},{184:184}],41:[function(e,t,n){"use strict";function r(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var o={boxFlex:!0,boxFlexGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,strokeDashoffset:!0,strokeOpacity:!0,strokeWidth:!0},i=["Webkit","ms","Moz","O"];Object.keys(o).forEach(function(e){i.forEach(function(t){o[r(t,e)]=o[e]})});var a={background:{backgroundImage:!0,backgroundPosition:!0,backgroundRepeat:!0,backgroundColor:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0}},s={isUnitlessNumber:o,shorthandPropertyExpansions:a};t.exports=s},{}],42:[function(e,t,n){"use strict";var r=e(41),o=e(58),i=(e(155),e(162)),a=e(182),s=e(193),u=(e(203),s(function(e){return a(e)})),l="cssFloat";o.canUseDOM&&void 0===document.documentElement.style.cssFloat&&(l="styleFloat");var c={createMarkupForStyles:function(e){var t="";for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];null!=r&&(t+=u(n)+":",t+=i(n,r)+";")}return t||null},setValueForStyles:function(e,t){var n=e.style;for(var o in t)if(t.hasOwnProperty(o)){var a=i(o,t[o]);if("float"===o&&(o=l),a)n[o]=a;else{var s=r.shorthandPropertyExpansions[o];if(s)for(var u in s)n[u]="";else n[o]=""}}}};t.exports=c},{155:155,162:162,182:182,193:193,203:203,41:41,58:58}],43:[function(e,t,n){"use strict";function r(){this._callbacks=null,this._contexts=null}var o=e(66),i=e(65),a=e(184);i(r.prototype,{enqueue:function(e,t){this._callbacks=this._callbacks||[],this._contexts=this._contexts||[],this._callbacks.push(e),this._contexts.push(t)},notifyAll:function(){var e=this._callbacks,t=this._contexts;if(e){a(e.length===t.length),this._callbacks=null,this._contexts=null;for(var n=0,r=e.length;n<r;n++)e[n].call(t[n]);e.length=0,t.length=0}},reset:function(){this._callbacks=null,this._contexts=null},destructor:function(){this.reset()}}),o.addPoolingTo(r),t.exports=r},{184:184,65:65,66:66}],44:[function(e,t,n){"use strict";function r(e){return"SELECT"===e.nodeName||"INPUT"===e.nodeName&&"file"===e.type}function o(e){var t=E.getPooled(k.change,T,e);b.accumulateTwoPhaseDispatches(t),C.batchedUpdates(i,t)}function i(e){_.enqueueEvents(e),_.processEventQueue()}function a(e,t){N=e,T=t,N.attachEvent("onchange",o)}function s(){N&&(N.detachEvent("onchange",o),N=null,T=null)}function u(e,t,n){if(e===S.topChange)return n}function l(e,t,n){e===S.topFocus?(s(),a(t,n)):e===S.topBlur&&s()}function c(e,t){N=e,T=t,O=e.value,P=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(N,"value",A),N.attachEvent("onpropertychange",d)}function p(){N&&(delete N.value,N.detachEvent("onpropertychange",d),N=null,T=null,O=null,P=null)}function d(e){if("value"===e.propertyName){var t=e.srcElement.value;t!==O&&(O=t,o(e))}}function h(e,t,n){if(e===S.topInput)return n}function f(e,t,n){e===S.topFocus?(p(),c(t,n)):e===S.topBlur&&p()}function m(e,t,n){if((e===S.topSelectionChange||e===S.topKeyUp||e===S.topKeyDown)&&N&&N.value!==O)return O=N.value,T}function v(e){return"INPUT"===e.nodeName&&("checkbox"===e.type||"radio"===e.type)}function g(e,t,n){if(e===S.topClick)return n}var y=e(52),_=e(54),b=e(57),w=e(58),C=e(133),E=e(142),x=e(185),D=e(187),M=e(191),S=y.topLevelTypes,k={change:{phasedRegistrationNames:{bubbled:M({onChange:null}),captured:M({onChangeCapture:null})},dependencies:[S.topBlur,S.topChange,S.topClick,S.topFocus,S.topInput,S.topKeyDown,S.topKeyUp,S.topSelectionChange]}},N=null,T=null,O=null,P=null,I=!1;w.canUseDOM&&(I=x("change")&&(!("documentMode"in document)||document.documentMode>8));var R=!1;w.canUseDOM&&(R=x("input")&&(!("documentMode"in document)||document.documentMode>9));var A={get:function(){return P.get.call(this)},set:function(e){O=""+e,P.set.call(this,e)}},L={eventTypes:k,extractEvents:function(e,t,n,o){var i,a;if(r(t)?I?i=u:a=l:D(t)?R?i=h:(i=m,a=f):v(t)&&(i=g),i){var s=i(e,t,n);if(s){var c=E.getPooled(k.change,s,o);return b.accumulateTwoPhaseDispatches(c),c}}a&&a(e,t,n)}};t.exports=L},{133:133,142:142,185:185,187:187,191:191,52:52,54:54,57:57,58:58}],45:[function(e,t,n){"use strict";var r=0,o={createReactRootIndex:function(){return r++}};t.exports=o},{}],46:[function(e,t,n){"use strict";function r(e,t,n){e.insertBefore(t,e.childNodes[n]||null)}var o=e(49),i=e(113),a=e(197),s=e(184),u={dangerouslyReplaceNodeWithMarkup:o.dangerouslyReplaceNodeWithMarkup,updateTextContent:a,processUpdates:function(e,t){for(var n,u=null,l=null,c=0;c<e.length;c++)if(n=e[c],n.type===i.MOVE_EXISTING||n.type===i.REMOVE_NODE){var p=n.fromIndex,d=n.parentNode.childNodes[p],h=n.parentID;s(d),u=u||{},u[h]=u[h]||[],u[h][p]=d,l=l||[],l.push(d)}var f=o.dangerouslyRenderMarkup(t);if(l)for(var m=0;m<l.length;m++)l[m].parentNode.removeChild(l[m]);for(var v=0;v<e.length;v++)switch(n=e[v],n.type){case i.INSERT_MARKUP:r(n.parentNode,f[n.markupIndex],n.toIndex);break;case i.MOVE_EXISTING:r(n.parentNode,u[n.parentID][n.fromIndex],n.toIndex);break;case i.TEXT_CONTENT:a(n.parentNode,n.textContent);break;case i.REMOVE_NODE:}}};t.exports=u},{113:113,184:184,197:197,49:49}],47:[function(e,t,n){"use strict";function r(e,t){return(e&t)===t}var o=e(184),i={MUST_USE_ATTRIBUTE:1,MUST_USE_PROPERTY:2,HAS_SIDE_EFFECTS:4,HAS_BOOLEAN_VALUE:8,HAS_NUMERIC_VALUE:16,HAS_POSITIVE_NUMERIC_VALUE:48,HAS_OVERLOADED_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(e){var t=e.Properties||{},n=e.DOMAttributeNames||{},a=e.DOMPropertyNames||{},u=e.DOMMutationMethods||{};e.isCustomAttribute&&s._isCustomAttributeFunctions.push(e.isCustomAttribute);for(var l in t){o(!s.isStandardName.hasOwnProperty(l)),s.isStandardName[l]=!0;var c=l.toLowerCase();if(s.getPossibleStandardName[c]=l,n.hasOwnProperty(l)){var p=n[l];s.getPossibleStandardName[p]=l,s.getAttributeName[l]=p}else s.getAttributeName[l]=c;s.getPropertyName[l]=a.hasOwnProperty(l)?a[l]:l,u.hasOwnProperty(l)?s.getMutationMethod[l]=u[l]:s.getMutationMethod[l]=null;var d=t[l];s.mustUseAttribute[l]=r(d,i.MUST_USE_ATTRIBUTE),s.mustUseProperty[l]=r(d,i.MUST_USE_PROPERTY),s.hasSideEffects[l]=r(d,i.HAS_SIDE_EFFECTS),s.hasBooleanValue[l]=r(d,i.HAS_BOOLEAN_VALUE),s.hasNumericValue[l]=r(d,i.HAS_NUMERIC_VALUE),s.hasPositiveNumericValue[l]=r(d,i.HAS_POSITIVE_NUMERIC_VALUE),s.hasOverloadedBooleanValue[l]=r(d,i.HAS_OVERLOADED_BOOLEAN_VALUE),o(!s.mustUseAttribute[l]||!s.mustUseProperty[l]),o(s.mustUseProperty[l]||!s.hasSideEffects[l]),o(!!s.hasBooleanValue[l]+!!s.hasNumericValue[l]+!!s.hasOverloadedBooleanValue[l]<=1)}}},a={},s={ID_ATTRIBUTE_NAME:"data-reactid",isStandardName:{},getPossibleStandardName:{},getAttributeName:{},getPropertyName:{},getMutationMethod:{},mustUseAttribute:{},mustUseProperty:{},hasSideEffects:{},hasBooleanValue:{},hasNumericValue:{},hasPositiveNumericValue:{},hasOverloadedBooleanValue:{},_isCustomAttributeFunctions:[],isCustomAttribute:function(e){for(var t=0;t<s._isCustomAttributeFunctions.length;t++){var n=s._isCustomAttributeFunctions[t];if(n(e))return!0}return!1},getDefaultValueForProperty:function(e,t){var n,r=a[e];return r||(a[e]=r={}),t in r||(n=document.createElement(e),r[t]=n[t]),r[t]},injection:i};t.exports=s},{184:184}],48:[function(e,t,n){"use strict";function r(e,t){return null==t||o.hasBooleanValue[e]&&!t||o.hasNumericValue[e]&&isNaN(t)||o.hasPositiveNumericValue[e]&&t<1||o.hasOverloadedBooleanValue[e]&&t===!1}var o=e(47),i=e(195),a=(e(203),{createMarkupForID:function(e){return o.ID_ATTRIBUTE_NAME+"="+i(e)},createMarkupForProperty:function(e,t){if(o.isStandardName.hasOwnProperty(e)&&o.isStandardName[e]){if(r(e,t))return"";var n=o.getAttributeName[e];return o.hasBooleanValue[e]||o.hasOverloadedBooleanValue[e]&&t===!0?n:n+"="+i(t)}return o.isCustomAttribute(e)?null==t?"":e+"="+i(t):null},setValueForProperty:function(e,t,n){if(o.isStandardName.hasOwnProperty(t)&&o.isStandardName[t]){var i=o.getMutationMethod[t];if(i)i(e,n);else if(r(t,n))this.deleteValueForProperty(e,t);else if(o.mustUseAttribute[t])e.setAttribute(o.getAttributeName[t],""+n);else{var a=o.getPropertyName[t];o.hasSideEffects[t]&&""+e[a]==""+n||(e[a]=n)}}else o.isCustomAttribute(t)&&(null==n?e.removeAttribute(t):e.setAttribute(t,""+n))},deleteValueForProperty:function(e,t){if(o.isStandardName.hasOwnProperty(t)&&o.isStandardName[t]){var n=o.getMutationMethod[t];if(n)n(e,void 0);else if(o.mustUseAttribute[t])e.removeAttribute(o.getAttributeName[t]);else{var r=o.getPropertyName[t],i=o.getDefaultValueForProperty(e.nodeName,r);o.hasSideEffects[t]&&""+e[r]===i||(e[r]=i)}}else o.isCustomAttribute(t)&&e.removeAttribute(t)}});t.exports=a},{195:195,203:203,47:47}],49:[function(e,t,n){"use strict";function r(e){return e.substring(1,e.indexOf(" "))}var o=e(58),i=e(160),a=e(163),s=e(176),u=e(184),l=/^(<[^ \/>]+)/,c="data-danger-index",p={dangerouslyRenderMarkup:function(e){u(o.canUseDOM);for(var t,n={},p=0;p<e.length;p++)u(e[p]),t=r(e[p]),t=s(t)?t:"*",n[t]=n[t]||[],n[t][p]=e[p];var d=[],h=0;for(t in n)if(n.hasOwnProperty(t)){var f,m=n[t];for(f in m)if(m.hasOwnProperty(f)){var v=m[f];m[f]=v.replace(l,"$1 "+c+'="'+f+'" ')}for(var g=i(m.join(""),a),y=0;y<g.length;++y){var _=g[y];_.hasAttribute&&_.hasAttribute(c)&&(f=+_.getAttribute(c),_.removeAttribute(c),u(!d.hasOwnProperty(f)),d[f]=_,h+=1)}}return u(h===d.length),u(d.length===e.length),d},dangerouslyReplaceNodeWithMarkup:function(e,t){u(o.canUseDOM),u(t),u("html"!==e.tagName.toLowerCase());var n=i(t,a)[0];e.parentNode.replaceChild(n,e)}};t.exports=p},{160:160,163:163,176:176,184:184,58:58}],50:[function(e,t,n){"use strict";var r=e(191),o=[r({ResponderEventPlugin:null}),r({SimpleEventPlugin:null}),r({TapEventPlugin:null}),r({EnterLeaveEventPlugin:null}),r({ChangeEventPlugin:null}),r({SelectEventPlugin:null}),r({BeforeInputEventPlugin:null}),r({AnalyticsEventPlugin:null}),r({MobileSafariClickEventPlugin:null})];t.exports=o},{191:191}],51:[function(e,t,n){"use strict";var r=e(52),o=e(57),i=e(146),a=e(111),s=e(191),u=r.topLevelTypes,l=a.getFirstReactDOM,c={mouseEnter:{registrationName:s({onMouseEnter:null}),dependencies:[u.topMouseOut,u.topMouseOver]},mouseLeave:{registrationName:s({onMouseLeave:null}),dependencies:[u.topMouseOut,u.topMouseOver]}},p=[null,null],d={eventTypes:c,extractEvents:function(e,t,n,r){if(e===u.topMouseOver&&(r.relatedTarget||r.fromElement))return null;if(e!==u.topMouseOut&&e!==u.topMouseOver)return null;var s;if(t.window===t)s=t;else{var d=t.ownerDocument;s=d?d.defaultView||d.parentWindow:window}var h,f;if(e===u.topMouseOut?(h=t,f=l(r.relatedTarget||r.toElement)||s):(h=s,f=t),h===f)return null;var m=h?a.getID(h):"",v=f?a.getID(f):"",g=i.getPooled(c.mouseLeave,m,r);g.type="mouseleave",g.target=h,g.relatedTarget=f;var y=i.getPooled(c.mouseEnter,v,r);return y.type="mouseenter",y.target=f,y.relatedTarget=h,o.accumulateEnterLeaveDispatches(g,y,m,v),p[0]=g,p[1]=y,p}};t.exports=d},{111:111,146:146,191:191,52:52,57:57}],52:[function(e,t,n){"use strict";var r=e(190),o=r({bubbled:null,captured:null}),i=r({topBlur:null,topChange:null,topClick:null,topCompositionEnd:null,topCompositionStart:null,topCompositionUpdate:null,topContextMenu:null,topCopy:null,topCut:null,topDoubleClick:null,topDrag:null,topDragEnd:null,topDragEnter:null,topDragExit:null,topDragLeave:null,topDragOver:null,topDragStart:null,topDrop:null,topError:null,topFocus:null,topInput:null,topKeyDown:null,topKeyPress:null,topKeyUp:null,topLoad:null,topMouseDown:null,topMouseMove:null,topMouseOut:null,topMouseOver:null,topMouseUp:null,topPaste:null,topReset:null,topScroll:null,topSelectionChange:null,topSubmit:null,topTextInput:null,topTouchCancel:null,topTouchEnd:null,topTouchMove:null,topTouchStart:null,topWheel:null}),a={topLevelTypes:i,PropagationPhases:o};t.exports=a},{190:190}],53:[function(e,t,n){var r=e(163),o={listen:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),{remove:function(){e.removeEventListener(t,n,!1)}}):e.attachEvent?(e.attachEvent("on"+t,n),{remove:function(){e.detachEvent("on"+t,n)}}):void 0},capture:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!0),{remove:function(){e.removeEventListener(t,n,!0)}}):{remove:r}},registerDefault:function(){}};t.exports=o},{163:163}],54:[function(e,t,n){"use strict";var r=e(55),o=e(56),i=e(152),a=e(169),s=e(184),u={},l=null,c=function(e){if(e){var t=o.executeDispatch,n=r.getPluginModuleForEvent(e);n&&n.executeDispatch&&(t=n.executeDispatch),o.executeDispatchesInOrder(e,t),e.isPersistent()||e.constructor.release(e)}},p=null,d={injection:{injectMount:o.injection.injectMount,injectInstanceHandle:function(e){p=e},getInstanceHandle:function(){return p},injectEventPluginOrder:r.injectEventPluginOrder,injectEventPluginsByName:r.injectEventPluginsByName},eventNameDispatchConfigs:r.eventNameDispatchConfigs,registrationNameModules:r.registrationNameModules,putListener:function(e,t,n){s(!n||"function"==typeof n);var r=u[t]||(u[t]={});r[e]=n},getListener:function(e,t){var n=u[t];return n&&n[e]},deleteListener:function(e,t){var n=u[t];n&&delete n[e]},deleteAllListeners:function(e){for(var t in u)delete u[t][e]},extractEvents:function(e,t,n,o){for(var a,s=r.plugins,u=0,l=s.length;u<l;u++){var c=s[u];if(c){var p=c.extractEvents(e,t,n,o);p&&(a=i(a,p))}}return a},enqueueEvents:function(e){e&&(l=i(l,e))},processEventQueue:function(){var e=l;l=null,a(e,c),s(!l)},__purge:function(){u={}},__getListenerBank:function(){return u}};t.exports=d},{152:152,169:169,184:184,55:55,56:56}],55:[function(e,t,n){"use strict";function r(){if(s)for(var e in u){var t=u[e],n=s.indexOf(e);if(a(n>-1),!l.plugins[n]){a(t.extractEvents),l.plugins[n]=t;var r=t.eventTypes;for(var i in r)a(o(r[i],t,i))}}}function o(e,t,n){a(!l.eventNameDispatchConfigs.hasOwnProperty(n)),l.eventNameDispatchConfigs[n]=e;var r=e.phasedRegistrationNames;if(r){for(var o in r)if(r.hasOwnProperty(o)){var s=r[o];i(s,t,n)}return!0}return!!e.registrationName&&(i(e.registrationName,t,n),!0)}function i(e,t,n){a(!l.registrationNameModules[e]),l.registrationNameModules[e]=t,l.registrationNameDependencies[e]=t.eventTypes[n].dependencies}var a=e(184),s=null,u={},l={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},injectEventPluginOrder:function(e){a(!s),s=Array.prototype.slice.call(e),r()},injectEventPluginsByName:function(e){var t=!1;for(var n in e)if(e.hasOwnProperty(n)){var o=e[n];u.hasOwnProperty(n)&&u[n]===o||(a(!u[n]),u[n]=o,t=!0)}t&&r()},getPluginModuleForEvent:function(e){var t=e.dispatchConfig;if(t.registrationName)return l.registrationNameModules[t.registrationName]||null;for(var n in t.phasedRegistrationNames)if(t.phasedRegistrationNames.hasOwnProperty(n)){var r=l.registrationNameModules[t.phasedRegistrationNames[n]];if(r)return r}return null},_resetEventPlugins:function(){s=null;for(var e in u)u.hasOwnProperty(e)&&delete u[e];l.plugins.length=0;var t=l.eventNameDispatchConfigs;for(var n in t)t.hasOwnProperty(n)&&delete t[n];var r=l.registrationNameModules;for(var o in r)r.hasOwnProperty(o)&&delete r[o]}};t.exports=l},{184:184}],56:[function(e,t,n){"use strict";function r(e){return e===v.topMouseUp||e===v.topTouchEnd||e===v.topTouchCancel}function o(e){return e===v.topMouseMove||e===v.topTouchMove}function i(e){return e===v.topMouseDown||e===v.topTouchStart}function a(e,t){var n=e._dispatchListeners,r=e._dispatchIDs;if(Array.isArray(n))for(var o=0;o<n.length&&!e.isPropagationStopped();o++)t(e,n[o],r[o]);else n&&t(e,n,r)}function s(e,t,n){e.currentTarget=m.Mount.getNode(n);var r=t(e,n);return e.currentTarget=null,r}function u(e,t){a(e,t),e._dispatchListeners=null,e._dispatchIDs=null}function l(e){var t=e._dispatchListeners,n=e._dispatchIDs;if(Array.isArray(t)){for(var r=0;r<t.length&&!e.isPropagationStopped();r++)if(t[r](e,n[r]))return n[r]}else if(t&&t(e,n))return n;return null}function c(e){var t=l(e);return e._dispatchIDs=null,e._dispatchListeners=null,t}function p(e){var t=e._dispatchListeners,n=e._dispatchIDs;f(!Array.isArray(t));var r=t?t(e,n):null;return e._dispatchListeners=null,e._dispatchIDs=null,r}function d(e){return!!e._dispatchListeners}var h=e(52),f=e(184),m={Mount:null,injectMount:function(e){m.Mount=e}},v=h.topLevelTypes,g={isEndish:r,isMoveish:o,isStartish:i,executeDirectDispatch:p,executeDispatch:s,executeDispatchesInOrder:u,executeDispatchesInOrderStopAtTrue:c,hasDispatches:d,injection:m,useTouchEvents:!1};t.exports=g},{184:184,52:52}],57:[function(e,t,n){"use strict";function r(e,t,n){var r=t.dispatchConfig.phasedRegistrationNames[n];return v(e,r)}function o(e,t,n){var o=t?m.bubbled:m.captured,i=r(e,n,o);i&&(n._dispatchListeners=h(n._dispatchListeners,i),n._dispatchIDs=h(n._dispatchIDs,e))}function i(e){e&&e.dispatchConfig.phasedRegistrationNames&&d.injection.getInstanceHandle().traverseTwoPhase(e.dispatchMarker,o,e)}function a(e,t,n){if(n&&n.dispatchConfig.registrationName){var r=n.dispatchConfig.registrationName,o=v(e,r);o&&(n._dispatchListeners=h(n._dispatchListeners,o),n._dispatchIDs=h(n._dispatchIDs,e))}}function s(e){e&&e.dispatchConfig.registrationName&&a(e.dispatchMarker,null,e)}function u(e){f(e,i)}function l(e,t,n,r){d.injection.getInstanceHandle().traverseEnterLeave(n,r,a,e,t)}function c(e){f(e,s)}var p=e(52),d=e(54),h=e(152),f=e(169),m=p.PropagationPhases,v=d.getListener,g={accumulateTwoPhaseDispatches:u,accumulateDirectDispatches:c,accumulateEnterLeaveDispatches:l};t.exports=g},{152:152,169:169,52:52,54:54}],58:[function(e,t,n){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen,isInWorker:!r};t.exports=o},{}],59:[function(e,t,n){"use strict";function r(e){this._root=e,this._startText=this.getText(),this._fallbackText=null}var o=e(66),i=e(65),a=e(179);i(r.prototype,{getText:function(){return"value"in this._root?this._root.value:this._root[a()]},getData:function(){if(this._fallbackText)return this._fallbackText;var e,t,n=this._startText,r=n.length,o=this.getText(),i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);var s=t>1?1-t:void 0;return this._fallbackText=o.slice(e,s),this._fallbackText}}),o.addPoolingTo(r),t.exports=r},{179:179,65:65,66:66}],60:[function(e,t,n){"use strict";var r,o=e(47),i=e(58),a=o.injection.MUST_USE_ATTRIBUTE,s=o.injection.MUST_USE_PROPERTY,u=o.injection.HAS_BOOLEAN_VALUE,l=o.injection.HAS_SIDE_EFFECTS,c=o.injection.HAS_NUMERIC_VALUE,p=o.injection.HAS_POSITIVE_NUMERIC_VALUE,d=o.injection.HAS_OVERLOADED_BOOLEAN_VALUE;if(i.canUseDOM){var h=document.implementation;r=h&&h.hasFeature&&h.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")}var f={isCustomAttribute:RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),Properties:{accept:null,acceptCharset:null,accessKey:null,action:null,allowFullScreen:a|u,allowTransparency:a,alt:null,async:u,autoComplete:null,autoPlay:u,cellPadding:null,cellSpacing:null,charSet:a,checked:s|u,classID:a,className:r?a:s,cols:a|p,colSpan:null,content:null,contentEditable:null,contextMenu:a,controls:s|u,coords:null,crossOrigin:null,data:null,dateTime:a,defer:u,dir:null,disabled:a|u,download:d,draggable:null,encType:null,form:a,formAction:a,formEncType:a,formMethod:a,formNoValidate:u,formTarget:a,frameBorder:a,headers:null,height:a,hidden:a|u,high:null,href:null,hrefLang:null,htmlFor:null,httpEquiv:null,icon:null,id:s,label:null,lang:null,list:a,loop:s|u,low:null,manifest:a,marginHeight:null,marginWidth:null,max:null,maxLength:a,media:a,mediaGroup:null,method:null,min:null,multiple:s|u,muted:s|u,name:null,noValidate:u,open:u,optimum:null,pattern:null,placeholder:null,poster:null,preload:null,radioGroup:null,readOnly:s|u,rel:null,required:u,role:a,rows:a|p,rowSpan:null,sandbox:null,scope:null,scoped:u,scrolling:null,seamless:a|u,selected:s|u,shape:null,size:a|p,sizes:a,span:p,spellCheck:null,src:null,srcDoc:s,srcSet:a,start:c,step:null,style:null,tabIndex:null,target:null,title:null,type:null,useMap:null,value:s|l,width:a,wmode:a,autoCapitalize:null,autoCorrect:null,itemProp:a,itemScope:a|u,itemType:a,itemID:a,itemRef:a,property:null,unselectable:a},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMPropertyNames:{autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoCorrect:"autocorrect",autoFocus:"autofocus",autoPlay:"autoplay",encType:"encoding",hrefLang:"hreflang",radioGroup:"radiogroup",spellCheck:"spellcheck",srcDoc:"srcdoc",srcSet:"srcset"}};t.exports=f},{47:47,58:58}],61:[function(e,t,n){"use strict";var r=e(109),o=e(128),i={linkState:function(e){return new r(this.state[e],o.createStateKeySetter(this,e))}};t.exports=i},{109:109,128:128}],62:[function(e,t,n){"use strict";function r(e){l(null==e.props.checkedLink||null==e.props.valueLink)}function o(e){r(e),l(null==e.props.value&&null==e.props.onChange)}function i(e){r(e),l(null==e.props.checked&&null==e.props.onChange)}function a(e){this.props.valueLink.requestChange(e.target.value)}function s(e){this.props.checkedLink.requestChange(e.target.checked)}var u=e(120),l=e(184),c={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0},p={Mixin:{propTypes:{value:function(e,t,n){return!e[t]||c[e.type]||e.onChange||e.readOnly||e.disabled?null:Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.")},checked:function(e,t,n){return!e[t]||e.onChange||e.readOnly||e.disabled?null:Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")},onChange:u.func}},getValue:function(e){return e.props.valueLink?(o(e),e.props.valueLink.value):e.props.value},getChecked:function(e){return e.props.checkedLink?(i(e),e.props.checkedLink.value):e.props.checked},getOnChange:function(e){return e.props.valueLink?(o(e),a):e.props.checkedLink?(i(e),s):e.props.onChange}};t.exports=p},{120:120,184:184}],63:[function(e,t,n){"use strict";function r(e){e.remove()}var o=e(69),i=e(152),a=e(169),s=e(184),u={trapBubbledEvent:function(e,t){s(this.isMounted());var n=this.getDOMNode();s(n);var r=o.trapBubbledEvent(e,t,n);this._localEventListeners=i(this._localEventListeners,r)},componentWillUnmount:function(){this._localEventListeners&&a(this._localEventListeners,r)}};t.exports=u},{152:152,169:169,184:184,69:69}],64:[function(e,t,n){"use strict";var r=e(52),o=e(163),i=r.topLevelTypes,a={eventTypes:null,extractEvents:function(e,t,n,r){if(e===i.topTouchStart){var a=r.target;a&&!a.onclick&&(a.onclick=o)}}};t.exports=a},{163:163,52:52}],65:[function(e,t,n){"use strict";function r(e,t){if(null==e)throw new TypeError("Object.assign target cannot be null or undefined");for(var n=Object(e),r=Object.prototype.hasOwnProperty,o=1;o<arguments.length;o++){var i=arguments[o];if(null!=i){var a=Object(i);for(var s in a)r.call(a,s)&&(n[s]=a[s])}}return n}t.exports=r},{}],66:[function(e,t,n){"use strict";var r=e(184),o=function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)},i=function(e,t){var n=this;if(n.instancePool.length){var r=n.instancePool.pop();return n.call(r,e,t),r}return new n(e,t)},a=function(e,t,n){var r=this;if(r.instancePool.length){
var o=r.instancePool.pop();return r.call(o,e,t,n),o}return new r(e,t,n)},s=function(e,t,n,r,o){var i=this;if(i.instancePool.length){var a=i.instancePool.pop();return i.call(a,e,t,n,r,o),a}return new i(e,t,n,r,o)},u=function(e){var t=this;r(e instanceof t),e.destructor&&e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},l=10,c=o,p=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||c,n.poolSize||(n.poolSize=l),n.release=u,n},d={addPoolingTo:p,oneArgumentPooler:o,twoArgumentPooler:i,threeArgumentPooler:a,fiveArgumentPooler:s};t.exports=d},{184:184}],67:[function(e,t,n){"use strict";var r=e(56),o=e(73),i=e(75),a=e(74),s=e(80),u=e(81),l=e(97),c=(e(98),e(82)),p=e(93),d=e(96),h=e(106),f=e(111),m=e(116),v=e(120),g=e(123),y=e(126),_=e(65),b=e(166),w=e(194);d.inject();var C=l.createElement,E=l.createFactory,x=l.cloneElement,D=m.measure("React","render",f.render),M={Children:{map:o.map,forEach:o.forEach,count:o.count,only:w},Component:i,DOM:c,PropTypes:v,initializeTouchEvents:function(e){r.useTouchEvents=e},createClass:a.createClass,createElement:C,cloneElement:x,createFactory:E,createMixin:function(e){return e},constructAndRenderComponent:f.constructAndRenderComponent,constructAndRenderComponentByID:f.constructAndRenderComponentByID,findDOMNode:b,render:D,renderToString:y.renderToString,renderToStaticMarkup:y.renderToStaticMarkup,unmountComponentAtNode:f.unmountComponentAtNode,isValidElement:l.isValidElement,withContext:s.withContext,__spread:_};"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({CurrentOwner:u,InstanceHandles:h,Mount:f,Reconciler:g,TextComponent:p});M.version="0.13.3",t.exports=M},{106:106,111:111,116:116,120:120,123:123,126:126,166:166,194:194,56:56,65:65,73:73,74:74,75:75,80:80,81:81,82:82,93:93,96:96,97:97,98:98}],68:[function(e,t,n){"use strict";var r=e(166),o={getDOMNode:function(){return r(this)}};t.exports=o},{166:166}],69:[function(e,t,n){"use strict";function r(e){return Object.prototype.hasOwnProperty.call(e,m)||(e[m]=h++,p[e[m]]={}),p[e[m]]}var o=e(52),i=e(54),a=e(55),s=e(101),u=e(151),l=e(65),c=e(185),p={},d=!1,h=0,f={topBlur:"blur",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topScroll:"scroll",topSelectionChange:"selectionchange",topTextInput:"textInput",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topWheel:"wheel"},m="_reactListenersID"+(Math.random()+"").slice(2),v=l({},s,{ReactEventListener:null,injection:{injectReactEventListener:function(e){e.setHandleTopLevel(v.handleTopLevel),v.ReactEventListener=e}},setEnabled:function(e){v.ReactEventListener&&v.ReactEventListener.setEnabled(e)},isEnabled:function(){return!(!v.ReactEventListener||!v.ReactEventListener.isEnabled())},listenTo:function(e,t){for(var n=t,i=r(n),s=a.registrationNameDependencies[e],u=o.topLevelTypes,l=0,p=s.length;l<p;l++){var d=s[l];i.hasOwnProperty(d)&&i[d]||(d===u.topWheel?c("wheel")?v.ReactEventListener.trapBubbledEvent(u.topWheel,"wheel",n):c("mousewheel")?v.ReactEventListener.trapBubbledEvent(u.topWheel,"mousewheel",n):v.ReactEventListener.trapBubbledEvent(u.topWheel,"DOMMouseScroll",n):d===u.topScroll?c("scroll",!0)?v.ReactEventListener.trapCapturedEvent(u.topScroll,"scroll",n):v.ReactEventListener.trapBubbledEvent(u.topScroll,"scroll",v.ReactEventListener.WINDOW_HANDLE):d===u.topFocus||d===u.topBlur?(c("focus",!0)?(v.ReactEventListener.trapCapturedEvent(u.topFocus,"focus",n),v.ReactEventListener.trapCapturedEvent(u.topBlur,"blur",n)):c("focusin")&&(v.ReactEventListener.trapBubbledEvent(u.topFocus,"focusin",n),v.ReactEventListener.trapBubbledEvent(u.topBlur,"focusout",n)),i[u.topBlur]=!0,i[u.topFocus]=!0):f.hasOwnProperty(d)&&v.ReactEventListener.trapBubbledEvent(d,f[d],n),i[d]=!0)}},trapBubbledEvent:function(e,t,n){return v.ReactEventListener.trapBubbledEvent(e,t,n)},trapCapturedEvent:function(e,t,n){return v.ReactEventListener.trapCapturedEvent(e,t,n)},ensureScrollValueMonitoring:function(){if(!d){var e=u.refreshScrollValues;v.ReactEventListener.monitorScrollValue(e),d=!0}},eventNameDispatchConfigs:i.eventNameDispatchConfigs,registrationNameModules:i.registrationNameModules,putListener:i.putListener,getListener:i.getListener,deleteListener:i.deleteListener,deleteAllListeners:i.deleteAllListeners});t.exports=v},{101:101,151:151,185:185,52:52,54:54,55:55,65:65}],70:[function(e,t,n){"use strict";var r=e(67),o=e(65),i=r.createFactory(e(131)),a=r.createFactory(e(71)),s=r.createClass({displayName:"ReactCSSTransitionGroup",propTypes:{transitionName:r.PropTypes.string.isRequired,transitionAppear:r.PropTypes.bool,transitionEnter:r.PropTypes.bool,transitionLeave:r.PropTypes.bool},getDefaultProps:function(){return{transitionAppear:!1,transitionEnter:!0,transitionLeave:!0}},_wrapChild:function(e){return a({name:this.props.transitionName,appear:this.props.transitionAppear,enter:this.props.transitionEnter,leave:this.props.transitionLeave},e)},render:function(){return i(o({},this.props,{childFactory:this._wrapChild}))}});t.exports=s},{131:131,65:65,67:67,71:71}],71:[function(e,t,n){"use strict";var r=e(67),o=e(40),i=e(130),a=e(194),s=(e(203),17),u=r.createClass({displayName:"ReactCSSTransitionGroupChild",transition:function(e,t){var n=this.getDOMNode(),r=this.props.name+"-"+e,a=r+"-active",s=function(e){e&&e.target!==n||(o.removeClass(n,r),o.removeClass(n,a),i.removeEndEventListener(n,s),t&&t())};i.addEndEventListener(n,s),o.addClass(n,r),this.queueClass(a)},queueClass:function(e){this.classNameQueue.push(e),this.timeout||(this.timeout=setTimeout(this.flushClassNameQueue,s))},flushClassNameQueue:function(){this.isMounted()&&this.classNameQueue.forEach(o.addClass.bind(o,this.getDOMNode())),this.classNameQueue.length=0,this.timeout=null},componentWillMount:function(){this.classNameQueue=[]},componentWillUnmount:function(){this.timeout&&clearTimeout(this.timeout)},componentWillAppear:function(e){this.props.appear?this.transition("appear",e):e()},componentWillEnter:function(e){this.props.enter?this.transition("enter",e):e()},componentWillLeave:function(e){this.props.leave?this.transition("leave",e):e()},render:function(){return a(this.props.children)}});t.exports=u},{130:130,194:194,203:203,40:40,67:67}],72:[function(e,t,n){"use strict";var r=e(123),o=e(167),i=e(183),a=e(199),s={instantiateChildren:function(e,t,n){var r=o(e);for(var a in r)if(r.hasOwnProperty(a)){var s=r[a],u=i(s,null);r[a]=u}return r},updateChildren:function(e,t,n,s){var u=o(t);if(!u&&!e)return null;var l;for(l in u)if(u.hasOwnProperty(l)){var c=e&&e[l],p=c&&c._currentElement,d=u[l];if(a(p,d))r.receiveComponent(c,d,n,s),u[l]=c;else{c&&r.unmountComponent(c,l);var h=i(d,null);u[l]=h}}for(l in e)!e.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||r.unmountComponent(e[l]);return u},unmountChildren:function(e){for(var t in e){var n=e[t];r.unmountComponent(n)}}};t.exports=s},{123:123,167:167,183:183,199:199}],73:[function(e,t,n){"use strict";function r(e,t){this.forEachFunction=e,this.forEachContext=t}function o(e,t,n,r){var o=e;o.forEachFunction.call(o.forEachContext,t,r)}function i(e,t,n){if(null==e)return e;var i=r.getPooled(t,n);h(e,o,i),r.release(i)}function a(e,t,n){this.mapResult=e,this.mapFunction=t,this.mapContext=n}function s(e,t,n,r){var o=e,i=o.mapResult,a=!i.hasOwnProperty(n);if(a){var s=o.mapFunction.call(o.mapContext,t,r);i[n]=s}}function u(e,t,n){if(null==e)return e;var r={},o=a.getPooled(r,t,n);return h(e,s,o),a.release(o),d.create(r)}function l(e,t,n,r){return null}function c(e,t){return h(e,l,null)}var p=e(66),d=e(103),h=e(201),f=(e(203),p.twoArgumentPooler),m=p.threeArgumentPooler;p.addPoolingTo(r,f),p.addPoolingTo(a,m);var v={forEach:i,map:u,count:c};t.exports=v},{103:103,201:201,203:203,66:66}],74:[function(e,t,n){"use strict";function r(e,t){var n=x.hasOwnProperty(t)?x[t]:null;M.hasOwnProperty(t)&&y(n===C.OVERRIDE_BASE),e.hasOwnProperty(t)&&y(n===C.DEFINE_MANY||n===C.DEFINE_MANY_MERGED)}function o(e,t){if(t){y("function"!=typeof t),y(!d.isValidElement(t));var n=e.prototype;t.hasOwnProperty(w)&&D.mixins(e,t.mixins);for(var o in t)if(t.hasOwnProperty(o)&&o!==w){var i=t[o];if(r(n,o),D.hasOwnProperty(o))D[o](e,i);else{var a=x.hasOwnProperty(o),l=n.hasOwnProperty(o),c=i&&i.__reactDontBind,p="function"==typeof i,h=p&&!a&&!l&&!c;if(h)n.__reactAutoBindMap||(n.__reactAutoBindMap={}),n.__reactAutoBindMap[o]=i,n[o]=i;else if(l){var f=x[o];y(a&&(f===C.DEFINE_MANY_MERGED||f===C.DEFINE_MANY)),f===C.DEFINE_MANY_MERGED?n[o]=s(n[o],i):f===C.DEFINE_MANY&&(n[o]=u(n[o],i))}else n[o]=i}}}}function i(e,t){if(t)for(var n in t){var r=t[n];if(t.hasOwnProperty(n)){var o=n in D;y(!o);var i=n in e;y(!i),e[n]=r}}}function a(e,t){y(e&&t&&"object"==typeof e&&"object"==typeof t);for(var n in t)t.hasOwnProperty(n)&&(y(void 0===e[n]),e[n]=t[n]);return e}function s(e,t){return function(){var n=e.apply(this,arguments),r=t.apply(this,arguments);if(null==n)return r;if(null==r)return n;var o={};return a(o,n),a(o,r),o}}function u(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function l(e,t){var n=t.bind(e);return n}function c(e){for(var t in e.__reactAutoBindMap)if(e.__reactAutoBindMap.hasOwnProperty(t)){var n=e.__reactAutoBindMap[t];e[t]=l(e,h.guard(n,e.constructor.displayName+"."+t))}}var p=e(75),d=(e(81),e(97)),h=e(100),f=e(107),m=e(108),v=(e(119),e(118),e(132)),g=e(65),y=e(184),_=e(190),b=e(191),w=(e(203),b({mixins:null})),C=_({DEFINE_ONCE:null,DEFINE_MANY:null,OVERRIDE_BASE:null,DEFINE_MANY_MERGED:null}),E=[],x={mixins:C.DEFINE_MANY,statics:C.DEFINE_MANY,propTypes:C.DEFINE_MANY,contextTypes:C.DEFINE_MANY,childContextTypes:C.DEFINE_MANY,getDefaultProps:C.DEFINE_MANY_MERGED,getInitialState:C.DEFINE_MANY_MERGED,getChildContext:C.DEFINE_MANY_MERGED,render:C.DEFINE_ONCE,componentWillMount:C.DEFINE_MANY,componentDidMount:C.DEFINE_MANY,componentWillReceiveProps:C.DEFINE_MANY,shouldComponentUpdate:C.DEFINE_ONCE,componentWillUpdate:C.DEFINE_MANY,componentDidUpdate:C.DEFINE_MANY,componentWillUnmount:C.DEFINE_MANY,updateComponent:C.OVERRIDE_BASE},D={displayName:function(e,t){e.displayName=t},mixins:function(e,t){if(t)for(var n=0;n<t.length;n++)o(e,t[n])},childContextTypes:function(e,t){e.childContextTypes=g({},e.childContextTypes,t)},contextTypes:function(e,t){e.contextTypes=g({},e.contextTypes,t)},getDefaultProps:function(e,t){e.getDefaultProps?e.getDefaultProps=s(e.getDefaultProps,t):e.getDefaultProps=t},propTypes:function(e,t){e.propTypes=g({},e.propTypes,t)},statics:function(e,t){i(e,t)}},M={replaceState:function(e,t){v.enqueueReplaceState(this,e),t&&v.enqueueCallback(this,t)},isMounted:function(){var e=f.get(this);return e&&e!==m.currentlyMountingInstance},setProps:function(e,t){v.enqueueSetProps(this,e),t&&v.enqueueCallback(this,t)},replaceProps:function(e,t){v.enqueueReplaceProps(this,e),t&&v.enqueueCallback(this,t)}},S=function(){};g(S.prototype,p.prototype,M);var k={createClass:function(e){var t=function(e,t){this.__reactAutoBindMap&&c(this),this.props=e,this.context=t,this.state=null;var n=this.getInitialState?this.getInitialState():null;y("object"==typeof n&&!Array.isArray(n)),this.state=n};t.prototype=new S,t.prototype.constructor=t,E.forEach(o.bind(null,t)),o(t,e),t.getDefaultProps&&(t.defaultProps=t.getDefaultProps()),y(t.prototype.render);for(var n in x)t.prototype[n]||(t.prototype[n]=null);return t.type=t,t},injection:{injectMixin:function(e){E.push(e)}}};t.exports=k},{100:100,107:107,108:108,118:118,119:119,132:132,184:184,190:190,191:191,203:203,65:65,75:75,81:81,97:97}],75:[function(e,t,n){"use strict";function r(e,t){this.props=e,this.context=t}var o=e(132),i=e(184);e(203);r.prototype.setState=function(e,t){i("object"==typeof e||"function"==typeof e||null==e),o.enqueueSetState(this,e),t&&o.enqueueCallback(this,t)},r.prototype.forceUpdate=function(e){o.enqueueForceUpdate(this),e&&o.enqueueCallback(this,e)};t.exports=r},{132:132,184:184,203:203}],76:[function(e,t,n){"use strict";var r=e(86),o=e(111),i={processChildrenUpdates:r.dangerouslyProcessChildrenUpdates,replaceNodeWithMarkupByID:r.dangerouslyReplaceNodeWithMarkupByID,unmountIDFromEnvironment:function(e){o.purgeID(e)}};t.exports=i},{111:111,86:86}],77:[function(e,t,n){"use strict";var r=e(184),o=!1,i={unmountIDFromEnvironment:null,replaceNodeWithMarkupByID:null,processChildrenUpdates:null,injection:{injectEnvironment:function(e){r(!o),i.unmountIDFromEnvironment=e.unmountIDFromEnvironment,i.replaceNodeWithMarkupByID=e.replaceNodeWithMarkupByID,i.processChildrenUpdates=e.processChildrenUpdates,o=!0}}};t.exports=i},{184:184}],78:[function(e,t,n){"use strict";var r=e(198),o={shouldComponentUpdate:function(e,t){return!r(this.props,e)||!r(this.state,t)}};t.exports=o},{198:198}],79:[function(e,t,n){"use strict";function r(e){var t=e._currentElement._owner||null;if(t){var n=t.getName();if(n)return" Check the render method of `"+n+"`."}return""}var o=e(77),i=e(80),a=e(81),s=e(97),u=(e(98),e(107)),l=e(108),c=e(114),p=e(116),d=e(119),h=(e(118),e(123)),f=e(133),m=e(65),v=e(164),g=e(184),y=e(199),_=(e(203),1),b={construct:function(e){this._currentElement=e,this._rootNodeID=null,this._instance=null,this._pendingElement=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._renderedComponent=null,this._context=null,this._mountOrder=0,this._isTopLevel=!1,this._pendingCallbacks=null},mountComponent:function(e,t,n){this._context=n,this._mountOrder=_++,this._rootNodeID=e;var r=this._processProps(this._currentElement.props),o=this._processContext(this._currentElement._context),i=c.getComponentClassForElement(this._currentElement),a=new i(r,o);a.props=r,a.context=o,a.refs=v,this._instance=a,u.set(a,this);var s=a.state;void 0===s&&(a.state=s=null),g("object"==typeof s&&!Array.isArray(s)),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1;var p,d,f=l.currentlyMountingInstance;l.currentlyMountingInstance=this;try{a.componentWillMount&&(a.componentWillMount(),this._pendingStateQueue&&(a.state=this._processPendingState(a.props,a.context))),p=this._getValidatedChildContext(n),d=this._renderValidatedComponent(p)}finally{l.currentlyMountingInstance=f}this._renderedComponent=this._instantiateReactComponent(d,this._currentElement.type);var m=h.mountComponent(this._renderedComponent,e,t,this._mergeChildContext(n,p));return a.componentDidMount&&t.getReactMountReady().enqueue(a.componentDidMount,a),m},unmountComponent:function(){var e=this._instance;if(e.componentWillUnmount){var t=l.currentlyUnmountingInstance;l.currentlyUnmountingInstance=this;try{e.componentWillUnmount()}finally{l.currentlyUnmountingInstance=t}}h.unmountComponent(this._renderedComponent),this._renderedComponent=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._pendingCallbacks=null,this._pendingElement=null,this._context=null,this._rootNodeID=null,u.remove(e)},_setPropsInternal:function(e,t){var n=this._pendingElement||this._currentElement;this._pendingElement=s.cloneAndReplaceProps(n,m({},n.props,e)),f.enqueueUpdate(this,t)},_maskContext:function(e){var t=null;if("string"==typeof this._currentElement.type)return v;var n=this._currentElement.type.contextTypes;if(!n)return v;t={};for(var r in n)t[r]=e[r];return t},_processContext:function(e){var t=this._maskContext(e);return t},_getValidatedChildContext:function(e){var t=this._instance,n=t.getChildContext&&t.getChildContext();if(n){g("object"==typeof t.constructor.childContextTypes);for(var r in n)g(r in t.constructor.childContextTypes);return n}return null},_mergeChildContext:function(e,t){return t?m({},e,t):e},_processProps:function(e){return e},_checkPropTypes:function(e,t,n){var o=this.getName();for(var i in e)if(e.hasOwnProperty(i)){var a;try{g("function"==typeof e[i]),a=e[i](t,i,o,n)}catch(e){a=e}a instanceof Error&&(r(this),n===d.prop)}},receiveComponent:function(e,t,n){var r=this._currentElement,o=this._context;this._pendingElement=null,this.updateComponent(t,r,e,o,n)},performUpdateIfNecessary:function(e){null!=this._pendingElement&&h.receiveComponent(this,this._pendingElement||this._currentElement,e,this._context),(null!==this._pendingStateQueue||this._pendingForceUpdate)&&this.updateComponent(e,this._currentElement,this._currentElement,this._context,this._context)},_warnIfContextsDiffer:function(e,t){e=this._maskContext(e),t=this._maskContext(t);for(var n=Object.keys(t).sort(),r=(this.getName()||"ReactCompositeComponent",0);r<n.length;r++)n[r]},updateComponent:function(e,t,n,r,o){var i=this._instance,a=i.context,s=i.props;t!==n&&(a=this._processContext(n._context),s=this._processProps(n.props),i.componentWillReceiveProps&&i.componentWillReceiveProps(s,a));var u=this._processPendingState(s,a),l=this._pendingForceUpdate||!i.shouldComponentUpdate||i.shouldComponentUpdate(s,u,a);l?(this._pendingForceUpdate=!1,this._performComponentUpdate(n,s,u,a,e,o)):(this._currentElement=n,this._context=o,i.props=s,i.state=u,i.context=a)},_processPendingState:function(e,t){var n=this._instance,r=this._pendingStateQueue,o=this._pendingReplaceState;if(this._pendingReplaceState=!1,this._pendingStateQueue=null,!r)return n.state;if(o&&1===r.length)return r[0];for(var i=m({},o?r[0]:n.state),a=o?1:0;a<r.length;a++){var s=r[a];m(i,"function"==typeof s?s.call(n,i,e,t):s)}return i},_performComponentUpdate:function(e,t,n,r,o,i){var a=this._instance,s=a.props,u=a.state,l=a.context;a.componentWillUpdate&&a.componentWillUpdate(t,n,r),this._currentElement=e,this._context=i,a.props=t,a.state=n,a.context=r,this._updateRenderedComponent(o,i),a.componentDidUpdate&&o.getReactMountReady().enqueue(a.componentDidUpdate.bind(a,s,u,l),a)},_updateRenderedComponent:function(e,t){var n=this._renderedComponent,r=n._currentElement,o=this._getValidatedChildContext(),i=this._renderValidatedComponent(o);if(y(r,i))h.receiveComponent(n,i,e,this._mergeChildContext(t,o));else{var a=this._rootNodeID,s=n._rootNodeID;h.unmountComponent(n),this._renderedComponent=this._instantiateReactComponent(i,this._currentElement.type);var u=h.mountComponent(this._renderedComponent,a,e,this._mergeChildContext(t,o));this._replaceNodeWithMarkupByID(s,u)}},_replaceNodeWithMarkupByID:function(e,t){o.replaceNodeWithMarkupByID(e,t)},_renderValidatedComponentWithoutOwnerOrContext:function(){var e=this._instance,t=e.render();return t},_renderValidatedComponent:function(e){var t,n=i.current;i.current=this._mergeChildContext(this._currentElement._context,e),a.current=this;try{t=this._renderValidatedComponentWithoutOwnerOrContext()}finally{i.current=n,a.current=null}return g(null===t||t===!1||s.isValidElement(t)),t},attachRef:function(e,t){var n=this.getPublicInstance(),r=n.refs===v?n.refs={}:n.refs;r[e]=t.getPublicInstance()},detachRef:function(e){var t=this.getPublicInstance().refs;delete t[e]},getName:function(){var e=this._currentElement.type,t=this._instance&&this._instance.constructor;return e.displayName||t&&t.displayName||e.name||t&&t.name||null},getPublicInstance:function(){return this._instance},_instantiateReactComponent:null};p.measureMethods(b,"ReactCompositeComponent",{mountComponent:"mountComponent",updateComponent:"updateComponent",_renderValidatedComponent:"_renderValidatedComponent"});var w={Mixin:b};t.exports=w},{107:107,108:108,114:114,116:116,118:118,119:119,123:123,133:133,164:164,184:184,199:199,203:203,65:65,77:77,80:80,81:81,97:97,98:98}],80:[function(e,t,n){"use strict";var r=e(65),o=e(164),i=(e(203),{current:o,withContext:function(e,t){var n,o=i.current;i.current=r({},o,e);try{n=t()}finally{i.current=o}return n}});t.exports=i},{164:164,203:203,65:65}],81:[function(e,t,n){"use strict";var r={current:null};t.exports=r},{}],82:[function(e,t,n){"use strict";function r(e){return o.createFactory(e)}var o=e(97),i=(e(98),e(192)),a=i({a:"a",abbr:"abbr",address:"address",area:"area",article:"article",aside:"aside",audio:"audio",b:"b",base:"base",bdi:"bdi",bdo:"bdo",big:"big",blockquote:"blockquote",body:"body",br:"br",button:"button",canvas:"canvas",caption:"caption",cite:"cite",code:"code",col:"col",colgroup:"colgroup",data:"data",datalist:"datalist",dd:"dd",del:"del",details:"details",dfn:"dfn",dialog:"dialog",div:"div",dl:"dl",dt:"dt",em:"em",embed:"embed",fieldset:"fieldset",figcaption:"figcaption",figure:"figure",footer:"footer",form:"form",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",head:"head",header:"header",hr:"hr",html:"html",i:"i",iframe:"iframe",img:"img",input:"input",ins:"ins",kbd:"kbd",keygen:"keygen",label:"label",legend:"legend",li:"li",link:"link",main:"main",map:"map",mark:"mark",menu:"menu",menuitem:"menuitem",meta:"meta",meter:"meter",nav:"nav",noscript:"noscript",object:"object",ol:"ol",optgroup:"optgroup",option:"option",output:"output",p:"p",param:"param",picture:"picture",pre:"pre",progress:"progress",q:"q",rp:"rp",rt:"rt",ruby:"ruby",s:"s",samp:"samp",script:"script",section:"section",select:"select",small:"small",source:"source",span:"span",strong:"strong",style:"style",sub:"sub",summary:"summary",sup:"sup",table:"table",tbody:"tbody",td:"td",textarea:"textarea",tfoot:"tfoot",th:"th",thead:"thead",time:"time",title:"title",tr:"tr",track:"track",u:"u",ul:"ul",var:"var",video:"video",wbr:"wbr",circle:"circle",clipPath:"clipPath",defs:"defs",ellipse:"ellipse",g:"g",line:"line",linearGradient:"linearGradient",mask:"mask",path:"path",pattern:"pattern",polygon:"polygon",polyline:"polyline",radialGradient:"radialGradient",rect:"rect",stop:"stop",svg:"svg",text:"text",tspan:"tspan"},r);t.exports=a},{192:192,97:97,98:98}],83:[function(e,t,n){"use strict";var r=e(38),o=e(68),i=e(74),a=e(97),s=e(190),u=a.createFactory("button"),l=s({onClick:!0,onDoubleClick:!0,onMouseDown:!0,onMouseMove:!0,onMouseUp:!0,onClickCapture:!0,onDoubleClickCapture:!0,onMouseDownCapture:!0,onMouseMoveCapture:!0,onMouseUpCapture:!0}),c=i.createClass({displayName:"ReactDOMButton",tagName:"BUTTON",mixins:[r,o],render:function(){var e={};for(var t in this.props)!this.props.hasOwnProperty(t)||this.props.disabled&&l[t]||(e[t]=this.props[t]);return u(e,this.props.children)}});t.exports=c},{190:190,38:38,68:68,74:74,97:97}],84:[function(e,t,n){"use strict";function r(e){e&&(null!=e.dangerouslySetInnerHTML&&(g(null==e.children),g("object"==typeof e.dangerouslySetInnerHTML&&"__html"in e.dangerouslySetInnerHTML)),g(null==e.style||"object"==typeof e.style))}function o(e,t,n,r){var o=d.findReactContainerForID(e);if(o){var i=o.nodeType===x?o.ownerDocument:o;b(t,i)}r.getPutListenerQueue().enqueuePutListener(e,t,n)}function i(e){N.call(k,e)||(g(S.test(e)),k[e]=!0)}function a(e){i(e),this._tag=e,this._renderedChildren=null,this._previousStyleCopy=null,this._rootNodeID=null}var s=e(42),u=e(47),l=e(48),c=e(69),p=e(76),d=e(111),h=e(112),f=e(116),m=e(65),v=e(165),g=e(184),y=(e(185),e(191)),_=(e(203),c.deleteListener),b=c.listenTo,w=c.registrationNameModules,C={string:!0,number:!0},E=y({style:null}),x=1,D=null,M={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},S=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,k={},N={}.hasOwnProperty;a.displayName="ReactDOMComponent",a.Mixin={construct:function(e){this._currentElement=e},mountComponent:function(e,t,n){this._rootNodeID=e,r(this._currentElement.props);var o=M[this._tag]?"":"</"+this._tag+">";return this._createOpenTagMarkupAndPutListeners(t)+this._createContentMarkup(t,n)+o},_createOpenTagMarkupAndPutListeners:function(e){var t=this._currentElement.props,n="<"+this._tag;for(var r in t)if(t.hasOwnProperty(r)){var i=t[r];if(null!=i)if(w.hasOwnProperty(r))o(this._rootNodeID,r,i,e);else{r===E&&(i&&(i=this._previousStyleCopy=m({},t.style)),i=s.createMarkupForStyles(i));var a=l.createMarkupForProperty(r,i);a&&(n+=" "+a)}}if(e.renderToStaticMarkup)return n+">";var u=l.createMarkupForID(this._rootNodeID);return n+" "+u+">"},_createContentMarkup:function(e,t){var n="";"listing"!==this._tag&&"pre"!==this._tag&&"textarea"!==this._tag||(n="\n");var r=this._currentElement.props,o=r.dangerouslySetInnerHTML;if(null!=o){if(null!=o.__html)return n+o.__html}else{var i=C[typeof r.children]?r.children:null,a=null!=i?null:r.children;if(null!=i)return n+v(i);if(null!=a){var s=this.mountChildren(a,e,t);return n+s.join("")}}return n},receiveComponent:function(e,t,n){var r=this._currentElement;this._currentElement=e,this.updateComponent(t,r,e,n)},updateComponent:function(e,t,n,o){r(this._currentElement.props),this._updateDOMProperties(t.props,e),this._updateDOMChildren(t.props,e,o)},_updateDOMProperties:function(e,t){var n,r,i,a=this._currentElement.props;for(n in e)if(!a.hasOwnProperty(n)&&e.hasOwnProperty(n))if(n===E){var s=this._previousStyleCopy;for(r in s)s.hasOwnProperty(r)&&(i=i||{},i[r]="");this._previousStyleCopy=null}else w.hasOwnProperty(n)?_(this._rootNodeID,n):(u.isStandardName[n]||u.isCustomAttribute(n))&&D.deletePropertyByID(this._rootNodeID,n);for(n in a){var l=a[n],c=n===E?this._previousStyleCopy:e[n];if(a.hasOwnProperty(n)&&l!==c)if(n===E)if(l?l=this._previousStyleCopy=m({},l):this._previousStyleCopy=null,c){for(r in c)!c.hasOwnProperty(r)||l&&l.hasOwnProperty(r)||(i=i||{},i[r]="");for(r in l)l.hasOwnProperty(r)&&c[r]!==l[r]&&(i=i||{},i[r]=l[r])}else i=l;else w.hasOwnProperty(n)?o(this._rootNodeID,n,l,t):(u.isStandardName[n]||u.isCustomAttribute(n))&&D.updatePropertyByID(this._rootNodeID,n,l)}i&&D.updateStylesByID(this._rootNodeID,i)},_updateDOMChildren:function(e,t,n){var r=this._currentElement.props,o=C[typeof e.children]?e.children:null,i=C[typeof r.children]?r.children:null,a=e.dangerouslySetInnerHTML&&e.dangerouslySetInnerHTML.__html,s=r.dangerouslySetInnerHTML&&r.dangerouslySetInnerHTML.__html,u=null!=o?null:e.children,l=null!=i?null:r.children,c=null!=o||null!=a,p=null!=i||null!=s;null!=u&&null==l?this.updateChildren(null,t,n):c&&!p&&this.updateTextContent(""),null!=i?o!==i&&this.updateTextContent(""+i):null!=s?a!==s&&D.updateInnerHTMLByID(this._rootNodeID,s):null!=l&&this.updateChildren(l,t,n)},unmountComponent:function(){this.unmountChildren(),c.deleteAllListeners(this._rootNodeID),p.unmountIDFromEnvironment(this._rootNodeID),this._rootNodeID=null}},f.measureMethods(a,"ReactDOMComponent",{mountComponent:"mountComponent",updateComponent:"updateComponent"}),m(a.prototype,a.Mixin,h.Mixin),a.injection={injectIDOperations:function(e){a.BackendIDOperations=D=e}},t.exports=a},{111:111,112:112,116:116,165:165,184:184,185:185,191:191,203:203,42:42,47:47,48:48,65:65,69:69,76:76}],85:[function(e,t,n){"use strict";var r=e(52),o=e(63),i=e(68),a=e(74),s=e(97),u=s.createFactory("form"),l=a.createClass({displayName:"ReactDOMForm",tagName:"FORM",mixins:[i,o],render:function(){return u(this.props)},componentDidMount:function(){this.trapBubbledEvent(r.topLevelTypes.topReset,"reset"),this.trapBubbledEvent(r.topLevelTypes.topSubmit,"submit")}});t.exports=l},{52:52,63:63,68:68,74:74,97:97}],86:[function(e,t,n){"use strict";var r=e(42),o=e(46),i=e(48),a=e(111),s=e(116),u=e(184),l=e(196),c={dangerouslySetInnerHTML:"`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.",style:"`style` must be set using `updateStylesByID()`."},p={updatePropertyByID:function(e,t,n){var r=a.getNode(e);u(!c.hasOwnProperty(t)),null!=n?i.setValueForProperty(r,t,n):i.deleteValueForProperty(r,t)},deletePropertyByID:function(e,t,n){var r=a.getNode(e);u(!c.hasOwnProperty(t)),i.deleteValueForProperty(r,t,n)},updateStylesByID:function(e,t){var n=a.getNode(e);r.setValueForStyles(n,t)},updateInnerHTMLByID:function(e,t){var n=a.getNode(e);l(n,t)},updateTextContentByID:function(e,t){var n=a.getNode(e);o.updateTextContent(n,t)},dangerouslyReplaceNodeWithMarkupByID:function(e,t){var n=a.getNode(e);o.dangerouslyReplaceNodeWithMarkup(n,t)},dangerouslyProcessChildrenUpdates:function(e,t){for(var n=0;n<e.length;n++)e[n].parentNode=a.getNode(e[n].parentID);o.processUpdates(e,t)}};s.measureMethods(p,"ReactDOMIDOperations",{updatePropertyByID:"updatePropertyByID",deletePropertyByID:"deletePropertyByID",updateStylesByID:"updateStylesByID",updateInnerHTMLByID:"updateInnerHTMLByID",updateTextContentByID:"updateTextContentByID",dangerouslyReplaceNodeWithMarkupByID:"dangerouslyReplaceNodeWithMarkupByID",dangerouslyProcessChildrenUpdates:"dangerouslyProcessChildrenUpdates"}),t.exports=p},{111:111,116:116,184:184,196:196,42:42,46:46,48:48}],87:[function(e,t,n){"use strict";var r=e(52),o=e(63),i=e(68),a=e(74),s=e(97),u=s.createFactory("iframe"),l=a.createClass({displayName:"ReactDOMIframe",tagName:"IFRAME",mixins:[i,o],render:function(){return u(this.props)},componentDidMount:function(){this.trapBubbledEvent(r.topLevelTypes.topLoad,"load")}});t.exports=l},{52:52,63:63,68:68,74:74,97:97}],88:[function(e,t,n){"use strict";var r=e(52),o=e(63),i=e(68),a=e(74),s=e(97),u=s.createFactory("img"),l=a.createClass({displayName:"ReactDOMImg",tagName:"IMG",mixins:[i,o],render:function(){return u(this.props)},componentDidMount:function(){this.trapBubbledEvent(r.topLevelTypes.topLoad,"load"),this.trapBubbledEvent(r.topLevelTypes.topError,"error")}});t.exports=l},{52:52,63:63,68:68,74:74,97:97}],89:[function(e,t,n){"use strict";function r(){this.isMounted()&&this.forceUpdate()}var o=e(38),i=e(48),a=e(62),s=e(68),u=e(74),l=e(97),c=e(111),p=e(133),d=e(65),h=e(184),f=l.createFactory("input"),m={},v=u.createClass({displayName:"ReactDOMInput",tagName:"INPUT",mixins:[o,a.Mixin,s],getInitialState:function(){var e=this.props.defaultValue;return{initialChecked:this.props.defaultChecked||!1,initialValue:null!=e?e:null}},render:function(){var e=d({},this.props);e.defaultChecked=null,e.defaultValue=null;var t=a.getValue(this);e.value=null!=t?t:this.state.initialValue;var n=a.getChecked(this);return e.checked=null!=n?n:this.state.initialChecked,e.onChange=this._handleChange,f(e,this.props.children)},componentDidMount:function(){var e=c.getID(this.getDOMNode());m[e]=this},componentWillUnmount:function(){var e=this.getDOMNode(),t=c.getID(e);delete m[t]},componentDidUpdate:function(e,t,n){var r=this.getDOMNode();null!=this.props.checked&&i.setValueForProperty(r,"checked",this.props.checked||!1);var o=a.getValue(this);null!=o&&i.setValueForProperty(r,"value",""+o)},_handleChange:function(e){var t,n=a.getOnChange(this);n&&(t=n.call(this,e)),p.asap(r,this);var o=this.props.name;if("radio"===this.props.type&&null!=o){for(var i=this.getDOMNode(),s=i;s.parentNode;)s=s.parentNode;for(var u=s.querySelectorAll("input[name="+JSON.stringify(""+o)+'][type="radio"]'),l=0,d=u.length;l<d;l++){var f=u[l];if(f!==i&&f.form===i.form){var v=c.getID(f);h(v);var g=m[v];h(g),p.asap(r,g)}}}return t}});t.exports=v},{111:111,133:133,184:184,38:38,48:48,62:62,65:65,68:68,74:74,97:97}],90:[function(e,t,n){"use strict";var r=e(68),o=e(74),i=e(97),a=(e(203),i.createFactory("option")),s=o.createClass({displayName:"ReactDOMOption",tagName:"OPTION",mixins:[r],componentWillMount:function(){},render:function(){return a(this.props,this.props.children)}});t.exports=s},{203:203,68:68,74:74,97:97}],91:[function(e,t,n){"use strict";function r(){if(this._pendingUpdate){this._pendingUpdate=!1;var e=s.getValue(this);null!=e&&this.isMounted()&&i(this,e)}}function o(e,t,n){if(null==e[t])return null;if(e.multiple){if(!Array.isArray(e[t]))return Error("The `"+t+"` prop supplied to <select> must be an array if `multiple` is true.")}else if(Array.isArray(e[t]))return Error("The `"+t+"` prop supplied to <select> must be a scalar value if `multiple` is false.")}function i(e,t){var n,r,o,i=e.getDOMNode().options;if(e.props.multiple){
for(n={},r=0,o=t.length;r<o;r++)n[""+t[r]]=!0;for(r=0,o=i.length;r<o;r++){var a=n.hasOwnProperty(i[r].value);i[r].selected!==a&&(i[r].selected=a)}}else{for(n=""+t,r=0,o=i.length;r<o;r++)if(i[r].value===n)return void(i[r].selected=!0);i.length&&(i[0].selected=!0)}}var a=e(38),s=e(62),u=e(68),l=e(74),c=e(97),p=e(133),d=e(65),h=c.createFactory("select"),f=l.createClass({displayName:"ReactDOMSelect",tagName:"SELECT",mixins:[a,s.Mixin,u],propTypes:{defaultValue:o,value:o},render:function(){var e=d({},this.props);return e.onChange=this._handleChange,e.value=null,h(e,this.props.children)},componentWillMount:function(){this._pendingUpdate=!1},componentDidMount:function(){var e=s.getValue(this);null!=e?i(this,e):null!=this.props.defaultValue&&i(this,this.props.defaultValue)},componentDidUpdate:function(e){var t=s.getValue(this);null!=t?(this._pendingUpdate=!1,i(this,t)):!e.multiple!=!this.props.multiple&&(null!=this.props.defaultValue?i(this,this.props.defaultValue):i(this,this.props.multiple?[]:""))},_handleChange:function(e){var t,n=s.getOnChange(this);return n&&(t=n.call(this,e)),this._pendingUpdate=!0,p.asap(r,this),t}});t.exports=f},{133:133,38:38,62:62,65:65,68:68,74:74,97:97}],92:[function(e,t,n){"use strict";function r(e,t,n,r){return e===n&&t===r}function o(e){var t=document.selection,n=t.createRange(),r=n.text.length,o=n.duplicate();o.moveToElementText(e),o.setEndPoint("EndToStart",n);var i=o.text.length,a=i+r;return{start:i,end:a}}function i(e){var t=window.getSelection&&window.getSelection();if(!t||0===t.rangeCount)return null;var n=t.anchorNode,o=t.anchorOffset,i=t.focusNode,a=t.focusOffset,s=t.getRangeAt(0),u=r(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset),l=u?0:(""+s).length,c=s.cloneRange();c.selectNodeContents(e),c.setEnd(s.startContainer,s.startOffset);var p=r(c.startContainer,c.startOffset,c.endContainer,c.endOffset),d=p?0:(""+c).length,h=d+l,f=document.createRange();f.setStart(n,o),f.setEnd(i,a);var m=f.collapsed;return{start:m?h:d,end:m?d:h}}function a(e,t){var n,r,o=document.selection.createRange().duplicate();void 0===t.end?(n=t.start,r=n):t.start>t.end?(n=t.end,r=t.start):(n=t.start,r=t.end),o.moveToElementText(e),o.moveStart("character",n),o.setEndPoint("EndToStart",o),o.moveEnd("character",r-n),o.select()}function s(e,t){if(window.getSelection){var n=window.getSelection(),r=e[c()].length,o=Math.min(t.start,r),i=void 0===t.end?o:Math.min(t.end,r);if(!n.extend&&o>i){var a=i;i=o,o=a}var s=l(e,o),u=l(e,i);if(s&&u){var p=document.createRange();p.setStart(s.node,s.offset),n.removeAllRanges(),o>i?(n.addRange(p),n.extend(u.node,u.offset)):(p.setEnd(u.node,u.offset),n.addRange(p))}}}var u=e(58),l=e(177),c=e(179),p=u.canUseDOM&&"selection"in document&&!("getSelection"in window),d={getOffsets:p?o:i,setOffsets:p?a:s};t.exports=d},{177:177,179:179,58:58}],93:[function(e,t,n){"use strict";var r=e(48),o=e(76),i=e(84),a=e(65),s=e(165),u=function(e){};a(u.prototype,{construct:function(e){this._currentElement=e,this._stringText=""+e,this._rootNodeID=null,this._mountIndex=0},mountComponent:function(e,t,n){this._rootNodeID=e;var o=s(this._stringText);return t.renderToStaticMarkup?o:"<span "+r.createMarkupForID(e)+">"+o+"</span>"},receiveComponent:function(e,t){if(e!==this._currentElement){this._currentElement=e;var n=""+e;n!==this._stringText&&(this._stringText=n,i.BackendIDOperations.updateTextContentByID(this._rootNodeID,n))}},unmountComponent:function(){o.unmountIDFromEnvironment(this._rootNodeID)}}),t.exports=u},{165:165,48:48,65:65,76:76,84:84}],94:[function(e,t,n){"use strict";function r(){this.isMounted()&&this.forceUpdate()}var o=e(38),i=e(48),a=e(62),s=e(68),u=e(74),l=e(97),c=e(133),p=e(65),d=e(184),h=(e(203),l.createFactory("textarea")),f=u.createClass({displayName:"ReactDOMTextarea",tagName:"TEXTAREA",mixins:[o,a.Mixin,s],getInitialState:function(){var e=this.props.defaultValue,t=this.props.children;null!=t&&(d(null==e),Array.isArray(t)&&(d(t.length<=1),t=t[0]),e=""+t),null==e&&(e="");var n=a.getValue(this);return{initialValue:""+(null!=n?n:e)}},render:function(){var e=p({},this.props);return d(null==e.dangerouslySetInnerHTML),e.defaultValue=null,e.value=null,e.onChange=this._handleChange,h(e,this.state.initialValue)},componentDidUpdate:function(e,t,n){var r=a.getValue(this);if(null!=r){var o=this.getDOMNode();i.setValueForProperty(o,"value",""+r)}},_handleChange:function(e){var t,n=a.getOnChange(this);return n&&(t=n.call(this,e)),c.asap(r,this),t}});t.exports=f},{133:133,184:184,203:203,38:38,48:48,62:62,65:65,68:68,74:74,97:97}],95:[function(e,t,n){"use strict";function r(){this.reinitializeTransaction()}var o=e(133),i=e(150),a=e(65),s=e(163),u={initialize:s,close:function(){d.isBatchingUpdates=!1}},l={initialize:s,close:o.flushBatchedUpdates.bind(o)},c=[l,u];a(r.prototype,i.Mixin,{getTransactionWrappers:function(){return c}});var p=new r,d={isBatchingUpdates:!1,batchedUpdates:function(e,t,n,r,o){var i=d.isBatchingUpdates;d.isBatchingUpdates=!0,i?e(t,n,r,o):p.perform(e,null,t,n,r,o)}};t.exports=d},{133:133,150:150,163:163,65:65}],96:[function(e,t,n){"use strict";function r(e){return f.createClass({tagName:e.toUpperCase(),render:function(){return new k(e,null,null,null,null,this.props)}})}function o(){T.EventEmitter.injectReactEventListener(N),T.EventPluginHub.injectEventPluginOrder(u),T.EventPluginHub.injectInstanceHandle(O),T.EventPluginHub.injectMount(P),T.EventPluginHub.injectEventPluginsByName({SimpleEventPlugin:L,EnterLeaveEventPlugin:l,ChangeEventPlugin:a,MobileSafariClickEventPlugin:d,SelectEventPlugin:R,BeforeInputEventPlugin:i}),T.NativeComponent.injectGenericComponentClass(g),T.NativeComponent.injectTextComponentClass(S),T.NativeComponent.injectAutoWrapper(r),T.Class.injectMixin(h),T.NativeComponent.injectComponentClasses({button:y,form:_,iframe:C,img:b,input:E,option:x,select:D,textarea:M,html:F("html"),head:F("head"),body:F("body")}),T.DOMProperty.injectDOMPropertyConfig(p),T.DOMProperty.injectDOMPropertyConfig(U),T.EmptyComponent.injectEmptyComponent("noscript"),T.Updates.injectReconcileTransaction(I),T.Updates.injectBatchingStrategy(v),T.RootIndex.injectCreateReactRootIndex(c.canUseDOM?s.createReactRootIndex:A.createReactRootIndex),T.Component.injectEnvironment(m),T.DOMComponent.injectIDOperations(w)}var i=e(39),a=e(44),s=e(45),u=e(50),l=e(51),c=e(58),p=e(60),d=e(64),h=e(68),f=e(74),m=e(76),v=e(95),g=e(84),y=e(83),_=e(85),b=e(88),w=e(86),C=e(87),E=e(89),x=e(90),D=e(91),M=e(94),S=e(93),k=e(97),N=e(102),T=e(104),O=e(106),P=e(111),I=e(122),R=e(136),A=e(137),L=e(138),U=e(135),F=e(159);t.exports={inject:o}},{102:102,104:104,106:106,111:111,122:122,135:135,136:136,137:137,138:138,159:159,39:39,44:44,45:45,50:50,51:51,58:58,60:60,64:64,68:68,74:74,76:76,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,93:93,94:94,95:95,97:97}],97:[function(e,t,n){"use strict";var r=e(80),o=e(81),i=e(65),a=(e(203),{key:!0,ref:!0}),s=function(e,t,n,r,o,i){this.type=e,this.key=t,this.ref=n,this._owner=r,this._context=o,this.props=i};s.prototype={_isReactElement:!0},s.createElement=function(e,t,n){var i,u={},l=null,c=null;if(null!=t){c=void 0===t.ref?null:t.ref,l=void 0===t.key?null:""+t.key;for(i in t)t.hasOwnProperty(i)&&!a.hasOwnProperty(i)&&(u[i]=t[i])}var p=arguments.length-2;if(1===p)u.children=n;else if(p>1){for(var d=Array(p),h=0;h<p;h++)d[h]=arguments[h+2];u.children=d}if(e&&e.defaultProps){var f=e.defaultProps;for(i in f)void 0===u[i]&&(u[i]=f[i])}return new s(e,l,c,o.current,r.current,u)},s.createFactory=function(e){var t=s.createElement.bind(null,e);return t.type=e,t},s.cloneAndReplaceProps=function(e,t){var n=new s(e.type,e.key,e.ref,e._owner,e._context,t);return n},s.cloneElement=function(e,t,n){var r,u=i({},e.props),l=e.key,c=e.ref,p=e._owner;if(null!=t){void 0!==t.ref&&(c=t.ref,p=o.current),void 0!==t.key&&(l=""+t.key);for(r in t)t.hasOwnProperty(r)&&!a.hasOwnProperty(r)&&(u[r]=t[r])}var d=arguments.length-2;if(1===d)u.children=n;else if(d>1){for(var h=Array(d),f=0;f<d;f++)h[f]=arguments[f+2];u.children=h}return new s(e.type,l,c,p,e._context,u)},s.isValidElement=function(e){var t=!(!e||!e._isReactElement);return t},t.exports=s},{203:203,65:65,80:80,81:81}],98:[function(e,t,n){"use strict";function r(){if(y.current){var e=y.current.getName();if(e)return" Check the render method of `"+e+"`."}return""}function o(e){var t=e&&e.getPublicInstance();if(t){var n=t.constructor;if(n)return n.displayName||n.name||void 0}}function i(){var e=y.current;return e&&o(e)||void 0}function a(e,t){e._store.validated||null!=e.key||(e._store.validated=!0,u('Each child in an array or iterator should have a unique "key" prop.',e,t))}function s(e,t,n){x.test(e)&&u("Child objects should have non-numeric keys so ordering is preserved.",t,n)}function u(e,t,n){var r=i(),a="string"==typeof n?n:n.displayName||n.name,s=r||a,u=C[e]||(C[e]={});if(!u.hasOwnProperty(s)){u[s]=!0;var l="";if(t&&t._owner&&t._owner!==y.current){var c=o(t._owner);l=" It was passed a child from "+c+"."}}}function l(e,t){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];m.isValidElement(r)&&a(r,t)}else if(m.isValidElement(e))e._store.validated=!0;else if(e){var o=b(e);if(o){if(o!==e.entries)for(var i,u=o.call(e);!(i=u.next()).done;)m.isValidElement(i.value)&&a(i.value,t)}else if("object"==typeof e){var l=v.extractIfFragment(e);for(var c in l)l.hasOwnProperty(c)&&s(c,l[c],t)}}}function c(e,t,n,o){for(var i in t)if(t.hasOwnProperty(i)){var a;try{w("function"==typeof t[i]),a=t[i](n,i,e,o)}catch(e){a=e}a instanceof Error&&!(a.message in E)&&(E[a.message]=!0,r(this))}}function p(e,t){var n=t.type,r="string"==typeof n?n:n.displayName,o=t._owner?t._owner.getPublicInstance().constructor.displayName:null,i=e+"|"+r+"|"+o;if(!D.hasOwnProperty(i)){D[i]=!0;var a="";r&&(a=" <"+r+" />");var s="";o&&(s=" The element was created by "+o+".")}}function d(e,t){return e!==e?t!==t:0===e&&0===t?1/e===1/t:e===t}function h(e){if(e._store){var t=e._store.originalProps,n=e.props;for(var r in n)n.hasOwnProperty(r)&&(t.hasOwnProperty(r)&&d(t[r],n[r])||(p(r,e),t[r]=n[r]))}}function f(e){if(null!=e.type){var t=_.getComponentClassForElement(e),n=t.displayName||t.name;t.propTypes&&c(n,t.propTypes,e.props,g.prop),"function"==typeof t.getDefaultProps}}var m=e(97),v=e(103),g=e(119),y=(e(118),e(81)),_=e(114),b=e(175),w=e(184),C=(e(203),{}),E={},x=/^\d+$/,D={},M={checkAndWarnForMutatedProps:h,createElement:function(e,t,n){var r=m.createElement.apply(this,arguments);if(null==r)return r;for(var o=2;o<arguments.length;o++)l(arguments[o],e);return f(r),r},createFactory:function(e){var t=M.createElement.bind(null,e);return t.type=e,t},cloneElement:function(e,t,n){for(var r=m.cloneElement.apply(this,arguments),o=2;o<arguments.length;o++)l(arguments[o],r.type);return f(r),r}};t.exports=M},{103:103,114:114,118:118,119:119,175:175,184:184,203:203,81:81,97:97}],99:[function(e,t,n){"use strict";function r(e){c[e]=!0}function o(e){delete c[e]}function i(e){return!!c[e]}var a,s=e(97),u=e(107),l=e(184),c={},p={injectEmptyComponent:function(e){a=s.createFactory(e)}},d=function(){};d.prototype.componentDidMount=function(){var e=u.get(this);e&&r(e._rootNodeID)},d.prototype.componentWillUnmount=function(){var e=u.get(this);e&&o(e._rootNodeID)},d.prototype.render=function(){return l(a),a()};var h=s.createElement(d),f={emptyElement:h,injection:p,isNullComponentID:i};t.exports=f},{107:107,184:184,97:97}],100:[function(e,t,n){"use strict";var r={guard:function(e,t){return e}};t.exports=r},{}],101:[function(e,t,n){"use strict";function r(e){o.enqueueEvents(e),o.processEventQueue()}var o=e(54),i={handleTopLevel:function(e,t,n,i){var a=o.extractEvents(e,t,n,i);r(a)}};t.exports=i},{54:54}],102:[function(e,t,n){"use strict";function r(e){var t=p.getID(e),n=c.getReactRootIDFromNodeID(t),r=p.findReactContainerForID(n),o=p.getFirstReactDOM(r);return o}function o(e,t){this.topLevelType=e,this.nativeEvent=t,this.ancestors=[]}function i(e){for(var t=p.getFirstReactDOM(f(e.nativeEvent))||window,n=t;n;)e.ancestors.push(n),n=r(n);for(var o=0,i=e.ancestors.length;o<i;o++){t=e.ancestors[o];var a=p.getID(t)||"";v._handleTopLevel(e.topLevelType,t,a,e.nativeEvent)}}function a(e){var t=m(window);e(t)}var s=e(53),u=e(58),l=e(66),c=e(106),p=e(111),d=e(133),h=e(65),f=e(174),m=e(180);h(o.prototype,{destructor:function(){this.topLevelType=null,this.nativeEvent=null,this.ancestors.length=0}}),l.addPoolingTo(o,l.twoArgumentPooler);var v={_enabled:!0,_handleTopLevel:null,WINDOW_HANDLE:u.canUseDOM?window:null,setHandleTopLevel:function(e){v._handleTopLevel=e},setEnabled:function(e){v._enabled=!!e},isEnabled:function(){return v._enabled},trapBubbledEvent:function(e,t,n){var r=n;return r?s.listen(r,t,v.dispatchEvent.bind(null,e)):null},trapCapturedEvent:function(e,t,n){var r=n;return r?s.capture(r,t,v.dispatchEvent.bind(null,e)):null},monitorScrollValue:function(e){var t=a.bind(null,e);s.listen(window,"scroll",t)},dispatchEvent:function(e,t){if(v._enabled){var n=o.getPooled(e,t);try{d.batchedUpdates(i,n)}finally{o.release(n)}}}};t.exports=v},{106:106,111:111,133:133,174:174,180:180,53:53,58:58,65:65,66:66}],103:[function(e,t,n){"use strict";var r=(e(97),e(203),{create:function(e){return e},extract:function(e){return e},extractIfFragment:function(e){return e}});t.exports=r},{203:203,97:97}],104:[function(e,t,n){"use strict";var r=e(47),o=e(54),i=e(77),a=e(74),s=e(99),u=e(69),l=e(114),c=e(84),p=e(116),d=e(125),h=e(133),f={Component:i.injection,Class:a.injection,DOMComponent:c.injection,DOMProperty:r.injection,EmptyComponent:s.injection,EventPluginHub:o.injection,EventEmitter:u.injection,NativeComponent:l.injection,Perf:p.injection,RootIndex:d.injection,Updates:h.injection};t.exports=f},{114:114,116:116,125:125,133:133,47:47,54:54,69:69,74:74,77:77,84:84,99:99}],105:[function(e,t,n){"use strict";function r(e){return i(document.documentElement,e)}var o=e(92),i=e(157),a=e(168),s=e(170),u={hasSelectionCapabilities:function(e){return e&&("INPUT"===e.nodeName&&"text"===e.type||"TEXTAREA"===e.nodeName||"true"===e.contentEditable)},getSelectionInformation:function(){var e=s();return{focusedElem:e,selectionRange:u.hasSelectionCapabilities(e)?u.getSelection(e):null}},restoreSelection:function(e){var t=s(),n=e.focusedElem,o=e.selectionRange;t!==n&&r(n)&&(u.hasSelectionCapabilities(n)&&u.setSelection(n,o),a(n))},getSelection:function(e){var t;if("selectionStart"in e)t={start:e.selectionStart,end:e.selectionEnd};else if(document.selection&&"INPUT"===e.nodeName){var n=document.selection.createRange();n.parentElement()===e&&(t={start:-n.moveStart("character",-e.value.length),end:-n.moveEnd("character",-e.value.length)})}else t=o.getOffsets(e);return t||{start:0,end:0}},setSelection:function(e,t){var n=t.start,r=t.end;if(void 0===r&&(r=n),"selectionStart"in e)e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length);else if(document.selection&&"INPUT"===e.nodeName){var i=e.createTextRange();i.collapse(!0),i.moveStart("character",n),i.moveEnd("character",r-n),i.select()}else o.setOffsets(e,t)}};t.exports=u},{157:157,168:168,170:170,92:92}],106:[function(e,t,n){"use strict";function r(e){return h+e.toString(36)}function o(e,t){return e.charAt(t)===h||t===e.length}function i(e){return""===e||e.charAt(0)===h&&e.charAt(e.length-1)!==h}function a(e,t){return 0===t.indexOf(e)&&o(t,e.length)}function s(e){return e?e.substr(0,e.lastIndexOf(h)):""}function u(e,t){if(d(i(e)&&i(t)),d(a(e,t)),e===t)return e;var n,r=e.length+f;for(n=r;n<t.length&&!o(t,n);n++);return t.substr(0,n)}function l(e,t){var n=Math.min(e.length,t.length);if(0===n)return"";for(var r=0,a=0;a<=n;a++)if(o(e,a)&&o(t,a))r=a;else if(e.charAt(a)!==t.charAt(a))break;var s=e.substr(0,r);return d(i(s)),s}function c(e,t,n,r,o,i){e=e||"",t=t||"",d(e!==t);var l=a(t,e);d(l||a(e,t));for(var c=0,p=l?s:u,h=e;;h=p(h,t)){var f;if(o&&h===e||i&&h===t||(f=n(h,l,r)),f===!1||h===t)break;d(c++<m)}}var p=e(125),d=e(184),h=".",f=h.length,m=100,v={createReactRootID:function(){return r(p.createReactRootIndex())},createReactID:function(e,t){return e+t},getReactRootIDFromNodeID:function(e){if(e&&e.charAt(0)===h&&e.length>1){var t=e.indexOf(h,1);return t>-1?e.substr(0,t):e}return null},traverseEnterLeave:function(e,t,n,r,o){var i=l(e,t);i!==e&&c(e,i,n,r,!1,!0),i!==t&&c(i,t,n,o,!0,!1)},traverseTwoPhase:function(e,t,n){e&&(c("",e,t,n,!0,!1),c(e,"",t,n,!1,!0))},traverseAncestors:function(e,t,n){c("",e,t,n,!0,!1)},_getFirstCommonAncestorID:l,_getNextDescendantID:u,isAncestorIDOf:a,SEPARATOR:h};t.exports=v},{125:125,184:184}],107:[function(e,t,n){"use strict";var r={remove:function(e){e._reactInternalInstance=void 0},get:function(e){return e._reactInternalInstance},has:function(e){return void 0!==e._reactInternalInstance},set:function(e,t){e._reactInternalInstance=t}};t.exports=r},{}],108:[function(e,t,n){"use strict";var r={currentlyMountingInstance:null,currentlyUnmountingInstance:null};t.exports=r},{}],109:[function(e,t,n){"use strict";function r(e,t){this.value=e,this.requestChange=t}function o(e){var t={value:void 0===e?i.PropTypes.any.isRequired:e.isRequired,requestChange:i.PropTypes.func.isRequired};return i.PropTypes.shape(t)}var i=e(67);r.PropTypes={link:o},t.exports=r},{67:67}],110:[function(e,t,n){"use strict";var r=e(153),o={CHECKSUM_ATTR_NAME:"data-react-checksum",addChecksumToMarkup:function(e){var t=r(e);return e.replace(">"," "+o.CHECKSUM_ATTR_NAME+'="'+t+'">')},canReuseMarkup:function(e,t){var n=t.getAttribute(o.CHECKSUM_ATTR_NAME);n=n&&parseInt(n,10);var i=r(e);return i===n}};t.exports=o},{153:153}],111:[function(e,t,n){"use strict";function r(e,t){for(var n=Math.min(e.length,t.length),r=0;r<n;r++)if(e.charAt(r)!==t.charAt(r))return r;return e.length===t.length?-1:n}function o(e){var t=N(e);return t&&B.getID(t)}function i(e){var t=a(e);if(t)if(L.hasOwnProperty(t)){var n=L[t];n!==e&&(O(!c(n,t)),L[t]=e)}else L[t]=e;return t}function a(e){return e&&e.getAttribute&&e.getAttribute(A)||""}function s(e,t){var n=a(e);n!==t&&delete L[n],e.setAttribute(A,t),L[t]=e}function u(e){return L.hasOwnProperty(e)&&c(L[e],e)||(L[e]=B.findReactNodeByID(e)),L[e]}function l(e){var t=w.get(e)._rootNodeID;return _.isNullComponentID(t)?null:(L.hasOwnProperty(t)&&c(L[t],t)||(L[t]=B.findReactNodeByID(t)),L[t])}function c(e,t){if(e){O(a(e)===t);var n=B.findReactContainerForID(t);if(n&&k(n,e))return!0}return!1}function p(e){delete L[e]}function d(e){var t=L[e];return!(!t||!c(t,e))&&void(V=t)}function h(e){V=null,b.traverseAncestors(e,d);var t=V;return V=null,t}function f(e,t,n,r,o){var i=x.mountComponent(e,t,r,S);e._isTopLevel=!0,B._mountImageIntoNode(i,n,o)}function m(e,t,n,r){var o=M.ReactReconcileTransaction.getPooled();o.perform(f,null,e,t,n,o,r),M.ReactReconcileTransaction.release(o)}var v=e(47),g=e(69),y=(e(81),e(97)),_=(e(98),e(99)),b=e(106),w=e(107),C=e(110),E=e(116),x=e(123),D=e(132),M=e(133),S=e(164),k=e(157),N=e(178),T=e(183),O=e(184),P=e(196),I=e(199),R=(e(203),b.SEPARATOR),A=v.ID_ATTRIBUTE_NAME,L={},U=1,F=9,j={},Y={},W=[],V=null,B={_instancesByReactRootID:j,scrollMonitor:function(e,t){t()},_updateRootComponent:function(e,t,n,r){return B.scrollMonitor(n,function(){D.enqueueElementInternal(e,t),r&&D.enqueueCallbackInternal(e,r)}),e},_registerComponent:function(e,t){O(t&&(t.nodeType===U||t.nodeType===F)),g.ensureScrollValueMonitoring();var n=B.registerContainer(t);return j[n]=e,n},_renderNewRootComponent:function(e,t,n){var r=T(e,null),o=B._registerComponent(r,t);return M.batchedUpdates(m,r,o,t,n),r},render:function(e,t,n){O(y.isValidElement(e));var r=j[o(t)];if(r){var i=r._currentElement;if(I(i,e))return B._updateRootComponent(r,e,t,n).getPublicInstance();B.unmountComponentAtNode(t)}var a=N(t),s=a&&B.isRenderedByReact(a),u=s&&!r,l=B._renderNewRootComponent(e,t,u).getPublicInstance();return n&&n.call(l),l},constructAndRenderComponent:function(e,t,n){var r=y.createElement(e,t);return B.render(r,n)},constructAndRenderComponentByID:function(e,t,n){var r=document.getElementById(n);return O(r),B.constructAndRenderComponent(e,t,r)},registerContainer:function(e){var t=o(e);return t&&(t=b.getReactRootIDFromNodeID(t)),t||(t=b.createReactRootID()),Y[t]=e,t},unmountComponentAtNode:function(e){O(e&&(e.nodeType===U||e.nodeType===F));var t=o(e),n=j[t];return!!n&&(B.unmountComponentFromNode(n,e),delete j[t],delete Y[t],!0)},unmountComponentFromNode:function(e,t){for(x.unmountComponent(e),t.nodeType===F&&(t=t.documentElement);t.lastChild;)t.removeChild(t.lastChild)},findReactContainerForID:function(e){var t=b.getReactRootIDFromNodeID(e),n=Y[t];return n},findReactNodeByID:function(e){var t=B.findReactContainerForID(e);return B.findComponentRoot(t,e)},isRenderedByReact:function(e){if(1!==e.nodeType)return!1;var t=B.getID(e);return!!t&&t.charAt(0)===R},getFirstReactDOM:function(e){for(var t=e;t&&t.parentNode!==t;){if(B.isRenderedByReact(t))return t;t=t.parentNode}return null},findComponentRoot:function(e,t){var n=W,r=0,o=h(t)||e;for(n[0]=o.firstChild,n.length=1;r<n.length;){for(var i,a=n[r++];a;){var s=B.getID(a);s?t===s?i=a:b.isAncestorIDOf(s,t)&&(n.length=r=0,n.push(a.firstChild)):n.push(a.firstChild),a=a.nextSibling}if(i)return n.length=0,i}n.length=0,O(!1)},_mountImageIntoNode:function(e,t,n){if(O(t&&(t.nodeType===U||t.nodeType===F)),n){var o=N(t);if(C.canReuseMarkup(e,o))return;var i=o.getAttribute(C.CHECKSUM_ATTR_NAME);o.removeAttribute(C.CHECKSUM_ATTR_NAME);var a=o.outerHTML;o.setAttribute(C.CHECKSUM_ATTR_NAME,i);var s=r(e,a);" (client) "+e.substring(s-20,s+20)+"\n (server) "+a.substring(s-20,s+20),O(t.nodeType!==F)}O(t.nodeType!==F),P(t,e)},getReactRootID:o,getID:i,setID:s,getNode:u,getNodeFromInstance:l,purgeID:p};E.measureMethods(B,"ReactMount",{_renderNewRootComponent:"_renderNewRootComponent",_mountImageIntoNode:"_mountImageIntoNode"}),t.exports=B},{106:106,107:107,110:110,116:116,123:123,132:132,133:133,157:157,164:164,178:178,183:183,184:184,196:196,199:199,203:203,47:47,69:69,81:81,97:97,98:98,99:99}],112:[function(e,t,n){"use strict";function r(e,t,n){f.push({parentID:e,parentNode:null,type:c.INSERT_MARKUP,markupIndex:m.push(t)-1,textContent:null,fromIndex:null,toIndex:n})}function o(e,t,n){f.push({parentID:e,parentNode:null,type:c.MOVE_EXISTING,markupIndex:null,textContent:null,fromIndex:t,toIndex:n})}function i(e,t){f.push({parentID:e,parentNode:null,type:c.REMOVE_NODE,markupIndex:null,textContent:null,fromIndex:t,toIndex:null})}function a(e,t){f.push({parentID:e,parentNode:null,type:c.TEXT_CONTENT,markupIndex:null,textContent:t,fromIndex:null,toIndex:null})}function s(){f.length&&(l.processChildrenUpdates(f,m),u())}function u(){f.length=0,m.length=0}var l=e(77),c=e(113),p=e(123),d=e(72),h=0,f=[],m=[],v={Mixin:{mountChildren:function(e,t,n){var r=d.instantiateChildren(e,t,n);this._renderedChildren=r;var o=[],i=0;for(var a in r)if(r.hasOwnProperty(a)){var s=r[a],u=this._rootNodeID+a,l=p.mountComponent(s,u,t,n);s._mountIndex=i,o.push(l),i++}return o},updateTextContent:function(e){h++;var t=!0;try{var n=this._renderedChildren;d.unmountChildren(n);for(var r in n)n.hasOwnProperty(r)&&this._unmountChildByName(n[r],r);this.setTextContent(e),t=!1}finally{h--,h||(t?u():s())}},updateChildren:function(e,t,n){h++;var r=!0;try{this._updateChildren(e,t,n),r=!1}finally{h--,h||(r?u():s())}},_updateChildren:function(e,t,n){var r=this._renderedChildren,o=d.updateChildren(r,e,t,n);if(this._renderedChildren=o,o||r){var i,a=0,s=0;for(i in o)if(o.hasOwnProperty(i)){var u=r&&r[i],l=o[i];u===l?(this.moveChild(u,s,a),a=Math.max(u._mountIndex,a),u._mountIndex=s):(u&&(a=Math.max(u._mountIndex,a),this._unmountChildByName(u,i)),this._mountChildByNameAtIndex(l,i,s,t,n)),s++}for(i in r)!r.hasOwnProperty(i)||o&&o.hasOwnProperty(i)||this._unmountChildByName(r[i],i)}},unmountChildren:function(){var e=this._renderedChildren;d.unmountChildren(e),this._renderedChildren=null},moveChild:function(e,t,n){e._mountIndex<n&&o(this._rootNodeID,e._mountIndex,t)},createChild:function(e,t){r(this._rootNodeID,t,e._mountIndex)},removeChild:function(e){i(this._rootNodeID,e._mountIndex)},setTextContent:function(e){a(this._rootNodeID,e)},_mountChildByNameAtIndex:function(e,t,n,r,o){var i=this._rootNodeID+t,a=p.mountComponent(e,i,r,o);e._mountIndex=n,this.createChild(e,a)},_unmountChildByName:function(e,t){this.removeChild(e),e._mountIndex=null}}};t.exports=v},{113:113,123:123,72:72,77:77}],113:[function(e,t,n){"use strict";var r=e(190),o=r({INSERT_MARKUP:null,MOVE_EXISTING:null,REMOVE_NODE:null,TEXT_CONTENT:null});t.exports=o},{190:190}],114:[function(e,t,n){"use strict";function r(e){if("function"==typeof e.type)return e.type;var t=e.type,n=p[t];return null==n&&(p[t]=n=l(t)),n}function o(e){return u(c),new c(e.type,e.props)}function i(e){return new d(e)}function a(e){return e instanceof d}var s=e(65),u=e(184),l=null,c=null,p={},d=null,h={injectGenericComponentClass:function(e){c=e},injectTextComponentClass:function(e){d=e},injectComponentClasses:function(e){s(p,e)},injectAutoWrapper:function(e){l=e}},f={getComponentClassForElement:r,createInternalComponent:o,createInstanceForText:i,isTextComponent:a,injection:h};t.exports=f},{184:184,65:65}],115:[function(e,t,n){"use strict";var r=e(184),o={isValidOwner:function(e){return!(!e||"function"!=typeof e.attachRef||"function"!=typeof e.detachRef)},addComponentAsRefTo:function(e,t,n){r(o.isValidOwner(n)),n.attachRef(t,e)},removeComponentAsRefFrom:function(e,t,n){r(o.isValidOwner(n)),n.getPublicInstance().refs[t]===e.getPublicInstance()&&n.detachRef(t)}};t.exports=o},{184:184}],116:[function(e,t,n){"use strict";function r(e,t,n){return n}var o={enableMeasure:!1,storedMeasure:r,measureMethods:function(e,t,n){},measure:function(e,t,n){return n},injection:{injectMeasure:function(e){o.storedMeasure=e}}};t.exports=o},{}],117:[function(e,t,n){"use strict";function r(e){return function(t,n,r){t.hasOwnProperty(n)?t[n]=e(t[n],r):t[n]=r}}function o(e,t){for(var n in t)if(t.hasOwnProperty(n)){var r=l[n];r&&l.hasOwnProperty(n)?r(e,n,t[n]):e.hasOwnProperty(n)||(e[n]=t[n])}return e}var i=e(65),a=e(163),s=e(189),u=r(function(e,t){return i({},t,e)}),l={children:a,className:r(s),style:u},c={mergeProps:function(e,t){return o(i({},e),t)}};t.exports=c},{163:163,189:189,65:65}],118:[function(e,t,n){"use strict";var r={};t.exports=r},{}],119:[function(e,t,n){"use strict";var r=e(190),o=r({prop:null,context:null,childContext:null});t.exports=o},{190:190}],120:[function(e,t,n){"use strict";function r(e){function t(t,n,r,o,i){if(o=o||w,null==n[r]){var a=_[i];return t?Error("Required "+a+" `"+r+"` was not specified in "+("`"+o+"`.")):null}return e(n,r,o,i)}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n}function o(e){function t(t,n,r,o){var i=t[n],a=m(i);if(a!==e){var s=_[o],u=v(i);return Error("Invalid "+s+" `"+n+"` of type `"+u+"` "+("supplied to `"+r+"`, expected `"+e+"`."))}return null}return r(t)}function i(){return r(b.thatReturns(null))}function a(e){function t(t,n,r,o){var i=t[n];if(!Array.isArray(i)){var a=_[o],s=m(i);return Error("Invalid "+a+" `"+n+"` of type "+("`"+s+"` supplied to `"+r+"`, expected an array."))}for(var u=0;u<i.length;u++){var l=e(i,u,r,o);if(l instanceof Error)return l}return null}return r(t)}function s(){function e(e,t,n,r){if(!g.isValidElement(e[t])){var o=_[r];return Error("Invalid "+o+" `"+t+"` supplied to "+("`"+n+"`, expected a ReactElement."))}return null}return r(e)}function u(e){function t(t,n,r,o){if(!(t[n]instanceof e)){var i=_[o],a=e.name||w;return Error("Invalid "+i+" `"+n+"` supplied to "+("`"+r+"`, expected instance of `"+a+"`."))}return null}return r(t)}function l(e){function t(t,n,r,o){for(var i=t[n],a=0;a<e.length;a++)if(i===e[a])return null;var s=_[o],u=JSON.stringify(e);return Error("Invalid "+s+" `"+n+"` of value `"+i+"` "+("supplied to `"+r+"`, expected one of "+u+"."))}return r(t)}function c(e){function t(t,n,r,o){var i=t[n],a=m(i);if("object"!==a){var s=_[o];return Error("Invalid "+s+" `"+n+"` of type "+("`"+a+"` supplied to `"+r+"`, expected an object."))}for(var u in i)if(i.hasOwnProperty(u)){var l=e(i,u,r,o);if(l instanceof Error)return l}return null}return r(t)}function p(e){function t(t,n,r,o){for(var i=0;i<e.length;i++){var a=e[i];if(null==a(t,n,r,o))return null}var s=_[o];return Error("Invalid "+s+" `"+n+"` supplied to "+("`"+r+"`."))}return r(t)}function d(){function e(e,t,n,r){if(!f(e[t])){var o=_[r];return Error("Invalid "+o+" `"+t+"` supplied to "+("`"+n+"`, expected a ReactNode."))}return null}return r(e)}function h(e){function t(t,n,r,o){var i=t[n],a=m(i);if("object"!==a){var s=_[o];return Error("Invalid "+s+" `"+n+"` of type `"+a+"` "+("supplied to `"+r+"`, expected `object`."))}for(var u in e){var l=e[u];if(l){var c=l(i,u,r,o);if(c)return c}}return null}return r(t)}function f(e){switch(typeof e){case"number":case"string":case"undefined":return!0;case"boolean":return!e;case"object":if(Array.isArray(e))return e.every(f);if(null===e||g.isValidElement(e))return!0;e=y.extractIfFragment(e);for(var t in e)if(!f(e[t]))return!1;return!0;default:return!1}}function m(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":t}function v(e){var t=m(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}var g=e(97),y=e(103),_=e(118),b=e(163),w="<<anonymous>>",C=s(),E=d(),x={array:o("array"),bool:o("boolean"),func:o("function"),number:o("number"),object:o("object"),string:o("string"),any:i(),arrayOf:a,element:C,instanceOf:u,node:E,objectOf:c,oneOf:l,oneOfType:p,shape:h};t.exports=x},{103:103,118:118,163:163,97:97}],121:[function(e,t,n){"use strict";function r(){this.listenersToPut=[]}var o=e(66),i=e(69),a=e(65);a(r.prototype,{enqueuePutListener:function(e,t,n){this.listenersToPut.push({rootNodeID:e,propKey:t,propValue:n})},putListeners:function(){for(var e=0;e<this.listenersToPut.length;e++){var t=this.listenersToPut[e];i.putListener(t.rootNodeID,t.propKey,t.propValue)}},reset:function(){this.listenersToPut.length=0},destructor:function(){this.reset()}}),o.addPoolingTo(r),t.exports=r},{65:65,66:66,69:69}],122:[function(e,t,n){"use strict";function r(){this.reinitializeTransaction(),this.renderToStaticMarkup=!1,this.reactMountReady=o.getPooled(null),this.putListenerQueue=u.getPooled()}var o=e(43),i=e(66),a=e(69),s=e(105),u=e(121),l=e(150),c=e(65),p={initialize:s.getSelectionInformation,close:s.restoreSelection},d={initialize:function(){var e=a.isEnabled();return a.setEnabled(!1),e},close:function(e){a.setEnabled(e)}},h={initialize:function(){this.reactMountReady.reset()},close:function(){this.reactMountReady.notifyAll()}},f={initialize:function(){this.putListenerQueue.reset()},close:function(){this.putListenerQueue.putListeners()}},m=[f,p,d,h],v={getTransactionWrappers:function(){return m},getReactMountReady:function(){return this.reactMountReady},getPutListenerQueue:function(){return this.putListenerQueue},destructor:function(){o.release(this.reactMountReady),this.reactMountReady=null,u.release(this.putListenerQueue),this.putListenerQueue=null}};c(r.prototype,l.Mixin,v),i.addPoolingTo(r),t.exports=r},{105:105,121:121,150:150,43:43,65:65,66:66,69:69}],123:[function(e,t,n){"use strict";function r(){o.attachRefs(this,this._currentElement)}var o=e(124),i=(e(98),{mountComponent:function(e,t,n,o){var i=e.mountComponent(t,n,o);return n.getReactMountReady().enqueue(r,e),i},unmountComponent:function(e){o.detachRefs(e,e._currentElement),e.unmountComponent()},receiveComponent:function(e,t,n,i){var a=e._currentElement;if(t!==a||null==t._owner){var s=o.shouldUpdateRefs(a,t);s&&o.detachRefs(e,a),e.receiveComponent(t,n,i),s&&n.getReactMountReady().enqueue(r,e)}},performUpdateIfNecessary:function(e,t){e.performUpdateIfNecessary(t)}});t.exports=i},{124:124,98:98}],124:[function(e,t,n){"use strict";function r(e,t,n){"function"==typeof e?e(t.getPublicInstance()):i.addComponentAsRefTo(t,e,n)}function o(e,t,n){"function"==typeof e?e(null):i.removeComponentAsRefFrom(t,e,n)}var i=e(115),a={};a.attachRefs=function(e,t){var n=t.ref;null!=n&&r(n,e,t._owner)},a.shouldUpdateRefs=function(e,t){return t._owner!==e._owner||t.ref!==e.ref},a.detachRefs=function(e,t){var n=t.ref;null!=n&&o(n,e,t._owner)},t.exports=a},{115:115
}],125:[function(e,t,n){"use strict";var r={injectCreateReactRootIndex:function(e){o.createReactRootIndex=e}},o={createReactRootIndex:null,injection:r};t.exports=o},{}],126:[function(e,t,n){"use strict";function r(e){p(i.isValidElement(e));var t;try{var n=a.createReactRootID();return t=u.getPooled(!1),t.perform(function(){var r=c(e,null),o=r.mountComponent(n,t,l);return s.addChecksumToMarkup(o)},null)}finally{u.release(t)}}function o(e){p(i.isValidElement(e));var t;try{var n=a.createReactRootID();return t=u.getPooled(!0),t.perform(function(){var r=c(e,null);return r.mountComponent(n,t,l)},null)}finally{u.release(t)}}var i=e(97),a=e(106),s=e(110),u=e(127),l=e(164),c=e(183),p=e(184);t.exports={renderToString:r,renderToStaticMarkup:o}},{106:106,110:110,127:127,164:164,183:183,184:184,97:97}],127:[function(e,t,n){"use strict";function r(e){this.reinitializeTransaction(),this.renderToStaticMarkup=e,this.reactMountReady=i.getPooled(null),this.putListenerQueue=a.getPooled()}var o=e(66),i=e(43),a=e(121),s=e(150),u=e(65),l=e(163),c={initialize:function(){this.reactMountReady.reset()},close:l},p={initialize:function(){this.putListenerQueue.reset()},close:l},d=[p,c],h={getTransactionWrappers:function(){return d},getReactMountReady:function(){return this.reactMountReady},getPutListenerQueue:function(){return this.putListenerQueue},destructor:function(){i.release(this.reactMountReady),this.reactMountReady=null,a.release(this.putListenerQueue),this.putListenerQueue=null}};u(r.prototype,s.Mixin,h),o.addPoolingTo(r),t.exports=r},{121:121,150:150,163:163,43:43,65:65,66:66}],128:[function(e,t,n){"use strict";function r(e,t){var n={};return function(r){n[t]=r,e.setState(n)}}var o={createStateSetter:function(e,t){return function(n,r,o,i,a,s){var u=t.call(e,n,r,o,i,a,s);u&&e.setState(u)}},createStateKeySetter:function(e,t){var n=e.__keySetters||(e.__keySetters={});return n[t]||(n[t]=r(e,t))}};o.Mixin={createStateSetter:function(e){return o.createStateSetter(this,e)},createStateKeySetter:function(e){return o.createStateKeySetter(this,e)}},t.exports=o},{}],129:[function(e,t,n){"use strict";var r=e(73),o=e(103),i={getChildMapping:function(e){return e?o.extract(r.map(e,function(e){return e})):e},mergeChildMappings:function(e,t){function n(n){return t.hasOwnProperty(n)?t[n]:e[n]}e=e||{},t=t||{};var r={},o=[];for(var i in e)t.hasOwnProperty(i)?o.length&&(r[i]=o,o=[]):o.push(i);var a,s={};for(var u in t){if(r.hasOwnProperty(u))for(a=0;a<r[u].length;a++){var l=r[u][a];s[r[u][a]]=n(l)}s[u]=n(u)}for(a=0;a<o.length;a++)s[o[a]]=n(o[a]);return s}};t.exports=i},{103:103,73:73}],130:[function(e,t,n){"use strict";function r(){var e=document.createElement("div"),t=e.style;"AnimationEvent"in window||delete s.animationend.animation,"TransitionEvent"in window||delete s.transitionend.transition;for(var n in s){var r=s[n];for(var o in r)if(o in t){u.push(r[o]);break}}}function o(e,t,n){e.addEventListener(t,n,!1)}function i(e,t,n){e.removeEventListener(t,n,!1)}var a=e(58),s={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},u=[];a.canUseDOM&&r();var l={addEndEventListener:function(e,t){return 0===u.length?void window.setTimeout(t,0):void u.forEach(function(n){o(e,n,t)})},removeEndEventListener:function(e,t){0!==u.length&&u.forEach(function(n){i(e,n,t)})}};t.exports=l},{58:58}],131:[function(e,t,n){"use strict";var r=e(67),o=e(129),i=e(65),a=e(156),s=e(163),u=r.createClass({displayName:"ReactTransitionGroup",propTypes:{component:r.PropTypes.any,childFactory:r.PropTypes.func},getDefaultProps:function(){return{component:"span",childFactory:s.thatReturnsArgument}},getInitialState:function(){return{children:o.getChildMapping(this.props.children)}},componentWillMount:function(){this.currentlyTransitioningKeys={},this.keysToEnter=[],this.keysToLeave=[]},componentDidMount:function(){var e=this.state.children;for(var t in e)e[t]&&this.performAppear(t)},componentWillReceiveProps:function(e){var t=o.getChildMapping(e.children),n=this.state.children;this.setState({children:o.mergeChildMappings(n,t)});var r;for(r in t){var i=n&&n.hasOwnProperty(r);!t[r]||i||this.currentlyTransitioningKeys[r]||this.keysToEnter.push(r)}for(r in n){var a=t&&t.hasOwnProperty(r);!n[r]||a||this.currentlyTransitioningKeys[r]||this.keysToLeave.push(r)}},componentDidUpdate:function(){var e=this.keysToEnter;this.keysToEnter=[],e.forEach(this.performEnter);var t=this.keysToLeave;this.keysToLeave=[],t.forEach(this.performLeave)},performAppear:function(e){this.currentlyTransitioningKeys[e]=!0;var t=this.refs[e];t.componentWillAppear?t.componentWillAppear(this._handleDoneAppearing.bind(this,e)):this._handleDoneAppearing(e)},_handleDoneAppearing:function(e){var t=this.refs[e];t.componentDidAppear&&t.componentDidAppear(),delete this.currentlyTransitioningKeys[e];var n=o.getChildMapping(this.props.children);n&&n.hasOwnProperty(e)||this.performLeave(e)},performEnter:function(e){this.currentlyTransitioningKeys[e]=!0;var t=this.refs[e];t.componentWillEnter?t.componentWillEnter(this._handleDoneEntering.bind(this,e)):this._handleDoneEntering(e)},_handleDoneEntering:function(e){var t=this.refs[e];t.componentDidEnter&&t.componentDidEnter(),delete this.currentlyTransitioningKeys[e];var n=o.getChildMapping(this.props.children);n&&n.hasOwnProperty(e)||this.performLeave(e)},performLeave:function(e){this.currentlyTransitioningKeys[e]=!0;var t=this.refs[e];t.componentWillLeave?t.componentWillLeave(this._handleDoneLeaving.bind(this,e)):this._handleDoneLeaving(e)},_handleDoneLeaving:function(e){var t=this.refs[e];t.componentDidLeave&&t.componentDidLeave(),delete this.currentlyTransitioningKeys[e];var n=o.getChildMapping(this.props.children);if(n&&n.hasOwnProperty(e))this.performEnter(e);else{var r=i({},this.state.children);delete r[e],this.setState({children:r})}},render:function(){var e=[];for(var t in this.state.children){var n=this.state.children[t];n&&e.push(a(this.props.childFactory(n),{ref:t,key:t}))}return r.createElement(this.props.component,this.props,e)}});t.exports=u},{129:129,156:156,163:163,65:65,67:67}],132:[function(e,t,n){"use strict";function r(e){e!==i.currentlyMountingInstance&&l.enqueueUpdate(e)}function o(e,t){p(null==a.current);var n=u.get(e);return n?n===i.currentlyUnmountingInstance?null:n:null}var i=e(108),a=e(81),s=e(97),u=e(107),l=e(133),c=e(65),p=e(184),d=(e(203),{enqueueCallback:function(e,t){p("function"==typeof t);var n=o(e);return n&&n!==i.currentlyMountingInstance?(n._pendingCallbacks?n._pendingCallbacks.push(t):n._pendingCallbacks=[t],void r(n)):null},enqueueCallbackInternal:function(e,t){p("function"==typeof t),e._pendingCallbacks?e._pendingCallbacks.push(t):e._pendingCallbacks=[t],r(e)},enqueueForceUpdate:function(e){var t=o(e,"forceUpdate");t&&(t._pendingForceUpdate=!0,r(t))},enqueueReplaceState:function(e,t){var n=o(e,"replaceState");n&&(n._pendingStateQueue=[t],n._pendingReplaceState=!0,r(n))},enqueueSetState:function(e,t){var n=o(e,"setState");if(n){var i=n._pendingStateQueue||(n._pendingStateQueue=[]);i.push(t),r(n)}},enqueueSetProps:function(e,t){var n=o(e,"setProps");if(n){p(n._isTopLevel);var i=n._pendingElement||n._currentElement,a=c({},i.props,t);n._pendingElement=s.cloneAndReplaceProps(i,a),r(n)}},enqueueReplaceProps:function(e,t){var n=o(e,"replaceProps");if(n){p(n._isTopLevel);var i=n._pendingElement||n._currentElement;n._pendingElement=s.cloneAndReplaceProps(i,t),r(n)}},enqueueElementInternal:function(e,t){e._pendingElement=t,r(e)}});t.exports=d},{107:107,108:108,133:133,184:184,203:203,65:65,81:81,97:97}],133:[function(e,t,n){"use strict";function r(){v(M.ReactReconcileTransaction&&b)}function o(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=c.getPooled(),this.reconcileTransaction=M.ReactReconcileTransaction.getPooled()}function i(e,t,n,o,i){r(),b.batchedUpdates(e,t,n,o,i)}function a(e,t){return e._mountOrder-t._mountOrder}function s(e){var t=e.dirtyComponentsLength;v(t===g.length),g.sort(a);for(var n=0;n<t;n++){var r=g[n],o=r._pendingCallbacks;if(r._pendingCallbacks=null,h.performUpdateIfNecessary(r,e.reconcileTransaction),o)for(var i=0;i<o.length;i++)e.callbackQueue.enqueue(o[i],r.getPublicInstance())}}function u(e){return r(),b.isBatchingUpdates?void g.push(e):void b.batchedUpdates(u,e)}function l(e,t){v(b.isBatchingUpdates),y.enqueue(e,t),_=!0}var c=e(43),p=e(66),d=(e(81),e(116)),h=e(123),f=e(150),m=e(65),v=e(184),g=(e(203),[]),y=c.getPooled(),_=!1,b=null,w={initialize:function(){this.dirtyComponentsLength=g.length},close:function(){this.dirtyComponentsLength!==g.length?(g.splice(0,this.dirtyComponentsLength),x()):g.length=0}},C={initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}},E=[w,C];m(o.prototype,f.Mixin,{getTransactionWrappers:function(){return E},destructor:function(){this.dirtyComponentsLength=null,c.release(this.callbackQueue),this.callbackQueue=null,M.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(e,t,n){return f.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n)}}),p.addPoolingTo(o);var x=function(){for(;g.length||_;){if(g.length){var e=o.getPooled();e.perform(s,null,e),o.release(e)}if(_){_=!1;var t=y;y=c.getPooled(),t.notifyAll(),c.release(t)}}};x=d.measure("ReactUpdates","flushBatchedUpdates",x);var D={injectReconcileTransaction:function(e){v(e),M.ReactReconcileTransaction=e},injectBatchingStrategy:function(e){v(e),v("function"==typeof e.batchedUpdates),v("boolean"==typeof e.isBatchingUpdates),b=e}},M={ReactReconcileTransaction:null,batchedUpdates:i,enqueueUpdate:u,flushBatchedUpdates:x,injection:D,asap:l};t.exports=M},{116:116,123:123,150:150,184:184,203:203,43:43,65:65,66:66,81:81}],134:[function(e,t,n){"use strict";var r=e(61),o=e(67),i=e(78),a=e(70),s=e(103),u=e(131),l=e(133),c=e(161),p=e(156),d=e(202);o.addons={CSSTransitionGroup:a,LinkedStateMixin:r,PureRenderMixin:i,TransitionGroup:u,batchedUpdates:l.batchedUpdates,classSet:c,cloneWithProps:p,createFragment:s.create,update:d},t.exports=o},{103:103,131:131,133:133,156:156,161:161,202:202,61:61,67:67,70:70,78:78}],135:[function(e,t,n){"use strict";var r=e(47),o=r.injection.MUST_USE_ATTRIBUTE,i={Properties:{clipPath:o,cx:o,cy:o,d:o,dx:o,dy:o,fill:o,fillOpacity:o,fontFamily:o,fontSize:o,fx:o,fy:o,gradientTransform:o,gradientUnits:o,markerEnd:o,markerMid:o,markerStart:o,offset:o,opacity:o,patternContentUnits:o,patternUnits:o,points:o,preserveAspectRatio:o,r:o,rx:o,ry:o,spreadMethod:o,stopColor:o,stopOpacity:o,stroke:o,strokeDasharray:o,strokeLinecap:o,strokeOpacity:o,strokeWidth:o,textAnchor:o,transform:o,version:o,viewBox:o,x1:o,x2:o,x:o,y1:o,y2:o,y:o},DOMAttributeNames:{clipPath:"clip-path",fillOpacity:"fill-opacity",fontFamily:"font-family",fontSize:"font-size",gradientTransform:"gradientTransform",gradientUnits:"gradientUnits",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",patternContentUnits:"patternContentUnits",patternUnits:"patternUnits",preserveAspectRatio:"preserveAspectRatio",spreadMethod:"spreadMethod",stopColor:"stop-color",stopOpacity:"stop-opacity",strokeDasharray:"stroke-dasharray",strokeLinecap:"stroke-linecap",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",textAnchor:"text-anchor",viewBox:"viewBox"}};t.exports=i},{47:47}],136:[function(e,t,n){"use strict";function r(e){if("selectionStart"in e&&s.hasSelectionCapabilities(e))return{start:e.selectionStart,end:e.selectionEnd};if(window.getSelection){var t=window.getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}if(document.selection){var n=document.selection.createRange();return{parentElement:n.parentElement(),text:n.text,top:n.boundingTop,left:n.boundingLeft}}}function o(e){if(y||null==m||m!==l())return null;var t=r(m);if(!g||!d(g,t)){g=t;var n=u.getPooled(f.select,v,e);return n.type="select",n.target=m,a.accumulateTwoPhaseDispatches(n),n}}var i=e(52),a=e(57),s=e(105),u=e(142),l=e(170),c=e(187),p=e(191),d=e(198),h=i.topLevelTypes,f={select:{phasedRegistrationNames:{bubbled:p({onSelect:null}),captured:p({onSelectCapture:null})},dependencies:[h.topBlur,h.topContextMenu,h.topFocus,h.topKeyDown,h.topMouseDown,h.topMouseUp,h.topSelectionChange]}},m=null,v=null,g=null,y=!1,_={eventTypes:f,extractEvents:function(e,t,n,r){switch(e){case h.topFocus:(c(t)||"true"===t.contentEditable)&&(m=t,v=n,g=null);break;case h.topBlur:m=null,v=null,g=null;break;case h.topMouseDown:y=!0;break;case h.topContextMenu:case h.topMouseUp:return y=!1,o(r);case h.topSelectionChange:case h.topKeyDown:case h.topKeyUp:return o(r)}}};t.exports=_},{105:105,142:142,170:170,187:187,191:191,198:198,52:52,57:57}],137:[function(e,t,n){"use strict";var r=Math.pow(2,53),o={createReactRootIndex:function(){return Math.ceil(Math.random()*r)}};t.exports=o},{}],138:[function(e,t,n){"use strict";var r=e(52),o=e(56),i=e(57),a=e(139),s=e(142),u=e(143),l=e(145),c=e(146),p=e(141),d=e(147),h=e(148),f=e(149),m=e(171),v=e(184),g=e(191),y=(e(203),r.topLevelTypes),_={blur:{phasedRegistrationNames:{bubbled:g({onBlur:!0}),captured:g({onBlurCapture:!0})}},click:{phasedRegistrationNames:{bubbled:g({onClick:!0}),captured:g({onClickCapture:!0})}},contextMenu:{phasedRegistrationNames:{bubbled:g({onContextMenu:!0}),captured:g({onContextMenuCapture:!0})}},copy:{phasedRegistrationNames:{bubbled:g({onCopy:!0}),captured:g({onCopyCapture:!0})}},cut:{phasedRegistrationNames:{bubbled:g({onCut:!0}),captured:g({onCutCapture:!0})}},doubleClick:{phasedRegistrationNames:{bubbled:g({onDoubleClick:!0}),captured:g({onDoubleClickCapture:!0})}},drag:{phasedRegistrationNames:{bubbled:g({onDrag:!0}),captured:g({onDragCapture:!0})}},dragEnd:{phasedRegistrationNames:{bubbled:g({onDragEnd:!0}),captured:g({onDragEndCapture:!0})}},dragEnter:{phasedRegistrationNames:{bubbled:g({onDragEnter:!0}),captured:g({onDragEnterCapture:!0})}},dragExit:{phasedRegistrationNames:{bubbled:g({onDragExit:!0}),captured:g({onDragExitCapture:!0})}},dragLeave:{phasedRegistrationNames:{bubbled:g({onDragLeave:!0}),captured:g({onDragLeaveCapture:!0})}},dragOver:{phasedRegistrationNames:{bubbled:g({onDragOver:!0}),captured:g({onDragOverCapture:!0})}},dragStart:{phasedRegistrationNames:{bubbled:g({onDragStart:!0}),captured:g({onDragStartCapture:!0})}},drop:{phasedRegistrationNames:{bubbled:g({onDrop:!0}),captured:g({onDropCapture:!0})}},focus:{phasedRegistrationNames:{bubbled:g({onFocus:!0}),captured:g({onFocusCapture:!0})}},input:{phasedRegistrationNames:{bubbled:g({onInput:!0}),captured:g({onInputCapture:!0})}},keyDown:{phasedRegistrationNames:{bubbled:g({onKeyDown:!0}),captured:g({onKeyDownCapture:!0})}},keyPress:{phasedRegistrationNames:{bubbled:g({onKeyPress:!0}),captured:g({onKeyPressCapture:!0})}},keyUp:{phasedRegistrationNames:{bubbled:g({onKeyUp:!0}),captured:g({onKeyUpCapture:!0})}},load:{phasedRegistrationNames:{bubbled:g({onLoad:!0}),captured:g({onLoadCapture:!0})}},error:{phasedRegistrationNames:{bubbled:g({onError:!0}),captured:g({onErrorCapture:!0})}},mouseDown:{phasedRegistrationNames:{bubbled:g({onMouseDown:!0}),captured:g({onMouseDownCapture:!0})}},mouseMove:{phasedRegistrationNames:{bubbled:g({onMouseMove:!0}),captured:g({onMouseMoveCapture:!0})}},mouseOut:{phasedRegistrationNames:{bubbled:g({onMouseOut:!0}),captured:g({onMouseOutCapture:!0})}},mouseOver:{phasedRegistrationNames:{bubbled:g({onMouseOver:!0}),captured:g({onMouseOverCapture:!0})}},mouseUp:{phasedRegistrationNames:{bubbled:g({onMouseUp:!0}),captured:g({onMouseUpCapture:!0})}},paste:{phasedRegistrationNames:{bubbled:g({onPaste:!0}),captured:g({onPasteCapture:!0})}},reset:{phasedRegistrationNames:{bubbled:g({onReset:!0}),captured:g({onResetCapture:!0})}},scroll:{phasedRegistrationNames:{bubbled:g({onScroll:!0}),captured:g({onScrollCapture:!0})}},submit:{phasedRegistrationNames:{bubbled:g({onSubmit:!0}),captured:g({onSubmitCapture:!0})}},touchCancel:{phasedRegistrationNames:{bubbled:g({onTouchCancel:!0}),captured:g({onTouchCancelCapture:!0})}},touchEnd:{phasedRegistrationNames:{bubbled:g({onTouchEnd:!0}),captured:g({onTouchEndCapture:!0})}},touchMove:{phasedRegistrationNames:{bubbled:g({onTouchMove:!0}),captured:g({onTouchMoveCapture:!0})}},touchStart:{phasedRegistrationNames:{bubbled:g({onTouchStart:!0}),captured:g({onTouchStartCapture:!0})}},wheel:{phasedRegistrationNames:{bubbled:g({onWheel:!0}),captured:g({onWheelCapture:!0})}}},b={topBlur:_.blur,topClick:_.click,topContextMenu:_.contextMenu,topCopy:_.copy,topCut:_.cut,topDoubleClick:_.doubleClick,topDrag:_.drag,topDragEnd:_.dragEnd,topDragEnter:_.dragEnter,topDragExit:_.dragExit,topDragLeave:_.dragLeave,topDragOver:_.dragOver,topDragStart:_.dragStart,topDrop:_.drop,topError:_.error,topFocus:_.focus,topInput:_.input,topKeyDown:_.keyDown,topKeyPress:_.keyPress,topKeyUp:_.keyUp,topLoad:_.load,topMouseDown:_.mouseDown,topMouseMove:_.mouseMove,topMouseOut:_.mouseOut,topMouseOver:_.mouseOver,topMouseUp:_.mouseUp,topPaste:_.paste,topReset:_.reset,topScroll:_.scroll,topSubmit:_.submit,topTouchCancel:_.touchCancel,topTouchEnd:_.touchEnd,topTouchMove:_.touchMove,topTouchStart:_.touchStart,topWheel:_.wheel};for(var w in b)b[w].dependencies=[w];var C={eventTypes:_,executeDispatch:function(e,t,n){var r=o.executeDispatch(e,t,n);r===!1&&(e.stopPropagation(),e.preventDefault())},extractEvents:function(e,t,n,r){var o=b[e];if(!o)return null;var g;switch(e){case y.topInput:case y.topLoad:case y.topError:case y.topReset:case y.topSubmit:g=s;break;case y.topKeyPress:if(0===m(r))return null;case y.topKeyDown:case y.topKeyUp:g=l;break;case y.topBlur:case y.topFocus:g=u;break;case y.topClick:if(2===r.button)return null;case y.topContextMenu:case y.topDoubleClick:case y.topMouseDown:case y.topMouseMove:case y.topMouseOut:case y.topMouseOver:case y.topMouseUp:g=c;break;case y.topDrag:case y.topDragEnd:case y.topDragEnter:case y.topDragExit:case y.topDragLeave:case y.topDragOver:case y.topDragStart:case y.topDrop:g=p;break;case y.topTouchCancel:case y.topTouchEnd:case y.topTouchMove:case y.topTouchStart:g=d;break;case y.topScroll:g=h;break;case y.topWheel:g=f;break;case y.topCopy:case y.topCut:case y.topPaste:g=a}v(g);var _=g.getPooled(o,n,r);return i.accumulateTwoPhaseDispatches(_),_}};t.exports=C},{139:139,141:141,142:142,143:143,145:145,146:146,147:147,148:148,149:149,171:171,184:184,191:191,203:203,52:52,56:56,57:57}],139:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(142),i={clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}};o.augmentClass(r,i),t.exports=r},{142:142}],140:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(142),i={data:null};o.augmentClass(r,i),t.exports=r},{142:142}],141:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(146),i={dataTransfer:null};o.augmentClass(r,i),t.exports=r},{146:146}],142:[function(e,t,n){"use strict";function r(e,t,n){this.dispatchConfig=e,this.dispatchMarker=t,this.nativeEvent=n;var r=this.constructor.Interface;for(var o in r)if(r.hasOwnProperty(o)){var i=r[o];i?this[o]=i(n):this[o]=n[o]}var s=null!=n.defaultPrevented?n.defaultPrevented:n.returnValue===!1;s?this.isDefaultPrevented=a.thatReturnsTrue:this.isDefaultPrevented=a.thatReturnsFalse,this.isPropagationStopped=a.thatReturnsFalse}var o=e(66),i=e(65),a=e(163),s=e(174),u={type:null,target:s,currentTarget:a.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};i(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e.preventDefault?e.preventDefault():e.returnValue=!1,this.isDefaultPrevented=a.thatReturnsTrue},stopPropagation:function(){var e=this.nativeEvent;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,this.isPropagationStopped=a.thatReturnsTrue},persist:function(){this.isPersistent=a.thatReturnsTrue},isPersistent:a.thatReturnsFalse,destructor:function(){var e=this.constructor.Interface;for(var t in e)this[t]=null;this.dispatchConfig=null,this.dispatchMarker=null,this.nativeEvent=null}}),r.Interface=u,r.augmentClass=function(e,t){var n=this,r=Object.create(n.prototype);i(r,e.prototype),e.prototype=r,e.prototype.constructor=e,e.Interface=i({},n.Interface,t),e.augmentClass=n.augmentClass,o.addPoolingTo(e,o.threeArgumentPooler)},o.addPoolingTo(r,o.threeArgumentPooler),t.exports=r},{163:163,174:174,65:65,66:66}],143:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(148),i={relatedTarget:null};o.augmentClass(r,i),t.exports=r},{148:148}],144:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(142),i={data:null};o.augmentClass(r,i),t.exports=r},{142:142}],145:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(148),i=e(171),a=e(172),s=e(173),u={key:a,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:s,charCode:function(e){return"keypress"===e.type?i(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?i(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}};o.augmentClass(r,u),t.exports=r},{148:148,171:171,172:172,173:173}],146:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(148),i=e(151),a=e(173),s={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:a,button:function(e){var t=e.button;return"which"in e?t:2===t?2:4===t?1:0},buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},pageX:function(e){return"pageX"in e?e.pageX:e.clientX+i.currentScrollLeft},pageY:function(e){return"pageY"in e?e.pageY:e.clientY+i.currentScrollTop}};o.augmentClass(r,s),t.exports=r},{148:148,151:151,173:173}],147:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(148),i=e(173),a={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:i};o.augmentClass(r,a),t.exports=r},{148:148,173:173}],148:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(142),i=e(174),a={view:function(e){if(e.view)return e.view;var t=i(e);if(null!=t&&t.window===t)return t;var n=t.ownerDocument;return n?n.defaultView||n.parentWindow:window},detail:function(e){return e.detail||0}};o.augmentClass(r,a),t.exports=r},{142:142,174:174}],149:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e(146),i={deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null};o.augmentClass(r,i),t.exports=r},{146:146}],150:[function(e,t,n){"use strict";var r=e(184),o={reinitializeTransaction:function(){this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){return!!this._isInTransaction},perform:function(e,t,n,o,i,a,s,u){r(!this.isInTransaction());var l,c;try{this._isInTransaction=!0,l=!0,this.initializeAll(0),c=e.call(t,n,o,i,a,s,u),l=!1}finally{try{if(l)try{this.closeAll(0)}catch(e){}else this.closeAll(0)}finally{this._isInTransaction=!1}}return c},initializeAll:function(e){for(var t=this.transactionWrappers,n=e;n<t.length;n++){var r=t[n];try{this.wrapperInitData[n]=i.OBSERVED_ERROR,this.wrapperInitData[n]=r.initialize?r.initialize.call(this):null}finally{if(this.wrapperInitData[n]===i.OBSERVED_ERROR)try{this.initializeAll(n+1)}catch(e){}}}},closeAll:function(e){r(this.isInTransaction());for(var t=this.transactionWrappers,n=e;n<t.length;n++){var o,a=t[n],s=this.wrapperInitData[n];try{o=!0,s!==i.OBSERVED_ERROR&&a.close&&a.close.call(this,s),o=!1}finally{if(o)try{this.closeAll(n+1)}catch(e){}}}this.wrapperInitData.length=0}},i={Mixin:o,OBSERVED_ERROR:{}};t.exports=i},{184:184}],151:[function(e,t,n){"use strict";var r={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(e){r.currentScrollLeft=e.x,r.currentScrollTop=e.y}};t.exports=r},{}],152:[function(e,t,n){"use strict";function r(e,t){if(o(null!=t),null==e)return t;var n=Array.isArray(e),r=Array.isArray(t);return n&&r?(e.push.apply(e,t),e):n?(e.push(t),e):r?[e].concat(t):[e,t]}var o=e(184);t.exports=r},{184:184}],153:[function(e,t,n){"use strict";function r(e){for(var t=1,n=0,r=0;r<e.length;r++)t=(t+e.charCodeAt(r))%o,n=(n+t)%o;return t|n<<16}var o=65521;t.exports=r},{}],154:[function(e,t,n){function r(e){return e.replace(o,function(e,t){return t.toUpperCase()})}var o=/-(.)/g;t.exports=r},{}],155:[function(e,t,n){"use strict";function r(e){return o(e.replace(i,"ms-"))}var o=e(154),i=/^-ms-/;t.exports=r},{154:154}],156:[function(e,t,n){"use strict";function r(e,t){var n=i.mergeProps(t,e.props);return!n.hasOwnProperty(s)&&e.props.hasOwnProperty(s)&&(n.children=e.props.children),o.createElement(e.type,n)}var o=e(97),i=e(117),a=e(191),s=(e(203),a({children:null}));t.exports=r},{117:117,191:191,203:203,97:97}],157:[function(e,t,n){function r(e,t){return!(!e||!t)&&(e===t||!o(e)&&(o(t)?r(e,t.parentNode):e.contains?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}var o=e(188);t.exports=r},{188:188}],158:[function(e,t,n){function r(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"length"in e&&!("setInterval"in e)&&"number"!=typeof e.nodeType&&(Array.isArray(e)||"callee"in e||"item"in e)}function o(e){return r(e)?Array.isArray(e)?e.slice():i(e):[e]}var i=e(200);t.exports=o},{200:200}],159:[function(e,t,n){"use strict";function r(e){var t=i.createFactory(e),n=o.createClass({tagName:e.toUpperCase(),displayName:"ReactFullPageComponent"+e,componentWillUnmount:function(){a(!1)},render:function(){return t(this.props)}});return n}var o=e(74),i=e(97),a=e(184);t.exports=r},{184:184,74:74,97:97}],160:[function(e,t,n){function r(e){var t=e.match(c);return t&&t[1].toLowerCase()}function o(e,t){var n=l;u(!!l);var o=r(e),i=o&&s(o);if(i){n.innerHTML=i[1]+e+i[2];for(var c=i[0];c--;)n=n.lastChild}else n.innerHTML=e;var p=n.getElementsByTagName("script");p.length&&(u(t),a(p).forEach(t));for(var d=a(n.childNodes);n.lastChild;)n.removeChild(n.lastChild);return d}var i=e(58),a=e(158),s=e(176),u=e(184),l=i.canUseDOM?document.createElement("div"):null,c=/^\s*<(\w+)/;t.exports=o},{158:158,176:176,184:184,58:58}],161:[function(e,t,n){"use strict";function r(e){return"object"==typeof e?Object.keys(e).filter(function(t){return e[t]}).join(" "):Array.prototype.join.call(arguments," ")}e(203);t.exports=r},{203:203}],162:[function(e,t,n){"use strict";function r(e,t){var n=null==t||"boolean"==typeof t||""===t;if(n)return"";var r=isNaN(t);return r||0===t||i.hasOwnProperty(e)&&i[e]?""+t:("string"==typeof t&&(t=t.trim()),t+"px")}var o=e(41),i=o.isUnitlessNumber;t.exports=r},{41:41}],163:[function(e,t,n){function r(e){return function(){return e}}function o(){}o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},t.exports=o},{}],164:[function(e,t,n){"use strict";var r={};t.exports=r},{}],165:[function(e,t,n){"use strict";function r(e){return i[e]}function o(e){return(""+e).replace(a,r)}var i={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},a=/[&><"']/g;t.exports=o},{}],166:[function(e,t,n){"use strict";function r(e){return null==e?null:s(e)?e:o.has(e)?i.getNodeFromInstance(e):(a(null==e.render||"function"!=typeof e.render),void a(!1))}var o=(e(81),e(107)),i=e(111),a=e(184),s=e(186);e(203);t.exports=r},{107:107,111:111,184:184,186:186,203:203,81:81}],167:[function(e,t,n){"use strict";function r(e,t,n){var r=e,o=!r.hasOwnProperty(n);o&&null!=t&&(r[n]=t)}function o(e){if(null==e)return e;var t={};return i(e,r,t),t}var i=e(201);e(203);t.exports=o},{201:201,203:203}],168:[function(e,t,n){"use strict";function r(e){try{e.focus()}catch(e){}}t.exports=r},{}],169:[function(e,t,n){"use strict";var r=function(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)};t.exports=r},{}],170:[function(e,t,n){function r(){try{return document.activeElement||document.body}catch(e){return document.body}}t.exports=r},{}],171:[function(e,t,n){"use strict";function r(e){var t,n=e.keyCode;return"charCode"in e?(t=e.charCode,0===t&&13===n&&(t=13)):t=n,t>=32||13===t?t:0}t.exports=r},{}],172:[function(e,t,n){"use strict";function r(e){if(e.key){var t=i[e.key]||e.key;if("Unidentified"!==t)return t}if("keypress"===e.type){var n=o(e);return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?a[e.keyCode]||"Unidentified":""}var o=e(171),i={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},a={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};t.exports=r},{171:171}],173:[function(e,t,n){"use strict";function r(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var r=i[e];return!!r&&!!n[r]}function o(e){return r}var i={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};t.exports=o},{}],174:[function(e,t,n){"use strict";function r(e){var t=e.target||e.srcElement||window;return 3===t.nodeType?t.parentNode:t}t.exports=r},{}],175:[function(e,t,n){"use strict";function r(e){var t=e&&(o&&e[o]||e[i]);if("function"==typeof t)return t}var o="function"==typeof Symbol&&Symbol.iterator,i="@@iterator";t.exports=r},{}],176:[function(e,t,n){function r(e){return i(!!a),d.hasOwnProperty(e)||(e="*"),s.hasOwnProperty(e)||("*"===e?a.innerHTML="<link />":a.innerHTML="<"+e+"></"+e+">",s[e]=!a.firstChild),s[e]?d[e]:null}var o=e(58),i=e(184),a=o.canUseDOM?document.createElement("div"):null,s={circle:!0,clipPath:!0,defs:!0,ellipse:!0,g:!0,line:!0,linearGradient:!0,path:!0,polygon:!0,polyline:!0,radialGradient:!0,rect:!0,stop:!0,text:!0},u=[1,'<select multiple="true">',"</select>"],l=[1,"<table>","</table>"],c=[3,"<table><tbody><tr>","</tr></tbody></table>"],p=[1,"<svg>","</svg>"],d={"*":[1,"?<div>","</div>"],area:[1,"<map>","</map>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],legend:[1,"<fieldset>","</fieldset>"],param:[1,"<object>","</object>"],tr:[2,"<table><tbody>","</tbody></table>"],optgroup:u,option:u,caption:l,colgroup:l,tbody:l,tfoot:l,thead:l,td:c,th:c,circle:p,clipPath:p,defs:p,ellipse:p,g:p,line:p,linearGradient:p,path:p,polygon:p,polyline:p,radialGradient:p,rect:p,stop:p,text:p};t.exports=r},{184:184,58:58}],177:[function(e,t,n){"use strict";function r(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function o(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function i(e,t){for(var n=r(e),i=0,a=0;n;){if(3===n.nodeType){if(a=i+n.textContent.length,i<=t&&a>=t)return{node:n,offset:t-i};i=a}n=r(o(n))}}t.exports=i},{}],178:[function(e,t,n){"use strict";function r(e){return e?e.nodeType===o?e.documentElement:e.firstChild:null}var o=9;t.exports=r},{}],179:[function(e,t,n){"use strict";function r(){return!i&&o.canUseDOM&&(i="textContent"in document.documentElement?"textContent":"innerText"),i}var o=e(58),i=null;
t.exports=r},{58:58}],180:[function(e,t,n){"use strict";function r(e){return e===window?{x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop}:{x:e.scrollLeft,y:e.scrollTop}}t.exports=r},{}],181:[function(e,t,n){function r(e){return e.replace(o,"-$1").toLowerCase()}var o=/([A-Z])/g;t.exports=r},{}],182:[function(e,t,n){"use strict";function r(e){return o(e).replace(i,"-ms-")}var o=e(181),i=/^ms-/;t.exports=r},{181:181}],183:[function(e,t,n){"use strict";function r(e){return"function"==typeof e&&void 0!==e.prototype&&"function"==typeof e.prototype.mountComponent&&"function"==typeof e.prototype.receiveComponent}function o(e,t){var n;if(null!==e&&e!==!1||(e=a.emptyElement),"object"==typeof e){var o=e;n=t===o.type&&"string"==typeof o.type?s.createInternalComponent(o):r(o.type)?new o.type(o):new c}else"string"==typeof e||"number"==typeof e?n=s.createInstanceForText(e):l(!1);return n.construct(e),n._mountIndex=0,n._mountImage=null,n}var i=e(79),a=e(99),s=e(114),u=e(65),l=e(184),c=(e(203),function(){});u(c.prototype,i.Mixin,{_instantiateReactComponent:o}),t.exports=o},{114:114,184:184,203:203,65:65,79:79,99:99}],184:[function(e,t,n){"use strict";var r=function(e,t,n,r,o,i,a,s){if(!e){var u;if(void 0===t)u=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,o,i,a,s],c=0;u=Error("Invariant Violation: "+t.replace(/%s/g,function(){return l[c++]}))}throw u.framesToPop=1,u}};t.exports=r},{}],185:[function(e,t,n){"use strict";function r(e,t){if(!i.canUseDOM||t&&!("addEventListener"in document))return!1;var n="on"+e,r=n in document;if(!r){var a=document.createElement("div");a.setAttribute(n,"return;"),r="function"==typeof a[n]}return!r&&o&&"wheel"===e&&(r=document.implementation.hasFeature("Events.wheel","3.0")),r}var o,i=e(58);i.canUseDOM&&(o=document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0),t.exports=r},{58:58}],186:[function(e,t,n){function r(e){return!(!e||!("function"==typeof Node?e instanceof Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName))}t.exports=r},{}],187:[function(e,t,n){"use strict";function r(e){return e&&("INPUT"===e.nodeName&&o[e.type]||"TEXTAREA"===e.nodeName)}var o={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};t.exports=r},{}],188:[function(e,t,n){function r(e){return o(e)&&3==e.nodeType}var o=e(186);t.exports=r},{186:186}],189:[function(e,t,n){"use strict";function r(e){e||(e="");var t,n=arguments.length;if(n>1)for(var r=1;r<n;r++)t=arguments[r],t&&(e=(e?e+" ":"")+t);return e}t.exports=r},{}],190:[function(e,t,n){"use strict";var r=e(184),o=function(e){var t,n={};r(e instanceof Object&&!Array.isArray(e));for(t in e)e.hasOwnProperty(t)&&(n[t]=t);return n};t.exports=o},{184:184}],191:[function(e,t,n){var r=function(e){var t;for(t in e)if(e.hasOwnProperty(t))return t;return null};t.exports=r},{}],192:[function(e,t,n){"use strict";function r(e,t,n){if(!e)return null;var r={};for(var i in e)o.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}var o=Object.prototype.hasOwnProperty;t.exports=r},{}],193:[function(e,t,n){"use strict";function r(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),t[n]}}t.exports=r},{}],194:[function(e,t,n){"use strict";function r(e){return i(o.isValidElement(e)),e}var o=e(97),i=e(184);t.exports=r},{184:184,97:97}],195:[function(e,t,n){"use strict";function r(e){return'"'+o(e)+'"'}var o=e(165);t.exports=r},{165:165}],196:[function(e,t,n){"use strict";var r=e(58),o=/^[ \r\n\t\f]/,i=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,a=function(e,t){e.innerHTML=t};if("undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction&&(a=function(e,t){MSApp.execUnsafeLocalFunction(function(){e.innerHTML=t})}),r.canUseDOM){var s=document.createElement("div");s.innerHTML=" ",""===s.innerHTML&&(a=function(e,t){if(e.parentNode&&e.parentNode.replaceChild(e,e),o.test(t)||"<"===t[0]&&i.test(t)){e.innerHTML="\ufeff"+t;var n=e.firstChild;1===n.data.length?e.removeChild(n):n.deleteData(0,1)}else e.innerHTML=t})}t.exports=a},{58:58}],197:[function(e,t,n){"use strict";var r=e(58),o=e(165),i=e(196),a=function(e,t){e.textContent=t};r.canUseDOM&&("textContent"in document.documentElement||(a=function(e,t){i(e,o(t))})),t.exports=a},{165:165,196:196,58:58}],198:[function(e,t,n){"use strict";function r(e,t){if(e===t)return!0;var n;for(n in e)if(e.hasOwnProperty(n)&&(!t.hasOwnProperty(n)||e[n]!==t[n]))return!1;for(n in t)if(t.hasOwnProperty(n)&&!e.hasOwnProperty(n))return!1;return!0}t.exports=r},{}],199:[function(e,t,n){"use strict";function r(e,t){if(null!=e&&null!=t){var n=typeof e,r=typeof t;if("string"===n||"number"===n)return"string"===r||"number"===r;if("object"===r&&e.type===t.type&&e.key===t.key){var o=e._owner===t._owner;return o}}return!1}e(203);t.exports=r},{203:203}],200:[function(e,t,n){function r(e){var t=e.length;if(o(!Array.isArray(e)&&("object"==typeof e||"function"==typeof e)),o("number"==typeof t),o(0===t||t-1 in e),e.hasOwnProperty)try{return Array.prototype.slice.call(e)}catch(e){}for(var n=Array(t),r=0;r<t;r++)n[r]=e[r];return n}var o=e(184);t.exports=r},{184:184}],201:[function(e,t,n){"use strict";function r(e){return v[e]}function o(e,t){return e&&null!=e.key?a(e.key):t.toString(36)}function i(e){return(""+e).replace(g,r)}function a(e){return"$"+i(e)}function s(e,t,n,r,i){var u=typeof e;if("undefined"!==u&&"boolean"!==u||(e=null),null===e||"string"===u||"number"===u||l.isValidElement(e))return r(i,e,""===t?f+o(e,0):t,n),1;var p,v,g,y=0;if(Array.isArray(e))for(var _=0;_<e.length;_++)p=e[_],v=(""!==t?t+m:f)+o(p,_),g=n+y,y+=s(p,v,g,r,i);else{var b=d(e);if(b){var w,C=b.call(e);if(b!==e.entries)for(var E=0;!(w=C.next()).done;)p=w.value,v=(""!==t?t+m:f)+o(p,E++),g=n+y,y+=s(p,v,g,r,i);else for(;!(w=C.next()).done;){var x=w.value;x&&(p=x[1],v=(""!==t?t+m:f)+a(x[0])+m+o(p,0),g=n+y,y+=s(p,v,g,r,i))}}else if("object"===u){h(1!==e.nodeType);var D=c.extract(e);for(var M in D)D.hasOwnProperty(M)&&(p=D[M],v=(""!==t?t+m:f)+a(M)+m+o(p,0),g=n+y,y+=s(p,v,g,r,i))}}return y}function u(e,t,n){return null==e?0:s(e,"",0,t,n)}var l=e(97),c=e(103),p=e(106),d=e(175),h=e(184),f=(e(203),p.SEPARATOR),m=":",v={"=":"=0",".":"=1",":":"=2"},g=/[=.:]/g;t.exports=u},{103:103,106:106,175:175,184:184,203:203,97:97}],202:[function(e,t,n){"use strict";function r(e){return Array.isArray(e)?e.concat():e&&"object"==typeof e?a(new e.constructor,e):e}function o(e,t,n){u(Array.isArray(e));var r=t[n];u(Array.isArray(r))}function i(e,t){if(u("object"==typeof t),l.call(t,h))return u(1===Object.keys(t).length),t[h];var n=r(e);if(l.call(t,f)){var s=t[f];u(s&&"object"==typeof s),u(n&&"object"==typeof n),a(n,t[f])}l.call(t,c)&&(o(e,t,c),t[c].forEach(function(e){n.push(e)})),l.call(t,p)&&(o(e,t,p),t[p].forEach(function(e){n.unshift(e)})),l.call(t,d)&&(u(Array.isArray(e)),u(Array.isArray(t[d])),t[d].forEach(function(e){u(Array.isArray(e)),n.splice.apply(n,e)})),l.call(t,m)&&(u("function"==typeof t[m]),n=t[m](n));for(var v in t)g.hasOwnProperty(v)&&g[v]||(n[v]=i(e[v],t[v]));return n}var a=e(65),s=e(191),u=e(184),l={}.hasOwnProperty,c=s({$push:null}),p=s({$unshift:null}),d=s({$splice:null}),h=s({$set:null}),f=s({$merge:null}),m=s({$apply:null}),v=[c,p,d,h,f,m],g={};v.forEach(function(e){g[e]=!0}),t.exports=i},{184:184,191:191,65:65}],203:[function(e,t,n){"use strict";var r=e(163),o=r;t.exports=o},{163:163}],"@realgeeks/rg-api":[function(e,t,n){"use strict";function r(e,t,n){return i().then(function(r){return new Promise(function(o,i){return P({method:t,url:e,data:n,headers:{"X-CSRFToken":r,"Cache-control":"no-cache, no-store",Pragma:"no-cache",Expires:0}}).then(o,function(e){var t=e.responseText;try{t=JSON.parse(t)}catch(e){}i(t)})})})}function o(e,t){var n=O.get(i.cookie);return n?e(n):void P(i.url).then(function(){e(O.get(i.cookie))},t)}function i(){return k||(k=new Promise(o))}function a(e){if("success"!=e)throw Error(e)}function s(e){return e.created&&(delete e.created,R.emit("signup")),N||R.emit("signin"),N=e,e}function u(e){return N=e,e}function l(e){return R.emit("signin"),e}function c(e,t,n){n=n||{},n.email=e,n.phone=t;var o=n.property||"";return o&&(o+="/",delete n.property),r(c.url+o,"post",n).then(s)}function p(e,t){return r(p.url,"post",{email:e,phone_number:t}).then(a).then(l)}function d(){O.set(R.tokenName,"",I),N=void 0,R.emit("signout")}function h(){return O.get(R.tokenName)}function f(e){return r(f.url,"post",{email:e})}function m(){return N&&Promise.resolve(N)||r(m.url).then(u)}function v(){return r(v.url)}function g(e){return r(g.url+e+"/","post").then(a)}function y(e){return r(y.url+e+"/","post").then(a)}function _(e){return r(_.url+(e?e+"/":""))}function b(e,t){return r(_.url+e+"/","put",t)}function w(e){return r(_.url,"post",e)}function C(e){return r(_.url+e+"/","delete")}function E(e){return r(E.url,"post",e)}function x(e){var t=e.property||"";return t&&(t+="/",delete e.property),r(x.url+t,"post",e).then(s)}function D(e){var t=e.property_id||"";return t&&(t+="/",delete e.property_id),r(D.url+t,"post",e)}function M(e,t){var n=h();if(n){t[R.tokenName]=n;var r=new Image;r.src=M.url+encodeURIComponent(JSON.stringify({event_name:e,data:t}))}}function S(e){var t=new Image;t.src=S.url+encodeURIComponent(JSON.stringify(e))}e(21).polyfill();var k,N,T=e(2).EventEmitter2,O=e("cookie-monster"),P=e("reqwest"),I={expires:new Date(0).toUTCString()};i.url="/member/ajax/csrf/",i.cookie="csrftoken",c.url="/api/v2/member/signup/",p.url="/member/ajax/login/",f.url="/member/ajax/password_reset/",m.url="/api/v2/member/",v.url="/api/get_favorite_properties/",g.url="/member/ajax/save_property/",y.url="/member/ajax/unsave_property/",_.url="/api/v2/member/saved-searches/",E.url="/api/v2/share/email/";var R=n.user=new T;R.tokenName="member_uuid",R.signUp=c,R.signIn=p,R.signOut=d,R.isSignedIn=h,R.resetPassword=f,R.get=m,R.getFavorites=v,R.addFavorite=g,R.removeFavorite=y,R.getSavedSearches=_,R.getSavedSearch=_,R.addSavedSearch=w,R.updateSavedSearch=b,R.removeSavedSearch=C,R.sharePropertyByEmail=E,x.url="/api/v2/member/contact/",n.contact=x,D.url="/api/v2/member/schedule-tour/",n.scheduleTour=D,M.url="http://analytics.realgeeks.com/_rgtm.gif?e=",S.url="http://analytics.realgeeks.com/_rgtm.gif?v=2&act=",n.analytics={track:M,track_v2:S}},{2:2,21:21,"cookie-monster":"cookie-monster",reqwest:"reqwest"}],"@realgeeks/rg-modal":[function(e,t,n){"use strict";var r,o=e(15).EventEmitter2,i=t.exports=new o;i.init=function(t){var n=e("react");return r=n.render(n.createFactory(e(5))({didOpen:i.emit.bind(i,"open"),didClose:i.emit.bind(i,"close")}),t),i.open=function(e,t){t=t||{},e&&(t.name=e),r.setProps(t,r.open)},i.close=r.close,i.isOpen=r.isOpen,i}},{15:15,5:5,react:"react"}],"@realgeeks/rg-track":[function(e,t,n){"use strict";var r=window,o=r.location;r._gaq||(r._gaq=[]),n.pageview=function(e){var t=r._gaq;e=e||o.pathname+o.search+o.hash,t.push(["_trackPageview",e]),t.push(["b._trackPageview",e])}},{}],"cookie-monster":[function(e,t,n){"use strict";if(n=t.exports=function(e){e||(e={}),"string"==typeof e&&(e={cookie:e}),void 0===e.cookie&&(e.cookie="");var t={};return t.get=function(t){for(var n=e.cookie.split(/;\s*/),r=0;r<n.length;r++){var o=n[r].split("="),i=decodeURIComponent(o[0]);if(i===t)return decodeURIComponent(o[1])}},t.set=function(t,n,r){r||(r={});var o=encodeURIComponent(t)+"="+encodeURIComponent(n);return r.expires&&(o+="; expires="+r.expires),r.path&&(o+="; path="+r.path),r.domain&&(o+="; domain="+r.domain),r.secure&&(o+="; secure"),e.cookie=o,o},t},"undefined"!=typeof document){var r=n(document);n.get=r.get,n.set=r.set}},{}],inner:[function(e,t,n){"use strict";function r(e){var t=typeof e;return!!(e&&"object"==t||"function"==t)}function o(e,t,n){for(var o=0;o<t.length;o++){var i=t[o];if(!r(e))return;i in e||!n||(e[i]={}),e=e[i]}return e}function i(e,t,n){var i=t[t.length-1];return e=o(e,t.slice(0,-1),!0),!!r(e)&&(e[i]=n,!0)}function a(e,t){var n=t[t.length-1];return e=o(e,t.slice(0,-1)),r(e)&&n in e}t.exports={get:o,set:i,has:a}},{}],"load-gmaps":[function(e,t,n){"use strict";function r(e){var t={v:o.version,callback:o.callbackName};o.key&&(t.key=o.key),window[o.callbackName]=function(){window[o.callbackName]=void 0,e(google.maps)},a(o.url+"?"+s.stringify(t))}function o(){return i||(i=new Promise(r))}var i,a=e(23),s=e(22);o.url="https://maps.googleapis.com/maps/api/js",o.version="3.19",o.callbackName="mapLoaded",t.exports=o},{22:22,23:23}],lodash:[function(e,t,n){(function(){function e(e,t,n){for(var r=(n||0)-1,o=e?e.length:0;++r<o;)if(e[r]===t)return r;return-1}function r(t,n){var r=typeof n;if(t=t.cache,"boolean"==r||null==n)return t[n]?0:-1;"number"!=r&&"string"!=r&&(r="object");var o="number"==r?n:_+n;return t=(t=t[r])&&t[o],"object"==r?t&&e(t,n)>-1?0:-1:t?0:-1}function o(e){var t=this.cache,n=typeof e;if("boolean"==n||null==e)t[e]=!0;else{"number"!=n&&"string"!=n&&(n="object");var r="number"==n?e:_+e,o=t[n]||(t[n]={});"object"==n?(o[r]||(o[r]=[])).push(e):o[r]=!0}}function i(e){return e.charCodeAt(0)}function a(e,t){for(var n=e.criteria,r=t.criteria,o=-1,i=n.length;++o<i;){var a=n[o],s=r[o];if(a!==s){if(a>s||void 0===a)return 1;if(a<s||void 0===s)return-1}}return e.index-t.index}function s(e){var t=-1,n=e.length,r=e[0],i=e[n/2|0],a=e[n-1];if(r&&"object"==typeof r&&i&&"object"==typeof i&&a&&"object"==typeof a)return!1;var s=c();s.false=s.null=s.true=s.undefined=!1;var u=c();for(u.array=e,u.cache=s,u.push=o;++t<n;)u.push(e[t]);return u}function u(e){return"\\"+X[e]}function l(){return v.pop()||[]}function c(){return g.pop()||{array:null,cache:null,criteria:null,false:!1,index:0,null:!1,number:null,object:null,push:null,string:null,true:!1,undefined:!1,value:null}}function p(e){e.length=0,v.length<w&&v.push(e)}function d(e){var t=e.cache;t&&d(t),e.array=e.cache=e.criteria=e.object=e.number=e.string=e.value=null,g.length<w&&g.push(e)}function h(e,t,n){t||(t=0),void 0===n&&(n=e?e.length:0);for(var r=-1,o=n-t||0,i=Array(o<0?0:o);++r<o;)i[r]=e[t+r];return i}function f(t){function n(e){return e&&"object"==typeof e&&!$n(e)&&Rn.call(e,"__wrapped__")?e:new o(e)}function o(e,t){this.__chain__=!!t,this.__wrapped__=e}function v(e){function t(){if(r){var e=h(r);An.apply(e,arguments)}if(this instanceof t){var i=w(n.prototype),a=n.apply(i,e||arguments);return Te(a)?a:i}return n.apply(o,e||arguments)}var n=e[0],r=e[2],o=e[4];return Zn(t,e),t}function g(e,t,n,r,o){if(n){var i=n(e);if(void 0!==i)return i}var a=Te(e);if(!a)return e;var s=Sn.call(e);if(!H[s])return e;var u=Xn[s];switch(s){case F:case j:return new u(+e);case W:case q:return new u(e);case B:return i=u(e.source,S.exec(e)),i.lastIndex=e.lastIndex,i}var c=$n(e);if(t){var d=!r;r||(r=l()),o||(o=l());for(var f=r.length;f--;)if(r[f]==e)return o[f];i=c?u(e.length):{}}else i=c?h(e):ir({},e);return c&&(Rn.call(e,"index")&&(i.index=e.index),Rn.call(e,"input")&&(i.input=e.input)),t?(r.push(e),o.push(i),(c?Qe:ur)(e,function(e,a){i[a]=g(e,t,n,r,o)}),d&&(p(r),p(o)),i):i}function w(e,t){return Te(e)?Yn(e):{}}function X(e,t,n){if("function"!=typeof e)return Zt;if(void 0===t||!("prototype"in e))return e;var r=e.__bindData__;if(void 0===r&&(Qn.funcNames&&(r=!e.name),r=r||!Qn.funcDecomp,!r)){var o=Pn.call(e);Qn.funcNames||(r=!k.test(o)),r||(r=P.test(o),Zn(e,r))}if(r===!1||r!==!0&&1&r[1])return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)}}return Rt(e,t)}function Z(e){function t(){var e=u?a:this;if(o){var f=h(o);An.apply(f,arguments)}if((i||c)&&(f||(f=h(arguments)),i&&An.apply(f,i),c&&f.length<s))return r|=16,Z([n,p?r:r&-4,f,null,a,s]);if(f||(f=arguments),l&&(n=e[d]),this instanceof t){e=w(n.prototype);var m=n.apply(e,f);return Te(m)?m:e}return n.apply(e,f)}var n=e[0],r=e[1],o=e[2],i=e[3],a=e[4],s=e[5],u=1&r,l=2&r,c=4&r,p=8&r,d=n;return Zn(t,e),t}function $(t,n){var o=-1,i=ue(),a=t?t.length:0,u=a>=b&&i===e,l=[];if(u){var c=s(n);c?(i=r,n=c):u=!1}for(;++o<a;){var p=t[o];i(n,p)<0&&l.push(p)}return u&&d(n),l}function J(e,t,n,r){for(var o=(r||0)-1,i=e?e.length:0,a=[];++o<i;){var s=e[o];if(s&&"object"==typeof s&&"number"==typeof s.length&&($n(s)||de(s))){t||(s=J(s,t,n));var u=-1,l=s.length,c=a.length;for(a.length+=l;++u<l;)a[c++]=s[u]}else n||a.push(s)}return a}function ee(e,t,n,r,o,i){if(n){var a=n(e,t);if(void 0!==a)return!!a}if(e===t)return 0!==e||1/e==1/t;var s=typeof e,u=typeof t;if(!(e!==e||e&&K[s]||t&&K[u]))return!1;if(null==e||null==t)return e===t;var c=Sn.call(e),d=Sn.call(t);if(c==L&&(c=V),d==L&&(d=V),c!=d)return!1;switch(c){case F:case j:return+e==+t;case W:return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case B:case q:return e==Cn(t)}var h=c==U;if(!h){var f=Rn.call(e,"__wrapped__"),m=Rn.call(t,"__wrapped__");if(f||m)return ee(f?e.__wrapped__:e,m?t.__wrapped__:t,n,r,o,i);if(c!=V)return!1;var v=e.constructor,g=t.constructor;if(v!=g&&!(Ne(v)&&v instanceof v&&Ne(g)&&g instanceof g)&&"constructor"in e&&"constructor"in t)return!1}var y=!o;o||(o=l()),i||(i=l());for(var _=o.length;_--;)if(o[_]==e)return i[_]==t;var b=0;if(a=!0,o.push(e),i.push(t),h){if(_=e.length,b=t.length,a=b==_,a||r)for(;b--;){var w=_,C=t[b];if(r)for(;w--&&!(a=ee(e[w],C,n,r,o,i)););else if(!(a=ee(e[b],C,n,r,o,i)))break}}else sr(t,function(t,s,u){if(Rn.call(u,s))return b++,a=Rn.call(e,s)&&ee(e[s],t,n,r,o,i)}),a&&!r&&sr(e,function(e,t,n){if(Rn.call(n,t))return a=--b>-1});return o.pop(),i.pop(),y&&(p(o),p(i)),a}function ne(e,t,n,r,o){($n(t)?Qe:ur)(t,function(t,i){var a,s,u=t,l=e[i];if(t&&((s=$n(t))||lr(t))){for(var c=r.length;c--;)if(a=r[c]==t){l=o[c];break}if(!a){var p;n&&(u=n(l,t),(p=void 0!==u)&&(l=u)),p||(l=s?$n(l)?l:[]:lr(l)?l:{}),r.push(t),o.push(l),p||ne(l,t,n,r,o)}}else n&&(u=n(l,t),void 0===u&&(u=t)),void 0!==u&&(l=u);e[i]=l})}function re(e,t){return e+On(Kn()*(t-e+1))}function oe(t,n,o){var i=-1,a=ue(),u=t?t.length:0,c=[],h=!n&&u>=b&&a===e,f=o||h?l():c;if(h){var m=s(f);a=r,f=m}for(;++i<u;){var v=t[i],g=o?o(v,i,t):v;(n?!i||f[f.length-1]!==g:a(f,g)<0)&&((o||h)&&f.push(g),c.push(v))}return h?(p(f.array),d(f)):o&&p(f),c}function ie(e){return function(t,r,o){var i={};r=n.createCallback(r,o,3);var a=-1,s=t?t.length:0;if("number"==typeof s)for(;++a<s;){var u=t[a];e(i,u,r(u,a,t),t)}else ur(t,function(t,n,o){e(i,t,r(t,n,o),o)});return i}}function ae(e,t,n,r,o,i){var a=1&t,s=2&t,u=4&t,l=16&t,c=32&t;if(!s&&!Ne(e))throw new En;l&&!n.length&&(t&=-17,l=n=!1),c&&!r.length&&(t&=-33,c=r=!1);var p=e&&e.__bindData__;if(p&&p!==!0)return p=h(p),p[2]&&(p[2]=h(p[2])),p[3]&&(p[3]=h(p[3])),!a||1&p[1]||(p[4]=o),!a&&1&p[1]&&(t|=8),!u||4&p[1]||(p[5]=i),l&&An.apply(p[2]||(p[2]=[]),n),c&&Fn.apply(p[3]||(p[3]=[]),r),p[1]|=t,ae.apply(null,p);var d=1==t||17===t?v:Z;return d([e,t,n,r,o,i])}function se(e){return tr[e]}function ue(){var t=(t=n.indexOf)===gt?e:t;return t}function le(e){return"function"==typeof e&&kn.test(e)}function ce(e){var t,n;return!!(e&&Sn.call(e)==V&&(t=e.constructor,!Ne(t)||t instanceof t))&&(sr(e,function(e,t){n=t}),void 0===n||Rn.call(e,n))}function pe(e){return nr[e]}function de(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Sn.call(e)==L||!1}function he(e,t,n,r){return"boolean"!=typeof t&&null!=t&&(r=n,n=t,t=!1),g(e,t,"function"==typeof n&&X(n,r,1))}function fe(e,t,n){return g(e,!0,"function"==typeof t&&X(t,n,1))}function me(e,t){var n=w(e);return t?ir(n,t):n}function ve(e,t,r){var o;return t=n.createCallback(t,r,3),ur(e,function(e,n,r){if(t(e,n,r))return o=n,!1}),o}function ge(e,t,r){var o;return t=n.createCallback(t,r,3),_e(e,function(e,n,r){if(t(e,n,r))return o=n,!1}),o}function ye(e,t,n){var r=[];sr(e,function(e,t){r.push(t,e)});var o=r.length;for(t=X(t,n,3);o--&&t(r[o--],r[o],e)!==!1;);return e}function _e(e,t,n){var r=er(e),o=r.length;for(t=X(t,n,3);o--;){var i=r[o];if(t(e[i],i,e)===!1)break}return e}function be(e){var t=[];return sr(e,function(e,n){Ne(e)&&t.push(n)}),t.sort()}function we(e,t){return!!e&&Rn.call(e,t)}function Ce(e){for(var t=-1,n=er(e),r=n.length,o={};++t<r;){var i=n[t];o[e[i]]=i}return o}function Ee(e){return e===!0||e===!1||e&&"object"==typeof e&&Sn.call(e)==F||!1}function xe(e){return e&&"object"==typeof e&&Sn.call(e)==j||!1}function De(e){return e&&1===e.nodeType||!1}function Me(e){var t=!0;if(!e)return t;var n=Sn.call(e),r=e.length;return n==U||n==q||n==L||n==V&&"number"==typeof r&&Ne(e.splice)?!r:(ur(e,function(){return t=!1}),t)}function Se(e,t,n,r){return ee(e,t,"function"==typeof n&&X(n,r,2))}function ke(e){return Vn(e)&&!Bn(parseFloat(e))}function Ne(e){return"function"==typeof e}function Te(e){return!(!e||!K[typeof e])}function Oe(e){return Ie(e)&&e!=+e}function Pe(e){return null===e}function Ie(e){return"number"==typeof e||e&&"object"==typeof e&&Sn.call(e)==W||!1}function Re(e){return e&&"object"==typeof e&&Sn.call(e)==B||!1}function Ae(e){return"string"==typeof e||e&&"object"==typeof e&&Sn.call(e)==q||!1}function Le(e){return void 0===e}function Ue(e,t,r){var o={};return t=n.createCallback(t,r,3),ur(e,function(e,n,r){o[n]=t(e,n,r)}),o}function Fe(e){var t=arguments,n=2;if(!Te(e))return e;if("number"!=typeof t[2]&&(n=t.length),n>3&&"function"==typeof t[n-2])var r=X(t[--n-1],t[n--],2);else n>2&&"function"==typeof t[n-1]&&(r=t[--n]);for(var o=h(arguments,1,n),i=-1,a=l(),s=l();++i<n;)ne(e,o[i],r,a,s);return p(a),p(s),e}function je(e,t,r){var o={};if("function"!=typeof t){var i=[];sr(e,function(e,t){i.push(t)}),i=$(i,J(arguments,!0,!1,1));for(var a=-1,s=i.length;++a<s;){var u=i[a];o[u]=e[u]}}else t=n.createCallback(t,r,3),sr(e,function(e,n,r){t(e,n,r)||(o[n]=e)});return o}function Ye(e){for(var t=-1,n=er(e),r=n.length,o=fn(r);++t<r;){var i=n[t];o[t]=[i,e[i]]}return o}function We(e,t,r){var o={};if("function"!=typeof t)for(var i=-1,a=J(arguments,!0,!1,1),s=Te(e)?a.length:0;++i<s;){var u=a[i];u in e&&(o[u]=e[u])}else t=n.createCallback(t,r,3),sr(e,function(e,n,r){t(e,n,r)&&(o[n]=e)});return o}function Ve(e,t,r,o){var i=$n(e);if(null==r)if(i)r=[];else{var a=e&&e.constructor,s=a&&a.prototype;r=w(s)}return t&&(t=n.createCallback(t,o,4),(i?Qe:ur)(e,function(e,n,o){return t(r,e,n,o)})),r}function Be(e){for(var t=-1,n=er(e),r=n.length,o=fn(r);++t<r;)o[t]=e[n[t]];return o}function qe(e){for(var t=arguments,n=-1,r=J(t,!0,!1,1),o=t[2]&&t[2][t[1]]===e?1:r.length,i=fn(o);++n<o;)i[n]=e[r[n]];return i}function He(e,t,n){var r=-1,o=ue(),i=e?e.length:0,a=!1;return n=(n<0?Hn(0,i+n):n)||0,$n(e)?a=o(e,t,n)>-1:"number"==typeof i?a=(Ae(e)?e.indexOf(t,n):o(e,t,n))>-1:ur(e,function(e){if(++r>=n)return!(a=e===t)}),a}function ze(e,t,r){var o=!0;t=n.createCallback(t,r,3);var i=-1,a=e?e.length:0;if("number"==typeof a)for(;++i<a&&(o=!!t(e[i],i,e)););else ur(e,function(e,n,r){return o=!!t(e,n,r)});return o}function Ge(e,t,r){var o=[];t=n.createCallback(t,r,3);var i=-1,a=e?e.length:0;if("number"==typeof a)for(;++i<a;){var s=e[i];t(s,i,e)&&o.push(s)}else ur(e,function(e,n,r){t(e,n,r)&&o.push(e)});return o}function Ke(e,t,r){t=n.createCallback(t,r,3);var o=-1,i=e?e.length:0;if("number"!=typeof i){var a;return ur(e,function(e,n,r){if(t(e,n,r))return a=e,!1}),a}for(;++o<i;){var s=e[o];if(t(s,o,e))return s}}function Xe(e,t,r){var o;return t=n.createCallback(t,r,3),Ze(e,function(e,n,r){if(t(e,n,r))return o=e,!1}),o}function Qe(e,t,n){var r=-1,o=e?e.length:0;if(t=t&&void 0===n?t:X(t,n,3),"number"==typeof o)for(;++r<o&&t(e[r],r,e)!==!1;);else ur(e,t);return e}function Ze(e,t,n){var r=e?e.length:0;if(t=t&&void 0===n?t:X(t,n,3),"number"==typeof r)for(;r--&&t(e[r],r,e)!==!1;);else{var o=er(e);r=o.length,ur(e,function(e,n,i){return n=o?o[--r]:--r,t(i[n],n,i)})}return e}function $e(e,t){var n=h(arguments,2),r=-1,o="function"==typeof t,i=e?e.length:0,a=fn("number"==typeof i?i:0);return Qe(e,function(e){a[++r]=(o?t:e[t]).apply(e,n)}),a}function Je(e,t,r){var o=-1,i=e?e.length:0;if(t=n.createCallback(t,r,3),"number"==typeof i)for(var a=fn(i);++o<i;)a[o]=t(e[o],o,e);else a=[],ur(e,function(e,n,r){a[++o]=t(e,n,r)});return a}function et(e,t,r){var o=-(1/0),a=o;if("function"!=typeof t&&r&&r[t]===e&&(t=null),null==t&&$n(e))for(var s=-1,u=e.length;++s<u;){var l=e[s];l>a&&(a=l)}else t=null==t&&Ae(e)?i:n.createCallback(t,r,3),Qe(e,function(e,n,r){var i=t(e,n,r);i>o&&(o=i,a=e)});return a}function tt(e,t,r){var o=1/0,a=o;if("function"!=typeof t&&r&&r[t]===e&&(t=null),null==t&&$n(e))for(var s=-1,u=e.length;++s<u;){var l=e[s];l<a&&(a=l)}else t=null==t&&Ae(e)?i:n.createCallback(t,r,3),Qe(e,function(e,n,r){var i=t(e,n,r);i<o&&(o=i,a=e)});return a}function nt(e,t,r,o){if(!e)return r;var i=arguments.length<3;t=n.createCallback(t,o,4);var a=-1,s=e.length;if("number"==typeof s)for(i&&(r=e[++a]);++a<s;)r=t(r,e[a],a,e);else ur(e,function(e,n,o){r=i?(i=!1,e):t(r,e,n,o)});return r}function rt(e,t,r,o){var i=arguments.length<3;return t=n.createCallback(t,o,4),Ze(e,function(e,n,o){r=i?(i=!1,e):t(r,e,n,o)}),r}function ot(e,t,r){return t=n.createCallback(t,r,3),Ge(e,function(e,n,r){return!t(e,n,r)})}function it(e,t,n){if(e&&"number"!=typeof e.length&&(e=Be(e)),null==t||n)return e?e[re(0,e.length-1)]:m;var r=at(e);return r.length=zn(Hn(0,t),r.length),r}function at(e){var t=-1,n=e?e.length:0,r=fn("number"==typeof n?n:0);return Qe(e,function(e){var n=re(0,++t);r[t]=r[n],r[n]=e}),r}function st(e){var t=e?e.length:0;return"number"==typeof t?t:er(e).length}function ut(e,t,r){var o;t=n.createCallback(t,r,3);var i=-1,a=e?e.length:0;if("number"==typeof a)for(;++i<a&&!(o=t(e[i],i,e)););else ur(e,function(e,n,r){return!(o=t(e,n,r))});return!!o}function lt(e,t,r){var o=-1,i=$n(t),s=e?e.length:0,u=fn("number"==typeof s?s:0);for(i||(t=n.createCallback(t,r,3)),Qe(e,function(e,n,r){var a=u[++o]=c();i?a.criteria=Je(t,function(t){return e[t]}):(a.criteria=l())[0]=t(e,n,r),a.index=o,a.value=e}),s=u.length,u.sort(a);s--;){var h=u[s];u[s]=h.value,i||p(h.criteria),d(h)}return u}function ct(e){return e&&"number"==typeof e.length?h(e):Be(e)}function pt(e){for(var t=-1,n=e?e.length:0,r=[];++t<n;){var o=e[t];o&&r.push(o)}return r}function dt(e){return $(e,J(arguments,!0,!0,1))}function ht(e,t,r){var o=-1,i=e?e.length:0;for(t=n.createCallback(t,r,3);++o<i;)if(t(e[o],o,e))return o;return-1}function ft(e,t,r){var o=e?e.length:0;for(t=n.createCallback(t,r,3);o--;)if(t(e[o],o,e))return o;return-1}function mt(e,t,r){var o=0,i=e?e.length:0;if("number"!=typeof t&&null!=t){var a=-1;for(t=n.createCallback(t,r,3);++a<i&&t(e[a],a,e);)o++}else if(o=t,null==o||r)return e?e[0]:m;return h(e,0,zn(Hn(0,o),i))}function vt(e,t,n,r){return"boolean"!=typeof t&&null!=t&&(r=n,n="function"!=typeof t&&r&&r[t]===e?null:t,t=!1),null!=n&&(e=Je(e,n,r)),J(e,t)}function gt(t,n,r){if("number"==typeof r){var o=t?t.length:0;r=r<0?Hn(0,o+r):r||0}else if(r){var i=Mt(t,n);return t[i]===n?i:-1}return e(t,n,r)}function yt(e,t,r){var o=0,i=e?e.length:0;if("number"!=typeof t&&null!=t){var a=i;for(t=n.createCallback(t,r,3);a--&&t(e[a],a,e);)o++}else o=null==t||r?1:t||o;return h(e,0,zn(Hn(0,i-o),i))}function _t(){for(var t=[],n=-1,o=arguments.length,i=l(),a=ue(),u=a===e,c=l();++n<o;){var h=arguments[n];($n(h)||de(h))&&(t.push(h),i.push(u&&h.length>=b&&s(n?t[n]:c)))}var f=t[0],m=-1,v=f?f.length:0,g=[];e:for(;++m<v;){var y=i[0];if(h=f[m],(y?r(y,h):a(c,h))<0){for(n=o,(y||c).push(h);--n;)if(y=i[n],(y?r(y,h):a(t[n],h))<0)continue e;g.push(h)}}for(;o--;)y=i[o],y&&d(y);return p(i),p(c),g}function bt(e,t,r){var o=0,i=e?e.length:0;if("number"!=typeof t&&null!=t){var a=i;for(t=n.createCallback(t,r,3);a--&&t(e[a],a,e);)o++}else if(o=t,null==o||r)return e?e[i-1]:m;return h(e,Hn(0,i-o))}function wt(e,t,n){var r=e?e.length:0;for("number"==typeof n&&(r=(n<0?Hn(0,r+n):zn(n,r-1))+1);r--;)if(e[r]===t)return r;return-1}function Ct(e){for(var t=arguments,n=0,r=t.length,o=e?e.length:0;++n<r;)for(var i=-1,a=t[n];++i<o;)e[i]===a&&(Un.call(e,i--,1),o--);return e}function Et(e,t,n){e=+e||0,n="number"==typeof n?n:+n||1,null==t&&(t=e,e=0);for(var r=-1,o=Hn(0,Nn((t-e)/(n||1))),i=fn(o);++r<o;)i[r]=e,e+=n;return i}function xt(e,t,r){var o=-1,i=e?e.length:0,a=[];for(t=n.createCallback(t,r,3);++o<i;){var s=e[o];t(s,o,e)&&(a.push(s),Un.call(e,o--,1),i--)}return a}function Dt(e,t,r){if("number"!=typeof t&&null!=t){var o=0,i=-1,a=e?e.length:0;for(t=n.createCallback(t,r,3);++i<a&&t(e[i],i,e);)o++}else o=null==t||r?1:Hn(0,t);return h(e,o)}function Mt(e,t,r,o){var i=0,a=e?e.length:i;for(r=r?n.createCallback(r,o,1):Zt,t=r(t);i<a;){var s=i+a>>>1;r(e[s])<t?i=s+1:a=s}return i}function St(){return oe(J(arguments,!0,!0))}function kt(e,t,r,o){return"boolean"!=typeof t&&null!=t&&(o=r,r="function"!=typeof t&&o&&o[t]===e?null:t,t=!1),null!=r&&(r=n.createCallback(r,o,3)),oe(e,t,r)}function Nt(e){return $(e,h(arguments,1))}function Tt(){for(var e=-1,t=arguments.length;++e<t;){var n=arguments[e];if($n(n)||de(n))var r=r?oe($(r,n).concat($(n,r))):n}return r||[]}function Ot(){for(var e=arguments.length>1?arguments:arguments[0],t=-1,n=e?et(hr(e,"length")):0,r=fn(n<0?0:n);++t<n;)r[t]=hr(e,t);return r}function Pt(e,t){var n=-1,r=e?e.length:0,o={};for(t||!r||$n(e[0])||(t=[]);++n<r;){var i=e[n];t?o[i]=t[n]:i&&(o[i[0]]=i[1])}return o}function It(e,t){if(!Ne(t))throw new En;return function(){if(--e<1)return t.apply(this,arguments)}}function Rt(e,t){return arguments.length>2?ae(e,17,h(arguments,2),null,t):ae(e,1,null,null,t)}function At(e){for(var t=arguments.length>1?J(arguments,!0,!1,1):be(e),n=-1,r=t.length;++n<r;){var o=t[n];e[o]=ae(e[o],1,null,null,e)}return e}function Lt(e,t){return arguments.length>2?ae(t,19,h(arguments,2),null,e):ae(t,3,null,null,e)}function Ut(){for(var e=arguments,t=e.length;t--;)if(!Ne(e[t]))throw new En;return function(){for(var t=arguments,n=e.length;n--;)t=[e[n].apply(this,t)];return t[0]}}function Ft(e,t){return t="number"==typeof t?t:+t||e.length,ae(e,4,null,null,null,t)}function jt(e,t,n){var r,o,i,a,s,u,l,c=0,p=!1,d=!0;if(!Ne(e))throw new En;if(t=Hn(0,t)||0,n===!0){var h=!0;d=!1}else Te(n)&&(h=n.leading,p="maxWait"in n&&(Hn(t,n.maxWait)||0),d="trailing"in n?n.trailing:d);var f=function(){var n=t-(mr()-a);if(n<=0){o&&Tn(o);var p=l;o=u=l=m,p&&(c=mr(),i=e.apply(s,r),u||o||(r=s=null))}else u=Ln(f,n)},v=function(){u&&Tn(u),o=u=l=m,(d||p!==t)&&(c=mr(),i=e.apply(s,r),u||o||(r=s=null))};return function(){if(r=arguments,a=mr(),s=this,l=d&&(u||!h),p===!1)var n=h&&!u;else{o||h||(c=a);var m=p-(a-c),g=m<=0;g?(o&&(o=Tn(o)),c=a,i=e.apply(s,r)):o||(o=Ln(v,m))}return g&&u?u=Tn(u):u||t===p||(u=Ln(f,t)),n&&(g=!0,i=e.apply(s,r)),!g||u||o||(r=s=null),i}}function Yt(e){if(!Ne(e))throw new En;var t=h(arguments,1);return Ln(function(){e.apply(m,t)},1)}function Wt(e,t){if(!Ne(e))throw new En;var n=h(arguments,2);return Ln(function(){e.apply(m,n)},t)}function Vt(e,t){if(!Ne(e))throw new En;var n=function(){var r=n.cache,o=t?t.apply(this,arguments):_+arguments[0];return Rn.call(r,o)?r[o]:r[o]=e.apply(this,arguments)};return n.cache={},n}function Bt(e){var t,n;if(!Ne(e))throw new En;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}}function qt(e){return ae(e,16,h(arguments,1))}function Ht(e){return ae(e,32,null,h(arguments,1))}function zt(e,t,n){var r=!0,o=!0;if(!Ne(e))throw new En;return n===!1?r=!1:Te(n)&&(r="leading"in n?n.leading:r,o="trailing"in n?n.trailing:o),z.leading=r,z.maxWait=t,z.trailing=o,jt(e,t,z)}function Gt(e,t){return ae(t,16,[e])}function Kt(e){return function(){return e}}function Xt(e,t,n){var r=typeof e;if(null==e||"function"==r)return X(e,t,n);if("object"!=r)return tn(e);var o=er(e),i=o[0],a=e[i];return 1!=o.length||a!==a||Te(a)?function(t){for(var n=o.length,r=!1;n--&&(r=ee(t[o[n]],e[o[n]],null,!0)););return r}:function(e){var t=e[i];return a===t&&(0!==a||1/a==1/t)}}function Qt(e){return null==e?"":Cn(e).replace(or,se)}function Zt(e){return e}function $t(e,t,r){var i=!0,a=t&&be(t);t&&(r||a.length)||(null==r&&(r=t),s=o,t=e,e=n,a=be(t)),r===!1?i=!1:Te(r)&&"chain"in r&&(i=r.chain);var s=e,u=Ne(s);Qe(a,function(n){var r=e[n]=t[n];u&&(s.prototype[n]=function(){var t=this.__chain__,n=this.__wrapped__,o=[n];
An.apply(o,arguments);var a=r.apply(e,o);if(i||t){if(n===a&&Te(a))return this;a=new s(a),a.__chain__=t}return a})})}function Jt(){return t._=Mn,this}function en(){}function tn(e){return function(t){return t[e]}}function nn(e,t,n){var r=null==e,o=null==t;if(null==n&&("boolean"==typeof e&&o?(n=e,e=1):o||"boolean"!=typeof t||(n=t,o=!0)),r&&o&&(t=1),e=+e||0,o?(t=e,e=0):t=+t||0,n||e%1||t%1){var i=Kn();return zn(e+i*(t-e+parseFloat("1e-"+((i+"").length-1))),t)}return re(e,t)}function rn(e,t){if(e){var n=e[t];return Ne(n)?e[t]():n}}function on(e,t,r){var o=n.templateSettings;e=Cn(e||""),r=ar({},r,o);var i,a=ar({},r.imports,o.imports),s=er(a),l=Be(a),c=0,p=r.interpolate||O,d="__p += '",h=wn((r.escape||O).source+"|"+p.source+"|"+(p===N?M:O).source+"|"+(r.evaluate||O).source+"|$","g");e.replace(h,function(t,n,r,o,a,s){return r||(r=o),d+=e.slice(c,s).replace(I,u),n&&(d+="' +\n__e("+n+") +\n'"),a&&(i=!0,d+="';\n"+a+";\n__p += '"),r&&(d+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),c=s+t.length,t}),d+="';\n";var f=r.variable,v=f;v||(f="obj",d="with ("+f+") {\n"+d+"\n}\n"),d=(i?d.replace(E,""):d).replace(x,"$1").replace(D,"$1;"),d="function("+f+") {\n"+(v?"":f+" || ("+f+" = {});\n")+"var __t, __p = '', __e = _.escape"+(i?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+d+"return __p\n}";var g="\n/*\n//# sourceURL="+(r.sourceURL||"/lodash/template/source["+A++ +"]")+"\n*/";try{var y=gn(s,"return "+d+g).apply(m,l)}catch(e){throw e.source=d,e}return t?y(t):(y.source=d,y)}function an(e,t,n){e=(e=+e)>-1?e:0;var r=-1,o=fn(e);for(t=X(t,n,1);++r<e;)o[r]=t(r);return o}function sn(e){return null==e?"":Cn(e).replace(rr,pe)}function un(e){var t=++y;return Cn(null==e?"":e)+t}function ln(e){return e=new o(e),e.__chain__=!0,e}function cn(e,t){return t(e),e}function pn(){return this.__chain__=!0,this}function dn(){return Cn(this.__wrapped__)}function hn(){return this.__wrapped__}t=t?te.defaults(Q.Object(),t,te.pick(Q,R)):Q;var fn=t.Array,mn=t.Boolean,vn=t.Date,gn=t.Function,yn=t.Math,_n=t.Number,bn=t.Object,wn=t.RegExp,Cn=t.String,En=t.TypeError,xn=[],Dn=bn.prototype,Mn=t._,Sn=Dn.toString,kn=wn("^"+Cn(Sn).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Nn=yn.ceil,Tn=t.clearTimeout,On=yn.floor,Pn=gn.prototype.toString,In=le(In=bn.getPrototypeOf)&&In,Rn=Dn.hasOwnProperty,An=xn.push,Ln=t.setTimeout,Un=xn.splice,Fn=xn.unshift,jn=function(){try{var e={},t=le(t=bn.defineProperty)&&t,n=t(e,e,e)&&t}catch(e){}return n}(),Yn=le(Yn=bn.create)&&Yn,Wn=le(Wn=fn.isArray)&&Wn,Vn=t.isFinite,Bn=t.isNaN,qn=le(qn=bn.keys)&&qn,Hn=yn.max,zn=yn.min,Gn=t.parseInt,Kn=yn.random,Xn={};Xn[U]=fn,Xn[F]=mn,Xn[j]=vn,Xn[Y]=gn,Xn[V]=bn,Xn[W]=_n,Xn[B]=wn,Xn[q]=Cn,o.prototype=n.prototype;var Qn=n.support={};Qn.funcDecomp=!le(t.WinRTError)&&P.test(f),Qn.funcNames="string"==typeof gn.name,n.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:n}},Yn||(w=function(){function e(){}return function(n){if(Te(n)){e.prototype=n;var r=new e;e.prototype=null}return r||t.Object()}}());var Zn=jn?function(e,t){G.value=t,jn(e,"__bindData__",G),G.value=null}:en,$n=Wn||function(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Sn.call(e)==U||!1},Jn=function(e){var t,n=e,r=[];if(!n)return r;if(!K[typeof e])return r;for(t in n)Rn.call(n,t)&&r.push(t);return r},er=qn?function(e){return Te(e)?qn(e):[]}:Jn,tr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},nr=Ce(tr),rr=wn("("+er(nr).join("|")+")","g"),or=wn("["+er(tr).join("")+"]","g"),ir=function(e,t,n){var r,o=e,i=o;if(!o)return i;var a=arguments,s=0,u="number"==typeof n?2:a.length;if(u>3&&"function"==typeof a[u-2])var l=X(a[--u-1],a[u--],2);else u>2&&"function"==typeof a[u-1]&&(l=a[--u]);for(;++s<u;)if(o=a[s],o&&K[typeof o])for(var c=-1,p=K[typeof o]&&er(o),d=p?p.length:0;++c<d;)r=p[c],i[r]=l?l(i[r],o[r]):o[r];return i},ar=function(e,t,n){var r,o=e,i=o;if(!o)return i;for(var a=arguments,s=0,u="number"==typeof n?2:a.length;++s<u;)if(o=a[s],o&&K[typeof o])for(var l=-1,c=K[typeof o]&&er(o),p=c?c.length:0;++l<p;)r=c[l],void 0===i[r]&&(i[r]=o[r]);return i},sr=function(e,t,n){var r,o=e,i=o;if(!o)return i;if(!K[typeof o])return i;t=t&&void 0===n?t:X(t,n,3);for(r in o)if(t(o[r],r,e)===!1)return i;return i},ur=function(e,t,n){var r,o=e,i=o;if(!o)return i;if(!K[typeof o])return i;t=t&&void 0===n?t:X(t,n,3);for(var a=-1,s=K[typeof o]&&er(o),u=s?s.length:0;++a<u;)if(r=s[a],t(o[r],r,e)===!1)return i;return i},lr=In?function(e){if(!e||Sn.call(e)!=V)return!1;var t=e.valueOf,n=le(t)&&(n=In(t))&&In(n);return n?e==n||In(e)==n:ce(e)}:ce,cr=ie(function(e,t,n){Rn.call(e,n)?e[n]++:e[n]=1}),pr=ie(function(e,t,n){(Rn.call(e,n)?e[n]:e[n]=[]).push(t)}),dr=ie(function(e,t,n){e[n]=t}),hr=Je,fr=Ge,mr=le(mr=vn.now)&&mr||function(){return(new vn).getTime()},vr=8==Gn(C+"08")?Gn:function(e,t){return Gn(Ae(e)?e.replace(T,""):e,t||0)};return n.after=It,n.assign=ir,n.at=qe,n.bind=Rt,n.bindAll=At,n.bindKey=Lt,n.chain=ln,n.compact=pt,n.compose=Ut,n.constant=Kt,n.countBy=cr,n.create=me,n.createCallback=Xt,n.curry=Ft,n.debounce=jt,n.defaults=ar,n.defer=Yt,n.delay=Wt,n.difference=dt,n.filter=Ge,n.flatten=vt,n.forEach=Qe,n.forEachRight=Ze,n.forIn=sr,n.forInRight=ye,n.forOwn=ur,n.forOwnRight=_e,n.functions=be,n.groupBy=pr,n.indexBy=dr,n.initial=yt,n.intersection=_t,n.invert=Ce,n.invoke=$e,n.keys=er,n.map=Je,n.mapValues=Ue,n.max=et,n.memoize=Vt,n.merge=Fe,n.min=tt,n.omit=je,n.once=Bt,n.pairs=Ye,n.partial=qt,n.partialRight=Ht,n.pick=We,n.pluck=hr,n.property=tn,n.pull=Ct,n.range=Et,n.reject=ot,n.remove=xt,n.rest=Dt,n.shuffle=at,n.sortBy=lt,n.tap=cn,n.throttle=zt,n.times=an,n.toArray=ct,n.transform=Ve,n.union=St,n.uniq=kt,n.values=Be,n.where=fr,n.without=Nt,n.wrap=Gt,n.xor=Tt,n.zip=Ot,n.zipObject=Pt,n.collect=Je,n.drop=Dt,n.each=Qe,n.eachRight=Ze,n.extend=ir,n.methods=be,n.object=Pt,n.select=Ge,n.tail=Dt,n.unique=kt,n.unzip=Ot,$t(n),n.clone=he,n.cloneDeep=fe,n.contains=He,n.escape=Qt,n.every=ze,n.find=Ke,n.findIndex=ht,n.findKey=ve,n.findLast=Xe,n.findLastIndex=ft,n.findLastKey=ge,n.has=we,n.identity=Zt,n.indexOf=gt,n.isArguments=de,n.isArray=$n,n.isBoolean=Ee,n.isDate=xe,n.isElement=De,n.isEmpty=Me,n.isEqual=Se,n.isFinite=ke,n.isFunction=Ne,n.isNaN=Oe,n.isNull=Pe,n.isNumber=Ie,n.isObject=Te,n.isPlainObject=lr,n.isRegExp=Re,n.isString=Ae,n.isUndefined=Le,n.lastIndexOf=wt,n.mixin=$t,n.noConflict=Jt,n.noop=en,n.now=mr,n.parseInt=vr,n.random=nn,n.reduce=nt,n.reduceRight=rt,n.result=rn,n.runInContext=f,n.size=st,n.some=ut,n.sortedIndex=Mt,n.template=on,n.unescape=sn,n.uniqueId=un,n.all=ze,n.any=ut,n.detect=Ke,n.findWhere=Ke,n.foldl=nt,n.foldr=rt,n.include=He,n.inject=nt,$t(function(){var e={};return ur(n,function(t,r){n.prototype[r]||(e[r]=t)}),e}(),!1),n.first=mt,n.last=bt,n.sample=it,n.take=mt,n.head=mt,ur(n,function(e,t){var r="sample"!==t;n.prototype[t]||(n.prototype[t]=function(t,n){var i=this.__chain__,a=e(this.__wrapped__,t,n);return i||null!=t&&(!n||r&&"function"==typeof t)?new o(a,i):a})}),n.VERSION="2.4.2",n.prototype.chain=pn,n.prototype.toString=dn,n.prototype.value=hn,n.prototype.valueOf=hn,Qe(["join","pop","shift"],function(e){var t=xn[e];n.prototype[e]=function(){var e=this.__chain__,n=t.apply(this.__wrapped__,arguments);return e?new o(n,e):n}}),Qe(["push","reverse","sort","unshift"],function(e){var t=xn[e];n.prototype[e]=function(){return t.apply(this.__wrapped__,arguments),this}}),Qe(["concat","slice","splice"],function(e){var t=xn[e];n.prototype[e]=function(){return new o(t.apply(this.__wrapped__,arguments),this.__chain__)}}),n}var m,v=[],g=[],y=0,_=+new Date+"",b=75,w=40,C=" \t\v\f \ufeff\n\r\u2028\u2029 ᠎             　",E=/\b__p \+= '';/g,x=/\b(__p \+=) '' \+/g,D=/(__e\(.*?\)|\b__t\)) \+\n'';/g,M=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,S=/\w*$/,k=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,T=RegExp("^["+C+"]*0+(?=.$)"),O=/($^)/,P=/\bthis\b/,I=/['\n\r\t\u2028\u2029\\]/g,R=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],A=0,L="[object Arguments]",U="[object Array]",F="[object Boolean]",j="[object Date]",Y="[object Function]",W="[object Number]",V="[object Object]",B="[object RegExp]",q="[object String]",H={};H[Y]=!1,H[L]=H[U]=H[F]=H[j]=H[W]=H[V]=H[B]=H[q]=!0;var z={leading:!1,maxWait:0,trailing:!1},G={configurable:!1,enumerable:!1,value:null,writable:!1},K={boolean:!1,function:!0,object:!0,number:!1,string:!1,undefined:!1},X={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},Q=K[typeof window]&&window||this,Z=K[typeof n]&&n&&!n.nodeType&&n,$=K[typeof t]&&t&&!t.nodeType&&t,J=$&&$.exports===Z&&Z,ee=K[typeof global]&&global;!ee||ee.global!==ee&&ee.window!==ee||(Q=ee);var te=f();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(Q._=te,define(function(){return te})):Z&&$?J?($.exports=te)._=te:Z._=te:Q._=te}).call(this)},{}],mallet:[function(e,t,n){"use strict";function r(e,t,n){return setTimeout(e.bind(n),t)}function o(e,t,n){return!!Array.isArray(e)&&(e.forEach(n[t],n),!0)}function i(e,t,n){var r,o=t.prototype;r=e.prototype=Object.create(o),r.constructor=e,r.superior=o,n&&ne(r,n)}function a(e,t){return typeof e==se?e.apply(t?t[0]||void 0:void 0,t):e}function s(e,t){return void 0===e?t:e}function u(e,t,n){d(t).forEach(function(t){e.addEventListener(t,n,!1)})}function l(e,t,n){d(t).forEach(function(t){e.removeEventListener(t,n,!1)})}function c(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function p(e,t){return e.indexOf(t)>-1}function d(e){return e.trim().split(/\s+/g)}function h(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var r=0;r<e.length;){if(n&&e[r][n]==t||!n&&e[r]===t)return r;r++}return-1}function f(e,t,n){for(var r=[],o=[],i=0;i<e.length;){var a=t?e[i][t]:e[i];h(o,a)<0&&r.push(e[i]),o[i]=a,i++}return n&&(r=t?r.sort(function(e,n){return e[t]>n[t]}):r.sort()),r}function m(e,t){for(var n,r,o=t[0].toUpperCase()+t.slice(1),i=0;i<ie.length;){if(n=ie[i],r=n?n+o:t,r in e)return r;i++}}function v(e){return e.ownerDocument}function g(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(t){a(e.options.enable,[e])&&n.handler(t)},this.init()}function y(e){var t,n=e.options.inputClass;return new(t=n?n:he?P:fe?A:de?L:O)(e,_)}function _(e,t,n){var r=n.pointers.length,o=n.changedPointers.length,i=t&be&&r-o===0,a=t&(Ce|Ee)&&r-o===0;n.isFirst=!!i,n.isFinal=!!a,i&&(e.session={}),n.eventType=t,b(e,n),e.emit("input",n),e.recognize(n),e.session.prevInput=n}function b(e,t){var n=e.session,r=t.pointers,o=r.length;n.firstInput||(n.firstInput=E(t)),o>1&&!n.firstMultiple?n.firstMultiple=E(t):1===o&&(n.firstMultiple=!1);var i=n.firstInput,a=n.firstMultiple,s=a?a.center:i.center,u=t.center=x(r);t.timeStamp=ce(),t.deltaTime=t.timeStamp-i.timeStamp,t.angle=k(s,u),t.distance=S(s,u),w(n,t),t.offsetDirection=M(t.deltaX,t.deltaY),t.scale=a?T(a.pointers,r):1,t.rotation=a?N(a.pointers,r):0,C(n,t);var l=e.element;c(t.srcEvent.target,l)&&(l=t.srcEvent.target),t.target=l}function w(e,t){var n=t.center,r=e.offsetDelta||{},o=e.prevDelta||{},i=e.prevInput||{};t.eventType!==be&&i.eventType!==Ce||(o=e.prevDelta={x:i.deltaX||0,y:i.deltaY||0},r=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=o.x+(n.x-r.x),t.deltaY=o.y+(n.y-r.y)}function C(e,t){var n,r,o,i,a=e.lastInterval||t,s=t.timeStamp-a.timeStamp;if(t.eventType!=Ee&&(s>_e||void 0===a.velocity)){var u=a.deltaX-t.deltaX,l=a.deltaY-t.deltaY,c=D(s,u,l);r=c.x,o=c.y,n=le(c.x)>le(c.y)?c.x:c.y,i=M(u,l),e.lastInterval=t}else n=a.velocity,r=a.velocityX,o=a.velocityY,i=a.direction;t.velocity=n,t.velocityX=r,t.velocityY=o,t.direction=i}function E(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:ue(e.pointers[n].clientX),clientY:ue(e.pointers[n].clientY)},n++;return{timeStamp:ce(),pointers:t,center:x(t),deltaX:e.deltaX,deltaY:e.deltaY}}function x(e){var t=e.length;if(1===t)return{x:ue(e[0].clientX),y:ue(e[0].clientY)};for(var n=0,r=0,o=0;o<t;)n+=e[o].clientX,r+=e[o].clientY,o++;return{x:ue(n/t),y:ue(r/t)}}function D(e,t,n){return{x:t/e||0,y:n/e||0}}function M(e,t){return e===t?xe:le(e)>=le(t)?e>0?De:Me:t>0?Se:ke}function S(e,t,n){n||(n=Pe);var r=t[n[0]]-e[n[0]],o=t[n[1]]-e[n[1]];return Math.sqrt(r*r+o*o)}function k(e,t,n){n||(n=Pe);var r=t[n[0]]-e[n[0]],o=t[n[1]]-e[n[1]];return 180*Math.atan2(o,r)/Math.PI}function N(e,t){return k(t[1],t[0],Ie)-k(e[1],e[0],Ie)}function T(e,t){return S(t[0],t[1],Ie)/S(e[0],e[1],Ie)}function O(){this.evEl=Ae,this.evWin=Le,this.allow=!0,this.pressed=!1,g.apply(this,arguments)}function P(){this.evEl=je,this.evWin=Ye,g.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function I(){this.evTarget=Ve,this.evWin=Be,this.started=!1,g.apply(this,arguments)}function R(e,t){var n=oe(e.touches),r=oe(e.changedTouches);return t&(Ce|Ee)&&(n=f(n.concat(r),"identifier",!0)),[n,r]}function A(){this.evTarget=He,this.targetIds={},g.apply(this,arguments)}function L(){g.apply(this,arguments);var e=this.handler.bind(this);this.touch=new A(this.manager,e),this.mouse=new O(this.manager,e)}function U(e,t){this.manager=e,this.set(t)}function F(e){if(p(e,$e))return $e;var t=p(e,Je),n=p(e,et);return t&&n?Je+" "+et:t||n?t?Je:et:p(e,Ze)?Ze:Qe}function j(e){this.id=ee.uniqueId(),this.manager=null,this.options=re(e||{},this.defaults),this.options.enable=s(this.options.enable,!0),this.state=tt,this.simultaneous={},this.requireFail=[]}function Y(e){return e&at?"cancel":e&ot?"end":e&rt?"move":e&nt?"start":""}function W(e){return e==ke?"down":e==Se?"up":e==De?"left":e==Me?"right":""}function V(e,t){var n=t.manager;return n?n.get(e):e}function B(){j.apply(this,arguments)}function q(){B.apply(this,arguments),this.pX=null,this.pY=null}function H(){B.apply(this,arguments)}function z(){j.apply(this,arguments),this.timer=null,this.input=null}function G(){B.apply(this,arguments)}function K(){B.apply(this,arguments)}function X(){j.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this.timer=null,this.input=null,this.count=0}function Q(e,t){return t=t||{},t.recognizers=s(t.recognizers,Q.defaults.preset),new Z(e,t)}function Z(e,t){t=t||{},this.options=re(t,Q.defaults),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.element=e,this.input=y(this),this.touchAction=new U(this,this.options.touchAction),$(this,!0),t.recognizers.forEach(function(e){var t=this.add(new e[0](e[1]));e[2]&&t.recognizeWith(e[2]),e[3]&&t.requireFailure(e[3])},this)}function $(e,t){var n=e.element;ee.each(e.options.cssProps,function(e,r){n.style[m(n.style,r)]=t?e:""})}function J(e,t){var n=document.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t,t.target.dispatchEvent(n)}var ee=e("lodash"),te=ee.noop,ne=ee.extend,re=ee.defaults,oe=ee.toArray,ie=["","webkit","Moz","MS","ms","o"],ae=document.createElement("div"),se="function",ue=Math.round,le=Math.abs,ce=Date.now,pe=/mobile|tablet|ip(ad|hone|od)|android/i,de="ontouchstart"in window,he=void 0!==m(window,"PointerEvent"),fe=de&&pe.test(navigator.userAgent),me="touch",ve="pen",ge="mouse",ye="kinect",_e=25,be=1,we=2,Ce=4,Ee=8,xe=1,De=2,Me=4,Se=8,ke=16,Ne=De|Me,Te=Se|ke,Oe=Ne|Te,Pe=["x","y"],Ie=["clientX","clientY"];g.prototype={handler:te,init:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(v(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&l(this.element,this.evEl,this.domHandler),this.evTarget&&l(this.target,this.evTarget,this.domHandler),this.evWin&&l(v(this.element),this.evWin,this.domHandler)}};var Re={mousedown:be,mousemove:we,mouseup:Ce},Ae="mousedown",Le="mousemove mouseup";i(O,g,{handler:function(e){var t=Re[e.type];t&be&&e.button<2&&(this.pressed=!0),t&we&&1!==e.which&&(t=Ce),this.pressed&&this.allow&&(t&Ce&&(this.pressed=!1),this.callback(this.manager,t,{pointers:[e],changedPointers:[e],pointerType:ge,srcEvent:e}))}});var Ue={pointerdown:be,pointermove:we,pointerup:Ce,pointercancel:Ee,pointerout:Ee},Fe={2:me,3:ve,4:ge,5:ye},je="pointerdown",Ye="pointermove pointerup pointercancel";window.MSPointerEvent&&(je="MSPointerDown",Ye="MSPointerMove MSPointerUp MSPointerCancel"),i(P,g,{handler:function(e){var t=this.store,n=!1,r=e.type.toLowerCase().replace("ms",""),o=Ue[r],i=Fe[e.pointerType]||e.pointerType,a=i==me,s=h(t,e.pointerId,"pointerId");o&be&&(0===e.button||a)?s<0&&(t.push(e),s=t.length-1):o&(Ce|Ee)&&(n=!0),s<0||(t[s]=e,this.callback(this.manager,o,{pointers:t,changedPointers:[e],pointerType:i,srcEvent:e}),n&&t.splice(s,1))}});var We={touchstart:be,touchmove:we,touchend:Ce,touchcancel:Ee},Ve="touchstart",Be="touchstart touchmove touchend touchcancel";i(I,g,{handler:function(e){var t=We[e.type];if(t===be&&(this.started=!0),this.started){var n=R.call(this,e,t);t&(Ce|Ee)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:me,srcEvent:e})}}});var qe={touchstart:be,touchmove:we,touchend:Ce,touchcancel:Ee},He="touchstart touchmove touchend touchcancel";i(A,g,{handler:function(e){var t=qe[e.type],n=ze.call(this,e,t);n&&this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:me,srcEvent:e})}});var ze=function(e,t){var n=oe(e.touches),r=this.targetIds;if(t&(be|we)&&1===n.length)return r[n[0].identifier]=!0,[n,n];var o,i,a=oe(e.changedTouches),s=[],u=this.target;if(i=n.filter(function(e){return c(e.target,u)}),t===be)for(o=0;o<i.length;)r[i[o].identifier]=!0,o++;for(o=0;o<a.length;)r[a[o].identifier]&&s.push(a[o]),t&(Ce|Ee)&&delete r[a[o].identifier],o++;return s.length?[f(i.concat(s),"identifier",!0),s]:void 0};i(L,g,{handler:function(e,t,n){var r=n.pointerType==me,o=n.pointerType==ge;if(r)this.mouse.allow=!1;else if(o&&!this.mouse.allow)return;t&(Ce|Ee)&&(this.mouse.allow=!0),this.callback(e,t,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ge=m(ae.style,"touchAction"),Ke=void 0!==Ge,Xe="compute",Qe="auto",Ze="manipulation",$e="none",Je="pan-x",et="pan-y";U.prototype={set:function(e){e==Xe&&(e=this.compute()),Ke&&(this.manager.element.style[Ge]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return this.manager.recognizers.forEach(function(t){a(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),F(e.join(" "))},preventDefaults:function(e){if(!Ke){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented)return void t.preventDefault();var r=this.actions,o=p(r,$e),i=p(r,et),a=p(r,Je);return o||i&&n&Ne||a&&n&Te?this.preventSrc(t):void 0}},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};var tt=1,nt=2,rt=4,ot=8,it=ot,at=16,st=32;j.prototype={defaults:{},set:function(e){return ne(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(o(e,"recognizeWith",this))return this;var t=this.simultaneous;return e=V(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return o(e,"dropRecognizeWith",this)?this:(e=V(e,this),delete this.simultaneous[e.id],this)},requireFailure:function(e){if(o(e,"requireFailure",this))return this;var t=this.requireFail;return e=V(e,this),h(t,e)===-1&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(o(e,"dropRequireFailure",this))return this;e=V(e,this);var t=h(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){function t(t){n.manager.emit(n.options.event+(t?Y(r):""),e)}var n=this,r=this.state;r<ot&&t(!0),t(),r>=ot&&t(!0)},tryEmit:function(e){return this.canEmit()?this.emit(e):void(this.state=st)},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(st|tt)))return!1;e++}return!0},recognize:function(e){var t=ne({},e);return a(this.options.enable,[this,t])?(this.state&(it|at|st)&&(this.state=tt),this.state=this.process(t),void(this.state&(nt|rt|ot|at)&&this.tryEmit(t))):(this.reset(),void(this.state=st))},process:te,getTouchAction:te,reset:te},i(B,j,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return 0===t||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,r=t&(nt|rt),o=this.attrTest(e);return r&&(n&Ee||!o)?t|at:r||o?n&Ce?t|ot:t&nt?t|rt:nt:st}}),i(q,B,{defaults:{event:"pan",threshold:10,pointers:1,direction:Oe},getTouchAction:function(){var e=this.options.direction,t=[];return e&Ne&&t.push(et),e&Te&&t.push(Je),t},directionTest:function(e){var t=this.options,n=!0,r=e.distance,o=e.direction,i=e.deltaX,a=e.deltaY;return o&t.direction||(t.direction&Ne?(o=0===i?xe:i<0?De:Me,n=i!=this.pX,r=Math.abs(e.deltaX)):(o=0===a?xe:a<0?Se:ke,n=a!=this.pY,r=Math.abs(e.deltaY))),e.direction=o,n&&r>t.threshold&&o&t.direction},attrTest:function(e){return B.prototype.attrTest.call(this,e)&&(this.state&nt||!(this.state&nt)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=W(e.direction);t&&this.manager.emit(this.options.event+t,e),this.superior.emit.call(this,e)}}),i(H,B,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[$e]},attrTest:function(e){return this.superior.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&nt)},emit:function(e){if(this.superior.emit.call(this,e),1!==e.scale){var t=e.scale<1?"in":"out";this.manager.emit(this.options.event+t,e)}}}),i(z,j,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Qe]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,o=e.distance<t.threshold,i=e.deltaTime>t.time;if(this.input=e,!o||!n||e.eventType&(Ce|Ee)&&!i)this.reset();else if(e.eventType&be)this.reset(),this.timer=r(function(){this.state=it,this.tryEmit()},t.time,this);else if(e.eventType&Ce)return it;return st},reset:function(){clearTimeout(this.timer)},emit:function(e){this.state===it&&(e&&e.eventType&Ce?this.manager.emit(this.options.event+"up",e):(this.input.timeStamp=ce(),this.manager.emit(this.options.event,this.input)))}}),i(G,B,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[$e]},attrTest:function(e){return this.superior.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&nt)}}),i(K,B,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Ne|Te,pointers:1},getTouchAction:function(){return q.prototype.getTouchAction.call(this)},attrTest:function(e){var t,n=this.options.direction;return n&(Ne|Te)?t=e.velocity:n&Ne?t=e.velocityX:n&Te&&(t=e.velocityY),this.superior.attrTest.call(this,e)&&n&e.direction&&e.distance>this.options.threshold&&le(t)>this.options.velocity&&e.eventType&Ce},emit:function(e){var t=W(e.direction);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}}),i(X,j,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Ze]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,o=e.distance<t.threshold,i=e.deltaTime<t.time;if(this.reset(),e.eventType&be&&0===this.count)return this.failTimeout();if(o&&i&&n){if(e.eventType!=Ce)return this.failTimeout();var a=!this.pTime||e.timeStamp-this.pTime<t.interval,s=!this.pCenter||S(this.pCenter,e.center)<t.posThreshold;this.pTime=e.timeStamp,this.pCenter=e.center,s&&a?this.count+=1:this.count=1,this.input=e;var u=this.count%t.taps;if(0===u)return this.hasRequireFailures()?(this.timer=r(function(){this.state=it,this.tryEmit()},t.interval,this),nt):it}return st},failTimeout:function(){return this.timer=r(function(){this.state=st},this.options.interval,this),st},reset:function(){clearTimeout(this.timer)},emit:function(){this.state==it&&(this.input.tapCount=this.count,this.manager.emit(this.options.event,this.input))}}),Q.VERSION="2.0.4",Q.defaults={domEvents:!1,touchAction:Xe,enable:!0,inputTarget:null,inputClass:null,preset:[[G,{enable:!1}],[H,{enable:!1},["rotate"]],[K,{direction:Ne}],[q,{direction:Ne},["swipe"]],[X],[X,{event:"doubletap",taps:2},["tap"]],[z]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ut=1,lt=2;Z.prototype={set:function(e){return ne(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?lt:ut},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,r=this.recognizers,o=t.curRecognizer;(!o||o&&o.state&it)&&(o=t.curRecognizer=null);for(var i=0;i<r.length;)n=r[i],t.stopped===lt||o&&n!=o&&!n.canRecognizeWith(o)?n.reset():n.recognize(e),!o&&n.state&(nt|rt|ot)&&(o=t.curRecognizer=n),i++}},get:function(e){if(e instanceof j)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(o(e,"add",this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(o(e,"remove",this))return this;var t=this.recognizers;return e=this.get(e),t.splice(h(t,e),1),this.touchAction.update(),this},on:function(e,t){var n=this.handlers;return d(e).forEach(function(e){n[e]=n[e]||[],n[e].push(t)}),this},off:function(e,t){var n=this.handlers;return d(e).forEach(function(e){t?n[e].splice(h(n[e],t),1):delete n[e]}),this},emit:function(e,t){this.options.domEvents&&J(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(n&&n.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var r=0;r<n.length;)n[r](t),r++}},destroy:function(){this.element&&$(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ne(Q,{INPUT_START:be,INPUT_MOVE:we,INPUT_END:Ce,INPUT_CANCEL:Ee,STATE_POSSIBLE:tt,STATE_BEGAN:nt,STATE_CHANGED:rt,STATE_ENDED:ot,STATE_RECOGNIZED:it,STATE_CANCELLED:at,STATE_FAILED:st,DIRECTION_NONE:xe,DIRECTION_LEFT:De,DIRECTION_RIGHT:Me,DIRECTION_UP:Se,DIRECTION_DOWN:ke,DIRECTION_HORIZONTAL:Ne,DIRECTION_VERTICAL:Te,DIRECTION_ALL:Oe,Manager:Z,Input:g,TouchAction:U,TouchInput:A,MouseInput:O,PointerEventInput:P,TouchMouseInput:L,SingleTouchInput:I,Recognizer:j,AttrRecognizer:B,Tap:X,Pan:q,Swipe:K,Pinch:H,Rotate:G,Press:z,on:u,off:l,inherit:i,prefixed:m}),t.exports=Q},{lodash:"lodash"}],moment:[function(e,t,n){!function(e,r){"object"==typeof n&&void 0!==t?t.exports=r():"function"==typeof define&&define.amd?define(r):e.moment=r()}(this,function(){"use strict";function n(){return gr.apply(null,arguments)}function r(e){gr=e}function o(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function i(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function a(e){var t;for(t in e)return!1;return!0}function s(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function u(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function l(e,t){var n,r=[];for(n=0;n<e.length;++n)r.push(t(e[n],n));return r}function c(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e,t){for(var n in t)c(t,n)&&(e[n]=t[n]);return c(t,"toString")&&(e.toString=t.toString),c(t,"valueOf")&&(e.valueOf=t.valueOf),e}function d(e,t,n,r){return _t(e,t,n,r,!0).utc()}function h(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function f(e){return null==e._pf&&(e._pf=h()),e._pf}function m(e){if(null==e._isValid){var t=f(e),n=_r.call(t.parsedDateParts,function(e){return null!=e}),r=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(r=r&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return r;e._isValid=r}return e._isValid}function v(e){var t=d(NaN);return null!=e?p(f(t),e):f(t).userInvalidated=!0,t}function g(e){return void 0===e}function y(e,t){var n,r,o;if(g(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),g(t._i)||(e._i=t._i),g(t._f)||(e._f=t._f),g(t._l)||(e._l=t._l),g(t._strict)||(e._strict=t._strict),g(t._tzm)||(e._tzm=t._tzm),g(t._isUTC)||(e._isUTC=t._isUTC),g(t._offset)||(e._offset=t._offset),g(t._pf)||(e._pf=f(t)),g(t._locale)||(e._locale=t._locale),br.length>0)for(n in br)r=br[n],o=t[r],g(o)||(e[r]=o);return e}function _(e){y(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),wr===!1&&(wr=!0,n.updateOffset(this),wr=!1)}function b(e){return e instanceof _||null!=e&&null!=e._isAMomentObject}function w(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function C(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=w(t)),n}function E(e,t,n){var r,o=Math.min(e.length,t.length),i=Math.abs(e.length-t.length),a=0;for(r=0;r<o;r++)(n&&e[r]!==t[r]||!n&&C(e[r])!==C(t[r]))&&a++;return a+i}function x(e){n.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&void 0}function D(e,t){var r=!0;return p(function(){if(null!=n.deprecationHandler&&n.deprecationHandler(null,e),r){for(var o,i=[],a=0;a<arguments.length;a++){if(o="","object"==typeof arguments[a]){o+="\n["+a+"] ";for(var s in arguments[0])o+=s+": "+arguments[0][s]+", ";o=o.slice(0,-2)}else o=arguments[a];i.push(o)}x(e+"\nArguments: "+Array.prototype.slice.call(i).join("")+"\n"+Error().stack),r=!1}return t.apply(this,arguments)},t)}function M(e,t){null!=n.deprecationHandler&&n.deprecationHandler(e,t),Cr[e]||(x(t),Cr[e]=!0)}function S(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function k(e){var t,n;for(n in e)t=e[n],S(t)?this[n]=t:this["_"+n]=t;this._config=e,this._ordinalParseLenient=RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function N(e,t){var n,r=p({},e);for(n in t)c(t,n)&&(i(e[n])&&i(t[n])?(r[n]={},p(r[n],e[n]),p(r[n],t[n])):null!=t[n]?r[n]=t[n]:delete r[n]);for(n in e)c(e,n)&&!c(t,n)&&i(e[n])&&(r[n]=p({},r[n]));return r}function T(e){null!=e&&this.set(e)}function O(e,t,n){var r=this._calendar[e]||this._calendar.sameElse;return S(r)?r.call(t,n):r}function P(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])}function I(){return this._invalidDate}function R(e){return this._ordinal.replace("%d",e)}function A(e,t,n,r){var o=this._relativeTime[n];return S(o)?o(e,t,n,r):o.replace(/%d/i,e)}function L(e,t){var n=this._relativeTime[e>0?"future":"past"];return S(n)?n(t):n.replace(/%s/i,t)}function U(e,t){var n=e.toLowerCase();Pr[n]=Pr[n+"s"]=Pr[t]=e}function F(e){return"string"==typeof e?Pr[e]||Pr[e.toLowerCase()]:void 0}function j(e){var t,n,r={};for(n in e)c(e,n)&&(t=F(n),t&&(r[t]=e[n]));return r}function Y(e,t){Ir[e]=t}function W(e){var t=[];for(var n in e)t.push({unit:n,priority:Ir[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}function V(e,t){return function(r){return null!=r?(q(this,e,r),n.updateOffset(this,t),this):B(this,e)}}function B(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function q(e,t,n){e.isValid()&&e._d["set"+(e._isUTC?"UTC":"")+t](n)}function H(e){return e=F(e),S(this[e])?this[e]():this}function z(e,t){if("object"==typeof e){e=j(e);for(var n=W(e),r=0;r<n.length;r++)this[n[r].unit](e[n[r].unit])}else if(e=F(e),S(this[e]))return this[e](t);return this}function G(e,t,n){var r=""+Math.abs(e),o=t-r.length,i=e>=0;return(i?n?"+":"":"-")+(""+Math.pow(10,Math.max(0,o))).substr(1)+r}function K(e,t,n,r){var o=r;"string"==typeof r&&(o=function(){return this[r]();
}),e&&(Ur[e]=o),t&&(Ur[t[0]]=function(){return G(o.apply(this,arguments),t[1],t[2])}),n&&(Ur[n]=function(){return this.localeData().ordinal(o.apply(this,arguments),e)})}function X(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function Q(e){var t,n,r=e.match(Rr);for(t=0,n=r.length;t<n;t++)Ur[r[t]]?r[t]=Ur[r[t]]:r[t]=X(r[t]);return function(t){var o,i="";for(o=0;o<n;o++)i+=r[o]instanceof Function?r[o].call(t,e):r[o];return i}}function Z(e,t){return e.isValid()?(t=$(t,e.localeData()),Lr[t]=Lr[t]||Q(t),Lr[t](e)):e.localeData().invalidDate()}function $(e,t){function n(e){return t.longDateFormat(e)||e}var r=5;for(Ar.lastIndex=0;r>=0&&Ar.test(e);)e=e.replace(Ar,n),Ar.lastIndex=0,r-=1;return e}function J(e,t,n){to[e]=S(t)?t:function(e,r){return e&&n?n:t}}function ee(e,t){return c(to,e)?to[e](t._strict,t._locale):RegExp(te(e))}function te(e){return ne(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,r,o){return t||n||r||o}))}function ne(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function re(e,t){var n,r=t;for("string"==typeof e&&(e=[e]),s(t)&&(r=function(e,n){n[t]=C(e)}),n=0;n<e.length;n++)no[e[n]]=r}function oe(e,t){re(e,function(e,n,r,o){r._w=r._w||{},t(e,r._w,r,o)})}function ie(e,t,n){null!=t&&c(no,e)&&no[e](t,n._a,n,e)}function ae(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function se(e,t){return e?o(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||fo).test(t)?"format":"standalone"][e.month()]:this._months}function ue(e,t){return e?o(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[fo.test(t)?"format":"standalone"][e.month()]:this._monthsShort}function le(e,t,n){var r,o,i,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],r=0;r<12;++r)i=d([2e3,r]),this._shortMonthsParse[r]=this.monthsShort(i,"").toLocaleLowerCase(),this._longMonthsParse[r]=this.months(i,"").toLocaleLowerCase();return n?"MMM"===t?(o=ho.call(this._shortMonthsParse,a),o!==-1?o:null):(o=ho.call(this._longMonthsParse,a),o!==-1?o:null):"MMM"===t?(o=ho.call(this._shortMonthsParse,a),o!==-1?o:(o=ho.call(this._longMonthsParse,a),o!==-1?o:null)):(o=ho.call(this._longMonthsParse,a),o!==-1?o:(o=ho.call(this._shortMonthsParse,a),o!==-1?o:null))}function ce(e,t,n){var r,o,i;if(this._monthsParseExact)return le.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),r=0;r<12;r++){if(o=d([2e3,r]),n&&!this._longMonthsParse[r]&&(this._longMonthsParse[r]=RegExp("^"+this.months(o,"").replace(".","")+"$","i"),this._shortMonthsParse[r]=RegExp("^"+this.monthsShort(o,"").replace(".","")+"$","i")),n||this._monthsParse[r]||(i="^"+this.months(o,"")+"|^"+this.monthsShort(o,""),this._monthsParse[r]=RegExp(i.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[r].test(e))return r;if(n&&"MMM"===t&&this._shortMonthsParse[r].test(e))return r;if(!n&&this._monthsParse[r].test(e))return r}}function pe(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=C(t);else if(t=e.localeData().monthsParse(t),!s(t))return e;return n=Math.min(e.date(),ae(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function de(e){return null!=e?(pe(this,e),n.updateOffset(this,!0),this):B(this,"Month")}function he(){return ae(this.year(),this.month())}function fe(e){return this._monthsParseExact?(c(this,"_monthsRegex")||ve.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(c(this,"_monthsShortRegex")||(this._monthsShortRegex=go),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)}function me(e){return this._monthsParseExact?(c(this,"_monthsRegex")||ve.call(this),e?this._monthsStrictRegex:this._monthsRegex):(c(this,"_monthsRegex")||(this._monthsRegex=yo),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)}function ve(){function e(e,t){return t.length-e.length}var t,n,r=[],o=[],i=[];for(t=0;t<12;t++)n=d([2e3,t]),r.push(this.monthsShort(n,"")),o.push(this.months(n,"")),i.push(this.months(n,"")),i.push(this.monthsShort(n,""));for(r.sort(e),o.sort(e),i.sort(e),t=0;t<12;t++)r[t]=ne(r[t]),o[t]=ne(o[t]);for(t=0;t<24;t++)i[t]=ne(i[t]);this._monthsRegex=RegExp("^("+i.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=RegExp("^("+o.join("|")+")","i"),this._monthsShortStrictRegex=RegExp("^("+r.join("|")+")","i")}function ge(e){return ye(e)?366:365}function ye(e){return e%4===0&&e%100!==0||e%400===0}function _e(){return ye(this.year())}function be(e,t,n,r,o,i,a){var s=new Date(e,t,n,r,o,i,a);return e<100&&e>=0&&isFinite(s.getFullYear())&&s.setFullYear(e),s}function we(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function Ce(e,t,n){var r=7+t-n,o=(7+we(e,0,r).getUTCDay()-t)%7;return-o+r-1}function Ee(e,t,n,r,o){var i,a,s=(7+n-r)%7,u=Ce(e,r,o),l=1+7*(t-1)+s+u;return l<=0?(i=e-1,a=ge(i)+l):l>ge(e)?(i=e+1,a=l-ge(e)):(i=e,a=l),{year:i,dayOfYear:a}}function xe(e,t,n){var r,o,i=Ce(e.year(),t,n),a=Math.floor((e.dayOfYear()-i-1)/7)+1;return a<1?(o=e.year()-1,r=a+De(o,t,n)):a>De(e.year(),t,n)?(r=a-De(e.year(),t,n),o=e.year()+1):(o=e.year(),r=a),{week:r,year:o}}function De(e,t,n){var r=Ce(e,t,n),o=Ce(e+1,t,n);return(ge(e)-r+o)/7}function Me(e){return xe(e,this._week.dow,this._week.doy).week}function Se(){return this._week.dow}function ke(){return this._week.doy}function Ne(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")}function Te(e){var t=xe(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")}function Oe(e,t){return"string"!=typeof e?e:isNaN(e)?(e=t.weekdaysParse(e),"number"==typeof e?e:null):parseInt(e,10)}function Pe(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function Ie(e,t){return e?o(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:this._weekdays}function Re(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort}function Ae(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin}function Le(e,t,n){var r,o,i,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],r=0;r<7;++r)i=d([2e3,1]).day(r),this._minWeekdaysParse[r]=this.weekdaysMin(i,"").toLocaleLowerCase(),this._shortWeekdaysParse[r]=this.weekdaysShort(i,"").toLocaleLowerCase(),this._weekdaysParse[r]=this.weekdays(i,"").toLocaleLowerCase();return n?"dddd"===t?(o=ho.call(this._weekdaysParse,a),o!==-1?o:null):"ddd"===t?(o=ho.call(this._shortWeekdaysParse,a),o!==-1?o:null):(o=ho.call(this._minWeekdaysParse,a),o!==-1?o:null):"dddd"===t?(o=ho.call(this._weekdaysParse,a),o!==-1?o:(o=ho.call(this._shortWeekdaysParse,a),o!==-1?o:(o=ho.call(this._minWeekdaysParse,a),o!==-1?o:null))):"ddd"===t?(o=ho.call(this._shortWeekdaysParse,a),o!==-1?o:(o=ho.call(this._weekdaysParse,a),o!==-1?o:(o=ho.call(this._minWeekdaysParse,a),o!==-1?o:null))):(o=ho.call(this._minWeekdaysParse,a),o!==-1?o:(o=ho.call(this._weekdaysParse,a),o!==-1?o:(o=ho.call(this._shortWeekdaysParse,a),o!==-1?o:null)))}function Ue(e,t,n){var r,o,i;if(this._weekdaysParseExact)return Le.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),r=0;r<7;r++){if(o=d([2e3,1]).day(r),n&&!this._fullWeekdaysParse[r]&&(this._fullWeekdaysParse[r]=RegExp("^"+this.weekdays(o,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[r]=RegExp("^"+this.weekdaysShort(o,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[r]=RegExp("^"+this.weekdaysMin(o,"").replace(".",".?")+"$","i")),this._weekdaysParse[r]||(i="^"+this.weekdays(o,"")+"|^"+this.weekdaysShort(o,"")+"|^"+this.weekdaysMin(o,""),this._weekdaysParse[r]=RegExp(i.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[r].test(e))return r;if(n&&"ddd"===t&&this._shortWeekdaysParse[r].test(e))return r;if(n&&"dd"===t&&this._minWeekdaysParse[r].test(e))return r;if(!n&&this._weekdaysParse[r].test(e))return r}}function Fe(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=Oe(e,this.localeData()),this.add(e-t,"d")):t}function je(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")}function Ye(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=Pe(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7}function We(e){return this._weekdaysParseExact?(c(this,"_weekdaysRegex")||qe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(c(this,"_weekdaysRegex")||(this._weekdaysRegex=xo),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)}function Ve(e){return this._weekdaysParseExact?(c(this,"_weekdaysRegex")||qe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(c(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Do),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Be(e){return this._weekdaysParseExact?(c(this,"_weekdaysRegex")||qe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(c(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Mo),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function qe(){function e(e,t){return t.length-e.length}var t,n,r,o,i,a=[],s=[],u=[],l=[];for(t=0;t<7;t++)n=d([2e3,1]).day(t),r=this.weekdaysMin(n,""),o=this.weekdaysShort(n,""),i=this.weekdays(n,""),a.push(r),s.push(o),u.push(i),l.push(r),l.push(o),l.push(i);for(a.sort(e),s.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)s[t]=ne(s[t]),u[t]=ne(u[t]),l[t]=ne(l[t]);this._weekdaysRegex=RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=RegExp("^("+s.join("|")+")","i"),this._weekdaysMinStrictRegex=RegExp("^("+a.join("|")+")","i")}function He(){return this.hours()%12||12}function ze(){return this.hours()||24}function Ge(e,t){K(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function Ke(e,t){return t._meridiemParse}function Xe(e){return"p"===(e+"").toLowerCase().charAt(0)}function Qe(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"}function Ze(e){return e?e.toLowerCase().replace("_","-"):e}function $e(e){for(var t,n,r,o,i=0;i<e.length;){for(o=Ze(e[i]).split("-"),t=o.length,n=Ze(e[i+1]),n=n?n.split("-"):null;t>0;){if(r=Je(o.slice(0,t).join("-")))return r;if(n&&n.length>=t&&E(o,n,!0)>=t-1)break;t--}i++}return null}function Je(n){var r=null;if(!Oo[n]&&void 0!==t&&t&&t.exports)try{r=So._abbr,e("./locale/"+n),et(r)}catch(e){}return Oo[n]}function et(e,t){var n;return e&&(n=g(t)?rt(e):tt(e,t),n&&(So=n)),So._abbr}function tt(e,t){if(null!==t){var n=To;if(t.abbr=e,null!=Oo[e])M("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=Oo[e]._config;else if(null!=t.parentLocale){if(null==Oo[t.parentLocale])return Po[t.parentLocale]||(Po[t.parentLocale]=[]),Po[t.parentLocale].push({name:e,config:t}),null;n=Oo[t.parentLocale]._config}return Oo[e]=new T(N(n,t)),Po[e]&&Po[e].forEach(function(e){tt(e.name,e.config)}),et(e),Oo[e]}return delete Oo[e],null}function nt(e,t){if(null!=t){var n,r=To;null!=Oo[e]&&(r=Oo[e]._config),t=N(r,t),n=new T(t),n.parentLocale=Oo[e],Oo[e]=n,et(e)}else null!=Oo[e]&&(null!=Oo[e].parentLocale?Oo[e]=Oo[e].parentLocale:null!=Oo[e]&&delete Oo[e]);return Oo[e]}function rt(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return So;if(!o(e)){if(t=Je(e))return t;e=[e]}return $e(e)}function ot(){return Dr(Oo)}function it(e){var t,n=e._a;return n&&f(e).overflow===-2&&(t=n[oo]<0||n[oo]>11?oo:n[io]<1||n[io]>ae(n[ro],n[oo])?io:n[ao]<0||n[ao]>24||24===n[ao]&&(0!==n[so]||0!==n[uo]||0!==n[lo])?ao:n[so]<0||n[so]>59?so:n[uo]<0||n[uo]>59?uo:n[lo]<0||n[lo]>999?lo:-1,f(e)._overflowDayOfYear&&(t<ro||t>io)&&(t=io),f(e)._overflowWeeks&&t===-1&&(t=co),f(e)._overflowWeekday&&t===-1&&(t=po),f(e).overflow=t),e}function at(e){var t,n,r,o,i,a,s=e._i,u=Io.exec(s)||Ro.exec(s);if(u){for(f(e).iso=!0,t=0,n=Lo.length;t<n;t++)if(Lo[t][1].exec(u[1])){o=Lo[t][0],r=Lo[t][2]!==!1;break}if(null==o)return void(e._isValid=!1);if(u[3]){for(t=0,n=Uo.length;t<n;t++)if(Uo[t][1].exec(u[3])){i=(u[2]||" ")+Uo[t][0];break}if(null==i)return void(e._isValid=!1)}if(!r&&null!=i)return void(e._isValid=!1);if(u[4]){if(!Ao.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=o+(i||"")+(a||""),dt(e)}else e._isValid=!1}function st(e){var t=Fo.exec(e._i);return null!==t?void(e._d=new Date(+t[1])):(at(e),void(e._isValid===!1&&(delete e._isValid,n.createFromInputFallback(e))))}function ut(e,t,n){return null!=e?e:null!=t?t:n}function lt(e){var t=new Date(n.now());return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function ct(e){var t,n,r,o,i=[];if(!e._d){for(r=lt(e),e._w&&null==e._a[io]&&null==e._a[oo]&&pt(e),e._dayOfYear&&(o=ut(e._a[ro],r[ro]),e._dayOfYear>ge(o)&&(f(e)._overflowDayOfYear=!0),n=we(o,0,e._dayOfYear),e._a[oo]=n.getUTCMonth(),e._a[io]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=i[t]=r[t];for(;t<7;t++)e._a[t]=i[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ao]&&0===e._a[so]&&0===e._a[uo]&&0===e._a[lo]&&(e._nextDay=!0,e._a[ao]=0),e._d=(e._useUTC?we:be).apply(null,i),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ao]=24)}}function pt(e){var t,n,r,o,i,a,s,u;if(t=e._w,null!=t.GG||null!=t.W||null!=t.E)i=1,a=4,n=ut(t.GG,e._a[ro],xe(bt(),1,4).year),r=ut(t.W,1),o=ut(t.E,1),(o<1||o>7)&&(u=!0);else{i=e._locale._week.dow,a=e._locale._week.doy;var l=xe(bt(),i,a);n=ut(t.gg,e._a[ro],l.year),r=ut(t.w,l.week),null!=t.d?(o=t.d,(o<0||o>6)&&(u=!0)):null!=t.e?(o=t.e+i,(t.e<0||t.e>6)&&(u=!0)):o=i}r<1||r>De(n,i,a)?f(e)._overflowWeeks=!0:null!=u?f(e)._overflowWeekday=!0:(s=Ee(n,r,o,i,a),e._a[ro]=s.year,e._dayOfYear=s.dayOfYear)}function dt(e){if(e._f===n.ISO_8601)return void at(e);e._a=[],f(e).empty=!0;var t,r,o,i,a,s=""+e._i,u=s.length,l=0;for(o=$(e._f,e._locale).match(Rr)||[],t=0;t<o.length;t++)i=o[t],r=(s.match(ee(i,e))||[])[0],r&&(a=s.substr(0,s.indexOf(r)),a.length>0&&f(e).unusedInput.push(a),s=s.slice(s.indexOf(r)+r.length),l+=r.length),Ur[i]?(r?f(e).empty=!1:f(e).unusedTokens.push(i),ie(i,r,e)):e._strict&&!r&&f(e).unusedTokens.push(i);f(e).charsLeftOver=u-l,s.length>0&&f(e).unusedInput.push(s),e._a[ao]<=12&&f(e).bigHour===!0&&e._a[ao]>0&&(f(e).bigHour=void 0),f(e).parsedDateParts=e._a.slice(0),f(e).meridiem=e._meridiem,e._a[ao]=ht(e._locale,e._a[ao],e._meridiem),ct(e),it(e)}function ht(e,t,n){var r;return null==n?t:null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?(r=e.isPM(n),r&&t<12&&(t+=12),r||12!==t||(t=0),t):t}function ft(e){var t,n,r,o,i;if(0===e._f.length)return f(e).invalidFormat=!0,void(e._d=new Date(NaN));for(o=0;o<e._f.length;o++)i=0,t=y({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[o],dt(t),m(t)&&(i+=f(t).charsLeftOver,i+=10*f(t).unusedTokens.length,f(t).score=i,(null==r||i<r)&&(r=i,n=t));p(e,n||t)}function mt(e){if(!e._d){var t=j(e._i);e._a=l([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ct(e)}}function vt(e){var t=new _(it(gt(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function gt(e){var t=e._i,n=e._f;return e._locale=e._locale||rt(e._l),null===t||void 0===n&&""===t?v({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),b(t)?new _(it(t)):(u(t)?e._d=t:o(n)?ft(e):n?dt(e):yt(e),m(e)||(e._d=null),e))}function yt(e){var t=e._i;void 0===t?e._d=new Date(n.now()):u(t)?e._d=new Date(t.valueOf()):"string"==typeof t?st(e):o(t)?(e._a=l(t.slice(0),function(e){return parseInt(e,10)}),ct(e)):"object"==typeof t?mt(e):s(t)?e._d=new Date(t):n.createFromInputFallback(e)}function _t(e,t,n,r,s){var u={};return n!==!0&&n!==!1||(r=n,n=void 0),(i(e)&&a(e)||o(e)&&0===e.length)&&(e=void 0),u._isAMomentObject=!0,u._useUTC=u._isUTC=s,u._l=n,u._i=e,u._f=t,u._strict=r,vt(u)}function bt(e,t,n,r){return _t(e,t,n,r,!1)}function wt(e,t){var n,r;if(1===t.length&&o(t[0])&&(t=t[0]),!t.length)return bt();for(n=t[0],r=1;r<t.length;++r)t[r].isValid()&&!t[r][e](n)||(n=t[r]);return n}function Ct(){var e=[].slice.call(arguments,0);return wt("isBefore",e)}function Et(){var e=[].slice.call(arguments,0);return wt("isAfter",e)}function xt(e){var t=j(e),n=t.year||0,r=t.quarter||0,o=t.month||0,i=t.week||0,a=t.day||0,s=t.hour||0,u=t.minute||0,l=t.second||0,c=t.millisecond||0;this._milliseconds=+c+1e3*l+6e4*u+1e3*s*60*60,this._days=+a+7*i,this._months=+o+3*r+12*n,this._data={},this._locale=rt(),this._bubble()}function Dt(e){return e instanceof xt}function Mt(e){return e<0?Math.round(-1*e)*-1:Math.round(e)}function St(e,t){K(e,0,0,function(){var e=this.utcOffset(),n="+";return e<0&&(e=-e,n="-"),n+G(~~(e/60),2)+t+G(~~e%60,2)})}function kt(e,t){var n=(t||"").match(e);if(null===n)return null;var r=n[n.length-1]||[],o=(r+"").match(Vo)||["-",0,0],i=+(60*o[1])+C(o[2]);return 0===i?0:"+"===o[0]?i:-i}function Nt(e,t){var r,o;return t._isUTC?(r=t.clone(),o=(b(e)||u(e)?e.valueOf():bt(e).valueOf())-r.valueOf(),r._d.setTime(r._d.valueOf()+o),n.updateOffset(r,!1),r):bt(e).local()}function Tt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Ot(e,t){var r,o=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(e=kt($r,e),null===e)return this}else Math.abs(e)<16&&(e*=60);return!this._isUTC&&t&&(r=Tt(this)),this._offset=e,this._isUTC=!0,null!=r&&this.add(r,"m"),o!==e&&(!t||this._changeInProgress?Gt(this,Vt(e-o,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,n.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?o:Tt(this)}function Pt(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function It(e){return this.utcOffset(0,e)}function Rt(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Tt(this),"m")),this}function At(){if(null!=this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var e=kt(Zr,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this}function Lt(e){return!!this.isValid()&&(e=e?bt(e).utcOffset():0,(this.utcOffset()-e)%60===0)}function Ut(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ft(){if(!g(this._isDSTShifted))return this._isDSTShifted;var e={};if(y(e,this),e=gt(e),e._a){var t=e._isUTC?d(e._a):bt(e._a);this._isDSTShifted=this.isValid()&&E(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function jt(){return!!this.isValid()&&!this._isUTC}function Yt(){return!!this.isValid()&&this._isUTC}function Wt(){return!!this.isValid()&&this._isUTC&&0===this._offset}function Vt(e,t){var n,r,o,i=e,a=null;return Dt(e)?i={ms:e._milliseconds,d:e._days,M:e._months}:s(e)?(i={},t?i[t]=e:i.milliseconds=e):(a=Bo.exec(e))?(n="-"===a[1]?-1:1,i={y:0,d:C(a[io])*n,h:C(a[ao])*n,m:C(a[so])*n,s:C(a[uo])*n,ms:C(Mt(1e3*a[lo]))*n}):(a=qo.exec(e))?(n="-"===a[1]?-1:1,i={y:Bt(a[2],n),M:Bt(a[3],n),w:Bt(a[4],n),d:Bt(a[5],n),h:Bt(a[6],n),m:Bt(a[7],n),s:Bt(a[8],n)}):null==i?i={}:"object"==typeof i&&("from"in i||"to"in i)&&(o=Ht(bt(i.from),bt(i.to)),i={},i.ms=o.milliseconds,i.M=o.months),r=new xt(i),Dt(e)&&c(e,"_locale")&&(r._locale=e._locale),r}function Bt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function qt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function Ht(e,t){var n;return e.isValid()&&t.isValid()?(t=Nt(t,e),e.isBefore(t)?n=qt(e,t):(n=qt(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function zt(e,t){return function(n,r){var o,i;return null===r||isNaN(+r)||(M(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),i=n,n=r,r=i),n="string"==typeof n?+n:n,o=Vt(n,r),Gt(this,o,e),this}}function Gt(e,t,r,o){var i=t._milliseconds,a=Mt(t._days),s=Mt(t._months);e.isValid()&&(o=null==o||o,i&&e._d.setTime(e._d.valueOf()+i*r),a&&q(e,"Date",B(e,"Date")+a*r),s&&pe(e,B(e,"Month")+s*r),o&&n.updateOffset(e,a||s))}function Kt(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"}function Xt(e,t){var r=e||bt(),o=Nt(r,this).startOf("day"),i=n.calendarFormat(this,o)||"sameElse",a=t&&(S(t[i])?t[i].call(this,r):t[i]);return this.format(a||this.localeData().calendar(i,this,bt(r)))}function Qt(){return new _(this)}function Zt(e,t){var n=b(e)?e:bt(e);return!(!this.isValid()||!n.isValid())&&(t=F(g(t)?"millisecond":t),"millisecond"===t?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())}function $t(e,t){var n=b(e)?e:bt(e);return!(!this.isValid()||!n.isValid())&&(t=F(g(t)?"millisecond":t),"millisecond"===t?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())}function Jt(e,t,n,r){return r=r||"()",("("===r[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===r[1]?this.isBefore(t,n):!this.isAfter(t,n))}function en(e,t){var n,r=b(e)?e:bt(e);return!(!this.isValid()||!r.isValid())&&(t=F(t||"millisecond"),"millisecond"===t?this.valueOf()===r.valueOf():(n=r.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))}function tn(e,t){return this.isSame(e,t)||this.isAfter(e,t)}function nn(e,t){return this.isSame(e,t)||this.isBefore(e,t)}function rn(e,t,n){var r,o,i,a;return this.isValid()?(r=Nt(e,this),r.isValid()?(o=6e4*(r.utcOffset()-this.utcOffset()),t=F(t),"year"===t||"month"===t||"quarter"===t?(a=on(this,r),"quarter"===t?a/=3:"year"===t&&(a/=12)):(i=this-r,a="second"===t?i/1e3:"minute"===t?i/6e4:"hour"===t?i/36e5:"day"===t?(i-o)/864e5:"week"===t?(i-o)/6048e5:i),n?a:w(a)):NaN):NaN}function on(e,t){var n,r,o=12*(t.year()-e.year())+(t.month()-e.month()),i=e.clone().add(o,"months");return t-i<0?(n=e.clone().add(o-1,"months"),r=(t-i)/(i-n)):(n=e.clone().add(o+1,"months"),r=(t-i)/(n-i)),-(o+r)||0}function an(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function sn(){var e=this.clone().utc();return 0<e.year()&&e.year()<=9999?S(Date.prototype.toISOString)?this.toDate().toISOString():Z(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):Z(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function un(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',r=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",o="-MM-DD[T]HH:mm:ss.SSS",i=t+'[")]';return this.format(n+r+o+i)}function ln(e){e||(e=this.isUtc()?n.defaultFormatUtc:n.defaultFormat);var t=Z(this,e);return this.localeData().postformat(t)}function cn(e,t){return this.isValid()&&(b(e)&&e.isValid()||bt(e).isValid())?Vt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function pn(e){return this.from(bt(),e)}function dn(e,t){return this.isValid()&&(b(e)&&e.isValid()||bt(e).isValid())?Vt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function hn(e){return this.to(bt(),e)}function fn(e){var t;return void 0===e?this._locale._abbr:(t=rt(e),null!=t&&(this._locale=t),this)}function mn(){return this._locale}function vn(e){switch(e=F(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this}function gn(e){return e=F(e),void 0===e||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))}function yn(){return this._d.valueOf()-6e4*(this._offset||0)}function _n(){return Math.floor(this.valueOf()/1e3)}function bn(){return new Date(this.valueOf())}function wn(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function Cn(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function En(){return this.isValid()?this.toISOString():null}function xn(){return m(this)}function Dn(){return p({},f(this))}function Mn(){return f(this).overflow}function Sn(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function kn(e,t){K(0,[e,e.length],0,t)}function Nn(e){return In.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Tn(e){return In.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)}function On(){return De(this.year(),1,4)}function Pn(){var e=this.localeData()._week;return De(this.year(),e.dow,e.doy)}function In(e,t,n,r,o){var i;return null==e?xe(this,r,o).year:(i=De(e,r,o),t>i&&(t=i),Rn.call(this,e,t,n,r,o))}function Rn(e,t,n,r,o){var i=Ee(e,t,n,r,o),a=we(i.year,0,i.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}function An(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)}function Ln(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")}function Un(e,t){t[lo]=C(1e3*("0."+e))}function Fn(){return this._isUTC?"UTC":""}function jn(){return this._isUTC?"Coordinated Universal Time":""}function Yn(e){return bt(1e3*e)}function Wn(){return bt.apply(null,arguments).parseZone()}function Vn(e){return e}function Bn(e,t,n,r){var o=rt(),i=d().set(r,t);return o[n](i,e)}function qn(e,t,n){if(s(e)&&(t=e,e=void 0),e=e||"",null!=t)return Bn(e,t,n,"month");var r,o=[];for(r=0;r<12;r++)o[r]=Bn(e,r,n,"month");return o}function Hn(e,t,n,r){"boolean"==typeof e?(s(t)&&(n=t,t=void 0),t=t||""):(t=e,n=t,e=!1,s(t)&&(n=t,t=void 0),t=t||"");var o=rt(),i=e?o._week.dow:0;if(null!=n)return Bn(t,(n+i)%7,r,"day");var a,u=[];for(a=0;a<7;a++)u[a]=Bn(t,(a+i)%7,r,"day");return u}function zn(e,t){return qn(e,t,"months")}function Gn(e,t){return qn(e,t,"monthsShort")}function Kn(e,t,n){return Hn(e,t,n,"weekdays")}function Xn(e,t,n){return Hn(e,t,n,"weekdaysShort")}function Qn(e,t,n){return Hn(e,t,n,"weekdaysMin")}function Zn(){var e=this._data;return this._milliseconds=ti(this._milliseconds),this._days=ti(this._days),this._months=ti(this._months),e.milliseconds=ti(e.milliseconds),e.seconds=ti(e.seconds),e.minutes=ti(e.minutes),e.hours=ti(e.hours),e.months=ti(e.months),e.years=ti(e.years),this}function $n(e,t,n,r){var o=Vt(t,n);return e._milliseconds+=r*o._milliseconds,e._days+=r*o._days,e._months+=r*o._months,e._bubble()}function Jn(e,t){return $n(this,e,t,1)}function er(e,t){return $n(this,e,t,-1)}function tr(e){return e<0?Math.floor(e):Math.ceil(e)}function nr(){var e,t,n,r,o,i=this._milliseconds,a=this._days,s=this._months,u=this._data;return i>=0&&a>=0&&s>=0||i<=0&&a<=0&&s<=0||(i+=864e5*tr(or(s)+a),a=0,s=0),u.milliseconds=i%1e3,e=w(i/1e3),u.seconds=e%60,t=w(e/60),u.minutes=t%60,n=w(t/60),u.hours=n%24,a+=w(n/24),o=w(rr(a)),s+=o,a-=tr(or(o)),r=w(s/12),s%=12,u.days=a,u.months=s,u.years=r,this}function rr(e){return 4800*e/146097}function or(e){return 146097*e/4800}function ir(e){var t,n,r=this._milliseconds;if(e=F(e),"month"===e||"year"===e)return t=this._days+r/864e5,n=this._months+rr(t),"month"===e?n:n/12;switch(t=this._days+Math.round(or(this._months)),e){case"week":return t/7+r/6048e5;case"day":return t+r/864e5;case"hour":return 24*t+r/36e5;case"minute":return 1440*t+r/6e4;case"second":return 86400*t+r/1e3;case"millisecond":return Math.floor(864e5*t)+r;default:throw Error("Unknown unit "+e)}}function ar(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*C(this._months/12)}function sr(e){return function(){return this.as(e)}}function ur(e){return e=F(e),this[e+"s"]()}function lr(e){return function(){return this._data[e]}}function cr(){return w(this.days()/7)}function pr(e,t,n,r,o){return o.relativeTime(t||1,!!n,e,r)}function dr(e,t,n){var r=Vt(e).abs(),o=gi(r.as("s")),i=gi(r.as("m")),a=gi(r.as("h")),s=gi(r.as("d")),u=gi(r.as("M")),l=gi(r.as("y")),c=o<yi.s&&["s",o]||i<=1&&["m"]||i<yi.m&&["mm",i]||a<=1&&["h"]||a<yi.h&&["hh",a]||s<=1&&["d"]||s<yi.d&&["dd",s]||u<=1&&["M"]||u<yi.M&&["MM",u]||l<=1&&["y"]||["yy",l];return c[2]=t,c[3]=+e>0,c[4]=n,pr.apply(null,c)}function hr(e){return void 0===e?gi:"function"==typeof e&&(gi=e,!0)}function fr(e,t){return void 0!==yi[e]&&(void 0===t?yi[e]:(yi[e]=t,!0))}function mr(e){var t=this.localeData(),n=dr(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)}function vr(){var e,t,n,r=_i(this._milliseconds)/1e3,o=_i(this._days),i=_i(this._months);e=w(r/60),t=w(e/60),r%=60,e%=60,n=w(i/12),i%=12;var a=n,s=i,u=o,l=t,c=e,p=r,d=this.asSeconds();return d?(d<0?"-":"")+"P"+(a?a+"Y":"")+(s?s+"M":"")+(u?u+"D":"")+(l||c||p?"T":"")+(l?l+"H":"")+(c?c+"M":"")+(p?p+"S":""):"P0D"}var gr,yr;yr=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,r=0;r<n;r++)if(r in t&&e.call(this,t[r],r,t))return!0;return!1};var _r=yr,br=n.momentProperties=[],wr=!1,Cr={};n.suppressDeprecationWarnings=!1,n.deprecationHandler=null;var Er;Er=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)c(e,t)&&n.push(t);return n};var xr,Dr=Er,Mr={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Sr={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},kr="Invalid date",Nr="%d",Tr=/\d{1,2}/,Or={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Pr={},Ir={},Rr=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Ar=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Lr={},Ur={},Fr=/\d/,jr=/\d\d/,Yr=/\d{3}/,Wr=/\d{4}/,Vr=/[+-]?\d{6}/,Br=/\d\d?/,qr=/\d\d\d\d?/,Hr=/\d\d\d\d\d\d?/,zr=/\d{1,3}/,Gr=/\d{1,4}/,Kr=/[+-]?\d{1,6}/,Xr=/\d+/,Qr=/[+-]?\d+/,Zr=/Z|[+-]\d\d:?\d\d/gi,$r=/Z|[+-]\d\d(?::?\d\d)?/gi,Jr=/[+-]?\d+(\.\d{1,3})?/,eo=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,to={},no={},ro=0,oo=1,io=2,ao=3,so=4,uo=5,lo=6,co=7,po=8;xr=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1};var ho=xr;K("M",["MM",2],"Mo",function(){return this.month()+1}),K("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),K("MMMM",0,0,function(e){return this.localeData().months(this,e)}),U("month","M"),Y("month",8),J("M",Br),J("MM",Br,jr),J("MMM",function(e,t){return t.monthsShortRegex(e)}),J("MMMM",function(e,t){return t.monthsRegex(e)}),re(["M","MM"],function(e,t){t[oo]=C(e)-1}),re(["MMM","MMMM"],function(e,t,n,r){var o=n._locale.monthsParse(e,r,n._strict);null!=o?t[oo]=o:f(n).invalidMonth=e});var fo=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,mo="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),vo="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),go=eo,yo=eo;
K("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),K(0,["YY",2],0,function(){return this.year()%100}),K(0,["YYYY",4],0,"year"),K(0,["YYYYY",5],0,"year"),K(0,["YYYYYY",6,!0],0,"year"),U("year","y"),Y("year",1),J("Y",Qr),J("YY",Br,jr),J("YYYY",Gr,Wr),J("YYYYY",Kr,Vr),J("YYYYYY",Kr,Vr),re(["YYYYY","YYYYYY"],ro),re("YYYY",function(e,t){t[ro]=2===e.length?n.parseTwoDigitYear(e):C(e)}),re("YY",function(e,t){t[ro]=n.parseTwoDigitYear(e)}),re("Y",function(e,t){t[ro]=parseInt(e,10)}),n.parseTwoDigitYear=function(e){return C(e)+(C(e)>68?1900:2e3)};var _o=V("FullYear",!0);K("w",["ww",2],"wo","week"),K("W",["WW",2],"Wo","isoWeek"),U("week","w"),U("isoWeek","W"),Y("week",5),Y("isoWeek",5),J("w",Br),J("ww",Br,jr),J("W",Br),J("WW",Br,jr),oe(["w","ww","W","WW"],function(e,t,n,r){t[r.substr(0,1)]=C(e)});var bo={dow:0,doy:6};K("d",0,"do","day"),K("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),K("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),K("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),K("e",0,0,"weekday"),K("E",0,0,"isoWeekday"),U("day","d"),U("weekday","e"),U("isoWeekday","E"),Y("day",11),Y("weekday",11),Y("isoWeekday",11),J("d",Br),J("e",Br),J("E",Br),J("dd",function(e,t){return t.weekdaysMinRegex(e)}),J("ddd",function(e,t){return t.weekdaysShortRegex(e)}),J("dddd",function(e,t){return t.weekdaysRegex(e)}),oe(["dd","ddd","dddd"],function(e,t,n,r){var o=n._locale.weekdaysParse(e,r,n._strict);null!=o?t.d=o:f(n).invalidWeekday=e}),oe(["d","e","E"],function(e,t,n,r){t[r]=C(e)});var wo="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Co="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Eo="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),xo=eo,Do=eo,Mo=eo;K("H",["HH",2],0,"hour"),K("h",["hh",2],0,He),K("k",["kk",2],0,ze),K("hmm",0,0,function(){return""+He.apply(this)+G(this.minutes(),2)}),K("hmmss",0,0,function(){return""+He.apply(this)+G(this.minutes(),2)+G(this.seconds(),2)}),K("Hmm",0,0,function(){return""+this.hours()+G(this.minutes(),2)}),K("Hmmss",0,0,function(){return""+this.hours()+G(this.minutes(),2)+G(this.seconds(),2)}),Ge("a",!0),Ge("A",!1),U("hour","h"),Y("hour",13),J("a",Ke),J("A",Ke),J("H",Br),J("h",Br),J("HH",Br,jr),J("hh",Br,jr),J("hmm",qr),J("hmmss",Hr),J("Hmm",qr),J("Hmmss",Hr),re(["H","HH"],ao),re(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),re(["h","hh"],function(e,t,n){t[ao]=C(e),f(n).bigHour=!0}),re("hmm",function(e,t,n){var r=e.length-2;t[ao]=C(e.substr(0,r)),t[so]=C(e.substr(r)),f(n).bigHour=!0}),re("hmmss",function(e,t,n){var r=e.length-4,o=e.length-2;t[ao]=C(e.substr(0,r)),t[so]=C(e.substr(r,2)),t[uo]=C(e.substr(o)),f(n).bigHour=!0}),re("Hmm",function(e,t,n){var r=e.length-2;t[ao]=C(e.substr(0,r)),t[so]=C(e.substr(r))}),re("Hmmss",function(e,t,n){var r=e.length-4,o=e.length-2;t[ao]=C(e.substr(0,r)),t[so]=C(e.substr(r,2)),t[uo]=C(e.substr(o))});var So,ko=/[ap]\.?m?\.?/i,No=V("Hours",!0),To={calendar:Mr,longDateFormat:Sr,invalidDate:kr,ordinal:Nr,ordinalParse:Tr,relativeTime:Or,months:mo,monthsShort:vo,week:bo,weekdays:wo,weekdaysMin:Eo,weekdaysShort:Co,meridiemParse:ko},Oo={},Po={},Io=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ro=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ao=/Z|[+-]\d\d(?::?\d\d)?/,Lo=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Uo=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Fo=/^\/?Date\((\-?\d+)/i;n.createFromInputFallback=D("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),n.ISO_8601=function(){};var jo=D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=bt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:v()}),Yo=D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=bt.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:v()}),Wo=function(){return Date.now?Date.now():+new Date};St("Z",":"),St("ZZ",""),J("Z",$r),J("ZZ",$r),re(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=kt($r,e)});var Vo=/([\+\-]|\d\d)/gi;n.updateOffset=function(){};var Bo=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,qo=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Vt.fn=xt.prototype;var Ho=zt(1,"add"),zo=zt(-1,"subtract");n.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",n.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Go=D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});K(0,["gg",2],0,function(){return this.weekYear()%100}),K(0,["GG",2],0,function(){return this.isoWeekYear()%100}),kn("gggg","weekYear"),kn("ggggg","weekYear"),kn("GGGG","isoWeekYear"),kn("GGGGG","isoWeekYear"),U("weekYear","gg"),U("isoWeekYear","GG"),Y("weekYear",1),Y("isoWeekYear",1),J("G",Qr),J("g",Qr),J("GG",Br,jr),J("gg",Br,jr),J("GGGG",Gr,Wr),J("gggg",Gr,Wr),J("GGGGG",Kr,Vr),J("ggggg",Kr,Vr),oe(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,r){t[r.substr(0,2)]=C(e)}),oe(["gg","GG"],function(e,t,r,o){t[o]=n.parseTwoDigitYear(e)}),K("Q",0,"Qo","quarter"),U("quarter","Q"),Y("quarter",7),J("Q",Fr),re("Q",function(e,t){t[oo]=3*(C(e)-1)}),K("D",["DD",2],"Do","date"),U("date","D"),Y("date",9),J("D",Br),J("DD",Br,jr),J("Do",function(e,t){return e?t._ordinalParse:t._ordinalParseLenient}),re(["D","DD"],io),re("Do",function(e,t){t[io]=C(e.match(Br)[0],10)});var Ko=V("Date",!0);K("DDD",["DDDD",3],"DDDo","dayOfYear"),U("dayOfYear","DDD"),Y("dayOfYear",4),J("DDD",zr),J("DDDD",Yr),re(["DDD","DDDD"],function(e,t,n){n._dayOfYear=C(e)}),K("m",["mm",2],0,"minute"),U("minute","m"),Y("minute",14),J("m",Br),J("mm",Br,jr),re(["m","mm"],so);var Xo=V("Minutes",!1);K("s",["ss",2],0,"second"),U("second","s"),Y("second",15),J("s",Br),J("ss",Br,jr),re(["s","ss"],uo);var Qo=V("Seconds",!1);K("S",0,0,function(){return~~(this.millisecond()/100)}),K(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),K(0,["SSS",3],0,"millisecond"),K(0,["SSSS",4],0,function(){return 10*this.millisecond()}),K(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),K(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),K(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),K(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),K(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),U("millisecond","ms"),Y("millisecond",16),J("S",zr,Fr),J("SS",zr,jr),J("SSS",zr,Yr);var Zo;for(Zo="SSSS";Zo.length<=9;Zo+="S")J(Zo,Xr);for(Zo="S";Zo.length<=9;Zo+="S")re(Zo,Un);var $o=V("Milliseconds",!1);K("z",0,0,"zoneAbbr"),K("zz",0,0,"zoneName");var Jo=_.prototype;Jo.add=Ho,Jo.calendar=Xt,Jo.clone=Qt,Jo.diff=rn,Jo.endOf=gn,Jo.format=ln,Jo.from=cn,Jo.fromNow=pn,Jo.to=dn,Jo.toNow=hn,Jo.get=H,Jo.invalidAt=Mn,Jo.isAfter=Zt,Jo.isBefore=$t,Jo.isBetween=Jt,Jo.isSame=en,Jo.isSameOrAfter=tn,Jo.isSameOrBefore=nn,Jo.isValid=xn,Jo.lang=Go,Jo.locale=fn,Jo.localeData=mn,Jo.max=Yo,Jo.min=jo,Jo.parsingFlags=Dn,Jo.set=z,Jo.startOf=vn,Jo.subtract=zo,Jo.toArray=wn,Jo.toObject=Cn,Jo.toDate=bn,Jo.toISOString=sn,Jo.inspect=un,Jo.toJSON=En,Jo.toString=an,Jo.unix=_n,Jo.valueOf=yn,Jo.creationData=Sn,Jo.year=_o,Jo.isLeapYear=_e,Jo.weekYear=Nn,Jo.isoWeekYear=Tn,Jo.quarter=Jo.quarters=An,Jo.month=de,Jo.daysInMonth=he,Jo.week=Jo.weeks=Ne,Jo.isoWeek=Jo.isoWeeks=Te,Jo.weeksInYear=Pn,Jo.isoWeeksInYear=On,Jo.date=Ko,Jo.day=Jo.days=Fe,Jo.weekday=je,Jo.isoWeekday=Ye,Jo.dayOfYear=Ln,Jo.hour=Jo.hours=No,Jo.minute=Jo.minutes=Xo,Jo.second=Jo.seconds=Qo,Jo.millisecond=Jo.milliseconds=$o,Jo.utcOffset=Ot,Jo.utc=It,Jo.local=Rt,Jo.parseZone=At,Jo.hasAlignedHourOffset=Lt,Jo.isDST=Ut,Jo.isLocal=jt,Jo.isUtcOffset=Yt,Jo.isUtc=Wt,Jo.isUTC=Wt,Jo.zoneAbbr=Fn,Jo.zoneName=jn,Jo.dates=D("dates accessor is deprecated. Use date instead.",Ko),Jo.months=D("months accessor is deprecated. Use month instead",de),Jo.years=D("years accessor is deprecated. Use year instead",_o),Jo.zone=D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Pt),Jo.isDSTShifted=D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ft);var ei=T.prototype;ei.calendar=O,ei.longDateFormat=P,ei.invalidDate=I,ei.ordinal=R,ei.preparse=Vn,ei.postformat=Vn,ei.relativeTime=A,ei.pastFuture=L,ei.set=k,ei.months=se,ei.monthsShort=ue,ei.monthsParse=ce,ei.monthsRegex=me,ei.monthsShortRegex=fe,ei.week=Me,ei.firstDayOfYear=ke,ei.firstDayOfWeek=Se,ei.weekdays=Ie,ei.weekdaysMin=Ae,ei.weekdaysShort=Re,ei.weekdaysParse=Ue,ei.weekdaysRegex=We,ei.weekdaysShortRegex=Ve,ei.weekdaysMinRegex=Be,ei.isPM=Xe,ei.meridiem=Qe,et("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=1===C(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),n.lang=D("moment.lang is deprecated. Use moment.locale instead.",et),n.langData=D("moment.langData is deprecated. Use moment.localeData instead.",rt);var ti=Math.abs,ni=sr("ms"),ri=sr("s"),oi=sr("m"),ii=sr("h"),ai=sr("d"),si=sr("w"),ui=sr("M"),li=sr("y"),ci=lr("milliseconds"),pi=lr("seconds"),di=lr("minutes"),hi=lr("hours"),fi=lr("days"),mi=lr("months"),vi=lr("years"),gi=Math.round,yi={s:45,m:45,h:22,d:26,M:11},_i=Math.abs,bi=xt.prototype;return bi.abs=Zn,bi.add=Jn,bi.subtract=er,bi.as=ir,bi.asMilliseconds=ni,bi.asSeconds=ri,bi.asMinutes=oi,bi.asHours=ii,bi.asDays=ai,bi.asWeeks=si,bi.asMonths=ui,bi.asYears=li,bi.valueOf=ar,bi._bubble=nr,bi.get=ur,bi.milliseconds=ci,bi.seconds=pi,bi.minutes=di,bi.hours=hi,bi.days=fi,bi.weeks=cr,bi.months=mi,bi.years=vi,bi.humanize=mr,bi.toISOString=vr,bi.toString=vr,bi.toJSON=vr,bi.locale=fn,bi.localeData=mn,bi.toIsoString=D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",vr),bi.lang=Go,K("X",0,0,"unix"),K("x",0,0,"valueOf"),J("x",Qr),J("X",Jr),re("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),re("x",function(e,t,n){n._d=new Date(C(e))}),n.version="2.17.1",r(bt),n.fn=Jo,n.min=Ct,n.max=Et,n.now=Wo,n.utc=d,n.unix=Yn,n.months=zn,n.isDate=u,n.locale=et,n.invalid=v,n.duration=Vt,n.isMoment=b,n.weekdays=Kn,n.parseZone=Wn,n.localeData=rt,n.isDuration=Dt,n.monthsShort=Gn,n.weekdaysMin=Qn,n.defineLocale=tt,n.updateLocale=nt,n.locales=ot,n.weekdaysShort=Xn,n.normalizeUnits=F,n.relativeTimeRounding=hr,n.relativeTimeThreshold=fr,n.calendarFormat=Kt,n.prototype=Jo,n})},{}],"parse-link-header":[function(e,t,n){"use strict";function r(e){return e&&e.rel}function o(e,t){function n(n){e[n]=l(t,{rel:n})}return t.rel.split(/\s+/).forEach(n),e}function i(e,t){var n=t.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);return n&&(e[n[1]]=n[2]),e}function a(e){try{var t=e.split(";"),n=t.shift().replace(/[<>]/g,""),r=u.parse(n),o=s.parse(r.query),a=t.reduce(i,{});return a=l(o,a),a.url=n,a}catch(e){return null}}var s=e(19),u=e(20),l=e(24);t.exports=function(e){return e?e.split(/,\s*</).map(a).filter(r).reduce(o,{}):null}},{19:19,20:20,24:24}],rag:[function(e,t,n){"use strict";n.button=e(25),n.modal=e(28),n.tel=e(36),n.countryData=e(35),n.map=e(27),n.scrollView=e(33),n.surface=e(34)},{25:25,27:27,28:28,33:33,34:34,35:35,36:36}],"react/addons":[function(e,t,n){t.exports=e(134)},{134:134}],react:[function(e,t,n){t.exports=e(67)},{67:67}],reqwest:[function(require,module,exports){!function(e,t,n){void 0!==module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define(n):t[e]=n()}("reqwest",this,function(){function succeed(e){var t=protocolRe.exec(e.url);return t=t&&t[1]||window.location.protocol,httpsRe.test(t)?twoHundo.test(e.request.status):!!e.request.response}function handleReadyState(e,t,n){return function(){return e._aborted?n(e.request):e._timedOut?n(e.request,"Request is aborted: timeout"):void(e.request&&4==e.request[readyState]&&(e.request.onreadystatechange=noop,succeed(e)?t(e.request):n(e.request)))}}function setHeaders(e,t){var n,r=t.headers||{};r.Accept=r.Accept||defaultHeaders.accept[t.type]||defaultHeaders.accept["*"];var o="function"==typeof FormData&&t.data instanceof FormData;t.crossOrigin||r[requestedWith]||(r[requestedWith]=defaultHeaders.requestedWith),r[contentType]||o||(r[contentType]=t.contentType||defaultHeaders.contentType);for(n in r)r.hasOwnProperty(n)&&"setRequestHeader"in e&&e.setRequestHeader(n,r[n])}function setCredentials(e,t){void 0!==t.withCredentials&&void 0!==e.withCredentials&&(e.withCredentials=!!t.withCredentials)}function generalCallback(e){lastValue=e}function urlappend(e,t){return e+(/\?/.test(e)?"&":"?")+t}function handleJsonp(e,t,n,r){var o=uniqid++,i=e.jsonpCallback||"callback",a=e.jsonpCallbackName||reqwest.getcallbackPrefix(o),s=RegExp("((^|\\?|&)"+i+")=([^&]+)"),u=r.match(s),l=doc.createElement("script"),c=0,p=navigator.userAgent.indexOf("MSIE 10.0")!==-1;return u?"?"===u[3]?r=r.replace(s,"$1="+a):a=u[3]:r=urlappend(r,i+"="+a),win[a]=generalCallback,l.type="text/javascript",l.src=r,l.async=!0,void 0===l.onreadystatechange||p||(l.htmlFor=l.id="_reqwest_"+o),l.onload=l.onreadystatechange=function(){return!(l[readyState]&&"complete"!==l[readyState]&&"loaded"!==l[readyState]||c)&&(l.onload=l.onreadystatechange=null,l.onclick&&l.onclick(),t(lastValue),lastValue=void 0,head.removeChild(l),void(c=1))},head.appendChild(l),{abort:function(){l.onload=l.onreadystatechange=null,n({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(l),c=1}}}function getRequest(e,t){var n,r=this.o,o=(r.method||"GET").toUpperCase(),i="string"==typeof r?r:r.url,a=r.processData!==!1&&r.data&&"string"!=typeof r.data?reqwest.toQueryString(r.data):r.data||null,s=!1;return"jsonp"!=r.type&&"GET"!=o||!a||(i=urlappend(i,a),a=null),"jsonp"==r.type?handleJsonp(r,e,t,i):(n=r.xhr&&r.xhr(r)||xhr(r),n.open(o,i,r.async!==!1),setHeaders(n,r),setCredentials(n,r),win[xDomainRequest]&&n instanceof win[xDomainRequest]?(n.onload=e,n.onerror=t,n.onprogress=function(){},s=!0):n.onreadystatechange=handleReadyState(this,e,t),r.before&&r.before(n),s?setTimeout(function(){n.send(a)},200):n.send(a),n)}function Reqwest(e,t){this.o=e,this.fn=t,init.apply(this,arguments)}function setType(e){return e.match("json")?"json":e.match("javascript")?"js":e.match("text")?"html":e.match("xml")?"xml":void 0}function init(o,fn){function complete(e){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(e)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(e){return error(resp,"Could not parse JSON in response",e)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(e,t,n){for(e=self.request,self._responseArgs.resp=e,self._responseArgs.msg=t,self._responseArgs.t=n,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(e,t,n);complete(e)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(e,t){return new Reqwest(e,t)}function normalize(e){return e?e.replace(/\r?\n/g,"\r\n"):""}function serial(e,t){var n,r,o,i,a=e.name,s=e.tagName.toLowerCase(),u=function(e){e&&!e.disabled&&t(a,normalize(e.attributes.value&&e.attributes.value.specified?e.value:e.text))};if(!e.disabled&&a)switch(s){case"input":/reset|button|image|file/i.test(e.type)||(n=/checkbox/i.test(e.type),r=/radio/i.test(e.type),o=e.value,(!(n||r)||e.checked)&&t(a,normalize(n&&""===o?"on":o)));break;case"textarea":t(a,normalize(e.value));break;case"select":if("select-one"===e.type.toLowerCase())u(e.selectedIndex>=0?e.options[e.selectedIndex]:null);else for(i=0;e.length&&i<e.length;i++)e.options[i].selected&&u(e.options[i])}}function eachFormElement(){var e,t,n=this,r=function(e,t){var r,o,i;for(r=0;r<t.length;r++)for(i=e[byTag](t[r]),o=0;o<i.length;o++)serial(i[o],n)};for(t=0;t<arguments.length;t++)e=arguments[t],/input|select|textarea/i.test(e.tagName)&&serial(e,n),r(e,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var e={};return eachFormElement.apply(function(t,n){t in e?(e[t]&&!isArray(e[t])&&(e[t]=[e[t]]),e[t].push(n)):e[t]=n},arguments),e}function buildParams(e,t,n,r){var o,i,a,s=/\[\]$/;if(isArray(t))for(i=0;t&&i<t.length;i++)a=t[i],n||s.test(e)?r(e,a):buildParams(e+"["+("object"==typeof a?i:"")+"]",a,n,r);else if(t&&"[object Object]"==""+t)for(o in t)buildParams(e+"["+o+"]",t[o],n,r);else r(e,t)}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(e){if(e.crossOrigin===!0){var t=win[xmlHttpRequest]?new XMLHttpRequest:null;if(t&&"withCredentials"in t)return t;if(win[xDomainRequest])return new XDomainRequest;throw Error("Browser does not support cross-origin requests")}return win[xmlHttpRequest]?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(e){return e}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(e,t){return e=e||function(){},t=t||function(){},this._fulfilled?this._responseArgs.resp=e(this._responseArgs.resp):this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(e),this._errorHandlers.push(t)),this},always:function(e){return this._fulfilled||this._erred?e(this._responseArgs.resp):this._completeHandlers.push(e),this},fail:function(e){return this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(e),this},catch:function(e){return this.fail(e)}},reqwest.serializeArray=function(){var e=[];return eachFormElement.apply(function(t,n){e.push({name:t,value:n})},arguments),e},reqwest.serialize=function(){if(0===arguments.length)return"";var e,t,n=Array.prototype.slice.call(arguments,0);return e=n.pop(),e&&e.nodeType&&n.push(e)&&(e=null),e&&(e=e.type),t="map"==e?serializeHash:"array"==e?reqwest.serializeArray:serializeQueryString,t.apply(null,n)},reqwest.toQueryString=function(e,t){var n,r,o=t||!1,i=[],a=encodeURIComponent,s=function(e,t){t="function"==typeof t?t():null==t?"":t,i[i.length]=a(e)+"="+a(t)};if(isArray(e))for(r=0;e&&r<e.length;r++)s(e[r].name,e[r].value);else for(n in e)e.hasOwnProperty(n)&&buildParams(n,e[n],o,s);return i.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(e,t){return e&&(e.type&&(e.method=e.type)&&delete e.type,e.dataType&&(e.type=e.dataType),e.jsonpCallback&&(e.jsonpCallbackName=e.jsonpCallback)&&delete e.jsonpCallback,e.jsonp&&(e.jsonpCallback=e.jsonp)),new Reqwest(e,t)},reqwest.ajaxSetup=function(e){e=e||{};for(var t in e)globalSetupOptions[t]=e[t]},reqwest})},{}]},{},[1]);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





;
