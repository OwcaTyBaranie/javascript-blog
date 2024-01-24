/* eslint-disable no-redeclare */
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink : Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud').innerHTML),
};
const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  authorsListSelector: '.list.authors',
  cloudClassCount: 4,
  cloudClassPrefix: 'tag-size-',
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
  const clickedArticleId = clickedElement.getAttribute('href');
  console.log(clickedArticleId);

  /* find the correct article using the selector (value of 'href' attribute) */
  const selectedArticle = document.querySelector(clickedArticleId);
  console.log(selectedArticle);
  /* add class 'active' to the correct article */
  setTimeout(function () {
    selectedArticle.classList.add('active');
  }, 300); // 300ms delay to match the transition duration
}

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
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 4) + 1 );

  return opts.cloudClassPrefix + classNumber;
}

function generateTags() {
  console.log('Tag generated!:');
  /* find all articles */
  const allArticles = document.querySelectorAll('.posts article');
  console.log('allArticles', allArticles);
  let allTags = {};

  /* START LOOP: for every article */
  for (const article of allArticles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(opts.articleTagsSelector);
    console.log('tagWrapper:', tagWrapper);

    /* make html variable with an empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    console.log('articleTags:', tags);

    /* split tags into an array */
    const tagsArray = tags.split(' ');
    console.log('articleTagsArray', tagsArray);

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const linkHTMLData = { articleTag: tag };
      /* add generated code to the html variable */
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTMLData);

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      html = html + linkHTML;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article */
  }
  const tagList = document.querySelector(opts.tagsListSelector);

  const calculateTagsParams = (tags) => {
    const params = {
      min: 999999,
      max: 0,
    };

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');

      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }

      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }

    return params;
  };

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  const allTagsData = { tags: [] };
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData); // Corrected this line
  console.log(allTagsData);
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

const generateAuthors = () => {
  const allArticles = document.querySelectorAll('.posts article');
  const optArticleAuthorSelector = '.post-author';
  const authorList = document.querySelector(opts.authorsListSelector);
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
