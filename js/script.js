var menu = document.querySelector(".page-header__menu");
var menu__button = document.querySelector(".page-header__menu-button");

if(menu && menu__button){
  menu.classList.remove("page-header__menu--opened");
  menu__button.classList.remove("page-header__menu-button--close-menu");

  menu__button.addEventListener("click", function(event){
    var menu_opened = document.querySelector(".page-header__menu--opened");
    event.preventDefault();
    if(menu_opened){
        menu.classList.remove("page-header__menu--opened");
        menu__button.classList.remove("page-header__menu-button--close-menu");
      }
      else {
        menu.classList.add("page-header__menu--opened");
        menu__button.classList.add("page-header__menu-button--close-menu");
        }
  });
};
