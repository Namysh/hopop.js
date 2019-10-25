function hopop(query, content_function, position = "bottom") {

	// parsing the query in order to recuperate the selector
	const selector = {
		type: query.substring(0, 1),
		identifier: query.substring(1, query.length)
	};

	const elements = [];

	// possible locations
	const posList = ["top", "right", "bottom", "left"];

	// position if declared or "bottom" by default
	const pos = (posList.includes(position) && position) || "bottom";

	// retrieving the elements
	switch (selector.type) {
		case ".":
			[...document.getElementsByClassName(selector.identifier)].forEach(e => elements.push(e));
			break;

		case "#":
			[document.getElementById(selector.identifier)].forEach(e => elements.push(e));
			break;

		case "&":
			[].forEach(e => elements.push(e));
			break;
	}

	// foreach element
	elements.forEach((element) => {

		// content retrieval by the callback
		const content = content_function(element);

		// event mouseover in order to display the popup
		element.addEventListener("mouseover", (e) => {

			// generating random id
			const id = Math.floor((Math.random() * 10000) + 1);

			// setting aria-describedby attribute for identify the elements
			e.currentTarget.setAttribute("aria-describedby", id);

			// preparing popup
			var popover = document.createElement("div");

			// TODO : add arrow 

			popover.setAttribute("id", "popup" + id);
			popover.setAttribute("class", "hopop");
			popover.innerHTML = content;

			// inserting popup at the end of body
			document.body.lastElementChild.after(popover);

			// recuperating position data for positioning the popup
			const currentElementData = e.currentTarget.getBoundingClientRect();
			const currentPopoverData = popover.getBoundingClientRect();

			let get = {
				currentElementX: currentElementData.left + window.scrollX,
				currentElementY: currentElementData.top + window.scrollY,
				currentElementWidth: currentElementData.width,
				currentElementHeight: currentElementData.height,
				currentPopoverWidth: currentPopoverData.width,
				currentPopoverHeight: currentPopoverData.height,

			};

			popover.style.top = pos === "bottom" ? get.currentElementY + get.currentElementHeight + 5 + "px" :
				pos === "right" ? get.currentElementY + get.currentElementHeight / 2 - get.currentPopoverHeight / 2 + "px" :
				pos === "top" ? get.currentElementY - get.currentPopoverHeight - 5 + "px" :
				pos === "left" ? get.currentElementY + get.currentElementHeight / 2 - get.currentPopoverHeight / 2 + "px" :
				" 0 px";

			//TODO trouble with the images that haven't loaded

			popover.style.left = pos === "bottom" ? (get.currentElementX + get.currentElementWidth / 2 - get.currentPopoverWidth / 2) >= 0 ?
				(get.currentElementX + (get.currentElementWidth / 2) - (get.currentPopoverWidth / 2) + "px") :
				(0 + "px") :
				pos === "right" ? (get.currentElementX + get.currentElementWidth) + 5 + "px" :
				pos === "top" ? (get.currentElementX + (get.currentElementWidth / 2) - (get.currentPopoverWidth / 2)) + "px" :
				pos === "left" ? get.currentElementX - 5 - get.currentPopoverWidth + "px" :
				"0 px";
		});

		// mouseout event
		element.addEventListener("mouseout", (e) => {
			// recuperation of id in aria-describedby
			const id = e.currentTarget.getAttribute("aria-describedby");

			if (id != null && id != "") {

				// recuperation of associated popup
				const item = document.getElementById("popup" + id);

				// deleting popup
				item.parentNode.removeChild(item);

				// removing aria-describedby attribute
				e.currentTarget.removeAttribute("aria-describedby");
			}
		});
	});

}