const option_container = document.querySelector('.option-container');
const submitBtn = document.querySelector('.submitBtn');

option_container.addEventListener('click', (e) => {
    if(Array.from(submitBtn.classList).includes('blocked')){
        return;
    }
    let target;
    if(Array.from(e.target.classList).includes('form-control') || Array.from(e.target.classList).includes('input-group-text')){
        target = e.target.parentNode;
    }
    else if(Array.from(e.target.classList).includes('form-check-input')){
        target = e.target.parentNode.parentNode;
    }
    else{
        return;
    }
    Array.from(option_container.children).forEach((elem)=>{
        elem.children[0].children[0].removeAttribute('checked');
        elem.children[1].style.background = "white";
    })
    target.children[0].children[0].setAttribute('checked', 'true');
    target.children[1].style.background = "#0000001a";
})

function fillResult(res){
    console.log(res);
    Array.from(option_container.children).forEach(function(elem, idx){
        let percentageElem = elem.children[1].children[1];
        let optionNameElem = elem.children[1].children[0];
        percentageElem.classList.remove('hide');
        percentageElem.innerText = `${(res.data.options[idx].count/res.data.totalCount*100).toFixed(2)}%`;
        optionNameElem.style.width = percentageElem.innerText;
        optionNameElem.style.background = optionNameElem.style.width == '0%' ? 'white' : 'rgba(0, 0, 0, 0.1)';
        // console.log();
        // console.log((res.data.options[idx].count/res.data.totalCount)*100);
    });
    submitBtn.classList.add('blocked');
}

async function postPollValue(data){
    const res = await fetch(`/api/v1/poll/${data._id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    fillResult(await res.json());
}

submitBtn.addEventListener('click', function(e){
    if(!Array.from(e.target.classList).includes('blocked')){
        let data = {};
        Array.from(option_container.children).forEach((elem)=>{
            elem.children[1].style.background = 'white';
            if(elem.children[0].children[0].getAttribute('checked')){
                data._id = document.querySelector('#pollID').value;
                data.value = elem.children[1].innerText;
            }
        });
        if(data){
            const pollData = postPollValue(data);
        }
    }
})