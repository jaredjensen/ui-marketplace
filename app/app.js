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
// Generated at 2017-01-31T00:54:36.143Z.  Do not edit.
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
    "layout-8-4": {
        "name": "Layout 8/4 split"
    }
  };
}(window.UIM));
(function (app) {
    app.content = {
        buttonGoogle: {
            text: 'Google',
            url: 'https://www.google.com'
        },
        buttonBing: {
            text: 'Bing',
            url: 'https://www.bing.com'
        },
        buttonYahoo: {
            text: 'Yahoo',
            url: 'https://www.yahoo.com'
        },
        buttonStackOverflow: {
            text: 'Stack Overflow',
            url: 'https://www.stackoverflow.com'
        }
    };
}(window.UIM));
(function (app, $) {

    app.editor = {
        load: load,
        initComponent: initComponent
    };

    function load() {
        app.events.subscribe('component-created', onComponentCreated);
    }

    function initComponent(elem) {
        var $el = $(elem);
        $el.draggable({
            snap: '._container'
        });
        $el.find('._container').each(function (i, e) {
            $(e).droppable({
                drop: function () {
                    onComponentDropped($(this));
                }
            });
        });
    }

    function onComponentCreated(e, args) {
        initComponent(args);
    }

    function onComponentDropped(component) {
        app.events.publish('component-moved', component);
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
        getManifest: getManifest,
        init: init
    };

    function init() {
        var manifest = getManifest();
        app.events.publish('manifest-changed', manifest);
    }

    function getManifest() {
        return {
            content: {
                buttonGoogle: {
                    color: 'primary',
                    text: 'Google',
                    url: 'https://www.google.com'
                },
                buttonBing: {
                    color: 'secondary',
                    text: 'Bing',
                    url: 'https://www.bing.com'
                },
                buttonYahoo: {
                    color: 'primary',
                    text: 'Yahoo',
                    url: 'https://www.yahoo.com'
                },
                buttonStackOverflow: {
                    color: 'secondary',
                    text: 'Stack Overflow',
                    url: 'https://www.stackoverflow.com'
                }
            },
            page: {
                name: 'page',
                components: [{
                    name: 'container',
                    components: [{
                        name: 'layout-12',
                        components: [{
                            name: 'button',
                            content: 'buttonGoogle'
                        }, {
                            name: 'button',
                            content: 'buttonBing'
                        }]
                    }, {
                        name: 'layout-8-4',
                        components: [{
                            name: 'button',
                            content: 'buttonYahoo',
                            container: 'left'
                        }, {
                            name: 'button',
                            content: 'buttonStackOverflow',
                            container: 'right'
                        }]
                    }]
                }]
            }
        };
    }

}(window.UIM));
(function (app, $, tmpl) {
    app.renderer = {
        renderManifest: renderManifest,
        renderComponent: renderComponent,
        load: load
    };

    var root = $('#wires');

    function load() {
        app.events.subscribe('manifest-changed', onManifestChanged);
    }

    function onManifestChanged(e, args) {
        renderManifest(args);
    }

    function renderManifest(manifest) {
        root.empty();
        renderComponent(root, manifest.page, manifest.content);
    }

    function renderComponent(parentElement, component, content) {

        // Fetch the template
        var html = app.templates[component.name];
        if (!html) {
            console.warn('Missing HTML template for "' + component.name + '".');
            return;
        }

        // Populate with content
        if (component.content) {
            var data = content[component.content];
            var template = tmpl.compile(html); // todo: move template compilation into content module for performance
            html = template(data);
        }

        // Add to the DOM
        var componentElement = $(html).appendTo(parentElement);
        app.events.publish('component-created', componentElement);

        // Recurse child components
        $.each(component.components, function () {
            var isContainer = componentElement.is('._container');
            var containerSelector = '._container' + (this.container ? '-' + this.container : '');
            var container = isContainer ? componentElement : componentElement.find(containerSelector).first();
            renderComponent(container, this, content);
        });
    }

}(window.UIM, window.jQuery, window.Handlebars));
// Generated at 2017-01-31T00:54:36.148Z.  Do not edit.
(function (app) {
  app.templates = { 
    "button": "<a href=\"{{url}}\" class=\"button button-{{color}}\">{{text}}</a>",
    "container": "<div class=\"container _container\"></div>",
    "layout-12": "<div class=\"row\"><div class=\"col-md-12 _container\"></div></div>",
    "layout-8-4": "<div class=\"row\"><div class=\"col-md-8 _container _container-left\"></div><div class=\"col-md-4 _container _container-right\"></div></div>",
    "page": "<div class=\"page _container\"></div>"
  };
}(window.UIM));