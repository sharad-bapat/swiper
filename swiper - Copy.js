
rss("https://winter-smoke-73a6.sixyjntpqun7805.workers.dev/?url=http%3A%2F%2Fwww.engadget.com%2Frss-full.xml").then(data => { items = data.items; showItem(0) });
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
    console.log(items)
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