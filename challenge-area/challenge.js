let fetchedResults;

const fetchTrviaQuestions = () => {
    let triviaUrl = 'https://opentdb.com/api.php?amount=10&category=18';

    fetch(triviaUrl).then(res => res.json())
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

            console.log(difficultyCounterTest([...fetchedResults]), 'difficulty counter test');

            console.log(difficultyCounterWithReduce([...fetchedResults]), 'difficulty counter with reduce');
        });
};

fetchTrviaQuestions();


const replaceQuotes = results => {
    return results.map(obj => {
        let objCopy = {...obj};

        objCopy.question = objCopy.question.replace(/&quot;/g, '"');
        return objCopy;
    });
};

const filterQuestionsByDifficulty = (results, difficultyLevel='easy') => {
    return results.filter(obj => obj.difficulty === difficultyLevel);
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

//this one is better than the first approach, I'll iterate on this and see if I can make it work for reduce
const difficultyCounterTest = results => {
    let initialObj = {
        easy:0,
        medium: 0,
        hard: 0
    };
    results.forEach(result => {
        switch(result.difficulty) {
            case 'easy': initialObj.easy++;
                break;

            case 'medium': initialObj.medium++;
                break;

            case 'hard': initialObj.hard++;
                break;

            default: break;
        }
    });

    return initialObj;
};


const difficultyCounterWithReduce = results => {
    let initialObj = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    results.reduce((accum = initialObj, result) => {
        switch (result.difficulty) {
            case 'easy': initialObj.easy++;
                break;

            case 'medium': initialObj.medium++;
                break;

            case 'hard': initialObj.hard++;
                break;

            default: break;
        }
    }, initialObj);

    return initialObj;
};

const hasScienceComputers = results => {
    return results.every(item => item.category === 'Science: Computers');
};

const filterAndSort = results => {
    const mediumDifficultyQuestions = filterQuestionsByDifficulty(results, 'medium');

    return sortByProperty(mediumDifficultyQuestions, 'type');

};

