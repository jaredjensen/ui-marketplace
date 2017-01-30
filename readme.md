# UI Marketplace

A repository of reusable front-end assets and simple wireframing tool.  This project has several goals:

* Establish a structure for defining standalone components
* Encourage discovery of available components to avoid recreating the wheel
* Provide a flexible accelerator with pre-configured tooling to support project-specific development

Key architecture points:

* Components are each defined by an HTML template, Sass styles, a metadata file, and optional JavaScript
* The wireframing tool allows users to maintain a dictionary of content that can be married to component instances
* A _starter kit_ project can be dynamically generated containing only the components used in the wires
* Components are rendered using Handlebars, but no JavaScript framework is used for the app itself

## Installation

The marketplace is intended to be hosted locally, served by [lite-server](https://github.com/johnpapa/lite-server]).  Install it by cloning the project, then run `npm start`.

## Contributing

1. Fork this repository
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request

When coding, run `gulp` to start the watch task that assembles static assets.