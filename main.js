(function () {
  const article = document.querySelector('article'),
    windowHeight = window.innerHeight,
    articleHeight = () =>
  article.clientHeight,
    maxScroll = () =>
  articleHeight() - windowHeight,
    progress = document.createElement('progress');

  progress.classList.add('articleProgress');
  progress.value = 0;
  progress.max = maxScroll();

  article.appendChild(progress);

  const getProgress = () => {
    progress.value = window.scrollY - article.offsetTop;
  };

  const progressVisibile = () => {
    if(progress.value > 0 &&  progress.value < progress.max) {
      progress.classList.add('is-active');
    } else {
      progress.classList.remove('is-active');
    }
  }

  const throttle = (callback, limit) => {
    let wait = false;
    return () => {
      if (!wait) {
        callback();
        wait = true;
        setTimeout( () => {
          progressVisibile();
          wait = false;
      }, limit);
      }
    };
  };

  const debounce = (callback, time) => {
    var timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout( () => {
          callback();
          progressVisibile();
    }, time || 200);
    };
  };

  const resizeWindow = () => {
    getProgress();
    progress.max = maxScroll();
    progressVisibile();
  }

  window.addEventListener('scroll', throttle(getProgress, 100));
  window.addEventListener('scroll', debounce(getProgress, 200));
  window.addEventListener('resize', resizeWindow, true);
})();
