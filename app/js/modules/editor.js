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
