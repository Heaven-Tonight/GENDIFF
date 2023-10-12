install:
	install-deps
	npx simple-git-hooks

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test