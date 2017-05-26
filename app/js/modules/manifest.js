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