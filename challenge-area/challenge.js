let fetchedResults;

fetch('https://opentdb.com/api.php?amount=10&category=18').then(res => res.json())
    .then(response => {
        fetchedResults = response.results;
        console.log('original results', fetchedResults);
        //1
        console.log(replaceQuotes([...fetchedResults]), 'Replaced quotes');
        //2
        console.log(filterQuestionsByDifficulty([...fetchedResults], 'easy'), 'Easy Questions');
        //3
        console.log(sortByProperty([...fetchedResults], 'difficulty'), 'Sort by difficulty');
        //4
        console.log(difficultyCounter([...fetchedResults]), 'Difficulty counter');
        //5
        console.log(hasScienceComputers([...fetchedResults]), 'Has Science: Computers');
        //6
        console.log(filterAndSort([...fetchedResults]), 'Filterd by medium and sorted on type');
    });


const replaceQuotes = results => {
    return results.map(obj => {
        return obj.question.replace(/&quot;/g, '"');
    });
};

const filterQuestionsByDifficulty = (results, difficultyLevel) => {
    return results.filter((obj) => obj.difficulty === difficultyLevel)
};

const cmpfn  = prop => {
    return (a,b) => a[prop] > b[prop];
};

//string sort by property name
const sortByProperty = (results, prop) => {
    return results.sort(cmpfn(prop));
};

//tried doing this with reducer but couldn't succeed.

const difficultyCounter = results => {
    return {
        easy: filterQuestionsByDifficulty(results, 'easy').length,
        medium: filterQuestionsByDifficulty(results, 'medium').length,
        hard: filterQuestionsByDifficulty(results, 'hard').length
    };
};


const hasScienceComputers = results => {
    return results.every(item => item.category === 'Science: Computers');
};

const filterAndSort = results => {
    const mediumDifficultyQuestions = filterQuestionsByDifficulty(results, 'medium');

    return sortByProperty(mediumDifficultyQuestions, 'type');

};

