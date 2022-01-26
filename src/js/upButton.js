function createUpBtn() {

    const buttonUp = document.createElement('button');
    buttonUp.className = `upBtn`;
    document.querySelector('body').appendChild(buttonUp);
    const btn = document.querySelector('.upBtn');

    const buttonDown = document.createElement('button');
    buttonDown.className = `downBtn`;
    document.querySelector('body').appendChild(buttonDown);
    const downBtn = document.querySelector('.downBtn');
        
    window.addEventListener("scroll", () => {
        let a = window.pageYOffset;
        if (a > 100) {
            btn.classList.add('showBtn');
        } else {
            btn.classList.remove('showBtn');
        }

        const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        );

        if(window.scrollY+1 >=document.documentElement.scrollHeight-document.documentElement.clientHeight) { downBtn.classList.remove('showBtn')}
        else {downBtn.classList.add('showBtn')}


    })

    btn.addEventListener("click", (e) => {
        e.preventDefault;
        let scrollY = window.pageYOffset;
        scrolledToTop(scrollY)
       
    })

    buttonDown.addEventListener("click", (e) => {
        e.preventDefault;
        let scrollD = window.pageYOffset;
        scrolledToDown(scrollD)
       
    })

}
let timer;
export function scrolledToTop(scrollY) {
          
    if (scrollY > 0) {
        window.scrollTo(0, scrollY);
        scrollY = scrollY - 100;
        timer = setTimeout(scrolledToTop,200)
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
}

function scrolledToDown(scrolly) {
    
const element = document.querySelector("footer");

element.scrollIntoView({ behavior: 'smooth', block: 'end'});

}

export {createUpBtn}

