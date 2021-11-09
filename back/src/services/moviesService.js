const csv = require('csv-parser');
const fs = require('fs');
const fileName = 'movies.csv';
const results = [];

(function() {
    fs.createReadStream(fileName)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => console.log(`Parsed! ${fileName}`));
})()


const filterMovies = async ({year, genre}) => {
    let temp = results;
    if (year !== undefined) {
        temp = temp.filter((el) => el.year.trim() === year);
    }
    if (genre !== undefined) {
        genre = genre.toLowerCase();
        temp = temp.filter((el) => 
            el.genre1.toLowerCase().includes(genre) || 
            el.genre2.toLowerCase().includes(genre)
        );
    }
    return temp;
}

module.exports = {
    filterMovies,
};

