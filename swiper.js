
// rss("https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=http://www.engadget.com%2Frss-full.xml").then(data => { items = data.items; showItem(0) });
let currentIndex = 0
let items = [];

var container = document.getElementById("content");
container.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

container.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;

    // calculate swipe direction
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    // check which direction has greater distance and use that as the swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            console.log('swipe right');
            if (currentIndex > 0) {
                currentIndex--;
                showItem(currentIndex);
            }

        } else {
            console.log('swipe left');
            if (currentIndex < items.length - 1) {
                currentIndex++;
                showItem(currentIndex);
            } else {
                container.innerHTML = `<div style="text-align: center;display:flex; justify-content:center;align-items:center;font-size:48px;height: 100vh;" >No more articles</div>`;
            }
        }
    }
});

function showItem(index) {
    // console.log(items)
    const item = items[index];

    const div = document.createElement('div');

    const title = document.createElement('div');   
    title.innerHTML = `<h1>${item.title}</h1>`;

    let snippetText =  item["contentSnippet"] ? item["contentSnippet"] : ``;

    const snippet = document.createElement('div');   
    snippet.innerHTML = `<p>${snippetText}</p>`;

    let contentText =  item["content"] ? item["content"] : ``;

    const content = document.createElement('div');   
    content.innerHTML = `<p class="mt-4">${contentText}</p>`;

    const link = document.createElement('p');   
    link.innerHTML = `source: <a href="${item.link}" target="_blank">${new URL(item.link).hostname}</a>`;
    link.className = 'small text-muted';

    // div.appendChild(img);            
    div.appendChild(title);
    // div.appendChild(snippet);
    div.appendChild(content);
    div.appendChild(link);
    
    // div.appendChild(date);          
    container.innerHTML = '';
    container.appendChild(div);

}
getData(home_urls);
$("#Home").on("click",function(){
    getData(home_urls);
})
$("#Business").on("click",function(){
    getData(business_urls);
})
  
$("#Tech").on("click",function(){
    getData(tech_urls);
})
  
$("#Bollywood").on("click",function(){
    getData(bollywood_urls);
})
  
$("#cricket").on("click",function(){
    getData(cricket_urls);
})
  

var home_urls = [
    `http://feeds.bbci.co.uk/news/rss.xml?edition=int`,
    `http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml`,
    `http://rss.cnn.com/rss/cnn_topstories.rss`,
    `http://www.npr.org/rss/rss.php%3Fid%3D1001`,
    `http://www.guardian.co.uk/rssfeed/0%2C%2C1%2C00.xml`,
    `http://rss.time.com/web/time/rss/top/index.xml`,
    `http://feeds.abcnews.com/abcnews/topstories`,

]

var tech_urls = [
    `http://www.theverge.com/rss/full.xml`,
    `http://feeds2.feedburner.com/thenextweb`,
    `http://www.engadget.com/rss-full.xml`,
    `http://feeds.feedburner.com/Techcrunch`,
    `http://feeds.gawker.com/lifehacker/vip`,
    `http://feeds.wired.com/wired/index`,
    `http://feeds.mashable.com/Mashable`,

]


var business_urls = [
    `http://feeds2.feedburner.com/businessinsider`,
    `http://feeds.harvardbusiness.org/harvardbusiness/`,
    `http://feeds.feedburner.com/entrepreneur/latest`,
    `http://feeds.feedburner.com/fastcompany/headlines`,
    `http://feeds.feedburner.com/AtlanticBusinessChannel`,
    `http://www.inc.com/rss.xml`,
    `http://venturebeat.com/feed/`,

]

var bollywood_urls = [
    `http://www.bollywoodlife.com/feed/`,
    `http://www.filmfare.com/feeds/feeds.xml`,
    `http://feeds.feedburner.com/missmalini`,
    `http://www.pinkvilla.com/rss.xml`,
    `http://www.rediff.com/rss/moviesrss.xml`,
    `http://www.koimoi.com/feed/`,
    `http://www.filmibeat.com/rss/filmibeat-bollywood-fb.xml`,

]

var cricket_urls = [
    `http://www.cricinfo.com/rss/content/story/feeds/0.xml`,
    `http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/cricket/rss.xml`,
    `http://www.guardian.co.uk/sport/cricket/rss`,
    `http://www.rediff.com/rss/cricketrss.xml`,
    `https://www.wisden.com/feed`,

]

function getData(urls){
    items = [];
    Promise.all(
        urls.map(url => rss("https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=" + url).catch(error => ({ error })))
      )
        .then(results => {
          results.forEach(result => {
            if (result.error) {
              console.error(`Error fetching RSS feed: ${result.error.message}`);
              return;
            }
            items = [...items, ...result.items];
            items.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
          });
          showItem(0);
        })
        .catch(error => {
          console.error(`Error fetching RSS feeds: ${error.message}`);
        });
    
}



