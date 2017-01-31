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

The marketplace is intended to be hosted locally, served by [lite-server][1].  Install it by first cloning the project, then run `npm install`. After the console installs all the included npm packages, then run `npm start`.

**Note:** you only have to run `npm install` once. From then on, you only need to run, `npm start`.

## Contributing

1. Fork this repository
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request

When coding, run `gulp` to start the watch task that assembles static assets.

Dev notes:

* The app is divided into modules:
    * Components (generated) - Concatenated version of all _component_.json files
    * Templates (generated) - Concatenated JSON representation of all HTML templates
    * Events - Simple pub/sub message bus
    * Content - Manages a content dictionary for authoring
    * Manifest - Manages the components and content for a page
    * Renderer - Manages the DOM for a given Manifest
    * Editor - Manages the DOM for editing tasks
* Modules are loosely coupled through the event bus and should not reference each other directly
* Modules can have optional `load()` and `init()` methods, which will be called at app startup
    * Subscribe to the event bus in `load()`
    * Publish startup events in `init()`
* App-specific CSS selectors begin with an underscore
* Standard tasks of linting, transpiling, combining, minifying, and code generation are handled with Gulp tasks
* [lite-server][1] is configured to watch only the final web assets to trigger browsersync

[1]: https://github.com/johnpapa/lite-server

## To Do

* Editor module:
    * Render list of components
    * Allow drag/drop
    * Set component properties
    * Trigger manifest download
* Maniest module:
    * Scrub HTML templates to remove app-specific markup
    * Generate ZIP file
* Build out additional Components
