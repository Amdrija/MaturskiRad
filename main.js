let array_wrapper;
let div = [];
let bucket = [];
let counting_array = [];

let leftPos = [];
let timeline;
let viewport_width;




function reset(){
    anime.remove('.bar');

    timeline.pause();
    timeline = anime.timeline();

    anime.speed = 0.5;
    document.getElementById("speed").value = 0.5;

    if(bucket.length != 0){
        document.getElementsByClassName("bucket-wrapper")[0].innerHTML = "";
        document.getElementsByClassName("number-wrapper")[0].innerHTML = "";
        bucket = [];
    }
    for(let i = 0; i < 10; i++){
        div[i].remove();
        div[i] = document.createElement('div');
        div[i].className = "bar";
        div[i].style.position = "absolute";

        div[i].style.top = "0px";
        div[i].style.left = 40*i+ viewport_width/2 - 200 + "px" ;
        leftPos[i] = 40*i + viewport_width/2 - 200;

        array_wrapper.append(div[i]);
        div[i].style.left = 40*i+ viewport_width/2 - 200 + "px" ;
        leftPos[i] = 40*i + viewport_width/2 - 200;

        div[i].style.height = Math.floor(Math.random()*500) + 40 + "px";
        div[i].innerText = div[i].style.height.slice(0,-2);

        div[i].style.backgroundColor = "#14a76c";
    }
}


window.onload = function(){
    array_wrapper = document.getElementsByClassName('array-wrapper')[0];
    timeline = anime.timeline();
    viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

    for(let i = 0; i < 10; i++){
        div[i] = document.createElement('div');
        div[i].className = "bar";
        div[i].style.position = "absolute";

        div[i].style.top = "0px";
        div[i].style.left = 40*i+ viewport_width/2 - 200 + "px" ;
        leftPos[i] = 40*i + viewport_width/2 - 200;

        array_wrapper.append(div[i]);
        
    }

    anime.speed = 0.5;
    document.getElementById("speed").value = 0.5;

    document.getElementById("bubble").addEventListener("click", function(){
        reset();
        bubbleSort(0,0);
    });
    document.getElementById("insertion").addEventListener("click", function(){
        reset();
        insertionSort(1,9);
    });
    document.getElementById("quick").addEventListener("click", function(){
        reset();
        quickSort(0,9);
    });
    document.getElementById("counting").addEventListener("click", function(){
        resetCounting();
        countingSort();
    });
    document.getElementById("pause").addEventListener("click", function(){
        timeline.pause();
        anime.speed = 0;
    });

    document.getElementById("play").addEventListener("click", function(){
        timeline.play();
        anime.speed = document.getElementById("speed").value;
    });

    document.getElementById("speed").addEventListener("input", function(){
        anime.speed = +document.getElementById("speed").value;
    },false);

}


function insertionSort(i,j){
    if(i == 10) return;
    if(j == 10){
        insertionSort(i + 1,0);
    } else{
        let hi = +div[i].style.height.slice(0,-2);
        let hj = +div[j].style.height.slice(0,-2);

        if(hi < hj) {
            let anim1 = anime({
                    targets: div[i],
                    left: +div[j].style.left.slice(0,-2),
                    backgroundColor: ['#ffe400','#14a76c'],
                    easing: 'linear',
                    duration: 250,
                    delay: 100,
                });
            let anim2 = anime({
                    targets: div[j],
                    left: +div[i].style.left.slice(0,-2),
                    backgroundColor: ['#ffe400','#14a76c'],
                    easing: 'linear',
                    duration: 250,
                    complete: function(){
                        let t = div[i];
                        div[i] = div[j];
                        div[j] = t;
                        insertionSort(i, j + 1);
                    },
                    delay: 100
                });
        }else{
            insertionSort(i, j + 1);
        }
    }
    
}

function bubbleSort(i , k){
    if(k === 9) return;
    if(i === 9){
        bubbleSort(0, 0);
    } else {
        let hi = +div[i].style.height.slice(0,-2);
        let hi1 = +div[i + 1].style.height.slice(0,-2);

        if(hi > hi1) {
            let anim1 = anime({
                    targets: div[i],
                    left: +div[i + 1].style.left.slice(0,-2),
                    backgroundColor: ['#ffe400','#14a76c'],
                    easing: 'linear',
                    duration: 250,
                    delay: 100,
                });
            let anim2 = anime({
                    targets: div[i + 1],
                    left: +div[i].style.left.slice(0,-2),
                    backgroundColor: ['#ffe400','#14a76c'],
                    easing: 'linear',
                    duration: 250,
                    complete: function(){
                        let t = div[i];
                        div[i] = div[i + 1];
                        div[i + 1] = t;
                        bubbleSort(i + 1, 0);
                    },
                    delay: 100
                });
        }else{
            bubbleSort(i + 1, k + 1);
        }
    }

}


