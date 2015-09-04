# Resources
### Development Tools
- [Ant](http://ant.apache.org/) - Environment-independent task automation tool
- [AppScale](http://www.appscale.com/) - Cluster management environment which allows for App Engine applications to be deployed outside of Google Cloud
- [draw.io](https://www.draw.io/) - Flowchart and UML diagram creation web application
- [Git](http://git-scm.com/) - Version control system
- [PyCharm](https://www.jetbrains.com/pycharm/) - Python interactive development environment

##### CSS
- [Bootstrap](http://getbootstrap.com/) - CSS style framework

##### Javascript
- [Angular](https://angularjs.org/) - Framework for data binding and other such nonsense (will not be used by UBR)
- [GruntJS](http://gruntjs.com/) - Javascript task automation tool
- [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat) - Javascript concatenation plugin for grunt
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - Javascript minifier plugin for grunt
- [jQuery](http://jquery.com/) - Library for DOM querying and AJAX requests
- [NPM](https://www.npmjs.com/) - Javascript package manager (part of [NodeJS](http://nodejs.org/))
- [qUnit](http://qunitjs.com/) - Unit test framework for javascript

##### Python
- [db/ndb](https://cloud.google.com/appengine/docs/python/ndb/) - Object-relational mapping library (part of GAE)
- [Google App Engine](https://cloud.google.com/appengine/docs/python/) - Web server library/framework/wayoflife
- [Jinja2](http://jinja.pocoo.org/docs/dev/) - HTML templating language for python (built into flask)
- [Mock](http://www.voidspace.org.uk/python/mock/) - Extremely useful unit test tools
- [Nose](https://nose.readthedocs.org/en/latest/) - Unit test framework for python
- [pip](https://pip.pypa.io/en/latest/) - Python package manager
- [Voluptuous](https://pypi.python.org/pypi/voluptuous/0.8.7) - Schema validation library
- [Webapp2](https://webapp-improved.appspot.com/) - Web application routing library (an extension to GAE's webapp library)
- [WebTest](http://webtest.readthedocs.org/en/latest/) - Unit test tools for web applications

### Want More Help?
- [Codecademy: HTML and CSS](http://www.codecademy.com/en/tracks/web)
- [Codecademy: Javascript](http://www.codecademy.com/en/tracks/javascript)
- [Codecademy: jQuery](http://www.codecademy.com/en/tracks/jquery)
- [Codecademy: Python](http://www.codecademy.com/en/tracks/python)
- [GitHub Training](https://training.github.com/kit/)
- [Using Git and GitHub](https://iastate.box.com/shared/static/v8j3uc6phm8453yad2behbk837gvkkgi.pdf)
- [W3C: General Web Development](http://www.w3schools.com/)


# Configuration
### Setup Checklist
- Install Git
- Install JDK (add JAVA_HOME environment variable)
- Install Python 2.X and pip (add both to system path)
- Install NodeJS and npm
- Install Apache Ant (add ANT_HOME environment variable)
- Install virtualenv (with pip)
- Install PyCharm
- Clone repository
- Configure git user.name and user.email
- Create a virtualenv for the project
- Configure PyCharm project settings (select interpreter and sources root)
- Activate environment, cd to project, and run `ant configure` (should fail)
- Modify virtualenv.dir property in build-user.properties to match your virtualenv path
- Run `ant configure` one more time (should pass)
- Check that everything works by starting the server with the App Engine Launcher software

### Git Setup
1. Download and install Git from [here](http://git-scm.com/downloads). Make sure you allow the installer to add Git to your system path!
2. Open Git Bash and navigate to the directory where you want your project directory to be located (I recommend ~/workspace) and clone the repository with `git clone https://github.com/CivBase/butterflies.git` or `git clone git@github.com:CivBase/butterflies.git` if you  have SSH key set up. Setting up SSH keys will allow you to avoid typing in your password every time you push/pull, but it is not necessary.
3. From within your project directory (e.g. ~/workspace/butterflies) configure Git to use the correct user with `git config user.name <username>` and `git config user.email <email>`. Be sure to use the same username and email as you use for your GitHub account.
4. Check out my [Using Git and GitHub](https://drive.google.com/a/iastate.edu/file/d/0B46XQUsoCZSwRDFpVGRuaHNwV1U/view) instructions for more information.
5. Check out COMMANDS.md for more information on git commands.

### Python and Virtualenv Setup
1. If you're on Windows, install [Git](http://git-scm.com/downloads) first. I have found that Git's Git Bash terminal is much easier and more convenient than Command Prompt or Power Shell because of its Git, virtualenv, and bash support. All of my Windows instructions depend on you using Git Bash, so you may need to get creative otherwise.
2. Download and install Python 2.7 from [here](https://www.python.org/downloads/). It is important to get Python 2.7 and not Python 3.4.
3. Download and install the python package manager "pip" from [here](https://pip.pypa.io/en/latest/installing.html). If you have Python 2.7.9 or higher, pip will already be installed with python and this step can be skipped.
4. Add python and pip to your "Path" system environment variable. On Windows, open the system environment variables dialog and, for a standard Python 2.7.9 installation, you can just append `;C:\Python27\;C:\Python27\Scripts` to the end of the existing value (restart any terminals for it to take effect). On a UNIX machine, just add the lines `export PATH="/Library/Frameworks/Python.framework/Versions/2.7/bin:$PATH"` and `export PATH="/Library/Frameworks/Python.framework/Versions/2.7/bin/pip:$PATH"` to your ~/.bash_profile file (restart any terminals for it to take effect).
5. Install the virtualenv package using `pip install virtualenv`. This package allows you to create virtual environments, which make package management between projects easy. Without an active virtual environment, your python packages are added to your base system installation of python, which is messy and dangerous on Linux machines. For more on virtualenv, [check this out](http://docs.python-guide.org/en/latest/dev/virtualenvs/).
6. Create a virtualenv directory (I recommend ~/virtualenvs) and, from within that directory, create a new virtual environment for this project with `virtualenv butterflies`. Activate the new environment from this directory with `source butterflies/bin/activate` or `source butterflies/Scripts/activate` on Windows. Always make sure your environment is activated when installing packages (`pip install <package_name>` or `pip install -r <file>` when installing from a text file). The virtual environment can be deactivated any time with `deactivate`.
7. Check out COMMANDS.md for more information on python and pip commands.

On a UNIX machine, I recommend putting an alias like this in your ~/.bash_profile file so that you can activate your virtualenv from anywhere with the `butterflies` command.

    alias butterflies="cd ~/workspace/butterflies && source ~/virtualenvs/butterflies/bin/activate"

For Windows users, you can do something similar by creating the file ~/butterflies.bat and adding the below code. Activate it from anywhere with `source ~/butterflies.bat` in Git Bash.

    source ~/virtualenvs/butterflies/Scripts/activate
    cd ~/workspace/butterflies

### NodeJS Setup
1. Download and install NodeJS from [here](http://nodejs.org/download/). This comes with the "NPM" package manager which we will use to install the [GruntJS](http://gruntjs.com/) javascript task tool. Make sure you allow the installer to add NPM to your system path!
2. That's pretty much it. Really. This part is done.
3. Check out COMMANDS.md for more information on npm commands.

### Apache Ant Setup
1. Download Apache Ant from [here](http://ant.apache.org/bindownload.cgi). Yah, I know, all they have are zip files - no fancy installer binary. You can unzip it and put it anywhere you want, but I recommend Program Files for Windows or your home directory for a UNIX machine.
2. Append the path to the apache-ant/bin/ directory to your "Path" system environment variable (e.g. `;C:\Program Files\apache-ant\bin`).
3. In addition to modifying "Path", you'll need to add two new system environment variables: ANT_HOME and JAVA_HOME. The ANT_HOME variable should simply be set to the path of the root apache-ant/ directory that you downloaded and unzipped (e.g. `C:\Program Files\apache-ant`). JAVA_HOME should be your root JDK directory (e.g. `C:\Program Files\Java\jdk1.6.0_02`).
4. Check out COMMANDS.md for more information on ant commands.

### Environment Variables Review
When all setup is complete, your "Path" system environment variable should have something like this appended to the end. Don't forget about setting the JAVA_HOME and ANT_HOME variables as well.

    ;C:\Program Files (x86)\Git\cmd;C:\Python27\;C:\Python27\Scripts;C:\Program Files\nodejs\;C:\Program Files\apache-ant\bin

On a UNIX machine, you can accomplish the same effect by editing your ~/.bash_profile to have `export PATH="/path/to/dir:$PATH"` for each required path. The path locations will very by machine. Similarly, JAVA_HOME and ANT_HOME can be added to ~/.bash_profile with `export JAVA_HOME=/path/to/java/home` and `export ANT_HOME = /path/to/ant/home`. The final additions to ~/.bash_profile should look something like the below code.

    export PATH="/Users/<username>/apache-ant/bin:$PATH"
    export PATH="/Library/Frameworks/Python.framework/Versions/<version>/bin:$PATH"
    export PATH="/Library/Frameworks/Python.framework/Versions/<version>/bin/pip:$PATH"
    export PATH="/Library/Java/JavaVirtualMachines/jdk<version>.jdk:$PATH"
    
    export ANT_HOME="/Users/<username>/apache-ant"
    export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk<version>.jdk/Contents/Home"
    
    alias butterflies="cd ~/workspace/butterflies && source ~/virtualenvs/butterflies/bin/activate"

### PyCharm Setup
1. Download and install the [PyCharm](https://www.jetbrains.com/pycharm/) IDE. The professional version is available for university students for free. You can choose to use another development environment, but I've found this to be the best tool for Python development.
2. Open the workspace directory (e.g. ~/workspace/butterflies) as a new project.
3. Open the preferences/settings window and choose your python interpreter. Make sure you have select your virtual environment's python binary (e.g. ~/virtualenvs/butterflies/bin/python2.7 on UNIX machines) - not the default system one.
4. Right-click on the butterflies/prototype/appengine_server/src directory in the file tree and select Mark Directory As > Sources Root from the context menu. This tells PyCharm to treat it as the root directory for python imports. You may also mark the butterflies/prototype/appengine_server/src/angular/views directory as a Template directory from the Project Structure section of the settings/preferences dialog.

### Requirements
1. With your virtualenv activated, navigate to the butterflies/prototype/appengine_server directory.
2. Install all pip and npm requirements with `ant configure`. If you do not have a build-user.properties file already, this will create one for you. You will need to change the virtualenv.dir value to match the path to your project virtual environment (e.g. ~/virtualenvs/butterflies).
3. If the ant script fails, it is likely that your virtual environment directory is not correct in your build-user.properties file. Alternative, you may not have all necessary paths added to your "Path" system environment variable.

### AppScale
1. You probably want to setup a cluster of VMs on VirtualBox to try out this server. For that, follow [these instructions](https://github.com/AppScale/appscale/wiki/AppScale-on-VirtualBox). If you really want to, you can also use Amazon EC2 machines, Google Compute Engine, Eucalyptus, OpenStack, or your own cluster (just check [this page](http://www.appscale.com/get-started/) out).
2. I might try to add more detailed instructions here later, but I'm not super familiar with the setup. It seems like it is definitely easier on Unix environments, so you may want to do all this on a Linux machine or VM. Also, quick note: for OSX I had to install ssh-copy-id using `brew install ssh-copy-id`. If you're using OSX and you don't have Homebrew, I don't want to speak to you anymore.

### Google App Engine
1. Download and install the Google App Engine SDK form [here](https://cloud.google.com/appengine/downloads).
2. Startup the newly-installed App Engine Launcher application and click the add button (plus icon in the bottom left).
3. Choose the butterflies/prototype/appengine_server/src directory and click the "Create" button to add it to your list (it is named disco-biscuit).


# Execution
1. With your virtualenv activated, navigate to the butterflies/prototype/appengine_server directory.
2. To set stuff up, use the `ant configure` command to make sure you have all of the most up-to-date requirements and the `ant compile` command compile the javascript. The database will automatically be configured when the application is launched.
3. Open the App Engine Launcher, select the disco-biscuit application and then click the big green "Run" button in the top left of the window.
4. Click the "Browse" button at the top of the launcher window to open the app in your default browser (or just manually type in the link like a real man).


# Contributing
1. Do not push directly to the repository. Instead, create a fork using the "Fork" button at the top-right of the repository page.
2. Add the fork to your local workspace by navigating to the project directory and using the command `git remote add <fork_name> <fork_https>`. The fork name can be anything, but I prefer to use my own name. By using names, I can easily add remotes to access other forks and easily distinguish between them. The fork https url can be found on the fork's GitHub page.
3. Use `git push <fork_name> <branch_name>` to push branches to your fork. From there, you can create a pull request onto master in the "origin" repository. This allows us to review contributions and keep track of all changes.


# Project Structure
Honestly, the structure of this project is a bit of a mess. It was designed around angular, which we will not be using in the final version. Still, it allows us to verify that the basic App Engine setup is working with AppScale. As a result, I probably wont ever fill out most of the "TODO" sections below. If you want to know more, just talk to me and I'll try to tell you what's up with it all.

### File Structure
TODO: libraries
TODO: api / view_handlers
TODO: angular

### Formatting
- All code used by this prototype should conform to [pep8 standards](https://www.python.org/dev/peps/pep-0008/). It seems trivial, but formatting standards make large-scale development much easier, so please try to adhere to it. PyCharm will automatically notify you of any lines which do not adhere to pep8 standards in the bar on the right of the editor.
TODO: epydoc
TODO: jshint and jslint

### API Components
Server logic is organized into components to help minimize coupling. Each component is, for the most part, self-contained and only a few aspects can safely be accessed by other components. Each component is a python package which is usually divided into APIs, handlers, internals, models, services, constants, and urls. They are usually focused around interacting with the models hosted by the package, although some components provide unique functions which are unrelated to the database.

- **APIs** consist of useful functions, many of which allow for interaction with database models hosted by the component.
- **Handlers** provide logic for rest endpoints, which provide access to models via HTTP requests. Handlers should not be accessed from outside the component.
- **Internals** consist of useful functions which should not be accessed outside of the component, but may be used frequently within it.
- **Models** define the structure of models in the database. These models should only consist of attributes; logic related to the models should be reserved for APIs and internals. Models instances should not be accessed from outside the component, although they may be imported for the sake of class access (namely type checking).
- **Services** provide logic for internal endpoints which may be utilized by repeated cron tasks. Services should not be accessed from outside the component.
- **Constants** define constant values used within the component to allow for easy modification.
- **URLs** define webapp routes for handlers and services provided by the component. These endpoints are compiled by app.py before the webapp is initialized.

### REST Handlers
TODO: core focuses of rest
TODO: schema
TODO: rest rules
TODO: interfaces
TODO: handlers

### Database
TODO: ndb only
TODO: gae refs

### Angular
TODO: views
TODO: controllers
TODO: directives
TODO: services
TODO: angular refs
