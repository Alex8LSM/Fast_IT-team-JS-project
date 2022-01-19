
function createUpBtn() {
    const buttonUp = document.createElement('button');
    buttonUp.className = `upBtn`;
    document.querySelector('body').appendChild(buttonUp);
    const btn = document.querySelector('.upBtn');
        
    window.addEventListener("scroll", () => {
        let a = window.pageYOffset;
        console.log(a);
        if (a > 50) {
            btn.classList.add('showUpBtn');
        } else {
            btn.classList.remove('showUpBtn');
        }
    })

    btn.addEventListener("click", (e) => {
        e.preventDefault;
        let scrollY = window.pageYOffset;
        scrolledToTop(scrollY)
       
    })
}
let timer;
function scrolledToTop(scrollY) {
          
    if (scrollY > 0) {
        window.scrollTo(0, scrollY);
        scrollY = scrollY - 100;
        timer = setTimeout(scrolledToTop,200)
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
}

export {createUpBtn}