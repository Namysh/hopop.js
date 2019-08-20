# Hopop.js

I made a librairy like Popper.js in order to train myself in javascript
[you can see an example here](https://namysh.github.io/hopop.js/)


## Usage
First, you need to import the JS and the CSS file.
```html
<script  type="text/javascript"  src="js/hopop.js"></script>
<link  rel="stylesheet"  href="css/hopop.css">
```
Afterward you can select elements by its id or class (the first argument) and then pass a function that will return the content (HTML) of the future popup
```javascript
hopop(".class", function(element) {
	return  "Description :" + element.dataset.description;
});
hopop("#id", function(element) {
	return  "Description :" + element.dataset.description;
});
```
You can of course put what you want in the popup's content like images for example
