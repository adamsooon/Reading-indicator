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

  const throttle = (callback, limit) => {
    const wait = false;
    return () => {
      if (!wait) {
        callback();
        wait = true;
        setTimeout( () => {
          wait = false;
      }, limit);
      }
    };
  };

  const debounce = (callback, time) => {
    var timeout;
    return () => {
      // var context = this,
      // args = arguments;
      // console.log(context, args)
      clearTimeout(timeout);
      timeout = setTimeout( () => {
          callback();
    }, time || 200);
    };
  };

  const resizeWindow = () => {
    getProgress();
    progress.max = maxScroll();
  }

  window.addEventListener('scroll', throttle(getProgress, 100));
  window.addEventListener('scroll', debounce(getProgress, 200));
  window.addEventListener('resize', resizeWindow, true);
})();
