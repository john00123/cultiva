//Constants
const page = $('html');
let lang = localStorage.getItem("lang")
            ? localStorage.getItem("lang") :'es'


//Scroll Event for Logo and Lang
window.addEventListener('scroll', function() {
  pageYOffset >= 20
    ? $('.logo').addClass   ("scroll-logo")
    : $('.logo').removeClass("scroll-logo")
  pageYOffset >= 40
    ? $('.lang').addClass   ("lang-scroll")
    : $('.lang').removeClass("lang-scroll")
  pageYOffset >= 40
    ? $('.header-nav').addClass   ("scroll")
    : $('.header-nav').removeClass("scroll")
});

$(window).resize(function(){
  let open = $('body').hasClass('hasOverlay');

  if(window.innerWidth <= 800 && page.hasClass('desktop')){
    page.removeClass('desktop').addClass('mobile')
    HeaderNav();
    ContactSlider();
    $('footer').html('');
  } else if(window.innerWidth >= 801 && page.hasClass('mobile')){
    page.removeClass('mobile').addClass('desktop')
    HeaderNav();
    FooterPage();
    if ($('.slider-contact').hasClass('slide')) {
      slide()
      setTimeout(function(){$('.slider-contact').remove();}, 300)
    } else {
      $('.slider-contact').remove();
    }
  }
})

//loadPage ⏱
function loadPage(){
  Language();
  HeaderNav();
  if (window.innerWidth <= 800){
    page.addClass('mobile')
    ContactSlider();
  } else {
    page.addClass('desktop');
    FooterPage();
  }
  if(page.hasClass('home'))        {HomePage()            } //🏠
  if(page.hasClass('images'))      {ImagePage()            } //🖼
  if(page.hasClass('contact-page')){ContactPage()          } //📞
  if(page.hasClass('microgreens')) {Products('microgreens')} //🥦
  if(page.hasClass('vegetables'))  {Products('vegetables' )} //🌽
  if(page.hasClass('flowers'))     {Products('flowers'    )} //💐
}

//language html populator
function Language(){
  $('.lang').html('');
  if(lang === 'es'){
    $('.lang').append(`<div class="en">${header.lang.en}</div>`)
  } else {
    $('.lang').append(`<div class="es">${header.lang.es}</div>`)
  }
}

//header html populator
function HeaderNav(){
  const { home, products, images, contact } = header.nav;
  $('.nav').html(`
    <div class="nav-link-container">
      <a href="${
        page.hasClass('products-pages')
        ? '../' + home.path
        : home.path
        }" class="nav-link">
      <div class="${home.icon}"></div>
      <span>${home.title[lang]}</span>
      </a>
      <a href="${
        page.hasClass('products-pages')
        ? products.path
        : 'products/' + products.path
        }" class="nav-link">
      <div class="${products.icon}"></div>
      <span>${products.title[lang]}</span>
      </a>
    </div>
    <div class="logo"></div>
    <div class="nav-link-container">
      <a href="${
        page.hasClass('products-pages')
        ? '../' + images.path
        : images.path
        }" class="nav-link">
      <div class="${images.icon}"></div>
      <span>${images.title[lang]}</span>
      </a>
      ${window.innerWidth <= 800
        ?   `<a href="#" class="nav-link" onclick="slide(); return false">
              <div class="${contact.icon}"></div>
              <span>${contact.title[lang]}</span>
            </a>`
        :   `<a href="${
              page.hasClass('products-pages')
              ? '../' + contact.path
              : contact.path
              }" class="nav-link">
              <span>${contact.title[lang]}</span>
            </a>`
      }
    </div>
    `)

    if(page.hasClass('products-pages')){
      $('.logo').load('../svg/logo.svg')
    } else {
      $('.logo').load('svg/logo.svg')
    }
}

//home page html populator
function HomePage() {
  const MainContent = $('#main');
  const { name, srcset, alt, format } = images.hero;
  MainContent.html('').append(`
    <section class="hero">
      <img src="img/${name + '_' + srcset[0] + format}"
          srcset="${srcset.map(num =>
            `img/${name + '_' + num + format} ${num + 'w'} `)}"
          alt="${alt[lang]}">
    </section>
  `)
}

//footer page html populator
function FooterPage() {
  const FooterContent = $('footer');
  FooterContent.html('')
    .append(`<div class="contact"></div>`);
  footer.map(item => $('.contact').append(`
    <address class="${item.title.toLowerCase()}">
      <h3>${item.title}</h3>
      <a href="tel:${item.contact.phone}">${item.contact.phoneFormatted}</a><br>
      <a href="mailto:${item.contact.email}">${item.contact.email}</a>
      <div class="location">
        <p>${item.contact.address.street}</p>
        <p>${item.contact.address.city + ', ' + item.contact.address.country}</p>
      </div>
      <div class="icons">
        <a href="${item.social.facebook.url}" class="social entypo-facebook-squared" alt="Facebook Icon"></a>
        <a href="${item.social.twitter.url}" class="social entypo-twitter" alt="Twitter Icon"></a>
      </div>
    </address>
  `))

}

//contactPage html populator
function ContactPage(){
  const MainContent = $('#main');
  const BodyContent = $('body');
  const email = 'sbaker1505@gmail.com';
  MainContent.html('')
    .append(`
      <div id="map"></div>
      <form class="contact-form" action="https://formspree.io/${email}" method="POST">
        <input type="hidden" name="_language" value="${lang}" />
        <input type="text" name="name" placeholder="Name">
        <input type="email" name="_replyto" placeholder="Email">
        <input type="tel" name="phone" placeholder="Phone (Optional)">
        <textarea type="text" name="message" maxlength="500" placeholder="Add message here."></textarea>
        <button type="submit" value="Send">Send</button>
      </form>
    `);
    BodyContent.append(`
      <script src="https://maps.googleapis.com/maps/api/js?key=${GAPI}&callback=initMap" async defer></script>
    `)
}

