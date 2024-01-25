'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud').innerHTML),
};

const optTagsListSelector = '.tags.list';
const optCloudClassCount = 4;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.list.authors';
const optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const clickedArticleId = clickedElement.getAttribute('href');
  console.log(clickedArticleId);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const selectedArticle = document.querySelector(clickedArticleId);
  console.log(selectedArticle);

  /* [DONE] add class 'active' to the correct article */
  selectedArticle.classList.add('active');
};

const generateTitleLinks = (customSelector = '') => {
  console.log('Title links generated!');
  console.log(customSelector);

  /* [DONE] clear title list */

  const titlesList = document.querySelector('.titles, .list');
  titlesList.innerHTML = '';

  /* get every article id and generate title with link */

  let html = '';

  const articlesList = document.querySelectorAll('.post' + customSelector);
  for (const article of articlesList) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML;
  }
  console.log(articlesList);

  titlesList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}


function generateTags(){

  /* find all articles */
  const allArticles = document.querySelectorAll('.posts article');

  let allTags = {};

  /* START LOOP: for every article: */
  for(const article of allArticles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const tags = article.getAttribute('data-tags');
    const tagsArray = tags.split(' ');

    for(const tag of tagsArray){

      const linkHTMLData = {articleTag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTMLData);

      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      html = html + linkHTML;
    }

    tagWrapper.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);

  /* My solution - limited by the maximal amount of elements in an array
  const calculateTagsParams = (allTags) => {
    let values = [];

    for(let tag in allTags){
      values.push(allTags[tag]);
    }
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    return {max: maxValue, min: minValue,
    };
  };
   */

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

generateTags();


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


const generateAuthors = () => {
  const allArticles = document.querySelectorAll('.posts article');
  const optArticleAuthorSelector = '.post-author';
  const authorList = document.querySelector(optAuthorsListSelector);
  let allAuthorsObj = {};


  for(const article of allArticles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');

    const linkHTMLData = {articleAuthor: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    // count how many articles belong to one author
    if(!allAuthorsObj[author]){
      allAuthorsObj[author] = 1;
    } else {
      allAuthorsObj[author]++;
    }
    // generate link for authors visible in an article
    authorWrapper.innerHTML = linkHTML;
  }

  // generate link for the list of authors with a number of their articles
  const allAuthorsData = {authors: []};
  for(let author in allAuthorsObj){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthorsObj[author],
    });
  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);
};

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');


  for(const activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const matchedAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(const matchedAuthorLink of matchedAuthorLinks){
    matchedAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


const addClickListenersToAuthors = () => {
  const authorsLinksArray = document.querySelectorAll('a[href^="#author-"]');

  for(const authorLink of authorsLinksArray){
    authorLink.addEventListener('click', authorClickHandler);
  }

};

addClickListenersToAuthors();
