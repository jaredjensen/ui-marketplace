(function (app) {
	
	app.content = {
		get: getContent
	};

	function getContent(manifestItem) {
		return manifestItem.contentId ? app.manifest.current.content[manifestItem.contentId] : getDefaultContent(manifestItem.name);
	}

	function getDefaultContent(componentName) {
		if (!app.components[componentName]) return {};
		var content = {};
		var props = app.components[componentName].properties;
		for (var k in props) {
			if (!props.hasOwnProperty(k)) continue;
			content[k] = props[k].defaultValue;
		}
		return content;
	}

}(window.UIM));