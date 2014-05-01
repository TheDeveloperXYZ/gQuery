#gQuery

## Setup

First you have to download gQuery.js for development or gQuery-min.js for common usage.

### gQuery.js

The next step is to include the `gQuery.js` or `gQuery-min.js` file in your application. For example:

    <script src="http://example.com/gQuery.js"></script>

## Usage

Here we are gonna show how you can use it.

### Initialize elements

```javascript
// Selecting class(es):
var myelement = $(".myelement");
```

# Footnotes

What is this?
-------------
gQuery is jQuery like DOM library which targets at use of core functions like basic manipulation of classes (addClass, toggleClass...etc.) and even use of jQuery like simple AJAX query
and all that with using native methods. Theoretically it should work with IE8 and above along with all browsers that support at least document.querySelectorAll.

Also, gQuery is WIP (work-in-progress), hence why only core functions are supported. I will add the function that I like to see or even better, pull a request for functions you like to see.

Why?
----
This is not meant to compete against jQuery or any other well-known library but this is more like for studying purposes and for playing around.

Licence
------
gQuery is an open-source project and therefore it uses **GPL v2**.
