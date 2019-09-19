# Hopop.js

I made a librairy like Popper.js in order to train myself in javascript.

[You can see an example here](https://namysh.github.io/hopop.js/example/)

as you can see, a popup appears when you move the mouse over an element


## Usage
First, you need to download the JS and the CSS file then import them in your file.
```html
<script  type="text/javascript"  src="hopop.js"></script>
<link  rel="stylesheet"  href="hopop.css">
```
Afterward you can select elements by its id or class (the first argument) and then pass a function that will return the content (HTML) of the future popup. 

You also can add a position for the popup (top, right, bottom, left).

See the examples below :
```javascript
// add popup on element that have "class" as class and the popup contains its description dataset
hopop(".class", function(element) {
	return  "Description :" + element.dataset.description;
});
// add popup on element that have "id" as id and the popup contains its description dataset
hopop("#id", function(element) {
	return  "Description :" + element.dataset.description;
}, "top");
```
You can of course put what you want in the popup's content like images for example
