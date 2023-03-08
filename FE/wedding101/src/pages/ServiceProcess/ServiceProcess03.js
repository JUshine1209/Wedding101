import './ServiceProcess03.css';

import { TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import ProgressBar from '../../components/common/ProgressBar';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addHours from "date-fns/addHours";
import "react-datepicker/dist/react-datepicker.css";

const { kakao } = window;

function ServiceProcess03 () {
  let markers = [];
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  const [ps, setPs] = useState();
  const [map, setMap] = useState();

  function searchPlaces() {
    
    var keyword = document.getElementById('keyword').value;
  
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
  }

  // 키워드 서치의 콜백 함수
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    }
    else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }

  function displayPlaces(places) {
    var bounds = new kakao.maps.LatLngBounds();
    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    for ( var i=0; i<places.length; i++ ) {
    
      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i);
    
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);
    
      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function(marker, title, address) {
          kakao.maps.event.addListener(marker, 'mouseover', function() {
              displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, 'click', function(){
            setAddressInfo(title, address);
          });
        
          kakao.maps.event.addListener(marker, 'mouseout', function() {
              infowindow.close();
          });
      })(marker, places[i].place_name, places[i].road_address_name);
    
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });
      
    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다
      
    return marker;
  }
  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
      }   
      markers = [];
  }
  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title, address) {
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);

      
  }

  function setAddressInfo(title, address){
    document.getElementById('weddingHallName').value = title;
    document.getElementById('weddingHallAddress').value = address;
    setWeddingInfo({
      weddingHallName: title,
      weddingHallAddress: address
    });
  }

  useEffect(()=>{
    //지도 생성 및 객체 리턴
    const container = document.getElementById('mapContainer'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.501274, 127.039620), //지도의 중심좌표.
      level: 1 //지도의 레벨(확대, 축소 정도)
    };

    setMap(new kakao.maps.Map(container, options));
    setPs(new kakao.maps.services.Places());
  }, []);

  const [weddingDateTime, setWeddingDateTime] = useState({
    date: new Date(),
    time: new Date()
  }
    
  );
  const [weddingInfo, setWeddingInfo] = useState({
    weddingHallName: "string",
    weddingHallAddress: "string",
    weddingHallNumber: "string",
    weddingDay: "string"
  })

  const onWeddingInfoChange = (e) => {
    setWeddingInfo({
      ...weddingInfo,
      [e.target.id] : e.target.value
    })
  }

  const navigate = useNavigate();

  const toProcess04 = () => {
    let integratedInfo = JSON.parse(sessionStorage.getItem('integratedInfo'));
    integratedInfo.weddingHallName = weddingInfo.weddingHallName;
    integratedInfo.weddingHallAddress = weddingInfo.weddingHallAddress;
    integratedInfo.weddingHallNumber = weddingInfo.weddingHallNumber;
    const dayString = weddingDateTime.date.toISOString()
    const timeString = weddingDateTime.time.toISOString()
    const newDayTime = dayString.substring(0,10) + timeString.substring(10)
    console.log(newDayTime)
    integratedInfo.weddingDay = newDayTime;
    console.log('integratedInfo', integratedInfo)
    sessionStorage.setItem('integratedInfo', JSON.stringify(integratedInfo));
    navigate('/user/service04');
    window.scrollTo(0,0);
  };

    return (
        <div className='service-process03'>        
          <Grid2 container spacing={2}>
            <Grid2 lg={3} sm={2}>
              <div style={{position: 'fixed', fontSize: '5vh', fontFamily:'Bakbak One'}}>
                <div style={{position: 'relative', left: '20%'}}>
                  SERVICE<br></br>
                  APPLICATION
                </div>            
              </div>
            </Grid2>
            <Grid2 lg={9} sm={10}>
              <ProgressBar steps={['step1', 'step2', 'step3', 'step4']} activeStep={2} />
              <h2>예식장 정보 입력</h2>
              <br></br>
              <div className='wedLocDayContainer'>
                <div className='horizontalLayout' id='HL_process03'>
                  <div className='verticalLayout' id='process03_inputArea'>
                    <p style={{fontSize: '2vh'}}>예식장</p>
                    <div className='horizontalLayout spaceBetween' >
                      <TextField className='textInputField' id='keyword' onKeyUp={e => {
                        if(e.key === 'Enter') searchPlaces();
                      }}/>
                      <Button onClick={searchPlaces}>검색</Button>
                    </div>
                    <br></br>
                    <p style={{fontSize: '2vh'}}>예식장 이름</p>
                    <TextField className='textInputField' id='weddingHallName' onChange={onWeddingInfoChange}/>
                    <br></br>
                    <p style={{fontSize: '2vh'}}>예식장 위치</p>
                    <TextField className='textInputField' id='weddingHallAddress' onChange={onWeddingInfoChange}/>
                    <br></br>
                    <p style={{fontSize: '2vh'}}>예식장 상세</p>
                    <TextField className='textInputField' id='weddingHallNumber' onChange={onWeddingInfoChange} placeholder='홀 번호 / 기타'/>
                    <br></br>
                    <div className='horizontalLayout spaceBetween'>
                      <p style={{width: '30%', fontSize: '2vh'}}>예식 날짜</p>
                      <DatePicker
                        minDate={new Date()}
                        selected={weddingDateTime.date}
                        onChange={date => setWeddingDateTime({
                          ...weddingDateTime,
                          date: date
                        })}/>
                    </div>
                    <div className='horizontalLayout spaceBetween'>
                      <p style={{width: '30%', fontSize: '2vh'}}>예식 시간</p>
                      <DatePicker
                        selected={weddingDateTime.time}
                        showTimeSelect
                        showTimeSelectOnly
                        minTime={setHours(setMinutes(new Date(),0),9)}
                        maxTime={setHours(setMinutes(new Date(),0),22)}
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        onChange={time => {
                          setWeddingDateTime({
                          ...weddingDateTime,
                          time: time
                        });
                        console.log(time)}}
                        />
                    </div>
                  </div>
                  <div id='mapContainer'></div>
                </div>
              </div>
              <div className='buttons'>
                <Button variant='contained' onClick={() => navigate(-1)}>이전</Button>
              </div>
              <div className='buttons'>
                <Button variant='contained' onClick={toProcess04}>다음</Button>
              </div>
            </Grid2>
          </Grid2>
        </div>
    )
}

export default ServiceProcess03;