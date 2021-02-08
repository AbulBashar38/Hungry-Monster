function clickAction() {
    document.getElementById('mainDiv').innerHTML = '';
    document.getElementById('relatedItems').innerHTML = '';
    const catchInput = document.getElementById('input-info').value;
    if (catchInput.length == 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${catchInput}`)
            .then(res => res.json())
            .then(data => {
                showData(data, 'mainDiv');
            })
            .catch(error => {
                document.getElementById('mainDiv').innerText = 'Sorry there is no food by this letter'
            })
    }
    else if (catchInput.length > 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${catchInput}`)
            .then(res => res.json())
            .then(data => {
                showItems(data.meals[0], 'mainDiv');

            })
            .catch(error => {
                document.getElementById('mainDiv').innerText = 'Sorry there is no food by this name'
            })

        const firstLetter = catchInput.charAt(0);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('relatedParent').style.display = 'block';
                showData(data, 'relatedItems');
            })
            .catch(error => {
                document.getElementById('relatedItems').innerText = 'Sorry there is no related food by this name'
            })
    }
}

function showData(data, divId) {
    const allInformation = data.meals;
    allInformation.forEach(objectMeals => {
        showItems(objectMeals, divId);
    });
}
function showItems(object, divId) {
    const searchDiv = document.createElement('div');
    const foodPic = object.strMealThumb;
    const foodName = object.strMeal;
    searchDiv.innerHTML = `<img src="${foodPic}">;
            <h3>${foodName}</h3>`;
    const catchDiv = document.getElementById(divId);
    catchDiv.appendChild(searchDiv);
}