$(document).ready(function() {
    // Array to store values
    let arr = [];
    let arrEasy = [];
    let arrMedium = [];
    let arrHard = [];
    

    // Fetch the data strored in database in the JSON format
    $.getJSON('https://memory-card-game-5db8e.firebaseio.com/.json', function(a) {
        //Pushing Values in Array
        for(let key in a) {
            arr.push(a[key]);
        }

        //Pushing Values in Easy Array
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].level === 'Easy') {
                arrEasy.push(arr[i]);
            }
        }

        //Puhing Values in Medium Array
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].level === 'Medium') {
                arrMedium.push(arr[i]);
            }
        }

        //Pushing Values in hard array
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].level === 'Hard') {
                arrHard.push(arr[i]);
            }
        }

        // Sorting Easy Array
        arrEasy.sort((a,b) => {
            return a.time > b.time;
        });

        //Sorting Medium Array
        arrMedium.sort((a,b) => {
            return a.time > b.time;
        });


        //Sorting Hard Array
        arrHard.sort((a,b) => {
            return a.time > b.time;
        });

        // Appending Fetcehd data to Easy LeaderBoard Table
        if(arrEasy.length >= 5){
            for(let i = 0; i < 5; i++) {
                $('#easy-tbody').append(`<tr><td>${arrEasy[i].name}</td><td>${arrEasy[i].stars}</td><td>${arrEasy[i].time}</td><td>${arrEasy[i].level}</td></tr>`);
            }
        } else if(arrEasy.length < 5) {
            for(let i = 0; i < arrEasy.length; i++) {
                $('#easy-tbody').append(`<tr><td>${arrEasy[i].name}</td><td>${arrEasy[i].stars}</td><td>${arrEasy[i].time}</td><td>${arrEasy[i].level}</td></tr>`);
            }
        }
        

       

        // Appending Fetcehd data to Medium LeaderBoard Table
        if(arrMedium.length >= 5){
            for(let i = 0; i < 5; i++) {
                $('#medium-tbody').append(`<tr><td>${arrMedium[i].name}</td><td>${arrMedium[i].stars}</td><td>${arrMedium[i].time}</td><td>${arrMedium[i].level}</td></tr>`);
            }
        } else if(arrMedium.length < 5) {
            for(let i = 0; i < arrMedium.length; i++) {
                $('#medium-tbody').append(`<tr><td>${arrMedium[i].name}</td><td>${arrMedium[i].stars}</td><td>${arrMedium[i].time}</td><td>${arrMedium[i].level}</td></tr>`);
            }
        }


        // Appending Fetcehd data to Hard LeaderBoard Table
        if(arrHard.length >= 5){
            for(let i = 0; i < 5; i++) {
                $('#hard-tbody').append(`<tr><td>${arrHard[i].name}</td><td>${arrHard[i].stars}</td><td>${arrHard[i].time}</td><td>${arrHard[i].level}</td></tr>`);
            }
        } else if(arrHard.length < 5) {
            for(let i = 0; i < arrHard.length; i++) {
                $('#hard-tbody').append(`<tr><td>${arrHard[i].name}</td><td>${arrHard[i].stars}</td><td>${arrHard[i].time}</td><td>${arrHard[i].level}</td></tr>`);
            }
        }
        

        console.log(arrMedium);
        console.log(arrEasy);
        console.log(arrHard)


        console.log(arr); //log array on console for test purpose

    });

});