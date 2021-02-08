function clickAction() {
    document.getElementById('relatedItems').innerHTML = '';
    document.getElementById('1LetterFood').innerText = '';
    document.getElementById('moreLetterFood').innerText = '';
    document.getElementById('detailsParent').style.display = 'none'

    const catchInput = document.getElementById('input-info').value;
    if (catchInput.length == 0) {
        document.getElementById('singleLetterParent').style.display = 'none';
        document.getElementById('searchFood').style.display = 'none';
        document.getElementById('relatedParent').style.display = 'none';
        document.getElementById('empty-input').style.display = 'block';

    }
    //when someone search by one letter then it will work.
    else if (catchInput.length == 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${catchInput}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('singleLetterParent').style.display = 'block';
                document.getElementById('searchFood').style.display = 'none';
                document.getElementById('relatedParent').style.display = 'none';
                document.getElementById('empty-input').style.display = 'none';
                showData(data, '1LetterFood');
            })
            .catch(error => {
                document.getElementById('1LetterFood').innerText = 'Sorry there is no food by this letter'
            })
    }
    //When someone searches by food name, it will show the food and below it will show other food according to the first letter of the food name.

    else if (catchInput.length > 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${catchInput}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('searchFood').style.display = 'block';
                document.getElementById('singleLetterParent').style.display = 'none';
                document.getElementById('empty-input').style.display = 'none';
                showItems(data.meals[0], 'moreLetterFood');
            })

            //If the food name does not match then a message will be shown but other food will be shown below according to the first letter of the wrong name.

            .catch(error => {
                document.getElementById('moreLetterFood').innerText = 'Sorry there is no food by this name'
            })

        const firstLetter = catchInput.charAt(0);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
            .then(res => res.json())
            .then(data => {

                document.getElementById('relatedParent').style.display = 'block';
                document.getElementById('empty-input').style.display = 'none';
                showData(data, 'relatedItems');
            })
            .catch(error => {
                document.getElementById('relatedItems').innerText = 'Sorry there is no related food by this name'
            })
    }
}

const showData = (data, divId) => {
    const allInformation = data.meals;
    allInformation.forEach(objectMeals => {
        showItems(objectMeals, divId);
    });
}
const showItems = (object, divId) => {
    const searchDiv = document.createElement('div');
    const foodPic = object.strMealThumb;
    const foodName = object.strMeal;

    const onlyIngredient1 = object.strIngredient1;
    const onlyIngredient2 = object.strIngredient2;
    const onlyIngredient3 = object.strIngredient3;
    const onlyIngredient4 = object.strIngredient4;
    const onlyIngredient5 = object.strIngredient5;

    const onlyMeasure1 = object.strMeasure1;
    const onlyMeasure2 = object.strMeasure2;
    const onlyMeasure3 = object.strMeasure3;
    const onlyMeasure4 = object.strMeasure4;
    const onlyMeasure5 = object.strMeasure5;

    const fullIngredient1 = `${onlyMeasure1} ${onlyIngredient1}`
    const fullIngredient2 = `${onlyMeasure2} ${onlyIngredient2}`
    const fullIngredient3 = `${onlyMeasure3} ${onlyIngredient3}`
    const fullIngredient4 = `${onlyMeasure4} ${onlyIngredient4}`
    const fullIngredient5 = `${onlyMeasure5} ${onlyIngredient5}`


    searchDiv.innerHTML = `<img onclick= "foodDetails('${foodPic}', '${fullIngredient1}', '${fullIngredient2}', '${fullIngredient3}', '${fullIngredient4}', '${fullIngredient5}')" src="${foodPic}">
            <h3>${foodName}</h3>`;
    const catchDiv = document.getElementById(divId);
    catchDiv.appendChild(searchDiv);
}
const foodDetails = (imgUrl, Ingredient1, Ingredient2, Ingredient3, Ingredient4, Ingredient5) => {
    document.getElementById('detailsParent').style.display = 'block'
    document.getElementById('showDetails').innerHTML = '';
    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = `
    <img src="${imgUrl}">
    <h3>Ingredient</h3>
    <ul>
    <li>${Ingredient1}</li>
    <li>${Ingredient2}</li>
    <li>${Ingredient3}</li>
    <li>${Ingredient4}</li>
    <li>${Ingredient5}</li>
    </ul>
    `
    document.getElementById('showDetails').appendChild(detailsDiv);
}