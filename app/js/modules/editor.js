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