function quickSort(left, right){
    if(left >= right){
        return;
    }
    let i = left, j = right;
    let pivot = div[Math.floor((left+right)/2)].style.height.slice(0,-2);

    while (i <= j) {
        
        while (+div[i].style.height.slice(0,-2) < pivot){
            i++;
        }
        while (+div[j].style.height.slice(0,-2) > pivot){
            j--;
        }
        if (i <= j) {
            let xi = leftPos[i];
            let xj = leftPos[j];
            let di = div[i];
            let dj = div[j];
            timeline.add({
                targets: di,
                left: xj,
                easing: 'linear',
                duration: 250,
            }).add({
                targets: dj,
                left: xi,
                easing: 'linear',
                duration: 250,
                offset: '-=250'
            });
            let t = div[i];
            div[i] = div[j];
            div[j] = t;
            i++;
            j--;
        }
        
    };

    if(left < j){
        quickSort(left, j);
    }
    if(i < right){
        quickSort(i,right);
    }
}


function resetCounting(){
    anime.remove('.bar');
    
    timeline.pause();
    timeline = anime.timeline();
    
    anime.speed = 0.5;
    document.getElementById("speed").value = 0.5;

    bucket = [];
    counting_array = [];
    for(let i = 0; i < 7; i++){
        counting_array.push(0);
    }
    
    for(let i = 0; i < 10; i++){
        div[i].remove();
        if(i < 7){
            bucket[i] = document.createElement("div");
            bucket[i].className = "bucket";
                
            bucket[i].style.position = "absolute";
            bucket[i].style.left = 110*i + viewport_width/2 - 385 + "px";
            bucket[i].innerText = 0;

            let div_number = document.createElement('div');
            div_number.className = "div-number";
            div_number.style.position = "absolute";
            div_number.style.left = 110*i + viewport_width/2 - 385 + "px";
            div_number.innerText = i + 1;

            document.getElementsByClassName("number-wrapper")[0].append(div_number);
            document.getElementsByClassName("bucket-wrapper")[0].append(bucket[i]);
        }

        div[i] = document.createElement('div');
        div[i].className = "bar";
        div[i].style.position = "absolute";

        div[i].style.top = "0px";
        div[i].style.left = 40*i+ viewport_width/2 - 200 + "px" ;
        leftPos[i] = 40*i + viewport_width/2 - 200;

        array_wrapper.append(div[i]);

        div[i].style.left = 40*i+ viewport_width/2 - 200 + "px" ;
        leftPos[i] = 40*i + viewport_width/2 - 200;
    
            
        div[i].innerText = Math.floor(Math.random()*7) + 1;
        div[i].style.height = (div[i].innerText * 50) + "px";

        div[i].style.backgroundColor = "#14a76c";
    
    }

}

function countingSort(){
    for(let i = 0; i < 10; i++){
        counting_array[+div[i].innerText - 1]++;
        timeline.add({
            targets: div[i],
            left: bucket[+div[i].innerText - 1].style.left,
            translateY: 600,
            width: 100,
            height: 50,
            backgroundColor: ['#d83f87'],
            easing: 'linear',
            duration: 250,
            delay: 100,
            complete: function(){
                bucket[+div[i].innerText - 1].innerText = +bucket[+div[i].innerText - 1].innerText + 1;
                div[i].remove();
                if( i == 9){
                    returnCounting();
                }
            }
            
        });
    }
    
}

function returnCounting(){
    let k = 0;

    timeline.pause();
    timeline = anime.timeline();
    for(let i = 0; i < 7; i++){
        
        while(counting_array[i] > 0){
            div[k] = document.createElement('div');
            div[k].className = "bucket";
            div[k].style.position = "absolute";

            div[k].style.top = "600px";
            div[k].style.left = 110*i+ viewport_width/2 - 385 + "px" ;

            div[k].innerText = i + 1;
            array_wrapper.append(div[k]);
            
            timeline.add({
                targets: div[k],
                left: 40*k + viewport_width/2 - 200,
                translateY: -600,
                width: 30,
                height: (i + 1)*50,
                backgroundColor: "#14a76c",
                easing: 'linear',
                duration: 250,
                delay: 100,
                begin: () => {bucket[i].innerText = +bucket[i].innerText - 1;},
            });
            k++;
            counting_array[i]--;
            
        }

       
    }
    
}



