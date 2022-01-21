const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;
  
  if(current + half >= total) {
    to = total;
  } else if(current > half) {
    to = current + half ;
  }
  
  let from = to - max;

  return Array.from({length: max}, (_, i) => (i + 1) + from);
}


function PaginationButton(totalPages, maxPagesVisible = 10, nameDiv, currentPage = 1) {
  let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
  let currentPageBtn = null;
  const buttons = new Map();
  const disabled = {
    start: () => pages[0] === 1,
    prev: () => currentPage === 1,
    end: () => pages.slice(-1)[0] === totalPages,
    next: () => currentPage === totalPages
  }
  const frag = document.createDocumentFragment();
  const paginationButtonContainer = document.createElement('div');
  paginationButtonContainer.className = `pagination-buttons${nameDiv}`;
  
  const createAndSetupButton = (label = '', cls = '', disabled = false, handleClick) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = label;
    buttonElement.className = `page-btn ${cls}`;
    buttonElement.disabled = disabled;
    buttonElement.addEventListener('click', e => {
      handleClick(e);
      this.update();
      paginationButtonContainer.value = currentPage;
      paginationButtonContainer.dispatchEvent(new CustomEvent('change', {detail: {currentPageBtn}}));
    });
    
    return buttonElement;
  }
  
  const onPageButtonClick = e => currentPage = Number(e.currentTarget.textContent);
  
  const onPageButtonUpdate = index => (btn) => {
    btn.textContent = pages[index];
    
    if(pages[index] === currentPage) {
      currentPageBtn.classList.remove('active');
      btn.classList.add('active');
      currentPageBtn = btn;
      currentPageBtn.focus();
    }
  };
  
buttons.set(
    createAndSetupButton('|<', 'start-page', disabled.start(), () => currentPage = 1),
    (btn) => btn.disabled = disabled.start()
  )

  buttons.set(
    createAndSetupButton('Prev', 'prev-page', disabled.prev(), () => currentPage -= 1),
    (btn) => btn.disabled = disabled.prev()
  )
 
  pages.map((pageNumber, index) => {
  const isCurrentPage = currentPage === pageNumber;
  const button = createAndSetupButton(
      pageNumber, isCurrentPage ? 'active' : '', false, onPageButtonClick
    );
    
    if(isCurrentPage) {
      currentPageBtn = button;
    }
    
    buttons.set(button, onPageButtonUpdate(index));
  });

  buttons.set(
    createAndSetupButton('Next', 'next-page', disabled.next(), () => currentPage += 1),
    (btn) => btn.disabled = disabled.next()
  )

   buttons.set(
    createAndSetupButton('>|', 'end-page', disabled.end(), () => currentPage = totalPages),
    (btn) => btn.disabled = disabled.end()
  )
  
  buttons.forEach((_, btn) => frag.appendChild(btn));
  paginationButtonContainer.appendChild(frag);
  
  this.render = (container = document.querySelector(".main-container")) => {
    container.appendChild(paginationButtonContainer);
  }
  
  this.update = (newPageNumber = currentPage) => {
    currentPage = newPageNumber;
    pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    buttons.forEach((updateButton, btn) => updateButton(btn));
  }
  
  this.onChange = (handler) => {
    paginationButtonContainer.addEventListener('change', handler);
  }
}


  window.addEventListener('resize', () => {
   renderPages()
  })

export function renderPages() {
  let swCurrent = window.innerWidth;
  if (swCurrent < 767) {
    
    if (document.querySelector(".pagination-buttons-mob")) { return }

    if (document.querySelector(".pagination-buttons-desktop")) {
      document.querySelector(".pagination-buttons-desktop").innerHTML = ""
      document.querySelector(".pagination-buttons-desktop").remove()
    }
      
      const paginationButtons = new PaginationButton(1000, 3,"-mob");

      paginationButtons.render();

      paginationButtons.onChange(e => {
        let pageCurent=e.target.value
      });
    
  } else {
    
    if (document.querySelector(".pagination-buttons-desktop")) { return };
    if (document.querySelector(".pagination-buttons-mob")) {
      document.querySelector(".pagination-buttons-mob").innerHTML = ""
      document.querySelector(".pagination-buttons-mob").remove()
    }
      
      const paginationButtons = new PaginationButton(1000, 5,"-desktop");

      paginationButtons.render();

      paginationButtons.onChange(e => {
        let pageCurent=e.target.value
      });
    
  }
}