
let currentIndex = 0
let items = [];

var container = document.getElementById("main");
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

        var container1 = document.getElementById("content");
        items = items.sort((a, b) => new Date(b.published) - new Date(a.published));
        const item = items[index];

        const div = document.createElement('div');

        const datediv = document.createElement('p')
        const date = new Date(item.published);      
        const formattedDate = date.toLocaleString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        datediv.innerHTML = `<p class="text-centre">${formattedDate}</p>`;

        const title = document.createElement('div');
        title.innerHTML = `<h1 class="fw-bold mt-4">${item.title}</h1>`;


        let contentText = item.content ? item.content : ``;

        const content = document.createElement('div');
        content.innerHTML = `<p class="mt-4">${contentText}</p>`;

        const imgsrc = document.createElement('img');
        imgsrc.setAttribute('src', item.visual);
        imgsrc.setAttribute('alt', 'image');

        const link = document.createElement('p');
        let url = item.canonicalUrl ? item.canonicalUrl : ``;
        let hostname = "";
        try {
            hostname = new URL(url).hostname
        } catch (err) {
            hostname = ""
        }
        link.innerHTML = `<a href="${url}" target="_blank">${hostname}</a>`;
        link.className = 'small text-muted';

        console.log(hostname, item.published)

        div.appendChild(datediv);
        div.appendChild(imgsrc);
        div.appendChild(title);
        div.appendChild(content);
        div.appendChild(link);

        container1.innerHTML = '';
        container1.appendChild(div);

        //remove the image in body if already in header
        const images = container1.querySelectorAll('img');
        const srcMap = {};
        for (const image of images) {
            if (image.src.split('?').shift() in srcMap) {                
                image.remove();
            } else {
                srcMap[image.src.split('?').shift()] = true;
            }
        }

    } catch (err) {
        console.log(err.stack);
    }
}

var urls = [

    // world news
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.npr.org/rss/rss.php?&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683005628303&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://english.aljazeera.net/Services/Rss/?PostingId=2007731105943979989&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092211437&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.bbci.co.uk/news/world/rss.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052577057&ct=feedly.desktop&cv=31.0.1792`,

    //india news
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.dnaindia.com/syndication/rss,catID-0.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683051862305&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/ndtvnews-top-stories&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683051931281&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://timesofindia.indiatimes.com/rssfeedstopstories.cms&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683051980576&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.ibnlive.com/rss/india.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052014746&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.thehindu.com/news/national/?service=rss&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092106707&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/https://www.altnews.in/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092251684&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.opindia.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092371563&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/TheBetterIndia&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092498638&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/https://blog.feedly.com/category/features-tutorials/feed/&count=1&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092205024&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/https://thewire.in/rss&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092632622&ct=feedly.desktop&cv=31.0.1792`,

    //business news
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds2.feedburner.com/businessinsider&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052419019&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://qz.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683092437230&ct=feedly.desktop&cv=31.0.1792`,


    //tech news
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.engadget.com/rss-full.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052780456&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.fromquarkstoquasars.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052813934&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.gawker.com/gizmodo/full&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052837882&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://feeds.feedburner.com/Techcrunch&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052856972&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.theverge.com/rss/full.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683052880649&ct=feedly.desktop&cv=31.0.1792`,

    //entertainment
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.bollywoodlife.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053032491&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.filmfare.com/feeds/feeds.xml&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053054080&ct=feedly.desktop&cv=31.0.1792`,
    `https://api.feedly.com/v3/streams/contents?streamId=feed/http://www.koimoi.com/feed/&count=20&unreadOnly=true&ranked=newest&similar=true&findUrlDuplicates=true&ck=1683053079939&ct=feedly.desktop&cv=31.0.1792`,



]

getData(urls);

async function getData(urls) {
    items = [];
    currentIndex = 0;
    if (!getLocalStorage("data")) {
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
                })
                );
                items.push(...filteredItems);
            }
            items = items.sort((a, b) => new Date(b.published) - new Date(a.published));
            setLocalStorage("data", items, 30 * 60000);
            showItem(0);
        } catch (error) {
            console.error(`${error.stack}`);
        }
    } else {
        items = getLocalStorage("data");
        showItem(0);
    }

}


