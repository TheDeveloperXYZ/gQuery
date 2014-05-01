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
var myElement = $(".myelement");

// Selecting id(s).
var myElement = $("#myelement");
```

For more examples, follow - http://www.w3.org/TR/selectors-api/#examples0

### Class manipulating

```javascript
var myElement = $(".myelement");

// Check if the element has class
var hasclass = myElement.hasClass("hasthisclass"); // Returns boolean[true|false]

// Remove class(es)
myElement.removeClass("removethisclass"); 
myElement.removeClass("removethisclass andremovethisclass thistoo"); // Can remove multiple classes at once

// Add class(es)
myElement.addClass("addthisclass");
myElement.addClass("addthisclass andthisclass"); // Can add multiple classes at once
myElement.addClass("addthisclass").addClass("addthistoo"); // Multiple functions supported

// Toggle class
myElement.toggleClass("togglethis");
```

### Cosmetics

```javascript
var myElement = $(".myelement");

// Show element(s)
myElement.show();

// Hide element(s)
myElement.hide();

// Remove element(s) completely
myElement.remove();

// Change css
myElement.css("background-color: #FAFAFA; color: #333;");
```

### Events

```javascript
var myElement = $(".myelement");

// Add event
myElement.on("click", function() {
   // Do something
});

// Remove event
myElement.off("click", function() {
   // Do something
});

// Click shortcut
myElement.click(function() {
   // Do something when clicked
});
```

### AJAX

```javascript
// Get JSON file
$.ajax({url: "example.json", onsuccess: jsonSuccessFunction, onerror: ajaxError });

// Get HTML file
$.ajax({url: "example.html", onsuccess: htmlSuccess, onerror: ajaxError });

// Post
$.ajax({url: "target.php", type: "POST", data: {user: "Indloon", password: "DidyoureallyathinkIwouldtypemypasswordhere?"}, onsuccess: jsonSuccessFunction, onerror: ajaxError });

// Functions used in ajax query.
var htmlSuccess = function() {
   // Do something
};

var jsonSuccessFunction = function() {
   // Do something
};

var ajaxError = function() {
   // Do something
};
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
