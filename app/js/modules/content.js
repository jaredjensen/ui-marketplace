(function (app) {

	app.content = {
		getContent: getContent,
		getPropertyType: getPropertyType
	};

	function getContent(manifestItem) {
		return manifestItem.content || getDefaultContent(manifestItem.name);
	}

	function getDefaultContent(componentName) {
		if (!app.components[componentName] || !app.components[componentName].properties) return {};
		var content = {};
		var props = app.components[componentName].properties;
		for (var k in props) {
			if (!props.hasOwnProperty(k)) continue;
			content[k] = props[k].defaultValue;
		}
		return content;
	}

	function getPropertyType(componentName, propertyName) {
		return (!app.components[componentName] || !app.components[componentName].properties) ? 'text' : app.components[componentName].properties[propertyName].type;
	}

}(window.UIM));