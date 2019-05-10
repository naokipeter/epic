(async function() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=xstEYQCA6wByrwDBI51liejfp0HOQyF8gzqqXjcI";
    const count = 10;

    const wall = document.querySelector('.image-wall');
    let date = new Date();
    let dateString = '';
    for (let i = 0; i < count; i++) {
        // Get date
        date.setDate(date.getDate() - 1)
        dateString = date.toISOString().substr(0, 10);
        
        // Do call
        let response = await fetch(url + '&date=' + dateString);
        let data     = await response.json();
        
        // Make nodes
        let li          = document.createElement('li');
        let a           = document.createElement('a');
        let figure      = document.createElement('figure');
        let img         = document.createElement('img');
        let figcaption  = document.createElement('figcaption');

        // Append nodes
        let captionText = null;
        if (data.media_type === 'video') {
            // Youtube video thumbnail
            let videoId = data.url.split('/')[4].split('?')[0];
            img.setAttribute('src', 'https://img.youtube.com/vi/' + videoId + '/default.jpg');
            a.setAttribute('href', data.url);
            captionText = document.createTextNode('[Video] ' + data.title + ' (' + data.date + ')');
        } else {
            // Regular image
            img.setAttribute('src', data.url);
            a.setAttribute('href', data.hdurl);
            captionText = document.createTextNode(data.title + ' (' + data.date + ')');
        }
        figcaption.appendChild(captionText);
        img.setAttribute('alt', data.title);
        img.setAttribute('class', 'center-cropped');
        figure.appendChild(img);
        figure.appendChild(figcaption);
        a.setAttribute('target', '_blank');
        a.appendChild(figure);
        li.setAttribute('class', 'image-item');
        li.appendChild(a);
        wall.append(li);
    }
})();