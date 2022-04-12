.PHONY: setup clean lint test build start docs home

SHELL := /bin/bash
PATH := ./node_modules/.bin:$(HOME)/bin:$(PATH)
MAKE := make

ci:
	$(MAKE) setup
	$(MAKE) format
	$(MAKE) lint
	$(MAKE) test
	$(MAKE) build

clean:
	nx reset

	rm -rf yarn.lock \
		coverage/ \
		dist/ \
		public/ \
		node_modules/ \
		**/__snapshots__/ \
		apps/**/.cache/
	rm -rf ./.bit/

	yarn cache clean
	bit clear-cache

bit-init:
	npm install --global @teambit/bvm
	bvm install
	bit config set analytics_reporting true
	bit config set interactive false
	bit init --harmony

node_modules:
	bit install

bit-build: node_modules
	bit compile
	bit build --log=info

setup:
	$(MAKE) bit-init
	$(MAKE) node_modules

lint: node_modules
	nx run-many --all --target lint

test: node_modules
	nx run-many --all --target test

build: node_modules
	nx run-many --all --target build --verbose

start: node_modules
	nx run-many --all --target serve --parallel

home: node_modules
	nx run home:build:production --verbose --skip-nx-cache

docs/depgraph.dot: node_modules
	depcruise . \
		--config .dependency-cruiser.js  \
		--output-type dot \
		--output-to docs/depgraph.dot \
		--prefix "https://github.com/drkstr101/compendium/blob/main/"

docs/depgraph.svg: docs/depgraph.dot
	cat docs/depgraph.dot | dot -T svg > docs/depgraph.svg.tmp
	mv docs/depgraph.svg.tmp docs/depgraph.svg



