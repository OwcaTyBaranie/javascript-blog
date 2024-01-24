
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud').innerHTML),
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  authorsListSelector: '.authors.list',
  cloudClassCount: 4,
  cloudClassPrefix: 'tag-size-',
  // eslint-disable-next-line no-unused-vars
  tagsListSelector : '.tags.list',
};


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');}
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    setTimeout(function () {
      activeArticle.classList.remove('active');
    }, 300); // 300ms delay to match the transition duration
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */
  setTimeout(function () {
    targetArticle.classList.add('active');
  }, 300); // 300ms delay to match the transition duration
}

function generateTitleLinks(customSelector = ''){
  console.log('customSelector:', customSelector);
  console.log(opts.articleSelector + customSelector);
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  console.log('titleList:',titleList);
  function clearTitleList(){
    titleList.innerHTML = '';
  }
  clearTitleList();
  /* for each article */ /* find all the articles and save them to variable: articles */
  /* ... */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);
    /* find the title element *//* get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    /* create HTML of the link */
    let linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML:', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
console.log('generateTitleLinks executed!:');


function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(opts.articleSelector);

  // Pętla dla każdego artykułu
  for (let article of articles) {
    const author = article.getAttribute('data-author');
    const title = article.querySelector(opts.titleSelector).textContent;

    // Dodaj dołączanie linków autorów
    const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';

    // Dodaj dołączanie linków do listy autorów
    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    // Dodaj wyświetlanie linku autora
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);
    authorWrapper.innerHTML = authorLinkHTML;

    // Usuń numer z tytułu artykułu
    const titleWrapper = article.querySelector(opts.titleSelector);
    titleWrapper.textContent = title;
  }

  // Znajdź listę autorów w prawej kolumnie
  const authorsList = document.querySelector(opts.authorsListSelector);

  // Utwórz zmienną dla HTML kodu linków autorów
  let allAuthorsHTML = '';

  // Rozpocznij pętlę dla każdego autora w allAuthors
  for (let author in allAuthors) {
    // Wygeneruj kod linka autora
    const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    allAuthorsHTML += authorLinkHTML;
  }

  // Dodaj HTML z allAuthorsHTML do listy autorów
  authorsList.innerHTML = allAuthorsHTML;
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const author = clickedElement.innerText;

  // Clear active class from existing author links
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
  for (let activeLink of activeAuthorLinks) {
    activeLink.classList.remove('active');
  }

  // Add active class to the clicked author link
  clickedElement.classList.add('active');

  // Generate a filtered list of articles by the clicked author
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

generateAuthors();
addClickListenersToAuthors();

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  return opts.cloudClassPrefix + classNumber;
}

function generateTagsNew() {
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* START LOOP: for every article: */
  for (const article of articles) {
    console.log('Loop: for every article has started!');
    /* find tags wrapper */
    const wrapper = article.querySelector(opts.articleTagsSelector);
    console.log('wrapper:', wrapper);

    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);
    /* START LOOP: for each tag */
    for (const tag of articleTagsArray) {
      const linkHTMLData = {articleTag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTMLData);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      html = html + linkHTML;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  }
  /* END LOOP: for every article */

  /* [NEW] find list of tags in the right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  const calculateTagsParams = (tags) => {
    const params = {
      min: 999999,
      max: 0,
    };

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > params.max){
        params.max = tags[tag];
      }

      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  };

  /* [NEW] create a variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTagsNew();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* Loop for each active tag link */
  for(const activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchedTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(const matchedTagLink of matchedTagLinks){
    /* add class active */
    matchedTagLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}
function addClickListenersToTags(){
  /* find all links to tags */
  const tagsLinksArray = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(const tagLink of tagsLinksArray){
    tagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

