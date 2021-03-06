(async function() {
    const url  = "https://api.nasa.gov/planetary/apod?api_key=xstEYQCA6wByrwDBI51liejfp0HOQyF8gzqqXjcI";
    const wall = document.querySelector('.image-wall');
    
    // Loop over past images
    let date  = new Date();
    let count = 10;
    while (count--) {
        // Get date
        let dateString = date.toISOString().substr(0, 10);
        
        // Do API call
        let response = await fetch(url + '&date=' + dateString);

        // Check if response is valid
        if (response.status !== 200) {
            continue;
        }

        // Get JSON data
        let data = await response.json();
        
        // Make nodes
        let li         = document.createElement('li');
        let a          = document.createElement('a');
        let figure     = document.createElement('figure');
        let img        = document.createElement('img');
        let figcaption = document.createElement('figcaption');

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

        // Set date to previous date
        date.setDate(date.getDate() - 1)
    }
})();