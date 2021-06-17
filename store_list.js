const init = () => {
  const placesDiv = document.querySelector(".places");
  let places;
  places = fetch('./place.json')
      .then(res => res.json())
      .then(res => {
          places = res

          places.map((place, index) => {
              let div = document.createElement('div');
              div.setAttribute("class", "place");
              div.innerHTML = `<a href="${place.site}"><img src="./img_store.png" width=20 height=20><span style="color: #3273a8">${place.title}</span><br/><span>${place.info}</span></a>`
              placesDiv.appendChild(div);
          })
      })
}

window.onload = () => init();