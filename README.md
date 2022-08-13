<h1 align="center">덴버무비</h1>
<p align="center"><strong>두 번째 프론트엔드 Vue.js 포트폴리오</strong></p>

<p align="center">
  <a href="https://nodejs.org/ko/" rel="nofollow"><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" /></a>
  <a href="https://www.mysql.com/" rel="nofollow"><img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="Node.js" /></a>
  <a href="https://kr.vuejs.org/" rel="nofollow"><img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue.js" /></a>
</p>

<blockquote align="center">덴버무비는 Node.js와 MySQL을 사용해서 제작한 두 번째 프론트엔드 Vue.js 포트폴리오입니다.</blockquote>

<p align="center">
  <a href="http://cf24lupin.cafe24app.com">둘러보기</a>
</p>

## 목차
* [기능](#기능)
* [자주 묻는 질문](#자주-묻는-질문)
* [HTML Markup Guide](#html-markup-guide)
* [브라우저 호환성](#브라우저-호환성)

## 기능
* `메인` 페이지는 **비주얼 슬라이드**와 **프로모션 슬라이드**, 각 카테고리별 **슬라이드**를 <a href="https://kenwheeler.github.io/slick/" rel="nofollow">Slick Slider</a> **jQuery** plugin을 사용해서 만들었습니다.

  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/views/main/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/001.png)
  </details>

  상단 **좌측**의 삼선 메뉴를 클릭하면 **사용자 정보**와 **주메뉴**가 나타납니다.
  
  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/components/common/navigation/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/002.png)
  </details>

  상단 **우측**에는 전체 검색 버튼이 존재합니다.
  
  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/components/common/utility/Index.vue)
  
  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/views/search/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/003.png)

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/009.png)
  </details>

  상단 **우측**에는 [로그인](http://cf24lupin.cafe24app.com/member/login) 및 [회원가입](http://cf24lupin.cafe24app.com/member/register) 페이지로 이동할 수 있는 링크를 제공하고 있습니다.
  
  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/tree/main/src/views/member/login/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/004.png)
  </details>
* `회원가입` 페이지에서 **\*** 표시된 부분은 **필수 입력**입니다.

  ✅**아이디**는 **알파벳 소·대문자**, **숫자**, **\-\.\_** 를 입력 가능하고 **4자리 이상 8자리 이하**로 입력해 주세요.

  ✅**패스워드**는 **알파벳 소문자**, **숫자**, **특수문자**를 **하나 이상 포함**하고 **6자리 이상 12자리 이하**로 입력해 주세요. (🔒 **bcrypt**로 입력하신 패스워드를 **암호화**합니다.)

  ✅**닉네임**은 **한글과 알파벳**, **숫자**만 입력 가능하고 **2자리 이상 6자리 이하**로 입력해 주세요.

  ✅**이메일**을 올바르게 입력해 주세요.
  
  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/views/member/register/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/005.png)
  </details>

* `로그인` 성공 시 **JWT Token**을 발급합니다.

* `회원정보 수정` 페이지에서 **\*** 표시된 부분은 **필수 입력**입니다.

  ✅**닉네임**은 **한글과 알파벳**, **숫자**만 입력 가능하고 **2자리 이상 6자리 이하**로 입력해 주세요.

  ✅**이메일**을 올바르게 입력해 주세요.

  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/views/member/profile/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/006.png)
  </details>

* `주 서비스`

  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/components/common/navigation/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/007.png)
  </details>

* `검색`

  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/components/common/filter/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/008.png)
  </details>

* `글 목록`

  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/views/board/list/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/010.png)
  </details>

* `글 상세`

  [코드 보기](https://github.com/github-denver/frontend.vue.denver.movie/blob/main/src/views/board/read/Index.vue)
  <details>
    <summary>화면 보기</summary>

    ![](https://raw.githubusercontent.com/github-denver/images/master/denvermovie/images/011.png)
  </details>

## 자주 묻는 질문
<details>
  <summary>왜 <strong>jQuery</strong> plugin을 사용했어요?</summary>

  오래된 서비스일 경우 jQuery를 사용해서 기능을 만든 곳들이 많습니다. 이런 서비스를 SI/SM 업무에서 과감히 jQuery를 걷어내고 처음부터 기능을 만들기에는 솔직히 작업 일정과 검수 일정이 온전하지 못합니다. 😨

  그렇기 때문에 실무에서 jQuery로 만들어진 기능을 Vue.js에 적용하는 방법을 알아보기 위해 연습 삼아 사용해 봤습니다. 😄
</details>

## HTML Markup Guide
[https://github.com/github-denver/guide.markup](https://github.com/github-denver/guide.markup)
