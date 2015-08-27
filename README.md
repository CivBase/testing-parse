# Setup
Download and install [node](https://nodejs.org/).  With the node package manager (`npm`) installed and available on your system path, you can install the tools needed to build the project.  Navigate to the project root (`testing-parse/`) and run the command `npm install` to install all of these tools automatically.

# Build
This project uses the [grunt](http://gruntjs.com/) task runner to facilitate the build process.  Grunt and its relevant components should have been installed in the `testing-parse/node_modules/` directory when you installed the node tools during setup.  The actual grunt binary will be in `testing-parse/node_modules/grunt-cli/bin/grunt` but you can make it available on your system path by installing the tool globally with `npm install -g grunt-cli`.  The file `Gruntfile.js` provides configurations for the various grunt components.

Run the command `grunt` in the project root (`testing-parse/`) to lint and build the project.  If the lint output provides any warnings or errors, please fix them and re-run `grunt` as necessary until the messages are resolved.  You can also use the command `grunt watch` to execute a process in the background that will build the project any time a TypeScript file is changed.  The `grunt watch` command will not lint the files for you.  All files should be linted before contributing any code to the repository.

### Grunt Commands
The table below provides a description of all of the available grunt commands.  For more information, reference `grunt -h` and the [grunt documentation](http://gruntjs.com/getting-started).

| Command | Action |
| --- | --- |
| `grunt jslint` | Runs the Javascript linter and displays information about how to improve quality of Javascript code. |
| `grunt tslint` | Runs the TypeScript linter and displays information about how to improve quality of TypeScript code. |
| `grunt lint` | Shorthand to run both `grunt jslint` and `grunt tslint` in series. |
| `grunt typescript` | Compiles TypeScript files from the `testing-parse/ts/` directory into Javascript files in the `testing-parse/js/gen/` directory. |
| `grunt build` | Shorthand to run `grunt typescript`. |
| `grunt` | Shorthand to run `grunt tslint`, `grunt build`, and `grunt jslint` in series. |
