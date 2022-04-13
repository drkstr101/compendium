.PHONY: ci clean setup lint test build start

SHELL := /bin/bash
PATH := ./node_modules/.bin:$(HOME)/bin:$(PATH)
MAKE := make
NX_BRANCH := dev

ci:
	$(MAKE) setup
	$(MAKE) lint
	$(MAKE) build
	$(MAKE) test

clean:
	yarn cache clean
	bit clear-cache
	rm -rf yarn.lock coverage/ tmp/ dist/ node_modules/ **/__snapshots__/
	rm .sourcebit-nextjs-cache.json

setup-bit:
	npm install --global @teambit/bvm
	bvm install
	bit config set analytics_reporting true
	bit config set interactive false
	bit config set no_warnings false
	bit config set error_reporting true

node_modules:
	bit install

setup:
	$(MAKE) setup-bit
	$(MAKE) node_modules

lint: node_modules
	nx format
	NX_BRANCH=$(NX_BRANCH) nx workspace-lint
	NX_BRANCH=$(NX_BRANCH) nx run-many --all --target lint --verbose
	stackbit validate

test: node_modules
	NX_BRANCH=$(NX_BRANCH) nx run-many --all --target test -u --coverage --verbose

build: node_modules
	NX_BRANCH=$(NX_BRANCH) nx run-many --all --target build --verbose

start: node_modules
	NX_BRANCH=$(NX_BRANCH) nx run-many --all --target serve --parallel

# Application targets
####

home: node_modules
	NX_BRANCH=$(NX_BRANCH) nx run home:build:production --verbose

blog: node_modules
	@echo 'TODO Not implemented.'
	exit 1

docs: node_modules
	@echo 'TODO Not implemented.'
	exit 1

expo: node_modules
	@echo 'TODO Not implemented.'
	exit 1


# Dev targets
####

depgraph: node_modules
	depcruise . \
		--config .dependency-cruiser.js  \
		--output-type dot \
		--output-to docs/depgraph.dot --prefix "https://github.com/drkstr101/molecular/blob/main/"
	cat docs/depgraph.dot | dot -T svg > docs/depgraph.svg.tmp
	mv docs/depgraph.svg.tmp docs/depgraph.svg

spectrum-css:
	nx workspace-generator spectrum-css theme-styles

copyright-headers:
	nx workspace-generator copyright-headers
