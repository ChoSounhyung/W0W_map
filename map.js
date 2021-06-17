

// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.5642135, 127.0016985), // 지도의 중심좌표
    level: 7, // 지도의 확대 레벨
  };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// console.log(map);
// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {
  // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도

    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표를 생성합니다.
      //message='<div class="current_location">현재위치</div>';
      message = document.createElement("div");
    message.className = "current";
    message.innerHTML = "현위치";
    displayMarker(locPosition, message);
  });
} else {
  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

  var locPosition = new kakao.maps.LatLng(37.5642135, 127.0016985),
    message = "geolocation을 사용할수 없어요..";

  displayMarker(locPosition, message);
}
function displayMarker(locPosition, message) {
  console.log(locPosition, message);
  var imageSrc = "./marker.png", // 마커이미지의 주소입니다.
    imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: locPosition, // 마커의 위치
    image: markerImage,
    map: map,
  });
  marker.setMap(map);
  var customOverlay = new kakao.maps.CustomOverlay({
    position: locPosition,
    content: message,
  });

  // 커스텀 오버레이를 지도에 표시합니다
  customOverlay.setMap(map);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

var locData = new Array();
$(document).ready(function () {
  $.getJSON("./place.json", function (data) {
    $.each(data, function (i, item) {
      //   console.log(item);
      //i는 위치값, item은 객체
      var json = new Object();
      json.name = item.title;
      json.address = item.address;
      json.latlng = new kakao.maps.LatLng(item.lat, item.lng);
      locData.push(json);
    });
    for (var i = 0; i < locData.length; i++) {
      displayCustom(i);
    }
    function displayCustom(i) {
      var imageSrc = "./marker.png",
        imageSize = new kakao.maps.Size(25, 25),
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      //마커 생성
      var marker = new kakao.maps.Marker({
        position: locData[i].latlng, // 마커의 위치
        image: markerImage,
        map: map,
      });

      marker.setMap(map);
      var overlay = new kakao.maps.CustomOverlay({
        yAnchor: 3,
        position: marker.getPosition(),
      });

      var content = document.createElement("div");
      content.className = "wrap";

      var info = document.createElement("div");
      info.className = "info";
      content.appendChild(info);

      var title = document.createElement("div");
      title.className = "titlename";
      title.innerHTML = locData[i].name;
      info.appendChild(title);

      var closeBtn = document.createElement("button");
      closeBtn.className = "close";
      // closeBtn.innerHTML = "닫기";
      // closeBtn.innerHTML = "<img src='./exit.png'/>";
      closeBtn.onclick = function () {
        overlay.setMap(null);
      };
      title.appendChild(closeBtn);

      // var closeImg = document.createElement("img");
      // closeImg.className = "closeimg";
      // closeImg.onclick = function () {
      //   overlay.setMap(null);
      // };
      // closeBtn.appendChild(closeImg).src = "exit_icon.png";

      var body = document.createElement("div");
      body.className = "body";
      info.appendChild(body);

      var desc = document.createElement("div");
      desc.className = "desc";
      body.appendChild(desc);

      var address = document.createElement("div");
      address.className = "address";
      address.innerHTML = locData[i].address;

      desc.appendChild(address);

      overlay.setContent(content);

      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });

      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
      function closeOverlay() {
        overlay.setMap(null);
      }

      return overlay;
    }
  });
});


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
            div.innerHTML = `<img src="./img_store.png" width=20 height=20><span style="color: #3273a8">${place.title}</span><br/><span>${place.info}</span><br/><a href="${place.site}"><span>${place.site}</span></a>`
            placesDiv.appendChild(div);
        })

        var placeDiv = $('.places').children('.place');
        placeDiv.map((index) => {
         
            placeDiv[index].addEventListener('click', () => {
                getInfo(index);
            })
        })
        
    })
}

const getInfo = (index) => {
    places = fetch('./place.json')
    .then(res => res.json())
    .then(res => {
      places = res
      console.log(places[index]);

      var moveLatLon = new kakao.maps.LatLng(places[index].lat, places[index].lng);
    
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon);  
    })
}

window.onload = () => init();