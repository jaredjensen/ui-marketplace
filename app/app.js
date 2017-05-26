(function (app, $) {

    $(init);

    function init() {
        runLifecycleEvents(['load', 'init']);
    }

    function runLifecycleEvents(eventNames) {
        for (var i = 0; i < eventNames.length; i++) {
            var eventName = eventNames[i];
            for (var m in app) {
                if (typeof app[m][eventName] === 'function') app[m][eventName]();
            }
        }
    }

} (window.UIM = {}, window.jQuery));
// Generated at 2017-05-25T23:18:36.280Z.  Do not edit.
(function (app) {
  app.components = { 
    "button": {
        "name": "Button",
        "properties": {
            "color": { "label": "Color", "type": "text", "defaultValue": "primary" },
            "text": { "label": "Text", "type": "text", "defaultValue": "Click me" },
            "url": { "label": "URL", "type": "text", "defaultValue": "http://www.avanade.com" }
        }
    },
    "layout-12": {
        "name": "Layout full width"
    },
    "layout-6-6": {
        "name": "Layout 6/6 split"
    },
    "layout-8-4": {
        "name": "Layout 8/4 split"
    }
  };
}(window.UIM));
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
/**
 * The editor is only responsible for applying drag/drop behavior and basic UI updates.  Any updates to the
 * manifest model or DOM should be done by publishing events.
 */

(function (app, $) {

	app.editor = {
		activeItem: null,
		load: load,
		initComponent: initComponent
	};

	function load() {
		loadToolbox();
		loadEditor();
		bindEvents();
	}

	function bindEvents() {
		app.events.subscribe('component-created', onComponentCreated);
	}

	function initComponent(elem) {
		var el = $(elem);
		makeDraggable(el, false);
		makeDroppable(el);
	}

	function loadToolbox() {
		makeDraggable($('#editor-toolbox .draggable'), true);
	}

	function loadEditor() {
		$('#editor-components').on('click', '._component', onComponentClicked);
		$('#editor-apply-properties').on('click', applyProperties);
	}

	function onComponentCreated(e, args) {
		initComponent(args);
	}

	function onComponentClicked(e) {
		e.stopPropagation();
		e.preventDefault();

		$('#editor-components ._component-active').removeClass('_component-active');

		var el = $(this);
		var manifestItem = el.data('manifestItem');
		el.addClass('_component-active');
		renderProperties(manifestItem);

		app.editor.activeItem = manifestItem;
		app.events.publish('component-selected', el);
	}

	function makeDraggable(el, revert) {
		el.draggable({
			revert: revert,
			snap: '#editor-components ._container'
		});
	}

	function makeDroppable(el) {
		el.find('._container').each(function () {
			var self = $(this);
			self.droppable({
				drop: function (evt, ui) {
					app.events.publish('component-dropped', {
						componentName: $(ui.draggable).data('componentName'),
						containerElement: self
					});
				}
			});
		});
	}

	function renderProperties(manifestItem) {
		var props = $('#editor-properties');
		props.empty();

		var content = app.content.getContent(manifestItem);
		var i = 0;
		var hasProps = false;

		for (var k in content) {
			if (!content.hasOwnProperty(k)) continue;

			var type = app.content.getPropertyType(manifestItem.name, k);

			var html = '<div class="form-group row">' +
				'<label for="field_' + i + '" class="col-3 col-form-label col-form-label-sm">' + k + '</label>' +
                '<div class="col-9"><input class="form-control form-control-sm" data-name="' + k + '" type="' + type + '" value="" id="field_' + i + '"></div>' +
                '</div>';

			var field = $(html);
			field.find('input').val(content[k]);
			props.append(field);

			hasProps = true;
		}

		$('#editor-properties-none')[hasProps ? 'hide' : 'show']();
		$('#editor-apply-properties')[hasProps ? 'show' : 'hide']();
	}

	function applyProperties() {
		var content = {};
		$('#editor-properties input').each(function () {
			var input = $(this);
			var name = input.data('name');
			content[name] = input.val();
		});
		app.manifest.setContent(app.editor.activeItem, content);
	}

}(window.UIM, window.jQuery));

(function (app, $) {

	var o = $({});

	app.events = {
		subscribe: function () {
			o.on.apply(o, arguments);
		},
		unsubscribe: function () {
			o.off.apply(o, arguments);
		},
		publish: function () {
			o.trigger.apply(o, arguments);
		}
	};

}(window.UIM, window.jQuery));
(function (app) {

	app.manifest = {
		addComponent: addComponent,
		createComponent: createComponent,
		current: null,
		init: init,
		setContent: setContent
	};

	function init() {
		app.manifest.current = getManifest();
		notify();
	}

	function addComponent(componentName, parent) {
		parent.components = parent.components || [];
		parent.components.push(createComponent(componentName));
		notify();
	}

	function setContent(manifestItem, content) {
		manifestItem.content = content;
		notify();
	}

	function notify() {
		app.events.publish('manifest-changed');
	}

	function createComponent(name) {
		return {
			name: name,
			components: []
		};
	}

	function getManifest() {
		return {
			page: {
				name: 'page',
				components: [{
					name: 'container',
					components: [{
						name: 'layout-12',
						components: [{
							name: 'button',
							content: {
								color: 'primary',
								text: 'Google',
								url: 'https://www.google.com'
							}
						}, {
							name: 'button',
							content: {
								color: 'secondary',
								text: 'Bing',
								url: 'https://www.bing.com'
							}
						}]
					}, {
						name: 'layout-8-4',
						components: [{
							name: 'button',
							content: {
								color: 'primary',
								text: 'Yahoo',
								url: 'https://www.yahoo.com'
							},
							container: 'left'
						}, {
							name: 'button',
							content: {
								color: 'secondary',
								text: 'Stack Overflow',
								url: 'https://www.stackoverflow.com'
							},
							container: 'right'
						}]
					}]
				}]
			}
		};
	}

}(window.UIM));
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
// Generated at 2017-05-25T23:06:35.934Z.  Do not edit.
(function (app) {
  app.templates = { 
    "button": "<a href=\"{{url}}\" class=\"button button-{{color}}\">{{text}}</a>",
    "container": "<div class=\"container _container\"></div>",
    "layout-12": "<div class=\"row\"><div class=\"col-md-12 _container\"></div></div>",
    "layout-6-6": "<div class=\"row\"><div class=\"col-md-6 _container _container-left\"></div><div class=\"col-md-6 _container _container-right\"></div></div>",
    "layout-8-4": "<div class=\"row\"><div class=\"col-md-8 _container _container-left\"></div><div class=\"col-md-4 _container _container-right\"></div></div>",
    "page": "<div class=\"page _container\"></div>"
  };
}(window.UIM));