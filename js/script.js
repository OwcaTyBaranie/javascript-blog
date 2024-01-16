/* eslint-disable no-unused-vars */
'use strict';
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
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
const articles = document.querySelectorAll(optArticleSelector);
function generateTitleLinks(){
  console.log('generateTitleLinks function executed');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearTitleList(){
    titleList.innerHTML = '';
  }
  clearTitleList();
  /* for each article */ /* find all the articles and save them to variable: articles */
  /* ... */
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);
    /* find the title element *//* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    let linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML:', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log('html:', html);

  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  console.log('Tag generated!');
  /* find all articles */
  const articles = document.querySelectorAll('.article');
  console.log('articles', articles);

  /* START LOOP: for every article */
  for (let article of articles) {
    console.log('Loop: for every article has started!');
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
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
      console.log('Loop: for each tag has started!');

      /* generate HTML of the link */
      const tagLink = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to the html variable */
      html += tagLink;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

    /* END LOOP: for every article */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  console.log('Link was clicked!');
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  let tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tagLinks of 'a[href="' + href + '"]');
  /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

  /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
