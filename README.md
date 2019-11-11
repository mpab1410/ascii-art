# ascii-art
A CLI tool made in NodeJS that prints out images as ASCII art.

This was based on / heavily inspired by Robert Heaton's first project as part of his "Programming Projects for Advanced Beginners" series. You can find more info about Robert and his work here: https://robertheaton.com/

## Installing
Simply download this repo then build using `npm install -g`.

Note: If you are on Windows, it may be required that you run `npm link` once the CLI tool is installed.

## Usage
- BIG NOTE: You will most likely have to increase the size of your terminal to see the full image. It does scale down so that it will mostly fit the screen, but a lot of zooming out is most likely still required.
```
Usage: ascii-art [options] <path>

Options:
  -V, --version        output the version number
  -c, --color          color the ASCII image in the color of the original image. MAY TAKE A LONG TIME.
  -m, --method <type>  chooses what type of brightness index is used [average, lightness, luminosity] (default: "average")
  -i, --inverse        inverts the brightness index of the ASCII char. does not affect color
  -h, --help           output usage information
```

## Roadmap / Things to Add
- Add color inversion to the invert command
- Make this a library with a CLI included for usage in other NodeJS programs
- Add unit tests to ensure quality
- Publish to NPM

## Contributing
You can contribute to the project simply by forking this repo and submitting a pull request.

## Donation
You absolutely shouldn't donate for this piece of software, as it's stupid simple and is probably a good assignment for a freshman level intro to programming class, but if you have some money burning a hole in your pocket, this made your day or hour or whatever, and you would like to buy me a coffee, beer, etc., you can find my Ko-fi page here: https://ko-fi.com/mpab1410
Again, this is probably good practice for programming at home and doesn't really consitiute a donation, but if you do donate, thank you very much, I appreciate it!
