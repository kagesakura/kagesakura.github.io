const e = document.getElementById("end");
const topBar = document.getElementById("top-bar").querySelector("ul");
const handler = () => e.style.height = e.clientWidth + "px";
const { href } = location;
const replaceState = history.replaceState.bind(history);
window.addEventListener("load", handler, { once: true });
window.addEventListener("resize", handler);
const pages = [...document.getElementsByClassName("page")];
const hideAllPage = Array.prototype.forEach.bind(pages.map(e => e.style), s => s.display = "none");
pages.forEach((page, num) => {
  const li = document.createElement("li");
  li.textContent = page.dataset.name;
  const { style } = page;
  li.addEventListener("click", () => {
    hideAllPage();
    style.display = "";
    handler();
    const url = new URL(href);
    url.searchParams.set("page", num);
    replaceState(history.state, "", url.href);
  });
  topBar.appendChild(li);
});
hideAllPage();
(pages[new URL(location.href).searchParams.get("page")] ?? pages[0]).style.display = "";
