'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
const targetArticle = document.querySelector(articleSelector);
console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */
targetArticle.classList.add('active');
console.log('targetArticle:',targetArticle);
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
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
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML:', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log('html:', html);
}

generateTitleLinks();
