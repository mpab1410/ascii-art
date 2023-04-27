#!/usr/bin/env node
const Jimp = require('jimp');
const chalk = require('chalk');
const program = require('commander');
const proc = require('child_process');

// options: help, color, method, invert

program.version('0.0.1');
program
    .arguments('<path>')
    .option('-c, --color', 'color the ASCII image in the color of the original image. MAY TAKE A LONG TIME.')
    .option('-m, --method <type>', 'chooses what type of brightness index is used [average, lightness, luminosity]', 'average')
    .option('-i, --inverse', 'inverts the brightness index of the ASCII char. does not affect color')
    .action(async (path, options) => {
        try {
            proc.exec(options.method);
            let asciiImage = await imgToAscii(path, options.method, options.color, options.inverse);
            console.log(asciiImage);
        } catch (err) {
            console.error(`Error converting image: ${err}`);
            process.exit(1);
        }
    })
    .parse(process.argv);

function getBrightness(type, r, g, b) {
    let value = 0;
    switch(type) {
        case 'lightness':
            value = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
        case 'luminosity':
            value = (0.21 * r) + (0.72 * g) + (0.07 * b);
        default:
            value = (r + g + b) / 3;
    }
    return Math.floor(value);
}

function convertToMappedChar(n) {
    return "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$".charAt(Math.floor((64 * n) / 255));
}

function imgToAscii(imagePath, method, color, inverse) {
    let regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    let path = regex.test(imagePath) ? imagePath : require('path').resolve(imagePath);
    
    return new Promise((resolve, reject) => {
        Jimp.read(path).then(image => {
            // scale image down to somewhat fit on a terminal once the terminal is bigger
            while(image.getWidth() > 250) {
                image.scale(250 / image.getWidth());
            }
            while(image.getHeight() > 100) {
                image.scale(100 / image.getHeight());
            }
    
            let height = image.getHeight();
            let width = image.getWidth();
            
            // store the image in a string
            let asciiImage = "";
            for(let i = 0; i < height; i++) {
                let row = ""; // collect each row of the image pixel by pixel
                for(let j = 0; j < width; j++) {
                    let { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(j, i)); // they do width x height in this calc, no clue why
                    let brightness = getBrightness(method, r, g, b); // calculate a brightness index
                    let asciiChar = convertToMappedChar(inverse ? 255 - brightness : brightness); // convert the index to an ASCII char
                    if(color) {
                        asciiChar = chalk.rgb(r, g, b)(asciiChar)
                    }
                    // print ASCII char three times to make it seem accurate for width
                    for(let k = 0; k < 3; k++) row += asciiChar;
                }
                row += '\n';
                asciiImage += row;
            }
            
            resolve(asciiImage);
    
        }).catch(err => reject(err));
    });
}
