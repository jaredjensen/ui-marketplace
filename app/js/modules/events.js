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