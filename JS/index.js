document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }

    if (!validateURL(siteURL)) {
        document.getElementById('alertMessage').style.display = 'block';
        return false;
    }

    document.getElementById('alertMessage').style.display = 'none';

    var bookmark = {
        name: siteName,
        url: siteURL
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('bookmarkForm').reset();

    fetchBookmarks();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + name + '</td>' +
            '<td><a class="btn btn-primary" target="_blank" href="' + url + '"><i class="fas fa-external-link-alt"></i> Visit</a></td>' +
            '<td><a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"><i class="fas fa-trash-alt"></i> Delete</a></td>' +
            '</tr>';
    }
}

function validateURL(url) {
    var expression = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+.*)$/;
    var regex = new RegExp(expression);
    return url.match(regex);
}

// Fetch bookmarks on page load
document.addEventListener('DOMContentLoaded', fetchBookmarks);
