(function (app) {

    app.manifest = {
        addComponent: addComponent,
        createComponent: createComponent,
        current: null,
        //getManifest: getManifest,
        init: init
    };

    function init() {
        app.manifest.current = getManifest();
        app.events.publish('manifest-changed');
    }

    function addComponent(componentName, parent) {
        parent.components = parent.components || [];
        parent.components.push(createComponent(componentName));
        app.events.publish('manifest-changed');
    }

    function createComponent(name) {
        return {
            name: name,
            components: [],
            contentId: null
        };
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
                            contentId: 'buttonGoogle'
                        }, {
                            name: 'button',
                            contentId: 'buttonBing'
                        }]
                    }, {
                        name: 'layout-8-4',
                        components: [{
                            name: 'button',
                            contentId: 'buttonYahoo',
                            container: 'left'
                        }, {
                            name: 'button',
                            contentId: 'buttonStackOverflow',
                            container: 'right'
                        }]
                    }]
                }]
            }
        };
    }

    // function setParents(node) {
    //     if (!node.components || node.components.length === 0) return;
    //     for (var i = 0; i < node.components.length; i++) {
    //         node.components[i].parent = node;
    //         setParents(node.components[i]);
    //     }
    // }

}(window.UIM));