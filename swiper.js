
// rss("https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=http://www.engadget.com/rss-full.xml").then(data => { items = data.items; showItem(0) });
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

    try {

        console.log(items)
        items = items.sort((a, b) => new Date(b.published) - new Date(a.published));
        const item = items[index];

        const div = document.createElement('div');

        const title = document.createElement('div');
        title.innerHTML = `<h1 class="fw-bold">${item.title}</h1>`;

        // let snippetText = item["contentSnippet"] ? item["contentSnippet"] : ``;

        // const snippet = document.createElement('div');
        // snippet.innerHTML = `<p>${snippetText}</p>`;

        let contentText = item.content ? item.content : ``;

        const content = document.createElement('div');
        content.innerHTML = `<p class="mt-4">${contentText}</p>`;

        const imgsrc = document.createElement('img');        
        imgsrc.setAttribute('src', item.visual);
        imgsrc.setAttribute('alt', 'image');

        // const favicon = document.createElement('img');        
        // favicon.setAttribute('src', `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${new URL(item.canonicalUrl).hostname}&size=32`);
        // favicon.setAttribute('alt', new URL(item.canonicalUrl).hostname);


        const link = document.createElement('p');
        let url = item.canonicalUrl ? item.canonicalUrl : ``;
        let hostname = "";
        try{
            hostname =  new URL(url).hostname
        }catch(err){
            hostname=""
        }       
        link.innerHTML = `<a href="${url}" target="_blank">${hostname}</a>`;
        link.className = 'small text-muted';

        console.log(hostname, item.published)

        // div.appendChild(img);  
        // div.appendChild(favicon);          
        div.appendChild(title);
        div.appendChild(imgsrc);
        // div.appendChild(snippet);
        div.appendChild(content);
        div.appendChild(link);

        // div.appendChild(date);          
        container.innerHTML = '';
        container.appendChild(div);
    } catch (err) {
        console.log(err.stack);
    }


}


// function getData(urls){
//     items = [];
//     Promise.all(
//         urls.map(url => rss("https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=" + url).catch(error => ({ error })))
//       )
//         .then(results => {
//           results.forEach(result => {
//             if (result.error) {
//               console.error(`Error fetching RSS feed: ${result.error.message}`);
//               return;
//             }
//             items = [...items, ...result.items];
//             items.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
//           });
//           showItem(0);
//         })
//         .catch(error => {
//           console.error(`Error fetching RSS feeds: ${error.message}`);
//         });

// }

var home_urls = [
    // `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.abcnews.com/abcnews/topstories&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683049962262&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.npr.org/rss/rss.php?&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683005628303&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.guardian.co.uk/rssfeed/0,,1,00.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683050154579&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683050396951&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.bbci.co.uk/news/world/rss.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052577057&ct=feedly.desktop&cv=31.0.1792`,
]

var india_urls = [

    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.dnaindia.com/syndication/rss,catID-0.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683051862305&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/ndtvnews-top-stories&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683051931281&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://timesofindia.indiatimes.com/rssfeedstopstories.cms&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683051980576&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.ibnlive.com/rss/india.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052014746&ct=feedly.desktop&cv=31.0.1792`,

]

var business_urls = [

    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds2.feedburner.com/businessinsider&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052419019&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/entrepreneur/latest&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052454625&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/fastcompany/headlines&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052488861&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://fortune.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052520611&ct=feedly.desktop&cv=31.0.1792`,

]

var tech_urls = [
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.engadget.com/rss-full.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052780456&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.fromquarkstoquasars.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052813934&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.gawker.com/gizmodo/full&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052837882&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/Techcrunch&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052856972&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.theverge.com/rss/full.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052880649&ct=feedly.desktop&cv=31.0.1792`,

]

var bollywood_urls = [
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.bollywoodlife.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053032491&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.filmfare.com/feeds/feeds.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053054080&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.koimoi.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053079939&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.pinkvilla.com/rss.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053103299&ct=feedly.desktop&cv=31.0.1792`,
   
]



getData(home_urls);

// function getData(urls) {
//     items = [];
//     Promise.all(
//         urls.map(url => fetch("https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=" + url).catch(error => ({ error })))
//     )
//         .then(results => {
//             // console.log(results.json());
//             results.forEach(result => {
//                 if (result.error) {
//                     console.error(`Error fetching RSS feed: ${result.error.message}`);
//                     return;
//                 }
//                 result.json().then((data) => {
//                     // console.log(data.items)
//                     items = [...items, ...data.items];
//                     items = items.sort((a, b) => new Date(b.published) - new Date(a.published));
//                     showItem(0);
//                 });

//             })
//         })
//         .catch(error => {
//             console.error(`Error fetching RSS feeds: ${error.message}`);
//         });

// }

async function getData(urls) {
    items = [];
    try {
        const responses = await Promise.all(urls.map(url => fetch(`https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=${url}`).catch(error => ({ error }))));
        for (const response of responses) {
            if (response.error) {
                console.error(`Error fetching RSS feed: ${response.error.message}`);
                continue;
            }
            const data = await response.json();
            const filteredItems = data.items.map(item =>
            ({
                title: item.title ? item.title : ``,
                content: item.summary ? item.summary.content : ``,
                published: item.published,
                canonicalUrl: item.originId ? item.originId : ``,
                visual: item.visual ? item.visual.url : `wp.png`
                // add additional properties you want to extract here
            })
            );
            items.push(...filteredItems);
        }
        items = items.sort((a, b) => new Date(b.published) - new Date(a.published));
        // console.log(items);
        showItem(0);
    } catch (error) {
        console.error(`Error fetching RSS feeds: ${error.message}`);
    }
}

$("#Home").on("click", function () {
    getData(home_urls);
})
$("#India").on("click", function () {
    getData(india_urls);
})
$("#Business").on("click", function () {
    getData(business_urls);
})

$("#Tech").on("click", function () {
    getData(tech_urls);
})

$("#Bollywood").on("click", function () {
    getData(bollywood_urls);
})

$("#cricket").on("click", function () {
    getData(cricket_urls);
})



