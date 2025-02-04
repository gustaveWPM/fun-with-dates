.PHONY: all install test coverage coverage-all initialize clean-node-modules clean-coverage-report clean fclean re re-using-pm-cache

MAKEFLAGS += --silent

PM := pnpm

NODE_MODULES := node_modules

COVERAGE_GENERATED_REPORT := coverage

# @Mirror
%:
	$(PM) run "$@"

# @Default
all: build

# @Mirror
install:
	$(PM) install

# @Mirror
build:
	$(PM) run build

# @Override
test: initialize
	$(PM) run test:run

# @Override
coverage: initialize
	$(PM) run coverage

# @Override
coverage-all: initialize
	$(PM) run coverage

initialize: install

clean-node-modules:
	find . -type d -name "$(NODE_MODULES)" -exec rm -rf {} +

clean-coverage-report:
	$(PM) rimraf $(COVERAGE_GENERATED_REPORT)

clean: clean-coverage-report

fclean: clean clean-node-modules

re: fclean install build

re-using-pm-cache: clean build
