/**
 * The editor is only responsible for applying drag/drop behavior and basic UI updates.  Any updates to the
 * manifest model or DOM should be done by publishing events.
 */

(function (app, $) {

	app.editor = {
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
		//el.click(onComponentClicked);
		makeDraggable(el, false);
		makeDroppable(el);
	}

	function loadToolbox() {
		makeDraggable($('#editor-toolbox .draggable'), true);
	}

	function loadEditor() {
		$('#editor-canvas').on('click', '._component', onComponentClicked);
	}

	function onComponentCreated(e, args) {
		initComponent(args);
	}

	function onComponentClicked(e) {
		// todo: determine why all clicks are occurring on the "page" element
		var el = $(this);
		var manifestItem = el.data('manifestItem');
		el.addClass('_component-active');
		renderProperties(manifestItem);
		app.events.publish('component-selected', el);
	}

	function makeDraggable(el, revert) {
		el.draggable({
			revert: revert,
			snap: '#editor-canvas ._container'
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

		var content = app.content.get(manifestItem);
		var i = 0;
		for (var k in content) {
			if (!content.hasOwnProperty(k)) continue;

			var html = '<div class="form-group row">' +
				'<label for="field_' + i + '" class="col-3 col-form-label col-form-label-sm">' + k + '</label>' +
                '<div class="col-9">' +
            	'<input class="form-control form-control-sm" type="text" value="" id="field_' + i + '">' +
                '</div>' +
                '</div>';

			var field = $(html);
			field.find('input').val(content[k]);
			props.append(field);
		}
	}

}(window.UIM, window.jQuery));
