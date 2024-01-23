/* eslint-disable no-redeclare */
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink : Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function generateTags() {
  console.log('Tag generated!:');
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  console.log('articles', articles);

  /* START LOOP: for every article */
  for (let article of articles) {
    console.log('Loop: for every article has started!');
    /* find tags wrapper */
    const wrapper = article.querySelector(opts.articleTagsSelector);
    console.log('wrapper:', wrapper);

    /* make html variable with an empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);

    /* split tags into an array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to the html variable */
      html += linkHTML;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

    /* END LOOP: for every article */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  console.log('tagClickHandler executed!');
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag', tag);
  /* find all tag links with class active */
  let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTagLinks', activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  let allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('allTagLinks', allTagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of allTagLinks) {
    /* add class active */
    setTimeout(function () {
      tagLink.classList.add('active');
    }, 300);
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks= document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of tagLinks) {
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

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
    const authorLinkHTMLData = {id: author, title: allAuthors};
    const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
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
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

generateAuthors();
addClickListenersToAuthors();

function calculateTagsParams(tags){
  const params = {
    max : 0,
    min : 999999,
  };
  for(let allTags in tags){
    console.log(allTags + ' is used ' + tags[allTags] + ' times');
    params.max = Math.max(tags[allTags], params.max);
    params.min = Math.min(tags[allTags], params.min);
  }
  return params;
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  return opts.cloudClassPrefix + classNumber;
}
function generateTagsNew() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
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
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagLinkHTMLData = {id: tag, title: articleTagsArray};
      const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
      /* add generated code to html variable */
      html += tagLinkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  }
  /* END LOOP: for every article */

  /* [NEW] find list of tags in the right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  /* [NEW] create a variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagClass = calculateTagClass(allTags[tag], tagsParams);
    const tagLinkHTMLData = {id: tag, title: tag};
    const tagLinkHTML = templates.tagCloudLink(tagLinkHTMLData);
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
calculateTagsParams();
generateTagsNew();
