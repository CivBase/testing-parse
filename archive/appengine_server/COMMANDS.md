# Apache Ant
Ant scripts are used to execute tasks on any environment, as long as the build-user.properties file is configured. All ant commands should be executed from the butterflies/prototype/appengine_server/ project directory. Tasks can be added or modified in butterflies/prototype/appengine_server/build.xml.

- `ant configure-properties` - Creates a build-user.properties file for the native operating system based on the build-user.properties.posix and build-user.properties.windows files. After this is done, the virtualenv.dir property must be modified to manually match the directory of the python virtual environment for the project.
- `ant pip-install` - Installs python dependencies on the virtual environment for the project (this is __NOT__ the same as calling `pip install -r requirements.txt`). Automatically calls `ant configure-properties`.
- `ant npm-install` - Installs NPM dependencies (same as calling `npm install` from butterflies/prototype/appengine_server/grunt/) . Automatically calls `ant configure-properties`.
- `ant configure` - Automatically calls `ant pip-install` and `ant npm-install`.
- `ant compile-js` - Compiles, concatenates, and minifies javascript files (same as calling `grunt` from butterflies/prototype/appengine_server/grunt/). Automatically calls `ant configure-properties`.


# NPM
NPM is the NodeJS package manager. All NPM commands should be executed from the butterflies/prototype/appengine_server/grunt/ directory.

- `npm install` - Installs all NPM dependencies according to butterflies/prototype/appengine_server/grunt/package.json.


# Pip
Pip is the python package manager. All pip commands should be executed from the butterflies/prototype/appengine_server/src/ project directory with your virtual environment activated.

- `pip install -r requirements_dev.txt` - Installs python dependencies in the _active_ virtual environment according to butterflies/prototype/appengine_server/requirements_dev.txt. This is NOT the same as the `ant pip-install` command.
- `pip uninstall <package>` - Uninstall a python dependency from the _active_ virtual environment.
- `pip freeze` - List all installed python dependencies on the _active_ virtual environment.


# Grunt
Grunt scripts are used to execute javascript tasks. All grunt commands should be executed from the butterflies/prototype/appengine_server/grunt/ directory. Tasks can be added or modified in butterflies/prototype/appengine_server/grunt/Gruntfile.js.

- `grunt concat` - Concatenates javascript files according to butterflies/prototype/appengine_server/grunt/Gruntfile.js.
- `grunt uglify` - Minifies javascript files according to butterflies/prototype/appengine_server/grunt/Gruntfile.js.
- `grunt` - Automatically calls `grunt react`, `grunt concat`, and `grunt uglify`.


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
