import './sass/main.scss';
import ApiService from './js/apiService';
import imageCard from './templates/image-card.hbs';
import { setNoticeMsg } from './js/notify';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.more-btn'),
};
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '' || apiService.query === ' ') {
    return setNoticeMsg();
    // return alert('No data for search');
  }
  apiService.resetPage();
  apiService.fetchImages().then(hits => {
    clearGallery();
    appendMarkup(hits);
  });
  showLoadMoreBtn();
}

function onLoadMore(e) {
  apiService.fetchImages().then(appendMarkup);
}

function appendMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));
  scrollPage();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function scrollPage() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
