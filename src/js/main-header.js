import Header from "./section-header";
const header = new Header;
import Gallery from "./section-gallery";
import { renderHome, renderHomeSearch, renderQueue, renderWatched, setNewSearch } from "./render_markup";
const gallery = new Gallery;

renderHome();

header.searchForm.addEventListener('submit', onFormSubmit);
header.homeBtn.addEventListener('click', goHomePage);
header.libraryBtn.addEventListener('click', goLibraryPage);
header.watchedBtn.addEventListener('click', goWatchedPage);
header.queueBtn.addEventListener('click', goQueuePage);

function onFormSubmit(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.search.value.trim();

    event.currentTarget.reset();
    if (!searchQuery) return;
    
    gallery.showHome();
    gallery.homeFilmlist.innerHTML = '';
    setNewSearch(searchQuery);
    renderHomeSearch();
}

function goHomePage() {
    header.showHome();
    gallery.showHome();
    renderHome();
}

function goLibraryPage() {
    header.showLibrary();
    gallery.showMylibraryQueue();
    goQueuePage();
}

function goQueuePage() {
    header.showQueue();
    gallery.showMylibraryQueue();
    renderQueue();
}

function goWatchedPage() {
    header.showWatched();
    gallery.showMylibraryWatch();
    renderWatched();
}