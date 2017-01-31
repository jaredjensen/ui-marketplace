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