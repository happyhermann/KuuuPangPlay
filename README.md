

# 🎓레디북스 온라인 도서 판매 사이트  
 
* 프로젝트 형태: 개인 프로젝트
* 프로젝트 기간: 2022.08.01 ~ 2022.09.05
* 프로젝트 API 제공 출처: 카카오 책 검색 API (+ 패스트 캠퍼스 제공 핀테크 프로젝트 API)
 


## 👆프로젝트 메인 페이지

### ⚙️*개발언어*
<hr/>
<figure class="third">

 <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css&logoColor=white">
 <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
 <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/redux-61DAFB?style=for-the-badge&logo=redux&logoColor=white">

 <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
 
 </figure>

### 📚*라이브러리*
<hr/>
<img src="https://img.shields.io/badge/-axios-lightgrey" />
<img src="https://img.shields.io/badge/-%20remixicon-lightgrey" />
<img src="https://img.shields.io/badge/-react--router--dom-lightgrey" />


#### 💻배포 주소
> netlify : https://readybooks.netlify.app/




### 🕹프로젝트 과정
---------------------------------------
 



#### 전역적 코드 관리 

>상태값 : Recoil, Recoil-persist를 사용하여 API, 데이터 등 상태값 전역적으로 관리 
>CSS 스타일링 : Typescript + Styled-components 조합을 사용하여 프로젝트 웹 고유 색상, 배경색상, breakpoint, 패딩 값 같은 공통 스타일을 지정후 일관된 스타일링을 유지


<hr/>


#### 캐러셀  

!이미지 

! 설명 
 


#### 캐러셀에 데이터!
 <pre>
<code>
1. 캐러셀에 나열된 도서 데이터들은 axios GET으로 호출할 때 axios.all을 사용하여 6개의 인기 도서 키워드를 
query에 넣어서 3개씩 받아오도록 세팅 

2. Response 받은 데이터를 axios.spread를 사용하여 받고, spread 연산자를 이용하여 배열 병합 후 setState 함수에 인자로 넣어줌 

3. 인기 도서 데이터 18개가 합쳐서 하나의 배열을 map을 사용하여 캐러셀에 리스트화 시켜줌 
</code>
</pre>



<hr/>




#### 로그인 & 회원가입

 <img src="https://user-images.githubusercontent.com/92570023/188264544-1d087f64-890d-404f-b622-c33935cf280b.gif" width="600px" height="400px" title="" alt="SignUp/In"></img><br/>
 
 
 


사용한 API
<pre>
<code>
// 로그인
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login
  \ -X 'POST'

// 회원가입
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login
  \ -X 'POST'
</code>
</pre>

#####기능 설명

> React-hook-form 라이브러리로으로 Validation 설계
>  1. 로그인&회원가입 모든 값을 입력하지 않으면 등록 버튼 활성화X
>  2. 이메일 값은 반드시 "@"가 포함되어야 함.
>  3. 비밀번호는 8자리 이상이여야 한다.

> 회원가입이 완료되면 로그인 페이지로 넘어가게 navigate 세팅
> 로그인에 성공하면 홈 ("/")으로 넘어가게 navigate 세팅 
> 헤더에 로그아웃 UI 누르면 Persist하게 localStorage에 저장된 로그인 유저 정보 삭제되어 로그아웃 되게 함


**issue**
##### 회원가입 / 로그인 버튼 둘다 2번~3번 누르고 1초 정도 지나서 작동함 
=> 리팩토링 해야할 부분, 왜 이런 문제가 발생했는지 확인 중
=> **API 통신이나 로그인, 로그아웃, 회원가입 자체는 되는 것으로 확인 


<hr/>



#### 도서 검색 

 <img src="https://user-images.githubusercontent.com/92570023/188264648-b5e26082-22bf-4215-8d49-ca7092754ec9.gif" width="600px" height="400px" title="" alt="RubberDuck"></img><br/>

 사용한 API 
 <pre>
 <code>
  // 책 검색 기본 
  GET /v3/search/book HTTP/1.1
  Host: dapi.kakao.com
  Authorization: KakaoAK ${REST_API_KEY}
 </code>
 </pre>
 
 <pre>
 <code>
  // 원하는 검색어와 함께 결과 형식 파라미터를 선택적으로 추가
  curl -v -X GET "https://dapi.kakao.com/v3/search/book?target=title" \
  // 쿼리 파라미터에 검색어 입력 
  --data-urlencode "query=미움받을 용기" \
  // 헤더에 접근 토큰 
  -H "Authorization: KakaoAK ${REST_API_KEY}"
   </code>
 </pre>
 
 기능 설명
 > 검색창에 키워드를 입력하면 입력값과 관련된 도서 정보 데이터를 받아옴

 > Search History 구현 : 사용자가 입력한 검색값은 axios에서 데이터 Response하는 단에서 동시에 이뤄짐 
   유저가 검색창에 검색한 값은 setState 함수에 인자로 담기는데, 이때 id값이 Date.now() 함수를 통해 임의적으로 함께 배열안 객체에 담기고 이 id값은 filter를 통해 삭제기능에 기여한다.
   최근 검색어 창에 내림차순으로 정렬되고 개별 검색어는 삭제 가능
 
 > Pagination 구현 : 받아온 도서 정보는 각 페이지당 10개씩 잘라서 나열됨 
 
 > 입력값에 해당하는 도서가 없을 경우 '검색결과 없습니다'라는 배너 사용자에게 보여줌

 > 리스트내 도서 클릭시 해당 도서 상세 페이지로 링크 연결 
 
 
 
 

  
 



