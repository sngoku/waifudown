const fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const randomize = require('randomatic');

async function downloadImage(type = 'nsfw', category = 'waifu', path = Path.resolve(__dirname, 'images')) {
    defaultPath = Path.join(path, type, category);

    const url = 'https://waifu.vercel.app/' + type + '/' + category;


    if (!fs.existsSync(defaultPath)) {

        fs.mkdirSync(defaultPath, { recursive: true });

    }


    const imgPath = Path.join(defaultPath, randomize('0', 8) + '.jpg');

    const img = await Axios({
        url,
        method: 'get',
        responseType: 'stream'
    })

    try {

        const writer = fs.createWriteStream(imgPath);

        img.data.pipe(writer);

        return new Promise((resolve, reject) => {

            writer.on('finish', resolve);

            writer.on('error', reject);

        }).catch(err => 
            {console.log(err);
        });

    } catch (error) {

        console.log(error);

    }

}

function downloadManyImages(numberOfImage = 1, type, category, path) {
    for (let i = 0; i < numberOfImage; i++) {
        downloadImage(type, category, path);
    }

}

//Enter as many images as you want followed by a ","  then type and then the category and finally the path (all optional 
//but if you want to pass any options you should include the options that came before)
//Example:
// downloadManyImages(3,'nsfw','waifu','c:/Users/administrator/Desktop');

downloadManyImages(5);