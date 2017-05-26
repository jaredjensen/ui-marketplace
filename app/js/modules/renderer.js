/**
 * The renderer is responsible for marrying the manifest model to the DOM and updating the browser.  It updates the manifest
 * in response to editor events and updates the DOM in response to manifest changes.
 */

(function (app, $, tmpl) {

	var MANIFEST_ITEM_DATA_KEY = 'manifestItem';
	var _root = $('#editor-components');

	app.renderer = {
		load: load,
		//renderManifest: renderManifest,
		renderComponent: renderComponent
	};

	function load() {
		bindEvents();
	}

	function bindEvents() {
		app.events.subscribe('component-dropped', onComponentDropped);
		app.events.subscribe('manifest-changed', onManifestChanged);
	}

	function onComponentDropped(e, args) {
		if (!args.componentName) {
			console.warn('Component dropped with no name', args);
			return;
		}

		var parentComponentElement = args.containerElement.is('._component') ? args.containerElement : args.containerElement.closest('._component');
		var parentItem = parentComponentElement.data(MANIFEST_ITEM_DATA_KEY);
		if (!parentItem) {
			console.warn('Component dropped, but parent is not bound', args);
			return;
		}

		app.manifest.addComponent(args.componentName, parentItem);
	}

	function onManifestChanged() {
		_root.empty();
		attachManifestItem(_root, app.manifest.current.page);
		renderComponent(_root, app.manifest.current.page);
	}

	function renderComponent(parentElement, manifestItem) {

		// Fetch the template
		var html = app.templates[manifestItem.name];
		if (!html) {
			console.warn('Missing HTML template for "' + manifestItem.name + '".');
			return;
		}

		// Populate with content
		var content = app.content.getContent(manifestItem);
		var template = tmpl.compile(html); // todo: move template compilation into content module for performance
		html = template(content);

		// Add to the DOM
		var componentElement = $(html).appendTo(parentElement);
		componentElement.addClass('_component' + (manifestItem === app.editor.activeItem ? ' _component-active' : ''));
		attachManifestItem(componentElement, manifestItem);
		app.events.publish('component-created', componentElement);

		if (!manifestItem.components) return;

		// Recurse child components
		$.each(manifestItem.components, function () {
			var isContainer = componentElement.is('._container');
			var containerSelector = '._container' + (this.container ? '-' + this.container : '');
			var container = isContainer ? componentElement : componentElement.find(containerSelector).first();
			renderComponent(container, this);
		});
	}

	function attachManifestItem(element, manifestItem) {
		element.data(MANIFEST_ITEM_DATA_KEY, manifestItem);
	}

}(window.UIM, window.jQuery, window.Handlebars));