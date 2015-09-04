# Apache Ant
Ant scripts are used to execute tasks on any environment, as long as the build-user.properties file is configured. All ant commands should be executed from the butterflies/prototype/flask_server/ project directory. Tasks can be added or modified in butterflies/prototype/flask_server/build.xml.

- `ant configure-properties` - Creates a build-user.properties file for the native operating system based on the build-user.properties.posix and build-user.properties.windows files. After this is done, the virtualenv.dir property must be modified to manually match the directory of the python virtual environment for the project.
- `ant pip-install` - Installs python dependencies on the virtual environment for the project (same as calling `pip install -r requirements_dev.txt`). Automatically calls `ant configure-properties`.
- `ant npm-install` - Installs NPM dependencies (same as calling `npm install` from butterflies/prototype/flask_server/grunt/) . Automatically calls `ant configure-properties`.
- `ant configure` - Automatically calls `ant pip-install` and `ant npm-install`.
- `ant compile-js` - Compiles, concatenates, and minifies javascript files (same as calling `grunt` from butterflies/prototype/flask_server/grunt/). Automatically calls `ant configure-properties`.
- `ant run` - Starts the webserver (same as calling `python run.py`). Automatically calls `ant compile-js`.
- `ant reset-db` - Resets the app.db file (same as calling `python configure_database.py`). Automatically calls `ant configure-properties`.
- `ant test` - Executes all python uni tests in the project using the nose library. Automatically calls `ant configure-properties`.


# NPM
NPM is the NodeJS package manager. All NPM commands should be executed from the butterflies/prototype/flask_server/grunt/ directory.

- `npm install` - Installs all NPM dependencies according to butterflies/prototype/flask_server/grunt/package.json.


# Pip
Pip is the python package manager. All pip commands should be executed from the butterflies/prototype/flask_server/ project directory with your virtual environment activated.

- `pip install -r requirements_dev.txt` - Installs python dependencies in the _active_ virtual environment according to butterflies/prototype/flask_server/requirements_dev.txt.
- `pip uninstall <package>` - Uninstall a python dependency from the _active_ virtual environment.
- `pip freeze` - List all installed python dependencies on the _active_ virtual environment.


# Grunt
Grunt scripts are used to execute javascript tasks. All grunt commands should be executed from the butterflies/prototype/flask_server/grunt/ directory. Tasks can be added or modified in butterflies/prototype/flask_server/grunt/Gruntfile.js.

- `grunt react` - Compiles ReactJS (.jsx) files according to butterflies/prototype/flask_server/grunt/Gruntfile.js.
- `grunt concat` - Concatenates javascript files according to butterflies/prototype/flask_server/grunt/Gruntfile.js.
- `grunt uglify` - Minifies javascript files according to butterflies/prototype/flask_server/grunt/Gruntfile.js.
- `grunt` - Automatically calls `grunt react`, `grunt concat`, and `grunt uglify`.


# Nosetests
Nose is a python library for executing unit tests.  All nosetests commands should be executed from the butterflies/prototype/flask_server/ project directory.

- `nosetests` - Executes all python unit tests in the project.


# Git
These are far from all possible git commands, but they are the primary commands used in a typical workflow. For more information on git, checkout [Using Git and GitHub](https://iastate.box.com/shared/static/v8j3uc6phm8453yad2behbk837gvkkgi.pdf).

- `git clone <repo_https>` - Create a local directory containing all of the files from the repository (along with a pre-configured remote to the repo named "origin").
- `git remote add <fork_remote_name> <fork_https>` - Add a remote to a fork.
- `git fetch origin` - Update references to the origin remote (should always be done before checking out a new branch).
- `git checkout origin/master -b <branch_name>` - Create a new local branch based from the master branch on the origin remote.
- `git pull origin master` - Update the current branch with all new commits from the master branch on the origin remote (use sparingly - can cause merge conflicts).
- `git add -A` - Add all modified file to the list of files to be included in the next commit ("staged" files).
- `git commit -m "<commit_message>"` - Create a new commit from the staged files.
- `git push <fork_remote_name> <branch_name>` - Push the current branch up to your fork. You must first setup the remote.
- `git stash` - "Stash" current modified files on a stack without committing them.
- `git stash pop` - Re-apply modified files from the top of the stack.
- `git branch` - List all local branches.
- `git checkout <branch_name>` - Switch to another local branch.
- `git branch -D <branch_name>` - Delete a local branch.
- `git log` - List all commit history on the current branch.
