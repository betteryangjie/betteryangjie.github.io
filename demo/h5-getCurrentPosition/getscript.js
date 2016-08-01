window.BMAP_AUTHENTIC_KEY = ""; (function() {
    var b3, a9 = b3 = a9 || {
        version: "1.3.4"
    };
    a9.guid = "$BAIDU$";
    window[a9.guid] = window[a9.guid] || {};
    a9.object = a9.object || {};
    a9.extend = a9.object.extend = function(cN, T) {
        for (var cM in T) {
            if (T.hasOwnProperty(cM)) {
                cN[cM] = T[cM]
            }
        }
        return cN
    };
    a9.dom = a9.dom || {};
    a9.dom.g = function(T) {
        if ("string" == typeof T || T instanceof String) {
            return document.getElementById(T)
        } else {
            if (T && T.nodeName && (T.nodeType == 1 || T.nodeType == 9)) {
                return T
            }
        }
        return null
    };
    a9.g = a9.G = a9.dom.g;
    a9.dom.hide = function(T) {
        T = a9.dom.g(T);
        T.style.display = "none";
        return T
    };
    a9.hide = a9.dom.hide;
    a9.lang = a9.lang || {};
    a9.lang.isString = function(T) {
        return "[object String]" == Object.prototype.toString.call(T)
    };
    a9.isString = a9.lang.isString;
    a9.dom._g = function(T) {
        if (a9.lang.isString(T)) {
            return document.getElementById(T)
        }
        return T
    };
    a9._g = a9.dom._g;
    a9.dom.contains = function(T, cM) {
        var cN = a9.dom._g;
        T = cN(T);
        cM = cN(cM);
        return T.contains ? T != cM && T.contains(cM) : !!(T.compareDocumentPosition(cM) & 16)
    };
    a9.browser = a9.browser || {};
    if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
        a9.browser.ie = a9.ie = document.documentMode || +RegExp["\x241"]
    }
    a9.dom._NAME_ATTRS = (function() {
        var T = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            rowspan: "rowSpan",
            valign: "vAlign",
            usemap: "useMap",
            frameborder: "frameBorder"
        };
        if (a9.browser.ie < 8) {
            T["for"] = "htmlFor";
            T["class"] = "className"
        } else {
            T.htmlFor = "for";
            T.className = "class"
        }
        return T
    })();
    a9.dom.setAttr = function(cM, T, cN) {
        cM = a9.dom.g(cM);
        if ("style" == T) {
            cM.style.cssText = cN
        } else {
            T = a9.dom._NAME_ATTRS[T] || T;
            cM.setAttribute(T, cN)
        }
        return cM
    };
    a9.setAttr = a9.dom.setAttr;
    a9.dom.setAttrs = function(cN, T) {
        cN = a9.dom.g(cN);
        for (var cM in T) {
            a9.dom.setAttr(cN, cM, T[cM])
        }
        return cN
    };
    a9.setAttrs = a9.dom.setAttrs;
    a9.string = a9.string || {}; (function() {
        var T = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
        a9.string.trim = function(cM) {
            return String(cM).replace(T, "")
        }
    })();
    a9.trim = a9.string.trim;
    a9.string.format = function(cN, T) {
        cN = String(cN);
        var cM = Array.prototype.slice.call(arguments, 1),
        cO = Object.prototype.toString;
        if (cM.length) {
            cM = cM.length == 1 ? (T !== null && (/\[object Array\]|\[object Object\]/.test(cO.call(T))) ? T: cM) : cM;
            return cN.replace(/#\{(.+?)\}/g,
            function(cP, cR) {
                var cQ = cM[cR];
                if ("[object Function]" == cO.call(cQ)) {
                    cQ = cQ(cR)
                }
                return ("undefined" == typeof cQ ? "": cQ)
            })
        }
        return cN
    };
    a9.format = a9.string.format;
    a9.dom.removeClass = function(cQ, cR) {
        cQ = a9.dom.g(cQ);
        var cO = cQ.className.split(/\s+/),
        cS = cR.split(/\s+/),
        cM,
        T = cS.length,
        cN,
        cP = 0;
        for (; cP < T; ++cP) {
            for (cN = 0, cM = cO.length; cN < cM; ++cN) {
                if (cO[cN] == cS[cP]) {
                    cO.splice(cN, 1);
                    break
                }
            }
        }
        cQ.className = cO.join(" ");
        return cQ
    };
    a9.removeClass = a9.dom.removeClass;
    a9.dom.insertHTML = function(cO, T, cN) {
        cO = a9.dom.g(cO);
        var cM, cP;
        if (cO.insertAdjacentHTML) {
            cO.insertAdjacentHTML(T, cN)
        } else {
            cM = cO.ownerDocument.createRange();
            T = T.toUpperCase();
            if (T == "AFTERBEGIN" || T == "BEFOREEND") {
                cM.selectNodeContents(cO);
                cM.collapse(T == "AFTERBEGIN")
            } else {
                cP = T == "BEFOREBEGIN";
                cM[cP ? "setStartBefore": "setEndAfter"](cO);
                cM.collapse(cP)
            }
            cM.insertNode(cM.createContextualFragment(cN))
        }
        return cO
    };
    a9.insertHTML = a9.dom.insertHTML;
    a9.dom.show = function(T) {
        T = a9.dom.g(T);
        T.style.display = "";
        return T
    };
    a9.show = a9.dom.show;
    a9.dom.getDocument = function(T) {
        T = a9.dom.g(T);
        return T.nodeType == 9 ? T: T.ownerDocument || T.document
    };
    a9.dom.addClass = function(cQ, cR) {
        cQ = a9.dom.g(cQ);
        var cM = cR.split(/\s+/),
        T = cQ.className,
        cP = " " + T + " ",
        cO = 0,
        cN = cM.length;
        for (; cO < cN; cO++) {
            if (cP.indexOf(" " + cM[cO] + " ") < 0) {
                T += " " + cM[cO]
            }
        }
        cQ.className = T;
        return cQ
    };
    a9.addClass = a9.dom.addClass;
    a9.dom._styleFixer = a9.dom._styleFixer || {};
    a9.dom._styleFilter = a9.dom._styleFilter || [];
    a9.dom._styleFilter.filter = function(cM, cP, cQ) {
        for (var T = 0,
        cO = a9.dom._styleFilter,
        cN; cN = cO[T]; T++) {
            if (cN = cN[cQ]) {
                cP = cN(cM, cP)
            }
        }
        return cP
    };
    a9.string.toCamelCase = function(T) {
        if (T.indexOf("-") < 0 && T.indexOf("_") < 0) {
            return T
        }
        return T.replace(/[-_][^-_]/g,
        function(cM) {
            return cM.charAt(1).toUpperCase()
        })
    };
    a9.dom.getStyle = function(cN, cM) {
        var cQ = a9.dom;
        cN = cQ.g(cN);
        cM = a9.string.toCamelCase(cM);
        var cP = cN.style[cM];
        if (!cP) {
            var T = cQ._styleFixer[cM],
            cO = cN.currentStyle || (a9.browser.ie ? cN.style: getComputedStyle(cN, null));
            cP = T && T.get ? T.get(cN, cO) : cO[T || cM]
        }
        if (T = cQ._styleFilter) {
            cP = T.filter(cM, cP, "get")
        }
        return cP
    };
    a9.getStyle = a9.dom.getStyle;
    if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
        a9.browser.opera = +RegExp["\x241"]
    }
    a9.browser.isWebkit = /webkit/i.test(navigator.userAgent);
    a9.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    a9.browser.isStrict = document.compatMode == "CSS1Compat";
    a9.dom.getPosition = function(T) {
        T = a9.dom.g(T);
        var cU = a9.dom.getDocument(T),
        cO = a9.browser,
        cR = a9.dom.getStyle,
        cN = cO.isGecko > 0 && cU.getBoxObjectFor && cR(T, "position") == "absolute" && (T.style.top === "" || T.style.left === ""),
        cS = {
            left: 0,
            top: 0
        },
        cQ = (cO.ie && !cO.isStrict) ? cU.body: cU.documentElement,
        cV,
        cM;
        if (T == cQ) {
            return cS
        }
        if (T.getBoundingClientRect) {
            cM = T.getBoundingClientRect();
            cS.left = Math.floor(cM.left) + Math.max(cU.documentElement.scrollLeft, cU.body.scrollLeft);
            cS.top = Math.floor(cM.top) + Math.max(cU.documentElement.scrollTop, cU.body.scrollTop);
            cS.left -= cU.documentElement.clientLeft;
            cS.top -= cU.documentElement.clientTop;
            var cT = cU.body,
            cW = parseInt(cR(cT, "borderLeftWidth")),
            cP = parseInt(cR(cT, "borderTopWidth"));
            if (cO.ie && !cO.isStrict) {
                cS.left -= isNaN(cW) ? 2 : cW;
                cS.top -= isNaN(cP) ? 2 : cP
            }
        } else {
            cV = T;
            do {
                cS.left += cV.offsetLeft;
                cS.top += cV.offsetTop;
                if (cO.isWebkit > 0 && cR(cV, "position") == "fixed") {
                    cS.left += cU.body.scrollLeft;
                    cS.top += cU.body.scrollTop;
                    break
                }
                cV = cV.offsetParent
            } while ( cV && cV != T );
            if (cO.opera > 0 || (cO.isWebkit > 0 && cR(T, "position") == "absolute")) {
                cS.top -= cU.body.offsetTop
            }
            cV = T.offsetParent;
            while (cV && cV != cU.body) {
                cS.left -= cV.scrollLeft;
                if (!cO.opera || cV.tagName != "TR") {
                    cS.top -= cV.scrollTop
                }
                cV = cV.offsetParent
            }
        }
        return cS
    };
    if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
        a9.browser.firefox = +RegExp["\x241"]
    } (function() {
        var T = navigator.userAgent;
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(T) && !/chrome/i.test(T)) {
            a9.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
        }
    })();
    if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
        a9.browser.chrome = +RegExp["\x241"]
    }
    a9.array = a9.array || {};
    a9.array.each = function(cQ, cO) {
        var cN, cP, cM, T = cQ.length;
        if ("function" == typeof cO) {
            for (cM = 0; cM < T; cM++) {
                cP = cQ[cM];
                cN = cO.call(cQ, cP, cM);
                if (cN === false) {
                    break
                }
            }
        }
        return cQ
    };
    a9.each = a9.array.each;
    a9.lang.guid = function() {
        return "TANGRAM__" + (window[a9.guid]._counter++).toString(36)
    };
    window[a9.guid]._counter = window[a9.guid]._counter || 1;
    window[a9.guid]._instances = window[a9.guid]._instances || {};
    a9.lang.isFunction = function(T) {
        return "[object Function]" == Object.prototype.toString.call(T)
    };
    a9.lang.Class = function(T) {
        this.guid = T || a9.lang.guid();
        window[a9.guid]._instances[this.guid] = this
    };
    window[a9.guid]._instances = window[a9.guid]._instances || {};
    a9.lang.Class.prototype.dispose = function() {
        delete window[a9.guid]._instances[this.guid];
        for (var T in this) {
            if (!a9.lang.isFunction(this[T])) {
                delete this[T]
            }
        }
        this.disposed = true
    };
    a9.lang.Class.prototype.toString = function() {
        return "[object " + (this._className || "Object") + "]"
    };
    a9.lang.Event = function(T, cM) {
        this.type = T;
        this.returnValue = true;
        this.target = cM || null;
        this.currentTarget = null
    };
    a9.lang.Class.prototype.addEventListener = function(cO, cN, cM) {
        if (!a9.lang.isFunction(cN)) {
            return
        } ! this.__listeners && (this.__listeners = {});
        var T = this.__listeners,
        cP;
        if (typeof cM == "string" && cM) {
            if (/[^\w\-]/.test(cM)) {
                throw ("nonstandard key:" + cM)
            } else {
                cN.hashCode = cM;
                cP = cM
            }
        }
        cO.indexOf("on") != 0 && (cO = "on" + cO);
        typeof T[cO] != "object" && (T[cO] = {});
        cP = cP || a9.lang.guid();
        cN.hashCode = cP;
        T[cO][cP] = cN
    };
    a9.lang.Class.prototype.removeEventListener = function(cN, cM) {
        if (a9.lang.isFunction(cM)) {
            cM = cM.hashCode
        } else {
            if (!a9.lang.isString(cM)) {
                return
            }
        } ! this.__listeners && (this.__listeners = {});
        cN.indexOf("on") != 0 && (cN = "on" + cN);
        var T = this.__listeners;
        if (!T[cN]) {
            return
        }
        T[cN][cM] && delete T[cN][cM]
    };
    a9.lang.Class.prototype.dispatchEvent = function(cO, T) {
        if (a9.lang.isString(cO)) {
            cO = new a9.lang.Event(cO)
        } ! this.__listeners && (this.__listeners = {});
        T = T || {};
        for (var cN in T) {
            cO[cN] = T[cN]
        }
        var cN, cM = this.__listeners,
        cP = cO.type;
        cO.target = cO.target || this;
        cO.currentTarget = this;
        cP.indexOf("on") != 0 && (cP = "on" + cP);
        a9.lang.isFunction(this[cP]) && this[cP].apply(this, arguments);
        if (typeof cM[cP] == "object") {
            for (cN in cM[cP]) {
                cM[cP][cN].apply(this, arguments)
            }
        }
        return cO.returnValue
    };
    a9.lang.inherits = function(cR, cP, cO) {
        var cN, cQ, T = cR.prototype,
        cM = new Function();
        cM.prototype = cP.prototype;
        cQ = cR.prototype = new cM();
        for (cN in T) {
            cQ[cN] = T[cN]
        }
        cR.prototype.constructor = cR;
        cR.superClass = cP.prototype;
        if ("string" == typeof cO) {
            cQ._className = cO
        }
    };
    a9.inherits = a9.lang.inherits;
    a9.lang.instance = function(T) {
        return window[a9.guid]._instances[T] || null
    };
    a9.platform = a9.platform || {};
    a9.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);
    a9.platform.isWindows = /windows/i.test(navigator.userAgent);
    a9.platform.isX11 = /x11/i.test(navigator.userAgent);
    a9.platform.isAndroid = /android/i.test(navigator.userAgent);
    a9.platform.isIpad = /ipad/i.test(navigator.userAgent);
    a9.platform.isIphone = /iphone/i.test(navigator.userAgent);
    a9.lang.Event.prototype.inherit = function(cN) {
        var cM = this;
        this.domEvent = cN = window.event || cN;
        cM.clientX = cN.clientX || cN.pageX;
        cM.clientY = cN.clientY || cN.pageY;
        cM.offsetX = cN.offsetX || cN.layerX;
        cM.offsetY = cN.offsetY || cN.layerY;
        cM.screenX = cN.screenX;
        cM.screenY = cN.screenY;
        cM.ctrlKey = cN.ctrlKey || cN.metaKey;
        cM.shiftKey = cN.shiftKey;
        cM.altKey = cN.altKey;
        if (cN.touches) {
            cM.touches = [];
            for (var T = 0; T < cN.touches.length; T++) {
                cM.touches.push({
                    clientX: cN.touches[T].clientX,
                    clientY: cN.touches[T].clientY,
                    screenX: cN.touches[T].screenX,
                    screenY: cN.touches[T].screenY,
                    pageX: cN.touches[T].pageX,
                    pageY: cN.touches[T].pageY,
                    target: cN.touches[T].target,
                    identifier: cN.touches[T].identifier
                })
            }
        }
        if (cN.changedTouches) {
            cM.changedTouches = [];
            for (var T = 0; T < cN.changedTouches.length; T++) {
                cM.changedTouches.push({
                    clientX: cN.changedTouches[T].clientX,
                    clientY: cN.changedTouches[T].clientY,
                    screenX: cN.changedTouches[T].screenX,
                    screenY: cN.changedTouches[T].screenY,
                    pageX: cN.changedTouches[T].pageX,
                    pageY: cN.changedTouches[T].pageY,
                    target: cN.changedTouches[T].target,
                    identifier: cN.changedTouches[T].identifier
                })
            }
        }
        if (cN.targetTouches) {
            cM.targetTouches = [];
            for (var T = 0; T < cN.targetTouches.length; T++) {
                cM.targetTouches.push({
                    clientX: cN.targetTouches[T].clientX,
                    clientY: cN.targetTouches[T].clientY,
                    screenX: cN.targetTouches[T].screenX,
                    screenY: cN.targetTouches[T].screenY,
                    pageX: cN.targetTouches[T].pageX,
                    pageY: cN.targetTouches[T].pageY,
                    target: cN.targetTouches[T].target,
                    identifier: cN.targetTouches[T].identifier
                })
            }
        }
        cM.rotation = cN.rotation;
        cM.scale = cN.scale;
        return cM
    };
    a9.lang.decontrol = function(cM) {
        var T = window[a9.guid];
        T._instances && (delete T._instances[cM])
    };
    a9.event = {};
    a9.on = a9.event.on = function(cN, cM, T) {
        if (! (cN = a9.g(cN))) {
            return cN
        }
        cM = cM.replace(/^on/, "");
        if (cN.addEventListener) {
            cN.addEventListener(cM, T, false)
        } else {
            if (cN.attachEvent) {
                cN.attachEvent("on" + cM, T)
            }
        }
        return cN
    };
    a9.un = a9.event.un = function(cN, cM, T) {
        if (! (cN = a9.g(cN))) {
            return cN
        }
        cM = cM.replace(/^on/, "");
        if (cN.removeEventListener) {
            cN.removeEventListener(cM, T, false)
        } else {
            if (cN.detachEvent) {
                cN.detachEvent("on" + cM, T)
            }
        }
        return cN
    };
    a9.dom.hasClass = function(cN, cM) {
        if (!cN || !cN.className || typeof cN.className != "string") {
            return false
        }
        var T = -1;
        try {
            T = cN.className == cM || cN.className.search(new RegExp("(\\s|^)" + cM + "(\\s|$)"))
        } catch(cO) {
            return false
        }
        return T > -1
    };
    window.BMap = window.BMap || {};
    window.BMap.version = "1.3";
    window.BMap._register = [];
    window.BMap.register = function(T) {
        this._register.push(T)
    };
    window.BMap.apiLoad = window.BMap.apiLoad ||
    function() {};
    var bK = window.BMAP_AUTHENTIC_KEY;
    window.BMAP_AUTHENTIC_KEY = null;
    function bA(cO, cQ) {
        cO = a9.g(cO);
        if (!cO) {
            return
        }
        var cP = this;
        a9.lang.Class.call(cP);
        cP.config = {
            clickInterval: 200,
            enableDragging: true,
            enableKeyboard: false,
            enableDblclickZoom: true,
            enableContinuousZoom: false,
            enableWheelZoom: false,
            enableMouseDown: true,
            enablePinchToZoom: true,
            enableAutoResize: true,
            fps: 25,
            zoomerDuration: 240,
            actionDuration: 450,
            defaultCursor: cd.defaultCursor,
            draggingCursor: cd.draggingCursor,
            isOverviewMap: false,
            minZoom: 1,
            maxZoom: 18,
            mapType: BMAP_NORMAL_MAP,
            restrictBounds: false,
            drawer: BMAP_SYS_DRAWER,
            enableInertialDragging: false,
            drawMargin: 500,
            enableHighResolution: false
        };
        a9.extend(cP.config, cQ || {});
        if (cP.highResolutionEnabled()) {
            var cS = document.querySelector("meta[name=viewport]");
            cS.content = "initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no, target-densitydpi=high-dpi"
        }
        cP.container = cO;
        cP._setStyle(cO);
        cO.unselectable = "on";
        cO.innerHTML = "";
        cO.appendChild(cP.render());
        var cM = cP.getSize();
        cP.width = cM.width;
        cP.height = cM.height;
        cP.offsetX = 0;
        cP.offsetY = 0;
        cP.platform = cO.firstChild;
        cP.maskLayer = cP.platform.firstChild;
        cP.maskLayer.style.width = cP.width + "px";
        cP.maskLayer.style.height = cP.height + "px";
        cP._panes = {};
        cP.centerPoint = new ce(0, 0);
        cP.mercatorCenter = new ce(0, 0);
        cP.zoomLevel = 1;
        cP.lastLevel = 0;
        cP.defaultZoomLevel = null;
        cP.defaultCenter = null;
        cP.currentCity = "";
        cP.cityCode = "";
        cP._hotspots = {};
        cP.currentOperation = 0;
        cQ = cQ || {};
        var cR = cP.mapType = cP.config.mapType;
        cP.projection = cR.getProjection();
        if (cR === BMAP_PERSPECTIVE_MAP) {
            _addStat(5002)
        }
        if (cR === BMAP_SATELLITE_MAP || cR === BMAP_HYBRID_MAP) {
            _addStat(5003)
        }
        var T = cP.config;
        T.userMinZoom = cQ.minZoom;
        T.userMaxZoom = cQ.maxZoom;
        cP._checkZoom();
        cP.temp = {
            operating: false,
            arrow: 0,
            lastDomMoveTime: 0,
            lastLoadTileTime: 0,
            lastMovingTime: 0,
            canKeyboard: false,
            registerIndex: -1,
            curSpots: []
        };
        cP.platform.style.cursor = cP.config.defaultCursor;
        for (var cN = 0; cN < BMap._register.length; cN++) {
            BMap._register[cN](cP)
        }
        cP.temp.registerIndex = cN;
        cP._bind();
        cB.load("map",
        function() {
            cP._draw()
        });
        if (bP()) {
            cB.load("oppc",
            function() {
                cP._asyncRegister()
            })
        }
        if (aB()) {
            cB.load("opmb",
            function() {
                cP._asyncRegister()
            })
        }
        cO = null
    }
    a9.lang.inherits(bA, a9.lang.Class, "Map");
    a9.extend(bA.prototype, {
        render: function() {
            var T = ab("div");
            var cO = T.style;
            cO.overflow = "visible";
            cO.position = "absolute";
            cO.zIndex = "0";
            cO.top = cO.left = "0px";
            var cM = ab("div", {
                "class": "BMap_mask"
            });
            var cN = cM.style;
            cN.position = "absolute";
            cN.top = cN.left = "0px";
            cN.zIndex = "9";
            cN.overflow = "hidden";
            cN.WebkitUserSelect = "none";
            T.appendChild(cM);
            return T
        },
        _setStyle: function(cM) {
            var T = cM.style;
            T.overflow = "hidden";
            if (aK(cM).position != "absolute") {
                T.position = "relative";
                T.zIndex = 0
            }
            T.backgroundColor = "#F3F1EC";
            T.color = "#000";
            T.textAlign = "left"
        },
        _bind: function() {
            var T = this;
            T._watchSize = function() {
                var cM = T.getSize();
                if (T.width != cM.width || T.height != cM.height) {
                    var cO = new aI(T.width, T.height);
                    var cP = new bh("onbeforeresize");
                    cP.size = cO;
                    T.dispatchEvent(cP);
                    T._updateCenterPoint((cM.width - T.width) / 2, (cM.height - T.height) / 2);
                    T.maskLayer.style.width = (T.width = cM.width) + "px";
                    T.maskLayer.style.height = (T.height = cM.height) + "px";
                    var cN = new bh("onresize");
                    cN.size = cM;
                    T.dispatchEvent(cN)
                }
            };
            if (T.config.enableAutoResize) {
                T.temp.autoResizeTimer = setInterval(T._watchSize, 80)
            }
        },
        _updateCenterPoint: function(cO, cM, cS, cR) {
            var cP = this.getMapType().getZoomUnits(this.getZoom());
            var cT = this.projection;
            var cQ = true;
            if (cS && ce.isInRange(cS)) {
                this.centerPoint = new ce(cS.lng, cS.lat);
                cQ = false
            }
            var cN = (cS && cR) ? cT.lngLatToMercator(cS, this.currentCity) : this.mercatorCenter;
            if (cN) {
                this.mercatorCenter = new ce(cN.lng + cO * cP, cN.lat - cM * cP);
                var T = cT.mercatorToLngLat(this.mercatorCenter, this.currentCity);
                if (T && cQ) {
                    this.centerPoint = T
                }
            }
        },
        zoomTo: function(cO, cM) {
            if (!aL(cO)) {
                return
            }
            cO = this._getProperZoom(cO).zoom;
            if (cO == this.zoomLevel) {
                return
            }
            this.lastLevel = this.zoomLevel;
            this.zoomLevel = cO;
            var cN;
            if (cM) {
                cN = cM
            } else {
                if (this.getInfoWindow()) {
                    cN = this.getInfoWindow().getPosition()
                }
            }
            if (cN) {
                var T = this.pointToPixel(cN, this.lastLevel);
                this._updateCenterPoint(this.width / 2 - T.x, this.height / 2 - T.y, this.pixelToPoint(T, this.lastLevel), true)
            }
            this.dispatchEvent(new bh("onzoomstart"));
            this.dispatchEvent(new bh("onzoomstartcode"))
        },
        setZoom: function(T) {
            this.zoomTo(T)
        },
        zoomIn: function(T) {
            this.zoomTo(this.zoomLevel + 1, T)
        },
        zoomOut: function(T) {
            this.zoomTo(this.zoomLevel - 1, T)
        },
        panTo: function(T, cM) {
            if (! (T instanceof ce)) {
                return
            }
            this.mercatorCenter = this.projection.lngLatToMercator(T, this.currentCity);
            if (ce.isInRange(T)) {
                this.centerPoint = new ce(T.lng, T.lat)
            } else {
                this.centerPoint = this.projection.mercatorToLngLat(this.mercatorCenter, this.currentCity)
            }
        },
        panBy: function(cM, T) {
            cM = Math.round(cM) || 0;
            T = Math.round(T) || 0;
            this._updateCenterPoint( - cM, -T)
        },
        addControl: function(T) {
            if (T && I(T._i)) {
                T._i(this);
                this.dispatchEvent(new bh("onaddcontrol", T))
            }
        },
        removeControl: function(T) {
            if (T && I(T.remove)) {
                T.remove();
                this.dispatchEvent(new bh("onremovecontrol", T))
            }
        },
        addContextMenu: function(T) {
            if (T && I(T.initialize)) {
                T.initialize(this);
                this.dispatchEvent(new bh("onaddcontextmenu", T))
            }
        },
        removeContextMenu: function(T) {
            if (T && I(T.remove)) {
                this.dispatchEvent(new bh("onremovecontextmenu", T));
                T.remove()
            }
        },
        addOverlay: function(T) {
            if (T && I(T._i)) {
                T._i(this);
                this.dispatchEvent(new bh("onaddoverlay", T))
            }
        },
        removeOverlay: function(T) {
            if (T && I(T.remove)) {
                T.remove();
                this.dispatchEvent(new bh("onremoveoverlay", T))
            }
        },
        clearOverlays: function() {
            this.dispatchEvent(new bh("onclearoverlays"))
        },
        addTileLayer: function(T) {
            if (T) {
                this.dispatchEvent(new bh("onaddtilelayer", T))
            }
        },
        removeTileLayer: function(T) {
            if (T) {
                this.dispatchEvent(new bh("onremovetilelayer", T))
            }
        },
        setMapType: function(cM) {
            if (this.mapType === cM) {
                return
            }
            var cN = new bh("onsetmaptype");
            var T = this.mapType;
            cN.preMapType = T;
            this.mapType = this.config.mapType = cM;
            this.projection = this.mapType.getProjection();
            this._updateCenterPoint(0, 0, this.getCenter(), true);
            this._checkZoom();
            var cO = this._getProperZoom(this.getZoom()).zoom;
            this.zoomTo(cO);
            this.dispatchEvent(cN);
            var cN = new bh("onmaptypechange");
            cN.zoomLevel = cO;
            cN.mapType = cM;
            this.dispatchEvent(cN);
            if (cM === BMAP_SATELLITE_MAP || cM === BMAP_HYBRID_MAP) {
                _addStat(5003)
            }
        },
        setCenter: function(T) {
            var cN = this;
            if (T instanceof ce) {
                cN.panTo(T, {
                    noAnimation: true
                })
            } else {
                if (b4(T)) {
                    var cM = this._getLocal();
                    cM.setSearchCompleteCallback(function(cO) {
                        if (cM.getStatus() == 0 && cM._json.result.type == 2) {
                            cN.setCenter(cO.getPoi(0).point);
                            if (BMAP_PERSPECTIVE_MAP.getCityName(T)) {
                                cN.setCurrentCity(T)
                            }
                        }
                    });
                    cM.search(T)
                }
            }
        },
        centerAndZoom: function(T, cN) {
            var cM = this;
            if (b4(T)) {
                var cQ = cM._getLocal();
                cQ.setSearchCompleteCallback(function(cR) {
                    if (cQ.getStatus() == 0 && cQ._json.result.type == 2) {
                        var cT = cR.getPoi(0).point;
                        var cS = cN || U.getBestLevel(cQ._json.content.level, cM);
                        cM.centerAndZoom(cT, cS);
                        if (BMAP_PERSPECTIVE_MAP.getCityName(T)) {
                            cM.setCurrentCity(T)
                        }
                    }
                });
                cQ.search(T);
                return
            }
            if (! (T instanceof ce) || !cN) {
                return
            }
            cN = cM._getProperZoom(cN).zoom;
            cM.lastLevel = cM.zoomLevel || cN;
            cM.zoomLevel = cN;
            cM.centerPoint = new ce(T.lng, T.lat);
            cM.mercatorCenter = cM.projection.lngLatToMercator(cM.centerPoint, cM.currentCity);
            cM.defaultZoomLevel = cM.defaultZoomLevel || cM.zoomLevel;
            cM.defaultCenter = cM.defaultCenter || cM.centerPoint;
            var cP = new bh("onload");
            var cO = new bh("onloadcode");
            cP.point = new ce(T.lng, T.lat);
            cP.pixel = cM.pointToPixel(cM.centerPoint, cM.zoomLevel);
            cP.zoom = cN;
            if (!cM.loaded) {
                cM.loaded = true;
                cM.dispatchEvent(cP)
            }
            cM.dispatchEvent(cO);
            cM.dispatchEvent(new bh("onmoveend"));
            if (cM.lastLevel != cM.zoomLevel) {
                cM.dispatchEvent(new bh("onzoomend"))
            }
        },
        _getLocal: function() {
            if (!this.temp.local) {
                this.temp.local = new a5(1)
            }
            return this.temp.local
        },
        reset: function() {
            this.centerAndZoom(this.defaultCenter, this.defaultZoomLevel, true)
        },
        enableDragging: function() {
            this.config.enableDragging = true
        },
        disableDragging: function() {
            this.config.enableDragging = false
        },
        enableInertialDragging: function() {
            this.config.enableInertialDragging = true
        },
        disableInertialDragging: function() {
            this.config.enableInertialDragging = false
        },
        enableScrollWheelZoom: function() {
            this.config.enableWheelZoom = true
        },
        disableScrollWheelZoom: function() {
            this.config.enableWheelZoom = false
        },
        enableContinuousZoom: function() {
            this.config.enableContinuousZoom = true
        },
        disableContinuousZoom: function() {
            this.config.enableContinuousZoom = false
        },
        enableDoubleClickZoom: function() {
            this.config.enableDblclickZoom = true
        },
        disableDoubleClickZoom: function() {
            this.config.enableDblclickZoom = false
        },
        enableKeyboard: function() {
            this.config.enableKeyboard = true
        },
        disableKeyboard: function() {
            this.config.enableKeyboard = false
        },
        enablePinchToZoom: function() {
            this.config.enablePinchToZoom = true
        },
        disablePinchToZoom: function() {
            this.config.enablePinchToZoom = false
        },
        enableAutoResize: function() {
            this.config.enableAutoResize = true;
            this._watchSize();
            if (!this.temp.autoResizeTimer) {
                this.temp.autoResizeTimer = setInterval(this._watchSize, 80)
            }
        },
        disableAutoResize: function() {
            this.config.enableAutoResize = false;
            if (this.temp.autoResizeTimer) {
                clearInterval(this.temp.autoResizeTimer);
                this.temp.autoResizeTimer = null
            }
        },
        getSize: function() {
            return new aI(this.container.clientWidth, this.container.clientHeight)
        },
        getCenter: function() {
            return this.centerPoint
        },
        getZoom: function() {
            return this.zoomLevel
        },
        checkResize: function() {
            this._watchSize()
        },
        _getProperZoom: function(cN) {
            var cM = this.config.minZoom,
            T = this.config.maxZoom,
            cO = false;
            if (cN < cM) {
                cO = true;
                cN = cM
            }
            if (cN > T) {
                cO = true;
                cN = T
            }
            return {
                zoom: cN,
                exceeded: cO
            }
        },
        getContainer: function() {
            return this.container
        },
        pointToPixel: function(T, cM) {
            cM = cM || this.getZoom();
            return this.projection.pointToPixel(T, cM, this.mercatorCenter, this.getSize(), this.currentCity)
        },
        pixelToPoint: function(T, cM) {
            cM = cM || this.getZoom();
            return this.projection.pixelToPoint(T, cM, this.mercatorCenter, this.getSize(), this.currentCity)
        },
        pointToOverlayPixel: function(T, cN) {
            if (!T) {
                return
            }
            var cO = new ce(T.lng, T.lat);
            var cM = this.pointToPixel(cO, cN);
            cM.x -= this.offsetX;
            cM.y -= this.offsetY;
            return cM
        },
        overlayPixelToPoint: function(T, cN) {
            if (!T) {
                return
            }
            var cM = new bv(T.x, T.y);
            cM.x += this.offsetX;
            cM.y += this.offsetY;
            return this.pixelToPoint(cM, cN)
        },
        getBounds: function() {
            if (!this.isLoaded()) {
                return new bO()
            }
            var cM = arguments[0] || {},
            cO = cM.margins || [0, 0, 0, 0],
            T = cM.zoom || null,
            cP = this.pixelToPoint({
                x: cO[3],
                y: this.height - cO[2]
            },
            T),
            cN = this.pixelToPoint({
                x: this.width - cO[1],
                y: cO[0]
            },
            T);
            return new bO(cP, cN)
        },
        isLoaded: function() {
            return !! this.loaded
        },
        _getBestLevel: function(cM, cN) {
            var cQ = this.getMapType();
            var cS = cN.margins || [10, 10, 10, 10],
            cP = cN.zoomFactor || 0,
            cT = cS[1] + cS[3],
            cR = cS[0] + cS[2],
            T = cQ.getMinZoom(),
            cV = cQ.getMaxZoom();
            for (var cO = cV; cO >= T; cO--) {
                var cU = this.getMapType().getZoomUnits(cO);
                if (cM.toSpan().lng / cU < this.width - cT && cM.toSpan().lat / cU < this.height - cR) {
                    break
                }
            }
            cO += cP;
            if (cO < T) {
                cO = T
            }
            if (cO > cV) {
                cO = cV
            }
            return cO
        },
        getViewport: function(cU, cM) {
            var cY = {
                center: this.getCenter(),
                zoom: this.getZoom()
            };
            if (!cU || !cU instanceof bO && cU.length == 0 || cU instanceof bO && cU.isEmpty()) {
                return cY
            }
            var cW = [];
            if (cU instanceof bO) {
                cW.push(cU.getNorthEast());
                cW.push(cU.getSouthWest())
            } else {
                cW = cU.slice(0)
            }
            cM = cM || {};
            var cQ = [];
            for (var cR = 0,
            cP = cW.length; cR < cP; cR++) {
                cQ.push(this.projection.lngLatToMercator(cW[cR], this.currentCity))
            }
            var cN = new bO();
            for (var cR = cQ.length - 1; cR >= 0; cR--) {
                cN.extend(cQ[cR])
            }
            if (cN.isEmpty()) {
                return cY
            }
            var T = cN.getCenter();
            var cX = this._getBestLevel(cN, cM);
            if (cM.margins) {
                var cT = cM.margins,
                cS = (cT[1] - cT[3]) / 2,
                cV = (cT[0] - cT[2]) / 2,
                cO = this.getMapType().getZoomUnits(cX);
                T.lng = T.lng + cO * cS;
                T.lat = T.lat + cO * cV
            }
            T = this.projection.mercatorToLngLat(T, this.currentCity);
            return {
                center: T,
                zoom: cX
            }
        },
        setViewport: function(cM, cP) {
            var T;
            if (cM && cM.center) {
                T = cM
            } else {
                T = this.getViewport(cM, cP)
            }
            cP = cP || {};
            var cN = cP.delay || 200;
            if (T.zoom == this.zoomLevel && cP.enableAnimation != false) {
                var cO = this;
                setTimeout(function() {
                    cO.panTo(T.center, {
                        duration: 210
                    })
                },
                cN)
            } else {
                this.centerAndZoom(T.center, T.zoom)
            }
        },
        getPanes: function() {
            return this._panes
        },
        getInfoWindow: function() {
            if (this.temp.infoWin && this.temp.infoWin.isOpen()) {
                return this.temp.infoWin
            }
            return null
        },
        getDistance: function(cN, T) {
            if (!cN || !T) {
                return
            }
            var cM = 0;
            cM = bb.getDistanceByLL(cN, T);
            return cM
        },
        getOverlays: function() {
            var cO = [],
            cP = this._overlays,
            cN = this._customOverlays;
            if (cP) {
                for (var cM in cP) {
                    if (cP[cM] instanceof Z) {
                        cO.push(cP[cM])
                    }
                }
            }
            if (cN) {
                for (var cM = 0,
                T = cN.length; cM < T; cM++) {
                    cO.push(cN[cM])
                }
            }
            return cO
        },
        getMapType: function() {
            return this.mapType
        },
        _asyncRegister: function() {
            for (var T = this.temp.registerIndex; T < BMap._register.length; T++) {
                BMap._register[T](this)
            }
            this.temp.registerIndex = T
        },
        setCurrentCity: function(T) {
            this.currentCity = BMAP_PERSPECTIVE_MAP.getCityName(T);
            this.cityCode = BMAP_PERSPECTIVE_MAP.getCityCode(this.currentCity)
        },
        setDefaultCursor: function(T) {
            if (a9.browser.firefox && T.indexOf("url") == 0) {
                T = T += ", -moz-grab"
            }
            this.config.defaultCursor = T;
            if (this.platform) {
                this.platform.style.cursor = this.config.defaultCursor
            }
        },
        getDefaultCursor: function() {
            return this.config.defaultCursor
        },
        setDraggingCursor: function(T) {
            if (a9.browser.firefox && T.indexOf("url") == 0) {
                T = T += ", -moz-grabbing"
            }
            this.config.draggingCursor = T
        },
        getDraggingCursor: function() {
            return this.config.draggingCursor
        },
        highResolutionEnabled: function() {
            return this.config.enableHighResolution && window.devicePixelRatio > 1
        },
        addHotspot: function(cM) {
            if (cM instanceof cn) {
                this._hotspots[cM.guid] = cM;
                cM.initialize(this)
            }
            var T = this;
            cB.load("hotspot",
            function() {
                T._asyncRegister()
            })
        },
        removeHotspot: function(T) {
            if (this._hotspots[T.guid]) {
                delete this._hotspots[T.guid]
            }
        },
        clearHotspots: function() {
            this._hotspots = {}
        },
        _checkZoom: function() {
            var cM = this.mapType.getMinZoom();
            var cN = this.mapType.getMaxZoom();
            var T = this.config;
            T.minZoom = T.userMinZoom || cM;
            T.maxZoom = T.userMaxZoom || cN;
            if (T.minZoom < cM) {
                T.minZoom = cM
            }
            if (T.maxZoom > cN) {
                T.maxZoom = cN
            }
        },
        setMinZoom: function(T) {
            if (T > this.config.maxZoom) {
                T = this.config.maxZoom
            }
            this.config.userMinZoom = T;
            this._updateZoom()
        },
        setMaxZoom: function(T) {
            if (T < this.config.minZoom) {
                T = this.config.minZoom
            }
            this.config.userMaxZoom = T;
            this._updateZoom()
        },
        _updateZoom: function() {
            this._checkZoom();
            var T = this.config;
            if (this.zoomLevel < T.minZoom) {
                this.setZoom(T.minZoom)
            } else {
                if (this.zoomLevel > T.maxZoom) {
                    this.setZoom(T.maxZoom)
                }
            }
            var cM = new bh("onzoomspanchange");
            cM.minZoom = T.minZoom;
            cM.maxZoom = T.maxZoom;
            this.dispatchEvent(cM)
        }
    });
    window.BMAP_API_VERSION = "1.3";
    window.BMAP_COORD_LNGLAT = 0;
    window.BMAP_COORD_MERCATOR = 1;
    window.BMAP_SYS_DRAWER = 0;
    window.BMAP_SVG_DRAWER = 1;
    window.BMAP_VML_DRAWER = 2;
    window.BMAP_CANVAS_DRAWER = 3;
    window._addStat = function(cQ, cP) {
        if (!cQ) {
            return
        }
        cP = cP || {};
        var cO = "";
        for (var cM in cP) {
            cO = cO + "&" + cM + "=" + encodeURIComponent(cP[cM])
        }
        var cR = function(cS) {
            if (!cS) {
                return
            }
            _addStat._sending = true;
            setTimeout(function() {
                _addStat._img.src = cd.imgPath + "blank.gif?" + cS.src
            },
            50)
        };
        var T = function() {
            var cS = _addStat._reqQueue.shift();
            if (cS) {
                cR(cS)
            }
        };
        var cN = (Math.random() * 100000000).toFixed(0);
        if (_addStat._sending) {
            _addStat._reqQueue.push({
                src: "t=" + cN + "&code=" + cQ + cO
            })
        } else {
            cR({
                src: "t=" + cN + "&code=" + cQ + cO
            })
        }
        if (!_addStat._binded) {
            a9.on(_addStat._img, "load",
            function() {
                _addStat._sending = false;
                T()
            });
            a9.on(_addStat._img, "error",
            function() {
                _addStat._sending = false;
                T()
            });
            _addStat._binded = true
        }
    };
    window._addStat._reqQueue = [];
    window._addStat._img = new Image();
    _addStat(5000, {
        v: BMap.version
    });
    function g(cO) {
        var T = {
            duration: 1000,
            fps: 30,
            delay: 0,
            transition: ax.linear,
            onStop: function() {}
        };
        this._anis = [];
        if (cO) {
            for (var cM in cO) {
                T[cM] = cO[cM]
            }
        }
        this._opts = T;
        if (aL(T.delay)) {
            var cN = this;
            setTimeout(function() {
                cN.start()
            },
            T.delay)
        } else {
            if (T.delay != g.INFINITE) {
                this.start()
            }
        }
    }
    g.INFINITE = "INFINITE";
    g.prototype.start = function() {
        this._beginTime = aF();
        this._endTime = this._beginTime + this._opts.duration;
        this._launch()
    };
    g.prototype.add = function(T) {
        this._anis.push(T)
    };
    g.prototype._launch = function() {
        var cN = this;
        var T = aF();
        if (T >= cN._endTime) {
            if (I(cN._opts.render)) {
                cN._opts.render(cN._opts.transition(1))
            }
            if (I(cN._opts.finish)) {
                cN._opts.finish()
            }
            if (cN._anis.length > 0) {
                var cM = cN._anis[0];
                cM._anis = [].concat(cN._anis.slice(1));
                cM.start()
            }
            return
        }
        cN.schedule = cN._opts.transition((T - cN._beginTime) / cN._opts.duration);
        if (I(cN._opts.render)) {
            cN._opts.render(cN.schedule)
        }
        if (!cN.terminative) {
            cN._timer = setTimeout(function() {
                cN._launch()
            },
            1000 / cN._opts.fps)
        }
    };
    g.prototype.stop = function(cM) {
        this.terminative = true;
        for (var T = 0; T < this._anis.length; T++) {
            this._anis[T].stop();
            this._anis[T] = null
        }
        this._anis.length = 0;
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null
        }
        this._opts.onStop(this.schedule);
        if (cM) {
            this._endTime = this._beginTime;
            this._launch()
        }
    };
    g.prototype.cancel = function() {
        if (this._timer) {
            clearTimeout(this._timer)
        }
        this._endTime = this._beginTime;
        this.schedule = 0
    };
    g.prototype.setFinishCallback = function(T) {
        if (this._anis.length > 0) {
            this._anis[this._anis.length - 1]._opts.finish = T
        } else {
            this._opts.finish = T
        }
    };
    var ax = {
        linear: function(T) {
            return T
        },
        reverse: function(T) {
            return 1 - T
        },
        easeInQuad: function(T) {
            return T * T
        },
        easeInCubic: function(T) {
            return Math.pow(T, 3)
        },
        easeOutQuad: function(T) {
            return - (T * (T - 2))
        },
        easeOutCubic: function(T) {
            return Math.pow((T - 1), 3) + 1
        },
        easeInOutQuad: function(T) {
            if (T < 0.5) {
                return T * T * 2
            } else {
                return - 2 * (T - 2) * T - 1
            }
            return
        },
        easeInOutCubic: function(T) {
            if (T < 0.5) {
                return Math.pow(T, 3) * 4
            } else {
                return Math.pow(T - 1, 3) * 4 + 1
            }
        },
        easeInOutSine: function(T) {
            return (1 - Math.cos(Math.PI * T)) / 2
        }
    };
    ax["ease-in"] = ax.easeInQuad;
    ax["ease-out"] = ax.easeOutQuad;
    var m = !!(window.location.protocol == "https:");
    var x = m ? "https://sapi.map.baidu.com/": "http://api.map.baidu.com/";
    var cd = {
        imgPath: x + "images/",
        cityNames: {
            "\u5317\u4eac": "bj",
            "\u4e0a\u6d77": "sh",
            "\u6df1\u5733": "sz",
            "\u5e7f\u5dde": "gz"
        },
        fontFamily: "arial,sans-serif"
    };
    if (a9.browser.firefox) {
        a9.extend(cd, {
            distCursor: "url(" + cd.imgPath + "ruler.cur),crosshair",
            defaultCursor: "-moz-grab",
            draggingCursor: "-moz-grabbing"
        });
        if (a9.platform.isWindows) {
            cd.fontFamily = "arial,simsun,sans-serif"
        }
    } else {
        if (a9.browser.chrome || a9.browser.safari) {
            a9.extend(cd, {
                distCursor: "url(" + cd.imgPath + "ruler.cur) 2 6,crosshair",
                defaultCursor: "url(" + cd.imgPath + "openhand.cur) 8 8,default",
                draggingCursor: "url(" + cd.imgPath + "closedhand.cur) 8 8,move"
            })
        } else {
            a9.extend(cd, {
                distCursor: "url(" + cd.imgPath + "ruler.cur),crosshair",
                defaultCursor: "url(" + cd.imgPath + "openhand.cur),default",
                draggingCursor: "url(" + cd.imgPath + "closedhand.cur),move"
            })
        }
    }
    function aw(cN, cM, T) {
        this.id = cN;
        this.bounds = cM;
        this.content = T
    }
    var bo = {
        undo: 1,
        redo: 2,
        zoom: 4,
        drag: 8,
        move: 16,
        mousewheel: 32,
        toolbarOperation: 64,
        stdMapCtrlDrag: 128,
        dblclick: 256
    };
    function bJ(cN, T) {
        var cM = cN.style;
        cM.left = T[0] + "px";
        cM.top = T[1] + "px"
    }
    function cx(T) {
        if (a9.browser.ie > 0) {
            T.unselectable = "on"
        } else {
            T.style.MozUserSelect = "none"
        }
    }
    function y(T) {
        return T && T.parentNode && T.parentNode.nodeType != 11
    }
    function au(cM, T) {
        a9.dom.insertHTML(cM, "beforeEnd", T);
        return cM.lastChild
    }
    function bZ(T) {
        var cM = {
            left: 0,
            top: 0
        };
        while (T && T.offsetParent) {
            cM.left += T.offsetLeft;
            cM.top += T.offsetTop;
            T = T.offsetParent
        }
        return cM
    }
    function aQ(T) {
        var T = window.event || T;
        T.stopPropagation ? T.stopPropagation() : T.cancelBubble = true
    }
    function cD(T) {
        var T = window.event || T;
        T.preventDefault ? T.preventDefault() : T.returnValue = false;
        return false
    }
    function cp(T) {
        aQ(T);
        return cD(T)
    }
    function cH() {
        var T = document.documentElement,
        cM = document.body;
        if (T && (T.scrollTop || T.scrollLeft)) {
            return [T.scrollTop, T.scrollLeft]
        } else {
            if (cM) {
                return [cM.scrollTop, cM.scrollLeft]
            } else {
                return [0, 0]
            }
        }
    }
    function cu(cM, T) {
        if (!cM || !T) {
            return
        }
        return Math.round(Math.sqrt(Math.pow(cM.x - T.x, 2) + Math.pow(cM.y - T.y, 2)))
    }
    function P(T, cN) {
        var cM = [];
        cN = cN ||
        function(cP) {
            return cP
        };
        for (var cO in T) {
            cM.push(cO + "=" + cN(T[cO]))
        }
        return cM.join("&")
    }
    function ab(cM, T, cN) {
        var cO = document.createElement(cM);
        if (cN) {
            cO = document.createElementNS(cN, cM)
        }
        return a9.dom.setAttrs(cO, T || {})
    }
    function aK(T) {
        if (T.currentStyle) {
            return T.currentStyle
        } else {
            if (T.ownerDocument && T.ownerDocument.defaultView) {
                return T.ownerDocument.defaultView.getComputedStyle(T, null)
            }
        }
    }
    function I(T) {
        return typeof T == "function"
    }
    function aL(T) {
        return typeof T == "number"
    }
    function b4(T) {
        return typeof T == "string"
    }
    function ci(T) {
        return typeof T != "undefined"
    }
    function cK(T) {
        return typeof T == "object"
    }
    function aZ(T) {
        return "[object Array]" == Object.prototype.toString.call(T)
    }
    var cg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function bW(cO) {
        var cM = "";
        var cV, cT, cR = "";
        var cU, cS, cQ, cP = "";
        var cN = 0;
        var T = /[^A-Za-z0-9\+\/\=]/g;
        if (!cO || T.exec(cO)) {
            return cO
        }
        cO = cO.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            cU = cg.indexOf(cO.charAt(cN++));
            cS = cg.indexOf(cO.charAt(cN++));
            cQ = cg.indexOf(cO.charAt(cN++));
            cP = cg.indexOf(cO.charAt(cN++));
            cV = (cU << 2) | (cS >> 4);
            cT = ((cS & 15) << 4) | (cQ >> 2);
            cR = ((cQ & 3) << 6) | cP;
            cM = cM + String.fromCharCode(cV);
            if (cQ != 64) {
                cM = cM + String.fromCharCode(cT)
            }
            if (cP != 64) {
                cM = cM + String.fromCharCode(cR)
            }
            cV = cT = cR = "";
            cU = cS = cQ = cP = ""
        } while ( cN < cO . length );
        return cM
    }
    var bh = a9.lang.Event;
    function aB() {
        return !! (a9.platform.isIphone || a9.platform.isIpad || a9.platform.isAndroid)
    }
    function bP() {
        return !! (a9.platform.isWindows || a9.platform.isMacintosh || a9.platform.isX11)
    }
    function aF() {
        return (new Date).getTime()
    }
    var cy = {
        request: function(cM) {
            var T = ab("script", {
                src: cM,
                type: "text/javascript",
                charset: "utf-8"
            });
            if (T.addEventListener) {
                T.addEventListener("load",
                function(cO) {
                    var cN = cO.target;
                    cN.parentNode.removeChild(cN)
                },
                false)
            } else {
                if (T.attachEvent) {
                    T.attachEvent("onreadystatechange",
                    function(cO) {
                        var cN = window.event.srcElement;
                        if (cN && (cN.readyState == "loaded" || cN.readyState == "complete")) {
                            cN.parentNode.removeChild(cN)
                        }
                    })
                }
            }
            setTimeout(function() {
                document.getElementsByTagName("head")[0].appendChild(T);
                T = null
            },
            1)
        }
    };
    function cB() {}
    a9.object.extend(cB, {
        Request: {
            INITIAL: -1,
            WAITING: 0,
            COMPLETED: 1
        },
        Dependency: {
            control: [],
            marker: [],
            poly: ["marker"],
            infowindow: ["marker"],
            menu: [],
            oppc: [],
            opmb: [],
            scommon: [],
            local: ["scommon"],
            route: ["scommon"],
            othersearch: ["scommon"],
            autocomplete: ["scommon"],
            buslinesearch: ["route"],
            hotspot: []
        },
        preLoaded: {},
        Config: {
            _baseUrl: x + "getmodules?v=1.3",
            _timeout: 5000
        },
        delayFlag: false,
        Module: {
            _modules: {},
            _arrMdls: []
        },
        load: function(cM, cO) {
            var T = this.current(cM);
            if (T._status == this.Request.COMPLETED) {
                return
            } else {
                if (T._status == this.Request.INITIAL) {
                    this.combine(cM);
                    this.pushUniqueMdl(cM);
                    var cN = this;
                    if (cN.delayFlag == false) {
                        cN.delayFlag = true;
                        window.setTimeout(function() {
                            var cP = cN.Config._baseUrl + "&mod=" + cN.Module._arrMdls.join(",");
                            cy.request(cP);
                            cN.Module._arrMdls.length = 0;
                            cN.delayFlag = false
                        },
                        1)
                    }
                    T._status = this.Request.WAITING
                }
                T._callbacks.push(cO)
            }
        },
        combine: function(T) {
            if (T && this.Dependency[T]) {
                var cN = this.Dependency[T];
                for (var cM = 0; cM < cN.length; cM++) {
                    this.combine(cN[cM]);
                    if (!this.Module._modules[cN[cM]]) {
                        this.pushUniqueMdl(cN[cM])
                    }
                }
            }
        },
        pushUniqueMdl: function(cM) {
            for (var T = 0; T < this.Module._arrMdls.length; T++) {
                if (this.Module._arrMdls[T] == cM) {
                    return
                }
            }
            this.Module._arrMdls.push(cM)
        },
        run: function(cN, cP) {
            var cM = this.current(cN);
            try {
                eval(cP)
            } catch(cQ) {
                return
            }
            cM._status = this.Request.COMPLETED;
            for (var cO = 0,
            T = cM._callbacks.length; cO < T; cO++) {
                cM._callbacks[cO]()
            }
            cM._callbacks.length = 0
        },
        check: function(cM, cN) {
            var T = this;
            T.timeout = setTimeout(function() {
                var cO = T.Module._modules[cM]._status;
                if (cO != T.Request.COMPLETED) {
                    T.remove(cM);
                    T.load(cM, cN)
                } else {
                    clearTimeout(T.timeout)
                }
            },
            T.Config._timeout)
        },
        current: function(cM) {
            var T;
            if (!this.Module._modules[cM]) {
                this.Module._modules[cM] = {};
                this.Module._modules[cM]._status = this.Request.INITIAL;
                this.Module._modules[cM]._callbacks = []
            }
            T = this.Module._modules[cM];
            return T
        },
        remove: function(cM) {
            var T = this.current(cM);
            delete T
        }
    });
    window._jsload = function(T, cM) {
        cB.run(T, cM)
    };
    function bv(T, cM) {
        this.x = T || 0;
        this.y = cM || 0
    }
    bv.prototype.equals = function(T) {
        return T && T.x == this.x && T.y == this.y
    };
    function aI(cM, T) {
        this.width = cM || 0;
        this.height = T || 0
    }
    aI.prototype.equals = function(T) {
        return T && this.width == T.width && this.height == T.height
    };
    function cn(T, cM) {
        if (!T) {
            return
        }
        this._position = T;
        this.guid = "spot" + (cn.guid++);
        cM = cM || {};
        this._text = cM.text || "";
        this._offsets = cM.offsets ? cM.offsets.slice(0) : [5, 5, 5, 5];
        this._userData = cM.userData || null;
        this._minZoom = cM.minZoom || null;
        this._maxZoom = cM.maxZoom || null
    }
    cn.guid = 0;
    a9.extend(cn.prototype, {
        initialize: function(T) {
            if (this._minZoom == null) {
                this._minZoom = T.config.minZoom
            }
            if (this._maxZoom == null) {
                this._maxZoom = T.config.maxZoom
            }
        },
        setPosition: function(T) {
            if (T instanceof ce) {
                this._position = T
            }
        },
        getPosition: function() {
            return this._position
        },
        setText: function(T) {
            this._text = T
        },
        getText: function() {
            return this._text
        },
        setUserData: function(T) {
            this._userData = T
        },
        getUserData: function() {
            return this._userData
        }
    });
    function cq() {
        this._map = null;
        this._container;
        this._type = "control";
        this.blockInfoWindow = true;
        this._visible = true
    }
    a9.lang.inherits(cq, a9.lang.Class, "Control");
    a9.extend(cq.prototype, {
        initialize: function(T) {
            this._map = T;
            if (this._container) {
                T.container.appendChild(this._container);
                return this._container
            }
            return
        },
        _i: function(T) {
            if (!this._container && this.initialize && I(this.initialize)) {
                this._container = this.initialize(T)
            }
            this._opts = this._opts || {
                printable: false
            };
            this._setStyle();
            this._setPosition();
            if (this._container) {
                this._container._jsobj = this
            }
        },
        _setStyle: function() {
            var cM = this._container;
            if (cM) {
                var T = cM.style;
                T.position = "absolute";
                T.zIndex = this._cZIndex || "10";
                T.MozUserSelect = "none";
                T.WebkitTextSizeAdjust = "none";
                if (!this._opts.printable) {
                    a9.dom.addClass(cM, "BMap_noprint")
                }
                a9.on(cM, "contextmenu", cp)
            }
        },
        remove: function() {
            this._map = null;
            if (!this._container) {
                return
            }
            this._container.parentNode && this._container.parentNode.removeChild(this._container);
            this._container._jsobj = null;
            this._container = null
        },
        _render: function() {
            this._container = au(this._map.container, "<div unselectable='on'></div>");
            if (this._visible == false) {
                a9.dom.hide(this._container)
            }
            return this._container
        },
        _setPosition: function() {
            this.setAnchor(this._opts.anchor)
        },
        setAnchor: function(cO) {
            if (this.anchorFixed || !aL(cO) || isNaN(cO) || cO < BMAP_ANCHOR_TOP_LEFT || cO > BMAP_ANCHOR_BOTTOM_RIGHT) {
                cO = this.defaultAnchor
            }
            this._opts = this._opts || {
                printable: false
            };
            this._opts.offset = this._opts.offset || this.defaultOffset;
            var cN = this._opts.anchor;
            this._opts.anchor = cO;
            if (!this._container) {
                return
            }
            var cQ = this._container;
            var T = this._opts.offset.width;
            var cP = this._opts.offset.height;
            cQ.style.left = cQ.style.top = cQ.style.right = cQ.style.bottom = "auto";
            switch (cO) {
            case BMAP_ANCHOR_TOP_LEFT:
                cQ.style.top = cP + "px";
                cQ.style.left = T + "px";
                break;
            case BMAP_ANCHOR_TOP_RIGHT:
                cQ.style.top = cP + "px";
                cQ.style.right = T + "px";
                break;
            case BMAP_ANCHOR_BOTTOM_LEFT:
                cQ.style.bottom = cP + "px";
                cQ.style.left = T + "px";
                break;
            case BMAP_ANCHOR_BOTTOM_RIGHT:
                cQ.style.bottom = cP + "px";
                cQ.style.right = T + "px";
                break;
            default:
                break
            }
            var cM = ["TL", "TR", "BL", "BR"];
            a9.dom.removeClass(this._container, "anchor" + cM[cN]);
            a9.dom.addClass(this._container, "anchor" + cM[cO])
        },
        getAnchor: function() {
            return this._opts.anchor
        },
        setOffset: function(T) {
            if (! (T instanceof aI)) {
                return
            }
            this._opts = this._opts || {
                printable: false
            };
            this._opts.offset = new aI(T.width, T.height);
            if (!this._container) {
                return
            }
            this.setAnchor(this._opts.anchor)
        },
        getOffset: function() {
            return this._opts.offset
        },
        getDom: function() {
            return this._container
        },
        show: function() {
            if (this._visible == true) {
                return
            }
            this._visible = true;
            if (this._container) {
                a9.dom.show(this._container)
            }
        },
        hide: function() {
            if (this._visible == false) {
                return
            }
            this._visible = false;
            if (this._container) {
                a9.dom.hide(this._container)
            }
        },
        isPrintable: function() {
            return !! this._opts.printable
        },
        isVisible: function() {
            if (!this._container && !this._map) {
                return false
            }
            return !! this._visible
        }
    });
    window.BMAP_ANCHOR_TOP_LEFT = 0;
    window.BMAP_ANCHOR_TOP_RIGHT = 1;
    window.BMAP_ANCHOR_BOTTOM_LEFT = 2;
    window.BMAP_ANCHOR_BOTTOM_RIGHT = 3;
    window.BMAP_NAVIGATION_CONTROL_LARGE = 0;
    window.BMAP_NAVIGATION_CONTROL_SMALL = 1;
    window.BMAP_NAVIGATION_CONTROL_PAN = 2;
    window.BMAP_NAVIGATION_CONTROL_ZOOM = 3;
    function L(T) {
        cq.call(this);
        T = T || {};
        this._opts = {
            printable: false,
            showZoomInfo: true
        };
        a9.object.extend(this._opts, T);
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new aI(10, 10);
        this.setAnchor(T.anchor);
        this.setType(T.type);
        this._asyncLoadCode()
    }
    a9.lang.inherits(L, cq, "NavigationControl");
    a9.extend(L.prototype, {
        initialize: function(T) {
            this._map = T;
            return this._container
        },
        setType: function(T) {
            if (aL(T) && T >= BMAP_NAVIGATION_CONTROL_LARGE && T <= BMAP_NAVIGATION_CONTROL_ZOOM) {
                this._opts.type = T
            } else {
                this._opts.type = BMAP_NAVIGATION_CONTROL_LARGE
            }
        },
        getType: function() {
            return this._opts.type
        },
        _asyncLoadCode: function() {
            var T = this;
            cB.load("control",
            function() {
                T._asyncDraw()
            })
        }
    });
    function an(T) {
        cq.call(this);
        T = T || {};
        this._opts = {
            printable: false
        };
        a9.object.extend(this._opts, T);
        this._copyrightCollection = [];
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
        this.defaultOffset = new aI(5, 2);
        this.setAnchor(T.anchor);
        this._canShow = true;
        this.blockInfoWindow = false;
        this._asyncLoadCode()
    }
    a9.lang.inherits(an, cq, "CopyrightControl");
    a9.object.extend(an.prototype, {
        initialize: function(T) {
            this._map = T;
            return this._container
        },
        addCopyright: function(cN) {
            if (!cN || !aL(cN.id) || isNaN(cN.id)) {
                return
            }
            var T = {
                bounds: null,
                content: ""
            };
            for (var cM in cN) {
                T[cM] = cN[cM]
            }
            var cO = this.getCopyright(cN.id);
            if (cO) {
                for (var cP in T) {
                    cO[cP] = T[cP]
                }
            } else {
                this._copyrightCollection.push(T)
            }
        },
        getCopyright: function(cN) {
            for (var cM = 0,
            T = this._copyrightCollection.length; cM < T; cM++) {
                if (this._copyrightCollection[cM].id == cN) {
                    return this._copyrightCollection[cM]
                }
            }
        },
        getCopyrightCollection: function() {
            return this._copyrightCollection
        },
        removeCopyright: function(cN) {
            for (var cM = 0,
            T = this._copyrightCollection.length; cM < T; cM++) {
                if (this._copyrightCollection[cM].id == cN) {
                    r = this._copyrightCollection.splice(cM, 1);
                    cM--;
                    T = this._copyrightCollection.length
                }
            }
        },
        _asyncLoadCode: function() {
            var T = this;
            cB.load("control",
            function() {
                T._asyncDraw()
            })
        }
    });
    function cL(T) {
        cq.call(this);
        T = T || {};
        this._opts = {
            printable: false
        };
        this._opts = a9.extend(a9.extend(this._opts, {
            size: new aI(150, 150),
            padding: 5,
            isOpen: false,
            zoomInterval: 4
        }), T);
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
        this.defaultOffset = new aI(0, 0);
        this._btnWidth = 13;
        this._btnHeight = 13;
        this.setAnchor(T.anchor);
        this.setSize(this._opts.size);
        this._asyncLoadCode()
    }
    a9.lang.inherits(cL, cq, "OverviewMapControl");
    a9.extend(cL.prototype, {
        initialize: function(T) {
            this._map = T;
            return this._container
        },
        setAnchor: function(T) {
            cq.prototype.setAnchor.call(this, T)
        },
        changeView: function() {
            this.changeView._running = true;
            this._opts.isOpen = !this._opts.isOpen;
            if (!this._container) {
                this.changeView._running = false
            }
        },
        setSize: function(T) {
            if (! (T instanceof aI)) {
                T = new aI(150, 150)
            }
            T.width = T.width > 0 ? T.width: 150;
            T.height = T.height > 0 ? T.height: 150;
            this._opts.size = T
        },
        getSize: function() {
            return this._opts.size
        },
        isOpen: function() {
            return this._opts.isOpen
        },
        _asyncLoadCode: function() {
            var T = this;
            cB.load("control",
            function() {
                T._asyncDraw()
            })
        }
    });
    function bL(T) {
        cq.call(this);
        T = T || {};
        this._opts = {
            printable: false
        };
        this._opts = a9.object.extend(a9.object.extend(this._opts, {
            color: "black",
            unit: "metric"
        }), T);
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
        this.defaultOffset = new aI(81, 18);
        this.setAnchor(T.anchor);
        this._units = {
            metric: {
                name: "metric",
                conv: 1,
                incon: 1000,
                u1: "\u7c73",
                u2: "\u516c\u91cc"
            },
            us: {
                name: "us",
                conv: 3.2808,
                incon: 5280,
                u1: "\u82f1\u5c3a",
                u2: "\u82f1\u91cc"
            }
        };
        if (!this._units[this._opts.unit]) {
            this._opts.unit = "metric"
        }
        this._scaleText = null;
        this._numberArray = {};
        this._asyncLoadCode()
    }
    window.BMAP_UNIT_METRIC = "metric";
    window.BMAP_UNIT_IMPERIAL = "us";
    a9.lang.inherits(bL, cq, "ScaleControl");
    a9.object.extend(bL.prototype, {
        initialize: function(T) {
            this._map = T;
            return this._container
        },
        setColor: function(T) {
            this._opts.color = T + ""
        },
        getColor: function() {
            return this._opts.color
        },
        setUnit: function(T) {
            this._opts.unit = this._units[T] && this._units[T].name || this._opts.unit
        },
        getUnit: function() {
            return this._opts.unit
        },
        _asyncLoadCode: function() {
            var T = this;
            cB.load("control",
            function() {
                T._asyncDraw()
            })
        }
    });
    window.BMAP_MAPTYPE_CONTROL_HORIZONTAL = 0;
    window.BMAP_MAPTYPE_CONTROL_DROPDOWN = 1;
    function aM(T) {
        cq.call(this);
        T = T || {};
        this._opts = {
            printable: false,
            mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP, BMAP_PERSPECTIVE_MAP],
            type: BMAP_MAPTYPE_CONTROL_HORIZONTAL
        };
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new aI(10, 10);
        this.setAnchor(T.anchor);
        this._opts = a9.extend(a9.extend(this._opts, {
            offset: this.defaultOffset,
            enableSwitch: true
        }), T);
        if (aZ(T.mapTypes)) {
            this._opts.mapTypes = T.mapTypes.slice(0)
        }
        this._asyncLoadCode()
    }
    a9.lang.inherits(aM, cq, "MapTypeControl");
    a9.object.extend(aM.prototype, {
        initialize: function(T) {
            this._map = T;
            return this._container
        },
        _asyncLoadCode: function() {
            var T = this;
            cB.load("control",
            function() {
                T._asyncDraw()
            })
        }
    });
    function cA(cM) {
        a9.lang.Class.call(this);
        this._opts = {
            container: null,
            cursor: "default"
        };
        this._opts = a9.extend(this._opts, cM);
        this._type = "contextmenu";
        this._map = null;
        this._container;
        this._shadow;
        this._left = 0;
        this._top = 0;
        this._items = [];
        this._rItems = [];
        this._dividers = [];
        this.curPixel = null;
        this.curPoint = null;
        this._isOpen = false;
        var T = this;
        cB.load("menu",
        function() {
            T._draw()
        })
    }
    a9.lang.inherits(cA, a9.lang.Class, "ContextMenu");
    a9.object.extend(cA.prototype, {
        initialize: function(cM, T) {
            this._map = cM;
            this._overlay = T || null
        },
        remove: function() {
            this._map = this._overlay = null
        },
        addItem: function(cN) {
            if (!cN || cN._type != "menuitem" || cN._text == "" || cN._width <= 0) {
                return
            }
            for (var cM = 0,
            T = this._items.length; cM < T; cM++) {
                if (this._items[cM] === cN) {
                    return
                }
            }
            this._items.push(cN);
            this._rItems.push(cN)
        },
        removeItem: function(cN) {
            if (!cN || cN._type != "menuitem") {
                return
            }
            for (var cM = 0,
            T = this._items.length; cM < T; cM++) {
                if (this._items[cM] === cN) {
                    this._items[cM].remove();
                    this._items.splice(cM, 1);
                    T--
                }
            }
            for (var cM = 0,
            T = this._rItems.length; cM < T; cM++) {
                if (this._rItems[cM] === cN) {
                    this._rItems[cM].remove();
                    this._rItems.splice(cM, 1);
                    T--
                }
            }
        },
        addSeparator: function() {
            this._items.push({
                _type: "divider",
                _dIndex: this._dividers.length
            });
            this._dividers.push({
                dom: null
            })
        },
        removeSeparator: function(cM) {
            if (!this._dividers[cM]) {
                return
            }
            for (var cN = 0,
            T = this._items.length; cN < T; cN++) {
                if (this._items[cN] && this._items[cN]._type == "divider" && this._items[cN]._dIndex == cM) {
                    this._items.splice(cN, 1);
                    T--
                }
                if (this._items[cN] && this._items[cN]._type == "divider" && this._items[cN]._dIndex > cM) {
                    this._items[cN]._dIndex--
                }
            }
            this._dividers.splice(cM, 1)
        },
        getDom: function() {
            return this._container
        },
        show: function() {
            if (this._isOpen == true) {
                return
            }
            this._isOpen = true
        },
        hide: function() {
            if (this._isOpen == false) {
                return
            }
            this._isOpen = false
        },
        setCursor: function(T) {
            if (!T) {
                return
            }
            this._opts.cursor = T
        },
        getItem: function(T) {
            return this._rItems[T]
        }
    });
    function bf(cN, cO, cM) {
        if (!cN || !I(cO)) {
            return
        }
        a9.lang.Class.call(this);
        this._opts = {
            width: 100,
            id: ""
        };
        cM = cM || {};
        this._opts.width = (cM.width * 1) ? cM.width: 100;
        this._opts.id = cM.id ? cM.id: "";
        this._text = cN + "";
        this._callback = cO;
        this._map = null;
        this._type = "menuitem";
        this._contextmenu = null;
        this._container = null;
        this._enabled = true;
        var T = this;
        cB.load("menu",
        function() {
            T._draw()
        })
    }
    a9.lang.inherits(bf, a9.lang.Class, "MenuItem");
    a9.object.extend(bf.prototype, {
        initialize: function(T, cM) {
            this._map = T;
            this._contextmenu = cM
        },
        remove: function() {
            this._contextmenu = null;
            this._map = null
        },
        setText: function(T) {
            if (!T) {
                return
            }
            this._text = T + ""
        },
        getDom: function() {
            return this._container
        },
        enable: function() {
            this._enabled = true
        },
        disable: function() {
            this._enabled = false
        }
    });
    function bO(T, cM) {
        if (T && !cM) {
            cM = T
        }
        this._sw = this._ne = null;
        this._swLng = this._swLat = null;
        this._neLng = this._neLat = null;
        if (T) {
            this._sw = new ce(T.lng, T.lat);
            this._ne = new ce(cM.lng, cM.lat);
            this._swLng = T.lng;
            this._swLat = T.lat;
            this._neLng = cM.lng;
            this._neLat = cM.lat
        }
    }
    a9.object.extend(bO.prototype, {
        isEmpty: function() {
            return ! this._sw || !this._ne
        },
        equals: function(T) {
            if (! (T instanceof bO) || this.isEmpty()) {
                return false
            }
            return this.getSouthWest().equals(T.getSouthWest()) && this.getNorthEast().equals(T.getNorthEast())
        },
        getSouthWest: function() {
            return this._sw
        },
        getNorthEast: function() {
            return this._ne
        },
        containsBounds: function(T) {
            if (! (T instanceof bO) || this.isEmpty() || T.isEmpty()) {
                return false
            }
            return (T._swLng > this._swLng && T._neLng < this._neLng && T._swLat > this._swLat && T._neLat < this._neLat)
        },
        getCenter: function() {
            if (this.isEmpty()) {
                return null
            }
            return new ce((this._swLng + this._neLng) / 2, (this._swLat + this._neLat) / 2)
        },
        intersects: function(cN) {
            if (! (cN instanceof bO)) {
                return null
            }
            if (Math.max(cN._swLng, cN._neLng) < Math.min(this._swLng, this._neLng) || Math.min(cN._swLng, cN._neLng) > Math.max(this._swLng, this._neLng) || Math.max(cN._swLat, cN._neLat) < Math.min(this._swLat, this._neLat) || Math.min(cN._swLat, cN._neLat) > Math.max(this._swLat, this._neLat)) {
                return null
            }
            var cP = Math.max(this._swLng, cN._swLng);
            var cM = Math.min(this._neLng, cN._neLng);
            var cO = Math.max(this._swLat, cN._swLat);
            var T = Math.min(this._neLat, cN._neLat);
            return new bO(new ce(cP, cO), new ce(cM, T))
        },
        containsPoint: function(T) {
            if (! (T instanceof ce) || this.isEmpty()) {
                return false
            }
            return (T.lng >= this._swLng && T.lng <= this._neLng && T.lat >= this._swLat && T.lat <= this._neLat)
        },
        extend: function(T) {
            if (! (T instanceof ce)) {
                return
            }
            var cM = T.lng,
            cN = T.lat;
            if (!this._sw) {
                this._sw = new ce(0, 0)
            }
            if (!this._ne) {
                this._ne = new ce(0, 0)
            }
            if (!this._swLng || this._swLng > cM) {
                this._sw.lng = this._swLng = cM
            }
            if (!this._neLng || this._neLng < cM) {
                this._ne.lng = this._neLng = cM
            }
            if (!this._swLat || this._swLat > cN) {
                this._sw.lat = this._swLat = cN
            }
            if (!this._neLat || this._neLat < cN) {
                this._ne.lat = this._neLat = cN
            }
        },
        toSpan: function() {
            if (this.isEmpty()) {
                return new ce(0, 0)
            }
            return new ce(Math.abs(this._neLng - this._swLng), Math.abs(this._neLat - this._swLat))
        }
    });
    function ce(T, cM) {
        if (isNaN(T)) {
            T = bW(T);
            T = isNaN(T) ? 0 : T
        }
        if (b4(T)) {
            T = parseFloat(T)
        }
        if (isNaN(cM)) {
            cM = bW(cM);
            cM = isNaN(cM) ? 0 : cM
        }
        if (b4(cM)) {
            cM = parseFloat(cM)
        }
        this.lng = T;
        this.lat = cM
    }
    ce.isInRange = function(T) {
        return T && T.lng <= 180 && T.lng >= -180 && T.lat <= 74 && T.lat >= -74
    };
    ce.prototype.equals = function(T) {
        return T && this.lat == T.lat && this.lng == T.lng
    };
    function be() {}
    be.prototype.lngLatToPoint = function() {
        throw "lngLatToPoint\u65b9\u6cd5\u672a\u5b9e\u73b0"
    };
    be.prototype.pointToLngLat = function() {
        throw "pointToLngLat\u65b9\u6cd5\u672a\u5b9e\u73b0"
    };
    function b7() {}
    a9.extend(b7, {
        num: {
            bj: {
                num: Math.sin(Math.PI / 4),
                num2: Math.sin(Math.PI / 6)
            },
            gz: {
                num: Math.sin(Math.PI / 4),
                num2: Math.sin(Math.PI / 4)
            },
            sz: {
                num: Math.sin(Math.PI / 4),
                num2: Math.sin(Math.PI / 4)
            },
            sh: {
                num: Math.sin(Math.PI / 4),
                num2: Math.sin(Math.PI / 4)
            }
        },
        correct_pts: {
            bj: [{
                j: 116.305687,
                w: 39.990912,
                utm_x: 12947230.73,
                utm_y: 4836903.65,
                x: 630412,
                y: 547340
            },
            {
                j: 116.381837,
                w: 40.000198,
                utm_x: 12955707.8,
                utm_y: 4838247.62,
                x: 667412,
                y: 561832
            },
            {
                j: 116.430651,
                w: 39.995216,
                utm_x: 12961141.81,
                utm_y: 4837526.55,
                x: 686556,
                y: 573372
            },
            {
                j: 116.474111,
                w: 39.976323,
                utm_x: 12965979.81,
                utm_y: 4834792.55,
                x: 697152,
                y: 586816
            },
            {
                j: 116.280328,
                w: 39.953159,
                utm_x: 12944407.75,
                utm_y: 4831441.53,
                x: 603272,
                y: 549976
            },
            {
                j: 116.316117,
                w: 39.952496,
                utm_x: 12948391.8,
                utm_y: 4831345.64,
                x: 618504,
                y: 557872
            },
            {
                j: 116.350477,
                w: 39.938107,
                utm_x: 12952216.78,
                utm_y: 4829264.65,
                x: 627044,
                y: 568220
            },
            {
                j: 116.432025,
                w: 39.947158,
                utm_x: 12961294.76,
                utm_y: 4830573.59,
                x: 666280,
                y: 584016
            },
            {
                j: 116.46873,
                w: 39.949516,
                utm_x: 12965380.79,
                utm_y: 4830914.63,
                x: 683328,
                y: 591444
            },
            {
                j: 116.280077,
                w: 39.913823,
                utm_x: 12944379.8,
                utm_y: 4825753.62,
                x: 586150,
                y: 558552
            },
            {
                j: 116.308625,
                w: 39.91374,
                utm_x: 12947557.79,
                utm_y: 4825741.62,
                x: 598648,
                y: 564732
            },
            {
                j: 116.369853,
                w: 39.912979,
                utm_x: 12954373.73,
                utm_y: 4825631.62,
                x: 624561,
                y: 578039
            },
            {
                j: 116.433552,
                w: 39.914694,
                utm_x: 12961464.75,
                utm_y: 4825879.53,
                x: 652972,
                y: 591348
            },
            {
                j: 116.457034,
                w: 39.914273,
                utm_x: 12964078.78,
                utm_y: 4825818.67,
                x: 663028,
                y: 596444
            },
            {
                j: 116.490927,
                w: 39.914127,
                utm_x: 12967851.77,
                utm_y: 4825797.57,
                x: 677968,
                y: 604188
            },
            {
                j: 116.483839,
                w: 39.877198,
                utm_x: 12967062.73,
                utm_y: 4820460.67,
                x: 658596,
                y: 610312
            },
            {
                j: 116.405777,
                w: 39.864461,
                utm_x: 12958372.82,
                utm_y: 4818620.62,
                x: 619256,
                y: 596088
            },
            {
                j: 116.35345,
                w: 39.859774,
                utm_x: 12952547.74,
                utm_y: 4817943.6,
                x: 594633,
                y: 585851
            },
            {
                j: 116.403818,
                w: 39.9141,
                utm_x: 12958154.74,
                utm_y: 4825793.66,
                x: 639699,
                y: 585226
            },
            {
                j: 116.318111,
                w: 39.891101,
                utm_x: 12948613.78,
                utm_y: 4822469.56,
                x: 592856,
                y: 571480
            },
            {
                j: 116.413047,
                w: 39.907238,
                utm_x: 12959182.12,
                utm_y: 4824801.76,
                x: 640680,
                y: 588704
            },
            {
                j: 116.390843,
                w: 39.906113,
                utm_x: 12956710.35,
                utm_y: 4824639.16,
                x: 630620,
                y: 584108
            },
            {
                j: 116.446527,
                w: 39.899438,
                utm_x: 12962909.14,
                utm_y: 4823674.4,
                x: 651752,
                y: 597416
            },
            {
                j: 116.388665,
                w: 39.95527,
                utm_x: 12956467.9,
                utm_y: 4831746.87,
                x: 650656,
                y: 572800
            },
            {
                j: 116.398343,
                w: 39.939704,
                utm_x: 12957545.26,
                utm_y: 4829495.6,
                x: 648036,
                y: 578452
            },
            {
                j: 116.355101,
                w: 39.973581,
                utm_x: 12952731.53,
                utm_y: 4834395.82,
                x: 643268,
                y: 560944
            },
            {
                j: 116.380727,
                w: 39.88464,
                utm_x: 12955584.23,
                utm_y: 4821535.94,
                x: 616920,
                y: 586496
            },
            {
                j: 116.360843,
                w: 39.946452,
                utm_x: 12953370.73,
                utm_y: 4830471.48,
                x: 635293,
                y: 568765
            },
            {
                j: 116.340955,
                w: 39.973421,
                utm_x: 12951156.79,
                utm_y: 4834372.67,
                x: 638420,
                y: 558632
            },
            {
                j: 116.322585,
                w: 40.023941,
                utm_x: 12949111.83,
                utm_y: 4841684.79,
                x: 652135,
                y: 543802
            },
            {
                j: 116.356486,
                w: 39.883341,
                utm_x: 12952885.71,
                utm_y: 4821348.24,
                x: 606050,
                y: 581443
            },
            {
                j: 116.339592,
                w: 39.992259,
                utm_x: 12951005.06,
                utm_y: 4837098.59,
                x: 645664,
                y: 554400
            },
            {
                j: 116.3778,
                w: 39.86392,
                utm_x: 12955258.4,
                utm_y: 4818542.48,
                x: 606848,
                y: 590328
            },
            {
                j: 116.377354,
                w: 39.964124,
                utm_x: 12955208.75,
                utm_y: 4833027.64,
                x: 649911,
                y: 568581
            },
            {
                j: 116.361837,
                w: 39.963897,
                utm_x: 12953481.39,
                utm_y: 4832994.8,
                x: 643286,
                y: 565175
            },
            {
                j: 116.441397,
                w: 39.939403,
                utm_x: 12962338.06,
                utm_y: 4829452.07,
                x: 666772,
                y: 587728
            },
            {
                j: 116.359176,
                w: 40.006631,
                utm_x: 12953185.16,
                utm_y: 4839178.78,
                x: 660440,
                y: 555411
            }],
            sz: [{
                w: 22.498861,
                utm_x: 12677279.029193671,
                utm_y: 2555027.9501714734,
                j: 113.880696,
                y: 1104472,
                x: 947240
            },
            {
                w: 22.500706,
                utm_x: 12683920.978881944,
                utm_y: 2555248.973138607,
                j: 113.940361,
                y: 1122320,
                x: 974864
            },
            {
                w: 22.576848,
                utm_x: 12675897.984563945,
                utm_y: 2564373.058056766,
                j: 113.86829,
                y: 1074048,
                x: 979136
            },
            {
                w: 22.55689,
                utm_x: 12680064.05051775,
                utm_y: 2561981.0013635466,
                j: 113.905714,
                y: 1092484,
                x: 986240
            },
            {
                w: 22.58066,
                utm_x: 12678671.98513852,
                utm_y: 2564829.983373251,
                j: 113.893209,
                y: 1080528,
                x: 992088
            },
            {
                w: 22.595751,
                utm_x: 12678298.949465925,
                utm_y: 2566638.9913895614,
                j: 113.889858,
                y: 1074484,
                x: 997960
            },
            {
                w: 22.557499,
                utm_x: 12684523.001238672,
                utm_y: 2562053.9875916084,
                j: 113.945769,
                y: 1104696,
                x: 1004564
            },
            {
                w: 22.648419,
                utm_x: 12676422.97299485,
                utm_y: 2572954.0513219936,
                j: 113.873006,
                y: 1051384,
                x: 1015916
            },
            {
                w: 22.562664,
                utm_x: 12690460.958807131,
                utm_y: 2562673.0054078405,
                j: 113.99911,
                y: 1119860,
                x: 1030228
            },
            {
                w: 22.646618,
                utm_x: 12683008.037804369,
                utm_y: 2572738.0652955617,
                j: 113.93216,
                y: 1070324,
                x: 1041496
            },
            {
                w: 22.571091,
                utm_x: 12695789.992135335,
                utm_y: 2563683.019582462,
                j: 114.046981,
                y: 1131924,
                x: 1055628
            },
            {
                w: 22.704467,
                utm_x: 12682276.994753957,
                utm_y: 2579677.075645295,
                j: 113.925593,
                y: 1048536,
                x: 1066348
            },
            {
                w: 22.547152,
                utm_x: 12702917.96800879,
                utm_y: 2560813.9850610085,
                j: 114.111012,
                y: 1160352,
                x: 1072596
            },
            {
                w: 22.546192,
                utm_x: 12704502.952164687,
                utm_y: 2560698.9417545213,
                j: 114.12525,
                y: 1165256,
                x: 1078452
            },
            {
                w: 22.5714,
                utm_x: 12702350.00978689,
                utm_y: 2563720.0558210905,
                j: 114.10591,
                y: 1150556,
                x: 1081960
            },
            {
                w: 22.555004,
                utm_x: 12704883.001041513,
                utm_y: 2561754.9738317807,
                j: 114.128664,
                y: 1163304,
                x: 1084172
            },
            {
                w: 22.551925,
                utm_x: 12706255.028694374,
                utm_y: 2561385.978019464,
                j: 114.140989,
                y: 1168216,
                x: 1088116
            },
            {
                w: 22.693756,
                utm_x: 12690318.02302569,
                utm_y: 2578392.0635360866,
                j: 113.997826,
                y: 1075100,
                x: 1092860
            },
            {
                w: 22.573769,
                utm_x: 12705731.042149788,
                utm_y: 2564004.003107545,
                j: 114.136282,
                y: 1159404,
                x: 1096572
            },
            {
                w: 22.583238,
                utm_x: 12706369.021093281,
                utm_y: 2565139.002548978,
                j: 114.142013,
                y: 1157896,
                x: 1103632
            },
            {
                w: 22.605844,
                utm_x: 12704694.980375737,
                utm_y: 2567848.984570506,
                j: 114.126975,
                y: 1145540,
                x: 1107972
            },
            {
                w: 22.637228,
                utm_x: 12702545.043656897,
                utm_y: 2571612.010208761,
                j: 114.107662,
                y: 1128764,
                x: 1114460
            },
            {
                w: 22.62496,
                utm_x: 12707132.013185183,
                utm_y: 2570140.9407190788,
                j: 114.148867,
                y: 1145732,
                x: 1127028
            },
            {
                w: 22.644524,
                utm_x: 12707016.01701364,
                utm_y: 2572486.9446672536,
                j: 114.147825,
                y: 1138800,
                x: 1135876
            },
            {
                w: 22.640188,
                utm_x: 12711515.0431873,
                utm_y: 2571966.966986786,
                j: 114.18824,
                y: 1152692,
                x: 1151836
            },
            {
                w: 22.59807,
                utm_x: 12720011.039168343,
                utm_y: 2566916.995355996,
                j: 114.26456,
                y: 1191212,
                x: 1165180
            },
            {
                w: 22.668221,
                utm_x: 12714081.987256048,
                utm_y: 2575329.007304823,
                j: 114.211299,
                y: 1150576,
                x: 1175404
            },
            {
                w: 22.702591,
                utm_x: 12717292.031020584,
                utm_y: 2579452.0022288463,
                j: 114.240135,
                y: 1148204,
                x: 1204600
            },
            {
                w: 22.731786,
                utm_x: 12717795.9798388,
                utm_y: 2582955.0308636553,
                j: 114.244662,
                y: 1139532,
                x: 1220540
            },
            {
                w: 22.727494,
                utm_x: 12720675.957721734,
                utm_y: 2582439.9980541077,
                j: 114.270533,
                y: 1148992,
                x: 1230084
            },
            {
                w: 22.716335,
                utm_x: 12725500.040345404,
                utm_y: 2581101.0132384477,
                j: 114.313868,
                y: 1166316,
                x: 1244102
            }],
            gz: [{
                j: 113.335098,
                w: 23.147289,
                utm_x: 12616542.68,
                utm_y: 2632892.7,
                x: 1129109,
                y: 1073920
            },
            {
                j: 113.320932,
                w: 23.146956,
                utm_x: 12614965.71,
                utm_y: 2632852.62,
                x: 1125620,
                y: 1071640
            },
            {
                j: 113.321435,
                w: 23.140119,
                utm_x: 12615021.7,
                utm_y: 2632029.65,
                x: 1124032,
                y: 1072882
            },
            {
                j: 113.321471,
                w: 23.119165,
                utm_x: 12615025.71,
                utm_y: 2629507.68,
                x: 1118932,
                y: 1076530
            },
            {
                j: 113.340201,
                w: 23.118616,
                utm_x: 12617110.75,
                utm_y: 2629441.61,
                x: 1123238,
                y: 1079667
            },
            {
                j: 113.358068,
                w: 23.116323,
                utm_x: 12619099.71,
                utm_y: 2629165.66,
                x: 1126968,
                y: 1083116
            },
            {
                j: 113.357529,
                w: 23.131271,
                utm_x: 12619039.71,
                utm_y: 2630964.68,
                x: 1130508,
                y: 1080440
            },
            {
                j: 113.365811,
                w: 23.150595,
                utm_x: 12619961.67,
                utm_y: 2633290.66,
                x: 1137205,
                y: 1078567
            },
            {
                j: 113.294145,
                w: 23.118467,
                utm_x: 12611983.76,
                utm_y: 2629423.68,
                x: 1112245,
                y: 1072043
            },
            {
                j: 113.28615,
                w: 23.121525,
                utm_x: 12611093.75,
                utm_y: 2629791.7,
                x: 1110993,
                y: 1070197
            },
            {
                j: 113.307152,
                w: 23.055497,
                utm_x: 12613431.71,
                utm_y: 2621847.21,
                x: 1100144,
                y: 1085123
            },
            {
                j: 113.333445,
                w: 23.052687,
                utm_x: 12616358.66,
                utm_y: 2621509.2,
                x: 1105784,
                y: 1089948
            },
            {
                j: 113.347476,
                w: 23.048755,
                utm_x: 12617920.6,
                utm_y: 2621036.24,
                x: 1108099,
                y: 1093064
            },
            {
                j: 113.385774,
                w: 23.036574,
                utm_x: 12622183.96,
                utm_y: 2619571.12,
                x: 1113850,
                y: 1101834
            },
            {
                j: 113.364185,
                w: 22.89798,
                utm_x: 12619780.66,
                utm_y: 2602910.64,
                x: 1073186,
                y: 1123374
            },
            {
                j: 113.404577,
                w: 22.906481,
                utm_x: 12624277.13,
                utm_y: 2603932.06,
                x: 1084888,
                y: 1128692
            },
            {
                j: 113.430856,
                w: 22.913156,
                utm_x: 12627202.52,
                utm_y: 2604734.12,
                x: 1092892,
                y: 1131761
            },
            {
                j: 113.384554,
                w: 22.933021,
                utm_x: 12622048.15,
                utm_y: 2607121.32,
                x: 1086975,
                y: 1120403
            },
            {
                j: 113.263566,
                w: 23.146333,
                utm_x: 12608579.68,
                utm_y: 2632777.63,
                x: 1111742,
                y: 1062098
            },
            {
                j: 113.239213,
                w: 23.152996,
                utm_x: 12605868.69,
                utm_y: 2633579.69,
                x: 1107616,
                y: 1056740
            },
            {
                j: 113.253865,
                w: 23.131628,
                utm_x: 12607499.76,
                utm_y: 2631007.65,
                x: 1105912,
                y: 1062966
            },
            {
                j: 113.240767,
                w: 23.088434,
                utm_x: 12606041.68,
                utm_y: 2625809.7,
                x: 1092270,
                y: 1068184
            },
            {
                j: 113.279628,
                w: 23.088284,
                utm_x: 12610367.72,
                utm_y: 2625791.65,
                x: 1101412,
                y: 1074883
            },
            {
                j: 113.462271,
                w: 23.107058,
                utm_x: 12630699.66,
                utm_y: 2628050.7,
                x: 1148752,
                y: 1101736
            },
            {
                j: 113.401618,
                w: 23.052957,
                utm_x: 12623947.73,
                utm_y: 2621541.68,
                x: 1121925,
                y: 1101535
            },
            {
                j: 113.422504,
                w: 23.05905,
                utm_x: 12626272.77,
                utm_y: 2622274.61,
                x: 1128470,
                y: 1104049
            },
            {
                j: 113.362506,
                w: 23.107149,
                utm_x: 12619593.75,
                utm_y: 2628061.65,
                x: 1125835,
                y: 1085505
            },
            {
                j: 113.419629,
                w: 23.143176,
                utm_x: 12625952.73,
                utm_y: 2632397.61,
                x: 1148133,
                y: 1089052
            },
            {
                j: 113.23315,
                w: 23.062251,
                utm_x: 12605193.75,
                utm_y: 2622659.67,
                x: 1084184,
                y: 1071368
            },
            {
                j: 113.314525,
                w: 23.101412,
                utm_x: 12614252.48,
                utm_y: 2627371.29,
                x: 1113011,
                y: 1078426
            },
            {
                j: 113.307947,
                w: 23.131369,
                utm_x: 12613520.21,
                utm_y: 2630976.47,
                x: 1118622,
                y: 1072198
            }],
            sh: [{
                j: 121.524411,
                w: 31.245875,
                utm_x: 13528182.75,
                utm_y: 3642354.51,
                x: 1086581,
                y: 1065728
            },
            {
                j: 121.419229,
                w: 31.244887,
                utm_x: 13516473.81,
                utm_y: 3642226.51,
                x: 1032616,
                y: 1029148
            },
            {
                j: 121.405637,
                w: 31.237871,
                utm_x: 13514960.74,
                utm_y: 3641317.54,
                x: 1022724,
                y: 1027244
            },
            {
                j: 121.415348,
                w: 31.222879,
                utm_x: 13516041.78,
                utm_y: 3639375.47,
                x: 1018548,
                y: 1036980
            },
            {
                j: 121.422561,
                w: 31.224261,
                utm_x: 13516844.73,
                utm_y: 3639554.48,
                x: 1022976,
                y: 1038908
            },
            {
                j: 121.412581,
                w: 31.204148,
                utm_x: 13515733.75,
                utm_y: 3636949.48,
                x: 1006568,
                y: 1043696
            },
            {
                j: 121.443025,
                w: 31.206202,
                utm_x: 13519122.8,
                utm_y: 3637215.49,
                x: 1022656,
                y: 1053704
            },
            {
                j: 121.524061,
                w: 31.246917,
                utm_x: 13528143.79,
                utm_y: 3642489.52,
                x: 1082052,
                y: 1064124
            },
            {
                j: 121.529343,
                w: 31.217769,
                utm_x: 13528731.78,
                utm_y: 3638713.59,
                x: 1072696,
                y: 1079064
            },
            {
                j: 121.530268,
                w: 31.210341,
                utm_x: 13528834.75,
                utm_y: 3637751.53,
                x: 1068748,
                y: 1082416
            },
            {
                j: 121.511601,
                w: 31.227303,
                utm_x: 13526756.73,
                utm_y: 3639948.53,
                x: 1069276,
                y: 1068716
            },
            {
                j: 121.4966,
                w: 31.243614,
                utm_x: 13525086.81,
                utm_y: 3642061.58,
                x: 1071220,
                y: 1056805
            },
            {
                j: 121.485021,
                w: 31.26138,
                utm_x: 13523797.82,
                utm_y: 3644363.54,
                x: 1075708,
                y: 1045540
            },
            {
                j: 121.465114,
                w: 31.278803,
                utm_x: 13521581.76,
                utm_y: 3646621.48,
                x: 1073740,
                y: 1031268
            },
            {
                j: 121.454784,
                w: 31.266566,
                utm_x: 13520431.82,
                utm_y: 3645035.58,
                x: 1063591,
                y: 1033191
            },
            {
                j: 121.46851,
                w: 31.24951,
                utm_x: 13521959.81,
                utm_y: 3642825.48,
                x: 1060200,
                y: 1044520
            },
            {
                j: 121.446384,
                w: 31.248422,
                utm_x: 13519496.73,
                utm_y: 3642684.51,
                x: 1048784,
                y: 1037750
            },
            {
                j: 121.509499,
                w: 31.246469,
                utm_x: 13526522.73,
                utm_y: 3642431.47,
                x: 1079309,
                y: 1060105
            },
            {
                j: 121.481643,
                w: 31.283943,
                utm_x: 13523421.78,
                utm_y: 3647287.68,
                x: 1087096,
                y: 1035304
            },
            {
                j: 121.508054,
                w: 31.280609,
                utm_x: 13526361.87,
                utm_y: 3646855.56,
                x: 1098432,
                y: 1045648
            },
            {
                j: 121.493854,
                w: 31.19121,
                utm_x: 13524781.12,
                utm_y: 3635274.07,
                x: 1039624,
                y: 1077288
            },
            {
                j: 121.500079,
                w: 31.185541,
                utm_x: 13525474.09,
                utm_y: 3634540.04,
                x: 1039960,
                y: 1081640
            },
            {
                j: 121.484482,
                w: 31.202846,
                utm_x: 13523737.82,
                utm_y: 3636780.87,
                x: 1041388,
                y: 1069232
            },
            {
                j: 121.480877,
                w: 31.189587,
                utm_x: 13523336.51,
                utm_y: 3635063.92,
                x: 1032484,
                y: 1073640
            },
            {
                j: 121.502652,
                w: 31.195209,
                utm_x: 13525760.52,
                utm_y: 3635791.9,
                x: 1046384,
                y: 1078728
            }]
        },
        getLnglatIndex: function(cO, cS, cR) {
            var cN = 0;
            var cM = 0;
            var cT = 10000000,
            cQ = 1000000000;
            for (var cP = 0; cP < this.correct_pts[cO].length; cP++) {
                var T = this.getDis(this.correct_pts[cO][cP].x, this.correct_pts[cO][cP].y, cS, cR);
                if (T < cQ) {
                    if (T < cT) {
                        cQ = cT;
                        cT = T;
                        cM = cN;
                        cN = cP
                    } else {
                        sedMinDis = T;
                        cM = cP
                    }
                }
            }
            return {
                lt: cN,
                rb: cM
            }
        },
        getOMapIndex_mm: function(cO, cT, cS) {
            var cN = 0;
            var cM = 0;
            var cR = 1294723000,
            cQ = 1294723000;
            for (var cP = 0; cP < this.correct_pts[cO].length; cP++) {
                var T = this.getDis(this.correct_pts[cO][cP].utm_x, this.correct_pts[cO][cP].utm_y, cT, cS);
                if (T < cQ) {
                    if (T < cR) {
                        cQ = cR;
                        cR = T;
                        cM = cN;
                        cN = cP
                    } else {
                        sedMinDis = T;
                        cM = cP
                    }
                }
            }
            return {
                lt: cN,
                rb: cM
            }
        },
        getDis: function(T, cO, cM, cN) {
            return Math.abs(T - cM) + Math.abs(cO - cN)
        },
        toMap: function(cO, T, cP) {
            var cM = (T - cP) * this.num[cO].num;
            var cN = (T + cP) * this.num[cO].num * this.num[cO].num2;
            return {
                x: cM,
                y: cN
            }
        },
        fromMap: function(cO, T, cP) {
            cP = cP / this.num[cO].num2;
            var cM = (T + cP) / (this.num[cO].num * 2);
            var cN = (cP - T) / (this.num[cO].num * 2);
            return {
                x: cM,
                y: cN
            }
        },
        getDgPix_mm: function(cP, cU, cQ) {
            var cT = this.fromMap(cP, this.correct_pts[cP][cU].x, this.correct_pts[cP][cU].y);
            var cR = this.fromMap(cP, this.correct_pts[cP][cQ].x, this.correct_pts[cP][cQ].y);
            var cZ = cT.x,
            cM = cT.y;
            var cY = cR.x,
            T = cR.y;
            var cW = this.correct_pts[cP][cU].utm_x,
            cO = this.correct_pts[cP][cU].utm_y;
            var cS = this.correct_pts[cP][cQ].utm_x,
            cN = this.correct_pts[cP][cQ].utm_y;
            var cX = Math.abs((cS - cW) * 100000 / (cY - cZ));
            var cV = Math.abs((cN - cO) * 100000 / (T - cM));
            return {
                j: cX,
                w: cV,
                x: 100000 / cX,
                y: 100000 / cV
            }
        },
        getPx_mm: function(c2, cY, cX, cP, cO) {
            var cN = this.correct_pts[c2][cP];
            var T = this.correct_pts[c2][cP];
            var cV = this.getDgPix_mm(c2, cP, cO);
            var cR = this.fromMap(c2, cN.x, cN.y);
            var cQ = T.utm_x,
            c4 = T.utm_y;
            var c3 = cY,
            cW = cX;
            var c1 = cR.x;
            var cM = cR.y;
            var cT = c3 - cQ,
            c0 = cW - c4;
            var cU = cT * cV.x + c1;
            var cS = -c0 * cV.y + cM;
            var cZ = this.toMap(c2, cU, cS);
            return cZ
        },
        getJw_mm: function(c0, cV, cU, cQ, cP) {
            var cT = this.correct_pts[c0][cQ];
            var cM = this.correct_pts[c0][cQ];
            var cW = this.getDgPix_mm(c0, cQ, cP);
            var cY = this.fromMap(c0, cV, cU);
            var cO = this.fromMap(c0, cT.x, cT.y);
            var cR = cM.utm_x,
            c1 = cM.utm_y;
            var cZ = cO.x;
            var cN = cO.y;
            var c2 = cY.x - cZ,
            cX = cN - cY.y;
            var cS = c2 / cW.x + cR;
            var T = cX / cW.y + c1;
            return {
                lng: cS,
                lat: T
            }
        },
        getOMap_pts: function(cM, T) {
            return this.getOMap_index(cM, T.lng, T.lat, T.lt, T.rb)
        },
        getMapJw_pts: function(cM, T) {
            return this.getMapJw_index(cM, T.lng, 9998336 - T.lat, T.lt, T.rb)
        },
        getOMap_index: function(cR, cQ, cP, T, cO) {
            if (!T || !cO) {
                var cM = this.getOMapIndex_mm(cR, cQ, cP)
            } else {
                var cM = {
                    lt: T,
                    rb: cO
                }
            }
            var cN = this.getPx_mm(cR, cQ, cP, cM.lt, cM.rb);
            return {
                x: Math.floor(cN.x),
                y: 9998336 - Math.floor(cN.y),
                lt: cM.lt,
                rb: cM.rb
            }
        },
        getMapJw_index: function(cQ, cN, cR, cM, cP) {
            if (!cM || !cP) {
                var cO = this.getLnglatIndex(cQ, cN, cR)
            } else {
                var cO = {
                    lt: cM,
                    rb: cP
                }
            }
            var T = this.getJw_mm(cQ, cN, cR, cO.lt, cO.rb);
            return {
                lng: T.lng,
                lat: T.lat,
                lt: cO.lt,
                rb: cO.rb
            }
        }
    });
    function bb() {}
    bb.prototype = new be();
    a9.extend(bb, {
        EARTHRADIUS: 6370996.81,
        MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        LLBAND: [75, 60, 45, 30, 15, 0],
        MC2LL: [[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2], [ - 7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [ - 3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37], [ - 1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]],
        LL2MC: [[ - 0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5], [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [ - 0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [ - 0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]],
        getDistanceByMC: function(cQ, cO) {
            if (!cQ || !cO) {
                return 0
            }
            var cM, cP, T, cN;
            cQ = this.convertMC2LL(cQ);
            if (!cQ) {
                return 0
            }
            cM = this.toRadians(cQ.lng);
            cP = this.toRadians(cQ.lat);
            cO = this.convertMC2LL(cO);
            if (!cO) {
                return 0
            }
            T = this.toRadians(cO.lng);
            cN = this.toRadians(cO.lat);
            return this.getDistance(cM, T, cP, cN)
        },
        getDistanceByLL: function(cQ, cO) {
            if (!cQ || !cO) {
                return 0
            }
            cQ.lng = this.getLoop(cQ.lng, -180, 180);
            cQ.lat = this.getRange(cQ.lat, -74, 74);
            cO.lng = this.getLoop(cO.lng, -180, 180);
            cO.lat = this.getRange(cO.lat, -74, 74);
            var cM, T, cP, cN;
            cM = this.toRadians(cQ.lng);
            cP = this.toRadians(cQ.lat);
            T = this.toRadians(cO.lng);
            cN = this.toRadians(cO.lat);
            return this.getDistance(cM, T, cP, cN)
        },
        convertMC2LL: function(cM) {
            var cN, cP;
            cN = new ce(Math.abs(cM.lng), Math.abs(cM.lat));
            for (var cO = 0; cO < this.MCBAND.length; cO++) {
                if (cN.lat >= this.MCBAND[cO]) {
                    cP = this.MC2LL[cO];
                    break
                }
            }
            var T = this.convertor(cM, cP);
            var cM = new ce(T.lng.toFixed(6), T.lat.toFixed(6));
            return cM
        },
        convertLL2MC: function(T) {
            var cM, cO;
            T.lng = this.getLoop(T.lng, -180, 180);
            T.lat = this.getRange(T.lat, -74, 74);
            cM = new ce(T.lng, T.lat);
            for (var cN = 0; cN < this.LLBAND.length; cN++) {
                if (cM.lat >= this.LLBAND[cN]) {
                    cO = this.LL2MC[cN];
                    break
                }
            }
            if (!cO) {
                for (var cN = this.LLBAND.length - 1; cN >= 0; cN--) {
                    if (cM.lat <= -this.LLBAND[cN]) {
                        cO = this.LL2MC[cN];
                        break
                    }
                }
            }
            var cP = this.convertor(T, cO);
            var T = new ce(cP.lng.toFixed(2), cP.lat.toFixed(2));
            return T
        },
        convertor: function(cN, cO) {
            if (!cN || !cO) {
                return
            }
            var T = cO[0] + cO[1] * Math.abs(cN.lng);
            var cM = Math.abs(cN.lat) / cO[9];
            var cP = cO[2] + cO[3] * cM + cO[4] * cM * cM + cO[5] * cM * cM * cM + cO[6] * cM * cM * cM * cM + cO[7] * cM * cM * cM * cM * cM + cO[8] * cM * cM * cM * cM * cM * cM;
            T *= (cN.lng < 0 ? -1 : 1);
            cP *= (cN.lat < 0 ? -1 : 1);
            return new ce(T, cP)
        },
        getDistance: function(cM, T, cO, cN) {
            return this.EARTHRADIUS * Math.acos((Math.sin(cO) * Math.sin(cN) + Math.cos(cO) * Math.cos(cN) * Math.cos(T - cM)))
        },
        toRadians: function(T) {
            return Math.PI * T / 180
        },
        toDegrees: function(T) {
            return (180 * T) / Math.PI
        },
        getRange: function(cN, cM, T) {
            if (cM != null) {
                cN = Math.max(cN, cM)
            }
            if (T != null) {
                cN = Math.min(cN, T)
            }
            return cN
        },
        getLoop: function(cN, cM, T) {
            while (cN > T) {
                cN -= T - cM
            }
            while (cN < cM) {
                cN += T - cM
            }
            return cN
        }
    });
    a9.extend(bb.prototype, {
        lngLatToMercator: function(T) {
            return bb.convertLL2MC(T)
        },
        lngLatToPoint: function(T) {
            var cM = bb.convertLL2MC(T);
            return new bv(cM.lng, cM.lat)
        },
        mercatorToLngLat: function(T) {
            return bb.convertMC2LL(T)
        },
        pointToLngLat: function(T) {
            var cM = new ce(T.x, T.y);
            return bb.convertMC2LL(cM)
        },
        pointToPixel: function(cM, cQ, cP, cO, cR) {
            if (!cM) {
                return
            }
            cM = this.lngLatToMercator(cM, cR);
            var cN = this.getZoomUnits(cQ);
            var T = Math.round((cM.lng - cP.lng) / cN + cO.width / 2);
            var cS = Math.round((cP.lat - cM.lat) / cN + cO.height / 2);
            return new bv(T, cS)
        },
        pixelToPoint: function(T, cT, cP, cN, cM) {
            if (!T) {
                return
            }
            var cS = this.getZoomUnits(cT);
            var cQ = cP.lng + cS * (T.x - cN.width / 2);
            var cO = cP.lat - cS * (T.y - cN.height / 2);
            var cR = new ce(cQ, cO);
            return this.mercatorToLngLat(cR, cM)
        },
        getZoomUnits: function(T) {
            return Math.pow(2, (18 - T))
        }
    });
    function cF() {}
    cF.prototype = new bb();
    a9.extend(cF.prototype, {
        lngLatToMercator: function(cM, T) {
            return this._convert2DTo3D(T, bb.convertLL2MC(cM))
        },
        mercatorToLngLat: function(cM, T) {
            return bb.convertMC2LL(this._convert3DTo2D(T, cM))
        },
        lngLatToPoint: function(cN, T) {
            var cM = this._convert2DTo3D(T, bb.convertLL2MC(cN));
            return new bv(cM.lng, cM.lat)
        },
        pointToLngLat: function(cM, T) {
            var cN = new ce(cM.x, cM.y);
            return bb.convertMC2LL(this._convert3DTo2D(T, cN))
        },
        _convert2DTo3D: function(cN, T) {
            var cM = b7.getOMap_pts(cN || "bj", T);
            return new ce(cM.x, cM.y)
        },
        _convert3DTo2D: function(cN, T) {
            var cM = b7.getMapJw_pts(cN || "bj", T);
            return new ce(cM.lng, cM.lat)
        },
        getZoomUnits: function(T) {
            return Math.pow(2, (20 - T))
        }
    });
    function bH() {
        this._type = "overlay"
    }
    a9.lang.inherits(bH, a9.lang.Class, "Overlay");
    bH.getZIndex = function(T) {
        T = T * 1;
        if (!T) {
            return 0
        }
        return (T * -100000) << 1
    };
    a9.extend(bH.prototype, {
        _i: function(T) {
            if (!this.domElement && I(this.initialize)) {
                this.domElement = this.initialize(T);
                if (this.domElement) {
                    this.domElement.style.WebkitUserSelect = "none"
                }
            }
            this.draw()
        },
        initialize: function(T) {
            throw "initialize\u65b9\u6cd5\u672a\u5b9e\u73b0"
        },
        draw: function() {
            throw "draw\u65b9\u6cd5\u672a\u5b9e\u73b0"
        },
        remove: function() {
            if (this.domElement && this.domElement.parentNode) {
                this.domElement.parentNode.removeChild(this.domElement)
            }
            this.domElement = null;
            this.dispatchEvent(new bh("onremove"))
        },
        hide: function() {
            if (this.domElement) {
                a9.dom.hide(this.domElement)
            }
        },
        show: function() {
            if (this.domElement) {
                a9.dom.show(this.domElement)
            }
        },
        isVisible: function() {
            if (!this.domElement) {
                return false
            }
            if (this.domElement.style.display == "none" || this.domElement.style.visibility == "hidden") {
                return false
            }
            return true
        }
    });
    BMap.register(function(cN) {
        var T = cN.temp;
        T.overlayDiv = cN.overlayDiv = cM(cN.platform, 200);
        cN._panes.floatPane = cM(T.overlayDiv, 800);
        cN._panes.markerMouseTarget = cM(T.overlayDiv, 700);
        cN._panes.floatShadow = cM(T.overlayDiv, 600);
        cN._panes.labelPane = cM(T.overlayDiv, 500);
        cN._panes.markerPane = cM(T.overlayDiv, 400);
        cN._panes.markerShadow = cM(T.overlayDiv, 300);
        cN._panes.mapPane = cM(T.overlayDiv, 200);
        function cM(cO, cR) {
            var cQ = ab("div"),
            cP = cQ.style;
            cP.position = "absolute";
            cP.top = cP.left = cP.width = cP.height = "0";
            cP.zIndex = cR;
            cO.appendChild(cQ);
            return cQ
        }
    });
    function Z() {
        a9.lang.Class.call(this);
        bH.call(this);
        this.map = null;
        this._visible = true;
        this.infoWindow = null;
        this._dblclickTime = 0
    }
    a9.lang.inherits(Z, bH, "OverlayInternal");
    a9.extend(Z.prototype, {
        initialize: function(T) {
            this.map = T;
            a9.lang.Class.call(this, this.guid);
            return null
        },
        getMap: function() {
            return this.map
        },
        draw: function() {},
        remove: function() {
            this.map = null;
            a9.lang.decontrol(this.guid);
            bH.prototype.remove.call(this)
        },
        hide: function() {
            if (this._visible == false) {
                return
            }
            this._visible = false
        },
        show: function() {
            if (this._visible == true) {
                return
            }
            this._visible = true
        },
        isVisible: function() {
            if (!this.domElement) {
                return false
            }
            return !! this._visible
        },
        getContainer: function() {
            return this.domElement
        },
        setConfig: function(cM) {
            cM = cM || {};
            for (var T in cM) {
                this._config[T] = cM[T]
            }
        },
        setZIndex: function(T) {
            this.zIndex = T
        },
        enableMassClear: function() {
            this._config.enableMassClear = true
        },
        disableMassClear: function() {
            this._config.enableMassClear = false
        },
        addContextMenu: function(T) {
            this._menu = T
        },
        removeContextMenu: function(T) {
            this._menu = null
        }
    });
    function ct() {
        this.map = null;
        this._overlays = {};
        this._customOverlays = []
    }
    BMap.register(function(cM) {
        var T = new ct();
        T.map = cM;
        cM._overlays = T._overlays;
        cM._customOverlays = T._customOverlays;
        cM.addEventListener("load",
        function(cN) {
            T.draw(cN)
        });
        cM.addEventListener("moveend",
        function(cN) {
            T.draw(cN)
        });
        if (a9.browser.ie && a9.browser.ie < 8 || document.compatMode == "BackCompat") {
            cM.addEventListener("zoomend",
            function(cN) {
                setTimeout(function() {
                    T.draw(cN)
                },
                20)
            })
        } else {
            cM.addEventListener("zoomend",
            function(cN) {
                T.draw(cN)
            })
        }
        cM.addEventListener("maptypechange",
        function(cN) {
            T.draw(cN)
        });
        cM.addEventListener("addoverlay",
        function(cR) {
            var cO = cR.target;
            if (cO instanceof Z) {
                if (!T._overlays[cO.guid]) {
                    T._overlays[cO.guid] = cO
                }
            } else {
                var cQ = false;
                for (var cP = 0,
                cN = T._customOverlays.length; cP < cN; cP++) {
                    if (T._customOverlays[cP] === cO) {
                        cQ = true;
                        break
                    }
                }
                if (!cQ) {
                    T._customOverlays.push(cO)
                }
            }
        });
        cM.addEventListener("removeoverlay",
        function(cQ) {
            var cO = cQ.target;
            if (cO instanceof Z) {
                delete T._overlays[cO.guid]
            } else {
                for (var cP = 0,
                cN = T._customOverlays.length; cP < cN; cP++) {
                    if (T._customOverlays[cP] === cO) {
                        T._customOverlays.splice(cP, 1);
                        break
                    }
                }
            }
        });
        cM.addEventListener("clearoverlays",
        function(cQ) {
            this.closeInfoWindow();
            for (var cP in T._overlays) {
                if (T._overlays[cP]._config.enableMassClear) {
                    T._overlays[cP].remove();
                    delete T._overlays[cP]
                }
            }
            for (var cO = 0,
            cN = T._customOverlays.length; cO < cN; cO++) {
                if (T._customOverlays[cO].enableMassClear != false) {
                    T._customOverlays[cO].remove();
                    T._customOverlays[cO] = null;
                    T._customOverlays.splice(cO, 1);
                    cO--;
                    cN--
                }
            }
        });
        cM.addEventListener("infowindowopen",
        function(cO) {
            var cN = this.infoWindow;
            if (cN) {
                a9.dom.hide(cN.popDom);
                a9.dom.hide(cN.shadowDom)
            }
        });
        cM.addEventListener("movestart",
        function() {
            if (this.getInfoWindow()) {
                this.getInfoWindow()._setOverflow()
            }
        });
        cM.addEventListener("moveend",
        function() {
            if (this.getInfoWindow()) {
                this.getInfoWindow()._resetOverflow()
            }
        })
    });
    ct.prototype.draw = function(cN) {
        for (var cM in this._overlays) {
            this._overlays[cM].draw()
        }
        a9.array.each(this._customOverlays,
        function(cO) {
            cO.draw()
        });
        if (this.map.temp.infoWin) {
            this.map.temp.infoWin.setPosition()
        }
        if (BMap.DrawerSelector) {
            var T = BMap.DrawerSelector.getDrawer(this.map);
            T.setPalette()
        }
    };
    function cG(T) {
        Z.call(this);
        this._config = {
            strokeColor: "#3a6bdb",
            strokeWeight: 5,
            strokeOpacity: 0.65,
            strokeStyle: "solid",
            enableMassClear: true,
            getParseTolerance: null,
            getParseCacheIndex: null,
            enableEditing: false,
            mouseOverTolerance: 15,
            use3DCoords: false,
            clickable: true
        };
        T = T || {};
        this.setConfig(T);
        if (this._config.strokeWeight <= 0) {
            this._config.strokeWeight = 5
        }
        if (this._config.strokeOpacity < 0 || this._config.strokeOpacity > 1) {
            this._config.strokeOpacity = 0.65
        }
        if (this._config.fillOpacity < 0 || this._config.fillOpacity > 1) {
            this._config.fillOpacity = 0.65
        }
        if (this._config.strokeStyle != "solid" && this._config.strokeStyle != "dashed") {
            this._config.strokeStyle = "solid"
        }
        if (ci(T.enableClicking)) {
            this._config.clickable = T.enableClicking
        }
        this.domElement = null;
        this._bounds = new BMap.Bounds(0, 0, 0, 0);
        this._parseCache = [];
        this.vertexMarkers = [];
        this._temp = {}
    }
    a9.lang.inherits(cG, Z, "Graph");
    cG.getGraphPoints = function(cM) {
        var T = [];
        if (!cM) {
            return T
        }
        if (b4(cM)) {
            var cN = cM.split(";");
            a9.array.each(cN,
            function(cP) {
                var cO = cP.split(",");
                T.push(new ce(cO[0], cO[1]))
            })
        }
        if (cM.constructor == Array && cM.length > 0) {
            T = cM
        }
        return T
    };
    cG.parseTolerance = [0.09, 0.005, 0.0001, 0.00001];
    a9.extend(cG.prototype, {
        initialize: function(T) {
            this.map = T;
            return null
        },
        draw: function() {
            return;
            if (!this.domElement) {
                return
            }
            if (this._drawer) {
                this._drawer.setPath(this.domElement, this._getDisplayPixels(this.points))
            }
        },
        setPath: function(T) {
            this._parseCache.length = 0;
            this.points = cG.getGraphPoints(T).slice(0);
            this._calcBounds()
        },
        _calcBounds: function() {
            if (!this.points) {
                return
            }
            var T = this;
            T._bounds = new bO();
            a9.array.each(this.points,
            function(cM) {
                T._bounds.extend(cM)
            })
        },
        getPath: function() {
            return this.points
        },
        setPositionAt: function(cM, T) {
            if (!T || !this.points[cM]) {
                return
            }
            this._parseCache.length = 0;
            this.points[cM] = new ce(T.lng, T.lat);
            this._calcBounds()
        },
        setStrokeColor: function(T) {
            this._config.strokeColor = T
        },
        getStrokeColor: function() {
            return this._config.strokeColor
        },
        setStrokeWeight: function(T) {
            if (T > 0) {
                this._config.strokeWeight = T
            }
        },
        getStrokeWeight: function() {
            return this._config.strokeWeight
        },
        setStrokeOpacity: function(T) {
            if (!T || T > 1 || T < 0) {
                return
            }
            this._config.strokeOpacity = T
        },
        getStrokeOpacity: function() {
            return this._config.strokeOpacity
        },
        setFillOpacity: function(T) {
            if (T > 1 || T < 0) {
                return
            }
            this._config.fillOpacity = T
        },
        getFillOpacity: function() {
            return this._config.fillOpacity
        },
        setStrokeStyle: function(T) {
            if (T != "solid" && T != "dashed") {
                return
            }
            this._config.strokeStyle = T
        },
        getStrokeStyle: function() {
            return this._config.strokeStyle
        },
        setFillColor: function(T) {
            this._config.fillColor = T || ""
        },
        getFillColor: function() {
            return this._config.fillColor
        },
        getBounds: function() {
            return this._bounds
        },
        remove: function() {
            if (this.map) {
                this.map.removeEventListener("onmousemove", this._graphMouseEvent)
            }
            Z.prototype.remove.call(this);
            this._parseCache.length = 0
        },
        enableEditing: function() {
            this._config.enableEditing = true
        },
        disableEditing: function() {
            this._config.enableEditing = false
        }
    });
    function n(T) {
        Z.call(this);
        this.map = null;
        this.domElement = null;
        this._config = {
            width: 0,
            height: 0,
            offset: new aI(0, 0),
            opacity: 1,
            background: "transparent",
            lineStroke: 1,
            lineColor: "#000",
            lineStyle: "solid",
            point: null
        };
        this.setConfig(T);
        this.point = this._config.point
    }
    a9.lang.inherits(n, Z, "Division");
    a9.extend(n.prototype, {
        _addDom: function() {
            var T = this._config;
            var cN = this.content;
            var cM = ['<div class="BMap_Division" style="position:absolute;'];
            cM.push("width:" + T.width + "px;display:block;");
            cM.push("overflow:hidden;");
            if (T.borderColor != "none") {
                cM.push("border:" + T.lineStroke + "px " + T.lineStyle + " " + T.lineColor + ";")
            }
            cM.push("opacity:" + T.opacity + "; filter:(opacity=" + T.opacity * 100 + ")");
            cM.push("background:" + T.background + ";");
            cM.push('z-index:60;">');
            cM.push(cN);
            cM.push("</div>");
            this.domElement = au(this.map.getPanes().markerMouseTarget, cM.join(""))
        },
        initialize: function(T) {
            this.map = T;
            this._addDom();
            if (this.domElement) {
                a9.on(this.domElement, "mousedown",
                function(cM) {
                    aQ(cM)
                })
            }
            return this.domElement
        },
        draw: function() {
            var T = this.map.pointToOverlayPixel(this._config.point);
            this._config.offset = new aI( - Math.round(this._config.width / 2) - Math.round(this._config.lineStroke), -Math.round(this._config.height / 2) - Math.round(this._config.lineStroke));
            this.domElement.style.left = T.x + this._config.offset.width + "px";
            this.domElement.style.top = T.y + this._config.offset.height + "px"
        },
        getPosition: function() {
            return this._config.point
        },
        _getPixel: function(T) {
            return this.map.pointToPixel(this.getPosition())
        },
        setPosition: function(T) {
            this._config.point = T;
            this.draw()
        },
        setDimension: function(T, cM) {
            this._config.width = Math.round(T);
            this._config.height = Math.round(cM);
            if (this.domElement) {
                this.domElement.style.width = this._config.width + "px";
                this.domElement.style.height = this._config.height + "px";
                this.draw()
            }
        }
    });
    function M(cM, cN, cO) {
        if (!cM || !cN) {
            return
        }
        this.imageUrl = cM;
        this.size = cN;
        var T = new aI(Math.floor(cN.width / 2), Math.floor(cN.height / 2));
        var cP = {
            anchor: T,
            imageOffset: new aI(0, 0)
        };
        cO = cO || {};
        a9.extend(cP, cO);
        this.anchor = cP.anchor;
        this.imageOffset = cP.imageOffset;
        this.infoWindowAnchor = cO.infoWindowAnchor || this.anchor;
        this.printImageUrl = cO.printImageUrl || ""
    }
    var bE = M.prototype;
    bE.setImageUrl = function(T) {
        if (!T) {
            return
        }
        this.imageUrl = T
    };
    bE.setPrintImageUrl = function(T) {
        if (!T) {
            return
        }
        this.printImageUrl = T
    };
    bE.setSize = function(T) {
        if (!T) {
            return
        }
        this.size = new aI(T.width, T.height)
    };
    bE.setAnchor = function(T) {
        if (!T) {
            return
        }
        this.anchor = new aI(T.width, T.height)
    };
    bE.setImageOffset = function(T) {
        if (!T) {
            return
        }
        this.imageOffset = new aI(T.width, T.height)
    };
    bE.setInfoWindowAnchor = function(T) {
        if (!T) {
            return
        }
        this.infoWindowAnchor = new aI(T.width, T.height)
    };
    bE.toString = function() {
        return "Icon"
    };
    function bQ(cN, cM) {
        a9.lang.Class.call(this);
        this.content = cN;
        this.map = null;
        this._config = {
            width: 0,
            height: 0,
            maxWidth: 600,
            offset: new aI(0, 0),
            title: "",
            maxContent: "",
            enableMaximize: false,
            enableAutoPan: true,
            enableCloseOnClick: true,
            margin: [10, 10, 40, 10],
            collisions: [[10, 10], [10, 10], [10, 10], [10, 10]],
            ifMaxScene: false,
            onClosing: function() {
                return true
            }
        };
        a9.extend(this._config, cM || {});
        if (this._config.width != 0) {
            if (this._config.width < 220) {
                this._config.width = 220
            }
            if (this._config.width > 730) {
                this._config.width = 730
            }
        }
        if (this._config.height != 0) {
            if (this._config.height < 60) {
                this._config.height = 60
            }
            if (this._config.height > 650) {
                this._config.height = 650
            }
        }
        if (this._config.maxWidth != 0) {
            if (this._config.maxWidth < 220) {
                this._config.maxWidth = 220
            }
            if (this._config.maxWidth > 730) {
                this._config.maxWidth = 730
            }
        }
        this.isWinMax = false;
        this.IMG_PATH = cd.imgPath;
        this.overlay = null;
        var T = this;
        cB.load("infowindow",
        function() {
            T._draw()
        })
    }
    a9.lang.inherits(bQ, a9.lang.Class, "InfoWindow");
    a9.extend(bQ.prototype, {
        setWidth: function(T) {
            if (!T && T != 0 || isNaN(T) || T < 0) {
                return
            }
            if (T != 0) {
                if (T < 220) {
                    T = 220
                }
                if (T > 730) {
                    T = 730
                }
            }
            this._config.width = T
        },
        setHeight: function(T) {
            if (!T && T != 0 || isNaN(T) || T < 0) {
                return
            }
            if (T != 0) {
                if (T < 60) {
                    T = 60
                }
                if (T > 650) {
                    T = 650
                }
            }
            this._config.height = T
        },
        setMaxWidth: function(T) {
            if (!T && T != 0 || isNaN(T) || T < 0) {
                return
            }
            if (T != 0) {
                if (T < 220) {
                    T = 220
                }
                if (T > 730) {
                    T = 730
                }
            }
            this._config.maxWidth = T
        },
        setTitle: function(T) {
            this._config.title = T
        },
        getTitle: function() {
            return this._config.title
        },
        setContent: function(T) {
            this.content = T
        },
        getContent: function() {
            return this.content
        },
        setMaxContent: function(T) {
            this._config.maxContent = T + ""
        },
        redraw: function() {},
        enableAutoPan: function() {
            this._config.enableAutoPan = true
        },
        disableAutoPan: function() {
            this._config.enableAutoPan = false
        },
        enableCloseOnClick: function() {
            this._config.enableCloseOnClick = true
        },
        disableCloseOnClick: function() {
            this._config.enableCloseOnClick = false
        },
        enableMaximize: function() {
            this._config.enableMaximize = true
        },
        disableMaximize: function() {
            this._config.enableMaximize = false
        },
        show: function() {
            this._visible = true
        },
        hide: function() {
            this._visible = false
        },
        close: function() {
            this.hide()
        },
        maximize: function() {
            this.isWinMax = true
        },
        restore: function() {
            this.isWinMax = false
        },
        isVisible: function() {
            return this.isOpen()
        },
        isOpen: function() {
            return false
        },
        getPosition: function() {
            if (this.overlay && this.overlay.getPosition) {
                return this.overlay.getPosition()
            }
        },
        getOffset: function() {
            return this._config.offset
        }
    });
    bA.prototype.openInfoWindow = function(cO, T) {
        if (! (cO instanceof bQ) || !(T instanceof ce)) {
            return
        }
        var cM = this.temp;
        if (!cM.marker) {
            var cN = new M(cd.imgPath + "blank.gif", {
                width: 1,
                height: 1
            });
            cM.marker = new ae(T, {
                icon: cN,
                width: 1,
                height: 1,
                offset: new aI(0, 0),
                infoWindowOffset: new aI(0, 0),
                clickable: false
            });
            cM.marker._fromMap = 1
        } else {
            cM.marker.setPosition(T)
        }
        this.addOverlay(cM.marker);
        cM.marker.openInfoWindow(cO)
    };
    bA.prototype.closeInfoWindow = function() {
        var T = this.temp.infoWin || this.temp._infoWin;
        if (T && T.overlay) {
            T.overlay.closeInfoWindow()
        }
    };
    Z.prototype.openInfoWindow = function(T) {
        if (this.map) {
            this.map.closeInfoWindow();
            T._visible = true;
            this.map.temp._infoWin = T;
            T.overlay = this;
            a9.lang.Class.call(T, T.guid)
        }
    };
    Z.prototype.closeInfoWindow = function() {
        if (this.map && this.map.temp._infoWin) {
            this.map.temp._infoWin._visible = false;
            a9.lang.decontrol(this.map.temp._infoWin.guid);
            this.map.temp._infoWin = null
        }
    };
    function ah(cN, cM) {
        Z.call(this);
        this.content = cN;
        this.map = null;
        this.domElement = null;
        this._config = {
            width: 0,
            offset: new aI(0, 0),
            styles: {
                backgroundColor: "#fff",
                border: "1px solid #f00",
                padding: "1px",
                whiteSpace: "nowrap",
                font: "12px " + cd.fontFamily,
                zIndex: "80",
                MozUserSelect: "none"
            },
            position: null,
            enableMassClear: true,
            clickable: true
        };
        cM = cM || {};
        this.setConfig(cM);
        if (this._config.width < 0) {
            this._config.width = 0
        }
        if (ci(cM.enableClicking)) {
            this._config.clickable = cM.enableClicking
        }
        this.point = this._config.position;
        var T = this;
        cB.load("marker",
        function() {
            T._draw()
        })
    }
    a9.lang.inherits(ah, Z, "Label");
    a9.extend(ah.prototype, {
        getPosition: function() {
            if (this._marker) {
                return this._marker.getPosition()
            }
            return this.point
        },
        setPosition: function(T) {
            if (T instanceof ce && !this.getMarker()) {
                this.point = this._config.position = new ce(T.lng, T.lat)
            }
        },
        setContent: function(T) {
            this.content = T
        },
        setOpacity: function(T) {
            if (T >= 0 && T <= 1) {
                this._config.opacity = T
            }
        },
        setOffset: function(T) {
            if (! (T instanceof aI)) {
                return
            }
            this._config.offset = new aI(T.width, T.height)
        },
        getOffset: function() {
            return this._config.offset
        },
        setStyle: function(T) {
            T = T || {};
            this._config.styles = a9.extend(this._config.styles, T)
        },
        setStyles: function(T) {
            return this.setStyle(T)
        },
        setTitle: function(T) {
            this._config.title = T || ""
        },
        getTitle: function() {
            return this._config.title
        },
        setMarker: function(T) {
            this._marker = T;
            if (T) {
                this.point = this._config.position = T.getPosition()
            } else {
                this.point = this._config.position = null
            }
        },
        getMarker: function() {
            return this._marker || null
        }
    });
    window.BMAP_ANIMATION_DROP = 1;
    window.BMAP_ANIMATION_BOUNCE = 2;
    var av = new M(cd.imgPath + "marker_red_sprite.png", new aI(19, 25), {
        anchor: new aI(10, 25),
        infoWindowAnchor: new aI(10, 0)
    });
    var at = new M(cd.imgPath + "marker_red_sprite.png", new aI(20, 11), {
        anchor: new aI(6, 11),
        imageOffset: new aI( - 19, -13)
    });
    function ae(T, cN) {
        Z.call(this);
        cN = cN || {};
        this.point = T;
        this.map = null;
        this._animation = null;
        this._config = {
            offset: new aI(0, 0),
            icon: av,
            shadow: at,
            title: "",
            label: null,
            baseZIndex: 0,
            clickable: true,
            zIndexFixed: false,
            isTop: false,
            enableMassClear: true,
            enableDragging: false,
            raiseOnDrag: false,
            restrictDraggingArea: false,
            draggingCursor: cd.draggingCursor
        };
        this.setConfig(cN);
        if (cN.icon && !cN.shadow) {
            this._config.shadow = null
        }
        if (ci(cN.enableClicking)) {
            this._config.clickable = cN.enableClicking
        }
        var cM = this;
        cB.load("marker",
        function() {
            cM._draw()
        })
    }
    ae.TOP_ZINDEX = bH.getZIndex( - 90) + 1000000;
    ae.DRAG_ZINDEX = ae.TOP_ZINDEX + 1000000;
    a9.lang.inherits(ae, Z, "Marker");
    a9.extend(ae.prototype, {
        setIcon: function(T) {
            if (T instanceof M) {
                this._config.icon = T
            }
        },
        getIcon: function() {
            return this._config.icon
        },
        setShadow: function(T) {
            if (T instanceof M) {
                this._config.shadow = T
            }
        },
        getShadow: function() {
            return this._config.shadow
        },
        setLabel: function(T) {
            this._config.label = T || null
        },
        getLabel: function() {
            return this._config.label
        },
        enableDragging: function() {
            this._config.enableDragging = true
        },
        disableDragging: function() {
            this._config.enableDragging = false
        },
        getPosition: function() {
            return this.point
        },
        setPosition: function(T) {
            if (T instanceof ce) {
                this.point = new ce(T.lng, T.lat)
            }
        },
        setTop: function(cM, T) {
            this._config.isTop = !!cM;
            if (cM) {
                this._addi = T || 0
            }
        },
        setTitle: function(T) {
            this._config.title = T + ""
        },
        getTitle: function() {
            return this._config.title
        },
        setOffset: function(T) {
            if (T instanceof aI) {
                this._config.offset = T
            }
        },
        getOffset: function() {
            return this._config.offset
        },
        setAnimation: function(T) {
            this._animation = T
        }
    });
    function co(T, cN) {
        cG.call(this, cN);
        cN = cN || {};
        this._config.fillOpacity = cN.fillOpacity ? cN.fillOpacity: 0.65;
        if (cN.fillColor == "") {
            this._config.fillColor = ""
        } else {
            this._config.fillColor = cN.fillColor ? cN.fillColor: "#fff"
        }
        this.setPath(T);
        var cM = this;
        cB.load("poly",
        function() {
            cM._draw()
        })
    }
    a9.lang.inherits(co, cG, "Polygon");
    a9.extend(co.prototype, {
        setPath: function(cM, T) {
            this._userPoints = cG.getGraphPoints(cM).slice(0);
            var cN = cG.getGraphPoints(cM).slice(0);
            if (cN.length > 1 && !cN[0].equals(cN[cN.length - 1])) {
                cN.push(new ce(cN[0].lng, cN[0].lat))
            }
            cG.prototype.setPath.call(this, cN, T)
        },
        setPositionAt: function(cM, T) {
            if (!this._userPoints[cM]) {
                return
            }
            this._userPoints[cM] = new ce(T.lng, T.lat);
            this.points[cM] = new ce(T.lng, T.lat);
            if (cM == 0 && !this.points[0].equals(this.points[this.points.length - 1])) {
                this.points[this.points.length - 1] = new ce(T.lng, T.lat)
            }
            this._calcBounds()
        },
        getPath: function() {
            var T = this._userPoints;
            if (T.length == 0) {
                T = this.points
            }
            return T
        }
    });
    function f(T, cN) {
        cG.call(this, cN);
        this.setPath(T);
        var cM = this;
        cB.load("poly",
        function() {
            cM._draw()
        })
    }
    a9.lang.inherits(f, cG, "Polyline");
    function a(cM, T, cN) {
        this.point = cM;
        this.radius = Math.abs(T);
        co.call(this, [], cN)
    }
    a.parseTolerance = [0.01, 0.0001, 0.00001, 0.000004];
    a9.lang.inherits(a, co, "Circle");
    a9.extend(a.prototype, {
        initialize: function(T) {
            this.map = T;
            this.points = this._getPerimeterPoints(this.point, this.radius);
            this._calcBounds();
            return null
        },
        getCenter: function() {
            return this.point
        },
        setCenter: function(T, cM) {
            if (!T) {
                return
            }
            this.point = T
        },
        getRadius: function() {
            return this.radius
        },
        setRadius: function(T) {
            this.radius = Math.abs(T)
        },
        _getPerimeterPoints: function(T, cT) {
            if (!T || !cT || !this.map) {
                return []
            }
            var cM = this.map;
            var cQ = T.lng,
            cO = T.lat;
            var c0 = [];
            var cV = cT / 6378800,
            cS = (Math.PI / 180) * cO,
            cY = (Math.PI / 180) * cQ;
            for (var cR = 0; cR < 360; cR += 9) {
                var cP = (Math.PI / 180) * cR,
                cW = Math.asin(Math.sin(cS) * Math.cos(cV) + Math.cos(cS) * Math.sin(cV) * Math.cos(cP)),
                cU = Math.atan2(Math.sin(cP) * Math.sin(cV) * Math.cos(cS), Math.cos(cV) - Math.sin(cS) * Math.sin(cW)),
                cX = ((cY - cU + Math.PI) % (2 * Math.PI)) - Math.PI,
                cZ = new ce(cX * (180 / Math.PI), cW * (180 / Math.PI));
                c0.push(cZ)
            }
            var cN = c0[0];
            c0.push(new ce(cN.lng, cN.lat));
            return c0
        }
    });
    function bS(T) {
        this.map = T;
        this.mapTypeLayers = [];
        this.tileLayers = [];
        this.bufferNumber = 300;
        this.realBufferNumber = 0;
        this.mapTiles = {};
        this.bufferTiles = {};
        this.numLoading = 0;
        this._mapTypeLayerContainer = this._createDiv(1);
        this._normalLayerContainer = this._createDiv(2);
        T.platform.appendChild(this._mapTypeLayerContainer);
        T.platform.appendChild(this._normalLayerContainer)
    }
    BMap.register(function(cM) {
        var T = new bS(cM);
        T.initialize()
    });
    a9.extend(bS.prototype, {
        initialize: function() {
            var T = this,
            cM = T.map;
            cM.addEventListener("loadcode",
            function() {
                T.loadTiles()
            });
            cM.addEventListener("addtilelayer",
            function(cN) {
                T.addTileLayer(cN)
            });
            cM.addEventListener("removetilelayer",
            function(cN) {
                T.removeTileLayer(cN)
            });
            cM.addEventListener("setmaptype",
            function(cN) {
                T.setMapType(cN)
            });
            cM.addEventListener("zoomstartcode",
            function(cN) {
                T._zoom(cN)
            })
        },
        loadTiles: function() {
            var T = this;
            if (a9.browser.ie) {
                try {
                    document.execCommand("BackgroundImageCache", false, true)
                } catch(cM) {}
            }
            if (!this.loaded) {
                T.initMapTypeTiles()
            }
            T.moveGridTiles();
            if (!this.loaded) {
                this.loaded = true;
                cB.load("tile",
                function() {
                    T._asyncLoadTiles()
                })
            }
        },
        initMapTypeTiles: function() {
            var cM = this.map.getMapType();
            var cN = cM.getTileLayers();
            for (var T = 0; T < cN.length; T++) {
                var cO = new p();
                a9.extend(cO, cN[T]);
                this.mapTypeLayers.push(cO);
                cO.initialize(this.map, this._mapTypeLayerContainer)
            }
        },
        _createDiv: function(cM) {
            var T = ab("div");
            T.style.position = "absolute";
            T.style.left = T.style.top = "0";
            T.style.zIndex = cM;
            return T
        },
        showTile: function(cQ, cP, cT) {
            var cW = this;
            cW.centerPos = cP;
            var cS = this.map.getMapType();
            var cN = cW.getTileName(cQ, cT);
            var c0 = cS.getTileSize();
            var cO = (cQ[0] * c0) + cP[0];
            var cZ = 0;
            if (cS === BMAP_PERSPECTIVE_MAP && cW.map.getZoom() == 15) {
                cZ = 0.5
            }
            var cM = (cZ - 1 - cQ[1]) * c0 + cP[1];
            var cU = [cO, cM];
            var cV = this.mapTiles[cN];
            if (cV && cV.img) {
                bJ(cV.img, cU);
                if (cV.loaded) {
                    this._checkTilesLoaded()
                } else {
                    cV._addLoadCbk(function() {
                        cW._checkTilesLoaded()
                    })
                }
                return
            }
            cV = this.bufferTiles[cN];
            if (cV && cV.img) {
                cT.tilesDiv.insertBefore(cV.img, cT.tilesDiv.lastChild);
                this.mapTiles[cN] = cV;
                bJ(cV.img, cU);
                if (cV.loaded) {
                    this._checkTilesLoaded()
                } else {
                    cV._addLoadCbk(function() {
                        cW._checkTilesLoaded()
                    })
                }
                return
            }
            var cY = 256 * Math.pow(2, (cS.getMaxZoom() - cQ[2]));
            var cX = new ce(cQ[0] * cY, cQ[1] * cY);
            var cR = new bv(cQ[0], cQ[1]);
            var T = cT.getTilesUrl(cR, cQ[2]);
            cV = new bV(this, T, cU, cQ, cT);
            cV._addLoadCbk(function() {
                cW._checkTilesLoaded()
            });
            cV._load();
            this.mapTiles[cN] = cV
        },
        _checkTilesLoaded: function() {
            this.numLoading--;
            var T = this;
            if (this.numLoading == 0) {
                if (this._checkLoadedTimer) {
                    clearTimeout(this._checkLoadedTimer);
                    this._checkLoadedTimer = null
                }
                this._checkLoadedTimer = setTimeout(function() {
                    if (T.numLoading == 0) {
                        T.map.dispatchEvent(new bh("ontilesloaded"))
                    }
                    T._checkLoadedTimer = null
                },
                80)
            }
        },
        getTileName: function(T, cM) {
            if (this.map.getMapType() === BMAP_PERSPECTIVE_MAP) {
                return "TILE-" + cM.guid + "-" + this.map.cityCode + "-" + T[0] + "-" + T[1] + "-" + T[2]
            } else {
                return "TILE-" + cM.guid + "-" + T[0] + "-" + T[1] + "-" + T[2]
            }
        },
        hideTile: function(cM) {
            var T = cM.img;
            if (T) {
                J(T);
                if (y(T)) {
                    T.parentNode.removeChild(T)
                }
            }
            delete this.mapTiles[cM.name];
            if (!cM.loaded) {
                J(T);
                T = null;
                cM._callCbks();
                cM.img = null;
                cM.mgr = null
            }
        },
        moveGridTiles: function() {
            var db = this.mapTypeLayers;
            var cX = db.concat(this.tileLayers);
            var c3 = cX.length;
            for (var c5 = 0; c5 < c3; c5++) {
                var cQ = cX[c5];
                if (cQ.baseLayer) {
                    this.tilesDiv = cQ.tilesDiv
                }
                var dh = this.map;
                var dd = dh.getMapType();
                var di = dd.getProjection();
                var c4 = dh.zoomLevel;
                var c7 = dh.mercatorCenter;
                this.mapCenterPoint = c7;
                var cV = dd.getZoomUnits(c4);
                var cY = dd.getZoomFactor(c4);
                var cW = Math.ceil(c7.lng / cY);
                var cR = Math.ceil(c7.lat / cY);
                var c2 = dd.getTileSize();
                var cP = [cW, cR, (c7.lng - cW * cY) / cY * c2, (c7.lat - cR * cY) / cY * c2];
                var dc = cP[0] - Math.ceil((dh.width / 2 - cP[2]) / c2);
                var cO = cP[1] - Math.ceil((dh.height / 2 - cP[3]) / c2);
                var c8 = cP[0] + Math.ceil((dh.width / 2 + cP[2]) / c2);
                var c0 = 0;
                if (dd === BMAP_PERSPECTIVE_MAP && dh.getZoom() == 15) {
                    c0 = 1
                }
                var cZ = cP[1] + Math.ceil((dh.height / 2 + cP[3]) / c2) + c0;
                this.areaCenter = new ce(c7.lng, c7.lat);
                var cN = this.mapTiles;
                var cU = -this.areaCenter.lng / cV;
                var cT = this.areaCenter.lat / cV;
                var df = [Math.round(cU), Math.round(cT)];
                var cM = dh.getZoom();
                for (var dg in cN) {
                    var dj = cN[dg];
                    var de = dj.info;
                    if (de[2] != cM || (de[2] == cM && (dc > de[0] || c8 <= de[0] || cO > de[1] || cZ <= de[1]))) {
                        this.hideTile(dj)
                    }
                }
                var cS = -dh.offsetX + dh.width / 2;
                var c1 = -dh.offsetY + dh.height / 2;
                cQ.tilesDiv.style.left = Math.round(cU + cS) - df[0] + "px";
                cQ.tilesDiv.style.top = Math.round(cT + c1) - df[1] + "px";
                var T = [];
                for (var da = dc; da < c8; da++) {
                    for (var c9 = cO; c9 < cZ; c9++) {
                        T.push([da, c9])
                    }
                }
                T.sort((function(dk) {
                    return function(dl, dm) {
                        return ((0.4 * Math.abs(dl[0] - dk[0]) + 0.6 * Math.abs(dl[1] - dk[1])) - (0.4 * Math.abs(dm[0] - dk[0]) + 0.6 * Math.abs(dm[1] - dk[1])))
                    }
                })([cP[0] - 1, cP[1] - 1]));
                this.numLoading += T.length;
                for (var da = 0,
                c6 = T.length; da < c6; da++) {
                    this.showTile([T[da][0], T[da][1], cM], df, cQ)
                }
            }
            return
        },
        addTileLayer: function(cO) {
            var cN = this;
            var T = cO.target;
            for (var cM = 0; cM < cN.tileLayers.length; cM++) {
                if (cN.tileLayers[cM] == T) {
                    return
                }
            }
            T.initialize(this.map, this._normalLayerContainer);
            cN.tileLayers.push(T)
        },
        removeTileLayer: function(cP) {
            var cO = this;
            var cM = cP.target;
            for (var cN = 0,
            T = cO.tileLayers.length; cN < T; cN++) {
                if (cM == cO.tileLayers[cN]) {
                    cO.tileLayers.splice(cN, 1)
                }
            }
            cM.remove()
        },
        setMapType: function() {
            var cN = this;
            var cO = this.mapTypeLayers;
            for (var cM = 0,
            T = cO.length; cM < T; cM++) {
                cO[cM].remove()
            }
            delete this.tilesDiv;
            this.mapTypeLayers = [];
            this.bufferTiles = this.mapTiles = {};
            this.initMapTypeTiles();
            this.moveGridTiles()
        },
        _zoom: function() {
            var T = this;
            if (T.zoomsDiv) {
                a9.dom.hide(T.zoomsDiv)
            }
            setTimeout(function() {
                T.moveGridTiles();
                T.map.dispatchEvent(new bh("onzoomend"))
            },
            10)
        }
    });
    function bV(cS, T, cP, cM, cO) {
        this.mgr = cS;
        this.position = cP;
        this._cbks = [];
        this.name = cS.getTileName(cM, cO);
        this.info = cM;
        this._transparentPng = cO.isTransparentPng();
        var cT = ab("img");
        cx(cT);
        cT.galleryImg = false;
        var cR = cT.style;
        var cN = cS.map.getMapType();
        cR.position = "absolute";
        cR.border = "none";
        cR.width = cN.getTileSize() + "px";
        cR.height = cN.getTileSize() + "px";
        cR.left = cP[0] + "px";
        cR.top = cP[1] + "px";
        this.img = cT;
        this.src = T;
        if (E) {
            this.img.style.opacity = 0
        }
        var cQ = this;
        this.img.onload = function(cZ) {
            cQ.loaded = true;
            if (!cQ.mgr) {
                return
            }
            var cV = cQ.mgr;
            var cU = cV.bufferTiles;
            if (!cU[cQ.name]) {
                cV.realBufferNumber++;
                cU[cQ.name] = cQ
            }
            if (cQ.img && !y(cQ.img)) {
                if (cO.tilesDiv) {
                    cO.tilesDiv.appendChild(cQ.img);
                    if (a9.browser.ie <= 6 && a9.browser.ie > 0 && cQ._transparentPng) {
                        cQ.img.style.cssText += ';filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + cQ.src + '",sizingMethod=scale);'
                    }
                }
            }
            var cX = cV.realBufferNumber - cV.bufferNumber;
            for (var cY in cU) {
                if (cX <= 0) {
                    break
                }
                if (!cV.mapTiles[cY]) {
                    cU[cY].mgr = null;
                    var cW = cU[cY].img;
                    if (cW && cW.parentNode) {
                        cW.parentNode.removeChild(cW);
                        J(cW)
                    }
                    cW = null;
                    cU[cY].img = null;
                    delete cU[cY];
                    cV.realBufferNumber--;
                    cX--
                }
            }
            if (E) {
                new g({
                    fps: 20,
                    duration: 200,
                    render: function(c0) {
                        if (cQ.img && cQ.img.style) {
                            cQ.img.style.opacity = c0 * 1
                        }
                    },
                    finish: function() {
                        if (cQ.img && cQ.img.style) {
                            delete cQ.img.style.opacity
                        }
                    }
                })
            }
            cQ._callCbks()
        };
        this.img.onerror = function() {
            var cV = cQ.img,
            cW = cQ.img.getAttribute("isError") || 0;
            if (m && cW < 5) {
                cW++;
                cV.setAttribute("isError", cW);
                cV.src = T + "&t=" + new Date().getTime()
            } else {
                cQ._callCbks();
                if (!cQ.mgr) {
                    return
                }
                var cU = cQ.mgr;
                var cX = cU.map.getMapType();
                if (cX.getErrorImageUrl()) {
                    cQ.error = true;
                    cQ.img.src = cX.getErrorImageUrl();
                    if (cQ.img && !y(cQ.img)) {
                        cO.tilesDiv.appendChild(cQ.img)
                    }
                }
            }
        };
        cT = null
    }
    bV.prototype._addLoadCbk = function(T) {
        this._cbks.push(T)
    };
    bV.prototype._load = function() {
        if (a9.browser.ie > 0 && a9.browser.ie <= 6 && this._transparentPng) {
            this.img.src = cd.imgPath + "blank.gif"
        } else {
            this.img.src = this.src
        }
    };
    bV.prototype._callCbks = function() {
        var cM = this;
        for (var T = 0; T < cM._cbks.length; T++) {
            cM._cbks[T]()
        }
        cM._cbks.length = 0
    };
    function J(cO) {
        if (!cO) {
            return
        }
        cO.onload = cO.onerror = null;
        var cM = cO.attributes,
        cN, T, cP;
        if (cM) {
            T = cM.length;
            for (cN = 0; cN < T; cN += 1) {
                cP = cM[cN].name;
                if (I(cO[cP])) {
                    cO[cP] = null
                }
            }
        }
        cM = cO.children;
        if (cM) {
            T = cM.length;
            for (cN = 0; cN < T; cN += 1) {
                J(cO.children[cN])
            }
        }
    }
    var E = (!a9.browser.ie || a9.browser.ie > 8);
    function p(T) {
        this.opts = T || {};
        this.copyright = this.opts.copyright || null;
        this.transparentPng = this.opts.transparentPng || false;
        this.baseLayer = this.opts.baseLayer || false;
        this.zIndex = this.opts.zIndex || 0;
        this.guid = p._guid++
    }
    p._guid = 0;
    a9.lang.inherits(p, a9.lang.Class, "TileLayer");
    a9.extend(p.prototype, {
        initialize: function(cN, T) {
            if (this.baseLayer) {
                this.zIndex = -100
            }
            this.map = cN;
            if (!this.tilesDiv) {
                var cO = ab("div");
                var cM = cO.style;
                if (!a9.platform.isAndroid) {
                    T.style.WebkitBackfaceVisibility = "hidden"
                }
                cM.position = "absolute";
                cM.zIndex = this.zIndex;
                cM.left = Math.ceil( - cN.offsetX + cN.width / 2) + "px";
                cM.top = Math.ceil( - cN.offsetY + cN.height / 2) + "px";
                T.appendChild(cO);
                this.tilesDiv = cO
            }
        },
        remove: function() {
            if (this.tilesDiv && this.tilesDiv.parentNode) {
                this.tilesDiv.innerHTML = "";
                this.tilesDiv.parentNode.removeChild(this.tilesDiv)
            }
            delete this.tilesDiv
        },
        isTransparentPng: function() {
            return this.transparentPng
        },
        getTilesUrl: function(cM, cN) {
            var T = "";
            if (this.opts.tileUrlTemplate) {
                T = this.opts.tileUrlTemplate.replace(/\{X\}/, cM.x);
                T = T.replace(/\{Y\}/, cM.y);
                T = T.replace(/\{Z\}/, cN)
            }
            return T
        },
        getCopyright: function() {
            return this.copyright
        },
        getMapType: function() {
            return this.mapType || BMAP_NORMAL_MAP
        }
    });
    function aD(T) {
        p.call(this, T);
        this._opts = {};
        T = T || {};
        this._opts = a9.object.extend(this._opts, T);
        if (this._opts.predictDate) {
            if (this._opts.predictDate.weekday < 1 || this._opts.predictDate.weekday > 7) {
                this._opts.predictDate = 1
            }
            if (this._opts.predictDate.hour < 0 || this._opts.predictDate.hour > 23) {
                this._opts.predictDate.hour = 0
            }
        }
        this._tileUrl = "http://its.map.baidu.com:8002/traffic/"
    }
    aD.prototype = new p();
    aD.prototype.initialize = function(cM, T) {
        p.prototype.initialize.call(this, cM, T);
        this._map = cM
    };
    aD.prototype.isTransparentPng = function() {
        return true
    };
    aD.prototype.getTilesUrl = function(cR, cM) {
        var cS = "";
        if (this._opts.predictDate) {
            cS = "HistoryService?day=" + (this._opts.predictDate.weekday - 1) + "&hour=" + this._opts.predictDate.hour + "&t=" + new Date().getTime() + "&"
        } else {
            cS = "TrafficTileService?time=" + new Date().getTime() + "&"
        }
        var cN = this._map,
        cT = cR.x,
        cO = cR.y,
        cQ = Math.floor(cT / 200),
        cP = Math.floor(cO / 200),
        T = this._tileUrl + cS + "level=" + cM + "&x=" + cT + "&y=" + cO;
        return T.replace(/-(\d+)/gi, "M$1")
    };
    function cv(T, cM, cN) {
        this._name = T;
        this._layers = cM instanceof p ? [cM] : cM.slice(0);
        this._opts = {
            tips: "",
            labelText: "",
            minZoom: 1,
            maxZoom: 19,
            tileSize: 256,
            textColor: "black",
            errorImageUrl: "",
            projection: new bb()
        };
        if (this._layers.length == 1) {
            this._layers[0].baseLayer = true
        }
        a9.extend(this._opts, cN || {})
    }
    a9.extend(cv.prototype, {
        getName: function() {
            return this._name
        },
        getTips: function() {
            return this._opts.tips
        },
        getLabelText: function() {
            return this._opts.labelText
        },
        getTileLayer: function() {
            return this._layers[0]
        },
        getTileLayers: function() {
            return this._layers
        },
        getTileSize: function() {
            return this._opts.tileSize
        },
        getMinZoom: function() {
            return this._opts.minZoom
        },
        getMaxZoom: function() {
            return this._opts.maxZoom
        },
        getTextColor: function() {
            return this._opts.textColor
        },
        getProjection: function() {
            return this._opts.projection
        },
        getErrorImageUrl: function() {
            return this._opts.errorImageUrl
        },
        getZoomUnits: function(T) {
            return Math.pow(2, (18 - T))
        },
        getZoomFactor: function(T) {
            return this.getZoomUnits(T) * 256
        }
    });
    var b8 = ["http://shangetu0.map.bdimg.com/it/", "http://shangetu1.map.bdimg.com/it/", "http://shangetu2.map.bdimg.com/it/", "http://shangetu3.map.bdimg.com/it/", "http://shangetu4.map.bdimg.com/it/"];
    var j = ["http://online0.map.bdimg.com/tile/", "http://online1.map.bdimg.com/tile/", "http://online2.map.bdimg.com/tile/", "http://online3.map.bdimg.com/tile/", "http://online4.map.bdimg.com/tile/"];
    var O = {
        TILE_BASE_URLS: ["ss0.baidu.com/5bwHcj7lABFU8t_jkk_Z1zRvfdw6buu", "ss0.baidu.com/5bwHcj7lABFV8t_jkk_Z1zRvfdw6buu", "ss0.baidu.com/5bwHcj7lABFS8t_jkk_Z1zRvfdw6buu", "ss0.bdstatic.com/5bwHcj7lABFT8t_jkk_Z1zRvfdw6buu", "ss0.bdstatic.com/5bwHcj7lABFY8t_jkk_Z1zRvfdw6buu"],
        TILE_ONLINE_URLS: ["ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlRMgBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlRcgBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv", "ss0.bdstatic.com/8bo_dTSlQ1gBo1vgoIiO_jowehsv"],
        TIlE_PERSPECT_URLS: ["ss0.bdstatic.com/-OR1cTe9KgQFm2e88IuM_a", "ss0.bdstatic.com/-ON1cTe9KgQFm2e88IuM_a", "ss0.bdstatic.com/-OZ1cTe9KgQFm2e88IuM_a", "ss0.bdstatic.com/-OV1cTe9KgQFm2e88IuM_a"]
    };
    if (m) {
        b8 = [x + "it/"];
        j = ["https://" + O.TILE_ONLINE_URLS[0] + "/tile/", "https://" + O.TILE_ONLINE_URLS[1] + "/tile/", "https://" + O.TILE_ONLINE_URLS[2] + "/tile/", "https://" + O.TILE_ONLINE_URLS[3] + "/tile/", "https://" + O.TILE_ONLINE_URLS[4] + "/tile/", ]
    }
    var aU = new p();
    aU.getTilesUrl = function(cN, cQ) {
        var cR = cN.x;
        var cO = cN.y;
        var T = "20150518";
        var cP = "pl";
        if (this.map.highResolutionEnabled()) {
            cP = "ph"
        }
        var cM = j[Math.abs(cR + cO) % j.length] + "?qt=tile&x=" + (cR + "").replace(/-/gi, "M") + "&y=" + (cO + "").replace(/-/gi, "M") + "&z=" + cQ + "&styles=" + cP + (a9.browser.ie == 6 ? "&color_dep=32&colors=50": "") + "&udt=" + T;
        return cM.replace(/-(\d+)/gi, "M$1")
    };
    window.BMAP_NORMAL_MAP = new cv("\u5730\u56fe", aU, {
        tips: "\u663e\u793a\u666e\u901a\u5730\u56fe"
    });
    var bt = new p();
    bt.tileUrls = ["http://d0.map.baidu.com/resource/mappic/", "http://d1.map.baidu.com/resource/mappic/", "http://d2.map.baidu.com/resource/mappic/", "http://d3.map.baidu.com/resource/mappic/"];
    bt.getTilesUrl = function(T, cN) {
        var cP = T.x;
        var cM = T.y;
        var cO = Math.pow(2, (20 - cN)) * 256;
        cM = Math.round((9998336 - cO * (cM)) / cO) - 1;
        url = this.tileUrls[Math.abs(cP + cM) % this.tileUrls.length] + this.map.currentCity + "/" + this.map.cityCode + "/3/lv" + (21 - cN) + "/" + cP + "," + cM + ".jpg";
        return url
    };
    window.BMAP_PERSPECTIVE_MAP = new cv("\u4e09\u7ef4", bt, {
        tips: "\u663e\u793a\u4e09\u7ef4\u5730\u56fe",
        minZoom: 15,
        maxZoom: 20,
        textColor: "white",
        projection: new cF()
    });
    BMAP_PERSPECTIVE_MAP.getZoomUnits = function(T) {
        return Math.pow(2, (20 - T))
    };
    BMAP_PERSPECTIVE_MAP.getCityName = function(T) {
        if (!T) {
            return ""
        }
        var cM = cd.cityNames;
        for (var cN in cM) {
            if (T.search(cN) > -1) {
                return cM[cN]
            }
        }
        return ""
    };
    BMAP_PERSPECTIVE_MAP.getCityCode = function(T) {
        return ({
            bj: 2,
            gz: 1,
            sz: 14,
            sh: 4
        })[T]
    };
    var bR = new p({
        baseLayer: true
    });
    bR.getTilesUrl = function(cM, cO) {
        var cP = cM.x;
        var cN = cM.y;
        var T = b8[Math.abs(cP + cN) % b8.length] + "u=x=" + cP + ";y=" + cN + ";z=" + cO + ";v=009;type=sate&fm=46&udt=20141015";
        return T.replace(/-(\d+)/gi, "M$1")
    };
    window.BMAP_SATELLITE_MAP = new cv("\u536b\u661f", bR, {
        tips: "\u663e\u793a\u536b\u661f\u5f71\u50cf",
        minZoom: 1,
        maxZoom: 19,
        textColor: "white"
    });
    var o = new p({
        transparentPng: true
    });
    o.getTilesUrl = function(cN, cP) {
        var cQ = cN.x;
        var cO = cN.y;
        var T = "20141015";
        var cM = j[Math.abs(cQ + cO) % j.length] + "?qt=tile&x=" + (cQ + "").replace(/-/gi, "M") + "&y=" + (cO + "").replace(/-/gi, "M") + "&z=" + cP + "&styles=sl" + (a9.browser.ie == 6 ? "&color_dep=32&colors=50": "") + "&udt=" + T;
        return cM.replace(/-(\d+)/gi, "M$1")
    };
    window.BMAP_HYBRID_MAP = new cv("\u6df7\u5408", [bR, o], {
        tips: "\u663e\u793a\u5e26\u6709\u8857\u9053\u7684\u536b\u661f\u5f71\u50cf",
        labelText: "\u8def\u7f51",
        minZoom: 1,
        maxZoom: 19,
        textColor: "white"
    });
    window.BMAP_POI_TYPE_NORMAL = 0;
    window.BMAP_POI_TYPE_BUSSTOP = 1;
    window.BMAP_POI_TYPE_BUSLINE = 2;
    window.BMAP_POI_TYPE_SUBSTOP = 3;
    window.BMAP_POI_TYPE_SUBLINE = 4;
    var H = 0;
    var bi = 1;
    var ao = {};
    function w(cM, T) {
        a9.lang.Class.call(this);
        this._loc = {};
        this.setLocation(cM);
        this._opts = {
            renderOptions: {
                panel: null,
                map: null,
                autoViewport: true
            },
            onSearchComplete: function() {},
            onMarkersSet: function() {},
            onInfoHtmlSet: function() {},
            onResultsHtmlSet: function() {},
            onGetBusListComplete: function() {},
            onGetBusLineComplete: function() {},
            onBusListHtmlSet: function() {},
            onBusLineHtmlSet: function() {},
            onPolylinesSet: function() {},
            reqFrom: ""
        };
        a9.extend(this._opts, T);
        if (typeof T != "undefined" && typeof T.renderOptions != "undefined" && typeof T.renderOptions.autoViewport != "undefined") {
            this._opts.renderOptions.autoViewport = T.renderOptions.autoViewport
        } else {
            this._opts.renderOptions.autoViewport = true
        }
        this._opts.renderOptions.panel = a9.G(this._opts.renderOptions.panel)
    }
    a9.inherits(w, a9.lang.Class);
    a9.extend(w.prototype, {
        getResults: function() {
            if (!this._isMultiKey) {
                return this._results
            } else {
                return this._arrResults
            }
        },
        enableAutoViewport: function() {
            this._opts.renderOptions.autoViewport = true
        },
        disableAutoViewport: function() {
            this._opts.renderOptions.autoViewport = false
        },
        setLocation: function(T) {
            if (!T) {
                return
            }
            this._loc.src = T
        },
        setSearchCompleteCallback: function(T) {
            this._opts.onSearchComplete = T ||
            function() {}
        },
        setMarkersSetCallback: function(T) {
            this._opts.onMarkersSet = T ||
            function() {}
        },
        setPolylinesSetCallback: function(T) {
            this._opts.onPolylinesSet = T ||
            function() {}
        },
        setInfoHtmlSetCallback: function(T) {
            this._opts.onInfoHtmlSet = T ||
            function() {}
        },
        setResultsHtmlSetCallback: function(T) {
            this._opts.onResultsHtmlSet = T ||
            function() {}
        },
        getStatus: function() {
            return this._status
        }
    });
    var bc = {
        REQ_BASE_URL: x,
        request: function(cR, cO, cM, cT, cN) {
            var cP = (Math.random() * 100000).toFixed(0);
            BMap._rd["_cbk" + cP] = function(cU) {
                cM = cM || {};
                cR && cR(cU, cM);
                delete BMap._rd["_cbk" + cP]
            };
            cT = cT || "";
            var cS;
            if (cM && cM.useEncodeURI) {
                cS = P(cO, encodeURI)
            } else {
                cS = P(cO, encodeURIComponent)
            }
            var cQ = this,
            T = cQ.REQ_BASE_URL + cT + "?" + cS + "&ie=utf-8&oue=1&fromproduct=jsapi";
            if (!cN) {
                T += "&res=api"
            }
            T += "&callback=BMap._rd._cbk" + cP;
            cy.request(T)
        }
    };
    BMap._rd = {};
    var U = {};
    U.removeHtml = function(T) {
        return T.replace(/<\/?b>/g, "")
    };
    U.parseGeoExtReg1 = function(T) {
        return T.replace(/([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g, "$1,$2;")
    };
    U.parseGeoExtReg2 = function(cM, T) {
        var cN = new RegExp("(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + T + "}", "ig");
        return cM.replace(cN, "$1")
    };
    window.BMAP_STATUS_SUCCESS = 0;
    window.BMAP_STATUS_CITY_LIST = 1;
    window.BMAP_STATUS_UNKNOWN_LOCATION = 2;
    window.BMAP_STATUS_UNKNOWN_ROUTE = 3;
    window.BMAP_STATUS_INVALID_KEY = 4;
    window.BMAP_STATUS_INVALID_REQUEST = 5;
    window.BMAP_STATUS_PERMISSION_DENIED = 6;
    window.BMAP_STATUS_SERVICE_UNAVAILABLE = 7;
    window.BMAP_STATUS_TIMEOUT = 8;
    window.BMAP_ROUTE_TYPE_WALKING = 2;
    window.BMAP_ROUTE_TYPE_DRIVING = 3;
    var cw = "cur";
    var c = "cen";
    var ck = "s";
    var R = "con";
    var am = "bd";
    var cc = "nb";
    var F = "bt";
    var bN = "nav";
    var bw = "walk";
    var bB = "gc";
    var d = "rgc";
    var V = "dec";
    var aR = "bse";
    var e = "nse";
    var G = "bl";
    var bg = "bsl";
    var aH = "bda";
    var aj = "sa";
    var a2 = "nba";
    var cj = "drag";
    var b5 = "ext";
    var s = 2;
    var a6 = 4;
    var bu = 7;
    var Y = 11;
    var aO = 12;
    var bj = 14;
    var a3 = 15;
    var cz = 18;
    var u = 20;
    var S = 21;
    var aq = 26;
    var bF = 28;
    var z = 31;
    var br = 35;
    var bD = 44;
    var ay = 45;
    var af = 46;
    var bT = 47;
    var a1 = -1;
    var ac = 0;
    var cr = 1;
    var a7 = 2;
    var B = 3;
    var cJ = "http://map.baidu.com/";
    BMap.I = window.Instance = a9.lang.instance;
    var a5 = function(cN, cM) {
        w.call(this, cN, cM);
        cM = cM || {};
        cM.renderOptions = cM.renderOptions || {};
        this.setPageCapacity(cM.pageCapacity);
        if (typeof cM.renderOptions.selectFirstResult != "undefined" && !cM.renderOptions.selectFirstResult) {
            this.disableFirstResultSelection()
        } else {
            this.enableFirstResultSelection()
        }
        this._overlays = [];
        this._arrPois = [];
        this._curIndex = -1;
        this._queryList = [];
        var T = this;
        cB.load("local",
        function() {
            T._check()
        })
    };
    a9.inherits(a5, w, "LocalSearch");
    a5.DEFAULT_PAGE_CAPACITY = 10;
    a5.MIN_PAGE_CAPACITY = 1;
    a5.MAX_PAGE_CAPACITY = 100;
    a5.DEFAULT_RADIUS = 2000;
    a5.MAX_RADIUS = 100000;
    a9.extend(a5.prototype, {
        search: function(T) {
            this._queryList.push({
                method: "search",
                arguments: [T]
            })
        },
        searchInBounds: function(T, cM) {
            this._queryList.push({
                method: "searchInBounds",
                arguments: [T, cM]
            })
        },
        searchNearby: function(cN, cM, T) {
            this._queryList.push({
                method: "searchNearby",
                arguments: [cN, cM, T]
            })
        },
        clearResults: function() {
            delete this._json;
            delete this._status;
            delete this._results;
            delete this._ud;
            this._curIndex = -1;
            this._setStatus();
            if (this._opts.renderOptions.panel) {
                this._opts.renderOptions.panel.innerHTML = ""
            }
        },
        gotoPage: function() {},
        enableFirstResultSelection: function() {
            this._opts.renderOptions.selectFirstResult = true
        },
        disableFirstResultSelection: function() {
            this._opts.renderOptions.selectFirstResult = false
        },
        setPageCapacity: function(T) {
            if (typeof T == "number" && !isNaN(T)) {
                this._opts.pageCapacity = T < 1 ? a5.DEFAULT_PAGE_CAPACITY: (T > a5.MAX_PAGE_CAPACITY ? a5.DEFAULT_PAGE_CAPACITY: T)
            } else {
                this._opts.pageCapacity = a5.DEFAULT_PAGE_CAPACITY
            }
        },
        getPageCapacity: function() {
            return this._opts.pageCapacity
        },
        toString: function() {
            return "LocalSearch"
        }
    });
    var b6 = function(cM, T) {
        w.call(this, cM, T)
    };
    a9.inherits(b6, w, "BaseRoute");
    a9.extend(b6.prototype, {
        clearResults: function() {}
    });
    window.BMAP_TRANSIT_POLICY_LEAST_TIME = 0;
    window.BMAP_TRANSIT_POLICY_LEAST_TRANSFER = 2;
    window.BMAP_TRANSIT_POLICY_LEAST_WALKING = 3;
    window.BMAP_TRANSIT_POLICY_AVOID_SUBWAYS = 4;
    window.BMAP_LINE_TYPE_BUS = 0;
    window.BMAP_LINE_TYPE_SUBWAY = 1;
    window.BMAP_LINE_TYPE_FERRY = 2;
    function aV(cN, cM) {
        b6.call(this, cN, cM);
        cM = cM || {};
        this.setPolicy(cM.policy);
        this.setPageCapacity(cM.pageCapacity);
        this.QUERY_TYPE = F;
        this.RETURN_TYPE = bj;
        this.ROUTE_TYPE = bi;
        this._overlays = [];
        this._curIndex = -1;
        this._queryList = [];
        var T = this;
        cB.load("route",
        function() {
            T._asyncSearch()
        })
    }
    aV.MAX_PAGE_CAPACITY = 100;
    aV.LINE_TYPE_MAPPING = [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1];
    a9.inherits(aV, b6, "TransitRoute");
    a9.extend(aV.prototype, {
        setPolicy: function(T) {
            if (T >= BMAP_TRANSIT_POLICY_LEAST_TIME && T <= BMAP_TRANSIT_POLICY_AVOID_SUBWAYS) {
                this._opts.policy = T
            } else {
                this._opts.policy = BMAP_TRANSIT_POLICY_LEAST_TIME
            }
        },
        _internalSearch: function(cM, T) {
            this._queryList.push({
                method: "_internalSearch",
                arguments: [cM, T]
            })
        },
        search: function(cM, T) {
            this._queryList.push({
                method: "search",
                arguments: [cM, T]
            })
        },
        setPageCapacity: function(T) {
            if (typeof T == "string") {
                T = parseInt(T);
                if (isNaN(T)) {
                    this._opts.pageCapacity = aV.MAX_PAGE_CAPACITY;
                    return
                }
            }
            if (typeof T != "number") {
                this._opts.pageCapacity = aV.MAX_PAGE_CAPACITY;
                return
            }
            if (T >= 1 && T <= aV.MAX_PAGE_CAPACITY) {
                this._opts.pageCapacity = Math.round(T)
            } else {
                this._opts.pageCapacity = aV.MAX_PAGE_CAPACITY
            }
        },
        toString: function() {
            return "TransitRoute"
        },
        _shortTitle: function(T) {
            return T.replace(/\(.*\)/, "")
        }
    });
    window.BMAP_HIGHLIGHT_STEP = 1;
    window.BMAP_HIGHLIGHT_ROUTE = 2;
    var bm = function(T, cO) {
        b6.call(this, T, cO);
        this._overlays = [];
        this._curIndex = -1;
        this._queryList = [];
        var cN = this;
        var cM = this._opts.renderOptions;
        if (cM.highlightMode != BMAP_HIGHLIGHT_STEP && cM.highlightMode != BMAP_HIGHLIGHT_ROUTE) {
            cM.highlightMode = BMAP_HIGHLIGHT_STEP
        }
        this._enableDragging = this._opts.renderOptions.enableDragging ? true: false;
        cB.load("route",
        function() {
            cN._asyncSearch()
        })
    };
    bm.ROAD_TYPE = ["", "\u73af\u5c9b", "\u65e0\u5c5e\u6027\u9053\u8def", "\u4e3b\u8def", "\u9ad8\u901f\u8fde\u63a5\u8def", "\u4ea4\u53c9\u70b9\u5185\u8def\u6bb5", "\u8fde\u63a5\u9053\u8def", "\u505c\u8f66\u573a\u5185\u90e8\u9053\u8def", "\u670d\u52a1\u533a\u5185\u90e8\u9053\u8def", "\u6865", "\u6b65\u884c\u8857", "\u8f85\u8def", "\u531d\u9053", "\u5168\u5c01\u95ed\u9053\u8def", "\u672a\u5b9a\u4e49\u4ea4\u901a\u533a\u57df", "POI\u8fde\u63a5\u8def", "\u96a7\u9053", "\u6b65\u884c\u9053", "\u516c\u4ea4\u4e13\u7528\u9053", "\u63d0\u524d\u53f3\u8f6c\u9053"];
    a9.inherits(bm, b6, "DWRoute");
    a9.extend(bm.prototype, {
        search: function(cM, T) {
            this._queryList.push({
                method: "search",
                arguments: [cM, T]
            })
        }
    });
    window.BMAP_DRIVING_POLICY_LEAST_TIME = 0;
    window.BMAP_DRIVING_POLICY_LEAST_DISTANCE = 1;
    window.BMAP_DRIVING_POLICY_AVOID_HIGHWAYS = 2;
    function q(T, cM) {
        bm.call(this, T, cM);
        cM = cM || {};
        this.setPolicy(cM.policy);
        this.QUERY_TYPE = bN;
        this.RETURN_TYPE = u;
        this.ROUTE_TYPE = BMAP_ROUTE_TYPE_DRIVING
    }
    a9.inherits(q, bm, "DrivingRoute");
    a9.extend(q.prototype, {
        setPolicy: function(T) {
            if (T >= BMAP_DRIVING_POLICY_LEAST_TIME && T <= BMAP_DRIVING_POLICY_AVOID_HIGHWAYS) {
                this._opts.policy = T
            } else {
                this._opts.policy = BMAP_DRIVING_POLICY_LEAST_TIME
            }
        }
    });
    function cE(T, cM) {
        bm.call(this, T, cM);
        this.QUERY_TYPE = bw;
        this.RETURN_TYPE = z;
        this.ROUTE_TYPE = BMAP_ROUTE_TYPE_WALKING;
        this._enableDragging = false
    }
    a9.inherits(cE, bm, "WalkingRoute");
    function aY(cM) {
        this._opts = {};
        a9.extend(this._opts, cM);
        this._queryList = [];
        var T = this;
        cB.load("othersearch",
        function() {
            T._asyncSearch()
        })
    }
    a9.inherits(aY, a9.lang.Class, "Geocoder");
    a9.extend(aY.prototype, {
        getPoint: function(T, cN, cM) {
            this._queryList.push({
                method: "getPoint",
                arguments: [T, cN, cM]
            })
        },
        getLocation: function(T, cN, cM) {
            this._queryList.push({
                method: "getLocation",
                arguments: [T, cN, cM]
            })
        },
        toString: function() {
            return "Geocoder"
        }
    });
    function al(cM) {
        this._opts = {};
        a9.extend(this._opts, cM);
        this._queryList = [];
        var T = this;
        cB.load("othersearch",
        function() {
            T._asyncSearch()
        })
    }
    a9.extend(al.prototype, {
        getCurrentPosition: function(cM, T) {
            this._queryList.push({
                method: "getCurrentPosition",
                arguments: [cM, T]
            })
        },
        getStatus: function() {
            return this._status
        }
    });
    function ca(cM) {
        this._opts = {
            renderOptions: {
                map: null
            }
        };
        a9.extend(this._opts, cM);
        this._queryList = [];
        var T = this;
        cB.load("othersearch",
        function() {
            T._asyncSearch()
        })
    }
    a9.inherits(ca, a9.lang.Class, "LocalCity");
    a9.extend(ca.prototype, {
        get: function(T) {
            this._queryList.push({
                method: "get",
                arguments: [T]
            })
        },
        toString: function() {
            return "LocalCity"
        }
    });
    function W() {
        this._queryList = [];
        var T = this;
        cB.load("othersearch",
        function() {
            T._asyncSearch()
        })
    }
    a9.inherits(W, a9.lang.Class, "Boundary");
    a9.extend(W.prototype, {
        get: function(cM, T) {
            this._queryList.push({
                method: "get",
                arguments: [cM, T]
            })
        },
        toString: function() {
            return "Boundary"
        }
    });
    function bn(cN, cM) {
        w.call(this, cN, cM);
        this.QUERY_TYPE_BUSLIST = G;
        this.RETURN_TYPE_BUSLIST = a3;
        this.QUERY_TYPE_BUSLINE = bg;
        this.RETURN_TYPE_BUSLINE = cz;
        this._queryList = [];
        var T = this;
        cB.load("buslinesearch",
        function() {
            T._asyncSearch()
        })
    }
    bn._iconOpen = cd.imgPath + "iw_plus.gif";
    bn._iconClose = cd.imgPath + "iw_minus.gif";
    bn._stopUrl = cd.imgPath + "stop_icon.png";
    a9.inherits(bn, w);
    a9.extend(bn.prototype, {
        getBusList: function(T) {
            this._queryList.push({
                method: "getBusList",
                arguments: [T]
            })
        },
        getBusLine: function(T) {
            this._queryList.push({
                method: "getBusLine",
                arguments: [T]
            })
        },
        setGetBusListCompleteCallback: function(T) {
            this._opts.onGetBusListComplete = T ||
            function() {}
        },
        setGetBusLineCompleteCallback: function(T) {
            this._opts.onGetBusLineComplete = T ||
            function() {}
        },
        setBusListHtmlSetCallback: function(T) {
            this._opts.onBusListHtmlSet = T ||
            function() {}
        },
        setBusLineHtmlSetCallback: function(T) {
            this._opts.onBusLineHtmlSet = T ||
            function() {}
        },
        setPolylinesSetCallback: function(T) {
            this._opts.onPolylinesSet = T ||
            function() {}
        }
    });
    function bz(cM) {
        w.call(this, cM);
        cM = cM || {};
        this._options = {
            input: null,
            types: [],
            onSearchComplete: function() {}
        };
        a9.extend(this._options, cM);
        this._loc.src = cM.location || "\u5168\u56fd";
        this._word = "";
        this._show = false;
        this._suggestion = null;
        this._inputValue = "";
        this._initialize();
        _addStat(5011);
        var T = this;
        cB.load("autocomplete",
        function() {
            T._asyncSearch()
        })
    }
    a9.inherits(bz, w, "Autocomplete");
    a9.extend(bz.prototype, {
        _initialize: function() {},
        show: function() {
            this._show = true
        },
        hide: function() {
            this._show = false
        },
        setTypes: function(T) {
            this._options.types = T
        },
        setLocation: function(T) {
            this._loc.src = T
        },
        search: function(T) {
            this._word = T
        },
        setInputValue: function(T) {
            this._inputValue = T
        }
    });
    function ak(T, cM) {
        window.BMap[T] = cM
    }
    ak("Map", bA);
    ak("Hotspot", cn);
    ak("MapType", cv);
    ak("Point", ce);
    ak("Pixel", bv);
    ak("Size", aI);
    ak("Bounds", bO);
    ak("TileLayer", p);
    ak("Projection", be);
    ak("MercatorProjection", bb);
    ak("PerspectiveProjection", cF);
    ak("Copyright", aw);
    ak("Overlay", bH);
    ak("Label", ah);
    ak("Marker", ae);
    ak("Icon", M);
    ak("Polyline", f);
    ak("Polygon", co);
    ak("InfoWindow", bQ);
    ak("Circle", a);
    ak("Control", cq);
    ak("NavigationControl", L);
    ak("OverviewMapControl", cL);
    ak("CopyrightControl", an);
    ak("ScaleControl", bL);
    ak("MapTypeControl", aM);
    ak("TrafficLayer", aD);
    ak("ContextMenu", cA);
    ak("MenuItem", bf);
    ak("LocalSearch", a5);
    ak("TransitRoute", aV);
    ak("DrivingRoute", q);
    ak("WalkingRoute", cE);
    ak("Autocomplete", bz);
    ak("Geocoder", aY);
    ak("LocalCity", ca);
    ak("Geolocation", al);
    ak("BusLineSearch", bn);
    ak("Boundary", W);
    window.BMap.apiLoad();
})();