//contactSlider html populator
// function ContactSlider(){
//   $('header').append(`
//     <div class="slider-contact">
//
//       <button onclick=slide()>Cancel</button>
//     </div>
//   `)
//   footer.map(item => $('.slider-contact').prepend(`
//     <address class="slider-address ${item.title.toLowerCase()}">
//       <img class="slider-address-image" src="
//       https://maps.googleapis.com/maps/api/staticmap?center=${item.contact.address.lat + ',' + item.contact.address.long}&zoom=13&size=150x150&maptype=roadmap&markers=size:mid%7Ccolor:red%7C${item.contact.address.lat + ',' + item.contact.address.long}&key=${GAPI}" alt="Map of Cultiva ${item.title} location">
//       <div class="slider-address-info">
//         <h3 class="slider-address-name">${item.title}</h3>
//         <a class="slider-address-phone" href="tel:${item.contact.phone}">${item.contact.phoneFormatted}</a>
//         <a class="slider-address-email" href="mailto:${item.contact.email}">${item.contact.email}</a>
//         <div class="slider-address-location">
//         <p>${item.contact.address.street}</p>
//         <p>${item.contact.address.city + ', ' + item.contact.address.country}</p>
//         </div>
//         <div class="slider-address-icons">
//           <a href="${item.social.twitter.url}" class="social entypo-twitter" alt="Twitter Icon"></a>
//           <a href="${item.social.facebook.url}" class="social entypo-facebook-squared" alt="Facebook Icon"></a>
//         </div>
//       </div>
//     </address>
//   `))
// }


function ContactSlider(){
  $('header').append(`
    <div class="slider-contact">
      <button onclick=slide()>Cancel</button>
    </div>
  `)
  footer.map(item => $('.slider-contact').prepend(`
    <address class="slider-address ${item.title.toLowerCase()}">

      <div class="slider-address-info">
        <h3 class="slider-address-name">${item.title}</h3>
        <a class="slider-address-phone entypo-phone" href="tel:${item.contact.phone}">Call via Phone </a>
        <a class="slider-address-email  entypo-mail" href="mailto:${item.contact.email}"> Send Via Email</a>
        <a class="slider-address-location entypo-map"> Open with Maps</a>
        <div class="slider-address-icons">
          <a href="${item.social.twitter.url}" class="social entypo-twitter" alt="Twitter Icon"></a><br>
          <a href="${item.social.facebook.url}" class="social entypo-facebook-squared" alt="Facebook Icon"></a><br>
          <a href="${item.social.facebook.url}" class="social entypo-instagrem" alt="Facebook Icon"></a>
        </div>
      </div>
    </address>
  `))
}

//create Product Pages
function Products(type) {
  const list = catalog[type][type];
  const { title } = catalog[type];
  const { srcset, format } = catalog[type].imageSizes;

  //add Title
  const MainContent = $('#main');
  MainContent.html('')
    .append(`
    <section class="product-page">
      <h2 class="product-page-title">${title[lang]}</h2>
      <article class="product-list"></article>
    </section>`);

  //add Content
  const ProductList = $('.product-list');
  list.map(item => ProductList.append(`
    <div class="product-item" id="${type[0] + item.id}">
      <img src="../img/${type + '/' + item.image + '_' + srcset[0] + format}"
        srcset="${srcset.map(num =>
          `../img/${type + '/' + item.image + '_' + num + format} ${num + 'w'} `)}"
        sizes="250px"
        alt=""/>
      <h3>${item.name[lang]}</h3>
      <div class="details">
        <div class="taste">
          <h4>Taste</h4>
          <p>${item.description.taste[lang]}</p>
        </div>
        <div class="look">
          <h4>Look</h4>
          <p class="look">${item.description.look[lang]}</p>
        </div>
      </div>
    </div>
  `));

  //Click Event for Details
  $('.product-item').click(function(){
      let position = $(this).index() // where in the array
      alert(
      list[position].description.taste[lang] +"\n\n"+
      list[position].description.look [lang])
    })
}

//create Image Page
function ImagePage(){
  const MainContent = $('#main');
  MainContent.html('')
    .append(`
    <section class="images-page">
      <h2 class="images-page-title">${images.title[lang]}</h2>
      <article class="images-list"></article>
    </section>`);

  const ImageList = $('.images-list');
  images.images.map(item => ImageList.append(`
    <div class="${item.view}" >
      <img src="img/${item.url}" alt="${item.alt}" />
    </div>
    `))
}

//changeLanguage 🇺🇸🇪🇸
$('.lang').click(function(){
  if (lang == 'es') {
  localStorage.setItem("lang","en"); lang = 'en'
  } else {
    localStorage.setItem("lang","es"); lang = 'es'}
  loadPage()
})

//slider toggle
function slide(){
  let open = $('body').hasClass('hasOverlay');

  $('.slider-contact').toggleClass('slide');
  $('body').toggleClass('hasOverlay')
  $('html').toggleClass('avoid-scroll')


  open ?
  $('.overlay').remove() :
  $('body').append("<div class='overlay'></div>")
}

//renderView
$(document).ready(loadPage)
