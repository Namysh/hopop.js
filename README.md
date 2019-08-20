# Hopup.js

I made a librairy like Popoverjs in order to train myself in javascript
[you can see an example here](https://namysh.github.io/hopop/)


## Usage
First, you need to import the JS and the CSS file.
```html
<script  type="text/javascript"  src="js/hopop.js"></script>
<link  rel="stylesheet"  href="css/hopop.css">
```
Afterward you can select elements by its id or class
```javascript
hopop(".class", function(element) {
	return  "Description :" + element.dataset.description;
});
hopop("#id", function(element) {
	return  "Description :" + element.dataset.description;
});
```