(function (global)
{
    "use strict";
    
    var DEBUG = true;

    var utilities = {
        // High performance function check - http://jsperf.com/alternative-isfunction-implementations
        isFunction: function (functionToCheck)
        {
            return !!(functionToCheck && functionToCheck.constructor && functionToCheck.call && functionToCheck.apply);
        },

        isString: function (stringToCheck)
        {
            if (!stringToCheck)
            {
                return false;
            }
            
            return (typeof stringToCheck === "string");
        },
        
        argumentsCallback: function (args, invoke)
        {
            var lastArgument = args[args.length - 1];

            if (utilities.isFunction(lastArgument))
            {
                if (invoke)
                {
                    lastArgument();
                }
                else
                {
                    return lastArgument;
                }
            }
            else
            {
                return undefined;
            }
        },
        
        mergeObjects: function (original, updates) 
        {
            // Search for faster way.
            for (var key in updates) 
            {
                original[key] = updates[key];
            }
            
            return original;
        },
        
        // http://stackoverflow.com/questions/7949752/cross-browser-javascript-xml-parsing
        parseXML: function (xmlString)
        {
            if (typeof window.DOMParser != "undefined")
            {
                return (new window.DOMParser()).parseFromString(xmlString, "text/xml");
            }
            else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) 
            {
                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(xmlString);
                return xmlDoc;
            }
            else
            {
                throw new Error("No XML parser found.");
            }
        }
    };

    var gQuery = function (selector)
    {
        return new gQuery.func.initialize(selector);
    };

    gQuery.func = gQuery.prototype = {
        constructor: gQuery,

        /* 
        @function initialize - Initializes gQuery elements with selector.
        @param {String} selector - Selector to select element(s).
        */
        initialize: function (selector)
        {
            // If querySelector is supported then we consider it as "modern" browser.
            if ("querySelector" in document)
            {
                try
                {
                    if (!selector)
                    {
                        throw new Error("ERROR: Invalid selector.");
                    }
                    else if (!!selector.nodeType && (selector.nodeType === 1 || selector.nodeType === 9))
                    {
                        this.els = [selector];
                    }
                    else if (typeof selector === "string")
                    {
                        this.els = document.querySelectorAll(selector);
                    }
                    else
                    {
                        throw new Error("ERROR: Unable to query selector.");
                    }

                    this.length = this.els.length;

                    if (this.length === 0)
                    {
                        throw new Error("ERROR: No elements found with that selector.");
                    }

                    return this;
                }
                catch (e)
                {
                    if (DEBUG)
                    {
                        throw e;
                    }
                    else
                    {
                        return undefined;
                    }
                }
            }
            else
            {
                throw new Error("ERROR: Not modern browser.");
            }
        },

        /* 
        @function each - Loops through elements and calls selected function within.
        @param {Function} functionToCall - Function that will be called.
        */
        each: function (functionToCall)
        {
            var elements = this.els,
                count = 0;

            /*for (var i = 0, len = elements.length; i < len; i++)
            {
                try 
                {
                    (functionToCall.call(elements[i], i) === false) ? count-- : count++;
                }
                catch (e)
                {
                    throw e;
                }
            }*/
            
            elements.forEach(function(){
                (functionToCall.call(elements[i], i) === false) ? count-- : count++;
            });

            return count;
        },

        /*
        @function hasClass - Determine whether any of the matched elements are assigned the given class.
        @param {String} className - The class name to search for.
        */
        hasClass: function (classNames)
        {
            if (utilities.isString(classNames))
            {
                var count = 0;
                
                classNames = classNames.split(" ");
                
                this.each(function ()
                {
                    for (var i = 0; i < classNames.length; i++)
                    {
                        try 
                        {
                            if (new RegExp(classNames[i])
                                .test(this.className))
                            {
                                count++;
                            }
                        }
                        catch (e)
                        {
                            throw e;
                        }
                    }
                });
                
                if (count == classNames.length )
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        },

        /*
        @function addClass - Adds the specified class(es) to each of the set of matched elements.
        @param {String} classNames - One or more space-separated classes to be added to the class attribute of each matched element.
        */
        addClass: function (classNames)
        {
            if (!utilities.isString(classNames))
            {
                return;
            }

            var classesSplit = classNames.split(" ");

            this.each(function ()
            {
                for (var i = 0; i < classesSplit.length; i++)
                {
                    try 
                    {
                        if (this.classList)
                        {
                            this.classList.add(classesSplit[i]);
                        }
                        else
                        {
                            if (!this.hasClass(classesSplit[i]))
                            {
                                this.className += (" " + classesSplit[i]);
                            }
                        }
                    }
                    catch (e)
                    {
                        throw e;
                    }
                }
            });

            return this;
        },

        /*
        @function removeClass - Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
        @param {String} classNames - One or more space-separated classes to be removed from the class attribute of each matched element.
        */
        removeClass: function (classNames)
        {
            if (!utilities.isString(classNames))
            {
                return;
            }

            var classesSplit = classNames.split(" ");

            this.each(function ()
            {
                for (var i = 0; i < classesSplit.length; i++)
                {
                    try
                    {
                        if (this.classList)
                        {
                            this.classList.remove(classesSplit[i]);
                        }
                        else
                        {
                            if (this.hasClass(classesSplit[i]))
                            {
                                var newClass = " " + this.className.replace(/[\t\r\n]/g, " ") + " ";

                                while (newClass.indexOf(" " + classesSplit[i] + " ") >= 0)
                                {
                                    newClass = newClass.replace(" " + classesSplit[i] + " ", " ");
                                }

                                this.className = nnewClass.replace(/^\s+|\s+$/g, " ");
                            }
                        }
                    }
                    catch (e)
                    {
                        throw e;
                    }
                }
            });

            return this;
        },

        /*
        @function toggleClass - Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.
        @param {String} classNames - One or more class names (separated by spaces) to be toggled for each element in the matched set.
        */
        toggleClass: function (className)
        {
            if (!utilities.isString(className))
            {
                return;
            }

            this.each(function ()
            {
                if (this.classList)
                {
                    this.classList.toggle(className);
                }
                else
                {
                    if (this.hasClass(className))
                    {
                        this.removeClass(className);
                    }
                    else
                    {
                        this.addClass(className);
                    }
                }
            });

            return this;
        },
        /*
        @function nth - Retrieves the DOM element(s).
        @param {Number} index - A zero-based integer indicating which element to retrieve.
        */
        nth: function (index)
        {
            index = (index < 0 ? this.els.length + index : index);
            return gQuery.func.initialize(this.els[index]);
        },

        /*
        @function first - Retrieves the first DOM element.
        */
        first: function ()
        {
            return this.nth(0);
        },

        /*
        @function last - Retrieves the last DOM element.
        */
        last: function ()
        {
            return this.nth(-1);
        },

        /*
        @function remove -  Removes selected elements from the DOM.
        */
        remove: function ()
        {
            this.each(function ()
            {
                if (this.parentElement)
                {
                    this.parentElement.removeChild(this);
                }
            });

            return this;
        },

        /*
        @function show - Displays selected elements in the DOM.
        */
        show: function ()
        {
            this.each(function ()
            {
                this.style.display = "";
            });

            return this;
        },

        /*
        @function hide - Hides selected elements in the DOM.
        */
        hide: function ()
        {
            this.each(function ()
            {
                this.style.display = "none";
            });

            return this;
        },
        
        /*
        @function css - Changes styles
        @param {String} cssStyles - List of styles for changing.
        */
        css: function (cssStyles)
        {
            if (cssStyles)
            {
                this.each(function()
                {
                    this.style.cssText = cssStyles;
                });
            }
            return this;
        },

        /*
        @function attr - Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
        @param {String} attributeName - The name of the attribute to get or set.
        @param {String} value - A value to set for the attribute.
        */
        attr: function (attributeName, value)
        {
            if (!utilities.isString(value))
            {
                return this.els[0].getAttribute(attributeName);
            }
            else
            {
                this.each(function ()
                {
                    this.setAttribute(attributeName, value);
                });
            }

            return this;
        },

        /*
        @function html - Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
        @param {String} html - A string of HTML to set as the content of each matched element.
        */
        html: function (html)
        {
            if (utilities.isString(html))
            {
                this.each(function ()
                {
                    this.innerHTML = html;
                });

                return this;
            }
            else
            {
                return this.els[0].innerHTML;
            }
        },

        /*
        @function html - Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.
        @param {String} html - The text to set as the content of each matched element.
        */
        text: function (text)
        {
            if (utilities.isString(text))
            {
                this.each(function ()
                {
                    if (typeof this.textContent !== "undefined")
                    {
                        this.textContent = text;
                    }
                    else
                    {
                        this.innerText = text;
                    }
                });

                return this;
            }
            else
            {
                if (typeof this.els[0].textContent !== "undefined")
                {
                    return this.els[0].textContent;
                }
                else
                {
                    return this.els[0].innerText;
                }
            }
        },

        /*
        @function on - Attach an event handler function for one or more events to the selected elements.
        @param {String} events - One or more space-separated event types and optional namespaces, or just namespaces, such as "click".
        @arguments {Function} - A function to execute when the event is triggered.
        */
        on: function (events)
        {
            var eventsSplit = events.split(" "),
                eventFunction = utilities.argumentsCallback(arguments);

            this.each(function ()
            {
                for (var i = 0; i < eventsSplit.length; i++)
                {
                    if (this.addEventListener)
                    {
                        this.addEventListener(eventsSplit[i], eventFunction, false);
                    }
                    else if (this.attachEvent)
                    {
                        if (this.window && (eventsSplit[i].indexOf("mouse") != -1 || eventsSplit[i].indexOf("click") != -1))
                        {
                            document.attachEvent("on" + eventsSplit[i], eventFunction);
                        }
                        else
                        {
                            this.attachEvent("on" + eventsSplit[i], eventFunction);
                        }
                    }
                }
            });

            return this;
        },

        /*
        @function on - Remove an event handler.
        @param {String} events - One or more space-separated event types and optional namespaces, or just namespaces, such as "click".
        @arguments {Function} - A handler function previously attached for the event(s).
        */
        off: function (events)
        {
            var eventsSplit = events.split(" "),
                eventFunction = utilities.argumentsCallback(arguments);

            this.each(function ()
            {
                for (var i = 0; i < eventsSplit.length; i++)
                {
                    if (this.removeEventListener)
                    {
                        this.removeEventListener(eventsSplit[i], eventFunction, false);
                    }
                    else if (this.detachEvent)
                    {
                        if (this.window && (eventsSplit[i].indexOf("mouse") != -1 || eventsSplit[i].indexOf("click") != -1))
                        {
                            document.detachEvent("on" + eventsSplit[i], eventFunction);;
                        }
                        else
                        {
                            this.detachEvent("on" + eventsSplit[i], eventFunction);
                        }
                    }
                }
            });

            return this;
        },

        /*
        @function click - Bind an event handler to the "click" JavaScript event, or trigger that event on an element.
        @param {Function} callback - A function to execute when the event is triggered.
        */
        click: function (callback)
        {
            this.on("click", callback);
        }
    };
    
    gQuery.ajax = function( settings )
    {
        var client = new XMLHttpRequest();
        
        if( !client )
        {
            return;
        }
            
        function defaultSettings() 
        {
            return {
                url: "",
                cache: true,
                data: {},
                headers: {},
                context: null,
                type: "GET",
                timeout: 0,
                onsuccess: function () {},
                onerror: function () {},
                ontimeout: function () {}
            }
        }

        settings = utilities.mergeObjects( defaultSettings(), settings || {} );
        
        var success = function(data, client, settings)
        {
            settings.onsuccess.call(settings.context, data, "success", client);
        };
        
        var error = function(error, type, client, settings) 
        {
            settings.onerror.call(settings.context, client, type, error);
        };
        
        var timeout = function(type, client, settings)
        {
            settings.ontimeout.call(settings.context, client, type);
        };
        
        if (settings.timeout > 0) 
        {
            client.timeout = parseInt(settings.timeout);
            
            client.ontimeout = timeout;
        }

        client.addEventListener("readystatechange", function() 
        {
            if (client.readyState === 4) 
            {
                try 
                {
                    var result;
                
                    if (client.status >= 200 && client.status < 400 || client.status == 304)
                    {
                        var contentType = client.getResponseHeader("content-type");
                    
                        result = client.responseText;

                        try
                        {
                            if (contentType && contentType.match(/json/))
                            {
                                result = JSON.parse(result);
                            }
                            else if (contentType && contentType.match(/xml/))
                            {
                                result = utilities.parseXML(result);
                            }
                        
                            success(result, client, settings);
                        
                            return;
                        } 
                        catch (e)
                        {
                            throw e;
                        }
                    }
                    else 
                    {
                        error(null, "error", client, settings);
                    
                        return;
                    }
                }
                catch (e)
                {
                    throw e;
                }
            }
        }, false);

        client.open(settings.type, settings.url);
        
        if (settings.type === "POST")
        {
            settings.headers = utilities.mergeObjects(settings.headers, {
                "X-Requested-With": "XMLHttpRequest",
                "Content-type": "application/x-www-form-urlencoded"
            });
        }
        
        for (var key in settings.headers)
        {
            client.setRequestHeader(key, settings.headers[key]);
        }
        
        client.send(settings.data);
        
        return this;
    };
    
    gQuery.func.initialize.prototype = gQuery.func;

    global.gQuery = gQuery;

    global.$ = gQuery;
}(this));