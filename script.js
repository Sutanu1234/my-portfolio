/**
 * @copyright codewithsadee 2023
 * @author Sadee <codewithsadee24@gmail.com>
 */

"use strict";

// custom cursor
class IntersectionObserverList {
    mapping;
    observer;
    constructor() {
      this.mapping = new Map();
      this.observer = new IntersectionObserver(
        (entries) => {
          for (var entry of entries) {
            var callback = this.mapping.get(entry.target);
  
            callback && callback(entry.isIntersecting);
          }
        },
        {
          rootMargin: "300px 0px 300px 0px"
        }
      );
    }
    add(element, callback) {
      this.mapping.set(element, callback);
      this.observer.observe(element);
    }
    ngOnDestroy() {
      this.mapping.clear();
      this.observer.disconnect();
    }
    remove(element) {
      this.mapping.delete(element);
      this.observer.unobserve(element);
    }
  }
  const observer = new IntersectionObserverList();
  
  $(window).mousemove(function (e) {
    $(".ring").css(
      "transform",
      `translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
    );
  });

// light and dark mood

const $themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

if(sessionStorage.getItem("theme")){
    $HTML.dataset.theme = sessionStorage.getItem("theme");
} else{
    $HTML.dataset.theme = isDark ? "dark" : "light";
    sessionStorage.setItem("theme", $HTML.dataset.theme);
}

const changeTheme = () => {
    $HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
    sessionStorage.setItem("theme", $HTML.dataset.theme);
}

$themeBtn.addEventListener("click", changeTheme);


// tab

const $tabBtn = document.querySelectorAll("[data-tab-btn]");
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");

let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach(item => {
    item.addEventListener("click", function() {
        lastActiveTab.classList.remove("active");
        lastActiveTabBtn.classList.remove("active");

        const $tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
        $tabContent.classList.add("active");
        this.classList.add("active");

        lastActiveTab = $tabContent;
        lastActiveTabBtn = this;
    });
});