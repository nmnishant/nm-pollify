const plusIcon = document.querySelector('.ph-plus-circle');
const container = document.querySelector('.container');
let option_container = document.querySelector('.option-container');
const askBtn = document.querySelector('.askBtn');
const copyBtn = document.querySelector('.copyLinkBtn');
let pollLink;

plusIcon.addEventListener('click', function(e){
    let count = Array.from(option_container.children).length+1;
    const newOption = document.createElement('div');
    newOption.setAttribute('class', 'input-group input-group-lg');
    newOption.innerHTML = `<span class="input-group-text option-text" id="inputGroup-sizing-default">Option ${count}</span>
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    <span class="input-group-text delete" id="inputGroup-sizing-default">-</span>`;
    count++;
    option_container.appendChild(newOption);
});

option_container.addEventListener('click', function(e){
    if(Array.from(e.target.classList).includes('delete')){
        let target = e.target.parentNode;
        let count = 1;
        let arr = Array.from(option_container.children);
        if(arr.length == 1){
            showMsg(1, 'Please fill atleast 1 option');
            return;
        }
        Array.from(option_container.children).forEach(function(elem){
            if(elem == target){
                option_container.removeChild(elem);
            }
            else{
                elem.children[0].innerText = `Option ${count}`;
                count++;
            }
        });
    }
});

function showMsg(type, msg='Something went wrong'){
    let errorElem = container.firstElementChild.children[type];
    errorElem.classList.remove('hide');
    if(type == 1){
        errorElem.innerText = JSON.stringify(msg);
    }
    setTimeout(()=> errorElem.classList.add('hide'), type*3000);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }); 
}

function handleResponse(res){
    if(res.status != 'success'){
        for([key, value] of Object.entries(res.msg)){
            if(value.message){
                showMsg(1, value.message);
            }
        }
    }
    return res;
}

async function postPoll(data){
    const res = await fetch(`/api/v1/poll`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return handleResponse(await res.json());
}

askBtn.addEventListener('click', function(e){
    const data = {};
    const ques = container.children[1].children[0].value;
    console.log(ques);
    if(ques){
        if(document.querySelector('.form-check-input').checked){
            data.ipDetection = true;
        }
        data.pollQuestion = ques;
        let options = [];
        Array.from(option_container.children).forEach(function(elem){
            let currOption = elem.children[1].value;
            if(currOption){
                options.push({value: currOption, count: 0});
            }
        });
        data.options = options;
        if(options.length >= 1){
            postPoll(data).then((res) => {
                if(res.status == 'success'){
                    pollLink = `${window.location.host}/poll/${res.body._id}`;
                    showMsg(2);
                }
            });
        }
        else{
            showMsg(1, 'Please enter atleast 1 option');
        }
    }
    else{
        showMsg(1, 'Please enter question');
    }
})


copyBtn.addEventListener('click', function(e){
    copyBtn.innerText = 'Copied!';
    navigator.clipboard.writeText(pollLink);
    setTimeout(()=> copyBtn.innerText = 'Copy link', 2000);
})