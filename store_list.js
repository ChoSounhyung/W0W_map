// const init = () => {
//   const placesDiv = document.querySelector(".places");
//   let places;
//   places = fetch('./place.json')
//       .then(res => res.json())
//       .then(res => {
//         places = res

        
//         places.map((place, index) => {
//             let div = document.createElement('div');
//             div.setAttribute("class", "place");
//             div.innerHTML = `<img src="./img_store.png" width=20 height=20><span style="color: #3273a8">${place.title}</span><br/><span>${place.info}</span><br/><a href="${place.site}"><span>${place.site}</span></a>`
//             placesDiv.appendChild(div);
//         })

//         var placeDiv = $('.places').children('.place');
//         placeDiv.map((index) => {
         
//             placeDiv[index].addEventListener('click', () => {
//                 getInfo(index);
//             })
//         })
        
//     })
// }

// const getInfo = (index) => {
//     places = fetch('./place.json')
//     .then(res => res.json())
//     .then(res => {
//       places = res
//       console.log(places[index]);
//     })
// }

// window.onload = () => init();