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