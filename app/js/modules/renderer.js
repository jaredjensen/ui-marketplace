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