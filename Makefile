
#
# Binaries.
#

browserify = ./node_modules/.bin/browserify --development --copy
nodemon = ./node_modules/.bin/nodemon --harmony --quiet

#
# Default.
#

default: run

#
# Tasks.
#

# Remove non-checked-in dependencies.
clean:
	@rm -rf node_modules components

# Run the server in debug mode.
debug: node_modules
	@node debug --harmony server/server --development

# Run the server.
run: node_modules
	@node --harmony server/server

# Run the server with nodemon for development.
server: node_modules
	@$(nodemon) --watch server --watch server server/server --development

# Build client.
build: node_modules
	browserify client-react/client.js -o client-react/static/bundle.js -t [ babelify --presets [ es2015 react ] --plugins [ transform-runtime transform-object-rest-spread ] ]

#
# Targets.
#

node_modules: package.json
	@npm install
	@touch node_modules # make sure node_modules is last modified

#
# Phonies.
#

.PHONY: clean
.PHONY: debug
.PHONY: run
.PHONY: server
