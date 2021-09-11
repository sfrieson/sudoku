.PHONY: all clean web-app
all: web

clean:
	rm -rf ./web/build

web-app: clean web/build web/build/index.html web/build/game
web/build:
	mkdir -p ./web/build

web/build/index.html: ./web/src/index.html
	cp ./web/src/index.html ./web/build/index.html

web/build/game:
	node_modules/.bin/tsc --project web --outDir web/build