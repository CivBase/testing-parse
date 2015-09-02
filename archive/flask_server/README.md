# Resources
### Development Tools
- [Ant](http://ant.apache.org/) - Environment-independent task automation tool
- [draw.io](https://www.draw.io/) - Flowchart and UML diagram creation web application
- [Git](http://git-scm.com/) - Version control system
- [PyCharm](https://www.jetbrains.com/pycharm/) - Python interactive development environment

##### CSS
- [Bootstrap](http://getbootstrap.com/) - CSS style framework

##### Javascript
- [GruntJS](http://gruntjs.com/) - Javascript task automation tool
- [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat) - Javascript concatenation plugin for grunt
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - Javascript minifier plugin for grunt
- [grunt-react](https://www.npmjs.com/package/grunt-react) - ReactJS compilation plugin for grunt
- [jQuery](http://jquery.com/) - Library for DOM querying and AJAX requests
- [NPM](https://www.npmjs.com/) - Javascript package manager (part of [NodeJS](http://nodejs.org/))
- [qUnit](http://qunitjs.com/) - Unit test framework for javascript
- [React](http://facebook.github.io/react/) - Library for data binding

##### Python
- [Flask](http://flask.pocoo.org/) - Web server library/framework
- [Flask-Assets](http://flask-assets.readthedocs.org/en/latest/) - Static web asset management library (with added flask support)
- [Flask-SQLAlchemy](http://pythonhosted.org/Flask-SQLAlchemy/) - Object-mapper library for SQL (with added flask support)
- [Flask-WebTest](https://flask-webtest.readthedocs.org/en/latest/) - Unit test tools for web applications (with added flask support)
- [Flask-WTF](https://flask-wtf.readthedocs.org/en/latest/) - Automated form generation and validation library (with added flask support)
- [Jinja2](http://jinja.pocoo.org/docs/dev/) - HTML templating language for python (built into flask)
- [Mock](http://www.voidspace.org.uk/python/mock/) - Extremely useful unit test tools
- [Nose](https://nose.readthedocs.org/en/latest/) - Unit test framework for python
- [pip](https://pip.pypa.io/en/latest/) - Python package manager
- [SQLAlchemy](http://www.sqlalchemy.org/) - Object-mapper library for SQL
- [Webassets](https://webassets.readthedocs.org/en/latest/) - Static web asset management library
- [WebTest](http://webtest.readthedocs.org/en/latest/) - Unit test tools for web applications
- [WTForms](https://wtforms.readthedocs.org/en/latest/) - Automated form generation and validation library
- [WTForms-Components](https://wtforms-components.readthedocs.org/en/latest/) - Extended functionality for WTForms

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
- Check that everything works by starting the server with `ant run`

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
4. Right-click on the butterflies/prototype/flask_server directory in the file tree and select Mark Directory As > Sources Root from the context menu. This tells PyCharm to treat it as the root directory for python imports. You may also mark the butterflies/prototype/flask_server/app/templates directory as a Template directory from the Project Structure section of the settings/perefrences dialog.

### Requirements
1. With your virtualenv activated, navigate to the butterflies/prototype/flask_server directory.
2. Install all pip and npm requirements with `ant configure`. If you do not have a build-user.properties file already, this will create one for you. You will need to change the virtualenv.dir value to match the path to your project virtual environment (e.g. ~/virtualenvs/butterflies).
3. If the ant script fails, it is likely that your virtual environment directory is not correct in your build-user.properties file. Alternative, you may not have all necessary paths added to your "Path" system environment variable.


# Execution
1. With your virtualenv activated, navigate to the butterflies/prototype/flask_server directory.
2. To start the server, simply use the `ant run` command. This compiles some javascript files before starting the server by executing `python run.py`, but you can manually compile them any time with `ant compile-js`.
3. Before the database can be used, it must be configured while the server is active (`ant reset-db` or `python configure_database.py`). This will reset all database contents.
4. Database model instances can be accessed from the shell (`python shell.py`) while the server is running.


# Contributing
1. Do not push directly to the repository. Instead, create a fork using the "Fork" button at the top-right of the repository page.
2. Add the fork to your local workspace by navigating to the project directory and using the command `git remote add <fork_name> <fork_https>`. The fork name can be anything, but I prefer to use my own name. By using names, I can easily add remotes to access other forks and easily distinguish between them. The fork https url can be found on the fork's GitHub page.
3. Use `git push <fork_name> <branch_name>` to push branches to your fork. From there, you can create a pull request onto master in the "origin" repository. This allows us to review contributions and keep track of all changes.


# Project Structure
- This prototype is based on a [project structure from mitsuhiko](https://github.com/mitsuhiko/flask/wiki/Large-app-how-to). Check it out for more details.
- All code used by this prototype should conform to [pep8 standards](https://www.python.org/dev/peps/pep-0008/). It seems trivial, but formatting standards make large-scale development much easier, so please try to adhere to it. PyCharm will automatically notify you of any lines which do not adhere to pep8 standards in the bar on the right of the editor.
