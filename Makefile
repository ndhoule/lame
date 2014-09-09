NODE = $(shell which node)
NPM = $(shell which npm)
MOCHA = ./node_modules/.bin/mocha

TEST_DIR = ./test

MOCHA_COMMON_FLAGS = \
	--reporter spec \
	--ui bdd \
	--check-leaks \
	--compilers js:mocha-traceur \
	--require $(TEST_DIR)/config

test:
	@$(MOCHA) $(MOCHA_COMMON_FLAGS) "$(TEST_DIR)/**/*.test.js"

.PHONY: test
